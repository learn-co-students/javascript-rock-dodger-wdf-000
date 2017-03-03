const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if ((top > 360) && (top < 400)) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    
    const dodgerRightEdge = dodgerLeftEdge + 40;
    
    const rockLeftEdge = positionToInteger(rock.style.left)
    
    const rockRightEdge = rockLeftEdge + 20;
    
    if (((rockLeftEdge < dodgerLeftEdge) && (rockRightEdge > dodgerLeftEdge)) ||
        ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge < dodgerRightEdge)) ||
        ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))
        ) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = rock.style.top = 0

  rock.style.top = top
  GAME.appendChild(rock)

  checkCollision(rock)

  function moveRock() {
    if (top < 400) {
      rock.style.top = `${top += 1}px`;
      if (checkCollision(rock)) {
        rock.remove()
        return endGame()
      }

      window.requestAnimationFrame(moveRock);
      } else {
        rock.remove()
      }
    }
  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval, 0);
  document.removeEventListener('keydown', moveDodger);
  for (var i = 0, len = ROCKS.length; i < len; i++) {
    ROCKS[i].remove()
  }

  START.innerHTML = 'Play again?'
  START.style.display = 'inline'

  alert("YOU LOSE");
}

function moveDodger(e) {

  if (e.which !== LEFT_ARROW && e.which !== RIGHT_ARROW) {
    return;
  } 
  e.preventDefault();

  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
  } 
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
  }
  e.stopPropagation()
}


function moveDodgerLeft() {
  var max = 0
  var left = parseInt(DODGER.style.left) 
  function step() {
    if (left > 0) {
      max += 1
      DODGER.style.left = `${left - max}px`
    }        
    
    if (max >= 4) {
      window.requestAnimationFrame(step) 
    }
  }
  window.requestAnimationFrame(step) 
}

function moveDodgerRight() {
  var max = 0
  var left = parseInt(DODGER.style.left) 
  function step() {
    if (left < 360) {
      max += 1
      DODGER.style.left = `${left + max}px`
    }        
    
    if (max >= 4) {
      window.requestAnimationFrame(step) 
    }
  }
  window.requestAnimationFrame(step) 
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
