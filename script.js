const humanScore = document.querySelector('js-human-score')
const robotScore = document.querySelector('js-robot-score')
const gridDisplay = document.querySelector('.js-grid')
const difficultyDisplay = document.querySelector('.js-difficulty-container')
const startGameButton = document.querySelector('.js-start-button')
const resetGameButton = document.querySelector('.js-reset-button')
const easyButton = document.querySelector('.js-easy-button')
const mediumButton = document.querySelector('.js-medium-button')
const hardButton = document.querySelector('.js-hard-button')

const generateGrid = () => {
  let gridHTML = ''
    let cellIndex = 1
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gridHTML += `
          <div class="cell" id="${cellIndex}"></div>
        `
        cellIndex++
      }
    }

    gridDisplay.innerHTML = gridHTML
}

const chooseDifficulty = () => {
  difficultyDisplay.style.display = 'flex'

  easyButton.addEventListener('click', () => {
    difficultyDisplay.style.display = 'none'
    return 'easy'
  })

  mediumButton.addEventListener('click', () => {
    difficultyDisplay.style.display = 'none'
    return 'medium'
  })

  hardButton.addEventListener('click', () => {
    difficultyDisplay.style.display = 'none'
    return 'hard'
  })
}

const startGame = () => {
  startGameButton.addEventListener('click', () => {
    const grid = {
      rows: {
        row1: {0: false, 1: false, 2: false}, //line
        row2: {3: false, 4: false, 5: false},
        row3: {6: false, 7: false, 8: false},
      },
      columns: {
        column1: {0: false, 3: false, 6: false},
        column2: {1: false, 4: false, 7: false},
        column3: {2: false, 5: false, 8: false},
      },
      diagonals: {
        diagonal1: {0: false, 4: false, 8: false},
        diagonal2: {2: false, 4: false, 6: false},
      },
    }
    const difficulty = chooseDifficulty()
    
    generateGrid()


  })
}

startGame()

