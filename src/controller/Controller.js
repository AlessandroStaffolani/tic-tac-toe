

export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        let cellA = getSquaresValue(squares, a);
        let cellB = getSquaresValue(squares, b);
        let cellC = getSquaresValue(squares, c);
        if (cellA && cellA === cellB && cellA === cellC) {
            return {
                player: squares[a].props.children,
                combination: lines[i]
            }
        }
    }
    return null;
}

export function getSquarePosition(i) {
    const board = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ];

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === i) {
                return {
                    row: row + 1,
                    col: col + 1
                }
            }
        }
    }

    return null;
}

function getSquaresValue(squares, i) {
    if (squares[i] !== undefined) {
        if (squares[i] !== null) {
            if (squares[i].props.children !== undefined) {
                return squares[i].props.children
            }
        }
    }

    return null;
}