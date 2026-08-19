// Pitman Shorthand Engine
// Foundation for the English → Pitman conversion system.

const PitmanEngine = {

  version: "0.1",

  normalize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s']/g, "")
      .replace(/\s+/g, " ")
      .trim();
  },

  splitWords(text) {
    return this.normalize(text).split(" ").filter(Boolean);
  },

  convert(text) {
    const words = this.splitWords(text);

    return {
      original: text,
      words: words,
      status: "engine-foundation-ready"
    };
  }

};
vowels: {
  long: [
    { sound: "ah", type: "dot", weight: "heavy", position: 1 },
    { sound: "a", type: "dot", weight: "heavy", position: 2 },
    { sound: "e", type: "dot", weight: "heavy", position: 3 },
    { sound: "aw", type: "dash", weight: "heavy", position: 1 },
    { sound: "o", type: "dash", weight: "heavy", position: 2 },
    { sound: "oo", type: "dash", weight: "heavy", position: 3 }
  ],

  short: [
    { sound: "a", type: "dot", weight: "light", position: 1 },
    { sound: "e", type: "dot", weight: "light", position: 2 },
    { sound: "i", type: "dot", weight: "light", position: 3 },
    { sound: "o", type: "dash", weight: "light", position: 1 },
    { sound: "u", type: "dash", weight: "light", position: 2 },
    { sound: "oo", type: "dash", weight: "light", position: 3 }
  ]
},
consonants: {
  p:  { sound: "p",  direction: "down45", weight: "light" },
  b:  { sound: "b",  direction: "down45", weight: "heavy" },

  t:  { sound: "t",  direction: "down90", weight: "light" },
  d:  { sound: "d",  direction: "down90", weight: "heavy" },

  ch: { sound: "ch", direction: "down30", weight: "light" },
  j:  { sound: "j",  direction: "down30", weight: "heavy" },

  k:  { sound: "k",  direction: "horizontal", weight: "light" },
  g:  { sound: "g",  direction: "horizontal", weight: "heavy" }
},
