import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { FaFolderPlus } from "react-icons/fa"
import { useAuth } from "../../../Context/AuthContext"
import { projectFirestore } from "../../../firebase/config"

export default function AddFolderButton() {
  const [open, setOpen] = useState(false)
  const [albumInput, setAlbumInput] = useState("")
  const {currentUser}  = useAuth()

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    projectFirestore
      .collection("albums")
      .add({ name: albumInput,createdBy: currentUser.uid})
      .catch((err) => {
        console.log(err)
      })
    setAlbumInput("")
    closeModal()
  }

  return (
    <>
      <Button
        className="m-3 mb-5  "
        onClick={openModal}
        variant="danger"
        size="sm"
        style={{ cursor: "pointer" }}
      >
        <FaFolderPlus color="#372772" size={24} />
        <span className="ms-2">Create Album</span>
      </Button>
      {/* </div>
      </div> */}
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={albumInput}
                onChange={(e) => setAlbumInput(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
