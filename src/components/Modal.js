import { motion } from "framer-motion"
import { projectStorage, projectFirestore } from "../firebase/config"
import firebase from "firebase"

const Modal = ({ selectedImg, setSelectedImg, albumId }) => {
  const handleModalClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null)
    }
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
    <motion.div
      className="backdrop"
      onClick={handleModalClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img
        src={selectedImg.url}
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        alt="enlarged pic"
      />
      <span onClick={deleteImage}>Delete</span>
    </motion.div>
  )
}
export default Modal
