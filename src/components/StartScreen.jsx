import "./StartScreen.css";

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1 className="titulo">Palavra secreta!</h1>        
        <p>Clique no botão abiaxo para começar a jogar</p>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen;