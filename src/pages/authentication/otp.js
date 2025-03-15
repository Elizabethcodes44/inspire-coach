import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import OtpMain from './OtpMain.js';
import ScrollToTop from '../../components/ScrollTop';

import Logo from '../../assets/images/logos/inspire-coach-logo.png';


const OTP = () => {
    return (
        <>
            <Header
                parentMenu='page'
                menuCategoryEnable='enable'
                headerNormalLogo={Logo}
                headerStickyLogo={Logo}
            />

            <div class="react-wrapper">
                <div class="react-wrapper-inner">
                    <Breadcrumb
                        pageTitle="Verify Your Email Adress"
                    />

                    <OtpMain />

                    {/* scrolltop-start */}
                    <ScrollToTop />
                    {/* scrolltop-end */}
                </div>
            </div>

            <Footer />

        </>
    );
}


export default OTP;

