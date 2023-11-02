import React from 'react';
import { useSelector } from 'react-redux';

import Filter from './filter/filter';
import PointsMachineList from './list/list';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';


const PointsMachines = () => {

    const { loading, error, pointsMachines } = useSelector(state => state.pointsMachine);

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    return (
        <div className='container'>
            <Backdrop show={ loading } />
            { spinner }
            { error &&
                <div className='alert alert-danger text-wrap text-break' role='alert'>
                    { error }
                </div>
            }
            <div className='u-margin-bottom-small'>
                <Filter />
            </div>

            <div>
                <PointsMachineList pointsMachines={ pointsMachines }/>
            </div>

        </div>
    );
}

export default PointsMachines;