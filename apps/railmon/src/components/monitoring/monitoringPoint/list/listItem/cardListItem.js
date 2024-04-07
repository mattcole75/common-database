import React from 'react';
// import { determinePointsSwingTimePerformance } from '../../../../../shared/utility';
import '../../../monitoring.css';

const CardListItem = (props) => {
    const { name, area } = props;

    return (
        <div className='card p-3 mt-0 mb-2'>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div>
                    {/* <h6 className='mb-0'>{ id }</h6> */}
                    <p className='mb-0 opacity-75'>Name: <small className='text-body-secondary'>{ name }</small></p>
                    <p className='mb-0 opacity-75'>Area: <small className='text-body-secondary'>{ area }</small></p>
                </div>
                {/* <div><span className='badge text-nowrap bg-success'>Operational</span></div> */}
            </div>    
        </div>
    );
}

export default CardListItem;