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
    if(event.currentSlide)  event.currentSlide.dispatchEvent(shown);
    currentSlide = event.currentSlide;
  });


  function SlideBuilder(element){
    this.slide_el = element;
    // this.fragment_els = [];
  }

  // forward event listeners to slide element
  SlideBuilder.prototype.addEventListener = function( type, listener, useCapture ) {
    if( 'addEventListener' in window ) {
      this.slide_el.addEventListener( type, listener, useCapture );
    }

    // re-fire slide shown events incase it was already loaded
    // if(type == 'shown' && currentSlide == this.slide_el){
    //   this.slide_el.dispatchEvent(shown);
    // }

    return this;
  }

  SlideBuilder.prototype.addFragment = function(text){

    var el = document.createElement('div');
    el.className = 'fragment';
    el.innerText = text || '';

    // el.addEventListener('shown', listener);
    // el.addEventListener('hidden', hide_listener);
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
