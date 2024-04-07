import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sensorCreateSensor, sensorUpdateSensor } from '../../../store/actions/index';

import Sensor from './form/sensor';
import Filter from './filter/filter';
import SensorList from './list/list';
import Modal from '../../ui/modal/modal';
// import Spinner from '../../ui/spinner/spinner';


const Sensors = () => {

    

    const dispatch = useDispatch();

    const { idToken } = useSelector(state => state.auth);
    const { sensors, monitoringPoint } = useSelector(state => state.sensor);
    
    const [ creatingSensor, setCreatingSensor ] = useState(false);
    const [ editingSensor, setEditingSensor ] = useState(false);
    const [ sensor, setSensor] = useState(null);

    const onCreateSensor = useCallback((idToken, data, identifier) => dispatch(sensorCreateSensor(idToken, data, identifier)), [dispatch]);
    const onUpdateSensor = useCallback((idToken, data, identifier) => dispatch(sensorUpdateSensor(idToken, data, identifier)), [dispatch]);
    

    const handleCreateSensor = (data) => {
        onCreateSensor(idToken, data, 'CREATE_SENSOR');
        toggleCreatingSensor();
    }

    const handleUpdateSensor = (data) => {
        onUpdateSensor(idToken, data,'UPDATE_SENSOR');
        toggleEditingSensor();
    }

    const toggleCreatingSensor = () => {
        setCreatingSensor(prev => !prev);
    }

    const toggleEditingSensor = () => {
        setEditingSensor(prev => !prev);
    }


    let modal = null;

    if(creatingSensor) {
        modal = <Modal 
            show={ creatingSensor } 
            modalClosed={ toggleCreatingSensor } 
            content={
                <Sensor
                    sensor={ null }
                    toggleCreatingSensor={ toggleCreatingSensor }
                    save={ handleCreateSensor }
                />
            }/>
    }

    if(editingSensor) {
        modal = <Modal 
            show={ editingSensor } 
            modalClosed={ toggleEditingSensor } 
            content={
                <Sensor
                    sensor={ sensor }
                    toggleCreatingSensor={ toggleEditingSensor }
                    save={ handleUpdateSensor }
                />
            }/>
    }


    return (
        <div className='container'>

            { modal }

            <div className='u-margin-bottom-small'>
                <Filter toggleCreatingSensor={ toggleCreatingSensor } monitoringPointRef={ monitoringPoint?.id } />
            </div>

            <div>
                <SensorList sensors={ sensors } setSensor={ setSensor } toggleEditingSensor={ toggleEditingSensor } />
            </div>

        </div>
    );
}

export default Sensors;