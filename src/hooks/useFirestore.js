import { useEffect, useState } from "react"
import { useAuth } from "../Context/AuthContext"
import { projectFirestore } from "../firebase/config"

const useFireStore = (collection) => {
  const [docs, setDocs] = useState(null)
  const [loading, setLoading] = useState(true)
  const {currentUser} = useAuth()

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .where("createdBy", "==", currentUser.uid)
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
  }, [collection,currentUser])

  return { docs, loading }
}
export default useFireStore
