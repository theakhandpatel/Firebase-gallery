import "./App.css"
import AlbumView from "./components/AlbumView"
import ImageHome from "./components/ImageHome"

import Navbar from "./components/Navbar"
import { Route, Switch } from "react-router-dom"
import { useTheme } from "./Context/ThemeContext"
import { Container } from "react-bootstrap"

function App() {
  const { theme } = useTheme()
  return (
    <div className={"App " + theme.bg_color}>
      <Navbar />
      <Container className={"text-center " + theme.text_color}>
        <Switch>
          <Route exact path="/" component={AlbumView} />
          <Route path="/:albumId" component={ImageHome} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
