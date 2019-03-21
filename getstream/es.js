var elasticsearch = require('elasticsearch');
var esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
esClient.ping({ requestTimeout: 30000, }, function (error) {
  if (error) {
    console.log("error happen", error);
  } else {
    console.log("All is well");
  }
});

module.exports = {
  es: esClient
};
