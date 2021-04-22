import { useState } from "react"
import { MdBrightness6 } from "react-icons/md"

function Title() {
  const [darkMode, setDarkMode] = useState(false)
  const darkModeToggler = () => {
    if (!darkMode) {
      document.body.classList.add("dark-theme")
      document.body.classList.remove("light-theme")
    } else {
      document.body.classList.add("light-theme")
      document.body.classList.remove("dark-theme")
    }
    setDarkMode(!darkMode)
  }

  return (
    <header>
      <h1>
        Firegram{" "}
        <MdBrightness6
          style={{ cursor: "pointer", "margin-left": "10px" }}
          onClick={darkModeToggler}
        />
      </h1>
      <p>Your Personal Image Gallery</p>
    </header>
  )
}

export default Title
