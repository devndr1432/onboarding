import React, { useEffect, useState, useRef } from 'react';
import '../assets/css/Landing.css'; // Import your CSS file
import image1 from "../assets/images/image_1.webp"
import image2 from "../assets/images/computer.png"
import web_logo from "../assets/images/web_logo.svg"
import { Link, useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('authToken')));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggle = () => {
    if (navbarRef.current) {
      // Toggle the display property of the navbar
      const displayValue = navbarRef.current.style.display === 'none' || navbarRef.current.style.display === '' ? 'block' : 'none';
      navbarRef.current.style.display = displayValue;
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <div>
      <header id="header" className={scrolled ? 'scrolled' : ''}>
        <div className="navbar-container">
          <div className="web-logo">
            <Link to="/">
              <img src={web_logo} alt="" />
            </Link>
          </div>
          <div>
            <nav className="" id="navbar" ref={navbarRef}>
              <ul>
                <li className="item"><Link to="/">Home</Link></li>

                {isLoggedIn ? (<>
                  <li className="item">
                    <Link to="/landing-page">Dashboard</Link></li>
                  <li className="item com-btn login-btn">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>) : (<>
                  <li className="item com-btn login-btn">
                    <Link to="/login">
                      <button>Log in</button>
                    </Link>
                  </li>
                  <li className="item com-btn login-btn">
                    <Link to="/sign-up">
                      <button>Sign up</button>
                    </Link>
                  </li>
                </>)}
              </ul>
            </nav>
            <div className="toggle-btn" id="toggle-btn" onClick={handleToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                <path style={{ fill: "white" }} d="M16 132h416c8.8 0 16-7.2 16-16V76c0-8.8-7.2-16-16-16H16C7.2 60 0 67.2 0 76v40c0 8.8 7.2 16 16 16zm0 160h416c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h416c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16z" /></svg>

            </div>
          </div>
        </div>
      </header>
      <main>
        <section>
          <div className="hero-image">
            <div className="hero-text">
              <h1 className="my-4">ARE YOU READY FOR <strong>THE CODE CHALLENGE?</strong></h1>
              <h3 className="my-3 "><strong>Become a better developer through fun code challenges and games</strong></h3>
              <Link to="/login">
                <button className="my-3">START TO CODE</button>
              </Link>

            </div>
          </div>
        </section>

        <section>
          <div>
            <div className="container">
              <div className="row justify-content-center gap-5">
                <div className="col-sm-12 col-md-4 col-lg-4">
                  <div className="title">
                    <h3>LEARN PROGRAMMING <strong>FOR FREE</strong></h3>
                  </div>
                  <div className="sub-title">
                    <h4><strong>UP YOUR CODE</strong></h4>
                    <p>Perhaps you are fluent in Java, but want to learn Python? With several programming languages to choose from you have the opportunity to hone your skills and become a better coder. Or learn programming from scratch, free
                      of charge.</p>
                  </div>
                  <div className="sub-title">
                    <h4>
                      <strong>FUN-FOR-ALL CODE CHALLENGES</strong>
                    </h4>

                    <p>Put your programming skills to the test in one of our playful code challenges and see if you have what it takes to rise to the next level. The code challenges are fun, retro inspired games, where the final result is based
                      on the quality of your code. It is a great way to challenge yourself, try out your code and improve your chances to succeed within programming.</p>
                  </div>
                  <div className="sub-title">
                    <h4><strong>LEARN FROM YOUR PEERS</strong></h4>
                    <p>The best way to develop your skills is to be around likeminded enthusiasts. Become a part of our programming forum to pick up new programming languages, compare algorithms and gain insight into different programming solutions.
                      A great way to learn programming from the comfort of your own home, while still being able to ask for help.</p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="col-md-12">
                    <div className="right-img">
                      <img src={image1} alt="" className="img-fluid" />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="h-bg">
            <div className="d-flex ">
              <div className="left-side-content">
                <div className="new-title">
                  <h3 className="text-white">HOW DOES IT <strong>WORK?</strong></h3>
                </div>
                <div className="sub-title">
                  <h4><strong>1. NO MEMBERSHIP NEEDED</strong></h4>
                  <p className="text-white">Start coding! It doesn't get any easier than that.</p>
                </div>
                <div className="sub-title">
                  <h4><strong>2. UNLOCK YOUR POTENTIAL</strong></h4>
                  <p className="text-white">Do you want to develop faster within programming and become a more skilful coder? Unlock more code challenges and track your progress by creating a profile with your Facebook or Google account.</p>
                </div>
                <div className="sub-title">
                  <h4><strong>3. IT STAYS FREE</strong></h4>
                  <p className="text-white">No limits, trial periods or added costs. Everyone should be able to learn programming for free. Just grab a cup of coffee, open up your laptop and start coding!</p>
                </div>
                <div className="new-title-btn">
                  <Link to="/login">
                    <button className="my-3">START TO CODE</button>
                  </Link>
                </div>

              </div>
              <div className="right-side-content ">
                <div className="right-content">
                  <div className="right-first">
                    <img src={image2} alt="" />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};


