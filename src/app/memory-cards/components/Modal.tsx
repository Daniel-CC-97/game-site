import Styles from '../page.module.css'

interface ModalProps {
    onResetGame: () => void;
    onLevelComplete: () => void;
    levelComplete: boolean;
}

const Modal: React.FC<ModalProps> = ({onResetGame, onLevelComplete, levelComplete}) => {

    return (
        <>
            {!levelComplete && (
                <div className={`${Styles.modal} ${Styles.gameOver}`}>
                    <h1>Game Over</h1>
                    <button className={Styles.button} onClick={() => onResetGame()}>Reset Game</button>
                </div>
            )}
            {levelComplete && (
                <div className={`${Styles.modal} ${Styles.levelComplete}`}>
                    <h1>Well Done!!</h1>
                    <button className={Styles.button} onClick={() => onLevelComplete()}>Next Level</button>
                </div>
            )}
        </>
    );
}

export default Modal;