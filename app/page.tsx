"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { 
  Brain, 
  Zap, 
  Trophy, 
  ChevronRight, 
  Sparkles,
  Gamepad,
  Droplets,
  Shield,
  Shuffle,
  Star,
  Settings
} from "lucide-react";

export default function Home() {
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mechanicsRef, mechanicsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [levelsRef, levelsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Memory Masters: <span className="text-accent">Strategic Card Puzzle</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-foreground/80">
                Test your memory and strategic thinking with our innovative card-matching puzzle game. 
                Inspired by games like Yu-Gi-Oh and Magic: The Gathering, this game combines memory 
                challenges with strategic card abilities and resource management.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/game">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium flex items-center"
                  >
                    <Gamepad className="mr-2 h-5 w-5" />
                    Play Now
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </motion.button>
                </Link>
                <Link href="/instructions">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium flex items-center"
                  >
                    Learn How to Play
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/20 rounded-full blur-3xl"></div>
                <div className="relative grid grid-cols-2 gap-4 p-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ rotateY: 180 }}
                      animate={{ rotateY: i % 2 === 0 ? 0 : 180 }}
                      transition={{ delay: i * 0.2, duration: 0.6 }}
                      className="aspect-[3/4] bg-card rounded-lg shadow-lg overflow-hidden"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className="absolute inset-0 backface-visibility-hidden bg-primary/10 flex items-center justify-center rounded-lg border-2 border-primary/30">
                        <span className="text-4xl font-bold text-primary/40">?</span>
                      </div>
                      <div 
                        className="absolute inset-0 backface-visibility-hidden rounded-lg"
                        style={{ transform: 'rotateY(180deg)' }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-accent to-primary rounded-lg p-2 flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-accent-foreground" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef} 
        className="py-16 px-4 bg-background"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Game Features</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our strategic memory puzzle game offers unique challenges inspired by card games
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate={featuresInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={item}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Strategic Gameplay</h3>
              <p className="text-foreground/70">
                Combine memory skills with strategic decision-making. Use card abilities and manage resources to win.
              </p>
            </motion.div>

            <motion.div 
              variants={item}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Card Abilities</h3>
              <p className="text-foreground/70">
                Discover and unlock powerful card abilities that can change the course of the game. Build your custom deck.
              </p>
            </motion.div>

            <motion.div 
              variants={item}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Progression System</h3>
              <p className="text-foreground/70">
                Earn XP, level up, and unlock new abilities as you complete levels. Customize your strategy as you progress.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Game Mechanics */}
      <section 
        ref={mechanicsRef}
        className="py-16 px-4 bg-accent/5"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mechanicsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Game Mechanics</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Innovative mechanics inspired by strategic card games
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate={mechanicsInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div 
              variants={item}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Droplets className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Mana System</h3>
              </div>
              <p className="text-foreground/70 mb-4">
                Each turn you receive a limited amount of mana to spend on flipping cards and activating abilities. 
                Strategic resource management is key to success.
              </p>
              <ul className="list-disc pl-5 text-foreground/70 space-y-1">
                <li>Mana refreshes each turn</li>
                <li>Higher level cards cost more mana</li>
                <li>Some abilities can grant extra mana</li>
              </ul>
            </motion.div>

            <motion.div 
              variants={item}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="flex items-center mb-4">
                <div className="bg-purple-500/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Zap className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Card Abilities</h3>
              </div>
              <p className="text-foreground/70 mb-4">
                Cards have unique abilities that activate when matched. These abilities can help you find matches, 
                protect cards, or manipulate the game board.
              </p>
              <ul className="list-disc pl-5 text-foreground/70 space-y-1">
                <li>Reveal other cards temporarily</li>
                <li>Protect cards from being flipped back</li>
                <li>Shuffle the board for a fresh start</li>
                <li>Match multiple cards at once</li>
              </ul>
            </motion.div>

            <motion.div 
              variants={item}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="flex items-center mb-4">
                <div className="bg-yellow-500/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Special Events</h3>
              </div>
              <p className="text-foreground/70 mb-4">
                Random events can occur during gameplay, adding an element of unpredictability. These events can 
                help or hinder your progress, requiring you to adapt your strategy.
              </p>
              <ul className="list-disc pl-5 text-foreground/70 space-y-1">
                <li>Double mana for a few turns</li>
                <li>Temporarily disable card abilities</li>
                <li>Reveal all cards briefly</li>
                <li>Reduce available mana</li>
              </ul>
            </motion.div>

            <motion.div 
              variants={item}
              className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-500/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Settings className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Deck Building</h3>
              </div>
              <p className="text-foreground/70 mb-4">
                Customize your gameplay experience by building a deck of card abilities before starting a level. 
                Choose abilities that complement your playstyle and strategy.
              </p>
              <ul className="list-disc pl-5 text-foreground/70 space-y-1">
                <li>Select up to 5 abilities for your deck</li>
                <li>Unlock new abilities as you level up</li>
                <li>Experiment with different combinations</li>
                <li>Adapt your deck to different levels</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Levels Preview */}
      <section 
        ref={levelsRef}
        className="py-16 px-4 bg-background"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={levelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Game Levels</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Progress through four challenging levels with increasing complexity
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate={levelsInView ? "show" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[1, 2, 3, 4].map((level) => (
              <motion.div
                key={level}
                variants={item}
                className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-border hover:border-accent/50"
              >
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-5xl font-bold text-foreground/40">Level {level}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Level {level}</h3>
                  <p className="text-foreground/70 mb-4">
                    {level === 1 && "Beginner challenge with basic abilities and mana system."}
                    {level === 2 && "Intermediate difficulty with more cards and new abilities."}
                    {level === 3 && "Advanced challenge with special events and complex abilities."}
                    {level === 4 && "Expert level with all mechanics and maximum strategic depth."}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground/60">
                      {level === 1 && "8 cards, 2 mana/turn"}
                      {level === 2 && "12 cards, 3 mana/turn"}
                      {level === 3 && "16 cards, 3 mana/turn"}
                      {level === 4 && "20 cards, 4 mana/turn"}
                    </span>
                    <div className="flex">
                      {Array(level).fill(0).map((_, i) => (
                        <Sparkles key={i} className="w-4 h-4 text-accent ml-1" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={levelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Link href="/game">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-medium text-lg flex items-center mx-auto"
              >
                <Gamepad className="mr-2 h-6 w-6" />
                Start Playing Now
                <ChevronRight className="ml-1 h-6 w-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Self Portrait Section */}
      <section className="py-16 px-4 bg-accent/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">A Strategic Self-Portrait</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              This game reflects my passion for strategic card games like Yu-Gi-Oh and Magic: The Gathering
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-6 rounded-xl shadow-md border border-border"
          >
            <p className="text-foreground/80 mb-4">
              As an avid fan of strategic card games, I've always been fascinated by the depth and complexity they offer. 
              This memory puzzle game is my creative self-portrait, combining my love for these games with the classic 
              memory matching mechanic.
            </p>
            
            <p className="text-foreground/80 mb-4">
              The mana system is inspired by resource management in Magic: The Gathering, where careful planning and 
              efficient use of resources is key to victory. The card abilities reflect the diverse effects found in 
              Yu-Gi-Oh, where each card can dramatically change the state of the game.
            </p>
            
            <p className="text-foreground/80 mb-4">
              The deck building aspect allows for personalization and strategic depth, mirroring how players in 
              collectible card games carefully construct their decks to match their playstyle. The progression system 
              represents my own journey in mastering these games, starting with basic concepts and gradually 
              incorporating more complex strategies.
            </p>
            
            <p className="text-foreground/80">
              I hope this game captures the essence of what makes strategic card games so engaging and provides a 
              unique twist on the classic memory puzzle format. Enjoy the challenge!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}