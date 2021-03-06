// ===================================
//     Game Logic
// ===================================


// Landmark Constructors
// ====================
function Landmark(landmarkName) {
  this.landmarkName = landmarkName;
  this.landmarkActive = false;
  if (landmarkName === 'station') {
    this.canRollTwo = true;
    this.landmarkCost = 4;
  }
}

// Card Constructor
// ================
function Card(cardKey, cardName, cardColor, cardPayout, cardType, cardCost, cardMultiplier, cardURL) {
  this.cardKey = cardKey;
  this.cardName = cardName;
  this.cardColor = cardColor;
  this.cardPayout = cardPayout;
  this.cardType = cardType;
  this.cardCost = cardCost;
  this.cardMultiplier = cardMultiplier; //is a string equal to cardType that multiplies in the case of factory
  this.cardURL = cardURL;
}

// Dice Constructor
//===================
function Dice() {
  this.dieOne = 1;
  this.dieTwo = 1;
}
Dice.prototype.roll = function() {
  this.dieOne = Math.floor((Math.random() * 6) + 1);
  this.dieTwo = Math.floor((Math.random() * 6) + 1);
  this.dieOneImgAddress = "img/" + this.dieOne + ".png";
  this.dieTwoImgAddress = "img/" + this.dieTwo + ".png";
}

// Player Constructor
//===================
function Player(playerName, playerID) {
  this.playerName = playerName;
  this.cardStack = [
    new Card([1], "Wheat Field", "blue", 1, "wheat", 1, '', "img/wheat1.jpg"),
    new Card([2,3], "Bakery", "green", 1, "store", 1, '', "img/bakery2-3.jpg")
    ];
  this.purse = 3;
  this.landmarks = [
    new Landmark("station"),
    new Landmark("Shopping Mall"),
    new Landmark("Amusement Park"),
    new Landmark("Radio Tower")
    ];
  this.playerID = playerID;
  this.playerNumber = -1; // run .assignPlayerNumber to assign correct value
}
Player.prototype.addCard = function(card) {
  if (this.purse-card.cardCost>=0) {
    this.purse -= card.cardCost;
    this.cardStack.push(card);
    return true;
  }
  return false;
}
Player.prototype.returnNumberOwnedOfCard = function(cardName) {
  var counter=0;
  this.cardStack.forEach(function(card){
    if (card.cardName===cardName) {
      counter++;
    }
  });
  return counter;
}
Player.prototype.landmarkTrue = function(landmark) {
  this.purse -= landmark.landmarkCost;
  this.landmarks.forEach(function(landmark2){
    if (landmark2.landmarkName === landmark.landmarkName) {
      landmark2.landmarkActive = true;
    }
  });
}
Player.prototype.requestRedPayout = function(diceValue){
  var requestedAmount = 0;
  this.cardStack.forEach(function(card) {
    if (card.cardColor === "red" && card.cardKey.indexOf(diceValue) !== -1) {
      requestedAmount += card.cardPayout;
    }
  });
  return requestedAmount;
}
Player.prototype.giveRedPayout = function(playerToPay, amountToPay) {
  if (this.purse >= amountToPay) {
    this.purse -= amountToPay;
    playerToPay.purse += amountToPay
    // console.log(this);
    // console.log(playerToPay);
  } else {
    playerToPay.purse += this.purse;
    this.purse = 0;
  }
}
Player.prototype.hasWon = function() {
  if (this.landmarks[0].landmarkActive && this.landmarks[1].landmarkActive && this.landmarks[2].landmarkActive && this.landmarks[3].landmarkActive) {
    return true;
  }
  return false;
}
Player.prototype.assignPlayerNumber = function(number) {
  this.playerNumber = number;
}
Player.prototype.refreshUserDisplay = function() {
  this.playerDisplay = '<div class="row player__info">'+
                          '<div class="col-md-4">'+
                            '<h2 class="player__name">'+this.playerName+'</h2>'+
                          '</div>'+
                          '<div class="col-md-4">'+
                            '<h2 class="player__landmarks">Landmarks</h2>'+
                          '</div>'+
                          '<div class="col-md-4">'+
                            '<h2 class="player__coins">Coins: '+this.purse+'</h2>'+
                          '</div>'+
                        '</div>'+
                        '<div class="player__cards">'+
                          '<div class="row card__row">'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/wheat1.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Wheat Field")+'</p>'+
                            '</div>'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/bakery2-3.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Bakery")+'</p>'+
                            '</div>'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/ranch2.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Ranch")+'</p>'+
                            '</div>'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/cafe3.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Cafe")+'</p>'+
                            '</div>'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/convenience4.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Convenience Store")+'</p>'+
                            '</div>'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/forest5.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Forest")+'</p>'+
                            '</div>'+
                          '</div>'+
                          '<div class="row card__row">'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/cheese7.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Cheese Factory")+'</p>'+
                            '</div>'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/furniture8.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Furniture Factory")+'</p>'+
                            '</div>'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/mine9.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Mine")+'</p>'+
                            '</div>'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/family9-10.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Family Restaurant")+'</p>'+
                            '</div>'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/apple10.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Apple Orchard")+'</p>'+
                            '</div>'+
                            '<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/fruit11-12.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">'+this.returnNumberOwnedOfCard("Fruit Market")+'</p>'+
                            '</div>'+
                          '</div>'+
                        '</div>';
}

// CardBank Constructor
//=====================
function CardBank() {
  this.cards = [];
}
CardBank.prototype.emptyBank = function() {
  this.cards = [];
}
CardBank.prototype.removeCard = function(cardNameToRemove) {
  var isPresent = false;
  var loopIndex = 0;
  var cardLocations = [];
  this.cards.forEach(function(card) {
    if(card.cardName === cardNameToRemove) {
      cardLocations.push(loopIndex);
      isPresent = true;
    }
    loopIndex++;
  });
  if (cardLocations !== []) {
    this.cards.splice(cardLocations[0], 1);
  }
  return isPresent;
}
CardBank.prototype.setStandardBank = function() {
  var standardDeck = [
    new Card([1], "Wheat Field", "blue", 1, "wheat", 1, '', 'img/wheat1.jpg'),
    new Card([2,3], "Bakery", "green", 1, "store", 1, '', 'img/bakery2-3.jpg'),
    new Card([2], "Ranch", "blue", 1, "cow", 1, '', 'img/ranch2.jpg'),
    new Card([3], "Cafe", "red", 1, "cafe", 2, '', 'img/cafe3.jpg'),
    new Card([4], "Convenience Store", "green", 3, "store", 2, '', 'img/convenience4.jpg'),
    new Card([5], "Forest", "blue", 1, "cog", 3, '', 'img/forest5.jpg'),
    new Card([7], "Cheese Factory", "green", 3, "factory", 5, "cow", 'img/cheese7.jpg'),
    new Card([8], "Furniture Factory", "green", 3, "factory", 3, "cog", 'img/furniture8.jpg'),
    new Card([9], "Mine", "blue", 5, "cog", 6, '', 'img/mine9.jpg'),
    new Card([9,10], "Family Restaurant", "red", 2, "cafe", 3, '', 'img/family9-10.jpg'),
    new Card([10], "Apple Orchard", "blue", 3, "wheat", 3, '', 'img/apple10.jpg'),
    new Card([11,12], "Fruit Market", "green", 2, "factory", 2, "wheat", 'img/fruit11-12.jpg')
  ];
  for (var i = 0; i < standardDeck.length; i++) {
    var card = standardDeck[i];
    for (var j = 6; j > 0; j--) {
      this.cards.push(card);
    }
  }
}

// Game Constructor
//=====================
function Game() {
  // Will contain players, cardBank, activePlayerIndex,
  this.cardBank = new CardBank();
  this.cardBank.setStandardBank();
  this.players = [];
  this.activePlayerIndex = 0;
  this.dice = new Dice();
}
Game.prototype.addPlayer = function(playerName) {
  var playerToAdd = new Player(playerName, "player"+this.players.length);
  playerToAdd.assignPlayerNumber(this.players.length+1);
  this.players.push(playerToAdd);
}
Game.prototype.canActivePlayerRollTwoDice = function() {
  if (this.players[this.activePlayerIndex].landmarks[0].landmarkActive) {
    return true;
  }
  return false;
}
Game.prototype.giveAllPayout = function(diceValue) {
  this.giveRedPayout(diceValue);
  this.giveGreenPayout(diceValue);
  this.giveBluePayout(diceValue);
}
Game.prototype.giveBluePayout = function(diceValue) {
  this.players.forEach(function(player) {
    var payOut = 0;
    player.cardStack.forEach(function(card) {
      if (card.cardKey.indexOf(diceValue) !== -1 && card.cardColor === "blue") {
        payOut += card.cardPayout;
      }
    });
    player.purse += payOut;
  });
}
Game.prototype.giveGreenPayout = function(diceValue) {
  var payOut = 0;
  var multiplier = 0;
  this.players[this.activePlayerIndex].cardStack.forEach(function(card) {
    // if (card.cardMultiplier !== '' && card.cardKey.indexOf(diceValue) !== -1 && card.cardColor === "green") {
    //   that.cardStack.forEach(function(card2) {
    //     if (card.cardMultiplier === card2.cardType) {
    //       multiplier++;
    //     }
    //   });
    //   payOut += (multiplier * card.cardPayout);
    //   multiplier = 0;
    // } else
    if (card.cardKey.indexOf(diceValue) !== -1 && card.cardColor === "green") {
      payOut += card.cardPayout;
    }
  });
  this.players[this.activePlayerIndex].purse += payOut;
}
Game.prototype.giveRedPayout = function(diceValue) {
  var activePlayer = this.players[this.activePlayerIndex];
  this.players.forEach(function(player) {
    if (player.playerNumber !== activePlayer.playerNumber) {
      console.log(player);
      console.log(player.requestRedPayout(diceValue));
      activePlayer.giveRedPayout(player, player.requestRedPayout(diceValue));
    }
  });
  //This does not run in the correct order
}
Game.prototype.rollOneDie = function() {
  this.dice.roll();
  return this.dice.dieOne;
}
Game.prototype.rollTwoDie = function() {
  this.dice.roll();
  return this.dice.dieOne + this.dice.dieTwo;
}
Game.prototype.updateActivePlayerIndex = function() {
  // this.players[this.activePlayerIndex].isTurn = false;
  if (this.activePlayerIndex < this.players.length-1) {
    this.activePlayerIndex ++;
  } else {
    this.activePlayerIndex = 0;
  }
  // this.players[this.activePlayerIndex].isTurn = true;
}

// ===========================
//     User Interface
// ===========================

var addNewPlayerToGame = function(game) {
  if ($('form#playerSetup input').val() === '') {
    alert("You must assign a player name to add a player.");
    return;
  }
  if (game.players.length > 3) {
    alert("This game is shitty with more than 4 people.");
    return;
  }
  var newPlayer = $('form#playerSetup input').val();
  game.addPlayer(newPlayer);
  $('#playerList').append('<li>'+$('form#playerSetup input').val()+'</li>');
  $('form#playerSetup input').val('');
  $('form#playerSetup input').focus();
  if (game.players.length >=2) {
    $('#startGameButton').show();
  }
  return newPlayer;
}
var hideAndShowDivs = function(divToHide, divToShow) {
  $(divToHide).hide();
  $(divToShow).show();
}
var populatePlayer = function(player) {
  player.refreshUserDisplay();
  $('#'+player.playerID).empty().append(player.playerDisplay);
}
var disableRollButtons = function(button1, button2) {
  button1.prop('disabled', true);
  button2.prop('disabled', true);
}
var enableRollButtons = function(button1, button2) {
  button1.prop('disabled', false);
  button2.prop('disabled', false);
}
var updatePurseDisplays = function(currentGame) {
  var count = 0;
  currentGame.players.forEach(function(player) {
    $('#player'+count+' .player__coins').text("Coins: "+player.purse);
    count++;
  });
}
var dieDisplay = function(currentGame) {
  $('#rollOneDie').prop("disabled", false);
  console.log(currentGame.players[currentGame.activePlayerIndex].landmarks[0]);
  if (currentGame.players[currentGame.activePlayerIndex].landmarks[0].landmarkActive === true ) {
    $('#rollTwoDie').prop("disabled", false);
  }
}

$(document).ready(function() {
  var currentGame = new Game();
  $('.intro_screen').click(function() {
    hideAndShowDivs('.intro_screen','.player_creation');
  });
  $('form#playerSetup').submit(function(event) {
    event.preventDefault();
    var playerToAdd = addNewPlayerToGame(currentGame);
    // run populate player function, pass in playerToAdd
  });
  $('#startGameButton').click(function() {
    hideAndShowDivs(".player_creation", ".game__board");
    hideAndShowDivs(".player_page", ".rule_link");
    currentGame.players.forEach(function(player) {
      populatePlayer(player);
    });
    $('button').prop("disabled", true);
    dieDisplay(currentGame);
    $('#confirm-purchase').prop("disabled", false);
    $('#confirm-purchase-landmarks').prop("disabled", false);
    $('#player0').css("background-color", "#52A5D8");
    $('#rollOneDie').focus();
  });
  $('#rollOneDie').click(function() {
    currentGame.giveAllPayout(currentGame.rollOneDie());
    $('.die-pic1').prop("src", currentGame.dice.dieOneImgAddress);
    $('.die-pic2').prop("src", "img/0.png").hide();
    updatePurseDisplays(currentGame);
    $('#rollOneDie').prop("disabled", true);
    $('#rollTwoDie').prop("disabled", true);
    $('#purchase-cards').prop("disabled", false);
    $('#button-landmark').prop("disabled", false);
    $('#end-turn').prop("disabled", false);
    $('#purchase-cards').focus();
  });
  $('#rollTwoDie').click(function() {
    currentGame.giveAllPayout(currentGame.rollTwoDie());
    $('.die-pic1').prop("src", currentGame.dice.dieOneImgAddress);
    $('.die-pic2').prop("src", currentGame.dice.dieTwoImgAddress).show();
    updatePurseDisplays(currentGame);
    $('#rollOneDie').prop("disabled", true);
    $('#rollTwoDie').prop("disabled", true);
    $('#purchase-cards').prop("disabled", false);
    $('#end-turn').prop("disabled", false);
    $('#button-landmark').prop("disabled", false);
    $('#purchase-cards').focus();
  });
  $('#purchase').submit(function(event) {
    event.preventDefault();
    var cardName = $('input[name="cardRadios"]:checked').val();
    console.log(cardName);
    if (cardName === "Wheat Field") {
      var card = new Card([1], "Wheat Field", "blue", 1, "wheat", 1, '', 'img/wheat1.jpg');
    } else if (cardName === "Bakery") {
      var card = new Card([2,3], "Bakery", "green", 1, "store", 1, '', 'img/bakery2-3.jpg');
    } else if (cardName === "Ranch") {
      var card = new Card([2], "Ranch", "blue", 1, "cow", 1, '', 'img/ranch2.jpg');
    } else if (cardName === "Cafe") {
      var card = new Card([3], "Cafe", "red", 1, "cafe", 2, '', 'img/cafe3.jpg');
    } else if (cardName === "Convenience Store") {
      var card = new Card([4], "Convenience Store", "green", 3, "store", 2, '', 'img/convenience4.jpg');
    } else if (cardName === "Forest") {
      var card = new Card([5], "Forest", "blue", 1, "cog", 3, '', 'img/forest5.jpg');
    } else if (cardName === "Cheese Factory") {
      var card = new Card([7], "Cheese Factory", "green", 3, "factory", 5, "cow", 'img/cheese7.jpg');
    } else if (cardName === "Furniture Factory") {
      var card = new Card([8], "Furniture Factory", "green", 3, "factory", 3, "cog", 'img/furniture8.jpg');
    } else if (cardName === "Mine") {
      var card = new Card([9], "Mine", "blue", 5, "cog", 6, '', 'img/mine9.jpg');
    } else if (cardName === "Family Restaurant") {
      var card = new Card([9,10], "Family Restaurant", "red", 2, "cafe", 3, '', 'img/family9-10.jpg');
    } else if (cardName === "Apple Orchard") {
      var card = new Card([10], "Apple Orchard", "blue", 3, "wheat", 3, '', 'img/apple10.jpg');
    } else if (cardName === "Fruit Market") {
      var card = new Card([11,12], "Fruit Market", "green", 2, "factory", 2, "wheat", 'img/fruit11-12.jpg');
    }
    if (currentGame.players[currentGame.activePlayerIndex].addCard(card)) {
      $('#confirm-purchase').prop("disabled", true);
      $('#myModal').modal('toggle');
    } else {
      alert('You cannot afford that card!');
    }
    $('#purchase-cards').prop("disabled", true);
    currentGame.players.forEach(function(player) {
      populatePlayer(player);
    });
    updatePurseDisplays(currentGame);
    $('input[name="cardRadios"]:checked').prop('checked', false);
    $('#button-landmark').prop("disabled", true);
    $('#end-turn').focus();
  });
  $('#purchaseLandmarks').submit(function(event) {
    event.preventDefault();
    console.log("button works");
    debugger;

  });
  $('#end-turn').click(function() {
    if (currentGame.players[currentGame.activePlayerIndex].purse>50) {
      alert("Congradulations "+currentGame.players[currentGame.activePlayerIndex].playerName+". You've Won the Game!");
    }
    $('#player'+currentGame.activePlayerIndex).css("background-color", "white");
    currentGame.updateActivePlayerIndex();
    $('#player'+currentGame.activePlayerIndex).css("background-color", "#52A5D8");
    dieDisplay(currentGame);
    $('#confirm-purchase').prop("disabled", false);
    $('#purchase-cards').prop("disabled", true);
    $('#button-landmark').prop("disabled", true);
    $('#end-turn').prop("disabled", true);
    $('#confirm-purchase-landmarks').prop("disabled", false);
    updatePurseDisplays(currentGame);
    $('#rollOneDie').focus();
  });
});
