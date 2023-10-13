import React, { Suspense, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/layout';
import { authCheckState } from './store/actions/index';

const App = () => {

    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.idToken !== null);
    const roles = useSelector(state => state.auth.roles);
    const isAdministrator = roles.includes('administrator');

    const onTryAutoLogin = useCallback(() => dispatch(authCheckState()),[dispatch]);

    useEffect(() => {
        onTryAutoLogin();
    }, [onTryAutoLogin]);


    const Index = React.lazy(() => {
        return import('./components/index/index');
    });
    const Login = React.lazy(() => {
        return import('./components/auth/login/login');
    });
    const Logout = React.lazy(() => {
        return import('./components/auth/logout/logout');
    });
    const Signup = React.lazy(() => {
		return import('./components/auth/signup/signup');
	});
    const Profile = React.lazy(() => {
        return import('./components/auth/profile/profile');
    });
    const Monitoring = React.lazy(() => {
        return import('./components/landing/monitoringLanding');
    });
    const Users = React.lazy(() => {
        return import('./components/auth/userAdmin/users');
    });

    const routes = (
        <Routes>
            <Route path='/' element={ <Index /> } />
            <Route path='/auth/login' element={ <Login /> } />
            <Route path='/auth/logout' element={ <Logout /> } />
            <Route path='/auth/signup' element={ <Signup /> } />

            { isAuthenticated && <Route path='/auth/profile' element={ <Profile /> } /> }
            { isAuthenticated && <Route path='/monitoring' element={ <Monitoring /> } /> }

            { isAuthenticated && isAdministrator && <Route path='/admin/users' element={ <Users /> } /> }

            <Route path='*' element={ <Index /> } />
        </Routes>
    );

    return (
        <div>
            <Layout isAuthenticated={ isAuthenticated } roles={ roles }>
                <Suspense fallback={ <p>Loading...</p>}>{ routes }</Suspense>
            </Layout>
        </div>
  );
}

export default App;
