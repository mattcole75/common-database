import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { getPointsMachine, getPointsMachinePerformanceData } from '../../../../store/actions/index';
import Backdrop from '../../../ui/backdrop/backdrop';
import Spinner from '../../../ui/spinner/spinner';
import '../../monitoring.css';


const PointsMachineForm = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { idToken, localId } = useSelector(state => state.auth);
    const { loading, error, pointsMachine, pointsMachinePerformanceData } = useSelector(state => state.pointsMachine);
    // const { left_swing_time_avg, left_swing_time_standard_deviation, left_swing_time_measurement_mode, swing_time_safety_limit } = pointsMachine;

    const [leftSeries, setLeftSeries] = useState(null);
    const [rightSeries, setRightSeries] = useState(null);
    const startDate = useMemo(() => moment().startOf('day').add(-14, 'days'), []);
    const endDate = useMemo(() => moment().endOf('day'), []);

    const { register, reset, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            startDate: startDate.format('YYYY-MM-DD'),
            startTime: startDate.format('HH:mm'),
            endDate: endDate.format('YYYY-MM-DD'),
            endTime: endDate.format('HH:mm')
        }
    });

    const onGetPointsMachine = useCallback((idToken, localId, id, identifier) => dispatch(getPointsMachine(idToken, localId, id, identifier)), [dispatch]);
    const onGetPointsMachinePerformanceData = useCallback((idToken, localId, id, startDate, endDate, identifier) => dispatch(getPointsMachinePerformanceData(idToken, localId, id, startDate, endDate, identifier)), [dispatch]);

    const dateFormatter = (date) => {
        // return moment(date).unix();
        return moment(date).format('DD/MM/YY');
    };

    let leftSwingTimeStdDev1 = null;
    let leftSwingTimeStdDev2 = null;
    let leftSwingTimeStdDev3 = null;
    let leftSwingTimeStdDev4 = null;
    let rightSwingTimeStdDev1 = null;
    let rightSwingTimeStdDev2 = null;
    let rightSwingTimeStdDev3 = null;
    let rightSwingTimeStdDev4 = null;

    useEffect(() => {
        if(id && !pointsMachine) {
            onGetPointsMachine(idToken, localId, id, 'GET_POINTS_MACHINE');
            onGetPointsMachinePerformanceData(
                idToken, localId, id,
                moment(startDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
                moment(endDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
                'GET_SENSOR_DATA'
            );
        }
    }, [endDate, id, idToken, localId, onGetPointsMachine, onGetPointsMachinePerformanceData, pointsMachine, startDate]);

    useEffect(() => {
        if(pointsMachine) {
            reset(pointsMachine);
        }
    }, [reset, pointsMachine]);

    const loadTimeSeries = useCallback(() => {
        return new Promise((resolve) => {

            let leftPointSwings = [];
            let rightPointSwings = [];
            [ ...pointsMachinePerformanceData ].forEach(obj => {
                if(obj.swing_time <= 10000) {
                    if(obj.direction === 'Points Set Left') {
                        leftPointSwings.push({
                            tms_timestamp: moment(obj.tms_timestamp).valueOf(),
                            swing_time: obj.swing_time,
                            direction: obj.direction
                        });
                    }

                    if(obj.direction === 'Points Set Right') {
                        rightPointSwings.push({
                            tms_timestamp: moment(obj.tms_timestamp).valueOf(),
                            swing_time: obj.swing_time,
                            direction: obj.direction
                        });
                    }
                    
                }
            });
            
            resolve([leftPointSwings, rightPointSwings]);
        });
    }, [pointsMachinePerformanceData]);

    useEffect(() => {
        if(pointsMachinePerformanceData) {
            let leftTimeseries = null
            let rightTimeseries = null
            const load = async () => {
                [leftTimeseries, rightTimeseries] = await loadTimeSeries();
            }
            
            load()
            .then(() => {
                setLeftSeries(leftTimeseries);
                setRightSeries(rightTimeseries);
            });
        }

    }, [loadTimeSeries, pointsMachinePerformanceData]);

    const onFilterSet = useCallback(() => {

        const dates = getValues();

        onGetPointsMachinePerformanceData(
            idToken, localId, id,
            moment(dates.startDate + ' ' + dates.startTime).format('YYYY-MM-DD HH:mm:ss.SSS'),
            moment(dates.endDate + ' ' + dates.endTime).format('YYYY-MM-DD HH:mm:ss.SSS'),
            'GET_POINT_MACHINE_PERFORMANCE_DATA'
        );

    }, [getValues, id, idToken, localId, onGetPointsMachinePerformanceData]);
    
    if( pointsMachine && pointsMachine.left_swing_time_measurement_mode === 'IS') {
        leftSwingTimeStdDev1 = pointsMachine.left_swing_time_avg + pointsMachine.left_swing_time_standard_deviation;
        leftSwingTimeStdDev2 = pointsMachine.left_swing_time_avg + (pointsMachine.left_swing_time_standard_deviation * 2);
        leftSwingTimeStdDev3 = pointsMachine.left_swing_time_avg + (pointsMachine.left_swing_time_standard_deviation * 3);
        leftSwingTimeStdDev4 = pointsMachine.left_swing_time_avg + (pointsMachine.left_swing_time_standard_deviation * 4);
    } else if (pointsMachine && pointsMachine.left_swing_time_measurement_mode === 'OS') {
        leftSwingTimeStdDev4 = pointsMachine.swing_time_safety_limit - pointsMachine.left_swing_time_standard_deviation;
        leftSwingTimeStdDev3 = pointsMachine.swing_time_safety_limit - (pointsMachine.left_swing_time_standard_deviation * 2);
        leftSwingTimeStdDev2 = pointsMachine.swing_time_safety_limit - (pointsMachine.left_swing_time_standard_deviation * 3);
        leftSwingTimeStdDev1 = pointsMachine.swing_time_safety_limit - (pointsMachine.left_swing_time_standard_deviation * 4);
    }

    if( pointsMachine && pointsMachine.right_swing_time_measurement_mode === 'IS') {
        rightSwingTimeStdDev1 = pointsMachine.right_swing_time_avg + pointsMachine.right_swing_time_standard_deviation;
        rightSwingTimeStdDev2 = pointsMachine.right_swing_time_avg + (pointsMachine.right_swing_time_standard_deviation * 2);
        rightSwingTimeStdDev3 = pointsMachine.right_swing_time_avg + (pointsMachine.right_swing_time_standard_deviation * 3);
        rightSwingTimeStdDev4 = pointsMachine.right_swing_time_avg + (pointsMachine.right_swing_time_standard_deviation * 4);
    } else if (pointsMachine && pointsMachine.right_swing_time_measurement_mode === 'OS') {
        rightSwingTimeStdDev4 = pointsMachine.swing_time_safety_limit - pointsMachine.right_swing_time_standard_deviation;
        rightSwingTimeStdDev3 = pointsMachine.swing_time_safety_limit - (pointsMachine.right_swing_time_standard_deviation * 2);
        rightSwingTimeStdDev2 = pointsMachine.swing_time_safety_limit - (pointsMachine.right_swing_time_standard_deviation * 3);
        rightSwingTimeStdDev1 = pointsMachine.swing_time_safety_limit - (pointsMachine.right_swing_time_standard_deviation * 4);
    }

    const renderLeftLineChart = (
        <ResponsiveContainer width={"100%"} height={400}>
            <LineChart data={leftSeries} margin={{top: 0, right: 0, left: 20, bottom: 20}}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis 
                    type="number"
                    dataKey="tms_timestamp"
                    domain={["dataMin", "dataMax"]}
                    allowDataOverFlow={true}
                    padding={{ left: 20, right: 20 }}
                    scale="time"
                    tickFormatter={dateFormatter}
                >
                <Label
                    value={"Time"}
                    position="bottom"
                    style={{ textAnchor: "middle" }}
                />
                </XAxis>
                <YAxis type="number" domain={['auto', 'auto']}>
                    <Label
                        value={"Swing Time (ms)"}
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                    />
                </YAxis>
                <Tooltip labelFormatter={ t => new Date(t).toLocaleString() } />
                { pointsMachine && pointsMachine.swing_time_safety_limit
                    ?   <ReferenceLine y={ pointsMachine.swing_time_safety_limit } stroke="#dc3545" strokeWidth={4} strokeDasharray="3 5">
                            <Label value="SL" position="insideLeft" fill="#dc3545"/>
                        </ReferenceLine>
                    :   null
                }
                { pointsMachine && pointsMachine.left_swing_time_standard_deviation
                    ?   <ReferenceLine y={ leftSwingTimeStdDev4 } stroke="#dc3545" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+4" position="insideLeft" fill="#dc3545"/>
                        </ReferenceLine>
                    :   null
                }
                { pointsMachine && pointsMachine.left_swing_time_standard_deviation
                    ?   <ReferenceLine y={ leftSwingTimeStdDev3 } stroke="#ffc107" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+3" position="insideLeft" fill="#ffc107"/>
                        </ReferenceLine>
                    :   null
                }
                { pointsMachine && pointsMachine.left_swing_time_standard_deviation
                    ?   <ReferenceLine y={ leftSwingTimeStdDev2 } stroke="#0dcaf0" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+2" position="insideLeft" fill="#0dcaf0"/>
                        </ReferenceLine>
                    :   null
                }
                { pointsMachine && pointsMachine.left_swing_time_standard_deviation
                    ?   <ReferenceLine y={ leftSwingTimeStdDev1 } stroke="#198754" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+1" position="insideLeft" fill="#198754"/>
                        </ReferenceLine>
                    :   null
                }
                { pointsMachine && pointsMachine.left_swing_time_avg
                    ?   <ReferenceLine y={ pointsMachine.left_swing_time_avg } stroke="#0d6efd" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="AVG" position="insideLeft" fill="#0d6efd"/>
                        </ReferenceLine>
                    :   null
                }
                
                <Line
                    type="monotone"
                    dataKey="swing_time"
                    stroke="#8884d8"
                    name="Milliseconds"
                    unit={"ms"}
                    dot={true}
                />
            </LineChart>
        </ResponsiveContainer>
    );

    const renderRightLineChart = (
        <ResponsiveContainer width={"100%"} height={400}>
            <LineChart data={rightSeries} margin={{top: 0, right: 0, left: 20, bottom: 20}}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis 
                    type="number"
                    dataKey="tms_timestamp"
                    domain={["dataMin", "dataMax"]}
                    allowDataOverFlow={true}
                    padding={{ left: 20, right: 20 }}
                    scale="time"
                    tickFormatter={dateFormatter}
                >
                <Label
                    value={"Time"}
                    position="bottom"
                    style={{ textAnchor: "middle" }}
                />
                </XAxis>
                <YAxis type="number" domain={['auto', 'auto']}>
                    <Label
                        value={"Swing Time (ms)"}
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                    />
                </YAxis>
                <Tooltip labelFormatter={ t => new Date(t).toLocaleString() } />
                { pointsMachine && pointsMachine.swing_time_safety_limit
                    ?   <ReferenceLine y={ pointsMachine.swing_time_safety_limit } stroke="#dc3545" strokeWidth={4} strokeDasharray="3 5">
                            <Label value="SL" position="insideLeft" fill="#dc3545"/>
                        </ReferenceLine>
                    :   null
                }
                { pointsMachine && pointsMachine.right_swing_time_standard_deviation
                    ?   <ReferenceLine y={ rightSwingTimeStdDev4 } stroke="#dc3545" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+4" position="insideLeft" fill="#dc3545"/>
                        </ReferenceLine>
                    :   null
                }
                { pointsMachine && pointsMachine.right_swing_time_standard_deviation
                    ?   <ReferenceLine y={ rightSwingTimeStdDev3 } stroke="#ffc107" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+3" position="insideLeft" fill="#ffc107"/>
                        </ReferenceLine>
                    :   null
                }
                { pointsMachine && pointsMachine.right_swing_time_standard_deviation
                    ?   <ReferenceLine y={ rightSwingTimeStdDev2 } stroke="#0dcaf0" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+2" position="insideLeft" fill="#0dcaf0"/>
                        </ReferenceLine>
                    :   null
                }
                { pointsMachine && pointsMachine.right_swing_time_standard_deviation
                    ?   <ReferenceLine y={ rightSwingTimeStdDev1 } stroke="#198754" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="SD+1" position="insideLeft" fill="#198754"/>
                        </ReferenceLine>
                    :   null
                }
                { pointsMachine && pointsMachine.right_swing_time_avg
                    ?   <ReferenceLine y={ pointsMachine.right_swing_time_avg } stroke="#0d6efd" strokeWidth={2} strokeDasharray="3 5">
                            <Label value="AVG" position="insideLeft" fill="#0d6efd"/>
                        </ReferenceLine>
                    :   null
                }
                
                <Line
                    type="monotone"
                    dataKey="swing_time"
                    stroke="#8884d8"
                    name="Milliseconds"
                    unit={"ms"}
                    dot={true}
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
                        <span className='heading-primary_main'>Points Machine - { id }</span>
                    </h3>
                </div>

                {/* UID */}
                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>General</h4>
                    </div>
                    
                    <div className='row g-2 mb-2'>
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='id' value={ id } placeholder='id' disabled />
                            <label htmlFor='id' className='form-label'>ID</label>
                        </div>
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='machine_type' autoComplete='off' placeholder='Machine Type' disabled
                                {...register('machine_type', { required: true })} />
                            <label htmlFor='machine_type' className='form-label'>Machine Type</label>
                        </div>
                    </div>

                    <div className='row g-2 mb-2'>
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='turnout' autoComplete='off' placeholder='Turnout' disabled
                                {...register('turnout', { required: true })} />
                            <label htmlFor='turnout' className='form-label'>Turnout</label>
                        </div>
                        
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='type' autoComplete='off' placeholder='Type' disabled
                                {...register('type', { required: true })} />
                            <label htmlFor='type' className='form-label'>Type</label>
                        </div>
                    </div>

                    <div className='row g-2 mb-2'>
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='normal_position' autoComplete='off' placeholder='Normal Position' disabled
                                {...register('normal_position', { required: true })} />
                            <label htmlFor='normal_position' className='form-label'>Normal Position</label>
                        </div>
                        
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='direction' autoComplete='off' placeholder='Direction' disabled
                                {...register('direction', { required: true })} />
                            <label htmlFor='direction' className='form-label'>Direction</label>
                        </div>
                    </div>

                    <div className='row g-2 mb-2'>
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='left_swing_time_avg' autoComplete='off' placeholder='Normal Position' disabled
                                {...register('left_swing_time_avg', { required: true })} />
                            <label htmlFor='left_swing_time_avg' className='form-label'>Left Swing Time Average</label>
                        </div>
                        
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='right_swing_time_avg' autoComplete='off' placeholder='Direction' disabled
                                {...register('right_swing_time_avg', { required: true })} />
                            <label htmlFor='right_swing_time_avg' className='form-label'>Right Swing Time Average</label>
                        </div>
                    </div>

                    <div className='row g-2 mb-2'>
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='left_swing_time_standard_deviation' autoComplete='off' placeholder='Normal Position' disabled
                                {...register('left_swing_time_standard_deviation', { required: true })} />
                            <label htmlFor='left_swing_time_standard_deviation' className='form-label'>Left Swing Time STD Deviation</label>
                        </div>
                        
                        <div className='form-floating  col-sm-6'>
                            <input type='text' className='form-control' id='right_swing_time_standard_deviation' autoComplete='off' placeholder='Direction' disabled
                                {...register('right_swing_time_standard_deviation', { required: true })} />
                            <label htmlFor='right_swing_time_standard_deviation' className='form-label'>Right Swing Time STD Deviation</label>
                        </div>
                    </div>
                </div>

                <div className='mb-3'>
                    <div className='text-start'>
                        <h4 className='h4 fw-normal'>Remote Condition Monitoring</h4>
                    </div>
                    {/* Filter Dates */}
                    <div className='mb-3'>
                        <div className='row g-2'>
                            <div className='form-floating col-sm-3'>
                                <input type='date' className='form-control' id='startDate' autoComplete='off'
                                    { ...register('startDate', { onChange: onFilterSet }) } />
                                <label htmlFor='startDate' className='form-label'>Start Date</label>
                            </div>

                            <div className='form-floating col-sm-3'>
                                <input type='time' className='form-control' id='startTime' autoComplete='off'
                                    { ...register('startTime', { onChange: onFilterSet }) } />
                                <label htmlFor='startTime' className='form-label'>Start Time</label>
                            </div>

                            <div className='form-floating col-sm-3'>
                                <input type='date' className='form-control' id='endDate' autoComplete='off'
                                    { ...register('endDate', { onChange: onFilterSet }) } />
                                <label htmlFor='endDate' className='form-label'>End Date</label>
                            </div>

                            <div className='form-floating col-sm-3'>
                                <input type='time' className='form-control' id='endTime' autoComplete='off'
                                    { ...register('endTime', { onChange: onFilterSet }) } />
                                <label htmlFor='endTime' className='form-label'>End Time</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='text-start'>
                            <h5 className='h5 fw-normal'>Left Swing Performance</h5>
                        </div>
                        { renderLeftLineChart }
                    </div>
                    <div>
                        <div className='text-start'>
                            <h5 className='h5 fw-normal'>Right Swing Performance</h5>
                        </div>
                        { renderRightLineChart }
                    </div>
                </div>

                <div className='accordion' id='accordionPanelsStayOpenExample'>
                    <div className='accordion-item'>
                        <h2 className='accordion-header'>
                        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseOne' aria-expanded='false' aria-controls='panelsStayOpen-collapseOne'>
                            Configuration Information
                        </button>
                        </h2>
                        <div id='panelsStayOpen-collapseOne' className='accordion-collapse collapse'>
                            <div className='accordion-body'>
                                <div className='row g-2 mb-2'>
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='points_controller_ref' autoComplete='off' placeholder='Points Controller' disabled
                                            {...register('points_controller_ref', { required: true })} />
                                        <label htmlFor='points_controller_ref' className='form-label'>Points Controller</label>
                                    </div>
                                    
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='motor_drive_timeout' autoComplete='off' placeholder='Drive Motor Timeout' disabled
                                            {...register('motor_drive_timeout', { required: true })} />
                                        <label htmlFor='motor_drive_timeout' className='form-label'>Drive Motor Timeout</label>
                                    </div>
                                </div>

                                <div className='row g-2 mb-2'>
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='swing_time_safety_limit' autoComplete='off' placeholder='Swing Time Safety Limit' disabled
                                            {...register('swing_time_safety_limit', { required: true })} />
                                        <label htmlFor='swing_time_safety_limit' className='form-label'>Swing Time Safety Limit</label>
                                    </div>
                                    {/* here  */}
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='switch_type' autoComplete='off' placeholder='Switch Type' disabled
                                            {...register('switch_type', { required: true })} />
                                        <label htmlFor='switch_type' className='form-label'>Switch Type</label>
                                    </div>
                                </div>

                                <div className='row g-2 mb-2'>
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='maintenance_guage' autoComplete='off' placeholder='Maintenance Guage' disabled
                                            {...register('maintenance_guage', { required: true })} />
                                        <label htmlFor='maintenance_guage' className='form-label'>Maintenance Guage</label>
                                    </div>
                                    
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='trailable_5mph' autoComplete='off' placeholder='Points Trailable 5mph' disabled
                                            {...register('trailable_5mph', { required: true })} />
                                        <label htmlFor='trailable_5mph' className='form-label'>Points Trailable 5mph</label>
                                    </div>
                                </div>

                                <div className='row g-2 mb-2'>
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='free_wheel_clearance' autoComplete='off' placeholder='Free Wheel Clearence' disabled
                                            {...register('free_wheel_clearance', { required: true })} />
                                        <label htmlFor='free_wheel_clearance' className='form-label'>Free Wheel Clearence</label>
                                    </div>
                                    
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='free_wheel_passage' autoComplete='off' placeholder='Free Wheel Passage' disabled
                                            {...register('free_wheel_passage', { required: true })} />
                                        <label htmlFor='free_wheel_passage' className='form-label'>Free Wheel Passage</label>
                                    </div>
                                </div>

                                <div className='row g-2 mb-2'>
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='rail_type' autoComplete='off' placeholder='Rail Type' disabled
                                            {...register('rail_type', { required: true })} />
                                        <label htmlFor='rail_type' className='form-label'>Rail Type</label>
                                    </div>
                                    
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='track_form' autoComplete='off' placeholder='Track Form' disabled
                                            {...register('track_form', { required: true })} />
                                        <label htmlFor='track_form' className='form-label'>Track Form</label>
                                    </div>
                                </div>

                                <div className='row g-2 mb-2'>
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='points_position_indicator_present' autoComplete='off' placeholder='PPI Present' disabled
                                            {...register('points_position_indicator_present', { required: true })} />
                                        <label htmlFor='points_position_indicator_present' className='form-label'>PPI Present</label>
                                    </div>
                                    
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='points_barable' autoComplete='off' placeholder='Points Barable' disabled
                                            {...register('points_barable', { required: true })} />
                                        <label htmlFor='points_barable' className='form-label'>Points Barable</label>
                                    </div>
                                </div>

                                <div className='row g-2 mb-2'>
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='points_position_indicator_shows_left' autoComplete='off' placeholder='PPI Shows Left' disabled
                                            {...register('points_position_indicator_shows_left', { required: true })} />
                                        <label htmlFor='points_position_indicator_shows_left' className='form-label'>PPI Shows Left</label>
                                    </div>
                                    
                                    <div className='form-floating  col-sm-6'>
                                        <input type='text' className='form-control' id='points_position_indicator_shows_right' autoComplete='off' placeholder='PPI Show Right' disabled
                                            {...register('points_position_indicator_shows_right', { required: true })} />
                                        <label htmlFor='points_position_indicator_shows_right' className='form-label'>PPI Show Right</label>
                                    </div>
                                </div>

                                <div className='row g-2 mb-2'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='operation_restrictions' autoComplete='off' rows='2' style={{height:'auto'}}
                                            placeholder='Operational Restrictions' disabled
                                            {...register('operation_restrictions', { minLength: 10})}
                                        />
                                        <label htmlFor='operation_restrictions' className='form-label'>Operational Restrictions</label>
                                    </div>
                                </div>

                                <div className='row g-2 mb-2'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='operation_procedure' autoComplete='off' rows='2' style={{height:'auto'}}
                                            placeholder='Operational Procedure' disabled
                                            {...register('operation_procedure', { minLength: 10})}
                                        />
                                        <label htmlFor='operation_procedure' className='form-label'>Operational Procedure</label>
                                    </div>
                                </div>

                                <div className='row g-2 mb-2'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='notes' autoComplete='off' rows='2' style={{height:'auto'}}
                                            placeholder='Notes' disabled
                                            {...register('notes', { minLength: 10})}
                                        />
                                        <label htmlFor='notes' className='form-label'>Notes</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mb-3'>
                    
                </div>
            </form>
        </div>
    );
}

export default PointsMachineForm;