import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import areas from '../../../../config/data/area.json';
import '../../monitoring.css';


const MonitoringPoint = (props) => {

    const { monitoringPoint, toggleCreatingMonitoringPoint, save } = props;

    const { register, getValues, reset, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });

    useEffect(() => {
        if(monitoringPoint) {
            reset(monitoringPoint);
        }
    }, [monitoringPoint, reset]);
    

    const onSaveHandler = (event) => {
        event.preventDefault();

        if(monitoringPoint) {
            save({ id: monitoringPoint.id, ...getValues() });
        } else {
            save(getValues());
        }
    }

    return (
        <div className='container mt-3'>
            
            <form onSubmit={(event) => handleSubmit(onSaveHandler(event))}>
                {/* Form heading */}
                <div className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none'>
                    <h3 className='heading-primary'>
                        <span className='heading-primary_sub'>
                            { monitoringPoint
                                ?   'Edit Sensor Monitoring Point'
                                :   'New Sensor Monitor Point'
                            }
                            
                        </span>
                    </h3>
                </div>

                {/* UID */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>General</h4>
                    </div>
                    
                    <div className='row g-2 mb-2'>
                        <div className='form-floating'>
                            <input type='text' className='form-control' id='name' autoComplete='off' placeholder='Name' required
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
                        { errors.name && <p className='form-error mt-1'>{errors.name.message}</p> }
                        <div className='form-floating'>
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
                    { errors.area && <p className='form-error mt-1'>{errors.area.message}</p> }
                </div>

                <div className='form-floating mb-3'>
                    <button
                        className='w-100 btn btn-primary'
                        type='submit'>Save</button>
                </div>

                <div className='form-floating mb-3'>
                    <button
                        className='w-100 btn btn-secondary'
                        type='button'
                        onClick={ toggleCreatingMonitoringPoint }>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default MonitoringPoint;