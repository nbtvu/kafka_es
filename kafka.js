var kafka = require('kafka-node');
var Producer = kafka.Producer;


class OhmniKafkaProducer {
  constructor() {
    this._client = new kafka.KafkaClient();
    this._producer = new Producer(this._client);

    this._ready = false;
    this._producer.on('ready', function () {
      console.log('Producer is ready');
      this._ready = true;
    });

    this._producer.on('error', function (err) {
      console.log('Producer is in error state');
      console.log(err);
    });

    this.createTopic = this.createTopic.bind(this);
    this.produceNetworkStats = this.produceNetworkStats.bind(this);
  }

  get ready(){
    return this._ready;
  }

  createTopic(topic) {
    this._producer.createTopics([topic],false,function (err, data) {
      if (err) {
        console.log("error create kafka topics", err);
      } else {
        console.log("create kafka topics successfully", data);
      }
    });
  };

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

const ohmniKafkaProducer = new OhmniKafkaProducer();

module.exports = ohmniKafkaProducer;