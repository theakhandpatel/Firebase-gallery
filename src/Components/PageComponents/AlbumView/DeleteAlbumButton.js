import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import { projectFirestore, projectStorage } from "../../../firebase/config"

export default function DeleteAlbumButton({ album }) {
  const [open, setOpen] = useState(false)
  const [albumInput, setAlbumInput] = useState("")

  let history = useHistory()

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }
  const deleteImageFromStorage = (selectedImg) => {
    const fileStorageRef = projectStorage.refFromURL(selectedImg.url)
    const thumbStorageRef = projectStorage.refFromURL(selectedImg.thumbUrl)
    fileStorageRef.delete()
    thumbStorageRef.delete()
  }

  function handleSubmit(e) {
    e.preventDefault()
    const images = album.images
    projectFirestore
      .collection("albums")
      .doc(album.id)
      .delete()
      .then(() => {
        images.forEach((img) => {
          deleteImageFromStorage(img)
        })
      })
      .catch((err) => {
        console.log(err)
      })

    history.push("/")
  }

  return (
    <>
      <Button
        className="ms-2"
        onClick={openModal}
        variant="outline-danger"
        size="sm"
        style={{ cursor: "pointer" }}
      >
        <FaTrash size={24} />
        <span className="ms-2">Delete</span>
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Delete {album?.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>
                If you wish to delete this album, then enter the album's name in
                the textbox below:
                <span className="ms-2 text-lowercase fw-bolder text-danger">
                  {album?.name}
                </span>
              </Form.Label>
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
            <Button
              disabled={albumInput !== album?.name?.toLowerCase()}
              variant="danger"
              type="submit"
            >
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
