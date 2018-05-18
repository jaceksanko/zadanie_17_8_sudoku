import React from 'react';
import style from './App.css';
import sudoku from 'sudoku-umd';
import Board from '../components/Board';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialBoard: '',
            board: '',
            tempBoard: '',
            resetTile: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.addValueTile = this.addValueTile.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.hendleRestart = this.hendleRestart.bind(this);
       
    }

    
    handleChange(event) {
        this.hendleRestart()
        let newSudoku = sudoku.generate("easy")
        this.setState({
            initialBoard: newSudoku,
            board: newSudoku,
            tempBoard: newSudoku,
            resetTile: true
        });
    };
    
    addValueTile(valueTile) {
            let boardArray = this.state.tempBoard.split("");
            boardArray[valueTile.id] = valueTile.value;
            let boardString = boardArray.join('');
            this.setState({
                tempBoard: boardString,
                resetTile: false
            })
        }

    handleCheck() {
        let getTempBoard = this.state.tempBoard;
        this.setState({
            board: getTempBoard
        })
    }
    
    hendleRestart() {
        this.setState({
            board: this.state.initialBoard,
            tempBoard: this.state.initialBoard,
            resetTile: true
        })
    }
    
    render() {   
        return (
            <div className="App">
                <h1>Sudoku</h1>
                <Board newGame={this.state.initialBoard.split("")} actualBoard={this.state.board.split("")} addValueTile={this.addValueTile} resetTile={this.state.resetTile} />
                <div className="buttons">
                    <button onClick={this.handleCheck}>Check</button>
                    <button onClick={this.handleChange}>New Game</button>
                    <button>Solve</button>
                    <button onClick={this.hendleRestart}>Restart</button>
                </div>
            </div>
        )
    }
}

export default App;