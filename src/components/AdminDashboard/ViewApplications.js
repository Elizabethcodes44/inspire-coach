import React from 'react';
import AdminBreadcrumb from '../Breadcrumb/AdminBreadcrumbs';
import ViewApplicationsMain from './ViewApplicationsMain';
import ScrollToTop from '../ScrollTop';

const ViewApplications = () => {
    return (
        <div className="react-wrapper">
            <div className="react-wrapper-inner">
                <AdminBreadcrumb pageTitle="View Application" />
                <ViewApplicationsMain />
                <ScrollToTop />
            </div>
        </div>
    );
};

export default ViewApplications;
