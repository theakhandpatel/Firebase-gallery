import React, { useState, useEffect } from "react"
import ImageGrid from "./ImageGrid"
import Modal from "./Modal"
import UploadForm from "./UploadForm"
import { useParams } from "react-router-dom"
import { projectFirestore } from "../firebase/config"

function ImageHome() {
  const [selectedImg, setSelectedImg] = useState(null)
  const { albumId } = useParams()
  const [album, setAlbum] = useState(null)

  useEffect(() => {
    return projectFirestore
      .collection("albums")
      .doc(albumId)
      .onSnapshot((snapshot) => {
        setAlbum(snapshot.data())
      })
  }, [albumId])
  return (
    <div className="album-view">
      <h2>{album?.name}</h2>
      <div className="content">
        <UploadForm />
        {album && (
          <ImageGrid images={album.images} setSelectedImg={setSelectedImg} />
        )}
        {selectedImg && (
          <Modal
            albumId={albumId}
            selectedImg={selectedImg}
            setSelectedImg={setSelectedImg}
          />
        )}
      </div>
    </div>
  )
}

export default ImageHome
