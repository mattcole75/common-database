import React from 'react';

const MapHeader = () => {

    const refresh = () => {

    }

    return (
        <div className='container d-flex flex-wrap justify-content-center mt-3'>

            <div className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none'>
                <h3 className="heading-primary">
                    <span className='heading-primary_main'>Sensors</span>
                </h3>
            </div>

            <div className='form-floating text-end col-sm-1'>
                <button type='button' className='btn btn-sm p-0'onClick={ refresh }>New Monitoring Point</button>
            </div>
        </div>
    );
};

export default MapHeader;