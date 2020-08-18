import {reactLocalStorage} from 'reactjs-localstorage';
import moment from 'moment';
import {isEmpty} from 'lodash';

import EndPoint from './../constant/EndPoint';
import {get, call} from './../utils/FetchUtils';

const loggedHandler = async (loggedInCb, notLoggedInCallback) => {

    if(isEmpty(reactLocalStorage.getObject('token'))){
        notLoggedInCallback();
    }else{
        let response = await get(EndPoint.USER_INFO);
        if (response.ok) {
            loggedInCb(await response.json());
        } else {
            notLoggedInCallback();
        }
    }
}

const login = async (username, password, callback) => {
    try {

        let response = await call(EndPoint.LOGIN, {
            username,
            password
        });

        if(response.ok){
            response = await response.json();

            // Save refresh token in storage
            reactLocalStorage.setObject('token',{
                username,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                expiresIn: moment().valueOf()
            });
    
            window.location.replace("/");
            callback();
        }else callback('400')

    } catch (err) {
        var code = err.code;
        console.error(err);
        callback(code);
    }
}

const signOut = (callback) => {
    reactLocalStorage.remove('token');
    callback();
}

const isLoggedIn = (loggedIn) => {
    return loggedIn;
}

export {
    loggedHandler,
    login,
    signOut,
    isLoggedIn
};
