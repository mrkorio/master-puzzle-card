"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { 
  Trophy, 
  Clock, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Eye,
  Lock,
  Shuffle,
  Flame,
  Droplets,
  Bolt,
  Star,
  Settings,
  Plus,
  Minus,
  AlertCircle,
  Lightbulb,
  X
} from "lucide-react";

// Card types
type CardType = {
  id: number;
  type: string;
  matched: boolean;
  flipped: boolean;
  ability: string;
  element?: string;
  protected?: boolean;
};

// Player stats
type PlayerStats = {
  level: number;
  xp: number;
  unlockedAbilities: string[];
  completedLevels: number[];
};

// Ability type
type CardAbility = {
  name: string;
  icon: JSX.Element;
  description: string;
  manaCost: number;
  unlockLevel: number;
};

// Level configuration
const levelConfig = [
  { level: 1, pairs: 4, grid: "level-1", manaPerTurn: 2, xpReward: 100 },
  { level: 2, pairs: 6, grid: "level-2", manaPerTurn: 3, xpReward: 200 },
  { level: 3, pairs: 8, grid: "level-3", manaPerTurn: 3, xpReward: 300 },
  { level: 4, pairs: 10, grid: "level-4", manaPerTurn: 4, xpReward: 400 },
];

// Card abilities
const cardAbilities: CardAbility[] = [
  { name: "reveal", icon: <Eye className="w-4 h-4" />, description: "Reveals another random card temporarily", manaCost: 0, unlockLevel: 1 },
  { name: "shield", icon: <Shield className="w-4 h-4" />, description: "Protects from one mistake", manaCost: 0, unlockLevel: 1 },
  { name: "double", icon: <Zap className="w-4 h-4" />, description: "Counts as two matches when paired", manaCost: 0, unlockLevel: 1 },
  { name: "shuffle", icon: <Shuffle className="w-4 h-4" />, description: "Shuffles all unmatched cards", manaCost: 1, unlockLevel: 2 },
  { name: "mana_boost", icon: <Bolt className="w-4 h-4" />, description: "Gain +2 mana this turn", manaCost: 0, unlockLevel: 2 },
  { name: "protect_all", icon: <Shield className="w-4 h-4" />, description: "Protects all currently flipped cards", manaCost: 2, unlockLevel: 3 },
  { name: "reveal_type", icon: <Lightbulb className="w-4 h-4" />, description: "Reveals all cards of the same type temporarily", manaCost: 2, unlockLevel: 3 },
  { name: "extra_turn", icon: <Plus className="w-4 h-4" />, description: "Grants an extra turn", manaCost: 3, unlockLevel: 4 },
];

// Card elements (for visual variety and potential gameplay effects)
const cardElements = [
  { name: "fire", color: "from-red-500 to-orange-500" },
  { name: "water", color: "from-blue-500 to-cyan-500" },
  { name: "earth", color: "from-green-500 to-emerald-500" },
  { name: "air", color: "from-purple-500 to-indigo-500" },
  { name: "light", color: "from-yellow-500 to-amber-500" },
];

// Special events
const specialEvents = [
  { name: "Double Mana", description: "Double mana for 3 turns", icon: <Bolt className="w-5 h-5 text-yellow-500" />, duration: 3 },
  { name: "Card Lockdown", description: "No card abilities for 2 turns", icon: <Lock className="w-5 h-5 text-red-500" />, duration: 2 },
  { name: "Memory Boost", description: "All cards revealed for 3 seconds", icon: <Lightbulb className="w-5 h-5 text-blue-500" />, duration: 1 },
  { name: "Mana Drain", description: "Reduced mana for 2 turns", icon: <Minus className="w-5 h-5 text-purple-500" />, duration: 2 },
];

export default function Game() {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState<CardType | null>(null);
  const [secondChoice, setSecondChoice] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [revealedCard, setRevealedCard] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScores, setHighScores] = useState<{[key: number]: {turns: number, time: number}}>({});
  
  // New state for enhanced gameplay
  const [mana, setMana] = useState(0);
  const [maxMana, setMaxMana] = useState(0);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    level: 1,
    xp: 0,
    unlockedAbilities: ["reveal", "shield", "double"],
    completedLevels: [],
  });
  const [activeEvent, setActiveEvent] = useState<{name: string, description: string, icon: JSX.Element, duration: number, turnsLeft: number} | null>(null);
  const [showDeckBuilder, setShowDeckBuilder] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<string[]>(["reveal", "shield", "double"]);
  const [availableAbilities, setAvailableAbilities] = useState<string[]>(["reveal", "shield", "double"]);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [showAbilityInfo, setShowAbilityInfo] = useState<string | null>(null);
  const [showEventNotification, setShowEventNotification] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Initialize cards for the current level
  const initializeCards = () => {
    const currentLevelConfig = levelConfig[level - 1];
    const cardTypes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    
    let cardPairs = [];
    for (let i = 0; i < currentLevelConfig.pairs; i++) {
      // Assign abilities to cards based on selected deck
      const ability1 = selectedDeck[Math.floor(Math.random() * selectedDeck.length)];
      const ability2 = i < 3 ? selectedDeck[Math.floor(Math.random() * selectedDeck.length)] : "none";
      
      // Assign elements for visual variety
      const element = cardElements[Math.floor(Math.random() * cardElements.length)].name;
      
      cardPairs.push({ type: cardTypes[i], ability: ability1, element });
      cardPairs.push({ type: cardTypes[i], ability: ability2, element });
    }
    
    // Shuffle cards
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
        matched: false,
        flipped: false,
        protected: false,
      }));
    
    setCards(shuffledCards);
    setTurns(0);
    setTimer(0);
    setGameWon(false);
    setFirstChoice(null);
    setSecondChoice(null);
    setRevealedCard(null);
    setIsTimerRunning(false);
    setGameStarted(false);
    setMana(currentLevelConfig.manaPerTurn);
    setMaxMana(currentLevelConfig.manaPerTurn);
    setActiveEvent(null);
    setRevealedCards([]);
  };

  // Handle card selection
  const handleChoice = (card: CardType) => {
    if (card.flipped || disabled || (mana <= 0 && !firstChoice)) return;
    
    if (!gameStarted) {
      setGameStarted(true);
      setIsTimerRunning(true);
    }
    
    // Deduct mana for flipping a card (only for the first card of the turn)
    if (!firstChoice) {
      setMana(prev => prev - 1);
    }
    
    if (firstChoice) {
      setSecondChoice(card);
    } else {
      setFirstChoice(card);
    }
  };

  // Reset choices and increment turn
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
    
    // Replenish mana at the start of a new turn
    const baseMana = levelConfig[level - 1].manaPerTurn;
    
    // Apply event effects
    if (activeEvent) {
      if (activeEvent.name === "Double Mana") {
        setMana(baseMana * 2);
      } else if (activeEvent.name === "Mana Drain") {
        setMana(Math.max(1, Math.floor(baseMana / 2)));
      } else {
        setMana(baseMana);
      }
      
      // Decrease event duration
      setActiveEvent(prev => {
        if (prev && prev.turnsLeft > 1) {
          return { ...prev, turnsLeft: prev.turnsLeft - 1 };
        } else {
          return null;
        }
      });
    } else {
      setMana(baseMana);
      
      // Random chance to trigger a special event
      if (Math.random() < 0.2 && level > 1) {
        const randomEvent = specialEvents[Math.floor(Math.random() * specialEvents.length)];
        setActiveEvent({
          ...randomEvent,
          turnsLeft: randomEvent.duration
        });
        setShowEventNotification(true);
        setTimeout(() => setShowEventNotification(false), 3000);
      }
    }
  };

  // Check if all cards are matched
  const checkGameWon = () => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameWon(true);
      setIsTimerRunning(false);
      
      // Save high score
      setHighScores(prev => {
        const currentScore = { turns, time: timer };
        const prevScore = prev[level];
        
        if (!prevScore || turns < prevScore.turns || (turns === prevScore.turns && timer < prevScore.time)) {
          return { ...prev, [level]: currentScore };
        }
        
        return prev;
      });
      
      // Award XP and mark level as completed
      if (!playerStats.completedLevels.includes(level)) {
        setPlayerStats(prev => ({
          ...prev,
          xp: prev.xp + levelConfig[level - 1].xpReward,
          completedLevels: [...prev.completedLevels, level]
        }));
        
        // Check if player leveled up and unlocked new abilities
        const newPlayerLevel = Math.floor((playerStats.xp + levelConfig[level - 1].xpReward) / 100) + 1;
        if (newPlayerLevel > playerStats.level) {
          setPlayerStats(prev => ({
            ...prev,
            level: newPlayerLevel,
            unlockedAbilities: [
              ...prev.unlockedAbilities,
              ...cardAbilities
                .filter(ability => ability.unlockLevel <= newPlayerLevel && !prev.unlockedAbilities.includes(ability.name))
                .map(ability => ability.name)
            ]
          }));
        }
      }
    }
  };

  // Handle special card abilities
  const handleCardAbility = (ability: string) => {
    // Skip ability activation if Card Lockdown event is active
    if (activeEvent && activeEvent.name === "Card Lockdown") return;
    
    switch (ability) {
      case "reveal":
        // Find a card that's not matched and not currently selected
        const unmatched = cards.filter(card => 
          !card.matched && 
          card.id !== firstChoice?.id && 
          card.id !== secondChoice?.id
        );
        if (unmatched.length > 0) {
          const randomCard = unmatched[Math.floor(Math.random() * unmatched.length)];
          setRevealedCard(randomCard.id);
          setTimeout(() => setRevealedCard(null), 1500);
        }
        break;
      case "shield":
        // Protect the matched cards from being flipped back
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.id === firstChoice?.id || card.id === secondChoice?.id) {
              return { ...card, protected: true };
            }
            return card;
          });
        });
        break;
      case "double":
        // This is handled in the match checking logic
        break;
      case "shuffle":
        // Shuffle all unmatched cards
        if (mana >= 1) {
          setMana(prev => prev - 1);
          const matchedCards = cards.filter(card => card.matched);
          const unmatchedCards = cards.filter(card => !card.matched)
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({
              ...card,
              id: matchedCards.length + index
            }));
          setCards([...matchedCards, ...unmatchedCards]);
        }
        break;
      case "mana_boost":
        // Gain additional mana this turn
        setMana(prev => prev + 2);
        break;
      case "protect_all":
        // Protect all currently flipped cards
        if (mana >= 2) {
          setMana(prev => prev - 2);
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.flipped) {
                return { ...card, protected: true };
              }
              return card;
            });
          });
        }
        break;
      case "reveal_type":
        // Reveal all cards of the same type temporarily
        if (mana >= 2 && firstChoice) {
          setMana(prev => prev - 2);
          const sameTypeCards = cards
            .filter(card => card.type === firstChoice.type && !card.matched && !card.flipped)
            .map(card => card.id);
          setRevealedCards(sameTypeCards);
          setTimeout(() => setRevealedCards([]), 2000);
        }
        break;
      case "extra_turn":
        // Grant an extra turn (don't reset turn and replenish mana)
        if (mana >= 3) {
          setMana(prev => prev - 3);
          setFirstChoice(null);
          setSecondChoice(null);
          setDisabled(false);
        }
        break;
    }
  };

  // Update available abilities when player stats change
  useEffect(() => {
    const newAvailableAbilities = cardAbilities
      .filter(ability => playerStats.unlockedAbilities.includes(ability.name))
      .map(ability => ability.name);
    
    setAvailableAbilities(newAvailableAbilities);
    
    // Update selected deck if needed
    if (selectedDeck.some(ability => !newAvailableAbilities.includes(ability))) {
      setSelectedDeck(prev => prev.filter(ability => newAvailableAbilities.includes(ability)));
    }
  }, [playerStats]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Initialize game
  useEffect(() => {
    initializeCards();
  }, [level, selectedDeck]);

  // Check for matches when two cards are selected
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      
      // Check if cards match
      if (firstChoice.type === secondChoice.type) {
        // Handle double ability
        const isDoubleMatch = firstChoice.ability === "double" || secondChoice.ability === "double";
        
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.id === firstChoice.id || card.id === secondChoice.id) {
              return { ...card, matched: true, flipped: true };
            } else if (isDoubleMatch && !card.matched && card.type === firstChoice.type) {
              // If it's a double match, match all cards of this type
              return { ...card, matched: true, flipped: true };
            } else {
              return card;
            }
          });
        });
        
        // Trigger abilities
        if (firstChoice.ability && firstChoice.ability !== "none") {
          handleCardAbility(firstChoice.ability);
        }
        if (secondChoice.ability && secondChoice.ability !== "none") {
          handleCardAbility(secondChoice.ability);
        }
        
        resetTurn();
      } else {
        // If cards don't match
        setTimeout(() => {
          setCards(prevCards => {
            return prevCards.map(card => {
              if ((card.id === firstChoice.id || card.id === secondChoice.id) && !card.protected) {
                return { ...card, flipped: false };
              } else {
                return card;
              }
            });
          });
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Update card flips
  useEffect(() => {
    setCards(prevCards => {
      return prevCards.map(card => {
        // Flip selected cards
        if (card.id === firstChoice?.id || card.id === secondChoice?.id) {
          return { ...card, flipped: true };
        }
        // Handle revealed card from ability
        if (card.id === revealedCard || revealedCards.includes(card.id)) {
          return { ...card, flipped: true };
        } else if (revealedCard !== null && !card.matched && card.id !== firstChoice?.id && card.id !== secondChoice?.id && !card.protected && !revealedCards.includes(card.id)) {
          return { ...card, flipped: false };
        }
        return card;
      });
    });
  }, [firstChoice, secondChoice, revealedCard, revealedCards]);

  // Check if game is won
  useEffect(() => {
    checkGameWon();
  }, [cards]);

  // Handle Memory Boost event
  useEffect(() => {
    if (activeEvent && activeEvent.name === "Memory Boost") {
      // Reveal all cards temporarily
      const allCardIds = cards.filter(card => !card.matched).map(card => card.id);
      setRevealedCards(allCardIds);
      
      setTimeout(() => {
        setRevealedCards([]);
        setActiveEvent(null);
      }, 3000);
    }
  }, [activeEvent]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate XP needed for next level
  const getXpForNextLevel = () => {
    return (playerStats.level) * 100;
  };

  // Calculate XP progress percentage
  const getXpProgressPercentage = () => {
    const xpForCurrentLevel = (playerStats.level - 1) * 100;
    const xpForNextLevel = playerStats.level * 100;
    const xpProgress = playerStats.xp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    return Math.floor((xpProgress / xpNeeded) * 100);
  };

  // Get ability details by name
  const getAbilityDetails = (abilityName: string): CardAbility | undefined => {
    return cardAbilities.find(ability => ability.name === abilityName);
  };

  // Toggle ability selection for deck building
  const toggleAbilitySelection = (abilityName: string) => {
    if (selectedDeck.includes(abilityName)) {
      if (selectedDeck.length > 1) {
        setSelectedDeck(prev => prev.filter(name => name !== abilityName));
      }
    } else if (selectedDeck.length < 5) {
      setSelectedDeck(prev => [...prev, abilityName]);
    }
  };

  // Get element color for card
  const getElementColor = (elementName?: string) => {
    if (!elementName) return "from-primary/80 to-primary";
    const element = cardElements.find(el => el.name === elementName);
    return element ? element.color : "from-primary/80 to-primary";
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Memory Masters: Strategic Card Puzzle</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
            Match pairs of cards and use strategic abilities to complete each level. Manage your mana wisely!
          </p>
          
          {/* Level Selection */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <button
              onClick={() => setLevel(prev => Math.max(1, prev - 1))}
              disabled={level === 1}
              className="p-2 rounded-full bg-secondary text-secondary-foreground disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex gap-2">
              {levelConfig.map((config, index) => (
                <button
                  key={index}
                  onClick={() => setLevel(index + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    level === index + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                  }`}
                >
                  Level {index + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setLevel(prev => Math.min(4, prev + 1))}
              disabled={level === 4}
              className="p-2 rounded-full bg-secondary text-secondary-foreground disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Player Stats */}
          <div className="bg-card p-4 rounded-lg shadow-md border border-border max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="font-medium">Player Level: {playerStats.level}</span>
              </div>
              <span className="text-sm text-foreground/70">{playerStats.xp} XP</span>
            </div>
            <div className="w-full bg-background rounded-full h-2.5">
              <div 
                className="bg-accent h-2.5 rounded-full" 
                style={{ width: `${getXpProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-foreground/60 mt-1">
              <span>Level {playerStats.level}</span>
              <span>{getXpForNextLevel() - playerStats.xp} XP to Level {playerStats.level + 1}</span>
            </div>
          </div>
          
          {/* Game Stats */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm">
              <Trophy className="h-5 w-5 text-accent" />
              <span className="font-medium">Turns: {turns}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">Time: {formatTime(timer)}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Mana: {mana}/{maxMana}</span>
            </div>
            
            {activeEvent && (
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm">
                {activeEvent.icon}
                <span className="font-medium">{activeEvent.name}: {activeEvent.turnsLeft} {activeEvent.turnsLeft === 1 ? 'turn' : 'turns'}</span>
              </div>
            )}
            
            <button
              onClick={() => setShowDeckBuilder(true)}
              className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg shadow-sm hover:bg-secondary/80 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Deck Builder</span>
            </button>
            
            <button
              onClick={initializeCards}
              className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg shadow-sm hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
              <span className="font-medium">Reset</span>
            </button>
          </div>
          
          {/* High Score */}
          {highScores[level] && (
            <div className="bg-accent/10 px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-6">
              <Trophy className="h-5 w-5 text-accent" />
              <span className="font-medium">
                Best: {highScores[level].turns} turns in {formatTime(highScores[level].time)}
              </span>
            </div>
          )}
        </div>
        
        {/* Game Board */}
        <div className={`game-board ${levelConfig[level - 1].grid} mb-8`}>
          {cards.map(card => (
            <motion.div
              key={card.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: card.id * 0.05 }}
              className={`card ${card.flipped ? 'flipped' : ''} aspect-[3/4] cursor-pointer ${
                !card.flipped && !card.matched && mana <= 0 && !firstChoice ? 'opacity-70' : ''
              }`}
              onClick={() => handleChoice(card)}
            >
              <div className="card-inner">
                <div className="card-back bg-primary/10 flex items-center justify-center rounded-lg border-2 border-primary/30 shadow-md">
                  <span className="text-4xl font-bold text-primary/40">?</span>
                </div>
                <div className="card-front rounded-lg shadow-md overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${
                    getElementColor(card.element)
                  } p-3 flex flex-col`}>
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{card.type}</span>
                    </div>
                    
                    {card.ability && card.ability !== "none" && (
                      <div className="mt-2 bg-white/10 p-1 rounded flex items-center justify-center">
                        {getAbilityDetails(card.ability)?.icon}
                      </div>
                    )}
                    
                    {card.protected && (
                      <div className="absolute top-1 right-1 bg-yellow-500/80 rounded-full p-0.5">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Selected Abilities */}
        <div className="mb-8 bg-card p-4 rounded-lg shadow-md border border-border max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-accent" />
            Your Deck
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {selectedDeck.map((abilityName) => {
              const ability = getAbilityDetails(abilityName);
              return (
                <div 
                  key={abilityName}
                  className="bg-secondary/50 p-2 rounded-lg flex items-center relative group"
                  onMouseEnter={() => setShowAbilityInfo(abilityName)}
                  onMouseLeave={() => setShowAbilityInfo(null)}
                >
                  <div className="bg-accent/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    {ability?.icon}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{abilityName.replace('_', ' ')}</p>
                    {ability && ability.manaCost > 0 && (
                      <p className="text-xs text-foreground/70">Cost: {ability.manaCost} mana</p>
                    )}
                  </div>
                  
                  {/* Ability tooltip */}
                  {showAbilityInfo === abilityName && ability && (
                    <div className="absolute bottom-full left-0 mb-2 p-2 bg-card rounded-lg shadow-lg border border-border z-10 w-48">
                      <p className="text-sm">{ability.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Game Won Modal */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-xl p-8 shadow-lg max-w-md w-full border border-border"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="h-10 w-10 text-accent" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Level {level} Completed!</h2>
                  
                  <div className="mb-6 space-y-2">
                    <p className="text-foreground/70">
                      You completed the level in <span className="font-bold text-foreground">{turns} turns</span> and <span className="font-bold text-foreground">{formatTime(timer)}</span>.
                    </p>
                    
                    {highScores[level] && turns === highScores[level].turns && timer === highScores[level].time && (
                      <p className="text-accent font-medium flex items-center justify-center gap-1">
                        <Sparkles className="h-4 w-4" />
                        New High Score!
                        <Sparkles className="h-4 w-4" />
                      </p>
                    )}
                    
                    {!playerStats.completedLevels.includes(level) && (
                      <div className="bg-accent/10 p-3 rounded-lg mt-4">
                        <p className="text-accent font-medium flex items-center justify-center gap-1 mb-2">
                          <Star className="h-4 w-4" />
                          {levelConfig[level - 1].xpReward} XP Earned!
                        </p>
                        
                        {playerStats.level < Math.floor((playerStats.xp + levelConfig[level - 1].xpReward) / 100) + 1 && (
                          <p className="text-foreground font-medium">
                            Level Up! New abilities unlocked!
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={initializeCards}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium flex items-center justify-center"
                    >
                      <RotateCcw className="mr-2 h-5 w-5" />
                      Play Again
                    </button>
                    
                    {level < 4 ? (
                      <button
                        onClick={() => {
                          setLevel(prev => prev + 1);
                          setGameWon(false);
                        }}
                        className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium flex items-center justify-center"
                      >
                        Next Level
                        <ChevronRight className="ml-1 h-5 w-5" />
                      </button>
                    ) : (
                      <Link href="/">
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium flex items-center justify-center">
                          Back to Home
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Deck Builder Modal */}
        <AnimatePresence>
          {showDeckBuilder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-xl p-6 shadow-lg max-w-2xl w-full border border-border"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-foreground">Deck Builder</h2>
                  <button 
                    onClick={() => setShowDeckBuilder(false)}
                    className="p-1 rounded-full bg-secondary/50 hover:bg-secondary"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <p className="text-foreground/70 mb-4">
                  Select up to 5 abilities to include in your deck. These abilities will be randomly assigned to cards in the game.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Selected Abilities ({selectedDeck.length}/5)</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedDeck.map((abilityName) => {
                      const ability = getAbilityDetails(abilityName);
                      return (
                        <div 
                          key={abilityName}
                          className="bg-accent/10 px-3 py-2 rounded-lg flex items-center"
                        >
                          <div className="bg-accent/20 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                            {ability?.icon}
                          </div>
                          <span className="font-medium capitalize mr-2">{abilityName.replace('_', ' ')}</span>
                          <button 
                            onClick={() => toggleAbilitySelection(abilityName)}
                            className="p-1 rounded-full bg-accent/20 hover:bg-accent/30"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Available Abilities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-2">
                    {availableAbilities.map((abilityName) => {
                      const ability = getAbilityDetails(abilityName);
                      const isSelected = selectedDeck.includes(abilityName);
                      
                      return (
                        <div 
                          key={abilityName}
                          onClick={() => toggleAbilitySelection(abilityName)}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-accent/10 border-accent' 
                              : 'bg-secondary/30 border-border hover:bg-secondary/50'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="bg-secondary w-8 h-8 rounded-full flex items-center justify-center mr-3">
                              {ability?.icon}
                            </div>
                            <div>
                              <p className="font-medium capitalize">{abilityName.replace('_', ' ')}</p>
                              <p className="text-xs text-foreground/70">{ability?.description}</p>
                              {ability && ability.manaCost > 0 && (
                                <p className="text-xs text-blue-500">Cost: {ability.manaCost} mana</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeckBuilder(false)}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowDeckBuilder(false);
                      initializeCards();
                    }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                  >
                    Save & Restart
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Event Notification */}
        <AnimatePresence>
          {showEventNotification && activeEvent && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-card p-4 rounded-lg shadow-lg border border-accent z-40 flex items-center gap-3"
            >
              <div className="bg-accent/10 w-10 h-10 rounded-full flex items-center justify-center">
                {activeEvent.icon}
              </div>
              <div>
                <h4 className="font-bold text-foreground">{activeEvent.name} Activated!</h4>
                <p className="text-sm text-foreground/70">{activeEvent.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Ability Legend */}
        <div className="mt-8 bg-card p-4 rounded-lg shadow-md border border-border max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-accent" />
            Card Abilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cardAbilities.filter(ability => playerStats.unlockedAbilities.includes(ability.name)).map((ability) => (
              <div key={ability.name} className="bg-secondary/50 p-3 rounded-lg flex items-center">
                <div className="bg-accent/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  {ability.icon}
                </div>
                <div>
                  <p className="font-medium capitalize">{ability.name.replace('_', ' ')}</p>
                  <p className="text-xs text-foreground/70">{ability.description}</p>
                  {ability.manaCost > 0 && (
                    <p className="text-xs text-blue-500">Cost: {ability.manaCost} mana</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {cardAbilities.some(ability => !playerStats.unlockedAbilities.includes(ability.name)) && (
            <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
              <p className="flex items-center text-foreground/70">
                <Lock className="h-4 w-4 mr-2" />
                Reach higher player levels to unlock more abilities!
              </p>
            </div>
          )}
        </div>
        
        {/* Special Events Info */}
        <div className="mt-6 bg-card p-4 rounded-lg shadow-md border border-border max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-destructive" />
            Special Events
          </h3>
          <p className="text-foreground/70 mb-3">
            Random events may occur during gameplay, adding an element of unpredictability and challenge.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specialEvents.map((event) => (
              <div key={event.name} className="bg-secondary/50 p-3 rounded-lg flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  {event.icon}
                </div>
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-xs text-foreground/70">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}