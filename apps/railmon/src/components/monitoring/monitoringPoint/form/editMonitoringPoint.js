import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { sensorGetMonitoringPoint, sensorUpdateMonitoringPoint } from '../../../../store/actions/index';
import Backdrop from '../../../ui/backdrop/backdrop';
import Spinner from '../../../ui/spinner/spinner';
import areas from '../../../../config/data/area.json';
import '../../monitoring.css';


const MonitoringPoint = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { idToken } = useSelector(state => state.auth);
    const { loading, error, monitoringPoint, identifier, reddirectPath } = useSelector(state => state.sensor);
    // const { location } = monitoringPoint;


    const { register, reset, getValues, formState: { errors } } = useForm({ mode: 'onChange' });

    const onGetSensorMonitoringPoint = useCallback((idToken, id, identifier) => dispatch(sensorGetMonitoringPoint(idToken, id, identifier)), [dispatch]);
    const onUpdateSensorMonitoringPoint = useCallback((idToken, data, identifier) => dispatch(sensorUpdateMonitoringPoint(idToken, data, identifier)), [dispatch]);

    useEffect(() => {
        if(id && !monitoringPoint) {

            onGetSensorMonitoringPoint(idToken, id, 'GET_SENSOR_MONITORING_POINT');

            // onGetPointsMachinePerformanceData(
            //     idToken, localId, id,
            //     moment(startDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
            //     moment(endDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
            //     'GET_SENSOR_DATA'
            // );
        }
    }, [id, idToken, monitoringPoint, onGetSensorMonitoringPoint]);

    useEffect(() => {
        if(monitoringPoint) {
            reset(monitoringPoint);
        }
    }, [reset, monitoringPoint]);

    useEffect(() => {
        if(identifier === 'UPDATE_SENSOR_MONITORING_POINT')
            navigate(reddirectPath);
        
    }, [identifier, navigate, reddirectPath]);

    const save = () => {
        onUpdateSensorMonitoringPoint(idToken, { id: id, ...getValues() },'UPDATE_SENSOR_MONITORING_POINT')
    }
    
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
            <form>
                {/* Form heading */}
                <div className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none'>
                    <h3 className='heading-primary'>
                        <span className='heading-primary_main'>Edit Sensor Monitor Point</span>
                    </h3>
                </div>

                {/* UID */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>General</h4>
                    </div>
                    
                    <div className='row g-2 mb-2'>
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='name' autoComplete='off' placeholder='Name'
                            {...register('name', { 
                                required: 'You must provide a monitoring point name for this monitoring area',
                                minLength: {
                                    value: 3,
                                    message: 'Monitoring point name must have at least 3 characters'
                                },
                                maxLength: {
                                    value: 64,
                                    message: 'Monitoring point name cannot have more than 64 characters'
                                }
                             })} />
                            <label htmlFor='name' className='form-label'>Name</label>
                        </div>
                        <div className='form-floating col-sm-6'>
                            <select className='form-select' id='area' required
                                { ...register('area', { required: 'You must select an area' })}>
                                <option value=''>Choose...</option>
                                        {
                                            areas.map(item => {
                                                return (<option key={item.area} value={item.area}>{item.area}</option>)
                                            })
                                        }
                                </select>
                                <label htmlFor='area'>Area</label>
                        </div>
                    </div>
                    { errors.name && <p className='form-auth-error mt-1'>{errors.name.message}</p> }
                    { errors.area && <p className='form-auth-error mt-1'>{errors.area.message}</p> }
                </div>


                <div className='form-floating mb-3'>
                    <button
                        className='w-100 btn btn-primary'
                        type='button'
                        onClick={ save }>Save</button>
                </div>

                <div className='form-floating mb-3'>
                    <button
                        className='w-100 btn btn-secondary'
                        type='button'
                        onClick={ () => { navigate('/monitoring') } }>Close</button>
                </div>

            </form>
        </div>
    );
}

export default MonitoringPoint;