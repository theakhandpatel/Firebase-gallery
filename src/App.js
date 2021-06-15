import "./App.css"
import GalleryPage from "./Components/PageComponents/GalleryView/GalleryPage"
import AlbumPage from "./Components/PageComponents/AlbumView/AlbumPage"
import Navbar from "./Components/PageComponents/Navbar.js"
import { Route, Switch, Redirect } from "react-router-dom"
import { useTheme } from "./Context/ThemeContext"
import { Container } from "react-bootstrap"
import PrivateRoute from "./Components/AuthComponents/PrivateRoute"
import ForgotPassword from "./Components/AuthComponents/ForgotPassword"
import SignUp from "./Components/AuthComponents/SignUp"
import Login from "./Components/AuthComponents/Login"
import Profile from "./Components/AuthComponents/Profile"
import HomePage from "./Components/PageComponents/HomePage"
import { useAuth } from "./Context/AuthContext"


function App() {
  const { theme } = useTheme()
  const { currentUser } = useAuth()

  return (
    <div className={"App " + theme?.bg_color}>
      <Navbar />
      <Container className={"text-center " + theme?.text_color}>
        <Switch>
          
          <Route exact path="/" >{currentUser ? <Redirect to="/albums" /> : <HomePage />}</Route>
          <PrivateRoute exact path="/albums" component={GalleryPage} />
          <PrivateRoute exact path="/albums/:albumId" component={AlbumPage} />
          
          {/* Auth Routes */}
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
