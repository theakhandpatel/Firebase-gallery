import React, { useContext, useState } from "react"
import { reactLocalStorage } from "reactjs-localstorage"

const ThemeContext = React.createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

const light = {
  variant: "light",
  bg: "light",
  bg_color: "",
  text_color: "",
  outline: "outline-dark",
}
const dark = {
  variant: "dark",
  bg: "dark",
  bg_color: "bg-dark",
  text_color: "text-white",
  outline: "outline-primary",
}

const savedTheme = reactLocalStorage.get("darkMode", false) ? dark : light

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(savedTheme)

  const toggleTheme = () => {
    theme === light ? setTheme(dark) : setTheme(light)

    reactLocalStorage.set("darkMode", theme === dark)
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
