/**
 * Dyslexic Blackjack
 * @author: Drew Schillinger
 *
 * BlackJack class (set up the controls and rules to playing the game)
 *
 * v 0.0.5
 */
var bj = {};
var hand = {};
var oDeal = {
	'dealer': {
		'arrHand': [],
		'bAce': false,
		'bDealHand': false,
		'total': 0
	},
	'user': {
		'arrHand': [],
		'bAce': false,
		'bDealHand': false,
		'total': 0
	}
};
var arrCardRank = ['ace','2','3','4','5','6','7','8','9','10','jack','queen','king'];
var arrCardSuit = ['club','diamond','heart','spade'];

var intShuffle = 0;

var nCards = 52;

var standButton, hitButton, newGameButton; // objects representing the buttons, so I can enable/disable them
var BlackJack = function() {

	hand = this;

	bj = new Deck();

	hand.doShuffle();
	/* */
	hand.dealCard(1, 'user');
	hand.dealCard(1, 'dealer');
	hand.dealCard(1, 'user');
	hand.dealCard(1, 'dealer');
	/* */
	//	hand.dealCard(52, 'user');
	$('a.hit').bind('click', function() {
		hand.dealCard(1, 'user');
	});
	$('a.hold').bind('click', function() {
		$('a.hit').unbind('click');
		hand.dealersHand();

	});
}
BlackJack.prototype.dealCard = function(i, player) {
	nCards = nCards - i;
	while (hand.getCount() > nCards) {

		var n = hand.doNextCard(player);

		oDeal[player].arrHand.push(n);
		try {
			oDeal[player].total += hand.returnCardData(n) <= 10 ? hand.returnCardData(n) : 10;
		} catch (e) {
		}
		console.log('***',hand.returnCardData(n));

		$('ol#' + player).append('<li data-true-value="' + hand.returnCardData(n) + '" data-card="' + hand.classify(n) + '"  class="' + hand.classify(n) + '"></li>');//' + n + '
	};
	hand.shuffleTimer(player, oDeal[player].total, 52 - nCards);

	if (player === 'dealer' && oDeal[player].bDealHand) {
		hand.dealersHand();
	}
}
BlackJack.prototype.shuffleTimer = function(player, t, count) {
	clearInterval(intShuffle);
	intShuffle = setInterval( function() {

		var tu = 0;
		td = 0;
		$('li').each( function(i) {
			var f = Math.floor(Math.random() * 4);
			var v = Math.floor(Math.random() * 13);
			var c = arrCardSuit[f] + '-' + arrCardRank[v];
			if($(this).parent().attr('id') === 'user') {
				tu += v;
			} else {
				td += v;
			}

			$(this).attr('class','');
			$(this).attr('data-value',v);
			$(this).addClass(c);

		});
		$('p#userTotal em').text(tu);
		$('p#dealerTotal em').text(td);

	}, Math.floor(Math.random() * 50));
}
BlackJack.prototype.classify = function(card) {
	var c = card.toString().replace(/ /g,'').toLowerCase();

	return c.replace(/([0-9acegijknqu]+)of([abcdehilmnoprstu]+)/,"$2-$1");
}
BlackJack.prototype.doShuffle = function() {
	bAce = false;
	bj.shuffle();
}
BlackJack.prototype.doNextCard = function() {
	var nc = bj.nextCard();
	return nc;
}
BlackJack.prototype.getCount = function() {
	return bj.count;
}
BlackJack.prototype.returnCardData = function(data) {
	if (data.value > 10)
		data.value = 10;
	if (data.value === 1) //ace
		bAce = true;
	return data.value;
}
BlackJack.prototype.dealersHand = function() {
	if (hand.checkScore(oDeal['dealer'].total) < 16) {
		oDeal['dealer'].bDealHand = true;
		hand.dealCard(1, 'dealer');
	} else if (hand.checkScore(oDeal['dealer'].total) < 21 && hand.checkScore(oDeal['dealer'].total) < hand.checkScore(oDeal['user'].total)) {
		oDeal['dealer'].bDealHand = true;
		hand.dealCard(1, 'dealer');
	} else {
		hand.compareHands();
	}

}
BlackJack.prototype.compareHands = function() {

	$('li').each( function(i) {
		$(this).attr('class',$(this).attr('data-card'));
	});

	var winner = '';
	clearInterval(intShuffle);
	if (hand.checkScore(oDeal['dealer'].total) > hand.checkScore(oDeal['user'].total) && hand.checkScore(oDeal['dealer'].total) < 22) {
		winner = 'dealer';
	} else {
		winner = 'user';
	}
	
	var td=0;
	var tu=0;
	$('#dealer li').each( function() {
		td += parseInt(hand.checkScore($(this).attr('data-true-value')));
	});
	$('#user li').each( function() {
		tu += parseInt(hand.checkScore($(this).attr('data-true-value')));
	});

		$('p#userTotal em').text(tu + ' => ' + oDeal['user'].total);
		$('p#dealerTotal em').text(td + ' => ' + oDeal['dealer'].total);


	$('p#' + winner + 'Total').css({'border':'1px solid red'});
	
	alert(winner + ' wins!');
}
/**
 *
 * @param {Object} s: score
 * @param {Object} c: card count
 */
BlackJack.prototype.checkScore = function(s) {
	if (s + 10 <= 21 && bAce)
		s += 10;
	return s;
}
BlackJack.prototype.winnerWinnerChickenDinner = function() {
	$('a.hit').unbind('click');
	alert('winnerWinnerChickenDinner!');
}
BlackJack.prototype.bust = function() {
	$('a.hit').unbind('click');
	alert('bust');
}
var Dysgraphia = function() {

}
Dysgraphia.prototype.mixup = function() {
	clearInterval(Cards.intShuffle);
	Cards.intShuffle = setInterval(Cards.shuffleCards, Math.floor(Math.random() * 50));

}