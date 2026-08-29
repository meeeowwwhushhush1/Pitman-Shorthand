// Pitman Shorthand SVG Renderer

const PitmanRenderer = {

  createSVG(width = 700, height = 220) {
    const svg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    svg.style.maxWidth = "100%";
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
      weight === "heavy" ? "5" : "2.5"
    );

    line.setAttribute("stroke", "#111");
    line.setAttribute("stroke-linecap", "round");

    svg.appendChild(line);
    return line;
  },

  drawDot(svg, x, y, weight = "light") {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);

    circle.setAttribute(
      "r",
      weight === "heavy" ? "4" : "2.5"
    );

    circle.setAttribute("fill", "#111");

    svg.appendChild(circle);
    return circle;
  },

  drawDash(svg, x1, y1, x2, y2, weight = "light") {
    return this.drawLine(
      svg,
      x1,
      y1,
      x2,
      y2,
      weight
    );
  },

  drawStroke(svg, stroke, x, baselineY, size = 55, weight = "light") {

    const paths = {

      // Stroke ka ek endpoint EXACTLY ruled line ko touch karega
      down45: [
        x,
        baselineY,
        x + size * 0.7,
        baselineY + size
      ],

      down90: [
        x,
        baselineY,
        x,
        baselineY + size
      ],

      down30: [
        x,
        baselineY,
        x + size * 0.5,
        baselineY + size
      ],

      horizontal: [
        x,
        baselineY,
        x + size,
        baselineY
      ]
    };

    const p = paths[stroke];

    if (!p) return null;

    return this.drawLine(
      svg,
      p[0],
      p[1],
      p[2],
      p[3],
      weight
    );
  }

};
