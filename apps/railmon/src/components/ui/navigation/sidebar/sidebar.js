import React from 'react';
import Backdrop from '../../backdrop/backdrop';
import NavigationListItem from '../navigationListItem/navigationListItem';
import './sidebar.css';

const Sidebar = (props) => {

    const { showSidebar, toggleShowSidebar, isAuthenticated, roles} = props;
    const isAdministrator = roles.includes('administrator', 0);

    let attachedStyles = null;
    if(showSidebar)
        attachedStyles = ['sidebar', 'open'];
    else
        attachedStyles = ['sidebar', 'close'];

    return (
            <React.Fragment>
                <Backdrop show={ showSidebar } clicked={ toggleShowSidebar } />
                <div className={ attachedStyles.join(' ')}>
                    <nav>
                        <ul className='nav nav-pills flex-column mb-auto'>
                            <NavigationListItem link='/' icon='bi-house-door' click={ toggleShowSidebar }> Home</NavigationListItem>
                            { isAuthenticated
                                ?   <NavigationListItem link='/monitoring' icon='bi-alt' click={ toggleShowSidebar }> Monitoring</NavigationListItem>
                                :   null
                            }
                            <li><hr /></li>
                            { isAuthenticated
                                ?	<NavigationListItem link='/auth/profile' icon='bi-person' click={ toggleShowSidebar }> Profile</NavigationListItem>
                                :	null
                            }
                            { isAuthenticated && isAdministrator
                                ?   <NavigationListItem link='/admin/users' icon='bi-people' click={ toggleShowSidebar }> User Admin</NavigationListItem>
                                :   null
                            }
                            <li><hr /></li>     
                            { isAuthenticated
                                ?   <NavigationListItem link='/auth/logout' icon='bi-person-x' click={ toggleShowSidebar }> Logout</NavigationListItem>
                                :   <NavigationListItem link='/auth/login' icon='bi-person-check' click={ toggleShowSidebar }> Login</NavigationListItem>
                            }
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
    );
}

export default Sidebar;