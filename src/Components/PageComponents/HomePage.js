import { Link } from "react-router-dom"
import CenteredContainer from "../AuthComponents/CenteredContainer"
import {Card} from "react-bootstrap"


export default function HomePage(){


    return (<CenteredContainer>
        <Card>Browse all your images
        <Card.Body>
            <Card.Title className="text-center">
              <Link to="albums">View my albums</Link>
            </Card.Title>
          </Card.Body></Card></CenteredContainer>)
}