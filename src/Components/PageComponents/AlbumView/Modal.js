import React from "react"
import { projectStorage, projectFirestore } from "../../../firebase/config"
import { Button, Modal,Image, Container } from "react-bootstrap"
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
    <Modal size="lg"  show={selectedImg !== null} onHide={closeModal}>
      <Modal.Header closeButton>
    <Modal.Title>Modal title</Modal.Title>
  </Modal.Header>
  <Modal.Body>
        <Container>
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

          <Image fluid
            src={selectedImg.url}
            alt="enlarged pic"
          />
        </Container>
        </Modal.Body>
    </Modal>
  )
}
export default ModalComponent
