import React from "react"
import useFireStore from "../hooks/useFirestore"
import AddFolderButton from "./AddAlbumButton"
import Albumlist from "./Albumlist"

function AlbumView() {
  const { docs: albums } = useFireStore("albums")
  return (
    <>
      <AddFolderButton />
      {albums[0] ? <Albumlist albums={albums} /> : <h2>nothing here</h2>}
    </>
  )
}

export default AlbumView
