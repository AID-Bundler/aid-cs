module.exports = function (text, state, info, worldEntries, history) {
  const data = new AIDData(text, state, info, worldEntries, history)
  return data.finalizeOutput()
}
