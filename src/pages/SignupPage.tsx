import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../component/form/Footer';
import { HeaderComponent } from '../component/form/Header';
import "./styles.css"
import homeImg from '../assets/images/home-main-bg.png';
import logoImg from '../assets/images/ava_logo_black.png';
export const SignupPage: React.FC = () => {
  return (
    <div>
      {/* Header section goes to here */}
      <HeaderComponent />

      <main className="main-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="main-top-icon m-auto">
                <Link to="/" >
                  <img src={logoImg} alt="" />
                </Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="col-md-12 py-2">
                <div className="inner-left">
                  <img src={homeImg} alt="" className="img-fluid" />
                  <div className="text-center btn-mobail-con">
                    <Link to="/test-practice" className="btn text-center btn-mobail common-black-button" title="Start Practice">
                      Start Practice
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
              <div className="col-md-12 py-2">
                <div className="signup-form main-signup-form">
                  <form method="POST" action="">
                    <input type="hidden" name="" value="" />
                    <h2>Sign Up</h2>
                    <p className="register-info text-center">Start practising in less than a minute.</p>
                    <div className="form-group ">
                      <input
                        id="name"
                        type="text"
                        className="form-input text-black"
                        placeholder="Full Name"
                        name="name"
                        value=""
                        required
                        autoComplete="off"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        id="email"
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        name="email"
                        value=""
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Phone"
                        className="form-input"
                        name="phone"
                        required
                        autoComplete="off"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        id="collage_name"
                        type="text"
                        placeholder="Collage's Name"
                        className="form-input"
                        name="collage_name"
                        required
                        autoComplete="off"
                      // autoComplete="new-password"
                      />
                    </div>
                    <div className="form-group accept-terms-label my-2 ">
                      <label className="form-check-label">
                        <input className="px-3" type="checkbox" required id="agree" />
                        &nbsp; &nbsp; I accept to the{' '}
                        <Link to="#" target="_blank" title="Privacy Policy">
                          Privacy Policy
                        </Link>
                        ,{' '}
                        <Link to="#" target="_blank" title="Terms of Service">
                          Terms of Service
                        </Link>
                        {' and '}
                        <Link to="#" target="_blank" title="Disclaimer">
                          Disclaimer
                        </Link>
                        .
                      </label>
                    </div>
                    <div className="form-group my-3">
                      <button type="submit" className="btn btn-custom btn-lg w-100" title="Sign Up">
                        Sign Up
                      </button>
                    </div>

                    <div className="text-center small">
                      <h6 className="font-16">
                        Already have an account? <Link to="/login">Login</Link>
                      </h6>
                    </div>
                  </form>
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

//export default SignupPage;
