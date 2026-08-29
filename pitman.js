const PitmanEngine = {

  normalize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  },

  splitWords(text) {
    return this.normalize(text)
      .split(" ")
      .filter(Boolean);
  },

  consonants: {
    p: { direction: "down45", weight: "light" },
    b: { direction: "down45", weight: "heavy" },
    t: { direction: "down90", weight: "light" },
    d: { direction: "down90", weight: "heavy" },
    k: { direction: "horizontal", weight: "light" },
    g: { direction: "horizontal", weight: "heavy" }
  },

  vowels: {
    a: { type: "dot", position: "middle", weight: "light" },
    e: { type: "dot", position: "middle", weight: "light" },
    i: { type: "dot", position: "middle", weight: "light" },
    o: { type: "dash", position: "middle", weight: "light" },
    u: { type: "dash", position: "middle", weight: "light" }
  },

  getOutline(word) {
    const outline = [];

    for (const char of word) {

      if (this.consonants[char]) {
        outline.push({
          kind: "consonant",
          char,
          ...this.consonants[char]
        });
      }

      if (this.vowels[char]) {
        outline.push({
          kind: "vowel",
          char,
          ...this.vowels[char]
        });
      }
    }

    return outline;
  },

  convert(text) {
    const words = this.splitWords(text);

    return words.map(word => ({
      word,
      outline: this.getOutline(word)
    }));
  }

};
