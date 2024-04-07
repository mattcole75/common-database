import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../monitoring.css';

const TableListItem = (props) => {

    const navigate = useNavigate();
    
    const { item, toggleEditingMonitoringPoint, setMonitoringPoint } = props;

    const viewMonitoringPoint = () => {
        navigate(`/monitoring/sensormonitoringpoint/view/${item.id}`);
    }

    const editMonitoringPoint = () => {
        setMonitoringPoint(item);
        toggleEditingMonitoringPoint();
    }
    
    return (
        <tr key={ item.id }>
            {/* <td>{ id.toString().padStart(4, '0') }</td> */}
            <td>{ item.name }</td>
            <td>{ item.area }</td>
            <td><button type='button' className='btn btn-sm p-0'onClick={ editMonitoringPoint }><span className='bi-pencil-square fs-5' /></button></td>
            <td><button type='button' className='btn btn-sm btn-warning'onClick={ viewMonitoringPoint }>View</button></td>
        </tr>
    );
}

export default TableListItem;