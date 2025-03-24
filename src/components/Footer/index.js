
import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logos/inspire-coach-logo.png';

const Footer = (props) => {
    const { footerLogo, footerClass } = props;
    return (
        <>
            <footer id="react-footer" className={footerClass ? footerClass : 'react-footer home-main'}>
                

                <div className="copyright">  
                    <div className="container">                  
                        <div className="react-copy-left">© 2025 <Link to="/">InspireCoach.</Link> All Rights Reserved</div>
                        <div className="react-copy-right">
                            <ul className="social-links">
                                {/* <li className="follow">Follow us</li> */}
                                {/* <li><Link to="#"><span aria-hidden="true" className="social_facebook"></span></Link></li>
                                <li><Link to="#"><span aria-hidden="true" className="social_twitter"></span></Link></li>
                                <li><Link to="#"><span aria-hidden="true" className="social_linkedin"></span></Link></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;