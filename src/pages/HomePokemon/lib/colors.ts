import { prominent } from 'color.js'
import tinycolor from 'tinycolor2'

export const getPalette = async (image: string) => {
  const promColor = await prominent(image, {
    amount: 3,
    group: 30,
    format: 'hex',
  })

  const bgColor = tinycolor(String(promColor[1])).isLight() ? String(promColor[2]) : String(promColor[1])
  return bgColor
}
