/**
 * Dyslexic Blackjack
 * @author: Drew Schillinger
 *
 * BlackJack class (set up the controls and rules to playing the game)
 *
 * v 0.0.1
 */
var bj = {};
var hand = {};

var play = {};


var nCards = 52;

var standButton, hitButton, newGameButton; // objects representing the buttons, so I can enable/disable them
var BlackJack = function(){

	hand = this;
	
play={
	'dealer': {
		'arrHand': [],
		'bAce': false,
		'total': 0,
		'deal':hand.dealCard,
		'winlose':hand.winLoseDraw

	},
	'user': {
		'arrHand': [],
		'bAce': false,
		'total': 0,
		'deal':hand.dealCard,
		'winlose':hand.winLoseDraw


	}
};
	bj = new Deck();
	
	hand.doShuffle();
	hand.play['user'].deal();
	hand.play['dealer'].deal();
	hand.play['user'].deal();
	hand.play['dealer'].deal();
	
	$('a.hit').bind('click', function(){
	hand.play['user'].deal();
		//console.log('@@@1', t, (t < 22))
	});
}

BlackJack.prototype.dealCard = function(i, player){
	nCards = nCards - i;
	while (hand.getCount() > nCards) {
		//console.log('nCards', nCards)
		var n = hand.doNextCard();
		hand.play[player].arrHand.push(n);
		t += hand.returnCardData(n) <= 10 ? hand.returnCardData(n) : 10;
		//console.log(hand.returnCardData(n), t);
		
		$('ol#' + player).append('<li>' + n + '</li>');
		//					var l = (this.returnCardData('value')-1) * 72
		//					var t = (Card.returnCardData('value')) * 96
		//					//console.log('*** ', d.('value'))
		
		this.play.winLoseDraw(t, 52 - nCards);
		
	};
	console.log('n', n)
}

BlackJack.prototype.winLoseDraw = function(t, count){
	var userTotal = hand.checkScore(t, count);
	
	$('p#total').text('your score: ' + userTotal);
	
	if (userTotal === 21) {
		this.winnerWinnerChickenDinner();
	}
	else 
		if (userTotal > 21) {
			this.bust();
		}
}

BlackJack.prototype.doShuffle = function(){
	hand.play['user'].bAce = false;
	hand.play['dealer'].bAce = false;
	bj.shuffle();
}

BlackJack.prototype.doNextCard = function(){
	var nc = bj.nextCard();
	//console.log('#', nc);
	return nc;
}

BlackJack.prototype.getCount = function(){
	//console.log('!!');
	//console.log('!! ' + bj.count);
	return bj.count;
}

BlackJack.prototype.returnCardData = function(data){
	if (data.value > 10) 
		data.value = 10;
	if (data.value === 1) //ace
		bAce = true;
	//console.log('ret ', data, data.value);
	return data.value;
}

/**
 *
 * @param {Object} s: score
 * @param {Object} c: card count
 */
BlackJack.prototype.checkScore = function(s, c){
	if (s + 10 <= 21 && bAce) 
		s += 10;
	return s;
}

BlackJack.prototype.winnerWinnerChickenDinner = function(){
	$('a.hit').unbind('click');
	alert('winnerWinnerChickenDinner!');
}

BlackJack.prototype.bust = function(){
	$('a.hit').unbind('click');
	alert('bust');
}

