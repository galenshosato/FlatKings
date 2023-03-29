import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

function SignupForm(){

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            fetch('/user_info', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values, null, 2)
            })
            // .then((res) => {
            //     if (res.status == 200) {
            //         pass // should be setState ** ASK BEN ABOUT REFRESH PAGE!!!!!
            //     }
            // })
        }
    


    })

    console.log(formik)


    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={formik.handleSubmit} >
                <br/>
                <label>Email Address:</label>
                <br/>
                <input
                    id='email'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <br/>
                <label>Password:</label>
                <br/>
                <input
                    id='password'
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignupForm;