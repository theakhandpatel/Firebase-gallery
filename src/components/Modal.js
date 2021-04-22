import { motion } from "framer-motion"
import { projectStorage, projectFirestore } from "../firebase/config"

const Modal = ({ selectedImg, setSelectedImg }) => {
  const handleModalClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null)
    }
  }
  const deleteImage = (e) => {
    const fileStorageRef = projectStorage.refFromURL(selectedImg.url)
    const fileFirestoreRef = projectFirestore
      .collection("images")
      .doc(selectedImg.id)
    fileStorageRef
      .delete()
      .then(() => {
        fileFirestoreRef.delete()
        setSelectedImg(null)
      })
      .catch((e) => {
        console.log(e)
      })
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
