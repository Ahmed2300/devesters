import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface LevelProgress {
  level: number;
  xp: number;
  minXp: number;
  maxXp: number;
  progressPercent: number;
  nextLevelXp: number;
}

/**
 * Calculates level and progress percentage based on developer XP.
 * 
 * Progression:
 * - Level 1: 0 - 199 XP
 * - Level 2: 200 - 499 XP (Range: 300 XP)
 * - Level 3: 500 - 999 XP (Range: 500 XP)
 * - Level 4: 1000 - 1999 XP (Range: 1000 XP)
 * - Level 5: 2000+ XP (Max level reached!)
 */
export function getLevelProgress(xp: number): LevelProgress {
  if (xp >= 2000) {
    return { level: 5, xp, minXp: 2000, maxXp: 2000, progressPercent: 100, nextLevelXp: 0 };
  } else if (xp >= 1000) {
    return { level: 4, xp, minXp: 1000, maxXp: 1999, progressPercent: ((xp - 1000) / 1000) * 100, nextLevelXp: 2000 };
  } else if (xp >= 500) {
    return { level: 3, xp, minXp: 500, maxXp: 999, progressPercent: ((xp - 500) / 500) * 100, nextLevelXp: 1000 };
  } else if (xp >= 200) {
    return { level: 2, xp, minXp: 200, maxXp: 499, progressPercent: ((xp - 200) / 300) * 100, nextLevelXp: 500 };
  } else {
    return { level: 1, xp, minXp: 0, maxXp: 199, progressPercent: (xp / 200) * 100, nextLevelXp: 200 };
  }
}
