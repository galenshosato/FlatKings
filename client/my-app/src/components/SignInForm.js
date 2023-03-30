function SignupForm({formik}){


    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={formik.handleSubmit} >
                <br/>
                <label >Email Address:</label>
                <br/>
                <input
                    id='email'
                    name='email'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <br/>
                <label>Password:</label>
                <br/>
                <input
                    id='password'
                    name='password'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignupForm;