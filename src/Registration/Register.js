/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/UserContext';
import Swal from 'sweetalert2';

const Register = () => {
    const [error, setError] = useState(null);
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password should be more than 6 characters',
                position: 'top'
            });
            setError('Password should be more than 6 characters');
            return;
        }
        if (password !== confirm) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Passwords don't match",
                position: 'top',
                timer: 1000
            });
            setError("Passwords don't match");
            return;
        }

        createUser(email, password)
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Welcome',
                    position: 'top',
                    timer: 1000
                });
                form.reset();
                navigate('/');
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name='confirm' placeholder="Confirm Password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <p>
                            Already have an account? <span className='text-[#FF9900] btn btn-link'><Link to='/login'>Log In</Link></span>
                        </p>
                    </form>
                </div>
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. <br />
                        Quaerat fugiat ut assumenda excepturi exercitationem quasi. <br />
                        In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
