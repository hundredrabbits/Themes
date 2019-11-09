'use strict'

function Color (hex = '#000000') {
  this.hex = hex

  var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.hex)

  this.rgb = { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) }

  this.r = this.rgb.r
  this.g = this.rgb.g
  this.b = this.rgb.b

  this.average = parseInt((this.rgb.r + this.rgb.g + this.rgb.b) / 3)
  this.invert = { r: 255 - this.rgb.r, g: 255 - this.rgb.g, b: 255 - this.rgb.b }

  this.contrast = function (b) {
    const lumA = 0.2126 * _linear(this.r / 256) + 0.7152 * _linear(this.g / 256) + 0.0722 * _linear(this.b / 256)
    const lumB = 0.2126 * _linear(b.r / 256) + 0.7152 * _linear(b.g / 256) + 0.0722 * _linear(b.b / 256)
    return lumA > lumB ? (lumA + 0.05) / (lumB + 0.05) : (lumB + 0.05) / (lumA + 0.05)
  }

  this.rgba = function () {
    return 'rgba(' + this.rgb().r + ',' + this.rgb().g + ',' + this.rgb().b + ',1)'
  }

  this.floats = function () {
    return { r: this.rgb.r / 255, g: this.rgb.g / 255, b: this.rgb.b / 255 }
  }

  this.toString = function () {
    return this.hex
  }

  function _linear (v) { return (v <= 0.03928) ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
}
