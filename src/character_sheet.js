function initCharacterSheet (cs, attributes, skills) {
  if (!cs.attributes) {
    cs.attributes = {}
    for (const att of attributes) {
      const attribute = {}
      attribute.name = att.name
      attribute.value = att.defaultValue
      cs.attributes[att.name] = attribute
    }
  }

  if (!cs.skills) {
    cs.skills = {}
    for (const skl of skills) {
      const skill = {}
      skill.name = skl.name
      skill.level = 1
      cs.skills[skl.name] = skill
    }
  }
}

class CharacterSheetManager {
  constructor (data, options) {
    this.data = data
    this.options = options

    if (options.attributes == null) {
      options.attributes = []
    }

    if (options.skills == null) {
      options.skills = []
    }
  }

  getPlayerCS () {
    if (!this.data.state.cs) {
      this.data.state.cs = { name: 'You' }
      initCharacterSheet(this.data.state.cs)
    }

    return this.data.state.cs
  }

  getNpcCS (npcName) {
    if (!this.data.state.cs_npc) this.data.state.cs_npc = {}
    if (!this.data.state.cs_npc[npcName]) {
      this.data.state.cs_npc[npcName] = { name: npcName }
      initCharacterSheet(
        this.data.state.cs_npc[npcName],
        this.plugin.options.attributes,
        this.plugin.options.skills
      )
    }

    return this.data.state.cs_npc[npcName]
  }

  deleteNpcCS (npcName) {
    if (!this.data.state.cs_npc) this.data.state.cs_npc = {}
    delete this.data.state.cs_npc[npcName]
  }
}

module.exports = { CharacterSheetManager }
