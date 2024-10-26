import { useNavigate, Link } from 'react-router-dom';  
import axios from 'axios';  
import '../styles/SignUp.css';  
import { useState } from 'react';

function Signup() {  
    const [userId, setUserId] = useState('');  
    const [password, setPassword] = useState('');  
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [message, setMessage] = useState('');  
    const navigate = useNavigate();  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        if (password !== confirmPassword) {  
            setMessage("Passwords don't match");  
            return;  
        }  

        try {  
            const response = await axios.post('/api/signup', { userId, password });  
            setMessage(response.data.message);  
            if (response.status === 201) {  
                navigate('/login');  
            }  
        } catch (error) {  
            setMessage(error.response.data.message);  
        }  
    };  

    return (  
        <div className="signup-container">  
            <h1>Sign Up</h1>  
            <form className="signup-form" onSubmit={handleSubmit}>  
                <div className="input-group">  
                    <label htmlFor="userId">User Id</label>  
                    <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} required />  
                </div>  
                <div className="input-group">  
                    <label htmlFor="password">Password</label>  
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />  
                </div>  
                <div className="input-group">  
                    <label htmlFor="confirm-password">Confirm Password</label>  
                    <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />  
                </div>  
                <button type="submit" className="signup-btn">Sign Up</button>  
                <p className="login-link">Already have an account? <Link to="/login">Log In</Link></p>  
            </form>    
            {message && <p>{message}</p>}  
        </div>  
    );  
}  

export default Signup;  