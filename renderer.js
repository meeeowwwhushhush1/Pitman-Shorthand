const PitmanRenderer = {

  createSVG(width, height) {

    const svg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", height);

    svg.style.display = "block";

    return svg;
  },


  drawGuideline(svg, y, width) {

    const line = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );

    line.setAttribute("x1", 20);
    line.setAttribute("y1", y);

    line.setAttribute("x2", width - 20);
    line.setAttribute("y2", y);

    line.setAttribute("stroke", "#9aa0a6");
    line.setAttribute("stroke-width", "1");

    svg.appendChild(line);
  },


  drawStroke(svg, x1, y1, x2, y2, weight) {

    const line = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);

    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);

    line.setAttribute(
      "stroke",
      "#111111"
    );

    line.setAttribute(
      "stroke-width",
      weight === "heavy" ? "4.5" : "2"
    );

    line.setAttribute(
      "stroke-linecap",
      "round"
    );

    svg.appendChild(line);

    return {
      startX: x1,
      startY: y1,
      endX: x2,
      endY: y2
    };
  },


  drawDot(svg, x, y) {

    const dot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", "2.5");

    dot.setAttribute(
      "fill",
      "#111111"
    );

    svg.appendChild(dot);
  },


  drawDash(svg, x, y) {

    this.drawStroke(
      svg,
      x - 7,
      y,
      x + 7,
      y,
      "light"
    );
  },


  getStrokeEnd(direction, x, y) {

    if (direction === "down45") {
      return {
        x: x + 28,
        y: y + 28
      };
    }

    if (direction === "down90") {
      return {
        x: x,
        y: y + 38
      };
    }

    if (direction === "horizontal") {
      return {
        x: x + 38,
        y: y
      };
    }

    return {
      x,
      y
    };
  },


  drawWord(svg, wordData, startX, baselineY) {

    let x = startX;
    let y = baselineY;

    let pendingVowels = [];
    let lastStroke = null;

    for (const item of wordData.outline) {

      if (item.kind === "vowel") {
        pendingVowels.push(item);
        continue;
      }


      if (item.kind === "consonant") {

        const end = this.getStrokeEnd(
          item.direction,
          x,
          y
        );

        const stroke = this.drawStroke(
          svg,
          x,
          y,
          end.x,
          end.y,
          item.weight
        );


        for (const vowel of pendingVowels) {

          if (vowel.type === "dot") {

            this.drawDot(
              svg,
              x - 4,
              y - 9
            );

          }

          if (vowel.type === "dash") {

            this.drawDash(
              svg,
              x - 4,
              y - 9
            );

          }

        }

        pendingVowels = [];

        lastStroke = stroke;

        x = end.x;
        y = end.y;
      }

    }


    /*
      Agar vowel word ke end mein hai
    */

    if (pendingVowels.length > 0 && lastStroke) {

      for (const vowel of pendingVowels) {

        const midX =
          (lastStroke.startX + lastStroke.endX) / 2;

        const midY =
          (lastStroke.startY + lastStroke.endY) / 2;

        if (vowel.type === "dot") {

          this.drawDot(
            svg,
            midX + 7,
            midY - 7
          );

        }

        if (vowel.type === "dash") {

          this.drawDash(
            svg,
            midX + 7,
            midY - 7
          );

        }

      }

    }


    return x + 35;
  },


  render(svg, words) {

    const width = 700;

    const wordsPerLine = 4;

    const numberOfLines = Math.max(
      1,
      Math.ceil(words.length / wordsPerLine)
    );

    const lineSpacing = 65;

    const requiredHeight =
      numberOfLines * lineSpacing + 60;

    svg.setAttribute(
      "viewBox",
      `0 0 ${width} ${requiredHeight}`
    );

    svg.setAttribute(
      "height",
      requiredHeight
    );


    /*
      Pehle copy wali ruled lines banao
    */

    for (let i = 0; i < numberOfLines; i++) {

      const baselineY =
        55 + i * lineSpacing;

      this.drawGuideline(
        svg,
        baselineY,
        width
      );

    }


    /*
      Ab har word ko uski line ke UPAR
      aur line ko touch karte hue draw karo
    */

    let x = 35;
    let lineIndex = 0;

    for (let i = 0; i < words.length; i++) {

      if (
        i > 0 &&
        i % wordsPerLine === 0
      ) {

        lineIndex++;

        x = 35;
      }

      const baselineY =
        55 + lineIndex * lineSpacing;

      x = this.drawWord(
        svg,
        words[i],
        x,
        baselineY
      );

    }

  }

};
