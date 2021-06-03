import { useEffect, useState } from "react"
import { projectFirestore, projectStorage } from "../firebase/config"
import firebase from "firebase"

const useStorage = (file, thumbnail, albumId, fileId) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    let localThumbUrl = null
    const timeStamp = firebase.firestore.Timestamp.now()
    // A storage reference to bucket
    const storageRef = projectStorage.ref(timeStamp + "-" + file.name)

    const thumbStorageRef = projectStorage.ref("thumbnail" + timeStamp)

    thumbStorageRef.put(thumbnail).on(
      "state-changed",
      () => {},
      () => {},
      async () => {
        localThumbUrl = await thumbStorageRef.getDownloadURL()
      }
    )
    storageRef.put(file).on(
      "state-changed",
      (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(percentage)
      },
      (err) => {
        setError(err)
      },
      async () => {
        const url = await storageRef.getDownloadURL()

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
          .then(console.log("done"))
        setUrl(url)
      }
    )
  }, [file, albumId, thumbnail])

  return { progress, url, error, fileId }
}

export default useStorage
