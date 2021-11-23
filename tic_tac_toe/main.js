let data = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let currentPlayer = 'john';
const display = document.getElementById('display');
let active = false;

const createPan = () => {
    setPlayer(currentPlayer);
    const pan = document.querySelector('#pan');
    pan.innerHTML = '';
    data.map((item, index) => {
        // create grid element
        let grid = document.createElement('div');
        grid.id = index;
        grid.className = 'grid';
        grid.addEventListener('click', () => onGridClick(grid));
        // create span
        let spanElement = document.createElement('div');
        spanElement.textContent = item;
        grid.appendChild(spanElement);

        pan.appendChild(grid)
    });
}

onGridClick = (grid) => {
    const id = grid.id;
    if(!active) return;
    if(data[id] === '') {
        document.getElementById(id).innerHTML = currentPlayer[0];
        data[id] = currentPlayer;
        if(currentPlayer === 'john') {
            currentPlayer = 'neo';
        } else {
            currentPlayer = 'john';
        }
    }
    console.log(checkWinner())
    if(checkWinner()) {
        display.innerHTML = checkWinner() + ' win!';
    }  
}

startGame = (player) => {
    data = ['', '', '', '', '', '', '', '', ''];
    setPlayer(player);
    display.innerHTML = '';
    active = true;
    createPan();
}

setPlayer = (player) => {
    currentPlayer = player;
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = data[winCondition[0]];
        let b = data[winCondition[1]];
        let c = data[winCondition[2]];
         
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            active = false;
            return a;
        }
    }
    return;
}

startGame(currentPlayer);
