import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../../../store/actions/index';

const Logout = React.memo(() => {

    const dispatch = useDispatch();
    const onLogout = useCallback(() => dispatch(logout()), [dispatch]);
    const { redirectPath } = useSelector(state => state.auth);

    useEffect(() => {
        onLogout();
	},[onLogout]);

    return (
        <Navigate to={ redirectPath } />
    )
});

export default Logout;