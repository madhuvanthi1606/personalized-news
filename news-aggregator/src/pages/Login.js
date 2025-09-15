import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [isSignUp, setIsSignUp]=useState(false);
    const [error, setError]=useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate('/'); 
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
                <p onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </p>
            </form>
        </div>
    );
};
export default Login;