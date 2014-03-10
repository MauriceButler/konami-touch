var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'tap', 'tap', 'tap'],
    GestureDetector = require('gestures'),
    radiansToDegrees = require('math-js/angles/radiansToDegrees'),
    linearRegresion = require('./linearRegresion');

function getGestureVector(moves){
    var line = linearRegresion(moves),
        direction = 0,
        magitude = 0;

    if(line.length>2){
        var startPoint = line[0],
            endPoint = line[line.length - 1];

        direction = radiansToDegrees(Math.atan2(-(startPoint.x - endPoint.x), startPoint.y - endPoint.y));
        magitude = Math.sqrt(Math.pow(Math.abs(startPoint.x - endPoint.x), 2) + Math.pow(Math.abs(startPoint.y - endPoint.y), 2));
    }

    return {
        direction: direction,
        magitude: magitude
    };
}

function KonamiTouch(success){

    this.code = konamiCode;
    this.success = success || function(){};
    this.codeIndex = 0;

    var detector = new GestureDetector();

    detector.gestures.push(function(moves){
        var vector = getGestureVector(moves);

        if(vector.magitude < 5){
            return 'tap';
        }
        if(vector.magitude > 5 && vector.magitude < 20){
            return;
        }

        if(vector.direction > -45 && vector.direction < 45){
            return 'up';
        }
        if(vector.direction < -135 || vector.direction > 135){
            return 'down';
        }
        if(vector.direction < -45 && vector.direction > -135){
            return 'left';
        }
        if(vector.direction > 45 && vector.direction < 135){
            return 'right';
        }
    });

    detector.on('gesture', this.checkCode.bind(this));
}

KonamiTouch.prototype.checkCode = function checkCode(event){
    if(event.name === this.code[this.codeIndex++]){
        if(this.codeIndex === this.code.length){
            this.success();
            this.codeIndex = 0;
        }
    }else{
        this.codeIndex = 0;
    }
};

module.exports = KonamiTouch;
