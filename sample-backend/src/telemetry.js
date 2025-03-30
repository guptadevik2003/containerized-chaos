const { NodeSDK } = require("@opentelemetry/sdk-node");
const { PrometheusExporter } = require("@opentelemetry/exporter-prometheus");
const { MeterProvider } = require("@opentelemetry/api");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");

const prometheusExporter = new PrometheusExporter({ port: 9464 }, () => {
  console.log("Prometheus scraping on port 9464");
});

const sdk = new NodeSDK({
  instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
  metricReader: prometheusExporter,
});

sdk.start();

const meter = new MeterProvider().getMeter("api-meter");

module.exports = { meter };
