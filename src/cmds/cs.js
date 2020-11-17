const { Command } = require('aid-bundler')

module.exports = function (getPlayerCS) {
  return function (options) {
    function handler (data) {
      const cs = getPlayerCS(data)
  
      data.useAI = false
      data.text = options.header
    
      let row = ''
      let col = 0
      for (const attName in cs.attributes) {
        const att = cs.attributes[attName]
    
        if (col > 0) {
          row += ' | '
        }
    
        row += att.name + ':'
        row += att.value.toString().padStart(options.numberPadding - (att.name.length + 1), ' ')
    
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
}
