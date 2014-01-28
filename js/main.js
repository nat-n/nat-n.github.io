'use strict'

// remove setup class on load

$(window).bind("load", function(){
  $('#container.setup').removeClass('setup');
});

// maintain responsive classes
var container = $('#container');
function responsiveClass () {
  // use window widths
  var w = window.innerWidth;
  container.removeClass('responsive-large responsive-default responsive-portrait responsive-tablets responsive-phones');
  if (w >= 1200) {       // Large display
    container.addClass('responsive-large');
  } else if (w >= 980) { // Default
    container.addClass('responsive-default');
  } else if (w >= 768) { // Portrait tablets
    container.addClass('responsive-portrait');
  } else if (w >= 480) { // Phones to tablets
    container.addClass('responsive-tablets');
  } else {               // Phones
    container.addClass('responsive-phones');
  }
};
responsiveClass();
$(window).smartresize(function(){ responsiveClass(); });


// one way around the hover/tap problem on touch devices
$('a').on('dbltap', function(){ this.click(); });


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

// big ripple animation for clicks
function bigRipple(x, y) {
  var ripple = $('<div></div>')
    .addClass('ripple big-ripple')
    .offset({ top: y, left: x});
  rippleDiv.append(ripple);
  setTimeout(function(){ ripple.addClass('ripple-grow'); });
  setTimeout(function(){ ripple.remove(); }, 1000);
};

// make a big ripple from the icon when a nav link is clicked
$('#nav-links span, #nav-links a').click(function(e){
  var o = $(this.children[0]).offset();
  bigRipple(o.left+5, o.top+5);
});


/*

Make the bubbles drift dreamily.

*/

var Floater = (function() {
  var minY, minX, maxY, maxX, updateBounds;
  var floaterArea = $('div#bubble-wrapper'),
      floaterRadius = 43;

  function Floater(element) {
    var a_tag, self = this;

    // floater knows it's index in floaters array
    this.i = floaters.length;

    // set max bounds based on size/position of div.floaterArea
    updateBounds();

    this.element = element;
    this.element.onmouseover = function(e){
      self.frozen = true;
    };
    this.element.onmouseout = function(e){
      self.frozen = false;
    };

    this.element.onclick = function(e){
      bigRipple(floaterArea.offset().left+self.x+floaterRadius, floaterArea.offset().top+self.y+floaterRadius);
    };

    // move the title a attr to data-title so we can control the styling
    if (a_tag = $(this.element).children('a')) {
      a_tag.attr("data-title", a_tag.attr("title")).removeAttr("title");
    }

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
    var pos = floaterArea.position();
    minY = 0;
    minX = 0;
    maxX = pos.left + floaterArea.width() - floaterRadius * 2;
    maxY = minY + floaterArea.height() - floaterRadius * 2;
  }
  $(window).smartresize(updateBounds);
  //window.onresize = updateBounds;

  Floater.prototype.tick = function(delta) {
    var f, nx, ny, distance, i, other, factor, twodot, halfOverlap;
    // add dynamic forces
    // weak attraction to mouse?
    // random drift force? calculated from time depended sinwave field?


    // add velocity
    if (!this.frozen) {
      this.x += this.vx * delta;
      this.y += this.vy * delta;
    } else {
    }

    // detect bubble collisions
    for (i = this.i + 1; i < floaters.length; i++) {
      other = floaters[i];

      if (this === other) { continue; }

      // distance between centers of the two floaters
      distance = Math.sqrt( Math.pow(this.x - floaters[i].x, 2) + Math.pow(this.y - floaters[i].y, 2) );

      // detect and handle collisions between floaters
      if ( distance <= 2 * floaterRadius ) {
        // collision normal
        nx = (this.x - floaters[i].x) / distance;
        ny = (this.y - floaters[i].y) / distance;

        if (this.frozen) {
          // other bounces off this and this is unaffected
          twodot = 2 * (other.vx * nx + other.vy * ny);
          other.vx = other.vx - twodot * nx;
          other.vy = other.vy - twodot * ny;

          // instantaneously undo any overlap to avoid feedback errors
          halfOverlap = floaterRadius - distance / 2;
          other.x += other.vx * halfOverlap;
          other.y += other.vy * halfOverlap;

        } else if (other.frozen) {
          // this bounces off other and other is unaffected
          twodot = 2 * (this.vx * nx + this.vy * ny);
          this.vx = this.vx - twodot * nx;
          this.vy = this.vy - twodot * ny;

          // instantaneously undo any overlap to avoid feedback errors
          halfOverlap = floaterRadius - distance / 2;
          this.x += this.vx * halfOverlap;
          this.y += this.vy * halfOverlap;

        } else {
          // newtonian elastic collision with two free 2D bodies of equal mass

          // simplified elastic collision factor
          factor = (this.vx * nx + this.vy * ny) - (other.vx * nx + other.vy * ny);

          // make them bounce
          this.vx -= factor * nx;
          this.vy -= factor * ny;
          other.vx += factor * nx;
          other.vy += factor * ny;

          // instantly undo any overlap between floaters that occured between ticks
          halfOverlap = floaterRadius - distance / 2;
          this.x += nx * halfOverlap;
          this.y += ny * halfOverlap;
          other.x -= nx * halfOverlap;
          other.y -= ny * halfOverlap;

        }
      }
    };

    // detect and handle boundary collisions

    if (this.x < minX) {
      this.x += minX - this.x;
      this.vx = -this.vx;
    } else if (this.x > maxX) {
      this.x += maxX - this.x;
      this.vx = -this.vx;
    }

    if (this.y < minY) {
      this.y += minY - this.y;
      this.vy = -this.vy;
    } else if (this.y > maxY) {
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
