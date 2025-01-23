import { daisyui } from '#tailwind-config'

export const useThemes = () => {
  const themeList = daisyui?.themes || []
  const availableThemes = [...new Set(themeList)]
  return { availableThemes }
} 