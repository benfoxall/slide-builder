;(function(global, Reveal){

  // pass shown/hidden events down to the fragments and slides

  var shown = new CustomEvent("shown", {}),
      hidden = new CustomEvent("hidden", {}),
      currentSlide;

  Reveal.addEventListener( 'fragmentshown', function( event ) {
    event.fragment.dispatchEvent(shown);
  })

  Reveal.addEventListener( 'fragmenthidden', function( event ) {
    event.fragment.dispatchEvent(hidden);
  });

  Reveal.addEventListener( 'slidechanged', function( event ) {
    if(event.previousSlide) event.previousSlide.dispatchEvent(hidden);
    if(event.currentSlide)  event.currentSlide.dispatchEvent(shown);
    currentSlide = event.currentSlide;
  });

  Reveal.addEventListener( 'ready', function( event ) {
    currentSlide = event.currentSlide;
  });


  function SlideBuilder(element){
    this.slide_el = element;

    // if this is loaded dynamically, reveal might have loaded
    // check to see if we're displayed
    if(element === currentSlide) {
      setTimeout(() =>{
        element.dispatchEvent(shown)
      }, 10)
    }
  }

  // forward event listeners to slide element
  SlideBuilder.prototype.addEventListener = function( type, listener, useCapture ) {
    if( 'addEventListener' in window ) {
      this.slide_el.addEventListener( type, listener, useCapture );
    }

    return this;
  }

  SlideBuilder.prototype.addFragment = function(text){

    var el = document.createElement('div');
    el.className = 'fragment';
    el.innerText = text || '';

    this.slide_el.appendChild(el);

    return el;
  }

  // shorthand
  SlideBuilder.prototype.fragments = function(callbacks){
    var self = this;
    callbacks.forEach(function(fn){
      self.addFragment()
        .addEventListener('shown', fn);
    })

    return this
  }


  SlideBuilder.prototype.shown = function(fn) {
    this.addEventListener('shown', fn)
    return this
  }

  SlideBuilder.prototype.hidden = function(fn) {
    this.addEventListener('hidden', fn)
    return this
  }


  global.SlideBuilder = SlideBuilder;

})(this, Reveal);
