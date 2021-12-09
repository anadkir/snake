const gameArea = document.getElementById('game-area')
const gameAreaContext = gameArea.getContext('2d')
const grid = 30
let snake = newSnake()
let isRunning = false

let food = {
  x: 630,
  y: 330
}

let oldTimestamp = null

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function newSnake (){
  return {
    x: 240,
    y: 450,
    speedX: grid,
    speedY: 0,
    cells: [],
    maxLength: 6,
    speed: 300
  }
}

function gameEnd() {
  snake = newSnake()
  isRunning = false
  oldTimestamp = null
  window.requestAnimationFrame(gameLoop)
}

function gameLoop(timestamp) {

  if (oldTimestamp === null || timestamp - oldTimestamp > snake.speed){
    oldTimestamp = timestamp
    gameAreaContext.clearRect(0, 0, gameArea.width, gameArea.height)
    snake.x += snake.speedX
    snake.y += snake.speedY

    if (snake.x < 0 || snake.x >= gameArea.width || snake.y < 0 || snake.y >= gameArea.height){
      gameEnd()
    }

    snake.cells.unshift({x: snake.x, y: snake.y})

    if (snake.cells.length > snake.maxLength){
      snake.cells.pop()
    }
    console.log(snake.cells.length, snake.maxLength)

    gameAreaContext.fillStyle = '#ffb582'
    gameAreaContext.fillRect(food.x, food.y, grid, grid)
    gameAreaContext.fillRect(food.x, food.y, grid, grid)

    let color = 0

    snake.cells.forEach( (cell, index) => {
      gameAreaContext.fillStyle = `rgb(${color}, ${color}, ${color})`
      gameAreaContext.fillRect(cell.x, cell.y, grid, grid)
      color += 5
      if (cell.x === food.x && cell.y === food.y){
        snake.maxLength ++
        food.x = random(0, 40) * grid
        food.y = random(0, 30) * grid
        snake.speed -= 5
      }
      snake.cells.forEach((currentCell, index2) => {
        if (index2 !== index){
          if (currentCell.x === cell.x && currentCell.y === cell.y){
            gameEnd()
          }
        }
      })
    })
    gameAreaContext.fillStyle = '#fff'
    gameAreaContext.font = '24px Roboto'
    gameAreaContext.fillText(`Score: ${snake.maxLength - 6}`, 30, 30)

    if (!isRunning){
      gameAreaContext.font = '40px Roboto'
      gameAreaContext.fillText('Press any key to start game!',380 , 450)
    }
  }

  if (isRunning){
    window.requestAnimationFrame(gameLoop)
  }
}
window.requestAnimationFrame(gameLoop)

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && snake.speedY === 0){
    snake.speedY = -grid
    snake.speedX = 0
  }
  if (e.key === 'ArrowRight' && snake.speedX === 0){
    snake.speedY = 0
    snake.speedX = grid
  }
  if (e.key === 'ArrowDown' && snake.speedY === 0){
    snake.speedY = grid
    snake.speedX = 0
  }
  if (e.key === 'ArrowLeft'&& snake.speedX === 0){
    snake.speedY = 0
    snake.speedX = -grid
  }
  if (!isRunning){
    isRunning = true
    window.requestAnimationFrame(gameLoop)
  }
})
