/**
 * Created by patrick on 2/7/17.
 */
var Kinetic = (function (d3) {
  'use strict'
  var width = 300
  var height = 275
  var step = 8
  var bars = 30
  var kinetic = 4

  var xi = rand(step)
  var xj = rand(step)
  var yi = rand(step)
  var yj = rand(step)

  var x = rand(width) + 1
  var y = rand(height) + 1
  var x1 = rand(width) + 1
  var y1 = rand(height) + 1

  var i = 1
  var e = 2

  var a = []
  var color = 'FFFFD2'
  for (var n = 1; n <= bars; n++) {
    a[n] = ['line' + n, 0, 0, 0, 0, '#' + color]
    color = (parseInt(color, 16) - 7).toString(16)
  }

  function rand (max) {
    return Math.floor(Math.random() * max)
  }

  function eraseBar (lineArray) {
    d3.select('#' + lineArray[0]).remove()
  }

  function drawBar (lineArray) {
    return d3.select('#canvas').append('line')
      .attr('id', lineArray[0])
      .attr('x1', lineArray[1])
      .attr('y1', lineArray[2])
      .attr('x2', lineArray[3])
      .attr('y2', lineArray[4])
      .attr('stroke', lineArray[5])
  }

  function spin (length) {
    return Math.floor(Math.sin(length) * (rand(step) + kinetic))
  }

  return {
    animateReps: Number.MAX_SAFE_INTEGER,
    animateDelay: 25,
    animateWidth: width,
    animateHeight: height,

    timeoutLoop: function (fn, reps, delay) {
      if (reps > 0) {
        setTimeout(function () {
          fn()
          Kinetic.timeoutLoop(fn, reps - 1, delay)
        }, delay)
      }
    },

    animate: function () {
      eraseBar(a[e])
      a[i] = [a[i][0], x, y, x1, y1, a[i][5]]
      drawBar(a[i])

      i++
      if (i > bars) {
        i = 1
      }
      e++
      if (e > bars) {
        e = 1
      }

      if (xi === 0) {
        xi = 1
      }
      if (x + xi <= 1) {
        xi = spin(xi)
      }
      if (x + xi >= this.animateWidth) {
        x = this.animateWidth
        xi = -1 * spin(xi)
      }

      if (xj === 0) {
        xj = 1
      }
      if (x1 + xj <= 1) {
        xj = spin(xj)
      }
      if (x1 + xj >= this.animateWidth) {
        x1 = this.animateWidth
        xj = -1 * spin(xj)
      }

      if (yi === 0) {
        yi = 1
      }
      if (y + yi <= 1) {
        yi = spin(yi)
      }
      if (y + yi >= this.animateHeight) {
        y = this.animateHeight
        yi = -1 * spin(yi)
      }

      if (yj === 0) {
        yj = 1
      }
      if (y1 + yj <= 1) {
        yj = spin(yj)
      }
      if (y1 + yj >= this.animateHeight) {
        y1 = this.animateHeight
        yj = -1 * spin(yj)
      }

      x = x + xi
      y = y + yi
      x1 = x1 + xj
      y1 = y1 + yj
    }
  }
})(d3)
