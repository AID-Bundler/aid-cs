const { Command } = require('aid-bundler')
const { CharacterSheetManager } = require('../character_sheet')

module.exports = function (options) {
  options = options.visual

  function handler (data, args) {
    const csManager = new CharacterSheetManager(data, options)
    const cs = csManager.getPlayerCS()

    data.useAI = false

    data.text = '\n\n'
    data.text += options.header

    let row = ''
    let col = 0
    for (const attName in cs.attributes) {
      const att = cs.attributes[attName]

      if (col > 0) {
        row += ' | '
      }

      row += att.name + ':'
      row += att.value
        .toString()
        .padStart(options.numberPadding - (att.name.length + 1), ' ')

      col += 1
      if (col === options.columns) {
        data.text += '\n' + row
        col = 0
        row = ''
      }
    }

    if (col > 0) {
      data.text += '\n' + row
    }

    data.text += '\n ' + options.footer
  }

  return new Command('cs', handler)
}
