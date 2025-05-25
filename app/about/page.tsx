"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { 
  User, 
  Code, 
  Gamepad2, 
  BookOpen, 
  ChevronRight,
  Gamepad,
  Heart
} from "lucide-react";

export default function About() {
  const [bioRef, bioInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [inspirationRef, inspirationInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [techRef, techInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">About the Game</h1>
          <p className="text-lg text-foreground/70">
            The story behind Memory Masters: Card Puzzle and its creator. This game is a blend of my passion for strategic card games, classic memory puzzles, and innovative game design.
            If I would need to tell my past self about this game, I would say:
            <span className="font-semibold"> "It's a journey of growth, creativity, and strategic thinking!"</span>
          </p>
        </motion.div>

        {/* Creator Bio */}
        <motion.section
          ref={bioRef}
          initial={{ opacity: 0 }}
          animate={bioInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <div className="flex items-center mb-6">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-background p-4 rounded-lg"
            >
              <p className="text-foreground/70">
                This project represents my journey in game development, starting with simple concepts and gradually adding complexity and innovative features.
                Just like the progressive levels in the game, my skills and creativity continue to evolve.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Inspiration */}
        <motion.section
          ref={inspirationRef}
          initial={{ opacity: 0 }}
          animate={inspirationInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <div className="flex items-center mb-6">
            <div className="bg-accent/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Game Inspiration</h2>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inspirationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2 text-foreground">Card Games</h3>
              <p className="text-foreground/70">
                The special abilities in Memory Masters are inspired by strategic card games like Yu-Gi-Oh and Magic: The Gathering, 
                where cards have unique effects that can change the course of the game. These games taught me the importance of 
                timing and strategy when using special abilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inspirationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-background p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2 text-foreground">Memory Games</h3>
              <p className="text-foreground/70">
                Classic memory matching games have always fascinated me with their simplicity yet challenging nature. 
                I wanted to take this familiar concept and add my own twist to create something both recognizable and innovative.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inspirationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-background p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2 text-foreground">Puzzle Design</h3>
              <p className="text-foreground/70">
                I'm drawn to puzzles that start simple but gradually introduce new mechanics. This progressive difficulty curve 
                keeps players engaged and provides a sense of accomplishment as they master each new challenge.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Technical Details */}
        <motion.section
          ref={techRef}
          initial={{ opacity: 0 }}
          animate={techInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <div className="flex items-center mb-6">
            <div className="bg-destructive/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <Code className="h-5 w-5 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Technical Details</h2>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={techInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2 text-foreground">Development</h3>
              <p className="text-foreground/70">
                Memory Masters was developed using Next.js and React, with animations powered by Framer Motion. 
                The game is designed to be responsive and work on all devices, from mobile phones to desktop computers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={techInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-background p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2 text-foreground">Game Mechanics</h3>
              <p className="text-foreground/70">
                The core game logic handles card matching, turn counting, and special ability activation. 
                Each level has a different configuration of cards and grid layout, with higher levels introducing special ability cards.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Personal Touch */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12 bg-card p-6 rounded-xl shadow-md border border-border"
        >
          <div className="flex items-center mb-6">
            <div className="bg-accent/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <Gamepad2 className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Personal Touch</h2>
          </div>

          <p className="text-foreground/70 mb-4">
            This game is more than just a memory puzzle - it's a reflection of my personality and interests. 
            The strategic elements mirror my analytical thinking, while the progressive difficulty represents my belief in 
            continuous learning and growth.
          </p>

          <p className="text-foreground/70 mb-4">
            The special abilities in the game reflect different aspects of my problem-solving approach:
          </p>

          <ul className="space-y-2 text-foreground/70 list-disc pl-5 mb-4">
            <li><span className="font-medium">Shield</span> represents resilience and the ability to recover from mistakes</li>
            <li><span className="font-medium">Reveal</span> symbolizes curiosity and the desire to uncover hidden information</li>
            <li><span className="font-medium">Double</span> reflects efficiency and finding connections between related concepts</li>
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
              Play the Game
              <ChevronRight className="ml-1 h-6 w-6" />
            </motion.button>
          </Link>

        </motion.div>
      </div>
    </div>
  );
}