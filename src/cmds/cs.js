const { getPlayerCS, CS_CONFIG } = require('../character_sheet')

module.exports = function (data) {
  data.useAI = false
  data.text = ''

  const cs = getPlayerCS(data)
  printCS(cs)
}

function printCS(cs) {
  data.message = CS_CONFIG.visual.header

  let row = ''
  let col = 0
  for (const att in cs.attributes) {

    if (col > 0) {
      row += ' | '
    }

    row += att.name + ':'
    row += att.value().toString().padStart(CS_CONFIG.visual.numberPadding, ' ')

    col += 1
    if (col === CS_CONFIG.visual.columns) {
      data.message += '\n' + row
      col = 0
      row = ''
    }
  }

  if (col > 0) {
    data.message += '\n' + row
  }

  data.message += '\n ' + CS_CONFIG.visual.footer
}