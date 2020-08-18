import React from 'react';

const Comp = ({modalId, title, children, onSubmit, submitLabel}) => {
    return (
        <div className="modal hide" id={modalId} role="dialog" aria-labelledby={modalId+'Label'} data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={modalId+'Label'}>{title}</h5>
                        <button id={`${modalId}_closeModal`} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button onClick={onSubmit} type="button" className="btn btn-success">{submitLabel || 'Create'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comp;