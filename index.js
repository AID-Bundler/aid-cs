const csCommand = require('./src/cmds/cs')

module.exports = function (options) {
  return {
    csCommand: csCommand(options)
  }
}
