const csCommand = require('./src/cmds/cs')
const csHandlers = require('./src/character_sheet')

module.exports = function (options) {
  if (options.attributes == null) options.attributes = []
  if (options.skills == null) options.skills = []
  const { getPlayerCS, getNpcCS, deleteNpcCS } = csHandlers(options.attributes, options.skills)

  return {
    csCommand: csCommand(getPlayerCS),
    getPlayerCS,
    getNpcCS,
    deleteNpcCS
  }
}