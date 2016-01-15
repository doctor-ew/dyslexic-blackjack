/**
 * Dyslexic Blackjack
 * @author: Drew Schillinger
 *
 * Deck class
 *
 * v 0.0.1
 */
/**
 * Set up the Deck
 */

var cc = {};
var Deck = function(){
	this.deck = new Array(52);
	this.count = 52;
	var c = 0;
	for (var s = 0; s <= 3; s++) {
		for (var v = 1; v <= 13; v++) {
			////console.log('v ' + v + ' :: s ' + s);
			//try {
			c++;
			cc = new Card(v, s);
			this.deck[c] = cc;
			//console.log('!@#',this.deck[c],c,cc)
//			//console.log('cc ' + this.deck.returnCardData['value']);
			//} catch (e) {
			//	////console.log(e.name + ' : ' + e.message)
			//}
		
		}
	}
}

Deck.prototype.shuffle = function(){
	for (var c = 51; c > 0; c--) {
		var r = Math.floor((c + 1) * Math.random(c));
		var temp = this.deck[r];
		this.deck[r] = this.deck[c];
		this.deck[c] = temp;
	}
	this.count = 52;
}


Deck.prototype.nextCard = function(){
	if (this.count == 0) 
		throw "Deck is out of cards";
	var c = this.deck[--this.count];
	console.log('card: ' + c)
	return c;
}

