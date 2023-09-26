import React from 'react';
import BackDrop from '../backdrop/backdrop';

const modal = (props) => (
    <React.Fragment>
        <BackDrop show={props.show} clicked={props.modalClosed} />
        <div className='modal' tabIndex='-1' role='dialog'
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0',
                display: props.show ? 'block' : null
            }}>
            <div className='modal-dialog modal-dialog-centered' role='document'>
                <div className='modal-content'>
                    <div className='modal-body'>
                        {props.content}
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
)

export default modal;