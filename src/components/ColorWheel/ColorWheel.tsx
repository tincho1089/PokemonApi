import { useState, useEffect } from 'react'
import ParticleImage, { Array2D, forces, ParticleOptions, RGBA, Vector } from 'react-particle-image'

const COLOR_WHEEL_URL = 'color-wheel.jpeg'

const defaultScale = Math.min(Math.max(window.innerWidth / 1300, 0.5), 0.85)

const sources = [COLOR_WHEEL_URL]

interface ParticleOptionParams {
  x: number
  y: number
  image: Array2D<RGBA>
}

type ParticleOptionsMap = {
  [key: string]: ParticleOptions
}

export default function ColorWheel({
  color,
  height,
  width,
  scale,
  radius,
}: {
  color: string
  height: number
  width: number
  scale: number
  radius: number
}) {
  const [key, setKey] = useState(0)

  const src: string = sources[0]
  const particleOptionsMap: ParticleOptionsMap = {
    [COLOR_WHEEL_URL]: {
      radius: ({ x, y, image }: ParticleOptionParams) => {
        const center = new Vector(image.getWidth() / 2, image.getHeight() / 2)
        return (center.subtract(new Vector(x, y)).getMagnitude() / radius + 0.1) * defaultScale
      },
      mass: () => 80,
      filter: ({ x, y, image }: ParticleOptionParams) => {
        const pixel = image.get(x, y)
        const magnitude = (((pixel.r + pixel.g + pixel.b) / 3 / 255) * pixel.a) / 255
        return magnitude < 0.8
      },
      color: () => {
        return color
      },
      friction: () => 0.23,
      initialVelocity: () => new Vector((Math.random() - 0.5) * 1000, (Math.random() - 1) * 1000),
    },
  }

  useEffect(() => {
    setKey((key: number) => key + 1)
  }, [color])

  return (
    <ParticleImage
      key={key}
      backgroundColor='transparent'
      src={src}
      maxParticles={4500}
      height={height}
      width={width}
      particleOptions={particleOptionsMap[src]}
      scale={defaultScale * scale}
      entropy={20}
      mouseMoveForce={(x: number, y: number) => forces.disturbance(x, y, 6)}
      touchMoveForce={(x: number, y: number) => forces.disturbance(x, y, 6)}
      mouseDownForce={(x: number, y: number) => forces.disturbance(x, y, 50)}
    />
  )
}
