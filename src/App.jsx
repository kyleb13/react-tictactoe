import './App.css';
import {useState} from 'react';
import { Stack } from '@mui/material';
import {Button} from '@mui/material';
import {Box} from '@mui/material'


function Square({value, onSquareClick}){
  return(
    <Button variant='outlined' sx={{height:'50px'}} onClick={onSquareClick}>
      {value}
    </Button>
  );
}

function Board({squares, xIsNext, onPlay}) {
  function handleClick(i){
    if(squares[i]!=null || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ?'X':'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: " + winner;
  } else {
    status = "Current Player: " + (xIsNext?"X":"O");
  }
  return (
    <>
      <div className='status'>
        <Box sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 2}}>
            {status}
        </Box>       
      </div>
      <Stack direction={'column'} spacing={2}>
        <Stack direction='row' spacing={2}>
          <Square value={squares[0]} onSquareClick={() => {handleClick(0)}} />
          <Square value={squares[1]} onSquareClick={() => {handleClick(1)}} />
          <Square value={squares[2]} onSquareClick={() => {handleClick(2)}} />
        </Stack>
        <Stack direction='row' spacing={2}>
          <Square value={squares[3]} onSquareClick={() => {handleClick(3)}} />
          <Square value={squares[4]} onSquareClick={() => {handleClick(4)}} />
          <Square value={squares[5]} onSquareClick={() => {handleClick(5)}} />
        </Stack>
        <Stack direction='row' spacing={2}>
          <Square value={squares[6]} onSquareClick={() => {handleClick(6)}} />
          <Square value={squares[7]} onSquareClick={() => {handleClick(7)}} />
          <Square value={squares[8]} onSquareClick={() => {handleClick(8)}} />
        </Stack>
      </Stack>
    </>
  );
}

export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const currentHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(currentHistory);
    setCurrentMove(currentHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove%2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move>0){
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return(
      <Button variant='contained' sx={{width:'200px'}} onClick={() => jumpTo(move)}>
        {description}
      </Button>
    );
  });
  return(
    <div className='game'>
      <div className='game-board'>
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <Stack direction={'column'} spacing={2}>{moves}</Stack>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}