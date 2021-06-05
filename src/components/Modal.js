import React from "react"
import { projectStorage, projectFirestore } from "../firebase/config"
import { Button, Modal } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
import firebase from "firebase"
import { ImageDownloader } from "@samvera/image-downloader"
const ModalComponent = ({ selectedImg, setSelectedImg, albumId }) => {
  function closeModal() {
    setSelectedImg(null)
  }

  const deleteImageFromStorage = async (selectedImg) => {
    const fileStorageRef = projectStorage.refFromURL(selectedImg.url)
    const thumbStorageRef = projectStorage.refFromURL(selectedImg.thumbUrl)
    await fileStorageRef.delete()
    await thumbStorageRef.delete()
  }

  const deleteImage = (e) => {
    const fileFirestoreRef = projectFirestore.collection("albums").doc(albumId)

    fileFirestoreRef
      .update({
        images: firebase.firestore.FieldValue.arrayRemove(selectedImg),
      })
      .then(deleteImageFromStorage(selectedImg))
      .catch((error) => console.log(error))
      .finally(setSelectedImg(null))
  }

  return (
    <Modal size="sm" show={selectedImg !== null} onHide={closeModal}>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          maxWidth: "fit-content",
          height: "90vh",
          backgroundColor: "transparent",
        }}
      >
        <div>
          <div style={{ top: "40px", left: "10px", position: "relative" }}>
            <Button onClick={deleteImage} size="sm" variant="outline-danger">
              <FaTrash />
            </Button>
            <ImageDownloader
              imageUrl={selectedImg.url}
              imageTitle={selectedImg.name}
              className="btn btn-sm btn-primary ms-2 download-btn"
            ></ImageDownloader>
          </div>

          <img
            src={selectedImg.url}
            style={{ height: "95vh", width: "auto" }}
            alt="enlarged pic"
          />
        </div>
      </div>
    </Modal>
  )
}
export default ModalComponent
