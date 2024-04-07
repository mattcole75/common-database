import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sensorGetSensors } from '../../../../store/actions/index';

const Filter = React.memo((props) => {

    const { monitoringPointRef, toggleCreatingSensor } = props;

    const dispatch = useDispatch();

    const [ enteredFilter, setEnteredFilter ] = useState('');

    const { idToken } = useSelector(state => state.auth);

    const inputRef = useRef();

    const onLoadSensors = useCallback((idToken, monitoringPointRef, query, identifier) => {
        dispatch(sensorGetSensors(idToken, monitoringPointRef, query, identifier));
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
          if(enteredFilter === inputRef.current.value) {
            const query =
                enteredFilter.length === 0
                ? ''
                : enteredFilter;
                onLoadSensors(idToken, monitoringPointRef, query, 'GET_SENSORS')
          }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [enteredFilter, inputRef, onLoadSensors, idToken, monitoringPointRef]);

    const refresh = () => {

        const query = enteredFilter.length === 0 ? '' : enteredFilter;

        onLoadSensors(idToken, monitoringPointRef, query, 'GET_SENSORS');
    }

    return (
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

            <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <div className='text-start'>
                    <h4 className='h4 fw-normal'>Sensors</h4>
                </div>
            </div>
            
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                <input 
                    id='search'
                    type='search'
                    className='form-control'
                    ref={ inputRef }
                    placeholder='Search...'
                    aria-label='Search'
                    value={ enteredFilter }
                    onChange={ event => setEnteredFilter(event.target.value) }
                />
            </form>
        
            <div className="text-end">
                <button type="button" className="btn btn-smt" onClick={ toggleCreatingSensor }><span className='bi-plus-circle fs-3' /></button>
                <button type="button" className="btn btn-sm" onClick={ refresh }><span className='bi-arrow-clockwise fs-3' /></button>
            </div>
            
        </div>
    );
});

export default Filter;