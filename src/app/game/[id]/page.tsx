'use client';

import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  GradientBackground
} from "@/styles/homeScreen.styles"; 

import Link from "next/link";

export default function Game() {
  return (
    <GradientBackground>
      <ThemeToggle />
      <Link href={'/'}>HOME</Link>
      <h1>Game Page</h1>
      <p>This is where the game will be played.</p>
    </GradientBackground>
  );
}