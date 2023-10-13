import React from 'react';
import ListItem from './listItem/listItem';
import '../../auth.css';

const Users = (props) => {

    const { users, toggle } = props;

    const selectUserItem = (item) => {
        toggle(item);
    }
    
    return (
        <div className='container'>
            <hr className='mb-3' />

            {/* For larger screens show a table */}
            <div className='mb-2 user-admin_table'>
                <table className='table table-striped table-hover cursor-pointer'>
                    <thead>
                        <tr>
                            <th scope="col">Display Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users && users.map((item) => (
                            <tr className='cursor-point' key={item.localId} onClick={() => selectUserItem(item)}>
                                <td>{item.displayName}</td>
                                <td>{item.email}</td>
                                <td>{item.inuse 
                                        ? <span className='badge text-nowrap bg-success'>Active</span>
                                        : <span className='badge text-nowrap bg-danger'>Disabled</span>
                                    }
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
                
            </div>

            {/* For smaller screens show a list of cards */}
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 user-admin_card'>
            { users && users.map((item) => (
                <ListItem
                    key={ item.localId }
                    displayName={ item.displayName }
                    email={ item.email }
                    inuse={ item.inuse }
                    item={ item }
                    selectUserItem={ selectUserItem }
                />    
            )) }
            </div>
        </div>
    );
}

export default Users;