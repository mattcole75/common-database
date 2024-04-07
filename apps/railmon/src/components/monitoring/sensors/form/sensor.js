import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import departments from '../../../../config/data/department.json';
import systems from '../../../../config/data/system.json';
import types from '../../../../config/data/type.json';
import status from '../../../../config/data/status.json';
import '../../monitoring.css';


const Sensor = (props) => {

    const { sensor, toggleCreatingSensor, save } = props;

    const navigate = useNavigate();

    const { monitoringPoint, redirectPath } = useSelector(state => state.sensor);

    const { register, getValues, reset, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });

    useEffect(() => {
        if(sensor) {
            console.log(sensor);
            reset(sensor);
        }
    }, [sensor, reset]);
    
    useEffect(() => {
        if(monitoringPoint == null)
            navigate('/monitoring/sensormonitoringpoints');
    }, [monitoringPoint, navigate, redirectPath]);

    const onSaveHandler = (event) => {
        event.preventDefault();
        save({ ...getValues(), sensor_monitoring_point_ref: monitoringPoint.id });
    }

    return (
        <div className='container mt-3'>
            
            <form className='needs-validation' onSubmit={event => handleSubmit(onSaveHandler(event))}>

                {/* Form heading */}
                <div className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none'>
                    <h3 className='heading-primary'>
                        <span className='heading-primary_main'>New Sensor</span>
                    </h3>
                </div>

                {/* UID */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>Identifier</h4>
                    </div>
                    
                    <div className='row g-2'>
                        <div className='form-floating  col-sm-3'>
                            <input type='text' className='form-control' id='id' placeholder='id' disabled 
                                {...register('id')}/>
                            <label htmlFor='id' className='form-label'>ID</label>
                        </div>
                        <div className='form-floating  col-sm-9'>
                            <input type='text' className='form-control' id='name' autoComplete='off' placeholder='name' required
                                {...register('name', { 
                                    required: "You must provide a sensor name.",
                                    minLength: {
                                        value: 3,
                                        message: "The sensor name must have at least 3 characters."
                                    },
                                    maxLength: {
                                        value: 64,
                                        message: "The sensor name cannot have more than 64 characters."
                                    }
                                })} />
                            <label htmlFor='name' className='form-label'>Name</label>
                        </div>
                    </div>
                    { errors.name && <p className='form-error mt-1'>{errors.name.message}</p> }
                    {/* temporary and shall be removed when all sensor ID's have been migrated */}
                    <div className='form-floating mt-2'>
                        <input type='text' className='form-control' id='prev_id_ref' autoComplete='off' placeholder='id'
                            {...register('prev_id_ref', { required: false })} />
                        <label htmlFor='prev_id_ref' className='form-label'>Previous Reference</label>
                    </div>
                </div>

                {/* Department system type */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>Description</h4>
                    </div>

                    <div className='row g-2'>
                        <div className='form-floating'>
                            <select className='form-select form-select_truncate' id='department' required
                                {...register('department', { required: "You must select a department." })}>
                                <option value=''>Choose...</option>
                                {
                                    departments.map((item, index) => (
                                        <option key={index} value={item.department}>{item.department}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor='department'>Department</label>
                            { errors.department && <p className='form-error mt-1'>{errors.department.message}</p> }
                        </div>

                        <div className='form-floating'>
                            <select className='form-select form-select_truncate' id='system' required
                                {...register('system', { required: "You must select a system." })}>
                                <option value=''>Choose...</option>
                                {
                                    systems.map((item, index) => (
                                        <option key={index} value={item.system}>{item.system}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor='system'>System</label>
                            { errors.system && <p className='form-error mt-1'>{errors.system.message}</p> }
                        </div>

                        <div className='form-floating mb-2'>
                            <select className='form-select form-select_truncate' id='type' required
                                {...register('type', { required: "You must select a type." })}>
                                <option value=''>Choose...</option>
                                {
                                    types.map((item, index) => (
                                        <option key={index} value={item.type}>{item.type}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor='type'>Type</label>
                            { errors.type && <p className='form-error mt-1'>{errors.type.message}</p> }
                        </div>
                    </div>

                    <div className='form-floating'>
                        <textarea className='form-control' id='purpose' autoComplete='off' rows='3' style={{height:'auto'}}
                            placeholder='Purpose' required
                            { ...register('purpose', {
                                required: "You must provide a purpose for the sensor.",
                                minLength: {
                                    value: 3,
                                    message: "The sensor's purpose must have at least 3 characters."
                                },
                                maxLength: {
                                    value: 256,
                                    message: "The sensor's purpose cannot have more than 256 characters."
                                }
                            }) }
                        />
                        <label htmlFor='purpose' className='form-label'>Purpose</label>
                        { errors.purpose && <p className='form-error mt-1'>{errors.purpose.message}</p> }
                    </div>
                </div>

                {/* monitoring point */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>Monitoring Point</h4>
                    </div>
                    <div className='row g-2'>
                        <div className='form-floating mb-3'>
                            <input type='text' className='form-control' id='monitoring_point_name' placeholder='Monitoring Point Name' disabled 
                                value={ monitoringPoint ? monitoringPoint.name : 'refresh' }/>
                            <label htmlFor='monitoring_point_name' className='form-label'>Monitoring Point Name</label>
                        </div>
                    </div>
                </div>

                {/* Thresholds */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>Thresholds</h4>
                    </div>
                    <div className='row g-2'>
                        <div className='form-floating  col-sm-6'>
                            <input type='number' className='form-control' id='upper_threshold' autoComplete='off' placeholder='Upper Threshold'
                                {...register('upper_threshold', { required: false })} />
                            <label htmlFor='upper_threshold' className='form-label'>Upper Threshold</label>
                        </div>
                        <div className='form-floating col-sm-6 mb-1'>
                            <input type='number' className='form-control' id='lower_threshold' autoComplete='off' placeholder='Lower Threshold'
                                {...register('lower_threshold', { required: false })} />
                            <label htmlFor='lower_threshold' className='form-label'>Lower Threshold</label>
                        </div>
                    </div>
                </div>

                {/* Calibration */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>Calibration</h4>
                    </div>
                    <div className='row g-2'>
                        <div className='form-floating  col-sm-6'>
                            <input type='date' className='form-control' id='calibration_date' autoComplete='off' placeholder='Date'
                                {...register('calibration_date')} />
                            <label htmlFor='calibration_date' className='form-label'>Calibration Date</label>
                        </div>

                        <div className='form-floating  col-sm-6'>
                            <input type='number' className='form-control' id='calibration_valid_weeks' autoComplete='off' placeholder='No. Weeks Calibration Valid'
                                {...register('calibration_valid_weeks')} />
                            <label htmlFor='calibration_valid_weeks' className='form-label'>Valid for (weeks)</label>
                        </div>

                        <div className='form-floating'>
                            <input type='url' className='form-control' id='calibration_cert_url' autoComplete='off' placeholder='Location of Calibration Certificate'
                                {...register('calibration_cert_url')} />
                            <label htmlFor='calibration_cert_url' className='form-label'>Location of Certificate (URL)</label>
                        </div>
                    </div>
                </div>

                {/* Lifecycle Dates */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>Lifecycle Dates</h4>
                    </div>
                    <div className='row g-2'>
                        <div className='form-floating  col-sm-4'>
                            <input type='date' className='form-control' id='installed_date' autoComplete='off' placeholder='Date Installed'
                                {...register('installed_date', { required: false })} />
                            <label htmlFor='installed_date' className='form-label'>Installed Date</label>
                        </div>

                        <div className='form-floating  col-sm-4'>
                            <input type='date' className='form-control' id='commissioned_date' autoComplete='off' placeholder='Date Commissioned'
                                {...register('commissioned_date', { required: false })} />
                            <label htmlFor='commissioned_date' className='form-label'>Commissioned Date</label>
                        </div>

                        <div className='form-floating  col-sm-4'>
                            <input type='date' className='form-control' id='uninstalled_date' autoComplete='off' placeholder='Date Uninstalled'
                                {...register('uninstalled_date', { required: false })} />
                            <label htmlFor='uninstalled_date' className='form-label'>Uninstalled Date</label>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>Status</h4>
                    </div>
                    <div className='row g-2'>
                        <div className='form-floating'>
                            <select className='form-select form-select_truncate' id='status' required
                                {...register('status', { required: "You must select a status." })}>
                                <option value=''>Choose...</option>
                                {
                                    status.map((item, index) => (
                                        <option key={index} value={item.status}>{item.status}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor='status'>Status</label>
                        </div>
                        { errors.status && <p className='form-error mt-1'>{errors.status.message}</p> }
                    </div>
                </div>

                {/* Form Control */}
                <div className='border-top pt-3'>
                    <button className='w-100 btn btn-primary mb-3' type='submit'>
                        Save
                    </button>
                    <button
                        className='w-100 btn btn-secondary'
                        type='button'
                        onClick={ toggleCreatingSensor }>
                            Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Sensor;