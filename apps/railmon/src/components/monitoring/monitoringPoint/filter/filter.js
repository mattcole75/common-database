import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sensorGetMonitoringPoints, sensorReset } from '../../../../store/actions/index';

const Filter = React.memo((props) => {

    const { toggleCreatingMonitoringPoint } = props;

    const dispatch = useDispatch();

    const [ enteredFilter, setEnteredFilter ] = useState('');

    const { idToken } = useSelector(state => state.auth);

    const inputRef = useRef();

    const onLoadMonitoringPoints = useCallback((idToken, query, identifier) => {
        dispatch(sensorReset());
        dispatch(sensorGetMonitoringPoints(idToken, query, identifier));
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
          if(enteredFilter === inputRef.current.value) {
            const query =
                enteredFilter.length === 0
                ? ''
                : enteredFilter;
                onLoadMonitoringPoints(idToken, query, 'GET_SENSOR_MONITORING_POINTS')
          }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [enteredFilter, inputRef, onLoadMonitoringPoints, idToken]);

    const refresh = () => {

        const query = enteredFilter.length === 0 ? '' : enteredFilter;

        onLoadMonitoringPoints(idToken, query, 'GET_SENSOR_MONITORING_POINTS');
    }

    return (
        <div className="container mt-3">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                
                <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <h3 className="heading-primary">
                        <span className='heading-primary_main'>Sensor Monitor Points</span>
                    </h3>
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
                    <button type="button" className="btn btn-smt" onClick={ toggleCreatingMonitoringPoint }><span className='bi-plus-circle fs-3' /></button>
                    <button type="button" className="btn btn-sm" onClick={ refresh }><span className='bi-arrow-clockwise fs-3' /></button>
                </div>
            </div>
        </div>
    );
});

export default Filter;