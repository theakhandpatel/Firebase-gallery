import "./App.css"
import AlbumView from "./Components/PageComponents/AlbumView"
import ImageHome from "./Components/PageComponents/ImageHome"
import Navbar from "./Components/PageComponents/Navbar.js"
import { Route, Switch } from "react-router-dom"
import { useTheme } from "./Context/ThemeContext"
import { Container } from "react-bootstrap"
import PrivateRoute from "./Components/AuthComponents/PrivateRoute"
import ForgotPassword from "./Components/AuthComponents/ForgotPassword"
import SignUp from "./Components/AuthComponents/SignUp"
import Login from "./Components/AuthComponents/Login"
import HomePage from "./Components/PageComponents/HomePage"


function App() {
  const { theme } = useTheme()
  return (
    <div className={"App " + theme?.bg_color}>
      <Navbar />
      <Container className={"text-center " + theme?.text_color}>
        <Switch>
          
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path="/albums" component={AlbumView} />
          <PrivateRoute exact path="/albums/:albumId" component={ImageHome} />

          {/* Auth Routes */}
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
