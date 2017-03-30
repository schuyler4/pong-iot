var PubNub = require('pubnub')


pubnub = new PubNub({
  publishKey : 'pub-c-0107042d-cac3-4854-9323-b2fd0badf295',
  subscribeKey : 'sub-c-cfaa271a-119f-11e7-b568-0619f8945a4f'
})

function sendMessage(message) {
  console.log(message);
  var publishConfig = {
      channel : 'pong',
      message : message
  }
  pubnub.publish(publishConfig);
}

sendMessage('hello')

var Port = require('serialport').SerialPort;
var port = new Port('/dev/cu.usbmodemFD121')

port.on('open', () => {
  port.on('data', (data) => {
    sendMessage(data[0]);
  })
});
