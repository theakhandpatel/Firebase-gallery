import React, { useState } from "react"
import { Navbar,Dropdown, Container, Button, ButtonGroup } from "react-bootstrap"
import { Link,useHistory } from "react-router-dom"
import { useTheme } from "../../Context/ThemeContext"
import { IoMdSunny } from "react-icons/io"
import { TiWeatherNight } from "react-icons/ti"
import { useAuth } from "../../Context/AuthContext"
import { FaUserAstronaut } from "react-icons/fa"

function NavBarComponent() {
  const { theme, toggleTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(theme?.variant === "dark")
  const {currentUser,logout} = useAuth()
  const history = useHistory()
  const toggleDarkMode = (checked) => {
    toggleTheme()
    setDarkMode(!darkMode)
  }

  const logOutHandler = () => {
    logout()
    history.push("/login")
  }
  return (
    <Navbar variant={theme?.variant} bg={theme?.bg} expand="sm">
      <Container>
        
        <Button size="sm" variant={theme?.outline} onClick={toggleDarkMode}>
          {darkMode ? (
            <TiWeatherNight color="#48bfe3" size="30" />
          ) : (
            <IoMdSunny color="#faa307" size="30" />
          )}
        </Button>
        <Navbar.Brand as={Link} to="/">
          <h2 className="text-large">Firegram</h2>
        </Navbar.Brand>
        {currentUser && <Dropdown as={ButtonGroup}>
  <Button as={Link}  to="/profile"  variant="primary"><FaUserAstronaut/></Button>

  <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

  <Dropdown.Menu>
    <Dropdown.Item onClick={logOutHandler}>Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown> }
      </Container>
    </Navbar>
  )
}
export default NavBarComponent
