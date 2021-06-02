import { motion } from "framer-motion"

const ImageGrid = ({ setSelectedImg, images }) => {
  return (
    <div className="img-grid">
      {images &&
        images.map((doc, index) => (
          <motion.div
            className="img-wrap"
            layout
            whileHover={{ opacity: 1 }}
            key={index}
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
