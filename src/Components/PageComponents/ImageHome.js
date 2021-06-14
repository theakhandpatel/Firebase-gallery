import React, { useState, useEffect } from "react"
import ImageGrid from "./ImageGrid"
import Modal from "./Modal"
import { Link, useParams } from "react-router-dom"
import { projectFirestore } from "../../firebase/config"
import AddFileButton from "./AddFileButton"
import { FaArrowAltCircleLeft } from "react-icons/fa"

import RenameAlbumButton from "./RenameAlbumButton"
import DeleteAlbumButton from "./DeleteAlbumButton"
import { Roller } from "react-css-spinners"

function ImageHome() {
  const [selectedImg, setSelectedImg] = useState(null)
  const { albumId } = useParams()
  const [album, setAlbum] = useState(null)

  useEffect(() => {
    return projectFirestore
      .collection("albums")
      .doc(albumId)
      .onSnapshot((snapshot) => {
        setAlbum({ ...snapshot.data(), id: snapshot.id })
      })
  }, [albumId])
  return (
    <>
      {!album ? (
        <>
          <p className="display-5">Loading</p>
          <Roller size={100} color="#5E239D" />
        </>
      ) : (
        <div className="album-view">
          <h2 class="display-1 text-center text-danger text-break text-wrap">
            {album?.name}
          </h2>

          <Link to="/albums">
            <FaArrowAltCircleLeft size={28} />
          </Link>
          <AddFileButton albumId={albumId} />
          <RenameAlbumButton album={album} albumId={albumId} />
          <DeleteAlbumButton album={album} />

          <hr class="divider" />
          <div className="mt-0">
            <ImageGrid images={album?.images} setSelectedImg={setSelectedImg} />
            {selectedImg && (
              <Modal
                albumId={albumId}
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageHome
