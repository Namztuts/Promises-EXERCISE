/*
1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
Once you have the card, make a request to the same API to get one more card from the **same** deck.
Once you have both cards, ***console.log*** the values and suits of both cards.

3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, 
and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

Deck https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
Draw https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2 | [deck_id] | 
                                                             replace [deck_id] with "new" to create a shuffled deck and draw cards from that deck in the same request


*/

let url = 'https://deckofcardsapi.com/api/deck';

//1.
axios.get(`${url}/new/draw`).then((response) => {
   let { suit, value } = response.data.cards[0];
   console.log(`You pulled the ${value} of ${suit}`);
});

//2.
let cardOne = null; //initialize cardOne to use it within both requests
axios
   .get(`${url}/new/draw`)
   .then((response) => {
      let deckID = response.data.deck_id;
      cardOne = response.data.cards[0];
      console.log('deck id:', deckID);
      console.log('card one:', cardOne);
      return axios.get(`${url}/${deckID}/draw`);
   })
   .then((response) => {
      let cardTwo = response.data.cards[0];
      console.log('card two', cardTwo);
      [cardOne, cardTwo].forEach(function (card) {
         console.log(`You pulled the ${card.value} of ${card.suit}`);
      });
   });

//3.
let deckID = null;
let $button = $('#draw');
let $cards = $('#cards');
axios.get(`${url}/new/draw`).then((response) => {
   deckID = response.data.deck_id;
});

$button.on('click', function () {
   axios.get(`${url}/${deckID}/draw/?count=5`).then((response) => {
      let cardImg = response.data.cards[0].image;
      console.log('card image', cardImg);
      $cards.append(
         $('<img>', {
            src: cardImg,
         })
      );
   });
});
