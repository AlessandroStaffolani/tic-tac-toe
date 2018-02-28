import React from 'react';
import DocumentTitle from 'react-document-title';
import {calculateWinner, getSquarePosition} from "../controller/Controller";

class SquareContent extends React.Component {
    render() {
        let classNameValue = this.props.className;
        if (this.props.win) {
            classNameValue += ' win';
        }
        return (
            <span className={classNameValue}>{this.props.value}</span>
        );
    }
}

function Square(props) {
    return (
        <button className="square no-style" onClick={props.onClick}>
            <SquareContent
                className={props.value === null ? null : props.value.props.className}
                value={props.value === null ? null : props.value.props.children}
                win={props.isWinPosition}
            />
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        let win = false;
        if (this.props.winnerCombination) {
            if (this.props.winnerCombination.indexOf(i) >= 0) {
                win = true;
            }
        }
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                isWinPosition={win}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                row: null,
                col: null
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const position = getSquarePosition(i);
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? <span className={'green-tag'}>X</span> : <span className={'red-tag'}>0</span>;
        this.setState({
            history: history.concat([{
                squares: squares,
                row: (position !== null ? position.row : null),
                col: (position !== null ? position.col : null),
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + ' <span class="small">row: ' + step.row + ' col: ' + step.col + '</span>':
                'Go to game start';
            let buttonClass = 'btn blue';
            if (move === 0) {
                buttonClass += 'btn-start green btn'
            }
            return (
                <li key={move} className={move === this.state.stepNumber && move > 0 ? 'bold list-item' : 'list-item'}>
                    <button className={buttonClass} onClick={() => this.jumpTo(move)} dangerouslySetInnerHTML={{__html: desc}}></button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner.player;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <DocumentTitle title={'Tic-Tac-Toe'}>
                <div className="game">
                    <div className="game-wrapper">
                        <div className="game-info">
                            <p className="status-list">TIC-TAC-TOE</p>
                            <ul className={'list'}>{moves}</ul>
                        </div>
                        <div className="game-board">
                            <div className={'status'}>{status}</div>
                            <Board
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)}
                                winnerCombination={winner ? winner.combination : null}
                            />
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default Game;