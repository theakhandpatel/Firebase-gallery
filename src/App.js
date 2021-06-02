import "./App.css"
import AlbumView from "./components/AlbumView"
import ImageHome from "./components/ImageHome"
import Title from "./components/Title"
import { Route, Switch } from "react-router-dom"

import { projectFirestore } from "./firebase/config"
import firebase from "firebase"

function App() {
  return (
    <div className="App">
      Hey
      <Title />
      <Switch>
        <Route exact path="/" component={AlbumView} />
        <Route path="/:albumId" component={ImageHome} />
      </Switch>
    </div>
  )
}

export default App
