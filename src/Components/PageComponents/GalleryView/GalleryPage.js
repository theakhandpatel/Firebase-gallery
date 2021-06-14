import React from "react"
import { Roller } from "react-css-spinners"
import useFireStore from "../../../hooks/useFirestore"
import AddAlbumButton from "./AddAlbumButton"
import { Row } from "react-bootstrap"
import AlbumCard from "./AlbumCard"

function AlbumView() {
  const { docs: albums, loading } = useFireStore("albums",)

  return (
    <>
      <AddAlbumButton />

      {loading ? (
        <>
          <p className="display-5">Loading</p>
          <Roller size={100} color="#5E239D" />
        </>
      ) : albums ? (
        <Row xs={2} md={4} lg={6} className="g-5">
      {albums &&
        albums.map((album, index) => {
          return <AlbumCard key={index} album={album} />
        })}
    </Row>
      ) : (
        <>
          <h2 class="display-5">Nothing here!</h2>
          <p class="lead">Create A new album</p>
        </>
      )}
    </>
  )
}

export default AlbumView
