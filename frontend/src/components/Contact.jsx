import React from 'react';  
import '../styles/Contact.css';  
import "../styles/Header.css";  
import Header from './Header';  
import Myimage from "../sources/img.png";  
import vinay from "../sources/vinay.png";  
import varsha from "../sources/Varsha.png";  
import mohan from "../sources/Mohan.png";  
import shevarthana from "../sources/Shevarthana.png";  
import sanjay from "../sources/Sanjay.png"
import supriya from "../sources/supriya.png"

const Contact = () => {  
  return (  
    <div>  
      <Header />  
      <section id="contact" className="contact-page">   
          <div className="contact-section">  
            <div className="left">  
              <h2>Harish P</h2>  
              <p>BTech student specializing in Artificial Intelligence and Data Science.</p>  
              <p>Role: Frontend - Web Design, Backend - Data Storage, Integration.</p>  
              <p>Email: 22d118@psgitech.ac.in</p>
              <p>Contact : 96008 18357</p>   
              <p>LinkedIn: <a href="https://www.linkedin.com/in/harish-p-645aba317/" target="_blank" rel="noopener noreferrer">linkedin.com</a></p>  
            </div>  
            <div className="right">  
              <img src={Myimage} alt="Harish" />  
            </div>  
          </div>  

          <div className="contact-section">  
            <div className="left">  
              <h2>Vinay Shrivatsan J T</h2>  
              <p>BTech student specializing in Artificial Intelligence and Data Science.</p>  
              <p>Role: Model Development</p>  
              <p>Email: 22d158@psgitech.ac.in</p>
              <p>Contact : 99449 32392</p>     
              <p>LinkedIn: <a href="https://www.linkedin.com/in/vinay-shrivatsan-j-t-psgitech-984639323/" target="_blank" rel="noopener noreferrer">linkedin.com</a></p>  
            </div>  
            <div className="right">  
              <img src={vinay} alt="Vinay" />  
            </div>  
          </div>  

          <div className="contact-section">  
            <div className="left">  
              <h2>Varsha K</h2>  
              <p>BTech student specializing in Artificial Intelligence and Data Science.</p>  
              <p>Role: Model Development</p>  
              <p>Email: 22d157@psgitech.ac.in</p>
              <p>Contact : 70944 46023</p>   
              <p>LinkedIn: <a href="https://www.linkedin.com/in/varsha-kumaraguru?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">linkedin.com</a></p>  
            </div>  
            <div className="right">  
              <img src={varsha} alt="Varsha" />  
            </div>  
          </div>  

          <div className="contact-section">  
            <div className="left">  
              <h2>MohanRagul G</h2>  
              <p>BTech student specializing in Artificial Intelligence and Data Science.</p>  
              <p>Role: Model Development</p>  
              <p>Email: 22d129@psgitech.ac.in</p>
              <p>Contact : 63797 43472</p>   
              <p>LinkedIn: <a href="https://www.linkedin.com/in/mohanragul1604?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">linkedin.com</a></p>  
            </div>  
            <div className="right">  
              <img src={mohan} alt="MohanRagul" />  
            </div>  
          </div>  

          <div className="contact-section">  
            <div className="left">  
              <h2>Sanjay Palanisami</h2>  
              <p>BTech student specializing in Artificial Intelligence and Data Science.</p>  
              <p>Role: Model Development</p>  
              <p>Email: 22d140@psgitech.ac.in</p>
              <p>Contact : 74183 56884</p>   
              <p>LinkedIn: <a href="http://www.linkedin.com/in/sanjay-palanisami" target="_blank" rel="noopener noreferrer">linkedin.com</a></p>  
            </div>  
            <div className="right">  
              <img src={sanjay} alt="Sanjay" />  
            </div>  
          </div>  

          <div className="contact-section">  
            <div className="left">  
              <h2>Shevarthna</h2>  
              <p>BTech student specializing in Artificial Intelligence and Data Science.</p>  
              <p>Role: Model Development</p>  
              <p>Email: 22d145@psgitech.ac.in</p>
              <p>Contact : 90437 42323</p>   
              <p>LinkedIn: <a href="https://www.linkedin.com/in/shevarthna-m-737204328" target="_blank" rel="noopener noreferrer">linkedin.com</a></p>  
            </div>  
            <div className="right">  
              <img src={shevarthana} alt="Shevarthana" />  
            </div>    
          </div>

          <div className="contact-section">  
            <div className="left">  
              <h2>Supriya</h2>  
              <p>BTech student specializing in Artificial Intelligence and Data Science.</p>  
              <p>Role: Model Development</p>  
              <p>Email: 22d152@psgitech.ac.in</p>
              <p>Contact : 96774 10477</p>   
              <p>LinkedIn: <a href="http://www.linkedin.com/in/supriya-raja" target="_blank" rel="noopener noreferrer">linkedin.com</a></p>  
            </div>  
            <div className="right">  
              <img src={supriya} alt="Supriya" />  
            </div>  
          </div>   
      </section>  
    </div>  
  );  
};  

export default Contact;