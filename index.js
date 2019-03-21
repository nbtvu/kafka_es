var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var kafkaProducer = require('./kafka');


// try create a kafka topic
// const topic = {
//   topic: 'topic1',
//   partitions: 1,
//   replicationFactor: 2
// };
// kafkaProducer.createTopic(topic);


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.post('/push_network_stats',function(req,res){
  const statsData = JSON.stringify(req.body.data);
  kafkaProducer.produceNetworkStats(statsData);
  res.json();
});


io.on('connection', function (socket) {
  socket.on('topic1', (data) => {
  })
});

server.listen(5001,function(){
  console.log('log stream running at 5001')
});
