"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { 
  HelpCircle, 
  Sparkles, 
  Shield, 
  Eye, 
  Zap, 
  ChevronRight,
  Gamepad,
  Brain,
  Trophy,
  Droplets,
  Shuffle,
  Bolt,
  Star,
  Settings,
  AlertCircle
} from "lucide-react";

export default function Instructions() {
  const [basicRef, basicInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [manaRef, manaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [abilitiesRef, abilitiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [eventsRef, eventsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [progressionRef, progressionInView] = useInView({
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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How to Play</h1>
          <p className="text-lg text-foreground/70">
            Learn the rules and strategies to master Memory Masters: Strategic Card Puzzle
          </p>
        </motion.div>

        {/* Basic Rules */}
        <motion.section
          ref={basicRef}
          initial={{ opacity: 0 }}
          animate={basicInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Basic Rules</h2>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={basicInView ? "show" : "hidden"}
            className="space-y-4"
          >
            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Objective</h3>
              <p className="text-foreground/70">
                Match pairs of cards with the same symbol to clear the board. Use card abilities strategically and manage your mana to complete all levels.
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Gameplay</h3>
              <p className="text-foreground/70">
                Each turn, you have a limited amount of mana to spend on flipping cards and activating abilities. Click on a card to flip it over (costs 1 mana). Then click on another card to try to find its match. If the cards match, they stay face up and their abilities activate. If not, they flip back over.
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Scoring</h3>
              <p className="text-foreground/70">
                Your score is based on the number of turns taken and time elapsed. Fewer turns and less time result in a better score. Completing levels also earns you XP, which helps you level up and unlock new abilities.
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Winning</h3>
              <p className="text-foreground/70">
                Match all pairs on the board to complete a level. Complete all four levels to win the game and unlock all abilities.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Mana System */}
        <motion.section
          ref={manaRef}
          initial={{ opacity: 0 }}
          animate={manaInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <div className="flex items-center mb-4">
            <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <Droplets className="h-5 w-5 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Mana System</h2>
          </div>

          <p className="mb-6 text-foreground/70">
            The mana system adds a strategic layer to the game, forcing you to make careful decisions about which cards to flip and which abilities to activate.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            animate={manaInView ? "show" : "hidden"}
            className="space-y-4"
          >
            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Mana Per Turn</h3>
              <p className="text-foreground/70">
                Each level provides a specific amount of mana per turn:
              </p>
              <ul className="list-disc pl-5 text-foreground/70 mt-2">
                <li>Level 1: 2 mana per turn</li>
                <li>Level 2: 3 mana per turn</li>
                <li>Level 3: 3 mana per turn</li>
                <li>Level 4: 4 mana per turn</li>
              </ul>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Mana Costs</h3>
              <p className="text-foreground/70">
                Different actions cost different amounts of mana:
              </p>
              <ul className="list-disc pl-5 text-foreground/70 mt-2">
                <li>Flipping a card: 1 mana</li>
                <li>Basic abilities (Reveal, Shield, Double): 0 mana (activate automatically when matched)</li>
                <li>Advanced abilities: 1-3 mana (must be activated manually)</li>
              </ul>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Mana Strategy</h3>
              <p className="text-foreground/70">
                Use your mana wisely. Sometimes it's better to save mana for powerful abilities rather than flipping more cards. Look for cards with the "Mana Boost" ability to gain extra mana during your turn.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Card Abilities */}
        <motion.section
          ref={abilitiesRef}
          initial={{ opacity: 0 }}
          animate={abilitiesInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <div className="flex items-center mb-4">
            <div className="bg-accent/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Card Abilities</h2>
          </div>

          <p className="mb-6 text-foreground/70">
            Cards have special abilities that activate when matched. These abilities can help you complete levels more efficiently.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            animate={abilitiesInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.div variants={item} className="bg-background p-4 rounded-lg border border-accent/20">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">Shield</h3>
              </div>
              <p className="text-foreground/70">
                Protects matched cards from being flipped back over. Cards with this protection will stay face up even if they don't match with your next selection.
              </p>
              <p className="text-xs text-blue-500 mt-1">Cost: 0 mana (automatic)</p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg border border-accent/20">
              <div className="flex items-center mb-2">
                <Eye className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">Reveal</h3>
              </div>
              <p className="text-foreground/70">
                Temporarily reveals a random card on the board, giving you a peek at its symbol before it flips back over.
              </p>
              <p className="text-xs text-blue-500 mt-1">Cost: 0 mana (automatic)</p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg border border-accent/20">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">Double</h3>
              </div>
              <p className="text-foreground/70">
                When matched, this card counts as two matches. If there are more cards of the same type on the board, they will also be matched automatically.
              </p>
              <p className="text-xs text-blue-500 mt-1">Cost: 0 mana (automatic)</p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg border border-accent/20">
              <div className="flex items-center mb-2">
                <Shuffle className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">Shuffle</h3>
              </div>
              <p className="text-foreground/70">
                Shuffles all unmatched cards on the board, giving you a fresh start if you're stuck.
              </p>
              <p className="text-xs text-blue-500 mt-1">Cost: 1 mana</p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg border border-accent/20">
              <div className="flex items-center mb-2">
                <Bolt className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">Mana Boost</h3>
              </div>
              <p className="text-foreground/70">
                Gain +2 mana this turn, allowing you to flip more cards or activate more abilities.
              </p>
              <p className="text-xs text-blue-500 mt-1">Cost: 0 mana (automatic)</p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg border border-accent/20">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">Protect All</h3>
              </div>
              <p className="text-foreground/70">
                Protects all currently flipped cards from being flipped back over, even if they don't match.
              </p>
              <p className="text-xs text-blue-500 mt-1">Cost: 2 mana</p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg border border-accent/20">
              <div className="flex items-center mb-2">
                <Eye className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">Reveal Type</h3>
              </div>
              <p className="text-foreground/70">
                Reveals all cards of the same type as the selected card temporarily, making it easier to find matches.
              </p>
              <p className="text-xs text-blue-500 mt-1">Cost: 2 mana</p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg border border-accent/20">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-semibold text-foreground">Extra Turn</h3>
              </div>
              <p className="text-foreground/70">
                Grants an extra turn, allowing you to continue playing without resetting your mana or incrementing the turn counter.
              </p>
              <p className="text-xs text-blue-500 mt-1">Cost: 3 mana</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Special Events */}
        <motion.section
          ref={eventsRef}
          initial={{ opacity: 0 }}
          animate={eventsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <div className="flex items-center mb-4">
            <div className="bg-destructive/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Special Events</h2>
          </div>

          <p className="mb-6 text-foreground/70">
            Random events can occur during gameplay, adding an element of unpredictability and requiring you to adapt your strategy.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            animate={eventsInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Bolt className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="font-semibold text-foreground">Double Mana</h3>
              </div>
              <p className="text-foreground/70">
                Doubles your mana for 3 turns, allowing you to flip more cards and activate more abilities.
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-semibold text-foreground">Card Lockdown</h3>
              </div>
              <p className="text-foreground/70">
                Disables all card abilities for 2 turns, forcing you to rely solely on your memory.
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Eye className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-semibold text-foreground">Memory Boost</h3>
              </div>
              <p className="text-foreground/70">
                Reveals all cards on the board for 3 seconds, giving you a brief glimpse of their locations.
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Droplets className="h-5 w-5 text-purple-500 mr-2" />
                <h3 className="font-semibold text-foreground">Mana Drain</h3>
              </div>
              <p className="text-foreground/70">
                Reduces your mana by half for 2 turns, making it more challenging to flip cards and activate abilities.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Progression System */}
        <motion.section
          ref={progressionRef}
          initial={{ opacity: 0 }}
          animate={progressionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <div className="flex items-center mb-4">
            <div className="bg-yellow-500/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Progression System</h2>
          </div>

          <p className="mb-6 text-foreground/70">
            As you complete levels, you'll earn XP and unlock new abilities, allowing you to customize your gameplay experience.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            animate={progressionInView ? "show" : "hidden"}
            className="space-y-4"
          >
            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Experience Points (XP)</h3>
              <p className="text-foreground/70">
                Earn XP by completing levels. The amount of XP earned depends on the level difficulty:
              </p>
              <ul className="list-disc pl-5 text-foreground/70 mt-2">
                <li>Level 1: 100 XP</li>
                <li>Level 2: 200 XP</li>
                <li>Level 3: 300 XP</li>
                <li>Level 4: 400 XP</li>
              </ul>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Player Levels</h3>
              <p className="text-foreground/70">
                As you earn XP, your player level increases. Each level requires 100 XP more than the previous level.
              </p>
              <ul className="list-disc pl-5 text-foreground/70 mt-2">
                <li>Player Level 1: 0-99 XP</li>
                <li>Player Level 2: 100-199 XP</li>
                <li>Player Level 3: 200-299 XP</li>
                <li>Player Level 4: 300-399 XP</li>
                <li>And so on...</li>
              </ul>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Ability Unlocks</h3>
              <p className="text-foreground/70">
                New abilities are unlocked as your player level increases:
              </p>
              <ul className="list-disc pl-5 text-foreground/70 mt-2">
                <li>Player Level 1: Reveal, Shield, Double</li>
                <li>Player Level 2: Shuffle, Mana Boost</li>
                <li>Player Level 3: Protect All, Reveal Type</li>
                <li>Player Level 4: Extra Turn</li>
              </ul>
            </motion.div>

            <motion.div variants={item} className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">Deck Building</h3>
              <p className="text-foreground/70">
                Use the Deck Builder to customize your gameplay experience. Select up to 5 abilities from your unlocked abilities to include in your deck. These abilities will be randomly assigned to cards in the game.
              </p>
              <p className="text-foreground/70 mt-2">
                Experiment with different combinations of abilities to find the strategy that works best for you.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Tips & Strategies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Tips & Strategies</h2>
          </div>

          <ul className="space-y-2 text-foreground/70 list-disc pl-5">
            <li>Prioritize finding cards with abilities that can help you find more matches, like Reveal or Mana Boost.</li>
            <li>Save your mana for powerful abilities when you're stuck or need a strategic advantage.</li>
            <li>Use the Shield ability to protect important cards that you want to keep face up.</li>
            <li>The Shuffle ability can be useful when you've forgotten the positions of several cards.</li>
            <li>Build your deck based on your playstyle - if you have a good memory, focus on abilities that give you more turns or mana.</li>
            <li>During special events, adapt your strategy accordingly - take advantage of Double Mana to flip more cards, or be more conservative during Mana Drain.</li>
            <li>Remember that completing levels earns you XP, which unlocks more powerful abilities.</li>
            <li>Try different combinations of abilities in your deck to find what works best for each level.</li>
          </ul>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
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
    </div>
  );
}