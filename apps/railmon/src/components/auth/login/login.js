import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink } from 'react-router-dom';
import { login } from '../../../store/actions/index';
import { hashPassword } from '../../../shared/utility';

import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

import '../auth.css';

const Login = () => {

    const dispatch = useDispatch();

    const { idToken, loading, error, redirectPath } = useSelector(state => state.auth);
    const isAuthenticated = idToken !== null;

    const onLogin = useCallback((authData, identifier) => dispatch(login(authData, identifier)), [dispatch]);

    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: 'onBlur' });

    // const [applyValidationCss, setApplyValidationCss] = useState(false);

    // useEffect(() => {
    //     if(errors.email || errors.password)
    //         setApplyValidationCss(true);
        
    // }, [errors]);

    const loginHandler = useCallback((data) => {
        const hash = async () => {
            await hashPassword(getValues().password)
                .then(value => {
                    onLogin({ ...data, password: value }, 'LOGIN');
                })
            }
            hash();
    }, [getValues, onLogin]);

    // if(isAuthenticated)
    //     setRedirect(redirectPath);

    let spinner = null;
    if(loading){
        spinner = <Spinner />;
    }

    return (
        <main className='form-auth w-100 m-auto'>
            { isAuthenticated ? <Navigate to={ redirectPath } /> : null }

            <Backdrop show={ loading } />
            { spinner }
            { error && <div className='alert alert-danger' role='alert'>{ error }</div> }

            <form onSubmit={ handleSubmit(loginHandler) }>

                <div className='text-center'>
                    <i className='bi-person-check form-auth_icon'></i>
                    <h1 className='h3 mb-3 fw-normal'>Log In</h1>
                </div>

                <div className='form-floating'>
                    <input type='email' className='form-control form-auth-ele_top' id='email' placeholder='name@example.com' autoComplete='off' required
                    { ...register('email', {
                        required: 'You must specify an Email address',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid Email Address'
                        }
                    })}
                    />
                    <label htmlFor='email'>Email Address</label>
                </div>

                <div className='form-floating'>
                    <input type='password' className='form-control form-auth-ele_bot' id='password' placeholder='Password' autoComplete='new-password' required
                        { ...register('password', { required: 'You must specify a password' }) }
                    />
                    <label htmlFor='password'>Password</label>
                </div>
                
                { errors.email && <p className='form-error mt-1'>{errors.email.message}</p> }
                { errors.password && <p className='form-error'>{errors.password.message}</p> }

                
                <button className='w-100 btn btn-primary mt-3 rounded' type='submit'>Log In</button>
                
                <hr />
                <div className='text-center'>
                    <figcaption className='blockquote-footer mt-3'>New to RailMon?</figcaption>
                    <NavLink 
                        to='/auth/signup'
                        className='btn btn-secondary btn-sm mb-1'>
                        Create a new RailMon account
                    </NavLink>
                    <div className='text-center'>
                        <NavLink 
                            to='/recoverPassword'
                            className='nav-link'>
                            Forgotten password?
                        </NavLink>
                    </div> 
                </div>                
            </form>
        </main>
    );
};

export default Login;