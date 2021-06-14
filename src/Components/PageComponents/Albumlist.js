import React from "react"
import { Row } from "react-bootstrap"
import AlbumCard from "./AlbumCard"
function Albumlist({ albums }) {
  return (
    <Row xs={2} md={4} lg={6} className="g-5">
      {albums &&
        albums.map((album, index) => {
          return <AlbumCard key={index} album={album} />
        })}
    </Row>
  )
}

export default Albumlist
