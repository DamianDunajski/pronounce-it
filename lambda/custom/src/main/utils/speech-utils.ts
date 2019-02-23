export const pronounce = (word: string): string => {
  return `<say-as interpret-as='spell-out'><prosody rate='x-slow'>${word}</prosody></say-as>`;
};
