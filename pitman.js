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
