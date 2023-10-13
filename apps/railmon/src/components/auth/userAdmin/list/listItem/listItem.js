import React from 'react';

const ListItem = (props) => {
    const { displayName, email, inuse, item, selectUserItem } = props;
    return (
        <div className='card p-3 mt-0 mb-2' onClick={() => selectUserItem(item)}>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div>
                    <h6 className='mb-0'>{ displayName }</h6>
                    <p className='mb-0 opacity-75'>{ email }</p>
                </div>
                { inuse
                    ?   <div><span className='badge text-nowrap bg-success'>Active</span></div>
                    :   <div><span className='badge text-nowrap bg-danger'>Disabled</span></div>
                }
            </div>    
        </div>
    );
}

export default ListItem;