import React, { useState } from "react"
import { FaCheckCircle, FaFileUpload } from "react-icons/fa"
import { nanoid } from "nanoid"
import ReactDOM from "react-dom"
import { Toast, ProgressBar } from "react-bootstrap"
import { projectFirestore, projectStorage } from "../firebase/config"
import firebase from "firebase"
import { Roller } from "react-css-spinners"
import imageCompression from "browser-image-compression"

function AddFileButton({ albumId }) {
  const [uploadingFiles, setUploadingFiles] = useState([])
  const types = ["image/jpeg", "image/png", "image/jpg"]

  // Upload HAndler
  async function handleUpload(e) {
    const file = e.target.files[0]
    e.target.value = null
    if (file == null || !types.includes(file.type)) {
      e.target.value = null
      // setError("Please select a file with valid image extension.")
      return
    }

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 250,
      useWebWorker: true,
    }

    const id = nanoid()
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      {
        id: id,
        name: file.name,
        progress: 0,
        error: false,
        optimized: false,
      },
    ])
    const compressedFile = await imageCompression(file, options)

    setUploadingFiles((prevUploadingFiles) => {
      return prevUploadingFiles.map((uploadFile) => {
        if (uploadFile.id === id) {
          return { ...uploadFile, optimized: true }
        }
        return uploadFile
      })
    })

    let localThumbUrl

    const timeStamp = firebase.firestore.Timestamp.now()
    const thumbStorageRef = projectStorage.ref("thumbnail" + timeStamp)
    const uploadTask = projectStorage.ref(timeStamp + "-" + file.name).put(file)
    thumbStorageRef.put(compressedFile).on(
      "state-changed",
      () => {},
      () => {},
      async () => {
        localThumbUrl = await thumbStorageRef.getDownloadURL()
      }
    )
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress }
            }
            return uploadFile
          })
        })
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true }
            }
            return uploadFile
          })
        })
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          projectFirestore
            .collection("albums")
            .doc(albumId)
            .update({
              images: firebase.firestore.FieldValue.arrayUnion({
                name: file.name,
                url,
                thumbUrl: localThumbUrl || url,
              }),
            })
            .then(
              setTimeout(() => {
                setUploadingFiles((prevUploadingFiles) => {
                  return prevUploadingFiles.filter(
                    (uploadFile) => uploadFile.id !== id
                  )
                })
              }, 300)
            )
        })
      }
    )
  }
  return (
    <>
      <label className="btn btn-outline-success btn-sm m-0 mx-2">
        <FaFileUpload size={20} />
        <span className="ms-1">Upload</span>
        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => {
              return (
                <Toast
                  key={file.id}
                  onClose={() => {
                    setUploadingFiles((prevUploadingFiles) => {
                      return prevUploadingFiles.filter(
                        (uploadFile) => uploadFile.id !== file.id
                      )
                    })
                  }}
                >
                  <Toast.Header
                    closeButton={file.error}
                    className="text-truncate w-100 d-block"
                  >
                    {file.name}
                  </Toast.Header>
                  <Toast.Body className="text-center">
                    {file.optimized ? null : (
                      <div className="d-flex align-items-start">
                        <Roller size={24} color="#5E239D" />
                        <p className="text-primary font-weight-bold lead">
                          Optimizing
                        </p>
                      </div>
                    )}
                    {file.progress !== 1 ? (
                      <ProgressBar
                        animated={!file.error}
                        variant={file.error ? "danger" : "primary"}
                        now={file.error ? 100 : file.progress * 100}
                        label={
                          file.error
                            ? "Error"
                            : Math.round(file.progress * 100) + "%"
                        }
                      />
                    ) : (
                      <div className="d-block text-success ">
                        <FaCheckCircle /> File Uploaded
                      </div>
                    )}
                  </Toast.Body>
                </Toast>
              )
            })}
          </div>,
          document.body
        )}
    </>
  )
}

export default AddFileButton
