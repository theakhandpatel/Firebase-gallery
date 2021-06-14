import React from "react"
import { Roller } from "react-css-spinners"
import useFireStore from "../../hooks/useFirestore"
import AddAlbumButton from "./AddAlbumButton"
import Albumlist from "./Albumlist"

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
        <Albumlist albums={albums} />
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
