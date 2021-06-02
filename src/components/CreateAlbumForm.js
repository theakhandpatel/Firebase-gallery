import React, { useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { projectFirestore } from "../firebase/config"

function CreateAlbumForm() {
  const [albumInput, setAlbumInput] = useState("")

  function createAlbumFormHandler(e) {
    e.preventDefault()
    projectFirestore
      .collection("albums")
      .add({ name: albumInput })
      .catch((err) => {
        console.log(err)
      })
    setAlbumInput("")
  }

  return (
    <div className="my-3">
      <Form className="w-25 mx-auto" inline onSubmit={createAlbumFormHandler}>
        <InputGroup>
          <Form.Control
            placeholder="Enter new Album's name"
            value={albumInput}
            onChange={(e) => {
              setAlbumInput(e.target.value)
            }}
            type="text"
          />
          <Button className="ml-2" variant="primary" type="submit">
            Create Album
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default CreateAlbumForm
