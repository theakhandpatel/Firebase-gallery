import React from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useTheme } from "../../../Context/ThemeContext"

function AlbumCard({ album }) {
  const { theme } = useTheme()
  const placeholderImage =
    "https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/folder-icon.png"
  let imageSource
  if (album.images === undefined || album.images[0] === undefined) {
    imageSource = placeholderImage
  } else {
    imageSource = album.images[0].thumbUrl
  }
  return (
    <Link to={`albums/${album.id}`}>
      <Col>
        <Card
          className=""
          bg={theme?.bg}
          text={theme?.bg === "light" ? "dark" : "white"}
          border={theme?.bg !== "light" ? "dark" : "white"}
        >
          <Card.Img
            variant="top"
            className=""
            style={{ width: "100%", height: "8rem" }}
            src={imageSource}
          />
          <Card.Body>
            <Card.Title className="text-center text-truncate">
              {album.name}
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Link>
  )
}

export default AlbumCard
