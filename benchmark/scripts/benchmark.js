function Benchmark()
{
  this.matches = function()
  {
    var a = [{id:`b_inv:f_inv`,fc:theme.active.f_inv,bc:theme.active.b_inv}]
    for(let fid in theme.active){
      if(fid.substr(0,1) != "f" || fid.indexOf("_inv") > -1){ continue; }
      let fc = theme.active[fid]
      for(let bid in theme.active){
        if(bid.substr(0,1) != "b" || bid.indexOf("_inv") > -1){ continue; }
        let bc = theme.active[bid]
        a.push({id:`${bid}:${fid}`,fc:fc,bc:bc})
      }
    }
    return a;
  }

  this.refresh = function()
  {
    let el = document.getElementById("print")
    let html = ""
    let count = 0
    let matches = bench.matches();

    for(let id in matches){
      html += bench.log(matches[id].id,matches[id].fc,matches[id].bc)
    }
    
    el.innerHTML = html
  }

  this.log = function(id,fc,bc)
  {
    let html = ""

    let rating = new Color(fc).contrast(new Color(bc));

    if(rating == 1){
      html += `Overlap: <b>${id}</b> <i>${bc}</i>\n`  
    }
    else if(rating < 1.5){
      html += `Low contrast(${rating.toFixed(2)}): <b>${id}</b> <i>${bc}</i>\n`  
    }

    return html
  }
}
