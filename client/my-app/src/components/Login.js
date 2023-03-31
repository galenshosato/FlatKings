import {Form, Button} from "react-bootstrap"
import * as React from "react"
export default function Login({ handleSubmit }) {
    return (
      <div>
        <div id='login'>
          <h1>Login</h1>
          <form id='login-form' onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type='text' name='email' />
            <label>Password:</label>
            <input type='text' name='password' />
            <input type='submit' />
          </form>
          <br />
          <div>
            <p>
              Don't have an account?
            </p>
            <a href="/signin">Sign Up</a>
          </div>
        </div>
        <div className="login-form d-flex justify-content-center align-items-center">
          <Form className="bootstrap-form rounded p-4 p-sm-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <h1>Login</h1>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="password"/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    )
  }
