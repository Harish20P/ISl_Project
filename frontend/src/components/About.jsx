import React from 'react';
import "../styles/Header.css"
import Header from './Header';
import "../styles/About.css"
import target from "../sources/target.png"
import mike from "../sources/mike.png"
import sign from "../sources/hello.png"
import text from "../sources/text.png"
import abc from "../sources/abc.png"
import img1 from "../sources/image.png"

const About = () => {
  return (
    <div>
        <Header />
        <div className="about-container">
          <section className="project-description">  
            <img src={target} alt="Target icon for mission" />
              <div className="text-content">
                <p>Our Mission</p>
                <p>
                  Bridge communication between hearing and hearing-impaired communities by converting Indian Sign Language (ISL) into text and audio formats, creating an intuitive platform that enhances understanding and accessibility for all.
                </p>
              </div>
            </section>

            <section className="conversion-section">
              <div className="conversion-block text-to-alnum">
                  <div className="conversion-icon-row">
                      <img src={text} alt="Text icon" />
                      <p>To</p>
                      <img src={abc} alt="Alphabet icon" />
                  </div>
                  <h3>Text to Alphabets/Nums</h3>
                  <p>
                      Convert written text into ISL signs for individual letters and numbers, making it easier to understand text structure.
                  </p>
              </div>

              <div className="conversion-block alnum-to-text">
                  <div className="conversion-icon-row">
                      <img src={abc} alt="Alphabet icon" />
                      <p>To</p>
                      <img src={text} alt="Text icon" />
                  </div>
                  <h3>Alphabets/Nums to Text</h3>
                  <p>
                      Translate ISL signs of alphabets and numbers back into readable text for easy interpretation.
                  </p>
              </div>

              <div className="conversion-block text-to-img">
                  <div className="conversion-icon-row">
                      <img src={text} alt="Text icon" />
                      <p>To</p>
                      <img src={img1} alt="Img icon" />
                  </div>
                  <h3>Text to Image Conversion</h3>
                  <p>
                      Transform written text into related images for better visualization of content.
                  </p>
              </div>

              <div className="conversion-block img-to-text">
                  <div className="conversion-icon-row">
                      <img src={img1} alt="Img icon" />
                      <p>To</p>
                      <img src={text} alt="Text icon" />
                  </div>
                  <h3>Image to Text Conversion</h3>
                  <p>
                      Convert images into descriptive text for a clearer understanding of visual content.
                  </p>
              </div>

              <div className="conversion-block audio-to-isl">
                  <div className="conversion-icon-row">
                      <img src={mike} alt="Mike icon" />
                      <p>To</p>
                      <img src={sign} alt="Sign icon" />
                  </div>
                  <h3>Audio to ISL Conversion</h3>
                  <p>
                      This feature allows users to convert spoken audio into ISL signs. By recognizing
                      audio input, the system translates it into sign language for easier understanding.
                  </p>
              </div>

              <div className="conversion-block text-to-isl">
                  <div className="conversion-icon-row">
                      <img src={text} alt="Text icon" />
                      <p>To</p>
                      <img src={sign} alt="Sign icon" />
                  </div>
                  <h3>Text to ISL <br></br> Conversion</h3>
                  <p>
                      Users can enter written text and see it converted into ISL signs. This feature
                      aims to make communication seamless for users who prefer written inputs.
                  </p>
              </div>

              <div className="conversion-block isl-to-text">
                  <div className="conversion-icon-row">
                      <img src={sign} alt="Sign icon" />
                      <p >To</p>
                      <img src={text} alt="Text icon" />
                  </div>
                  <h3>ISL to Text <br></br> Conversion</h3>
                  <p>
                      This feature allows users to convert ISL signs back into written text, making
                      it easy for those unfamiliar with ISL to understand sign language communication.
                  </p>
              </div>
          </section>
      </div>
    </div>
  );
};

export default About;