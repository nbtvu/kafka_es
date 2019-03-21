const { es } = require('./es');
var kafka = require('kafka-node');
var client = new kafka.KafkaClient();

var Consumer = kafka.Consumer;

var consumer = new Consumer(client, [{topic: 'NetworkStats', offset: 0}], {autoCommit: false});

var count = 0;
consumer.on('message', function (data) {
  es.create({
    index: 'ohmnilab_bot',
    type: 'NetworkStats',
    id: count,
    body: data.value
  });
  count += 1;
  console.log(data);
});

consumer.on('error', function (err) {
  console.log('Error: ', err);
});

consumer.on('offsetOutOfRange', function (err) {
  console.log('offsetOutOfRange:',err);
});
