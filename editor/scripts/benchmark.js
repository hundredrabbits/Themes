'use strict'

function Benchmark () {
  this.matches = function () {
    var a = [{ id: 'b_inv_f_inv', fc: theme.active.f_inv, bc: theme.active.b_inv }]
    for (const fid in theme.active) {
      if (fid.substr(0, 1) != 'f' || fid.indexOf('_inv') > -1) { continue }
      const fc = theme.active[fid]
      for (const bid in theme.active) {
        if (bid.substr(0, 1) != 'b' || bid.indexOf('_inv') > -1) { continue }
        const bc = theme.active[bid]
        a.push({ id: `${bid}_${fid}`, fc: fc, bc: bc })
      }
    }
    return a
  }

  this.refresh = function () {
    const el = document.getElementById('print')
    const html = ''
    const count = 0
    const matches = bench.matches()

    console.log(matches)
    for (const match of matches) {
      const cell = document.getElementById(match.id)
      console.log(cell, match.id)
      // cell.textContent = '0.0'
    }

    el.innerHTML = html
  }

  this.log = function (id, fc, bc) {
    let html = ''

    const rating = new Color(fc).contrast(new Color(bc))

    if (rating == 1) {
      html += `Overlap: <b>${id}</b> <i>${bc}</i>\n`
    } else if (rating < 1.5) {
      html += `Low contrast(${rating.toFixed(2)}): <b>${id}</b> <i>${bc}</i>\n`
    }

    return html
  }
}
