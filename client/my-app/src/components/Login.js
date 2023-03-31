import {Form, Button} from "react-bootstrap"

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

        {/* <Form>

        </Form> */}
        
      </div>
    )
  }
  