import { Link } from "react-router-dom"
import CenteredContainer from "../AuthComponents/CenteredContainer"
import {Card} from "react-bootstrap"
import { useTheme } from "../../Context/ThemeContext"


export default function HomePage(){

  const {theme} = useTheme()
    return (<CenteredContainer>
        <Card border="primary" bg={theme.variant==="light" ?"light" :"dark"} text>Browse all your images
        <Card.Body>
            <Card.Title className="text-center">
              <Link to="albums">View my albums</Link>
            </Card.Title>
          </Card.Body></Card></CenteredContainer>)
}