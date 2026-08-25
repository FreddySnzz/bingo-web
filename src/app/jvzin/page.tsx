'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Repeat } from "lucide-react";

const bingoPhrases = [
  "Negao vai se lasca",
  "Negao vai pro inferno",
  "Vou ja come um amori",
  "Oia esse cara",
  "La ele",
  "Ah nao, vamo joga no inferno",
  "Sai dai",
  ".",
  "Nau",
  "E um churras? @André",
  "Vou já assistir um sobrenatural", 
  "Pegue na minha caceta", 
  "Conta aqui pro tio joao vicente", 
  "É um gtazin @Fredson Luiz @Lyncxxx", 
  "Ne meu fi não", 
  "Que isso rpz", 
  "Rpz, vao se lascar vcs tudin", 
  "Vai tu, quenga", 
  "O Lyncu não oferece um copo d'água", 
  "To fazendo exportação", 
  "Que porra", 
  "Vou ja tempera a carne", 
  "Tenho pai não", 
  "Vai da esse teu tabaco",
]

const WINNING_COMBINATIONS: number[][] = [
  // Horizontais
  [0, 1, 2, 3, 4], 
  [5, 6, 7, 8, 9], 
  [10, 11, 12, 13, 14], 
  [15, 16, 17, 18, 19], 
  [20, 21, 22, 23, 24],
  // Verticais
  [0, 5, 10, 15, 20], 
  [1, 6, 11, 16, 21], 
  [2, 7, 12, 17, 22], 
  [3, 8, 13, 18, 23], 
  [4, 9, 14, 19, 24],
  // Diagonais
  [0, 6, 12, 18, 24], 
  [4, 8, 12, 16, 20],
  // Quinas
  [0, 4, 20, 24],
  // Quadrantes
  [0, 1, 5, 6], 
  [1, 2, 6, 7], 
  [2, 3, 7, 8], 
  [3, 4, 8, 9],
  [5, 6, 10, 11], 
  [8, 9, 13, 14],
  [10, 11, 15, 16], 
  [13, 14, 18, 19],
  [15, 16, 20, 21], 
  [16, 17, 21, 22], 
  [17, 18, 22, 23], 
  [18, 19, 23, 24],
  // Cartela cheia
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] 
]

const getDegree = () => {
  const degrees = [-135, -120, -105, -90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90];
  return degrees[Math.floor(Math.random() * degrees.length)];
}

export default function JvzinBingoPage() {
  const [shuffledTiles, setShuffledTiles] = useState<string[]>([]);
  const [markedTiles, setMarkedTiles] = useState<string[]>([]);
  const [shufflePhoto, setShufflePhoto] = useState<number>(1);
  const [tileRotations, setTileRotations] = useState<Record<string, number>>({});
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [showVictoryScreen, setShowVictoryScreen] = useState<boolean>(false);
  const [isFullCard, setIsFullCard] = useState<boolean>(false);
  const [isContinuing, setIsContinuing] = useState<boolean>(false);

  const handleMarkTile = (tile: string) => {
    let newMarkedTiles: string[];
    let isAdding = false;

    if (!markedTiles.includes(tile)) {
      newMarkedTiles = [...markedTiles, tile];
      isAdding = true;
    } else {
      newMarkedTiles = markedTiles.filter(t => t !== tile);
    }

    const currentHasWon = checkWin(newMarkedTiles);
    const currentIsFullCard = newMarkedTiles.length === shuffledTiles.length;
    
    let currentIsContinuing = isContinuing;

    if (!currentHasWon) {
      currentIsContinuing = false;
      setIsContinuing(false);
    }

    setMarkedTiles(newMarkedTiles);
    setHasWon(currentHasWon);
    setIsFullCard(currentIsFullCard);
    
    setShowVictoryScreen((currentHasWon && !currentIsContinuing) || currentIsFullCard);

    if (isAdding) {
      setTileRotations(prev => ({
        ...prev,
        [tile]: getDegree()
      }));
    }
  }

  const checkWin = (currentMarked: string[]) => {
    if (shuffledTiles.length === 0) return false;

    const isIndexMarked = (index: number) => {
      if (index === 12) return true; 
      const tileText = index > 12 ? shuffledTiles[index - 1] : shuffledTiles[index];
      return currentMarked.includes(tileText);
    }

    return WINNING_COMBINATIONS.some(combo => combo.every(isIndexMarked));
  }

  useEffect(() => {
    function shuffleArray(array: string[]) {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    }

    const shuffled = shuffleArray(bingoPhrases);
    setShufflePhoto(Math.floor(Math.random() * 6) + 1);
    setShuffledTiles(shuffled);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-2 sm:p-4">
      <div className="relative w-full max-w-[800px] aspect-square">
        <Image
          src={"/bingo-jvzin-without-p.png"}
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
                      src={`/jvzin${shufflePhoto}.png`}
                      alt="Jvzin Bingo"
                      fill
                      className="object-fill hover:scale-505 transition-all ease-in-out duration-300"
                      priority
                    />
                  </div>
                </div>
              )
            }

            const tileIndex = index > 12 ? index - 1 : index;
            const tile = shuffledTiles[tileIndex];

            if (!tile) return <div key={`empty-${index}`} />;

            const isMarked = markedTiles.includes(tile);

            return (
              <div
                key={tile}
                onClick={() => handleMarkTile(tile)}
                className={"relative cursor-pointer transition-all ease-in-out duration-300 flex items-center justify-center"}
              >
                {isMarked && (
                  <div className="absolute inset-0 z-30 transition-all ease-in-out duration-300">
                    <Image
                      src={"/milho.png"}
                      alt="Milho"
                      fill
                      className="object-fill hover:opacity-20 transition-all ease-in-out duration-300"
                      style={{ transform: `rotate(${tileRotations[tile] || 0}deg)` }}
                      priority
                    />
                  </div>
                )}
                
                <p className={`relative z-10 w-full px-1 text-[8px] sm:text-xs md:text-sm font-bold 
                  items-center justify-center text-center line-clamp-3 hover:scale-115 transition-all`
                }>
                  {tile}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {showVictoryScreen && hasWon && (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-purple-200/90 z-50 px-4">
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-center text-3xl md:text-5xl font-black">BINGOOOO!!!</h1>
            <p className="text-center font-medium mt-2 text-sm md:text-base">
              {isFullCard ? "Você marcou a cartela inteira!" : "Parabéns pela conquista!"} Resgate seu prêmio abaixo.
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
                setMarkedTiles([]);
                setHasWon(false);
                setIsFullCard(false);
                setIsContinuing(false);
                setShowVictoryScreen(false);
              }}
              className={`flex gap-2 items-center justify-center px-6 py-3 rounded-xl cursor-pointer 
                bg-zinc-700 hover:bg-zinc-800 font-bold text-zinc-50 shadow-lg transition-all
              `}
            >
              <Repeat className="w-5 h-5" /> Repetir
            </button>

            <button
              type="button"
              onClick={() => {
                setIsContinuing(true);
                setShowVictoryScreen(false); 
              }}
              className={`flex gap-2 items-center justify-center px-6 py-3 rounded-xl cursor-pointer 
                bg-purple-900 hover:bg-purple-950 font-bold text-zinc-50 shadow-lg transition-all
              `}
            >
              <Play className="w-5 h-5" /> Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}