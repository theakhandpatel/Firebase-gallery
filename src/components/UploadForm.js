import { useState } from "react"
import ProgressBar from "./ProgressBar"
import imageCompression from "browser-image-compression"
import { Ring } from "react-css-spinners"
import { FaFileUpload } from "react-icons/fa"
function UploadForm() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const types = ["image/jpeg", "image/png"]
  const [optimizing, setOptimizing] = useState(false)

  const changeHandler = async (e) => {
    let selected = e.target.files[0]
    if (selected && types.includes(selected.type)) {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 250,
        useWebWorker: true,
      }

      try {
        setOptimizing(true)
        const compressedFile = await imageCompression(selected, options)
        setThumbnail(compressedFile)
        setFile(selected)
        setOptimizing(false)
        e.target.value = null
        // write your own logic
      } catch (error) {
        console.log(error)
      }
    } else {
      setFile(null)
      setError("Please select a file with valid image extension.")
    }
  }

  return (
    <>
      <label className="btn btn-outline-sucess btn-sm m-0 mr-2">
        <FaFileUpload />
        <input
          type="file"
          onChange={changeHandler}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>

      <div className="output">
        {optimizing && (
          <div>
            <p>"Optimizing your Image"</p>
            <Ring color="#3282b8" />
          </div>
        )}
        {error && <div className="error">{error}</div>}
        {file && (
          <ProgressBar thumbnail={thumbnail} file={file} setFile={setFile} />
        )}
      </div>
    </>
  )
}

export default UploadForm
