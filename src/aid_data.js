class AIDData {
  constructor (text, state, info, worldEntries, history) {
    this.text = text
    this.state = state
    this.info = info
    this.worldEntries = worldEntries
    this.history = history
    this.useAI = true
    delete state.message
  }

  finalizeOutput () {
    return {
      text: this.text,
      stop: !this.useAI
    }
  }

  set message (value) {
    this.state.message = value
  }

  get message () {
    return this.state.message
  }
}

module.exports = {
  AIDData
}