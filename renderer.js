// Pitman Shorthand SVG Renderer
// Initial renderer foundation.

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
      weight === "heavy" ? "6" : "2.5"
    );

    line.setAttribute("stroke", "black");
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
      weight === "heavy" ? "5" : "2.5"
    );

    circle.setAttribute("fill", "black");

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
  }

};
drawStroke(svg, stroke, x, y, size = 80, weight = "light") {

  const paths = {
    slantDownRight: [x, y, x + size, y + size],
    slantUpRight: [x, y + size, x + size, y],
    vertical: [x, y, x, y + size],
    horizontal: [x, y, x + size, y]
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
},
