var kafka = require('kafka-node');
var Producer = kafka.Producer;


class MyKafkaProducer {
  constructor() {
    this._client = new kafka.KafkaClient();
    this._producer = new Producer(this._client);

    this._producer.on('ready', function () {
      console.log('Producer is ready');
    });

    this._producer.on('error', function (err) {
      console.log('Producer is in error state');
      console.log(err);
    });

    this.produceNetworkStats = this.produceNetworkStats.bind(this);
  }

  produceNetworkStats(statsData) {
    const topic = "NetworkStats";
    const payloads = [
      { topic: topic, messages:statsData , partition: 0 }
    ];
    this._producer.send(payloads, function (err, data) {
      console.log(data);
    });
  }

}

const myKafkaProducer = new MyKafkaProducer();

module.exports = myKafkaProducer;