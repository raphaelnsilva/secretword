import './GameOver.css';

const GameOver = ({ retry, score }) => {
  return (
    <div className='start'>
      <h1 className='titulo'>Game Over!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>Resetar jogo</button>
    </div>
  )
}

export default GameOver