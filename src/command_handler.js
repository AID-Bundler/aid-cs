class Command {
  constructor (name, handler) {
    this.name = name
    this.handler = handler
  }
}

const COMMANDS = [
  new Command('cs', require('./cmds/cs'))
]

const COMMAND_SYMBOL = '/'

function commandChecker (data) {
  let text = data.text.trim()
  if (!text.startsWith(COMMAND_SYMBOL)) {
    return false
  }

  text = text.substring(1).toLowerCase()

  for (const cmd of COMMANDS) {
    if (cmd.name === text) {
      cmd.handler(data)
      break
    }
  }

  return true
}

module.exports = {
  commandChecker
}