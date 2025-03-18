import { Link } from 'react-router-dom';

import errorImg from '../../assets/images/404.png'

const ErrorContent = () => {
	return (
		<div className="page-error">
            <div className="container">
                <div id="content">
                    <div id="primary" className="content-area">
                        <main id="main" className="site-main">    
                            <section className="error-404 not-found">    
                                <div className="page-content">
                                    <img className="error-image" src={errorImg} alt="Error Image" />
                                    <h2>
                                        <span>404. Page not found</span>                      
                                        Sorry, we couldn’t find the page you where looking for. We suggest that you return to homepage.
                                    </h2>
                                    <Link id="error-page-home-link" to="/">Back to Homepage</Link>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>   
        </div>
	);
}

export default ErrorContent;