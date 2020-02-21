let scores, roundScore, activePlayer, isGameOn, previousDiceRolls, winningScore

startNewGame()

function hideBothDice() {
    document.getElementById('rolling-dice-upper').style.display = 'none'
    document.getElementById('rolling-dice-lower').style.display = 'none'
}
// initialize game
function startNewGame() {
    // hide the dice initially
    hideBothDice()

    // player related stuff
    activePlayer = 0
    // innerHTML is for inputting other not only str, also other element for example into an HTML element
    // document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'  // em italics
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-1-panel').classList.remove('active') 

    // set all scores to 0
    scores = [0, 0]
    roundScore = 0
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    // get winning scores if set
    let winningScoreElement = document.querySelector('.win-score')
    winningScore = winningScoreElement.value ? winningScoreElement.value : 100

    isGameOn = true
}

// roll one dice
function displayAndRollDice(idSelector) {
    let dice = Math.floor(Math.random() * 6) + 1  // generate random number

    // display the result
    let diceDomSelected = document.getElementById(idSelector) // getter, display result to dice
    diceDomSelected.style.display = 'block'
    diceDomSelected.src = './icons/dice-' + dice + '.png'

    return dice
}

// switch player function
function switchPlayer() {
    // toggle player related information
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    // current counters to 0
    roundScore = 0
    previousRoll = null
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    // hide dice
    hideBothDice()
}

// roll the dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isGameOn) {
        // roll dice
        let diceUpper, diceLower
        diceUpper = displayAndRollDice('rolling-dice-upper')
        diceLower = displayAndRollDice('rolling-dice-lower')
        console.log("dice values", diceUpper, diceLower)
        
        // update
        // cannot be twice 6 on the same dice otherwise total score lost
        if (previousDiceRolls && (diceUpper === 6  && previousDiceRolls[0] === 6 || diceLower === 6 && previousDiceRolls[1] === 6)) {
            scores[activePlayer] = 0
            switchPlayer()
            // if not 1 on any dice then keep counting
        } else if (diceUpper !== 1 && diceLower !== 1) {
            // add scores
            previousDiceRolls = [diceUpper, diceLower]
            roundScore += diceUpper + diceLower
            document.getElementById('current-' + activePlayer).textContent = roundScore  // setter, no need to activePlayer.toString() because of type coercion
            // otherwise switch
        } else {
            switchPlayer()
        }
    }
})

// hold the score button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isGameOn) {
        // add the current score to correct player
        scores[activePlayer] += roundScore
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]

        // do we have winner?
        if (scores[activePlayer] >= winningScore) {
            // highlight winner and hide the dice
            document.getElementById('name-' + activePlayer).textContent = 'winner!'
            hideBothDice()
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            isGameOn = false
        // start new game
        //startNewGame()
        } else {
            switchPlayer() 
        }
    }
})

// new game button
// only passing function name to the eventListener not calling it -> it is only called when button clicked
document.querySelector('.btn-new').addEventListener('click', startNewGame)