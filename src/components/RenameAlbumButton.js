import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { CgRename } from "react-icons/cg"
import { projectFirestore } from "../firebase/config"

export default function RenameAlbumButton({ album }) {
  const [open, setOpen] = useState(false)
  const [albumInput, setAlbumInput] = useState(album?.name)

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
      .doc(album.id)
      .update({ name: albumInput })
      .catch((err) => {
        console.log(err)
      })
    setAlbumInput("")
    closeModal()
  }

  return (
    <>
      <Button
        className="mx-2"
        onClick={openModal}
        variant="outline-warning"
        size="sm"
      >
        <CgRename color="#457b9d" size={24} />
        <span className="ms-2">Rename</span>
      </Button>
      {/* </div>
      </div> */}
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Update Album Name</Form.Label>
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
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
