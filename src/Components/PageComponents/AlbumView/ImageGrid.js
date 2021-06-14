import { motion } from "framer-motion"
import { Image, Row } from "react-bootstrap"

const ImageGrid = ({ setSelectedImg, images }) => {
  return (
    <Row xs={2} md={4} lg={5}>
      {images &&
        images
          .slice()
          .reverse()
          .map((doc, index) => (
            <motion.div
              className="my-2"
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
    </Row>
  )
}

export default ImageGrid
