#konami-touch

Watches for the konami code (↑ ↑ ↓ ↓ ← → ← → TAP TAP TAP) to be input as swipe gestures then fires a callback

##Installation

    npm install konami-touch


##Usage

    var KonamiTouch = require('konami-touch');

    new KonamiTouch(function(){
        alert('KONAMI!');
    });