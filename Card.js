/**
 * Dyslexic Blackjack
 * Drew Schillinger
 * 
 * Card class
 * 
 * v 0.0.1
 */

/** 
 * Constructor: Card
 * @param {Object} v: value
 * @param {Object} s: suit
 */
var Card = function(value, suit){
	this.value = -1;
	this.suit = -1;
	
	////console.log('|-o-| - ',value,suit)
	if (arguments.length >= 2) {
		this.set(arguments[0], arguments[1]);
	}
}

/**
 * Constant: Face Cards
 */
Card.ACE = 1;
Card.JACK = 11;
Card.QUEEN = 12;
Card.KING = 13;

/**
 * Constant: Card Suits
 */
Card.CLUB = 0;
Card.DIAMOND = 1;
Card.HEART = 2;
Card.SPADE = 3;

Card.prototype.log = function(str){
	try {
		////console.log(str);
	} 
	catch (e) {
	
	}
}


/**
 * Reset card values
 */
Card.prototype.clear = function(){
	this.suit = 0;
	this.value = 0;
}

/**
 *
 * @param {Object} v: value
 * @param {Object} s: suit
 */
Card.prototype.set = function(value,suit){
	// check if 2 values
	////console.log('|-o-| - ',value,suit)
	if (arguments.length < 2) {
		throw "The set function requires two arguments, which you did not provide. Jackass.";
	}
	else {
	////console.log('!!!',value,suit)
		var v = parseInt(value);
		var s = parseInt(suit);
		////console.log('|-o-| ',value,v,suit,s);
		if (v > 0 && v <= 13) {
			this.value = v;
		}
		else {
			throw "card value needs to be in range: 1-13, dummy, not " + v
		}
		if (s >= 0 && s < 4) {
			this.suit = s;
		}
		else {
			throw "Whatchu talkin about, willis? suit value needs to be in range: 0-3, not " + s
		}
	}
}

/**
 * Get face value of card, ie, 7 of clubs
 */
Card.prototype.toString = function(){
	////console.log('value',this.value)
	if (this.value !== -1) {
		var str = '';
		
		// set card value
		switch (this.value) {
			case 1:
				str += "Ace"
				break;
			case 11:
				str += "Jack"
				break;
			case 12:
				str += "Queen"
				break;
			case 13:
				str += "King"
				break;
			default:
				str += this.value;
		}
		
		str += " of ";
		
		// set card suit
		switch (this.suit) {
			case 1:
				str += "Club"
				break;
			case 2:
				str += "Diamond"
				break;
			case 3:
				str += "Heart"
				break;
			default:
				str += "Spade"
				break;
		}
	}
	//console.log('your card: ' + str)
	return str;
}
