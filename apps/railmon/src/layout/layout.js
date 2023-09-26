import React, { useState } from 'react';
import Header from '../components/ui/header/header';
import Sidebar from '../components/ui/navigation/sidebar/sidebar';
import Footer from '../components/ui/footer/footer';

const Layout = (props) => {

    const { roles, isAuthenticated } = props;

    const [showSidebar, setShowSidebar] = useState(false);

    const toggleShowSidebar = () => {
        setShowSidebar(prevState => !prevState);
    }

    return (
        <React.Fragment>
            <Header showSidebar={ showSidebar } toggleShowSidebar={ toggleShowSidebar } isAuthenticated={ isAuthenticated } roles={ roles } />
            <Sidebar showSidebar={ showSidebar } toggleShowSidebar={ toggleShowSidebar } isAuthenticated={ isAuthenticated } roles={ roles } />
            <main className='align-items-center'>
                { props.children }
            </main>
            <Footer />
        </React.Fragment>
    );
}

export default Layout;