import React, { useRef, useState } from 'react';
import {isEmpty} from 'lodash';
import { login } from '../../utils/AuthUtils';
import './stylesheet.scss';

const Login = () => {

    const [localState, setLocalState] = useState({msgType:'', msg:'', loading: false})

    const usernameRef = useRef(null);
    const passRef = useRef(null);

    const loginHandler = () => {
        const username = usernameRef.current.value;
        const pass = passRef.current.value;

        setLocalState({loading:true});
        if(isEmpty(username) || isEmpty(pass)){
            setLocalState({msgType:'err', msg:'Username and Password must not be empty'});
        }else{
            login(username, pass, code=>{
                setLocalState({loading:false});
                if(isEmpty(code)){
                    setLocalState({msgType:'success', msg:'Login success. Please wait...'});
                }else{
                    setLocalState({msgType:'err', msg:'Wrong Username or Password'});
                }
            });
        }
    }

    const {msgType, msg, loading} = localState;

    return (
        <div className='login-group'>
            <div className="container">
                <div className='lbl'>
                    Enter your Username and Password to login
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input ref={usernameRef} autoComplete='new-password' type="text" className="form-control" placeholder="Username" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input ref={passRef} autoComplete='new-password' type="password" className="form-control" placeholder="Password" />
                    </div>
                </div>
                <div className='btng'>
                    <button type='button' disabled={loading} onClick={loginHandler} className="btn btn-danger">Login</button>
                </div>
                <div className={`msgg ${msgType}`}>
                    {msg}
                </div>
            </div>
        </div>
    );
}

export default Login;
