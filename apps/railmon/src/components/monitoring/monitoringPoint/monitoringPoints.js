import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sensorCreateMonitoringPoint, sensorUpdateMonitoringPoint } from '../../../store/actions/index';

import Filter from './filter/filter';
import MonitoringPointList from './list/list';
import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

import MonitoringPoint from './form/monitoringPoint';


const MonitoringPoints = () => {

    const dispatch = useDispatch();

    const { idToken } = useSelector(state => state.auth);
    const { monitoringPoints, loading, error, identifier, redirectPath } = useSelector(state => state.sensor);

    const [ creatingMonitoringPoint, setCreatingMonitoringPoint ] = useState(false);
    const [ editingMonitoringPoint, setEditingMonitoringPoint ] = useState(false);
    const [ monitoringPoint, setMonitoringPoint ] = useState(null);

    const onCreateSensorMonitoringPoint = useCallback((idToken, data, identifier) => dispatch(sensorCreateMonitoringPoint(idToken, data, identifier)), [dispatch]);
    const onUpdateSensorMonitoringPoint = useCallback((idToken, data, identifier) => dispatch(sensorUpdateMonitoringPoint(idToken, data, identifier)), [dispatch]);

    const handleCreateMonitoringPoint = (data) => {
        onCreateSensorMonitoringPoint(idToken, data, 'CREATE_SENSOR_MONITORING_POINT');
        toggleCreatingMonitoringPoint();
    }

    const handleUpdateMonitoringPoint = (data) => {
        onUpdateSensorMonitoringPoint(idToken, data, 'UPDATE_SENSOR_MONITORING_POINT');
        toggleEditingMonitoringPoint();
    }

    const toggleCreatingMonitoringPoint = () => {
        setCreatingMonitoringPoint(prev => !prev);
    }

    const toggleEditingMonitoringPoint = () => {
        setEditingMonitoringPoint(prev => !prev);
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    let modal = null;
    if(creatingMonitoringPoint) {
        modal = <Modal 
            show={ creatingMonitoringPoint } 
            modalClose={ toggleCreatingMonitoringPoint } 
            content={
                <MonitoringPoint
                    monitoringPoint={ null }
                    toggleCreatingMonitoringPoint={ toggleCreatingMonitoringPoint }
                    identifier={ identifier }
                    redirectPath={ redirectPath }
                    save={ handleCreateMonitoringPoint }
                />
            }/>
    }
    
    if(editingMonitoringPoint) {
        modal = <Modal 
        show={ editingMonitoringPoint } 
        modalClose={ toggleEditingMonitoringPoint } 
        content={
            <MonitoringPoint
                monitoringPoint={ monitoringPoint }
                toggleCreatingMonitoringPoint={ toggleEditingMonitoringPoint }
                identifier={ identifier }
                redirectPath={ redirectPath }
                save={ handleUpdateMonitoringPoint }
            />
        }/>
    }

    return (
        <div className='container'>
            <Backdrop show={ loading } />
            { spinner }
            { error &&
                <div className='alert alert-danger text-wrap text-break' role='alert'>
                    { error }
                </div>
            }

            { modal }

            <div className='u-margin-bottom-small'>
                <Filter toggleCreatingMonitoringPoint={ toggleCreatingMonitoringPoint } />
            </div>

            <div>
                <MonitoringPointList monitoringPoints={ monitoringPoints } setMonitoringPoint={ setMonitoringPoint } toggleEditingMonitoringPoint={ toggleEditingMonitoringPoint }/>
            </div>
        </div>
    );
}

export default MonitoringPoints;