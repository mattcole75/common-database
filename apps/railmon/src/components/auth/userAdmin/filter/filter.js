import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetUsers } from '../../../../store/actions/index'

const Filter = React.memo(() => {

    const dispatch = useDispatch();

    const [ enteredFilter, setEnteredFilter ] = useState('');

    const { idToken, localId } = useSelector(state => state.auth);

    const inputRef = useRef();

    const onLoadUsers = useCallback((idToken, localId, query, identifier) => {
        dispatch(adminGetUsers(idToken, localId, query, identifier));
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
          if(enteredFilter === inputRef.current.value) {
            const query =
                enteredFilter.length === 0
                ? ''
                : enteredFilter;
            onLoadUsers(idToken, localId, query, 'GET_USERS')
          }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [enteredFilter, inputRef, onLoadUsers, idToken, localId]);

    const refresh = () => {
        const query = enteredFilter.length === 0 ? '' : enteredFilter;
        onLoadUsers(idToken, localId, query, 'GET_USERS');
    }

    return (
        <div className='container d-flex flex-wrap justify-content-center mt-3'>

            <div className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none'>
                <h3 className="heading-primary">
                    <span className='heading-primary_main'>System Users</span>
                </h3>
            </div>
            
            <form className='col-12 col-lg-auto mb-3 mb-lg-0'>
                <input
                    type="search"
                    className='form-control'
                    ref={inputRef}
                    placeholder='Search email...'
                    aria-label='Search'
                    value={enteredFilter}
                    onChange={event => setEnteredFilter(event.target.value)}
                />
            </form>

            <div className='form-floating text-end col-sm-1'>
                <button type='button' className='btn btn-sm p-0'onClick={ refresh }><span className='bi-arrow-clockwise fs-3' /></button>
            </div>
        </div>
    );
});

export default Filter;