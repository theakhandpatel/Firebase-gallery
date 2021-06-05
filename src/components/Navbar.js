import React, { useState } from "react"
import { Navbar, Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useTheme } from "../Context/ThemeContext"
import { IoMdSunny } from "react-icons/io"
import { TiWeatherNight } from "react-icons/ti"

function NavBarComponent() {
  const { theme, toggleTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(theme?.variant === "dark")

  const toggleDarkMode = (checked) => {
    toggleTheme()
    setDarkMode(!darkMode)
  }

  return (
    <Navbar variant={theme?.variant} bg={theme?.bg} expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h2 className="text-large">Firegram</h2>
        </Navbar.Brand>
        <Button size="sm" variant={theme?.outline} onClick={toggleDarkMode}>
          {darkMode ? (
            <TiWeatherNight color="#48bfe3" size="30" />
          ) : (
            <IoMdSunny color="#faa307" size="30" />
          )}
        </Button>
      </Container>
    </Navbar>
  )
}
export default NavBarComponent
