import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../component/form/Footer';
import { HeaderComponent } from '../component/form/Header';
import "./styles.css"
import homeImg from '../assets/images/home-main-bg.png';
import logoImg from '../assets/images/ava_logo_black.png';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [prospect, setProspect] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();

  const hardcodedEmail = 'example@email.com';
  const hardcodedProspect = 'prospect123';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === hardcodedEmail && prospect === hardcodedProspect) {
      setShowSuccessMessage(true);
      setLoginFailed(false);
      localStorage.setItem('authToken', 'mockToken');
      setTimeout(() => {
        navigate("/system-config");
      }, 2000);
    } else {
      // Add logic for unsuccessful login
      setLoginFailed(true);
      setShowSuccessMessage(false);

      console.log('Login failed. Email or prospect does not match.');
    }
  };
  const closePopup = () => {
    setLoginFailed(false);
  };
  return (
    <div>
      {/* Header section goes to here */}
      <HeaderComponent />

      <main className="main-bg">
        <div className="container">
          {loginFailed && (
            <div className="overlay">
              <div className="popup">
                <div className="text-danger py-3">
                 <h4> Login failed. Please sign up.!</h4>
                </div>

                <button className="btn btn-primary py-2" onClick={closePopup}>Close</button>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-12 ">
              <div className="main-top-icon m-auto">
              <Link to="/">
                <img src={logoImg} alt="" />
                </Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="col-md-12 py-2">
                <div className="inner-left">
                  <img src={homeImg} alt="" className="img-fluid" />
                  <div className="text-center btn-mobail-con">
                    <Link to="#" className="btn text-center btn-mobail common-black-button" title="Start Practice">
                      Start Practice
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
              <div className="col-md-12 py-2">
                <div className="signup-form">
                  <form onSubmit={handleSubmit}>
                    <div className="steps">
                      <h2>Login</h2>
                      <div className="form-group d-flex justify-content-center">
                        <div className="w-100 form-groupp">
                          <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="form-input text-black"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="form-group d-flex justify-content-center">
                        <div className="w-100 form-groupp">
                          <input
                            id="prospect"
                            type="text"
                            placeholder="Prospect"
                            className="form-input text-black"
                            name="prospect"
                            value={prospect}
                            onChange={(e) => setProspect(e.target.value)}
                            required
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="my-3 form-group d-flex justify-content-center">
                        <button type="submit" className="btn btn-custom width-100-px pointer show-step-2 w-100" title="Continue">
                          Continue
                        </button>
                      </div>
                      <div className="text-center">
                        <h6 className="">Don't have an account? <Link to="/sign-up" title="Sign up here!">Sign up here!</Link></h6>
                      </div>
                    </div>
                  </form>
                  {showSuccessMessage && (
                    <div className="alert alert-success" role="alert">
                    <h4>  Login successful! Redirecting...</h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* footer secotion goest to here */}
      <Footer />
    </div>
  );
};

//export default LoginPage;
