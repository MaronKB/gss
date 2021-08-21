/** @extends {Actor} */
export class GssActor extends Actor {

  /** @override */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
  }

  /** @override */
  prepareDerivedData() {
    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags.gss || {};

    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
  }

  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    const data = actorData.data;
	
	function conn(value) {
		return value.type == 'connection';
	}
	
	const con = actorData.items.filter(conn);
	let tos = 0;
	let bys = 0;
	
	for (let emo of Object.values(con)) {
		tos += parseInt(emo.data.data.to.value);
		bys += parseInt(emo.data.data.by.value);
	}
	
	data.resources.wonder.add = parseInt(tos) + parseInt(data.town.value);
	data.resources.feelings.add = parseInt(bys) + parseInt(data.town.by);
		
	if (data.trueform.toLowerCase() == "fox" || data.trueform == "狐" || data.trueform == "きつね" || data.trueform == "キツネ" || data.trueform == "여우") {
		data.raceimg = "systems/gss/templates/img/fox.png";
	}
	else if (data.trueform.toLowerCase() == "raccoon dog" || data.trueform == "狸" || data.trueform == "たぬき" || data.trueform == "タヌキ" || data.trueform == "너구리") {
		data.raceimg = "systems/gss/templates/img/raccoon_dog.png";
	}
	else if (data.trueform.toLowerCase() == "cat" || data.trueform == "猫" || data.trueform == "ねこ" || data.trueform == "ネコ" || data.trueform == "고양이") {
		data.raceimg = "systems/gss/templates/img/cat.png";
	}
	else if (data.trueform.toLowerCase() == "dog" || data.trueform == "犬" || data.trueform == "いぬ" || data.trueform == "イヌ" || data.trueform == "개" || data.trueform == "강아지") {
		data.raceimg = "systems/gss/templates/img/dog.png";
	}
	else if (data.trueform.toLowerCase() == "rabbit" || data.trueform == "兎" || data.trueform == "うさぎ" || data.trueform == "ウサギ" || data.trueform == "토끼") {
		data.raceimg = "systems/gss/templates/img/rabbit.png";
	}
	else if (data.trueform.toLowerCase() == "bird" || data.trueform == "鳥" || data.trueform == "とり" || data.trueform == "トリ" || data.trueform == "새") {
		data.raceimg = "systems/gss/templates/img/bird.png";
	}
	/*
	else if (data.trueform.toLowerCase() == "mouse" || data.trueform == "鼠" || data.trueform == "ねずみ" || data.trueform == "ネズミ" || data.trueform == "쥐") {
		data.raceimg = "systems/gss/templates/img/mouse.png";
	}
	else if (data.trueform.toLowerCase() == "wolf" || data.trueform == "狼" || data.trueform == "おおかみ" || data.trueform == "オオカミ" || data.trueform == "늑대") {
		data.raceimg = "systems/gss/templates/img/wolf.png";
	}
	else if (data.trueform.toLowerCase() == "pony" || data.trueform == "馬" || data.trueform == "うま" || data.trueform == "ウマ" || data.trueform == "말") {
		data.raceimg = "systems/gss/templates/img/pony.png";
	}
	else if (data.trueform.toLowerCase() == "fish" || data.trueform == "魚" || data.trueform == "さかな" || data.trueform == "サカナ" || data.trueform == "물고기") {
		data.raceimg = "systems/gss/templates/img/fish.png";
	}
	else if (data.trueform.toLowerCase() == "raccoon" || data.trueform == "あらいぐま" || data.trueform == "アライグマ" || data.trueform == "라쿤") {
		data.raceimg = "systems/gss/templates/img/raccon.png";
	}
	else if (data.trueform.toLowerCase() == "sheep" || data.trueform == "羊" || data.trueform == "ひつじ" || data.trueform == "ヒツジ" || data.trueform == "양") {
		data.raceimg = "systems/gss/templates/img/sheep.png";
	}
	else if (data.trueform.toLowerCase() == "tsukumogami" || data.trueform == "付喪神" || data.trueform == "つくもがみ" || data.trueform == "ツクモガミ" || data.trueform == "츠쿠모가미") {
		data.raceimg = "systems/gss/templates/img/tsukumogami.png";
	}
	else if (data.trueform.toLowerCase() == "kodama" || data.trueform == "木霊" || data.trueform == "こだま" || data.trueform == "コダマ" || data.trueform == "목령") {
		data.raceimg = "systems/gss/templates/img/kodama.png";
	}
	else if (data.trueform.toLowerCase() == "witch" || data.trueform == "魔法使い" || data.trueform == "まほうつかい" || data.trueform == "マホウツカイ" || data.trueform == "마법사") {
		data.raceimg = "systems/gss/templates/img/witch.png";
	}
	else if (data.trueform.toLowerCase() == "witch's cat" || data.trueform == "使い魔猫" || data.trueform == "つかいまねこ" || data.trueform == "ツカイマネコ" || data.trueform == "사역마 고양이") {
		data.raceimg = "systems/gss/templates/img/witchs_cat.png";
	}
	else if (data.trueform.toLowerCase() == "esper" || data.trueform == "超能力者" || data.trueform == "ちょうのうりょくしゃ" || data.trueform == "チョウノウリョクシャ" || data.trueform == "초능력자") {
		data.raceimg = "systems/gss/templates/img/esper.png";
	}
	else if (data.trueform.toLowerCase() == "michinoke" || data.trueform == "道怪" || data.trueform == "みちのけ" || data.trueform == "ミチノケ" || data.trueform == "おんぶ" || data.trueform == "オンブ" || data.trueform == "길요괴" || data.trueform == "온부") {
		data.raceimg = "systems/gss/templates/img/michinoke.png";
	}
	else if (data.trueform.toLowerCase() == "oni" || data.trueform == "鬼" || data.trueform == "おに" || data.trueform == "オニ" || data.trueform == "오니") {
		data.raceimg = "systems/gss/templates/img/oni.png";
	}
	else if (data.trueform.toLowerCase() == "kappa" || data.trueform == "河童" || data.trueform == "かっぱ" || data.trueform == "カッパ" || data.trueform == "캇파") {
		data.raceimg = "systems/gss/templates/img/kappa.png";
	}
	else if (data.trueform.toLowerCase() == "ghost" || data.trueform == "幽霊" || data.trueform == "ゆうれい" || data.trueform == "ユウレイ" || data.trueform == "유령") {
		data.raceimg = "systems/gss/templates/img/ghost.png";
	}
	else if (data.trueform.toLowerCase() == "visitor" || data.trueform == "まれびと" || data.trueform == "マレビト" || data.trueform == "이방인") {
		data.raceimg = "systems/gss/templates/img/visitor.png";
	}
	*/
	else {
		data.raceimg = "systems/gss/templates/img/def.png";
	}
  }

  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;
	
    const data = actorData.data;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    this._getCharacterRollData(data);
    this._getNpcRollData(data);

    return data;
  }

  _getCharacterRollData(data) {
    if (this.data.type !== 'character') return;

    if (data.attributes.henge) {
      data.henge = data.attributes.henge.value ?? 0;
    }
    if (data.attributes.animal) {
      data.animal = data.attributes.animal.value ?? 0;
    }
    if (data.attributes.adult) {
      data.adult = data.attributes.adult.value ?? 0;
    }
    if (data.attributes.child) {
      data.child = data.attributes.child.value ?? 0;
    }
  }

  _getNpcRollData(data) {
    if (this.data.type !== 'npc') return;
  }
}