var tessel = require('tessel');
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['A']);
var servolib = require('servo-pca9685');
var servo = servolib.use(tessel.port['B']);
// require('events').EventEmitter.prototype._maxListeners = 0;

var http = require('http');


var temp;
climate.on('ready', function() {
  setInterval(function() {

    climate.readHumidity(function (err, humid) {
      climate.readTemperature('f', function (err, temp) {
        console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');

        temp = temp.toFixed(0);

        if (temp > 80) {
          //send a slack message if temp goes above 80
          http.get({
              host: '192.168.4.34',
              port: 7777,
              method: 'POST'
          }, function(){
              console.log("Message sent.");
          });
          //run fan also if temp goes above 80
          var servo1 = 1;
          var position = 0;

          servo.configure(servo1, 0.05, 0.12, function() {
          servo.move(servo1, position);


          position += 0.1;
          if (position > 1) {
            position = 0;
          }
        });
    }

    });
    });
  }, 30000);

});


// var servo1 = 1;
// servo.on('ready', function() {
//   var position = 0;

//   // if (temp > 83) {
//   servo.configure(servo1, 0.05, 0.12, function() {

//     setInterval(function() {
//       console.log('position (in range 0-1):', position);

//       servo.move(servo1, position);

//       position += 0.1;
//       if (position > 1) {
//         position = 0;
//       }
//     });
//     }, 500);

// });


climate.on('error', function(err) {
  console.log('error connecting module', err);
});
