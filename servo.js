var tessel = require('tessel');
var servolib = require('servo-pca9685');
var servo = servolib.use(tessel.port['B']);

var servo1 = 1;

servo.on('ready', function() {
  var position = 0;

  servo.configure(servo1, 0.05, 0.12, function() {

    setInterval(function() {

      servo.move(servo1, position);
      console.log('position (in range 0-1):', position);

      position += 0.1;
      if (position > 1) {
        position = 0;
      }

    }, 500);

  });
});
