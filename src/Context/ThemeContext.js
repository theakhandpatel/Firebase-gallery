import React, { useContext, useEffect, useState } from "react"
import { reactLocalStorage } from "reactjs-localstorage"

const ThemeContext = React.createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

const LIGHT_THEME = {
  variant: "light",
  bg: "light",
  bg_color: "",
  text_color: "",
  outline: "outline-dark",
}
const DARK_THEME = {
  variant: "dark",
  bg: "dark",
  bg_color: "bg-dark",
  text_color: "text-white",
  outline: "outline-primary",
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(LIGHT_THEME)

  const toggleTheme = () => {
    console.log("in toogle  ", theme)
    let isLight = theme.variant === "light"
    console.log("islight: ",isLight)
    if(isLight){ 
      console.log("inside if 1st")
      setTheme(DARK_THEME)
    reactLocalStorage.setObject("theme",DARK_THEME)
  }else{
    console.log("inside else")
    setTheme(LIGHT_THEME);
    reactLocalStorage.setObject("theme",LIGHT_THEME)
  }
  }

  useEffect(()=>{
    console.log("supposed to run once")
    setTheme(reactLocalStorage.getObject("theme", LIGHT_THEME))
  },[])

  // useEffect(() => {
  //   reactLocalStorage.setObject("theme", theme)
  // }, [theme])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
