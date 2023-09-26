import React from 'react';
import NavigationItem from '../navigationItem/navigationItem';
import NavigationListItem from '../navigationListItem/navigationListItem';

const Navigation = (props) => {

    const { isAuthenticated } = props;


    return (
        // <ul className='nav nav-pills'>
        <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
            <NavigationItem link='/' icon='bi-house-door'>Home</NavigationItem>

            <div className='dropdown text-end'>
                <a href='/' className='nav-link text-white dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
                    <i className='bi-person fs-3 d-block text-sm-center' />
                    Profile
                </a>
                <ul className='dropdown-menu text-small' aria-labelledby='dropdownProfile'>
                    { isAuthenticated
                        ?	<NavigationListItem link='/auth/profile' icon='bi-person'> Profile</NavigationListItem>
                        :	null
                    }
                    { isAuthenticated
                        ?   <NavigationListItem link='/auth/logout' icon='bi-person-x'> Logout</NavigationListItem>
                        :   <NavigationListItem link='/auth/login' icon='bi-person-check'> Login</NavigationListItem>
                    }
                </ul>
            </div>
        </ul>
    );
}

export default Navigation;