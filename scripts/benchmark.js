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
        logs.push(`Error: Overlap for ${match.fc}/${match.bc}`)
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

    // Order
    const fhigh = new Color(theme.active.f_high).contrast(new Color(theme.active.background))
    const fmed = new Color(theme.active.f_med).contrast(new Color(theme.active.background))
    const flow = new Color(theme.active.f_low).contrast(new Color(theme.active.background))
    const bhigh = new Color(theme.active.b_high).contrast(new Color(theme.active.background))
    const bmed = new Color(theme.active.b_med).contrast(new Color(theme.active.background))
    const blow = new Color(theme.active.b_low).contrast(new Color(theme.active.background))

    if (fmed < flow) { logs.push('flip f_med with f_low') }
    if (fhigh < fmed) { logs.push('flip f_high with f_med') }
    if (bmed < blow) { logs.push('flip b_med with b_low') }
    if (bhigh < bmed) { logs.push('flip b_high with b_med') }

    // Distribution
    const fsum = fhigh + fmed + flow
    document.getElementById('dis_f_high').style.width = `${((fhigh / fsum) * 100).toFixed(2)}%`
    document.getElementById('dis_f_med').style.width = `${((fmed / fsum) * 100).toFixed(2)}%`
    document.getElementById('dis_f_low').style.width = `${((flow / fsum) * 100).toFixed(2)}%`

    const bsum = bhigh + bmed + blow
    document.getElementById('dis_b_high').style.width = `${((bhigh / bsum) * 100).toFixed(2)}%`
    document.getElementById('dis_b_med').style.width = `${((bmed / bsum) * 100).toFixed(2)}%`
    document.getElementById('dis_b_low').style.width = `${((blow / bsum) * 100).toFixed(2)}%`

    const perc = (score / (this.matches().length * 5)) * 100
    const cat = errors > 0 ? 'fix errors' : perc === 100 ? 'perfect' : perc > 80 ? 'good' : perc > 75 ? 'average' : 'bad'

    document.getElementById('score').innerHTML = `<span style='color:var(--f_high)'>${cat}</span> ${score}/${this.matches().length * 5} <span style='color:var(--f_low)'>${perc.toFixed(1)}%</span>`
    document.getElementById('debug').innerHTML = logs.join('\n')
  }
}
