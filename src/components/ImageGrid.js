import { motion } from "framer-motion"
import { Image } from "react-bootstrap"

const ImageGrid = ({ setSelectedImg, images }) => {
  return (
    <div className="img-grid">
      {images &&
        images
          .slice()
          .reverse()
          .map((doc, index) => (
            <motion.div
              amimate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              layout
              whileHover={{ opacity: 1 }}
              key={index}
              onClick={() => {
                setSelectedImg(doc)
              }}
            >
              <Image
                src={doc.thumbUrl}
                style={{ width: "100%", height: "300px" }}
                alt="uploaded pic"
                thumbnail
              />
            </motion.div>
          ))}
    </div>
  )
}

export default ImageGrid
