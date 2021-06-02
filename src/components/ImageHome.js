import React, { useState, useEffect } from "react"
import Footer from "./Footer"
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
  console.log(album)
  return (
    <div className="album-view">
      <h2>Album Photos</h2>
      <div className="content">
        <UploadForm />
        {album && (
          <ImageGrid images={album.images} setSelectedImg={setSelectedImg} />
        )}
        {selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ImageHome
