import React from 'react';
import '../../../monitoring.css';
import { Link } from 'react-router-dom';

const TableListItem = (props) => {

    
    const { item, setSensor, toggleEditingSensor } = props;

    const editSensor = () => {
        setSensor(item);
        toggleEditingSensor();
    }
    
    return (
        <tr className='cursor-pointer' key={ item.id }>
            <td>{ item.name }</td>
            <td>{ item.type }</td>
            <td><button type='button' className='btn btn-sm p-0'onClick={ editSensor }><span className='bi-pencil-square fs-5' /></button></td>
            <td><Link to={`/monitoring/sensor/view/${item.id}`} className='btn btn-sm btn-warning'>View</Link></td>
        </tr>
    );
}

export default TableListItem;