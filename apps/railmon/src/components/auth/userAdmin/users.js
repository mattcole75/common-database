import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminUpdateUser } from '../../../store/actions/index';

import Filter from './filter/filter';
import Users from './list/list';
import AdminForm from './form/adminForm';

import Backdrop from '../../ui/backdrop/backdrop';
import Modal from '../../ui/modal/modal';
import Spinner from '../../ui/spinner/spinner';


const UserAdmin = () => {

    const dispatch = useDispatch();

    const [ user, setUser ] = useState(null);
    const [ editingUser, setEditingUser ] = useState(false);
    
    const { loading, error, idToken, localId, users } = useSelector(state => state.auth);

    const onSave = useCallback((idToken,localId, data, identifier) => {
        dispatch(adminUpdateUser(idToken, localId, data, identifier));
    }, [dispatch]);

    const saveHandler = useCallback((data) => {
        onSave(idToken, localId, data, 'ADMIN_UPDATE');
    }, [idToken, localId, onSave])

    const toggleUserEditing = (user) => {
        setUser(user);
        setEditingUser(prevState => !prevState);
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    let modal = null;
    if(editingUser) {
        modal = <Modal
            show={ editingUser }
            modalClosed={ toggleUserEditing }
            content={
                <AdminForm
                    toggle={ toggleUserEditing }
                    save={ saveHandler }
                    user={ user }
                />
            }
        />;
    }

    return (
        <div className='container'>
            <Backdrop show={ loading } />
            { spinner }
            { error &&
                <div className='alert alert-danger text-wrap text-break' role='alert'>
                    {error}
                </div>
            }
            { modal }

            <div className='u-margin-bottom-small'>
                <Filter />
            </div>

            <div>
                <Users users={users} toggle={toggleUserEditing} />
            </div>

        </div>
    );
}

export default UserAdmin;