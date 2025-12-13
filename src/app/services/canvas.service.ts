import { Injectable } from '@angular/core';

export interface ParticleData {
  x: number,
  y: number,
  opacity: number,
  speedX: number;
  speedY: number,
  radius: number;
}

@Injectable()
export class CanvasService {
  // https://www.youtube.com/watch?v=50teKYVaQgc&t=50s
  // https://rgbacolorpicker.com/hex-to-rgba
  particlesOnScreen = 275;
  particlesArray: ParticleData[] = [];

  getRandomNumber(min: number, max: number) {
    return min + Math.random() * (max - min + 1);
  }

  createSnowflakes(width: number, height: number) {
    Array.from(Array(this.particlesOnScreen)).forEach(() => {
      this.particlesArray.push({
        x: Math.random() * width,
        y: Math.random() * height,
        opacity: Math.random(),
        speedX: this.getRandomNumber(-4, 4), // default -11, 11
        speedY: this.getRandomNumber(2, 10), // default 7, 15
        radius: this.getRandomNumber(0.5, 4.2) // default .5, 4.2
      })
    })
  }

  drawSnowFlakes(context: CanvasRenderingContext2D | null | undefined) {
    if (!context) {
      return;
    }
    this.particlesArray.forEach((particle) => {
      const gradient = context.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius
      )

      gradient.addColorStop(0, `rgba(127, 17, 224,${particle.opacity})`) // lighter orange
      gradient.addColorStop(0, `rgba(255,255,255,${particle.opacity})`) // white 
      gradient.addColorStop(0, `rgba(246, 220, 188,${particle.opacity})`) // brigher orange

      context.beginPath();
      context.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2,
        false
      );
      context.fillStyle = gradient;
      context.fill();
    })
  }

  moveSnowFlakes(height: number, width: number) {
    this.particlesArray.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y > height) {
        p.x = Math.random() * width * 1.5;
        p.y = -50;
      }
    })
  }

  updateSnowFall(context: CanvasRenderingContext2D | null | undefined, width: number, height: number) {
    context?.clearRect(0, 0, width, height);
    this.drawSnowFlakes(context);
    this.moveSnowFlakes(height, width);
  }
}
