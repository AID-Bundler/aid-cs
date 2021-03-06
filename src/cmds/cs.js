const { Command } = require('aid-bundler')
const { CharacterSheetManager } = require('../character_sheet')

function printCharacterSheet (data, options) {
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

function setStat (data, options, stat, value) {
  const csManager = new CharacterSheetManager(data, options)
  const cs = csManager.getPlayerCS()

  data.useAI = false
  data.text = ''

  if (cs.attributes[stat] == null) {
    data.text = '\n\nUnknown stat!'
    return
  }

  value = parseInt(value)
  if (isNaN(value)) {
    data.text = '\n\nValue is not a number!'
    return
  }

  cs.attributes[stat] = value
}

function printHelp (data) {
  data.useAI = false
  data.text = '\n'

  data.text += '\n/cs - View your character sheet.'
  data.text += '\n/cs help - View this help page.'
  data.text += '\n/cs set <stat> <value> - Assign a given value to a stat.'
}

function printNoCommand (data) {
  data.useAI = false
  data.text = ''
  data.message = 'Unknown command. Usage "/cs help" for usage.'
}

module.exports = function (options) {
  function handler (data, args) {
    if (args.length === 0) {
      printCharacterSheet(data, options.visual)
    } else if (args.length === 1 && args[0].toLowerCase() === 'help') {
      printHelp(data)
    } else if (args.length === 3 && args[0].toLowerCase() === 'set') {
      setStat(data, options, args[1], args[2])
    } else {
      printNoCommand(data)
    }
  }

  return new Command('cs', handler)
}
