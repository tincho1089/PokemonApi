import { useEffect, useState } from 'react'
import ParticleImage, { ParticleOptions } from 'react-particle-image'

export default function ParticleGenerator({
  image,
  height,
  width,
  color,
}: {
  image: string
  height: number
  width: number
  color: string
}) {
  const [key, setKey] = useState(0)

  const particleOptions: ParticleOptions = {
    filter: ({ x, y, image }) => {
      // Get pixel
      const pixel = image.get(x, y)
      // Make a particle for this pixel if blue > 50 (range 0-255)
      return pixel.b > 50
    },
    color: () => color,
  }

  useEffect(() => {
    setKey((key) => key + 1)
  }, [color])

  return (
    <ParticleImage
      key={key}
      src={image}
      scale={0.1}
      entropy={20}
      maxParticles={4200}
      particleOptions={particleOptions}
      backgroundColor={'transparent'}
      width={width}
      height={height}
    />
  )
}
