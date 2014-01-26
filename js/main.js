'use strict'

$(window).bind("load", function(){
  $('#container.setup').removeClass('setup');
});

/*

Make the cursor more fun.

*/

var rippleDiv = $('#cursor-fun')

window.onmousemove = function(e){
  var ripple = $('<div></div>')
    .addClass('ripple')
    .offset({ top: e.pageY, left: e.pageX});
  rippleDiv.append(ripple);
  setTimeout(function(){ ripple.addClass('ripple-grow'); });
  setTimeout(function(){ ripple.remove(); }, 1000);;
};


/*

Make the links drift dreamily.

*/

var Floater = (function() {
  var minY, minX, maxY, maxX, updateBounds;
  var linkarea = $('div#bubble-wrapper'),
      floaterRadius = 47;

  function Floater(element) {
    var self = this;

    // set max bounds based on size/position of div.linkarea
    updateBounds();

    this.element = element;

    // set initial position
    this.x = minX + Math.random() * (maxX - minX);
    this.y = minY + Math.random() * (maxY - minY);

    // set initial velocity
    this.vx
    this.vy
    this.frozen = false;

    // set initial float force
    this.fx
    this.fy

    this.update();
  };

  updateBounds = function() {
    var pos = linkarea.position();
    minY = 0;
    minX = pos.left + floaterRadius;
    maxX = pos.left + linkarea.width() - floaterRadius * 2;
    maxY = minY + linkarea.height() - floaterRadius * 2;
    console.log(minY, minX, maxX, maxY, linkarea.height())
  }
  window.onresize = updateBounds;

  Floater.prototype.setFrozen = function(frozen) {
    // allow a floater to temporarily have it's velocity held at zero
    this.frozen = frozen;
  };

  Floater.prototype.tick = function() {
    // do physics
  };

  Floater.prototype.update = function() {
    console.log(this);
    this.element.style.setProperty('left', this.x + 'px');
    this.element.style.setProperty('top', this.y + 'px');
  };

  return Floater;
})();


// Instanciate a floater for every bubble on the page

var floaters = [];
window.floaters = floaters;
$('.bubble').each(function(i){
  floaters.push(new Floater(this));
});

// requestAnimationFrame => run ticks




// super obfusticated mail action

$('.compose').click(function() {
  var i, str = "";
  var codes = [109, 97, 105, 108, 116, 111, 58, 104, 101, 108, 108, 111, 64, 110, 97, 116, 110, 46, 109, 101];
  for (i = 0; i < codes.length; i++) str += String.fromCharCode(codes[i]);
  document.location.href = str;
});
