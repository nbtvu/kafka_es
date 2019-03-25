var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var kafkaProducer = require('./kafka');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/push_network_stats',function(req,res){
  const statsData = JSON.stringify(req.body);
  kafkaProducer.produceNetworkStats(statsData);
  res.json();
});


io.on('connection', function (socket) {
  socket.on('NetworkStats', (data) => {
    kafkaProducer.produceNetworkStats(data);
  })
});

server.listen(5001,function(){
  console.log('log stream running at 5001')
});
