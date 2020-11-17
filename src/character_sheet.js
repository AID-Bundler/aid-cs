module.exports = function (attributes, skills) {
  function getPlayerCS (data) {
    if (!data.state.cs) {
      data.state.cs = { name: data.info.characters[0].name }
      initCharacterSheet(data.state.cs)
    }
  
    return data.state.cs
  }

  function getNpcCS (data, npcName) {
    if (!data.state.cs_npc) data.state.cs_npc = {}
    if (!data.state.cs_npc[npcName]) {
      data.state.cs_npc[npcName] = { name: npcName }
      initCharacterSheet(data.state.cs_npc[npcName])
    }

    return data.state.cs_npc[npcName]
  }

  function deleteNpcCS (data, npcName) {
    if (!data.state.cs_npc) data.state.cs_npc = {}
    delete data.state.cs_npc[npcName]
  }
  
  function initCharacterSheet (cs) {
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
  
  return {
    getNpcCS,
    deleteNpcCS,
    getPlayerCS
  }
}
