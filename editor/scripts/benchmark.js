'use strict'

/* global theme */
/* global Color */

function Benchmark () {
  this.matches = () => {
    var a = [{ id: 'b_inv_f_inv', fc: theme.active.f_inv, bc: theme.active.b_inv }]
    for (const fid in theme.active) {
      if (fid.substr(0, 1) !== 'f' || fid.indexOf('_inv') > -1) { continue }
      const fc = theme.active[fid]
      for (const bid in theme.active) {
        if (bid.substr(0, 1) !== 'b' || bid.indexOf('_inv') > -1) { continue }
        const bc = theme.active[bid]
        a.push({ id: `${bid}_${fid}`, fc: fc, bc: bc })
      }
    }
    return a
  }

  this.refresh = () => {
    const logs = []
    let score = 0
    let errors = 0

    for (const match of this.matches()) {
      const rating = new Color(match.fc).contrast(new Color(match.bc))
      const cell = document.getElementById(match.id)

      let rune = ''
      if (rating === 1) {
        rune = '[X]'
        errors += 1
      } else if (rating < 1.25) {
        rune = '[!]'
        score += 1
      } else if (rating < 2) {
        rune = '[~]'
        score += 2
      } else {
        score += 5
      }
      cell.innerHTML = `${rating.toFixed(2)}<span style='color:var(--f_inv)'>${rune}<span>`
    }

    const perc = (score / (this.matches().length * 5)) * 100
    const cat = errors > 0 ? 'fix errors' : perc === 100 ? 'perfect' : perc > 80 ? 'good' : perc > 75 ? 'average' : 'bad'

    document.getElementById('score').innerHTML = `<span style='color:var(--f_high)'>${cat}</span> ${score}/${this.matches().length * 5} <span style='color:var(--f_low)'>${perc.toFixed(1)}%</span>`
    document.getElementById('debug').innerHTML = logs.join('\n')
  }
}
