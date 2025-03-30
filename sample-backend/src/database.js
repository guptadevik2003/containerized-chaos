const logger = require("./logger");

async function queryDatabase() {
  logger.info("Simulating a database query...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, name: "Sample Data" }, { id: 2, name: "More Data" }]);
    }, 1000); // Simulated delay
  });
}

module.exports = { queryDatabase };
