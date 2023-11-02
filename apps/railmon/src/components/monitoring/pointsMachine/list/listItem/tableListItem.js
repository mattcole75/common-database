import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../monitoring.css';

const TableListItem = (props) => {

    const navigate = useNavigate();
    
    const { id, turnout,
        left_swing_time_current_avg, left_swing_time_measurement_mode, left_swing_time_performance_status,
        right_swing_time_current_avg, right_swing_time_measurement_mode, right_swing_time_performance_status,
        swing_time_safety_limit } = props;
    
    let leftModeStyle = [];
    let leftSwingStyle = ['badge', 'text-nowrap'];
    let leftStatusStyle = [];
    let rightModeStyle = [];
    let rightSwingStyle = ['badge', 'text-nowrap'];
    let rightStatusStyle = [];

    // left swing time format
    // const leftSwingPerformance = determinePointsSwingTimePerformance(left_swing_time_avg, left_swing_time_standard_deviation, left_swing_time_current_avg, swing_time_safety_limit);
    switch (left_swing_time_performance_status) {
        case 'Unknown':
            leftSwingStyle.push('bg-secondary');
            leftStatusStyle.push('text-secondary');
            break;
        case 'OK':
            leftSwingStyle.push('bg-success');
            leftStatusStyle.push('text-success');
            break;
        case 'Monitor':
            leftSwingStyle.push('bg-info');
            leftStatusStyle.push('text-info');
            break;
        case 'Action':
            leftSwingStyle.push('bg-warning');
            leftStatusStyle.push('text-warning');
            break;
        case 'Immediate Action':
            leftSwingStyle.push('bg-danger');
            leftStatusStyle.push('text-danger');
            break;
        case 'Safety Limit Exceeded':
            leftSwingStyle.push('bg-danger');
            leftStatusStyle.push('text-danger');
            break;
        default:
            leftSwingStyle.push('bg-secondary');
            leftStatusStyle.push('text-secondary');
    }
    if(left_swing_time_measurement_mode === 'OS')
        leftModeStyle.push('text-danger');
    else
        leftModeStyle.push('text-success');

    // right swing time format
    // const rightSwingPerformance = determinePointsSwingTimePerformance(right_swing_time_avg, right_swing_time_standard_deviation, right_swing_time_current_avg, swing_time_safety_limit);
    switch (right_swing_time_performance_status) {
        case 'Unknown':
            rightSwingStyle.push('bg-secondary');
            rightStatusStyle.push('text-secondary');
            break;
        case 'OK':
            rightSwingStyle.push('bg-success');
            rightStatusStyle.push('text-success');
            break;
        case 'Monitor':
            rightSwingStyle.push('bg-info');
            rightStatusStyle.push('text-info');
            break;
        case 'Action':
            rightSwingStyle.push('bg-warning');
            rightStatusStyle.push('text-warning');
            break;
        case 'Immediate Action':
            rightSwingStyle.push('bg-danger');
            rightStatusStyle.push('text-danger');
            break;
        case 'Safety Limit Exceeded':
            rightSwingStyle.push('bg-danger');
            rightStatusStyle.push('text-danger');
            break;
        default:
            rightSwingStyle.push('bg-secondary');
            rightStatusStyle.push('text-secondary');
    }
    if(right_swing_time_measurement_mode === 'OS')
        rightModeStyle.push('text-danger');
    else
        rightModeStyle.push('text-success');

    const open = () => {
        navigate(`/monitoring/pointsmachine/${id}`);
    }
    
    return (
        <tr className='cursor-pointer' key={ id } onClick={ open }>
            <td>{ id }</td>
            <td>{ turnout }</td>
            <td>{ swing_time_safety_limit }</td>
            <td className={ leftModeStyle.join(' ') }>{ left_swing_time_measurement_mode }</td>
            <td><span className={ leftSwingStyle.join(' ') }>{ left_swing_time_current_avg }</span></td>
            <td className={ leftStatusStyle.join(' ') }>{ left_swing_time_performance_status }</td>
            <td className={ rightModeStyle.join(' ') }>{ right_swing_time_measurement_mode }</td>
            <td><span className={ rightSwingStyle.join(' ') }>{ right_swing_time_current_avg }</span></td>
            <td className={ rightStatusStyle.join(' ') }>{ right_swing_time_performance_status }</td>
            {/* <td>{ swing_time_safety_limit }</td> */}
        </tr>
    );
}

export default TableListItem;