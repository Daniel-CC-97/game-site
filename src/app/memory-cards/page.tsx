"use client";

import Styles from './page.module.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import Modal from './components/Modal';

export default function Page() {

  const [gameLevel, setGameLevel] = useState<number>(4);
  const [cards, setCards] = useState<number[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [levelComplete, setLevelComplete] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [foundPairs, setFoundPairs] = useState<number[]>([]);

  useEffect(() => {
    const startingFlippedIndexes: number[] = [];

    let index = 0;
    cards.forEach( card => {
      startingFlippedIndexes.push(index)
      index++
    })
    setFlippedIndexes([...startingFlippedIndexes])
  }, [cards])


  const handleCardClick = (index: number) => {
    
    // Check if the clicked card is already flipped
    if (flippedIndexes.includes(index) && !foundPairs.includes(cards[index])) {
      // If already flipped, remove it from the flippedIndexes array)
      setFlippedIndexes(prevIndexes => prevIndexes.filter(flippedIndex => flippedIndex !== index));

    } else if ((!flippedIndexes.includes(index) && (flippedIndexes.length % 2 === 0)) || flippedIndexes.length === 0) {
      // If not flipped, or no other card has been flipped, add it to the flippedIndexes array and store it's value
      setFlippedIndexes(prevIndexes => [...prevIndexes, index]);
      setSelectedCards(prevCards => [...prevCards, cards[index]]);

    } else if (!flippedIndexes.includes(index) && flippedIndexes.length % 2 !== 0) {

      // Check if answer is wrong
      if (!selectedCards.includes(cards[index])) {
        loadModal('game over');
        
        // Check if answer is right
      } else if (selectedCards.includes(cards[index])) {
        setFlippedIndexes(prevIndexes => [...prevIndexes, index]);
        setFoundPairs(prevCards => [...prevCards, ...selectedCards]);
        setSelectedCards([]);

        console.log('foundPairs.length: ', foundPairs.length);
        console.log('cards.length: ', cards.length);
        console.log('flipped indexes length: ', flippedIndexes.length)
        
        
          
          // check if level complete
          if (flippedIndexes.length == (cards.length -1)) {
            console.log('should load next level modal');
            
            loadModal('next level');
          }
        }
  }
}

  const generateCards = (amountOfCards: number) => {
    const halfLength = Math.ceil(amountOfCards / 2);
    const randomNumbers = Array.from({ length: halfLength }, () => Math.floor(Math.random() * 100));
    const pairs = randomNumbers.flatMap(number => [number, number]);
    setCards(shuffleCards(pairs));
  }

  const shuffleCards = ( cards: number[] ) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
  }
    return cards;
  }

  const startGame = () => {
    setFlippedIndexes([])
  }

  const loadModal = (gameState: string) => {
    if (gameState === 'game over') {
      setGameOver(true);
    } else if (gameState === 'next level') {
      setLevelComplete(true);
    }
  }

  const resetGame = () => {
    setGameOver(false);
    setGameLevel(4)
    setCards([]);
    setFlippedIndexes([]);
    setSelectedCards([]);
    setFoundPairs([]);
  }

  const nextLevel = () => {
    setLevelComplete(false)
    setGameLevel(gameLevel + 2);
    setCards([]);
    setFlippedIndexes([]);
    setSelectedCards([]);
    setFoundPairs([]);
  }

  // Call generateCards once when the component mounts
  useEffect(() => {
    generateCards(gameLevel);
  }, [gameLevel, gameOver]);

    return (
      <>
        <section className={Styles.container}>
          <div className={Styles.cardsContainer}>
            {cards.map((value, index) => (
                    <Card
                        key={index}
                        value={value}
                        isFlipped={!flippedIndexes.includes(index)}
                        onClick={() => handleCardClick(index)}
                        hasBeenFound={foundPairs.includes(index)}
                    />
                ))}
          </div>
          <button className={Styles.button} onClick={() => startGame()}>Start Game</button>
        </section>
        {(gameOver || levelComplete) && <Modal onResetGame={resetGame} onLevelComplete={nextLevel} levelComplete={levelComplete} />}
      </>
    )
  }