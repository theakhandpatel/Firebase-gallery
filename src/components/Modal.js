import React from "react"
import { projectStorage, projectFirestore } from "../firebase/config"
import { Button, Modal } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
import firebase from "firebase"
const ModalComponent = ({ selectedImg, setSelectedImg, albumId }) => {
  function closeModal() {
    setSelectedImg(null)
  }
  const deleteImage = (e) => {
    const fileStorageRef = projectStorage.refFromURL(selectedImg.url)
    const thumbStorageRef = projectStorage.refFromURL(selectedImg.thumbUrl)
    const fileFirestoreRef = projectFirestore.collection("albums").doc(albumId)

    fileFirestoreRef
      .update({
        images: firebase.firestore.FieldValue.arrayRemove(selectedImg),
      })
      .then(async () => {
        console.log("here")
        await fileStorageRef.delete()
        await thumbStorageRef.delete()
      })
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
          <Button
            onClick={deleteImage}
            size="sm"
            variant="outline-danger"
            style={{ top: "40px", left: "10px", position: "relative" }}
          >
            <FaTrash />
          </Button>

          <img
            src={selectedImg.url}
            style={{ height: "95vh", width: "auto" }}
            // initial={{ y: "-100vh" }}
            // animate={{ y: 0 }}
            alt="enlarged pic"
          />
        </div>
      </div>
    </Modal>
  )
}
export default ModalComponent
