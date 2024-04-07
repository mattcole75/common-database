import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Sensors from '../../sensors/sensors';

import { sensorGetMonitoringPoint } from '../../../../store/actions/index';
import Backdrop from '../../../ui/backdrop/backdrop';
import Spinner from '../../../ui/spinner/spinner';
import '../../monitoring.css';

const ViewMonitoringPoint = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const { idToken } = useSelector(state => state.auth);
    const { loading, error, monitoringPoint } = useSelector(state => state.sensor);

    const onGetSensorMonitoringPoint = useCallback((idToken, id, identifier) => dispatch(sensorGetMonitoringPoint(idToken, id, identifier)), [dispatch]);

     useEffect(() => {
        if(id && !monitoringPoint) {
            onGetSensorMonitoringPoint(idToken, id, 'GET_SENSOR_MONITORING_POINT');
        }
    }, [id, idToken, monitoringPoint, onGetSensorMonitoringPoint]);

    let spinner = null;
    if(loading)
        spinner = <Spinner />;
    
    return (
        <div className='container mt-3'>
            <Backdrop show={ loading } />
            { spinner }
            { error &&
                <div className='alert alert-danger text-wrap text-break' role='alert'>
                    { error }
                </div>
            }
            <div>
                {/* Form heading */}
                <div className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none'>
                    <h3 className='heading-primary'>
                        <span className='heading-primary_main'>View Sensor Monitor Point</span>
                    </h3>
                </div>


                <div className='text-start'>
                    <h4 className='h4 fw-normal'>{ monitoringPoint?.name }</h4>
                </div>

                <Sensors monitoringPointRef={ monitoringPoint?.id }/>
                
            </div>
        </div>
    );
}

export default ViewMonitoringPoint;