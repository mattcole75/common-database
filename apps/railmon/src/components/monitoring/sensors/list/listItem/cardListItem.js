import React from 'react';
// import { determinePointsSwingTimePerformance } from '../../../../../shared/utility';
import '../../../monitoring.css';

const CardListItem = (props) => {
    const { name, department, system, type } = props;

    return (
        <div className='card p-3 mt-0 mb-2'>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div>
                    {/* <h6 className='mb-0'>{ id }</h6> */}
                    {/* <p className='mb-0 opacity-75'>ID: <small className='text-body-secondary'>{ id }</small></p> */}
                    <p className='mb-0 opacity-75'>Name: <small className='text-body-secondary'>{ name }</small></p>
                    <p className='mb-0 opacity-75'>Department: <small className='text-body-secondary'>{ department }</small></p>
                    <p className='mb-0 opacity-75'>System: <small className='text-body-secondary'>{ system }</small></p>
                    <p className='mb-0 opacity-75'>Type: <small className='text-body-secondary'>{ type }</small></p>
                </div>
                {/* <div><span className='badge text-nowrap bg-success'>Operational</span></div> */}
            </div>    
        </div>
    );
}

export default CardListItem;