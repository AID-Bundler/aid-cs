const { commandChecker } = require('./command_handler')

module.exports = function (text, state, info, worldEntries, history) {
  const data = new AIDData(text, state, info, worldEntries, history)
  commandChecker(data)

  return data.finalizeOutput()
}
