/** @extends {Item} */
export class GssItem extends Item {
  prepareData() {
    super.prepareData();
  }

  /** @private */
   getRollData() {
    // If present, return the actor's roll data.
    if ( !this.actor ) return null;
    const rollData = this.actor.getRollData();
    rollData.item = foundry.utils.deepClone(this.data.data);

    return rollData;
  }

  /** @private */
  async roll() {
    const item = this.data;
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Initialize chat data.
	const speaker = ChatMessage.getSpeaker({ actor: this.actor });
	const rollMode = game.settings.get('core', 'rollMode');
	
	const cost = game.i18n.localize('GSS.Cost');
	const pow = game.i18n.localize('GSS.Powers');
	const addi = game.i18n.localize('GSS.Additional');
	const weak = game.i18n.localize('GSS.Weakness');
	
	

    // If there's no roll data, send a chat message.
    if (!this.data.data.formula) {
		if (dataset.rollType == 'power') {
			const label = `<div class="poweruse-header flex"><div class="costs"></div><h2 class="poweruse-name">${item.name}</h2><div class="costs"><span class="costhead">${cost}</span><h2 class="poweruse-cost"> ${item.data.cost}</h2></div></div><div class="poweruse-label">${item.data.for} ${pow}</div>`;
			ChatMessage.create({
			speaker: speaker,
			rollMode: rollMode,
			flavor: label,
			content: item.data.description ?? ''
			});
		}
		else if (dataset.rollType == 'addi') {
			const labeladdi = `<div class="poweruse-header flex"><div class="costs"></div><h2 class="poweruse-name">${item.data.addi.name}</h2><div class="costs"><span class="costhead">${cost}</span><h2 class="poweruse-cost"> ${item.data.cost}</h2></div></div><div class="poweruse-label">${item.data.for} ${addi}</div>`;
			ChatMessage.create({
			speaker: speaker,
			rollMode: rollMode,
			flavor: labeladdi,
			content: item.data.addi.description ?? ''
			});
		}
		else if (dataset.rollType == 'weak') {
			const labelweak = `<div class="poweruse-header flex"><div class="costs"></div><h2 class="poweruse-name">${item.data.weak.name}</h2><div class="costs"></div></div><div class="poweruse-label">${item.data.for} ${weak}</div>`;
			ChatMessage.create({
			speaker: speaker,
			rollMode: rollMode,
			flavor: labelweak,
			content: item.data.weak.description ?? ''
			});
		}
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();

      // Invoke the roll and submit it to chat.
      const roll = new Roll(rollData.item.formula, rollData).roll();
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }
}
