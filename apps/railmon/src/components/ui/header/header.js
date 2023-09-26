import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../navigation/header/navigation';
import './header.css';

const Header = (props) => {

    const { showSidebar, toggleShowSidebar, isAuthenticated} = props; 

    return (
        <div className='container'>
            <header className='bg-dark navbar sticky-top flex-md-nowrap px-3 py-2 border-bottom'>
                <div className='w-100 d-flex align-items-center justify-content-between col-md-3 col-lg-2 fs-6'> 

                        <Link to='/' className='d-flex align-items-center mb-md-0 me-md-auto link-body-emphasis text-decoration-none'>
                            <i className='bi-robot fs-1 me-4' />
                            <p className='h1 mb-0'>RailMon</p>
                        </Link>

                        <button 
                            className='navbar-toggler d-md-none collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#sidebarMenu'
                            aria-controls='sidebarMenu'
                            aria-expanded={ showSidebar }
                            aria-label='Toggle navigation'
                            onClick={ toggleShowSidebar }
                        >
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        
                        <div className='header-navigation_display'>
                            <Navigation isAuthenticated={ isAuthenticated } />
                        </div>

                </div>
            </header>
        </div>
    );
}

export default Header;