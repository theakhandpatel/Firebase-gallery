import { Link } from "react-router-dom"
import CenteredContainer from "../AuthComponents/CenteredContainer"
import {Card} from "react-bootstrap"
import { useTheme } from "../../Context/ThemeContext"


export default function HomePage(){

  const {theme} = useTheme()
    return (<CenteredContainer>
      
        <Card  border="primary" style={{height: "45vh"}} bg={theme.variant==="light" ?"light" :"dark"} text>
        <Card.Body className="my-5" >
          <Card.Text>Browse all your images</Card.Text>
            <Card.Title className="text-center">
              <Link to="albums">View my albums</Link>
            </Card.Title>
          </Card.Body></Card>
          </CenteredContainer>)
}