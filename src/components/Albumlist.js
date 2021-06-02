import React from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
function Albumlist({ albums }) {
  const placeholderImage =
    "https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/folder-icon.png"
  return (
    <Container>
      <Row xs={2} md={4} lg={6} className="g-4">
        {albums &&
          albums.map((album) => {
            let imageSource
            if (album.images === undefined || album.images[0] === undefined) {
              imageSource = placeholderImage
            } else {
              imageSource = album.images[0].url
            }
            return (
              <Link to={`/${album.id}`}>
                <Col>
                  <Card border="light" style={{ width: "6rem" }}>
                    <Card.Img
                      variant="left"
                      style={{ width: "3em", margin: "auto auto" }}
                      src={imageSource}
                    />
                    <Card.Body>
                      <Card.Title className="text-secondary">
                        {album.name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </Link>
            )
          })}
      </Row>
    </Container>
  )
}

export default Albumlist
