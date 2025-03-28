import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
 
const MenuItems = (props) => {
    
    const { parentMenu } = props;

    const location = useLocation();
    const postURL = location.pathname.split('/'); 
    const pathLength = Number(postURL.length)

    const [home, setHome] = useState(false)
	const [page, setPage] = useState(false)
	const [event, setEvent] = useState(false)
	const [recipient, setrecipient] = useState(false)
	const [blog, setBlog] = useState(false)

	const openMobileMenu = menu => {

		if (menu === 'home') {
			setHome(!home)
			setPage(false)
			setEvent(false)
			setrecipient(false)
			setBlog(false)
		}
		else if (menu === 'page') {
			setHome(false)
			setPage(!page)
			setEvent(false)
			setrecipient(false)
			setBlog(false)
		}
		else if (menu === 'event') {
			setHome(false)
			setPage(false)
			setEvent(!event)
			setrecipient(false)
			setBlog(false)
		}
		else if (menu === 'recipient') {
			setHome(false)
			setPage(false)
			setEvent(false)
			setrecipient(!recipient)
			setBlog(false)
		}
		else if (menu === 'blog') {
			setHome(false)
			setPage(false)
			setEvent(false)
			setrecipient(false)
			setBlog(!blog)
		}
	};

    return (
        <>
            {/* <li className={parentMenu === 'home' ? 'has-sub menu-active' : 'has-sub'}>
                <Link to="/" className={home ? "hash menu-active" : "hash"} onClick={() => { openMobileMenu('home'); }}>
                    Home
                    <span className="arrow "></span>
                </Link>
                <ul className={home ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={location.pathname === "/" ? "menu-active" : ""}>
                        <Link to="/">Home One</Link>
                    </li>
                    <li className={location.pathname === "/home-2" ? "menu-active" : ""}>
                        <Link to="/home-2">Home Two</Link>
                    </li>
                    <li className={location.pathname === "/home-3" ? "menu-active" : ""}>
                        <Link to="/home-3">Home Three</Link>
                    </li>
                </ul>
            </li> */}
            <li className={location.pathname === '/' ? 'menu-active' : ''}>
                <Link to="/">Home</Link>
            </li>

            <li className={location.pathname === "/login" ? "menu-active" : ""}>
                        <Link to="/login">Login</Link>
                    </li>
                     <li className={location.pathname === "/signup" ? "menu-active" : ""}>
                     <Link to="/signup">Register as a Coach</Link>
                 </li>
           {/* <li className={parentMenu === 'page' || parentMenu === 'event'  ? 'has-sub menu-active' : 'has-sub'}>
                <Link to="#" className={ page ? "hash menu-active" : "hash"} onClick={() => { openMobileMenu('page'); }}>
                    Pages
                    <span className="arrow "></span>
                </Link>
                <ul className={page ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={location.pathname === '/about' ? 'menu-active' : ''}>
                        <Link to="/about">About</Link>
                    </li>
                    <li className={location.pathname === "/instructor" ? "menu-active" : ""}>
                        <Link to="/instructor">Instructor</Link>
                    </li>
                    <li className={postURL[1] === "instructor" && pathLength > 2 ? "menu-active" : ""}>
                        <Link to="/instructor/1">Profile</Link>
                    </li>
                    <li className={location.pathname === "/login" ? "menu-active" : ""}>
                        <Link to="/login">Login</Link>
                    </li>
                    <li className={location.pathname === "/signup" ? "menu-active" : ""}>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li className={parentMenu === 'event' ? 'has-sub menu-active' : 'has-sub'}>
                        <Link to="#" className={event ? "hash menu-active" : "hash"} onClick={() => { openMobileMenu('event'); }}>Events</Link>
                        <ul className={event ? "sub-menu sub-menu-open" : "sub-menu"}>
                            <li className={location.pathname === "/event" ? "menu-active" : ""}>
                                <Link to="/event">Events</Link>
                            </li>
                            <li className={location.pathname === "/event-sidebar" ? "menu-active" : ""}>
                                <Link to="/event-sidebar">Events Sidebar</Link>
                            </li>
                            <li className={postURL[1] === "event" && pathLength > 2 ? "menu-active" : ""}>
                                <Link to="/event/1">Event Single</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>

            <li className={parentMenu === 'recipient' ? 'has-sub menu-active' : 'has-sub'}>
                <span className="arrow "></span>
                <Link to="#" className={recipient ? "hash menu-active" : "hash"} onClick={() => { openMobileMenu('recipient'); }}>
                    recipients
                    <span className="arrow "></span>
                </Link>
                <ul className={recipient ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={location.pathname === "/recipient" ? "menu-active" : ""}>
                        <Link to="/recipient">recipient</Link>
                    </li>
                    <li className={location.pathname === "/recipient-sidebar" ? "menu-active" : ""}>
                        <Link to="/recipient-sidebar">Right Sidebar</Link>
                    </li>
                    <li className={location.pathname === "/recipient-list" ? "menu-active" : ""}>
                        <Link to="/recipient-list">recipients List</Link>
                    </li>
                    <li className={postURL[1] === "recipient" && pathLength > 2 ? "menu-active" : ""}>
                        <Link to="/recipient/1">recipient Single</Link>
                    </li>
                </ul>
            </li>

            <li className={parentMenu === 'blog' ? 'has-sub menu-active' : 'has-sub'}>
                <Link to="#" className={blog ? "hash menu-active" : "hash"} onClick={() => { openMobileMenu('blog'); }}>
                    Blog
                    <span className="arrow "></span>
                </Link>
                <ul className={blog ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={location.pathname === "/blog" ? "menu-active" : ""}>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li className={postURL[1] === "blog" && pathLength > 2 ? "menu-active" : ""}>
                        <Link to="/blog/1">Blog Single</Link>
                    </li>
                </ul>
            </li>
            */}
       
        </>
    );
}

export default MenuItems;