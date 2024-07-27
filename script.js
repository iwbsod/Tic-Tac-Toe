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

const checkLines = (lineClassification, grid) => {
  for (const [lineName, line] of Object.entries(grid[lineClassification])) {
    const state = Object.values(line).map(subArray => subArray[0])
    const player = Object.values(line).map(subArray => subArray[1])

    if (state.every(value => value === true) && player.every(value => value === player[0] && value !== undefined)) {
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

const getRandomNumber = () => {
  return Math.floor(Math.random() * 3)
}

const getRandomMove = (grid, lineClassificationName) => {
  const lineClassification = grid[`${lineClassificationName}s`]
  const randomLineNumber = [1, 2, 3][getRandomNumber()]
  const line = lineClassification[`${lineClassificationName}${randomLineNumber}`]
  console.log(line)
  let numOfUsed = 0
  const usedCells = [] //[0]

  for (const [lineName, lineValue] of Object.entries(line)) {
    if (lineValue.length === 2) {
      numOfUsed++
      usedCells.push(lineName)
    }
  }

  console.log(numOfUsed, usedCells)

  if (numOfUsed === 0) {
    const randomCellNumber = getRandomNumber()
    const randomCell = Object.keys(line)[randomCellNumber]
    
    line[randomCell].push('computer')
    line[randomCell][0] = true
    console.log(randomCell)
    return randomCell
  } else if (numOfUsed === 1) {
    const unusedCells = []

    for (const lineName of Object.keys(line)) {
      if (lineName !== usedCells[0]) {
        unusedCells.push(lineName)
      }
    }

    const randomCell = unusedCells[Math.floor(Math.random() * 2)]
    line[randomCell].push('computer')
    line[randomCell][0] = true
    console.log(randomCell)
    return randomCell
  } else if (numOfUsed === 2) {
    for (const lineName of Object.keys(line)) {
      if (lineName !== usedCells[0] || lineName !== usedCells[1]) {
        line[lineName].push('computer')
        line[lineName] = true
        console.log(lineName)
        return lineName
      }
    }
  } else if (numOfUsed === 3) {
    getRandomMove(lineClassificationName)
  }
}

const computerMove = (cells, grid) => {
  const lineClassificationNum = getRandomNumber()
  let randomCell;

  if (lineClassificationNum === 0) {
    randomCell = getRandomMove(grid, 'row')
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

const playerMove = (cells, grid, player) => {
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      cellId = cell.id 

      matchPosition(cellId, 'rows', grid, player)
      matchPosition(cellId, 'columns', grid, player)
      matchPosition(cellId, 'diagonals', grid, player)
      checkLines('rows', grid)
      checkLines('columns', grid)
      checkLines('diagonals', grid)

      cell.innerHTML = `<img class="cell-image" src="assets/${player}.png" alt="">`

      computerMove(cells, grid)

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

