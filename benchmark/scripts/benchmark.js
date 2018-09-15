function Benchmark()
{
  this.refresh = function(theme = this)
  {
    let el = document.getElementById("print")
    let html = ""
    let count = 0
    for(let fid in theme.active){
      if(fid.substr(0,1) != "f" || fid.indexOf("_inv") > -1){ continue; }
      let fc = theme.active[fid]
      for(let bid in theme.active){
        if(bid.substr(0,1) != "b" || bid.indexOf("_inv") > -1){ continue; }
        let bc = theme.active[bid]
        let rating = new Color(fc).contrast(new Color(bc));
        if(rating < 1.5){
          html += `Low contrast(${rating.toFixed(2)}): <b>${fid}</b> ${bid} <i>${bc}</i>\n`  
        }
        count += 1
      }
    }
    el.innerHTML = count > 0 ? `${html}\n<i>${count} conflicts</i>\n\n` : ""
  }
}
