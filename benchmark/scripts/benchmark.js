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
    function _relative_luminance(rgb)
    {
      let r = _linear(rgb[0] / 256)
      let g = _linear(rgb[1] / 256)
      let b = _linear(rgb[2] / 256)
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }

    function _linear(v)
    {
      return (v <= 0.03928) ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) 
    }

    function _contrast(c0, c1)
    {
      let l0 = _relative_luminance(c0)
      let l1 = _relative_luminance(c1)
      return l0 > l1 ? (l0 + 0.05) / (l1 + 0.05) : (l1 + 0.05) / (l0 + 0.05)
    }

    let ratio = _contrast(c0, c1)

    return { 
      ratio, 
      aa: ratio > 4.5, 
      aaa: ratio > 7.0,
      large: {
        aa: ratio > 3.0,
        aaa: ratio > 4.5
      }
    }
  }

  this.refresh = function()
  {
    let el = document.getElementById('print')
    let html = ""
    let count = 0
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
            document.querySelector(`.${fid}.${bid === 'background' ? 'bg' : bid}`).innerHTML += ` (${c.ratio.toFixed(1)} ${c.aaa ? '✓✓✓' : c.aa ? '✓✓' : c.large.aa ? '✓' : '✗'})`
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
    else
    {
      let frgb = hex_to_rgb(theme.active.f_inv)
      let brgb = hex_to_rgb(theme.active.b_inv)
      if(frgb && brgb){
        let c = wcag_contrast(frgb, brgb)
        document.querySelector(`.f_inv.b_inv`).innerHTML += ` (${c.ratio.toFixed(1)} ${c.aaa ? '✓✓✓' : c.aa ? '✓✓' : c.large.aa ? '✓' : '✗'})`
      }
      else{
        console.warn(`Unable to evaluate against WCAG 2.0: ${frgb} ${brgb}`)
      }
    }
    el.innerHTML = count > 0 ? html+`\n<i>${count} conflicts</i>` : '';
  }
}