import React from "react"
import { Container } from "react-bootstrap"
import { Roller } from "react-css-spinners"
import { useTheme } from "../Context/ThemeContext"
import useFireStore from "../hooks/useFirestore"
import AddAlbumButton from "./AddAlbumButton"
import Albumlist from "./Albumlist"

function AlbumView() {
  const { docs: albums, loading } = useFireStore("albums")
  const { theme } = useTheme()

  return (
    <>
      <AddAlbumButton />
      <Container className={"text-center " + theme.text_color}>
        {loading ? (
          <>
            <p className="display-5">Loading</p>
            <Roller size={100} color="#5E239D" />
          </>
        ) : albums ?? [0] ? (
          <Albumlist albums={albums} />
        ) : (
          <>
            <h2 class="display-5">Nothing here!</h2>
            <p class="lead">Create A new album</p>
          </>
        )}
      </Container>
    </>
  )
}

export default AlbumView
