const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
]
let circleTurn

const cells = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningModal = document.getElementById('winningModal')
const message = document.querySelector('[data-message]')
const restart = document.getElementById('restart')

startGame()

function startGame() {
    circleTurn = false
    winningModal.classList.remove('show')
    
    cells.forEach(c => {
        c.classList.remove(X_CLASS)
        c.classList.remove(CIRCLE_CLASS)
        c.removeEventListener('click', handleClick)
        c.addEventListener('click', handleClick, { once: true })
    })

    restart.removeEventListener('click', startGame)
    restart.addEventListener('click', startGame)

    setBoardHoverClass()
}

function handleClick(e) {
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    placeMark(e.target, currentClass)

    if (checkWin(currentClass)) {
        endGame()
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    winningModal.classList.add('show')

    message.innerText =  draw? 'It\'s a draw!' : `Player ${circleTurn ? '2' : '1'} wins!`
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    board.classList.add(circleTurn ? CIRCLE_CLASS : X_CLASS)

}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => cells[index].classList.contains(currentClass))
    })
}