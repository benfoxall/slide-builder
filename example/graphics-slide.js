(function(exports){

  function GraphicsSlide (selector) {
    this.element = document.querySelector(selector)

    var canvas = document.createElement('canvas')
    var w = canvas.width = Reveal.getConfig().width
    var h = canvas.height = Reveal.getConfig().height
    this.element.appendChild(canvas)

    var ctx = canvas.getContext('2d')

    var animating, requested

    function setup() {
      animating = true

      if(!requested) {
        requested = true
        requestAnimationFrame(render)
      }

    }

    function teardown () {
      animating = false
    }

    function render(t) {
      if(animating)
        requestAnimationFrame(render)
      else
        requested = false

      ctx.clearRect(0,0,w,h)
      ctx.save()
      ctx.translate(w/2,h/2)

      var l = 10

      for(var i = 0; i < l; i++){

        ctx.fillStyle = 'hsla('+(i/l)*360+',50%,50%,0.1)'
        var s = 60 + Math.sin(t/1000)*15*i

        ctx.save()
        ctx.rotate(t/3000+i*Math.sin(t/1000))
        ctx.fillRect(-s,-s,s*2,s*2)
        
        // ctx.beginPath()
        // ctx.arc(0,0,Math.abs(s),0,Math.PI*2)
        // ctx.fill()

        ctx.restore()
      }

      ctx.restore()
    }



    // hook up to slide builder
    new SlideBuilder(this.element)
      .shown(setup)
      .hidden(teardown)
  }

  exports.GraphicsSlide = GraphicsSlide
})(this)
