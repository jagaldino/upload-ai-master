import { ThemeContext } from "@/contexts/ThemeProvider"
import { useContext } from "react"

export const useTheme = () => useContext(ThemeContext)