import useFireStore from "../hooks/useFirestore"
import { motion } from "framer-motion"

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFireStore("images")

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            layout
            whileHover={{ opacity: 1 }}
            key={doc.id}
            onClick={() => setSelectedImg(doc)}
          >
            <motion.img
              amimate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              src={doc.url}
              alt="uploaded pic"
            />
          </motion.div>
        ))}
    </div>
  )
}

export default ImageGrid
