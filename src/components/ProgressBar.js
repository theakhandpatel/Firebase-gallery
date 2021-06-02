import { motion } from "framer-motion"
import { useEffect } from "react"
import useStorage from "../hooks/useStorage"
import { useParams } from "react-router-dom"

const ProgressBar = ({ file, setFile, thumbnail }) => {
  const { albumId } = useParams()
  console.log(albumId)
  const { url, progress } = useStorage(file, thumbnail, albumId)
  useEffect(() => {
    if (url) {
      setFile(null)
    }
  }, [url, setFile])

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
      className="progress-bar"
    ></motion.div>
  )
}

export default ProgressBar
