import "./App.css"
import AlbumView from "./components/AlbumView"
import ImageHome from "./components/ImageHome"

import Navbar from "./components/Navbar"
import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={AlbumView} />
        <Route path="/:albumId" component={ImageHome} />
      </Switch>
    </div>
  )
}

export default App
