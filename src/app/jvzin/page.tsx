'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { BrushCleaning, Dices, Play } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BingoState {
  shuffledTiles: string[];
  shufflePhoto: number;
  markedTiles: string[];
  tileRotations: Record<string, number>;
  createdAt: number | null;
  isContinuing: boolean;
  _hasHydrated: boolean;
  
  generateNewBoard: (phrases: string[]) => void;
  toggleTile: (tile: string, degree: number) => void;
  resetGame: () => void;
  setContinuing: (value: boolean) => void;
  setHasHydrated: (state: boolean) => void;
}

const bingoPhrases = [
  "Negao vai se lasca", "Negao vai pro inferno", "Vou ja come um amori", "Oia esse cara", "La ele",
  "Ah nao, vamo joga no inferno", "Sai dai", ".", "Nau", "E um churras? @André", "Vou já assistir um sobrenatural", 
  "Pegue na minha caceta", "Conta aqui pro tio joao vicente", "É um gtazin @Fredson Luiz @Lyncxxx", "Ne meu fi não", 
  "Que isso rpz", "Rpz, vao se lascar vcs tudin", "Vai tu, quenga", "O Lyncu não oferece um copo d'água", "To fazendo exportação", 
  "Que porra", "Vou ja tempera a carne", "Tenho pai não", "Vai da esse teu tabaco", "Um buiaco na paiede"
]

const WINNING_COMBINATIONS: number[][] = [
  // Horizontais
  [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
  // Verticais
  [0, 5, 10, 15, 20],  [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
  // Diagonais
  [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
  // Quinas
  [0, 4, 20, 24],
  // Quadrantes
  [0, 1, 5, 6], [1, 2, 6, 7], [2, 3, 7, 8], [3, 4, 8, 9], [5, 6, 10, 11], [8, 9, 13, 14], [10, 11, 15, 16], 
  [13, 14, 18, 19], [15, 16, 20, 21], [16, 17, 21, 22], [17, 18, 22, 23], [18, 19, 23, 24],
  // Cartela cheia
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] 
]

const getDegree = () => {
  const degrees = [-135, -120, -105, -90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90];
  return degrees[Math.floor(Math.random() * degrees.length)];
}

const checkWin = (currentMarked: string[], shuffledTiles: string[]) => {
  if (shuffledTiles.length === 0) return false;

  const isIndexMarked = (index: number) => {
    if (index === 12) return true;
    const tileText = index > 12 ? shuffledTiles[index - 1] : shuffledTiles[index];
    return currentMarked.includes(tileText);
  }

  return WINNING_COMBINATIONS.some(combo => combo.every(isIndexMarked));
}

const useBingoStore = create<BingoState>()(
  persist(
    (set, get) => ({
      shuffledTiles: [],
      shufflePhoto: 1,
      markedTiles: [],
      tileRotations: {},
      createdAt: null,
      isContinuing: false,
      _hasHydrated: false,

      generateNewBoard: (phrases: string[]) => {
        const shuffled = [...phrases];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        set({
          shuffledTiles: shuffled,
          shufflePhoto: Math.floor(Math.random() * 11) + 1,
          markedTiles: [],
          tileRotations: {},
          createdAt: Date.now(),
          isContinuing: false,
        });
      },

      toggleTile: (tile: string, degree: number) => {
        const { markedTiles, tileRotations } = get();
        const isMarked = markedTiles.includes(tile);

        if (isMarked) {
          set({ markedTiles: markedTiles.filter((t: string) => t !== tile) });
        } else {
          set({
            markedTiles: [...markedTiles, tile],
            tileRotations: { ...tileRotations, [tile]: degree }
          });
        }
      },

      resetGame: () => set({ markedTiles: [], tileRotations: {}, isContinuing: false }),
      setContinuing: (value: boolean) => set({ isContinuing: value }),
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    { 
      name: '@jvzin-bingo-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
)

export default function JvzinBingoPage() {
  const store = useBingoStore();

  useEffect(() => {
    if (store._hasHydrated) {
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
      
      if (!store.createdAt || (Date.now() - store.createdAt > TWENTY_FOUR_HOURS)) {
        store.generateNewBoard(bingoPhrases);
      }
    }
  }, [store._hasHydrated]);

  const hasWon = checkWin(store.markedTiles, store.shuffledTiles);
  const isFullCard = store.markedTiles.length === 24;
  const showVictoryScreen = (hasWon && !store.isContinuing) || isFullCard;

  useEffect(() => {
    if (!hasWon && store.isContinuing) {
      store.setContinuing(false);
    }
  }, [hasWon, store.isContinuing, store]);

  if (!store._hasHydrated || store.shuffledTiles.length === 0) {
    return <div className="min-h-dvh flex items-center justify-center bg-zinc-900" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-2 sm:p-4">
      <div className="relative w-full max-w-[800px] aspect-square">
        <Image
          src={"/bingo-jvzin.png"}
          alt="Jvzin Bingo"
          fill
          className="object-contain"
          priority
        />

        <div className="absolute top-[10%] bottom-[10.125%] left-[0.25%] right-[0.25%] grid grid-cols-5 grid-rows-5 gap-[2px]">
          {Array.from({ length: 25 }).map((_, index) => {
            if (index === 12) {
              return (
                <div
                  key="blessed-center"
                  title="B L E S S E D"
                  aria-label="B L E S S E D"
                  className="relative flex items-center justify-center z-40 w-full h-full"
                >
                  <div className="relative w-[100%] h-[100%]">
                    <Image
                      src={`/jvzin${store.shufflePhoto}.png`}
                      alt="Jvzin Bingo"
                      fill
                      className="object-fill hover:scale-500 transition-all ease-in-out duration-300"
                      priority
                    />
                  </div>
                </div>
              )
            }

            const tileIndex = index > 12 ? index - 1 : index;
            const tile = store.shuffledTiles[tileIndex];

            if (!tile) return <div key={`empty-${index}`} />;

            const isMarked = store.markedTiles.includes(tile);

            return (
              <div
                key={tile}
                onClick={() => store.toggleTile(tile, getDegree())}
                className={"relative cursor-pointer transition-all ease-in-out duration-300 flex items-center justify-center hover:scale-110"}
              >
                {isMarked && (
                  <div className="absolute inset-0 z-30 transition-all ease-in-out duration-300">
                    <Image
                      src={"/milho.png"}
                      alt="Milho"
                      fill
                      className="object-fill hover:opacity-20 transition-all ease-in-out duration-300"
                      style={{ transform: `rotate(${store.tileRotations[tile] || 0}deg)` }}
                      priority
                    />
                  </div>
                )}
                
                <p className={`relative z-10 w-full px-3 text-[8px] sm:text-xs md:text-sm 
                  font-bold items-center justify-center text-center line-clamp-3`
                }>
                  {tile}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-1">
        <button
          type="button"
          onClick={() => store.generateNewBoard(bingoPhrases)}
          className={`flex gap-2 items-center justify-center px-6 py-2 rounded-xl cursor-pointer 
            bg-zinc-200 hover:bg-zinc-300 text-zinc-700 hover:text-zinc-900 font-bold hover:shadow-lg transition-all
          `}
        >
          <Dices className="w-5 h-5" /> Gerar nova cartela
        </button>
      </div>

      {showVictoryScreen && (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-purple-200/95 z-50 px-4">
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-center text-3xl md:text-6xl font-black">
              BINGOOOO!!!
            </h1>
            <p className="text-center font-bold mt-2 text-sm md:text-base">
              {isFullCard ? "Você marcou a cartela inteira!" : "Parabéns pela conquista! Ele está pronto..."} Resgate seu prêmio abaixo.
            </p>
          </div>

          <div className="relative w-[250px] h-[250px] md:w-[400px] md:h-[400px] mb-8">
            <Image
              src={"/jvzin-final.png"}
              alt="BINGO"
              fill
              className="object-cover rounded-xl shadow-2xl"
              priority
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                isFullCard && store.toggleTile(store.markedTiles[store.markedTiles.length - 1], 0);
                store.setContinuing(true)
              }}
              className={`flex gap-2 items-center justify-center px-6 py-2 rounded-xl cursor-pointer 
                bg-purple-900 hover:bg-purple-950 font-bold text-zinc-50 shadow-lg transition-all
              `}
            >
              <Play className="w-5 h-5" /> Continuar
            </button>

            <button
              type="button"
              onClick={() => store.resetGame()}
              className={`flex gap-2 items-center justify-center px-6 py-2 rounded-xl cursor-pointer 
                bg-zinc-700 hover:bg-zinc-800 font-bold text-zinc-50 shadow-lg transition-all
              `}
            >
              <BrushCleaning className="w-5 h-5" /> Limpar e manter cartela
            </button>
          </div>
        </div>
      )}
    </div>
  )
}