import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        <div className="container">
          <div className="footer-feeds">
            <div className="social-icon mt-3">
              <div className="font-icon">
                <a href="#"><i className="fa-brands fa-square-facebook"></i></a>
              </div>

              <div className="font-icon">
                <a href="#"><i className="fa-brands fa-square-twitter"></i></a>
              </div>

              <div className="font-icon">
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
              </div>

              <div className="font-icon">
                <a href="#"><i className="fa-brands fa-linkedin"></i></a>
              </div>
            </div>
            <div className="footer-links mt-3">
              <div className="links-feed">
                <a href="#"> BLOG</a>
              </div>
              <span>|</span>

              <div className="links-feed">
                <a href="#"> PRIVACY POLICY </a>
              </div>
              <span>|</span>
              <div className="links-feed">
                <a href="#"> COOKIE POLICY </a>
              </div>
              <span>|</span>
              <div className="links-feed">
                <a href="#"> TERMS OF SERVICE</a>
              </div>
            </div>
            <div className="text-center web-link mt-3">
              <p>hello@edusimplified.com</p>
            </div>
            <div className="copyright text-center mt-3 ">
              <p>&copy; Copyright © 2023 candidates.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

//export default Footer;
