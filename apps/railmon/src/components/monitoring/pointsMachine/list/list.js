import React from 'react';
import TableListItem from './listItem/tableListItem';
import CardListItem from './listItem/cardListItem';

import '../../monitoring.css';

const PointsMachineList = (props) => {

    const { pointsMachines } = props;
    
    return (
        <div className='container'>
            <hr className='mb-3' />

            {/* For larger screens show a table */}
            <div className='mb-2 points-machine_table'>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Turnout</th>
                            <th scope='col'>Safety Limit</th>
                            <th scope='col' colSpan='3'>Left Swing Performance</th>
                            <th scope='col' colSpan='3'>Right Swing Performance</th>
                            {/* <th scope='col'>Safety Limit</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        { pointsMachines && pointsMachines.map((item) => (
                            <TableListItem
                                key={ item.id }
                                id={ item.id }
                                turnout={ item.turnout }
                                swing_time_safety_limit={ item.swing_time_safety_limit }
                               
                                left_swing_time_current_avg={ item.left_swing_time_current_avg }
                                left_swing_time_measurement_mode={ item.left_swing_time_measurement_mode }
                                left_swing_time_performance_status={ item.left_swing_time_performance_status }
                                
                                right_swing_time_current_avg={ item.right_swing_time_current_avg}
                                right_swing_time_measurement_mode={ item.right_swing_time_measurement_mode }
                                right_swing_time_performance_status={ item.right_swing_time_performance_status }
                            />
                        )) }
                    </tbody>
                </table>
                
            </div>

            {/* For smaller screens show a list of cards */}
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 points-machine_card'>
            { pointsMachines && pointsMachines.map((item) => (
                <CardListItem
                    key={ item.id }
                    id={ item.id }
                    turnout={ item.turnout }
                    swing_time_safety_limit={ item.swing_time_safety_limit }
                
                    left_swing_time_current_avg={ item.left_swing_time_current_avg }
                    left_swing_time_measurement_mode={ item.left_swing_time_measurement_mode }
                    left_swing_time_performance_status={ item.left_swing_time_performance_status }
                    
                    right_swing_time_current_avg={ item.right_swing_time_current_avg}
                    right_swing_time_measurement_mode={ item.right_swing_time_measurement_mode }
                    right_swing_time_performance_status={ item.right_swing_time_performance_status }
                />    
            )) }
            </div>
        </div>
    );
}

export default PointsMachineList;