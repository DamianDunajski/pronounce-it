// @ts-ignore
import { default as randomWords } from "random-words";

const forbiddenWords = [
  "cancel",
  "help",
  "no",
  "off",
  "stop",
  "sure",
  "yes",
];

export class WordGenerator {
  public static pickWord(): string {
    let word: string;

    do {
      word = randomWords();
    } while (forbiddenWords.includes(word));

    return word;
  }
}
