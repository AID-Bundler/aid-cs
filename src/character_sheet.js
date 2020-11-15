const CS_CONFIG = {

  visual: {
    header: '<===== { Character Sheet } =====>',
    footer: '<=========== { 1/1 } ===========>',
    columns: 3,
    numberPadding: 4
  },

  attributes: [
    {
      name: 'health',
      "abbreviation": 'hp',
      defaultValue: 1
    },
    {
      name: 'max health',
      "abbreviation": 'mhp',
      defaultValue: 1
    }
  ],

  skills: [
    {
      name: 'sprint'
    }
  ]
}

function getPlayerCS (data) {
  if (!data.state.cs) {
    data.state.cs = {}
    data.state.cs.name = 'Player'
    initCharacterSheet(data.state.cs)
  }

  return data.state.cs
}

function initCharacterSheet (cs) {
  if (!cs.name) {
    cs.name = 'Unnamed'
  }

  if (!cs.attributes) {
    cs.attributes = {}
    for (const att of CS_CONFIG.attributes) {
      const attribute = {}
      attribute.name = att.name
      attribute.value = att.defaultValue
      cs.attributes[att.name] = attribute
    }
  }

  if (!cs.skills) {
    cs.skills = {}
    for (const skl of CS_CONFIG.skills) {
      const skill = {}
      skill.name = skl.name
      skill.level = 1
      cs.skills[skl.name] = skill
    }
  }
}

module.exports = {
  initCharacterSheet,
  getPlayerCS,
  CS_CONFIG
}