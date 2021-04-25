import { useEffect, useState } from "react"
import { projectFirestore, projectStorage, timeStamp } from "../firebase/config"
import firebase from "firebase"

const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    // A storage reference to bucket
    const storageRef = projectStorage.ref(
      file.name + "-" + firebase.firestore.Timestamp.now()
    )

    const collectionRef = projectFirestore.collection("images")

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
        const createdAt = timeStamp()
        collectionRef.add({ url, createdAt })
        setUrl(url)
      }
    )
  }, [file])

  return { progress, url, error }
}

export default useStorage
