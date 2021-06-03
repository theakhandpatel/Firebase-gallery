import { motion } from "framer-motion"

const ImageGrid = ({ setSelectedImg, images }) => {
  console.log("######################")
  return (
    <div className="img-grid">
      {images &&
        images
          .slice()
          .reverse()
          .map((doc, index) => (
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
                src={doc.thumbUrl}
                alt="uploaded pic"
              />
            </motion.div>
          ))}
    </div>
  )
}

export default ImageGrid
