import "./App.css"
import AlbumView from "./components/AlbumView"
import ImageHome from "./components/ImageHome"

import Navbar from "./components/Navbar"
import { Route, Switch } from "react-router-dom"
import { useTheme } from "./Context/ThemeContext"

function App() {
  const { theme } = useTheme()
  return (
    <div className={"App " + theme.bg_color}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={AlbumView} />
        <Route path="/:albumId" component={ImageHome} />
      </Switch>
    </div>
  )
}

export default App
