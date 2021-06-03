import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { FaFolderPlus } from "react-icons/fa"
import { projectFirestore } from "../firebase/config"

export default function AddFolderButton() {
  const [open, setOpen] = useState(false)
  const [albumInput, setAlbumInput] = useState("")

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
      .add({ name: albumInput })
      .catch((err) => {
        console.log(err)
      })
    setAlbumInput("")
    closeModal()
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        <FaFolderPlus />
      </Button>
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
