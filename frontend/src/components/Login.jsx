import { useNavigate, Link } from 'react-router-dom';  
import axios from 'axios';  
import "../styles/Login.css";  
import { useState } from 'react';

function Login() {  
    const [userId, setUserId] = useState('');  
    const [password, setPassword] = useState('');  
    const [message, setMessage] = useState('');  
    const navigate = useNavigate();  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        try {  
            const response = await axios.post('/api/login', { userId, password });  
            setMessage(response.data.message);  
            if (response.status === 200) {  
                navigate('/main'); // Redirect to main page
            }  
        } catch (error) {  
            setMessage(error.response.data.message);  
        }  
    };  

    return (  
        <div className="login-container">  
            <h1>Login</h1>  
            <form className="login-form" onSubmit={handleSubmit}>  
                <div className="input-group">  
                    <label htmlFor="userId">User Id</label>  
                    <input 
                        type="text" 
                        id="userId" 
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)} 
                        required 
                    />  
                </div>  
                <div className="input-group">  
                    <label htmlFor="password">Password</label>  
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />  
                </div>  
                <button type="submit" className="login-btn">Login</button>  
                <p className="signup-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>  
            </form>   
            {message && <p>{message}</p>}  
        </div>  
    );  
}  

export default Login;  