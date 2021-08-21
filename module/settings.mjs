export default class SysSettings {
  static get(key) {
    return game.settings.get('gss', key)
  }
  static register() {
    game.settings.register('gss', 'hide-dreams-oncharactersheet', {
		name: game.i18n.localize('GSS.Setting.Hidedreams'),
		hint: game.i18n.localize('GSS.Setting.HidedreamsHint'),
		scope: 'world',
		config: true,
		type: Boolean,
		default: false,
        onChange: value => window.location.reload()
	});
  }
}