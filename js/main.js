'use strict'

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
  var linkarea = $('div#linkarea'),
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
    minY = pos.top + floaterRadius;
    minX = pos.left + floaterRadius;
    maxX = pos.left + linkarea.width() - floaterRadius * 2;
    maxY = minY + linkarea.height() - floaterRadius * 2;
    console.log(floaters)
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

