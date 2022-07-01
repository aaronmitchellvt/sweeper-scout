import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    address: "",
    district: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    validateInput(userPayload);
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldRedirect(true);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    console.log("Name: ", event.currentTarget.name)
    console.log("Value: ", event.currentTarget.value)
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <>
      {/* <div className="grid-container">
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>
              Email
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              Home Address
              <input type="text" name="address" value={userPayload.address} onChange={onInputChange} />
              <FormError error={errors.RegistrationForm} />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div>
            <label>
              Password Confirmation
              <input
                type="password"
                name="passwordConfirmation"
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
              />
              <FormError error={errors.passwordConfirmation} />
            </label>
          </div>
          <div>
            <input type="submit" className="button" value="Register" />
          </div>
        </form>
      </div> */}


      <div>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={userPayload.email}placeholder="Enter email" name ="email" onChange={onInputChange}/>
            <Form.Text className="text-muted">
              Use an email address you get notifications on.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={userPayload.address} placeholder="Address" name="address" onChange={onInputChange} />
            <Form.Text className="text-muted">
              Your home address. Ex. 25 Bennett St
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDistrict">
            <Form.Label>District</Form.Label>
            <Form.Control type="text" value={userPayload.district} placeholder="District" name="district" onChange={onInputChange} />
            <Form.Text className="text-muted">
              Your district. Ex. Roxbury
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={userPayload.password} name="password" placeholder="Password" onChange={onInputChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" value={userPayload.passwordConfirmation} placeholder=" Confirm Password" name="passwordConfirmation" onChange={onInputChange} />
          </Form.Group>

          <Button variant="primary" type="submit" className="rounded">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default RegistrationForm;
