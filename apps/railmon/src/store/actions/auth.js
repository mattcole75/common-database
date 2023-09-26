import axios from '../../axios/guardian';
import * as action from './actionTypes';
import { whatIsTheErrorMessage } from '../../shared/errorMessages';

// reducer interface functions
const start = () => {
    return {
        type: action.AUTH_START
    };
}

const success = (idToken, localId, email, displayName, roles, identifier) => {
    return {
        type: action.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
        email: email,
        displayName: displayName,
        roles: roles,
        identifier: identifier
    };
}

const signupSuccess = (identifier) => {
    return {
        type: action.AUTH_SIGNUP_SUCCESS,
        identifier: identifier
    }
}

const finish = () => {
    return {
        type: action.AUTH_FINISH
    };
}

const fail = (error) => {
    return {
        type: action.AUTH_FAIL,
        error: error
    };
}

const reset = () => {
    return {
        type: action.AUTH_RESET
    };
}

const displayNameUpdate = (displayName, identifier) => {
    return {
        type: action.AUTH_UPDATE_DISPLAY_NAME,
        displayName: displayName,
        identifier: identifier
    };
}

const emailUpdate = (email, identifier) => {
    return {
        type: action.AUTH_UPDATE_EMAIL,
        email: email,
        identifier: identifier
    };
}

const passwordUpdate = (identifier) => {
    return {
        type: action.AUTH_UPDATE_PASSWORD,
        identifier: identifier
    };
}

// private functions
const deleteLocalStorage = () => {

    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
    localStorage.removeItem('displayName');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
}

const setLocalStorage = (authData) => {

    const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000);
    localStorage.setItem('idToken', authData.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('localId', authData.localId);
    localStorage.setItem('email', authData.email);
    localStorage.setItem('displayName', authData.displayName);
    localStorage.setItem('roles', JSON.stringify(authData.roles));
}

// exported functions
export const logout = () => {

    const idToken = localStorage.getItem('idToken');
    const localId = localStorage.getItem('localId');

    return dispatch => {

        if (idToken && localId) {

            dispatch(start());

            axios.post('/user/logout', {}, { 
                headers: {
                    'content-type': 'application/json',
                    idToken: idToken,
                    localId: localId
                }
            })
            .then(() => {
                deleteLocalStorage();
                dispatch(reset());
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err))); 
            });
        }
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout({}));
        }, expirationTime * 1000);
    };
}

export const login = (authData, identifier) => {
    return dispatch => {

        dispatch(start());

        axios.post('/user/login', authData)
            .then(res => {
                setLocalStorage(res.data.user);
                dispatch(success(
                    res.data.user.idToken, 
                    res.data.user.localId, 
                    res.data.user.email, 
                    res.data.user.displayName,
                    res.data.user.roles,
                    identifier
                ));

                dispatch(checkAuthTimeout(res.data.user.expiresIn));
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                if(err.response){
                    switch(err.response.status) {
                        case 400:
                            dispatch(fail('400: Server request error. If this problem continues, please contact your system administrator.'))
                            break;
                        case 401:
                            dispatch(fail('401: Server request unauthorised. Please check your email/password and try again.'))
                            break;
                        case 403:
                            dispatch(fail('403: Server request forbidden. If this problem continues, please contact your system administrator.'))
                            break;
                        case 404:
                            dispatch(fail('404: Server request not found. If this problem continues, please contact your system administrator.'))
                            break;
                        case 500:
                            dispatch(fail('500: Internal server error. Please contact your system administrator.'))
                            break;
                        default:
                            dispatch(fail(err.response)); 
                    }
                } else {
                    dispatch(fail('Unknown error. Please contact your administrator.'));
                }
            });
    };
}

export const signup = (authData, identifier) => {
    return dispatch => {

        dispatch(start());

        axios.post('/user', authData)
            .then(res => {
                if(res.status === 201)
                    dispatch(signupSuccess(identifier));
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                if(err.response){
                    switch(err.response.status) {
                        case 400:
                            dispatch(fail('400: Server request error. If this problem continues, please contact your system administrator.'))
                            break;
                        case 409:
                            dispatch(fail('409: Server request error. Please check your email/password and try again.'))
                            break;
                        case 500:
                            dispatch(fail('500: Internal server error. Please contact your system administrator.'))
                            break;
                        default:
                            dispatch(fail(err.response)); 
                    }
                } else {
                    dispatch(fail('Unknown error. Please contact your administrator.'));
                }
            });
    };
}

export const updateDisplayName = (data, idToken, localId, identifier) => {
    return dispatch => {

        dispatch(start());

        const config = { 
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                localId: localId
            }
        };

        axios.patch('/user/displayname', data, config)
            .then(() => {
                dispatch(displayNameUpdate(data.displayName, identifier));
                localStorage.setItem('displayName', data.displayName);
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err))); 
            });
    };
}

export const updateEmail = (data, idToken, localId, identifier) => {
    return dispatch => {

        dispatch(start());

        const config = { 
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                localId: localId
            }
        };

        axios.patch('/user/email', data, config)
            .then(() => {
                dispatch(emailUpdate(data.email, identifier));
                localStorage.setItem('email', data.email);
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err))); 
            });
    };
}

export const updatePassword = (password, idToken, localId, identifier) => {
    return dispatch => {

        dispatch(start());

        const config = { 
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                localId: localId
            }
        };

        axios.patch('/user/password', { password: password }, config)
            .then(() => {
                dispatch(passwordUpdate(identifier));
            })
            .then(() => {
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err))); 
            });
    };
}

export const updateAccount = (authData, idToken, localId, identifier) => {
    return dispatch => {

        dispatch(start());
            
        let url = '/user';

        let config = { 
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                localId: localId
            }
        };

        axios.patch(url, authData, config)
            .then(response => {
                switch (identifier) {

                    case 'DISPLAY_NAME_CHANGE':
                        dispatch(displayNameUpdate(
                            response.data.user.idToken,
                            response.data.user.displayName,
                            identifier
                        ));

                        localStorage.setItem('idToken', response.data.user.idToken);
                        localStorage.setItem('displayName', response.data.user.displayName);

                        break;
                    case 'EMAIL_CHANGE':
                        dispatch(emailUpdate(
                            response.data.user.idToken,
                            response.data.user.email,
                            identifier
                        ));
                            
                        localStorage.setItem('idToken', response.data.user.idToken);
                        localStorage.setItem('email', response.data.user.email);
                        
                        break;
                    case 'PASSWORD_CHANGE':
                        dispatch(passwordUpdate(
                            response.data.user.idToken,
                            identifier
                        ));
                            
                        localStorage.setItem('idToken', response.data.user.idToken);
                        
                        break;
                    default:
                        throw new Error('Auth Actions POST Account update Switch');
                    
                }

                dispatch(finish());

            })
            .catch(error => {
                dispatch(fail(whatIsTheErrorMessage(error))); 
            });
    };
}

export const authCheckState = () => {

    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        const localId = localStorage.getItem('localId');
        const email = localStorage.getItem('email');
        const displayName = localStorage.getItem('displayName');
        const roles = JSON.parse(localStorage.getItem('roles'));

        if (!idToken) {
            dispatch(logout({}));
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout({}));
                dispatch(reset());
            } else {
                dispatch(success(idToken, localId, email, displayName, roles, 'AUTH_CHECK_STATE'));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
                dispatch(finish());
            } 
        }
    };
}