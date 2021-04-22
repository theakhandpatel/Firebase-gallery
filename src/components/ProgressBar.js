import { motion } from "framer-motion"
import { useEffect } from "react"
import useStorage from "../hooks/useStorage"

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file)
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
