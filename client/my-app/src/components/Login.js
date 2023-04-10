import {Form, Button} from "react-bootstrap"
import * as React from "react"

export default function Login({ handleSubmit }) {
    return (
      <div>

        <div className="login-form d-flex justify-content-center align-items-center">
          <Form className="bootstrap-form rounded p-4 p-sm-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <h1>Login</h1>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <br/>
              <input type='text' name='email' />
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <br/>
              <input type='text' name='password' />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    )
  }
