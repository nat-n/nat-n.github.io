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

Make the bubbles drift dreamily.

*/

var Floater = (function() {
  var minY, minX, maxY, maxX, updateBounds;
  var linkarea = $('div#bubble-wrapper'),
      floaterRadius = 47;

  linkarea.mousemove(function(e){
    var i;
    for (i = 0; i < floaters.length; i++) {
      floaters[i].frozen = false;
    }
  });

  function Floater(element) {
    var self = this;

    // set max bounds based on size/position of div.linkarea
    updateBounds();

    this.element = element;
    this.element.onmouseover = function(e){
      self.frozen = true;
      e.cancelBubble = true;
      e.stopPropagation();
      console.log(self.frozen);
    };

    this.element.onmouseout = function(e){
      self.frozen = true;
      e.cancelBubble = true;
      e.stopPropagation();
      console.log(self.frozen);
    };

    // set initial position
    this.x = minX + Math.random() * (maxX - minX);
    this.y = minY + Math.random() * (maxY - minY);

    // set initial velocity in pixels per second
    this.vx = 0.2 * (Math.random() - 0.5);
    this.vy = 0.2 * (Math.random() - 0.5);
    this.frozen = false;

    // set initial float force
    this.fx
    this.fy
  };

  updateBounds = function() {
    var pos = linkarea.position();
    minY = 0;
    minX = 0;
    maxX = pos.left + linkarea.width() - floaterRadius * 2;
    maxY = minY + linkarea.height() - floaterRadius * 2;
  }
  window.onresize = updateBounds;

  Floater.prototype.setFrozen = function(frozen) {
    // allow a floater to temporarily have it's velocity held at zero
    this.frozen = frozen;
  };

  Floater.prototype.tick = function(delta) {
    // add dynamic forces


    // add velocity
    if (!this.frozen) {
      this.x += this.vx * delta;
      this.y += this.vy * delta;
    }

    // detect bubble collisions


    // detect boundary collisions

    if (this.x < minX) {
      this.x += minX - this.x;
      this.vx = -this.vx;
    }

    if (this.x > maxX) {
      this.x += maxX - this.x;
      this.vx = -this.vx;
    }

    if (this.y < minY) {
      this.y += minY - this.y;
      this.vy = -this.vy;
    }

    if (this.y > maxY) {
      this.y += maxY - this.y;
      this.vy = -this.vy;
    }

  };

  return Floater;
})();


// Instanciate a floater for every bubble on the page

var floaters = [];
window.floaters = floaters;
$('.bubble').each(function(i){
  floaters.push(new Floater(this));
});


// animate floaters

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var time;
(function bubbleLoop(){
  var i, f, now, delta;

  requestAnimFrame(bubbleLoop);

  now = new Date().getTime();
  delta = now - (time || now);
  time = now;

  for (i = 0; i < floaters.length; i++) {
    f = floaters[i];
    f.tick(delta);
    f.element.style.setProperty('left', f.x + 'px');
    f.element.style.setProperty('top', f.y + 'px');
  }
})();


// super obfusticated mail action

$('.compose').click(function() {
  var i, str = "";
  var codes = [109, 97, 105, 108, 116, 111, 58, 104, 101, 108, 108, 111, 64, 110, 97, 116, 110, 46, 109, 101];
  for (i = 0; i < codes.length; i++) str += String.fromCharCode(codes[i]);
  document.location.href = str;
});
