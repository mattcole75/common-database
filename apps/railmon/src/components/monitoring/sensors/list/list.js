import React from 'react';
import TableListItem from './listItem/tableListItem';
import CardListItem from './listItem/cardListItem';

import '../../monitoring.css';

const SensorList = (props) => {

    const { sensors, setSensor, toggleEditingSensor } = props;
    
    return (
        <div className='container'>
            <hr className='mb-3' />

            {/* For larger screens show a table */}
            <div className='mb-2 points-machine_table'>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Type</th>
                            <th scope='col'></th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        { sensors && sensors.map((item) => (
                            <TableListItem
                                key={ item.id }
                                item={ item }
                                setSensor={ setSensor }
                                toggleEditingSensor={ toggleEditingSensor }
                            />
                        )) }
                    </tbody>
                </table>
                
            </div>

            {/* For smaller screens show a list of cards */}
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 points-machine_card'>
            { sensors && sensors.map((item) => (
                <CardListItem
                    key={ item.id }
                    id={ item.id }
                    name={ item.name }
                    department={ item.department }
                    system={ item.system }
                    type={ item.type }
                />    
            )) }
            </div>
        </div>
    );
}

export default SensorList;