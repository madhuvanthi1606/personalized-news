import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
const Navbar = ({ user, setSearchQuery }) => {
    const [query, setQuery]=useState('');
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(query);
    };
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
    return (
        <nav className="navbar">
        <Link to="/" className="navbar-brand"><h1>NewsHub 📰</h1></Link>
        <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for news..." 
        />
        <button type="submit">Search</button>
        </form>
        <div className="navbar-links">
            {user ? (
            <>
                <span>Welcome, {user.email}</span>
                <button onClick={handleLogout}>Logout</button>
            </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </div>
        </nav>
    );
};
export default Navbar;