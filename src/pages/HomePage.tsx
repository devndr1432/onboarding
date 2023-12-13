import React, { useEffect, useState } from 'react';
import { Footer } from '../component/form/Footer';
import { HeaderComponent } from '../component/form/Header';
import homeImg from '../assets/images/home-main-bg.png';
import logoImg from '../assets/images/ava_logo_black.png';

import { Link } from 'react-router-dom';
import "./styles.css"

export const HomePage: React.FC = () => {
  const [index, setIndex] = useState(0);

  const items = [
    "Practice.PrACTice.Now",
    "Practice.Makes.Luck",
    "Practice.Boosts.Confidence",
    "Practice.Improve.Repeat",
    "Practice.Practice.Perfect"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [index, items.length]);

  return (
    <div>
      {/* Header section goes to here */}
      <HeaderComponent />
      <main className="main-bg">
        {/* Rest of your main content */}
        <div className='container-fluid'>
          <div className="row">
            <div className="col-md-12">
              <div className="main-top-icon m-auto">
                <Link to="/">
                  <img src={logoImg} alt="" />
                </Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="col-md-12 py-2">
                <div className="inner-left">
                  <Link to="/">
                    <img src={homeImg} alt="" className="img-fluid" />
                  </Link>
                  <div className="text-center btn-mobail-con">
                    <Link to="/test-practice" className="btn btn-mobail text-center common-black-button mx-2" title="Start Practice">
                      Start Practice
                    </Link>

                    <Link to="/live-quiz" className="btn text-center btn-mobail common-black-button mx-2" title="Start Live">
                      Start Live
                    </Link>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
              <div className="col-md-12 py-2">
                <div className="inner">
                  <div className="item active">
                    <h3 className="text-dark text-center">
                      {items[index].split('.').map((part, i) => (
                        i % 2 === 0 ? <span key={i} className="text-dark">{part}</span> : <span key={i} className="text-white">{part}</span>
                      ))}
                    </h3>
                  </div>
                  <div className="inner-content">
                    <p>
                      Video Essay or Asynchronous Video Assessment (AVA) is an increasingly popular method of evaluating and screening candidates today. More than 50 universities worldwide and countless organisations are using it as a first point of contact with candidates.&nbsp;Use
                      AVA, to practice and make a lasting first impression.
                    </p>
                  </div>
                  <div className="text-center">
                    <Link to="/test-practice" className="btn btn-desk text-center common-black-button mx-2" title="Start Practice">
                      Start Practice
                    </Link>

                    <Link to="/live-quiz" className="btn text-center btn-desk common-black-button mx-2" title="Start Live">
                      Start Live
                    </Link>
                  </div>
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

//export default HomePage;
