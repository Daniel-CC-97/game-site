import Styles from '../page.module.css';

interface CardProps {
    value: number;
    isFlipped: boolean;
    onClick: () => void;
    hasBeenFound: boolean;
}

const Card: React.FC<CardProps> = ({ value, isFlipped, onClick, hasBeenFound }) => {

    const handleCardClick = () => {
        if (!hasBeenFound) {
            onClick();
        }
    }
    return (
        <div className={`${Styles.card} ${isFlipped ? Styles.flipped : ''}`} onClick={handleCardClick}>
            <div className={Styles.front}></div>
            <div className={Styles.back}>{value}</div>
        </div>
    );
}

export default Card;