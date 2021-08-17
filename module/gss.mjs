import { GssActor } from "./actor.mjs";
import { GssItem } from "./item.mjs";
import { GssActorSheet } from "./actor-sheet.mjs";
import { GssItemSheet } from "./item-sheet.mjs";
import { DreamCatcher } from "./dreamcatcher.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {

  const GSS = {};
  
  game.gss = {
    GssActor,
    GssItem,
    DreamCatcher: []
  };

  CONFIG.GSS = GSS;

  CONFIG.Actor.documentClass = GssActor;
  CONFIG.Item.documentClass = GssItem;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("gss", GssActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("gss", GssItemSheet, { makeDefault: true });
  
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

const preloadHandlebarsTemplates = async function() {
  return loadTemplates([
    "systems/gss/templates/actor/connections.html",
    "systems/gss/templates/actor/powers.html"
  ]);
};

Handlebars.registerHelper('concat', function() {
  var outStr = '';
  for (var arg in arguments) {
    if (typeof arguments[arg] != 'object') {
      outStr += arguments[arg];
    }
  }
  return outStr;
});

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.on("updateActor", function() {
    game.gss.DreamCatcher = game.gss.DreamCatcher.filter(e => e._state != -1);
    var viewers = game.gss.DreamCatcher;

    if (viewers.length != 0) {
        for (let viewer of viewers)
            viewer.render(true);
    }

});

Hooks.on("getSceneControlButtons", function(controls) {
    controls[0].tools.push({
        name: "dreams",
        title: game.i18n.localize('GSS.Givedream'),
        icon: "fas fa-smile",
        visible: true,
        onClick: () => dreamDialog(),
        button: true
    });

});

function dreamDialog() {
    var actors = game.data.actors.filter(element => element.type == "character" && element.data.isdreamed == true);

    let dialog = new DreamCatcher(actors);
    dialog.render(true);
}