import { useState } from "react"
import "./App.css"
import Footer from "./components/Footer"
import ImageGrid from "./components/ImageGrid"
import Modal from "./components/Modal"
import Title from "./components/Title"
import UploadForm from "./components/UploadForm"

function App() {
  const [selectedImg, setSelectedImg] = useState(null)

  return (
    <div className="App">
      <div className="content">
        <Title />
        <UploadForm />
        <ImageGrid setSelectedImg={setSelectedImg} />
        {selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default App
