import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LineChart, CartesianGrid, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { defaultUnits, temperatureUnits, humidityUnits } from '../../../../config/graphUnits';
import moment from "moment";

import { sensorGetSensor, sensorGetSensorData } from '../../../../store/actions/index';
import Backdrop from "../../../ui/backdrop/backdrop";
import Spinner from "../../../ui/spinner/spinner";

const ViewSensor = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { idToken } = useSelector(state => state.auth);
    const { loading, error, monitoringPoint, sensor, sensorData, identifier } = useSelector(state => state.sensor);
    
    const { register, reset } = useForm({
        mode: 'onChange'
    });

    const onGetSensor = useCallback((idToken, id, identifier) => dispatch(sensorGetSensor(idToken, id, identifier)), [dispatch]);
    const onGetSensorData = useCallback((uid, identifier) => dispatch(sensorGetSensorData(uid, identifier)), [dispatch]);

    useEffect(() => {
        if(id && !sensor) {
            onGetSensor(idToken, id, 'GET_SENSOR');
        }
    }, [id, idToken, onGetSensor, sensor]);

    useEffect(() => {
        if(identifier === 'GET_SENSOR') {
            onGetSensorData(sensor ? sensor.prev_id_ref : sensor.id , 'GET_SENSOR_DATA')
        }
    }, [identifier, onGetSensorData, sensor]);

    useEffect(() => {
        if(sensor) {
            reset(sensor);
        }
    }, [reset, sensor]);

    const dateFormatter = (date) => {
        // return moment(date).unix();
        return moment(date).format('DD/MM/YY');
    };

    let units = null;
    switch (sensor?.type) {
        case 'Temperature Sensor':
            units = temperatureUnits;
            break;
        case 'Humidity Sensor':
            units = humidityUnits;
            break;
        default:
            units = defaultUnits;
    }

    const renderLineChart = (
        <ResponsiveContainer width={"100%"} height={ 300 }>
            <LineChart data={ sensorData } margin={{top: 0, right: 0, left: 20, bottom: 20}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="timestamp"
                    domain={["dataMin", "dataMax"]}
                    allowDataOverFlow={ true }
                    padding={ { left: 20, right: 20 } }
                    scale="auto"
                    tickFormatter={ dateFormatter }
                >
                <Label
                    value={"Time"}
                    position="bottom"
                    style={{ textAnchor: "middle" }}
                />
                </XAxis>
                <YAxis type="number" domain={['auto', 'auto']}>
                    <Label
                        value={ units.yAxisLabelValue }
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                    />
                </YAxis>
                <Tooltip labelFormatter={ t => new Date(t).toLocaleString() } />
                { sensor?.upper_threshold
                    ?   <ReferenceLine y={ sensor.upper_threshold } stroke="#dc3545" >
                            <Label value="Upper" position="insideLeft" fill="#dc3545"/>
                        </ReferenceLine>
                    :   null
                }
                { sensor?.lower_threshold
                    ?   <ReferenceLine y={ sensor.lower_threshold } stroke="#dc3545">
                            <Label value="Lower" position="insideLeft" fill="#dc3545"/>
                        </ReferenceLine>
                    :   null
                }
                {/* { pointsMachine && pointsMachine.left_swing_time_standard_deviation
                    ?   <ReferenceLine y={ leftSwingTimeStdDev4 } stroke="#dc3545" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+4" position="insideLeft" fill="#dc3545"/>
                        </ReferenceLine>
                    :   null
                } */}
                {/* { pointsMachine && pointsMachine.left_swing_time_standard_deviation
                    ?   <ReferenceLine y={ leftSwingTimeStdDev3 } stroke="#ffc107" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+3" position="insideLeft" fill="#ffc107"/>
                        </ReferenceLine>
                    :   null
                } */}
                {/* { pointsMachine && pointsMachine.left_swing_time_standard_deviation
                    ?   <ReferenceLine y={ leftSwingTimeStdDev2 } stroke="#0dcaf0" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+2" position="insideLeft" fill="#0dcaf0"/>
                        </ReferenceLine>
                    :   null
                } */}
                {/* { pointsMachine && pointsMachine.left_swing_time_standard_deviation
                    ?   <ReferenceLine y={ leftSwingTimeStdDev1 } stroke="#198754" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+1" position="insideLeft" fill="#198754"/>
                        </ReferenceLine>
                    :   null
                } */}
                {/* { sensorData?.value
                    ?   <ReferenceLine y={ sensorData?.left_swing_time_avg } stroke="#0d6efd" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="AVG" position="insideLeft" fill="#0d6efd"/>
                        </ReferenceLine>
                    :   null
                } */}
                
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    name={units.lineUnitName}
                    unit={ units.lineUnit }
                    dot={ true }
                />
            </LineChart>
        </ResponsiveContainer>
    );
    
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
                        <span className='heading-primary_main'>View Sensor Data</span>
                    </h3>
                </div>

                <div className='container d-flex flex-wrap justify-content-between mt-3 p-0'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>{ sensor && sensor.name ? (monitoringPoint?.name + ' - '+ sensor?.name + ' - ' + sensor?.status) : 'Sensor Data' }</h4>
                    </div>

                    <div className='form-floating text-end col-sm-1'>
                        <Link to={`/monitoring/sensormonitoringpoint/view/${sensor?.id}`} className='btn btn-sm p-0'><span className='bi-pencil-square fs-3' /></Link>
                        {/* <button type='button' className='btn btn-sm p-0'onClick={ () => {} }><span className='bi-pencil-square fs-3' /></button> */}
                    </div>
                </div>

                {/* Department System Type */}
                <div className='row g-2 mb-2'>
                    <div className='form-floating  col-sm-4'>
                        <input type='text' className='form-control' id='department' autoComplete='off' placeholder='Department' disabled
                            {...register('department')} />
                        <label htmlFor='department'>Department</label>
                    </div>
                    <div className='form-floating  col-sm-4'>
                        <input type='text' className='form-control' id='system' autoComplete='off' placeholder='System' disabled
                            {...register('system')} />
                        <label htmlFor='system'>System</label>
                    </div>
                    <div className='form-floating  col-sm-4'>
                        <input type='text' className='form-control' id='type' autoComplete='off' placeholder='Type' disabled
                            {...register('type')} />
                        <label htmlFor='type'>Type</label>
                    </div>
                </div>
                {/* purpose */}
                <div className='form-floating mb-3'>
                    <textarea className='form-control' id='purpose' autoComplete='off' rows='3' style={{height:'auto'}} disabled
                        placeholder='Purpose' required
                        { ...register('purpose') }
                    />
                    <label htmlFor='purpose' className='form-label'>Purpose</label>
                </div>

                {/* graph */}
                {/* Thresholds */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>Measurement Data</h4>
                    </div>
                    { sensorData ? renderLineChart : null }
                </div>

                

                {/* Thresholds */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>Thresholds</h4>
                    </div>
                    <div className='row g-2'>
                        <div className='form-floating  col-sm-6'>
                            <input type='number' className='form-control' id='upper_threshold' autoComplete='off' placeholder='Upper Threshold' disabled
                                {...register('upper_threshold', { required: false })} />
                            <label htmlFor='upper_threshold' className='form-label'>Upper Threshold</label>
                        </div>
                        <div className='form-floating col-sm-6 mb-1'>
                            <input type='number' className='form-control' id='lower_threshold' autoComplete='off' placeholder='Lower Threshold' disabled
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
                            <input type='date' className='form-control' id='calibration_date' autoComplete='off' placeholder='Date' disabled
                                {...register('calibration_date')} />
                            <label htmlFor='calibration_date' className='form-label'>Calibration Date</label>
                        </div>

                        <div className='form-floating  col-sm-6'>
                            <input type='number' className='form-control' id='calibration_valid_weeks' autoComplete='off' placeholder='No. Weeks Calibration Valid' disabled
                                {...register('calibration_valid_weeks')} />
                            <label htmlFor='calibration_valid_weeks' className='form-label'>Valid for (weeks)</label>
                        </div>

                        <div className='form-floating'>
                            <input type='url' className='form-control' id='calibration_cert_url' autoComplete='off' placeholder='Location of Calibration Certificate' disabled
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
                            <input type='date' className='form-control' id='installed_date' autoComplete='off' placeholder='Date Installed' disabled
                                {...register('installed_date', { required: false })} />
                            <label htmlFor='installed_date' className='form-label'>Installed Date</label>
                        </div>

                        <div className='form-floating  col-sm-4'>
                            <input type='date' className='form-control' id='commissioned_date' autoComplete='off' placeholder='Date Commissioned' disabled
                                {...register('commissioned_date', { required: false })} />
                            <label htmlFor='commissioned_date' className='form-label'>Commissioned Date</label>
                        </div>

                        <div className='form-floating  col-sm-4'>
                            <input type='date' className='form-control' id='uninstalled_date' autoComplete='off' placeholder='Date Uninstalled' disabled
                                {...register('uninstalled_date', { required: false })} />
                            <label htmlFor='uninstalled_date' className='form-label'>Uninstalled Date</label>
                        </div>
                    </div>
                </div>


            </form>
        </div>
    );
}

export default ViewSensor;