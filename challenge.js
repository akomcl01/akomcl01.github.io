var scores, roundScore, activePlayer, gamePlaying, player1, player2;

init();

var prevRoll;
console.log(prevRoll);

//Rolling the dice and updating Round Score
document.querySelector('.btn-roll').addEventListener('click',function(){
  if (gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //Second dice
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    document.getElementById('dice-1').style.display = "block"//displays dice image
    document.getElementById('dice-2').style.display = "block"
    document.getElementById('dice-1').src = 'dice-' + dice + '.png'
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'//change dice image based on dice number


    //3. Update the round score if the rolled number was NOT a 1.
    if (prevRoll === 6 && dice === 6 ){
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = 0;
      nextPlayer()
    }

    else if (dice !== 1 && dice2 !==1) {
      //Add score
      roundScore += dice + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
      if (dice == 1) {
        alert('You played a 1, Next Player \'s turn')
        //Next player
        nextPlayer()
      }


      // if (dice  == 6) {
      //   currentRoll = 6;
      //   console.log(currentRoll + 'current');
      //   count +=1;
      //   console.log(count);
      //
      // } else{
      //   count = 0;
      //   currentRoll = 0;
      // }

    }
    prevRoll = dice;
    console.log(prevRoll + ' prevRoll');
  }

});

//Initialise Hold Button
document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gamePlaying) {
  //Add CURRENT score to GLOBAL score
  scores[activePlayer] +=roundScore;

  //Update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

  var input = document.querySelector('.final-score').value

  var finalScore;
  //Undefined, 0,null or "" are COERCED to false
  //Anything else is COERCED to true
  if (input) {
    finalScore = input;
  } else {
    finalScore = 100;
  }

  //Check if player won the game
  if (scores[activePlayer] >= finalScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('dice-1').style.display = 'none'; //removes dice image
    document.querySelector('dice-2').style.display = 'none'; //removes dice image
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('.winner');
    gamePlaying = false;
} else {
    //Next player
    nextPlayer();

  }
}
})

function nextPlayer(){
  //Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  /* Equivalent
  if (activePlayer === 0) {
    activePlayer = 1
  } else{
    activePlayer = 0;
  }
  */

  //Change the winning score


//Change active Player
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none'; //removes dice image

}

//Initialise New Game
document.querySelector('.btn-new').addEventListener('click', init)

function init (){
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  player1 = prompt("Name of player 1:")
  player2 = prompt("Name of player 2:")

  //If player presses ok with no input
  if (player1 === undefined && player2 === undefined) {
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //If a player writes something
  } else if (player1 && player2) {
    document.getElementById('name-0').textContent = player1;
    document.getElementById('name-1').textContent = player2;
  } else {
    //Hits Cancel
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
  }


  //change css of the id
  document.getElementById('dice-1').style.display = 'none'; //hide the

  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';

  document.getElementById('score-1').textContent = '0';

  document.getElementById('current-0').textContent = '0';

  document.getElementById('current-1').textContent = '0';


  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}


////Examples for later
//selecting elements from webpage
// document.querySelector('#current-' + activePlayer).textContent = dice;//selects round-score id of the active player and changes plain text to the dice value
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; //allows html to be used

//Reads value from id
// var x = document.querySelector('#score-0').textContent; //read value of the id

///////////////
/*
///NOTES
//!== difference operator
//== does type coercion
//callback func. ; a function passed into another function as an arg. eg; eventlistener calls btn function
//anonymous func. ; a func. w/o a name. write the func. within the eventlistener.
*/
