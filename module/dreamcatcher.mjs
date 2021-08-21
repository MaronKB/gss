export class DreamCatcher extends Dialog {
    constructor(actor, options) {
        super(options);

        this.actor = actor;
        this.data = {
            title: game.i18n.localize('GSS.Dreamcatcher'),
            content: "",
            buttons: {}
        };

        game.gss.DreamCatcher.push(this);
    }

      /** @override */
	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/gss/templates/dreamcatcher.html",
            classes: ["gss", "dialog"],
			width: 575,
			height: 170
        });
    }

    /** @override */
    getData() {
        let buttons = Object.keys(this.data.buttons).reduce((obj, key) => {
          let b = this.data.buttons[key];
          if ( b.condition !== false ) obj[key] = b;
          return obj;
        }, {});

        let actors = [];
        for (let a of this.actor) {
            var actor = game.actors.get(a._id);
            var dream = a.data.resources.dream.value;

            actors.push({id: a._id, image: actor.img, name: a.name, dream: dream});
        }

        return {
            content: this.data.content,
            buttons: buttons,
            actors: actors
        }
    }

    
      /** @override */
	activateListeners(html) {
        super.activateListeners(html);

        html.find('.add-dream').on('mousedown', this._onAddDream.bind(this, html));
    }


    async _onAddDream(html, event) {
        var target = $(event.currentTarget);
        var actor = game.actors.get(target.parent()[0].dataset.id);

        var dream = actor.data.data.resources.dream.value + 1;

        await actor.update({"data.resources.dream.value": dream});
    }

}
