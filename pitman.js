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
