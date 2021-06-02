import React from "react"
import useFireStore from "../hooks/useFirestore"
import Albumlist from "./Albumlist"
import CreateAlbumForm from "./CreateAlbumForm"

function AlbumView() {
  const { docs: albums } = useFireStore("albums")
  return (
    <>
      <CreateAlbumForm />
      {albums[0] ? <Albumlist albums={albums} /> : <h2>nothing here</h2>}
    </>
  )
}

export default AlbumView
