import React from 'react';
import { NavLink } from 'react-router-dom';
import './landing.css';

const MonitoringLanding = () => {

    return (
        <div className='container px-4 py-5' id='icon-grid'>
            <h2 className='pb-2 border-bottom'>Monitoring</h2>

            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5'>

                <NavLink to='/monitoring/points' className='nav-link col d-flex align-items-start'>
                    <i className='bi-alt landing-icon text-body-secondary flex-shrink-0 me-3'></i>
                    <div>
                        <h3 className='fw-bold mb-0 fs-4 text-body-emphasis'>Points Machines</h3>
                        <p>View motorised points machine swing time performance.</p>
                    </div>
                </NavLink>

                <NavLink to='/' className='nav-link col d-flex align-items-start'>
                    <i className='bi-lightbulb landing-icon text-body-secondary flex-shrink-0 me-3'></i>
                    <div>
                        <h3 className='fw-bold mb-0 fs-4 text-body-emphasis'>Future</h3>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </NavLink>

                <NavLink to='/' className='nav-link col d-flex align-items-start'>
                    <i className='bi-lightbulb landing-icon text-body-secondary flex-shrink-0 me-3'></i>
                    <div>
                        <h3 className='fw-bold mb-0 fs-4 text-body-emphasis'>Future</h3>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </NavLink>

                <NavLink to='/' className='nav-link col d-flex align-items-start'>
                    <i className='bi-lightbulb landing-icon text-body-secondary flex-shrink-0 me-3'></i>
                    <div>
                        <h3 className='fw-bold mb-0 fs-4 text-body-emphasis'>Future</h3>
                        <p>Paragraph of text beneath the heading to explain the heading.</p>
                    </div>
                </NavLink>

            </div>
        </div>
    );
}

export default MonitoringLanding;