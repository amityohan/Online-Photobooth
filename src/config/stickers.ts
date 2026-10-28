export interface StickerPreset {
  emoji: string;
  label: string;
  category: 'sparkles' | 'hearts' | 'retro' | 'fun';
}

export const STICKER_PRESETS: StickerPreset[] = [
  // Sparkles & Stars
  { emoji: '✨', label: 'Sparkle', category: 'sparkles' },
  { emoji: '⭐', label: 'Star', category: 'sparkles' },
  { emoji: '🌟', label: 'Glow Star', category: 'sparkles' },
  { emoji: '💫', label: 'Dizzy Star', category: 'sparkles' },
  { emoji: '🪩', label: 'Disco Ball', category: 'sparkles' },

  // Hearts & Cute
  { emoji: '💖', label: 'Sparkle Heart', category: 'hearts' },
  { emoji: '🤍', label: 'White Heart', category: 'hearts' },
  { emoji: '🎀', label: 'Ribbon Bow', category: 'hearts' },
  { emoji: '🍒', label: 'Cherries', category: 'hearts' },
  { emoji: '🍓', label: 'Strawberry', category: 'hearts' },
  { emoji: '🌸', label: 'Cherry Blossom', category: 'hearts' },

  // Retro & Booth
  { emoji: '🎞️', label: 'Film Strip', category: 'retro' },
  { emoji: '📸', label: 'Camera', category: 'retro' },
  { emoji: '🏷️', label: 'Label Tag', category: 'retro' },
  { emoji: '🎟️', label: 'Ticket', category: 'retro' },
  { emoji: '💿', label: 'Mini CD', category: 'retro' },
  { emoji: '📼', label: 'Cassette', category: 'retro' },

  // Fun & Celebration
  { emoji: '🎂', label: 'Cake', category: 'fun' },
  { emoji: '🎉', label: 'Popper', category: 'fun' },
  { emoji: '✌️', label: 'Peace Sign', category: 'fun' },
  { emoji: '😊', label: 'Smiley', category: 'fun' },
  { emoji: '🕶️', label: 'Sunglasses', category: 'fun' },
  { emoji: '☕', label: 'Coffee', category: 'fun' },
];

