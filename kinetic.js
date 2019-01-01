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
  var colors = ['FFFFD2', '12FFFF', 'FF12FF']

  function makeLines (colors) {
    var colorIndex = 0
    var lines = []
    var lineIndex = 0
    for (colorIndex in colors) {
      lines[lineIndex] = {
        xi: rand(step),
        xj: rand(step),
        yi: rand(step),
        yj: rand(step),
        x: rand(width) + 1,
        y: rand(height) + 1,
        x1: rand(width) + 1,
        y1: rand(height) + 1,
        i: 1,
        e: 2,
        a: [],
        color: colors[colorIndex]
      }
      for (var n = 1; n <= bars; n++) {
        lines[lineIndex].a[n] = ['line' + n, 0, 0, 0, 0, '#' + lines[lineIndex].color]
        lines[lineIndex].color = (parseInt(lines[lineIndex].color, 16) - 7).toString(16)
      }
      lineIndex++
    }
    return lines
  }

  var lines = makeLines(colors)

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
      for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        var lineObj = lines[lineIndex]
        eraseBar(lineObj.a[lineObj.e])
        lineObj.a[lineObj.i] = [
          lineObj.a[lineObj.i][0],
          lineObj.x,
          lineObj.y,
          lineObj.x1,
          lineObj.y1,
          lineObj.a[lineObj.i][5]
        ]
        drawBar(lineObj.a[lineObj.i])

        lineObj.i++
        if (lineObj.i > bars) {
          lineObj.i = 1
        }
        lineObj.e++
        if (lineObj.e > bars) {
          lineObj.e = 1
        }

        if (lineObj.xi === 0) {
          lineObj.xi = 1
        }
        if (lineObj.x + lineObj.xi <= 1) {
          lineObj.xi = spin(lineObj.xi)
        }
        if (lineObj.x + lineObj.xi >= this.animateWidth) {
          lineObj.x = this.animateWidth
          lineObj.xi = -1 * spin(lineObj.xi)
        }

        if (lineObj.xj === 0) {
          lineObj.xj = 1
        }
        if (lineObj.x1 + lineObj.xj <= 1) {
          lineObj.xj = spin(lineObj.xj)
        }
        if (lineObj.x1 + lineObj.xj >= this.animateWidth) {
          lineObj.x1 = this.animateWidth
          lineObj.xj = -1 * spin(lineObj.xj)
        }

        if (lineObj.yi === 0) {
          lineObj.yi = 1
        }
        if (lineObj.y + lineObj.yi <= 1) {
          lineObj.yi = spin(lineObj.yi)
        }
        if (lineObj.y + lineObj.yi >= this.animateHeight) {
          lineObj.y = this.animateHeight
          lineObj.yi = -1 * spin(lineObj.yi)
        }

        if (lineObj.yj === 0) {
          lineObj.yj = 1
        }
        if (lineObj.y1 + lineObj.yj <= 1) {
          lineObj.yj = spin(lineObj.yj)
        }
        if (lineObj.y1 + lineObj.yj >= this.animateHeight) {
          lineObj.y1 = this.animateHeight
          lineObj.yj = -1 * spin(lineObj.yj)
        }

        lineObj.x = lineObj.x + lineObj.xi
        lineObj.y = lineObj.y + lineObj.yi
        lineObj.x1 = lineObj.x1 + lineObj.xj
        lineObj.y1 = lineObj.y1 + lineObj.yj
      }
    }
  }
})(d3)
