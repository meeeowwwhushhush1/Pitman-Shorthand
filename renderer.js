const PitmanRenderer = {

  createSVG(width = 700, height = 120) {

    const svg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    svg.style.width = "100%";
    svg.style.height = "auto";
    svg.style.display = "block";

    return svg;
  },


  drawLine(svg, x1, y1, x2, y2, weight = "light") {

    const line = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);

    line.setAttribute(
      "stroke-width",
      weight === "heavy" ? "5" : "2"
    );

    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-linecap", "round");

    svg.appendChild(line);

    return line;
  },


  drawDot(svg, x, y) {

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "3");
    circle.setAttribute("fill", "black");

    svg.appendChild(circle);
  },


  drawDash(svg, x, y) {

    this.drawLine(
      svg,
      x - 8,
      y,
      x + 8,
      y,
      "light"
    );
  },


  drawConsonant(svg, direction, x, y, weight) {

    let endX = x;
    let endY = y;

    if (direction === "down45") {
      endX = x + 35;
      endY = y + 35;
    }

    if (direction === "down90") {
      endX = x;
      endY = y + 45;
    }

    if (direction === "horizontal") {
      endX = x + 45;
      endY = y;
    }

    this.drawLine(
      svg,
      x,
      y,
      endX,
      endY,
      weight
    );

    return {
      x: endX,
      y: endY
    };
  },


  drawWord(svg, outline, startX, baselineY) {

    let x = startX;
    let y = baselineY;

    let vowel = null;

    for (const item of outline) {

      if (item.kind === "vowel") {
        vowel = item;
        continue;
      }

      if (item.kind === "consonant") {

        const beforeX = x;
        const beforeY = y;

        const end = this.drawConsonant(
          svg,
          item.direction,
          x,
          y,
          item.weight
        );

        if (vowel) {

          const midX = (beforeX + end.x) / 2;
          const midY = (beforeY + end.y) / 2;

          if (vowel.type === "dot") {
            this.drawDot(
              svg,
              midX + 5,
              midY - 10
            );
          }

          if (vowel.type === "dash") {
            this.drawDash(
              svg,
              midX + 10,
              midY - 10
            );
          }

          vowel = null;
        }

        x = end.x;
        y = end.y;
      }
    }

    return {
      x,
      y
    };
  }

};
