import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { hashPassword } from '../../../shared/utility';
import { signup } from '../../../store/actions/index';

import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const Signup = () => {

    const dispatch = useDispatch();

    const { idToken, loading, error, redirectPath, identifier } = useSelector(state => state.auth);
    const isAuthenticated = idToken !== null;

    const [showModal, setShowModal] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const onSignup = useCallback((authData, identifier) => dispatch(signup(authData, identifier)), [dispatch]);
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm({ mode: 'onBlur' });
    
    const inputRef = useRef({});
    inputRef.current = watch('password');

    const toggleModal = () => {
        setRedirect(true);
    }

    useEffect(() => {
        console.log('show modal', loading, error, identifier);
        if(loading === true && error === null && identifier === 'SIGNUP'){
            setShowModal(true);
        }
    }, [error, loading, identifier]);

    const signupHandler = useCallback((data) => {
        const hash = async () => {
            await hashPassword(getValues().password)
                .then(value => {
                    onSignup({
                        displayName: data.displayName,
                        email: data.email,
                        password: value
                    }, 'SIGNUP');
                })
            }
            hash();
    }, [getValues, onSignup]);

    let modal = null;
    if(showModal === true) {
        modal = <Modal
            show={ showModal }
            modalClosed={ toggleModal }
            content={
                <div>
                    <div className="modal-header">
                        <h5 className="modal-title text-success">Success... New account created</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ toggleModal }></button>
                    </div>
                    <div className="modal-body">
                        <p>Your new account has been created but is currently disabled. Our administrator will review your account and get back to you within 24 hours</p>
                    </div>
                    <div className="modal-footer">
                        <button type='button' className='btn btn-lg btn-primary w-100 mx-0' data-bs-dismiss='modal' onClick={ toggleModal }>Close</button>
                    </div>
                </div>
            } />;
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />
    
    return (
        <main className='form-auth w-100 m-auto'>
            { isAuthenticated ? <Navigate to={ redirectPath } /> : null }
            { modal }
            {redirect && <Navigate to='/auth/login' />}
            
            <Backdrop show={ loading } />
            { spinner }
            { error && <div className='alert alert-danger' role='alert'>{ error }</div> }
            
            <form onSubmit={ handleSubmit(signupHandler) }>
                <div className='text-center'>
                    <i className='bi-person-plus form-auth_icon'></i>
                    <h1 className='h3 mb-3 fw-normal'>Sign-Up</h1>
                </div>

                <div className='form-floating'>
                    <input type='text' className='form-control form-auth-ele_top' id='displayName' placeholder='Your name' autoComplete='off' required minLength={6} maxLength={32}
                    { ...register('displayName', {
                        required: "You must specify a Display Name",
                        minLength: {
                            value: 6,
                            message: "Display Name must have at least 6 characters"
                        },
                        maxLength: {
                            value: 32,
                            message: 'Display Name must have less than 32 characters'
                        }
                    }) }
                    />
                    <label htmlFor='displayName'>Display Name</label>
                </div>

                <div className='form-floating'>
                    <input type='email' className='form-control form-auth-ele_mid' id='email' placeholder='name@example.com' autoComplete='off' required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                    { ...register('email', {
                        required: "You must specify an Email address",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email Address"
                        }
                    })}
                    />
                    <label htmlFor='email'>Email Address</label>
                </div>
                <div className='form-floating'>
                    <input type='password' className='form-control form-auth-ele_mid' id='password' placeholder='Password' autoComplete='off' required pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" ref={ inputRef }
                    { ...register('password', {
                        required: "You must specify a password",
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                            message: "Minimum eight characters, at least one letter, one number and one special character"
                        }
                    }) }
                    />
                    <label htmlFor='password'>Password</label>
                </div>
                <div className='form-floating mb-3'>
                    <input type='password' className='form-control form-auth-ele_bot' id='passwordConfirm' placeholder='Password' autoComplete='off'
                    { ...register('passwordRepeat', {
                        validate: value =>
                        value === inputRef.current || "The passwords do not match"
                    }) }
                    />
                    <label htmlFor='passwordConfirm'>Confirm Password</label>
                </div>
                { errors.displayName && <p className='form-error mt-1'>{errors.displayName.message}</p> }
                { errors.email && <p className='form-error mt-1'>{errors.email.message}</p> }
                { errors.password && <p className='form-error '>{errors.password.message}</p> }
                { errors.passwordRepeat && <p className='form-error mt-1'>{errors.passwordRepeat.message}</p> }

                <button className='w-100 btn btn-lg btn-primary' type='submit'>Sign-Up</button>
            </form>
        </main>
    );
}

export default Signup;