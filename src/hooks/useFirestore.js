import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

const useFireStore = (collection) => {
  const [docs, setDocs] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      // .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = []
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id })
        })
        setDocs(documents)
        setLoading(false)
      })

    return () => unsub()
  }, [collection])

  return { docs, loading }
}
export default useFireStore
