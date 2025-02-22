const monkeyScoreElement = document.querySelector('.js-human-score')
const computerScoreElement = document.querySelector('.js-robot-score')
const gridDisplay = document.querySelector('.js-grid')
const startGameButton = document.querySelector('.js-start-button')
const resetScoreButton = document.querySelector('.js-reset-button')
let monkeyScore = parseFloat(localStorage.getItem('monkeyScore')) || 0
let computerScore = parseFloat(localStorage.getItem('computerScore')) || 0
let isPlaying;
let taken = false;

const generateGrid = () => {
  let gridHTML = ''
    let cellIndex = 0
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gridHTML += `
          <div class="cell js-cell" id="${cellIndex}">
            <img class="cell-image move-preview js-image" src="assets/monkey.png" alt="">
          </div>
        `
        cellIndex++
      }
    }

    gridDisplay.innerHTML = gridHTML
}

const generateScore = () => {
  monkeyScoreElement.innerHTML = `: ${monkeyScore}`;
  computerScoreElement.innerHTML = `${computerScore} :`;
}

const removeHover = () => {
  const images = document.querySelectorAll('.js-image')

  images.forEach((image) => {
    const classes = Object.values(image.classList)

    if (classes.includes('move-preview')) {
      image.style.display = 'none'
    }
  })
}

const resetScore = () => {
  resetScoreButton.addEventListener('click', () => {
    monkeyScore = 0
    computerScore = 0
    localStorage.removeItem('monkeyScore', (monkeyScore).toString())
    localStorage.removeItem('computerScore', (computerScore).toString())
    generateScore()
  })
}

const checkLines = (lineClassification, grid) => {
  for (const [lineName, line] of Object.entries(grid[lineClassification])) {
    const state = Object.values(line).map(subArray => subArray[0])
    const player = Object.values(line).map(subArray => subArray[1])

    if (state.every(value => value === true) && player.every(value => value === player[0] && value !== undefined)) { 
      if (player[0] === 'monkey') {
        monkeyScore++
        localStorage.setItem('monkeyScore', (monkeyScore).toString())
        isPlaying = false
        restartGame()
      } else if (player[0] === 'computer') {
        computerScore++
        localStorage.setItem('computerScore', (computerScore).toString())
        isPlaying = false
        restartGame()
      }

      generateScore()
    }
  }
}

const restartGame = () => {
  startGameButton.innerHTML = 'Restart Game';
}

const matchPosition = (position, lineClassification, grid, player) => {
  for (const [lineName, line] of Object.entries(grid[lineClassification])) {
    for (const [cellName, cellValue] of Object.entries(line)) {
      if (cellName === position) {
        taken = false 
        if (cellValue.length !== 2) {
          grid[lineClassification][lineName][cellName][0] = true
          grid[lineClassification][lineName][cellName].push(player)
        } else {
          taken = true
        }
      }
    }
  }
}

const getRandomNumber = (num) => {
  return Math.floor(Math.random() * num)
}

const getRandomMove = (grid, lineClassificationName) => {
  const lineClassification = grid[`${lineClassificationName}s`]
  let randomLineNumber;
  let line;
  let randomCell;

  if (lineClassificationName === 'diagonal') {
    randomLineNumber = [1, 2][getRandomNumber(2)]
    line = lineClassification[`${lineClassificationName}${randomLineNumber}`]
  } else {
    randomLineNumber = [1, 2, 3][getRandomNumber(3)]
    line = lineClassification[`${lineClassificationName}${randomLineNumber}`]
  }

  let numOfUsed = 0
  const usedCells = []

  for (const [lineName, lineValue] of Object.entries(line)) {
    if (lineValue.length === 2) {
      numOfUsed++
      usedCells.push(lineName)
    }
  }

  if (numOfUsed === 3) {
    return getRandomMove(grid, lineClassificationName)
  }

  if (numOfUsed === 0) {
    const randomCellNumber = getRandomNumber(3)
    randomCell = `${Object.keys(line)[randomCellNumber]}`
  } else if (numOfUsed === 1) {
    const unusedCells = []

    for (const lineName of Object.keys(line)) {
      if (lineName !== usedCells[0]) {
        unusedCells.push(lineName)
      }
    }

    randomCell = `${unusedCells[getRandomNumber(2)]}`
  } else if (numOfUsed === 2) {
    for (const lineName of Object.keys(line)) {
      if (lineName !== usedCells[0] && lineName !== usedCells[1]) {
        randomCell = `${lineName}`
      }
    }
  }

  matchPosition(randomCell, 'rows', grid, 'computer')
  matchPosition(randomCell, 'columns', grid, 'computer')
  matchPosition(randomCell, 'diagonals', grid, 'computer')

  return randomCell
}

const computerMove = (cells, grid) => {
  const lineClassificationNum = getRandomNumber(3)
  let randomCell = '';

  if (lineClassificationNum === 0) {
    randomCell = getRandomMove(grid, 'row', randomCell)
  } else if (lineClassificationNum === 1) {
    randomCell = getRandomMove(grid, 'column')
  } else if (lineClassificationNum === 2) {
    randomCell = getRandomMove(grid, 'diagonal')
  }

  cells.forEach((cell) => {
    if (cell.id === randomCell) {
      cell.innerHTML = `<img class="cell-image" src="assets/robot.png" alt="">`
    }
  })
}

const playerMove = (cells, grid, player, usedInGrid) => {
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (isPlaying === true) {
        const cellId = cell.id 
  
        matchPosition(cellId, 'rows', grid, player)
        matchPosition(cellId, 'columns', grid, player)
        matchPosition(cellId, 'diagonals', grid, player)

        if (taken === false) {
          checkLines('rows', grid)
          checkLines('columns', grid)
          checkLines('diagonals', grid)
          usedInGrid++
    
          cell.innerHTML = `<img class="cell-image" src="assets/${player}.png" alt="">`

          if (usedInGrid !== 9 && isPlaying === true) {
            computerMove(cells, grid)
            checkLines('rows', grid)
            checkLines('columns', grid)
            checkLines('diagonals', grid)
            usedInGrid++
          } else {
            isPlaying = false
            restartGame()
            removeHover()
          }
        }
      }
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
    let usedInGrid = 0
    isPlaying = true;
    const cells = document.querySelectorAll('.js-cell')

    playerMove(cells, grid, 'monkey', usedInGrid)

  })
}

generateScore()
resetScore()
startGame()

