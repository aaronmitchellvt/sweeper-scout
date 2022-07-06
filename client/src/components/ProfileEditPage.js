import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import getCurrentUser from "../services/getCurrentUser";

const ProfileEditPage = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [userPayload, setUserPayload] = useState({
    address: "",
    district: ""
  });

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    console.log("Name: ", event.currentTarget.name)
    console.log("Value: ", event.currentTarget.value)
  };

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  let userId = ''
  if(currentUser) {
    // userPayload.address = currentUser.address
    // userPayload.district = currentUser.district
    userId = currentUser.id
    // setUserPayload(currentUser.district)
    // console.log("User from Profile Edit: ", userEmail)
  }
  const editInfo = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(userPayload)
      })
      if (!response.ok) {
        console.log("Error in editInfo")
      } else {
        console.log("successful patch!")
        setShouldRedirect(true);
      }
    }  catch (error) {
        console.log("Error: ", error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("Handle Submit called")
    editInfo()
  }

  if (shouldRedirect) {
    location.href = "/";
  }

  return(<div>
    <Form onSubmit={handleSubmit}>
      {/* <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" value={userPayload.address} name="address" onChange={onInputChange}/>
        <Form.Text className="text-muted">
          Edit your street address.
        </Form.Text>
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={userPayload.address} name="address" onChange={onInputChange} />
            <Form.Text className="text-muted">
              Your home address. Ex. 25 Bennett St
            </Form.Text>
          </Form.Group>

      <select name="district" className="form-select" aria-label="Default select example" onChange={onInputChange}>
            <option selected>Choose your Zone</option>
            <option value="1">Downtown</option>
            <option value="1N">North End</option>
            <option value="1C">Charlestown</option>
            <option value="1S">South End</option>
            <option value="1H">Beacon Hill</option>
            <option value="1B">Back Bay</option>
            <option value="1W">West End</option>
            <option value="1T">Chinatown</option>
            <option value="2">Jamaica Plain, Roslindale</option>
            <option value="3">North Dorchester</option>
            <option value="4">Allston, Brighton</option>
            <option value="5">South Boston</option>
            <option value="6">West Roxbury</option>
            <option value="7">South Dorchester</option>
            <option value="8">Hyde Park</option>
            <option value="9">East Boston</option>
            <option value="10">Roxbury</option>
            <option value="10F">Fenway, Kenmore</option>
            <option value="10M">Mission Hill</option>
            <option value="99">Mass DCR</option>
          </select>
{/* 
      <Form.Group className="mb-3" controlId="formBasicDistrict">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" value={userPayload.district} name ="district" onChange={onInputChange}/>
        <Form.Text className="text-muted">
          Edit your District.
        </Form.Text>
      </Form.Group> */}

      <Button variant="primary" type="submit" className="rounded">
        Submit
      </Button>
    </Form>
  </div>)
}
export default ProfileEditPage