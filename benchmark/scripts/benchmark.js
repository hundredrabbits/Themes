function Benchmark()
{
  function hex_to_rgb(c)
  {
    let rgb
    if(c.length === 4 || c.length === 7){ c = c.slice(1) }
    if(c.length === 3){
      rgb = [ parseInt(c.slice(0, 1), 16) * 17, parseInt(c.slice(1, 2), 16) * 17, parseInt(c.slice(2, 3), 16) * 17 ]
    }
    else if(c.length === 6){
      rgb = [ parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16) ]
    }
    return (!rgb || isNaN(rgb[0]) || isNaN(rgb[1]) || isNaN(rgb[2])) ? null : rgb
  }

  function wcag_contrast(c0, c1)
  {
    function _linear(v){ return (v <= 0.03928) ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
    function _relative_luminance(rgb)
    {
      let r = _linear(rgb[0] / 256)
      let g = _linear(rgb[1] / 256)
      let b = _linear(rgb[2] / 256)
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    function _contrast(c0, c1)
    {
      let l0 = _relative_luminance(c0)
      let l1 = _relative_luminance(c1)
      return l0 > l1 ? (l0 + 0.05) / (l1 + 0.05) : (l1 + 0.05) / (l0 + 0.05)
    }
    let Contrast = function(r)
    {
      this.ratio = r.toFixed(1)
      this.aa = r > 4.5
      this.aaa = r > 7.0
      this.large = {
        aa: r > 3.0,
        aaa: r > 4.5
      }
    }
    Contrast.prototype.toString = function()
    {
      let str = this.ratio.toString()
      if(this.aaa){ str += " ✓✓✓" }
      else if(this.aa && this.large.aaa){ str += " ✓✓~" }
      else if(this.large.aaa){ str += " ~~~" }
      else if(this.aa){ str += " ✓✓" }
      else if(this.large.aa){ str += " ~~" }
      else { str += " ✗" }
      return str
    }
    return new Contrast(_contrast(c0, c1))
  }

  this.refresh = function(theme = this)
  {
    let el = document.getElementById("print")
    let html = ""
    let count = 0
    let contrast = {}
    let contrast_html = ""
    let contrast_count = 0
    for(let fid in theme.active){
      if(fid.substr(0,1) != "f" || fid.indexOf("_inv") > -1){ continue; }
      let fc = theme.active[fid]
      for(let bid in theme.active){
        if(bid.substr(0,1) != "b" || bid.indexOf("_inv") > -1){ continue; }
        let bc = theme.active[bid]
        if(fc != bc){
          let frgb = hex_to_rgb(fc)
          let brgb = hex_to_rgb(bc)
          if(frgb && brgb){
            let c = wcag_contrast(frgb, brgb)
            if(!c.aa)
            {
              contrast_html += `<b>${fid}</b> ${bid} <i>has low contrast (${c.toString()})</i>\n`
              contrast_count += 1
            }
            contrast[fid] = { [bid]: c.toString(), ...contrast[fid] }
          }
          else{
            console.warn(`Unable to evaluate against WCAG 2.0: ${frgb} ${brgb}`)
          }
          
          continue; 
        }
        html += `<b>${fid}</b> ${bid} <i>${bc}</i>\n`
        count += 1
      }
    }
    if(theme.active.f_inv == theme.active.b_inv){
      html += `<b>f_inv</b> b_inv <i>${theme.active.f_inv}</i>\n`
      count += 1
    }
    else{
      let frgb = hex_to_rgb(theme.active.f_inv)
      let brgb = hex_to_rgb(theme.active.b_inv)
      if(frgb && brgb){
        let c = wcag_contrast(frgb, brgb)
        if(!c.aa){
          contrast_html += `<b>f_inv</b> b_inv <i>has low contrast (${c.toString()})</i>\n`
          contrast_count += 1
        }
        contrast["f_inv"] = {"b_inv": wcag_contrast(frgb, brgb).toString() }
      }
      else{
        console.warn(`Unable to evaluate against WCAG 2.0: ${frgb} ${brgb}`)
      }
    }
    console.info("WCAG 2.0 contrast:")
    console.table(contrast)
    el.innerHTML = count > 0 ? `${html}\n<i>${count} conflicts</i>\n\n` : ""
    el.innerHTML += contrast_count > 0 ? `${contrast_html}\n<i>${contrast_count} contrast warnings</i>` : ""
  }
}
