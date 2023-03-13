import boostrap from 'bootstrap'
import './style.css'
import './main.scss'
/* import 'bootstrap/dist/css/bootstrap.min.css' */

/* Variables */
const NUM_CARDS = 16
let images = []
let choices = []
let matches = 0
let timerInterval = null

/* Load game */
generateBoard()

/* Set new game button actions */
const newGameButton = document.getElementById('new-game-button')
newGameButton.addEventListener('click', () => {
  /* reset() */
  const moves = document.getElementById('moves')
  moves.innerHTML = '0'
  generateBoard()
})

/* -------------------------------- Functions ------------------------------- */
function loadIcons() {
  images = [
    '<img class="card-image" src="./dist/img/alba.png" alt="alba" />',
    '<img class="card-image" src="./dist/img/gaya.png" alt="gaya" />',
    '<img class="card-image" src="./dist/img/iniesta.png" alt="iniesta" />',
    '<img class="card-image" src="./dist/img/joaquin.png" alt="joaquin" />',
    '<img class="card-image" src="./dist/img/pique.png" alt="pique" />',
    '<img class="card-image" src="./dist/img/ramos.png" alt="ramos" />',
    '<img class="card-image" src="./dist/img/silva.png" alt="silva" />',
    '<img class="card-image" src="./dist/img/ansu.png" alt="xavi" />',
  ]
}

function generateBoard() {
  /* Variables */
  loadIcons()
  choices = []
  const board = document.getElementById('board')
  const cards = []
  const timer = document.getElementById('timer')
  const timerReset = new Date().getTime()

  /* Generate cards */
  for (let i = 0; i < NUM_CARDS; i++) {
    cards.push(`
      <div class="card-area" id="${i}">
          <div class="card" id="card${i}">
              <div class="face back-face" id="backFace${i}">
                  ${images[0]}
              </div>
              <div class="face front-face">
                  <i class="far fa-question-circle"></i>
              </div>
          </div>
      </div>        
    `)
    if (i % 2 == 1) {
      images.splice(0, 1)
    }
  }
  /* Make their position random */
  cards.sort(() => Math.random() - 0.5)
  board.innerHTML = cards.join(' ')

  /* Add actions to the cards */
  const cardAreas = document.querySelectorAll('.card-area')
  cardAreas.forEach((cardArea) => {
    cardArea.addEventListener('click', () => {
      const id = cardArea.id
      selectCard(id)
    })
  })

  /* Set up timer */
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    const now = new Date().getTime()
    const distance = now - timerReset
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    timer.innerHTML = `${minutes}m ${seconds}s`
  }, 1000)
}

function selectCard(i) {
  const card = document.getElementById('card' + i)
  const moves = document.getElementById('moves')

  if (card.style.transform != 'rotateY(180deg)') {
    card.style.transform = 'rotateY(180deg)'
    choices.push(i)
  }
  if (choices.length == 2) {
    moves.innerHTML = parseInt(moves.innerHTML) + 1
    deselect(choices)
    choices = []
  }
}

function deselect(selecciones) {
  setTimeout(() => {
    const back1 = document.getElementById('backFace' + selecciones[0])
    const back2 = document.getElementById('backFace' + selecciones[1])

    if (back1.innerHTML != back2.innerHTML) {
      const card1 = document.getElementById('card' + selecciones[0])
      const card2 = document.getElementById('card' + selecciones[1])
      card1.style.transform = 'rotateY(0deg)'
      card2.style.transform = 'rotateY(0deg)'
    } else {
      matches++
      back1.style.background = '#9BC53D'
      back2.style.background = '#9BC53D'

      if (matches == NUM_CARDS / 2) {
        /* TODO: Add popup saying you won */
        setTimeout(() => {
          reset(true)
        }, [1000])
      }
    }
  }, 1000)

  const reset = (hasWon = false) => {
    const moves = document.getElementById('moves')

    if(!hasWon){
      moves.innerHTML = '0'
    }
    // moves.innerHTML = '0'
    clearInterval(timerInterval)
  }
}