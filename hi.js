const grid = {
  rows: {
    row1: {0: [false, true], 1: [false], 2: [false]}, //line 
    row2: {3: [false, true], 4: [false], 5: [false]},
    row3: {6: [false, true], 7: [false], 8: [false]},
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

const getRandomNumber = () => {
  return Math.floor(Math.random() * 3)
}

const getRandomMove = (lineClassificationName) => {
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

  if (lineClassificationNum === 0) {
    const randomCell = getRandomMove('row')
  } else if (lineClassificationNum === 1) {
    const randomCell = getRandomMove('column')
  } else if (lineClassificationNum === 2) {
    const randomCell = getRandomMove('diagonal')
  }

}

computerMove('cells', grid)