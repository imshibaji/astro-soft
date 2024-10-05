'use client';
import React, { useEffect, useRef } from "react";
import { BirthDetails, calculateAscendant, PlanetData, signs } from "@/utils/AscCal";


// Component to draw the natal chart
export default function NatalChart({ details, planetPositions }: {
  details: BirthDetails,
  planetPositions?: PlanetData
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Sample birth details
  useEffect(() => {
    // Draw the chart on component mount
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        //re-draw the chart
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw the chart
        drawChart(ctx, details, planetPositions);
      }
    }
  }, [details, planetPositions]);

  return (
    <div className="bg-neutral-100 dark:bg-neutral-300 w-[400px] h-[400px] m-5 rounded-md">
      <canvas ref={canvasRef} width={400} height={400}></canvas>
    </div>
  );
};

// Function to draw the chart
export function drawChart(
  ctx: CanvasRenderingContext2D,
  birthDetails: BirthDetails,
  planets?: PlanetData
) {
  const width = 400;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;

  // Ascendant sign
  const ascendantSign = calculateAscendant(birthDetails);
  console.log("Ascendant Sign:", ascendantSign);

  // Draw the outer circle of the chart
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw 12 houses (Bhavas) by dividing the circle into 12 segments
  for (let i = 0; i < 12; i++) {
    const angle = (i * 2 * Math.PI) / 12;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * Math.cos(angle),
      centerY + radius * Math.sin(angle)
    );
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw the zodiac signs inside the houses
  for (let i = 0; i < 12; i++) {
    const angle = (i * 2 * Math.PI) / 12;
    const textX = (centerX) + (radius - 30) * Math.cos(angle + Math.PI / 12);
    const textY = (centerY) + (radius - 30) * Math.sin(angle + Math.PI / 12);
    ctx.font = "14px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(signs[i], textX, textY);
  }

  // Highlight the Ascendant sign house
  const ascendantIndex = signs.indexOf(ascendantSign);
  const ascendantAngle = (ascendantIndex * 2 * Math.PI) / 12;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + radius * Math.cos(ascendantAngle),
    centerY + radius * Math.sin(ascendantAngle)
  );
  ctx.strokeStyle = "#f00";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Highlight the Ascendant sign house by labeling it "ASC"
  const ascTextPos = ascendantIndex >6 ? 10 : -18;
  const ascendantTextX = centerX + (radius - 70) * Math.cos((ascendantIndex * 2 * Math.PI) / 12 + Math.PI / 12);
  const ascendantTextY = centerY + (radius - 70) * Math.sin((ascendantIndex * 2 * Math.PI) / 12 + Math.PI / 12) +  ascTextPos; // Adjust Y position downward to place inside the house

  // Draw the ASC label with adjusted baseline
  ctx.font = "14px Arial";
  ctx.fillStyle = "#0d3c7a"; // Color for the ascendant label
  ctx.textAlign = "center";
  ctx.textBaseline = "top"; // Set text baseline to top for proper positioning
  ctx.fillText("ASC", ascendantTextX, ascendantTextY);


  // Draw zodiac signs (rashi) inside the chart at 30-degree intervals
  for (let i = 0; i < 12; i++) {
    const angle = (i * 2 * Math.PI) / 12;
    const textX = centerX + (radius - 30) * Math.cos(angle + Math.PI / 12);
    const textY = centerY + (radius - 30) * Math.sin(angle + Math.PI / 12);
    ctx.font = "14px Arial";
    ctx.fillStyle = "#5b6776";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    ctx.fillText(signs[i], textX, textY);
  }

  if(planets){
    // Plot planets based on their degrees
    drawPlanets(ctx, planets, centerX, centerY, radius);
  }
}


// Function to check if two planets are close in degree (within 5 degrees)
function arePlanetsCloseInDegree (degree1: number, degree2: number) {
  const degreeDifference = Math.abs(degree1 - degree2);
  return degreeDifference < 5; // Check if degrees are within 5 degrees
};


// Function to plot planets on the chart
function drawPlanets(
  ctx: CanvasRenderingContext2D,
  planets: PlanetData,
  centerX: number,
  centerY: number,
  radius: number
){
  const planetPositions: {
    x: number;
    y: number;
    planet: string;
    degree: number;
    degreeWithinRashi: number;
  }[] = [];

  // First, calculate the positions of each planet
  for (const planet in planets) {
    const degree = planets[planet].degree;
    const angle = (degree * Math.PI) / 180; // Convert degrees to radians

    // Calculate position based on angle and radius
    const planetX = centerX + (radius - 50) * Math.cos(angle);
    const planetY = centerY + (radius - 50) * Math.sin(angle);

    // Calculate degree within rashi
    const degreeWithinRashi = degree % 30;

    // Store position for overlap check
    planetPositions.push({
      x: planetX,
      y: planetY,
      planet,
      degree,
      degreeWithinRashi
    });
  }

  // Now, adjust positions for planets within 5 degrees
  for (let i = 0; i < planetPositions.length; i++) {
    const { x, y, planet, degreeWithinRashi, degree } = planetPositions[i];

    // Check for nearby planets and adjust position if necessary
    for (let j = i + 1; j < planetPositions.length; j++) {
      const otherPlanet = planetPositions[j];

      if (arePlanetsCloseInDegree(degree, otherPlanet.degree)) {
        // If they are within 5 degrees, adjust the position of the other planet
        otherPlanet.x += 15; // Move 15px to the right
        otherPlanet.y -= 15; // Move 10px up (you can adjust these values)
      }
    }

    // Draw planets with their adjusted positions
    ctx.font = "12px Arial";
    ctx.fillStyle = "#f00";
    ctx.textAlign = "center";
    ctx.fillText(planet + " " + degreeWithinRashi + "°", x, y);
  }
};