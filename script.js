const monkeyScore = document.querySelector('js-human-score')
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
    let cellIndex = 0
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gridHTML += `
          <div class="cell js-cell" id="${cellIndex}"></div>
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

//I figured out the problem, object.values' elements are arrays so if you compare them with object.every, it returns false since arrays are reference types
const checkLines = (lineClassification, grid) => {
  for (const [lineName, line] of Object.entries(grid[lineClassification])) {
    const state = Object.values(line).map(subArray => subArray[0])
    const player = Object.values(line).map(subArray => subArray[1])

    console.log('object', Object.values(line))
    console.log(state)
    console.log(player)

    //How to check if all is true and 

    if (state.every(value => value === true) && player.every(value => value !== undefined)) {
      console.log('congrats')
    }
  }
}

const matchPosition = (position, lineClassification, grid, player) => {
  for (const [lineName, line] of Object.entries(grid[lineClassification])) {
    for (const [cellName, cellValue] of Object.entries(line)) {
      if (cellName === position) { 
        if (cellValue.length !== 2) {
          grid[lineClassification][lineName][cellName][0] = true
          grid[lineClassification][lineName][cellName].push(player)
        }
      }
    }
  }
}

const playerMove = (cells, grid, player) => {
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      cellId = cell.id 

      matchPosition(cellId, 'rows', grid, player)
      matchPosition(cellId, 'columns', grid, player)
      matchPosition(cellId, 'diagonals', grid, player)
      checkLines('rows', grid)
      // checkLines('columns', grid)
      // checkLines('diagonals', grid)

      cell.innerHTML = `<img class="cell-image" src="assets/${player}.png" alt="">`
    })
  })
}

const startGame = () => {
  startGameButton.addEventListener('click', () => {
    generateGrid()

    const grid = {
      rows: {
        row1: {0: [false], 1: [false], 2: [false]},
        row2: {3: [false], 4: [false], 5: [false]},
        row3: {6: [false], 7: [false], 8: [false]},
      },
      columns: {
        column1: {0: [false], 3: [false], 6: [false]},
        column2: {1: [false], 4: [false], 7: [false]},
        column3: {2: [false], 5: [false], 8: [false]},
      },
      diagonals: {
        diagonal1: {0: [false], 4: [false], 8: [false]},
        diagonal2: {2: [false], 4: [false], 6: [false]},
      },
    }
    const difficulty = chooseDifficulty()
    const cells = document.querySelectorAll('.js-cell')
    
    playerMove(cells, grid, 'monkey')

  })
}

startGame()

