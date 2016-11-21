(function(exports){

  function GraphicsSlide (selector) {
    this.element = document.querySelector(selector)

    var ratio = window.devicePixelRatio || 1
    var canvas = document.createElement('canvas')
    var w = canvas.width = Reveal.getConfig().width * ratio
    var h = canvas.height = Reveal.getConfig().height * ratio

    canvas.style.width  = w/ratio + 'px'
    canvas.style.height = h/ratio + 'px'

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

    var fillStyle = 1
    var bs = 90
    var tbs = 90

    function render(t) {
      if(animating)
        requestAnimationFrame(render)
      else
        requested = false

      ctx.clearRect(0,0,w,h)
      ctx.save()
      ctx.translate(w/2,h/2)

      bs = tbs * 0.1 + bs * 0.9

      var l = 10

      for(var i = 0; i < l; i++){

        ctx.fillStyle =
          fillStyle == 1 ? 'hsla('+(i/l)*360+',50%,50%,0.1)' :
          fillStyle == 2 ? 'hsla(0,'+(i/l)*100+'%,50%,0.2)' :
          'rgba(255,'+(i/l)*255+',150,0.3)'



        var s = bs + Math.sin(t/1000)*20*i

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
      .fragments([
        function() {tbs = 700},
        function() {tbs = 70},
        function() {fillStyle = 2},
        function() {fillStyle = 3; tbs = 140}

      ])
      .hidden(teardown)
  }

  exports.GraphicsSlide = GraphicsSlide
})(this)
