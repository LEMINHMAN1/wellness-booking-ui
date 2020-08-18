import { reactLocalStorage } from 'reactjs-localstorage';
import { isEmpty } from 'lodash';
import moment from 'moment';

import EndPoint from './../constant/EndPoint';

const call = async (endpoint, data, method, needAuthentication) => {

    if (needAuthentication) {
        let tokenObj = reactLocalStorage.getObject('token');
        let accessTokenFromStorage = '';
        let refreshTokenFromStorage = '';
        let accessTokenExpiresIn = 0;
        let username = '';
        if (!isEmpty(tokenObj)) {
            accessTokenFromStorage = tokenObj.accessToken;
            refreshTokenFromStorage = tokenObj.refreshToken;
            accessTokenExpiresIn = tokenObj.expiresIn;
            username = tokenObj.username;
        }

        // Get new token after 1 day, because access token will expired after 1 day
        if (Number(accessTokenExpiresIn) >= Number(moment().valueOf())) {
            const getTokenRes = getNewAccessToken(username, refreshTokenFromStorage);
            if (!isEmpty(getTokenRes)) {
                accessTokenFromStorage = getTokenRes.accessToken;

                // Override token object in local storage
                reactLocalStorage.setObject('token', {
                    username,
                    accessToken: accessTokenFromStorage,
                    refreshToken: refreshTokenFromStorage,
                    expiresIn: moment().add(1, 'd').valueOf()
                });
            }
        }

        return await fetch(endpoint, {
            method: method || "POST",
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${accessTokenFromStorage}`
            },
            body: JSON.stringify(data)
        });
    }

    // No need authentication
    return await fetch(endpoint, {
        method: method || "POST",
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

const get = async (endpoint, accessToken) => {

    let tokenObj = reactLocalStorage.getObject('token');
    let accessTokenFromStorage = '';
    let refreshTokenFromStorage = '';
    let accessTokenExpiresIn = 0;
    let username = '';
    if (!isEmpty(tokenObj)) {
        accessTokenFromStorage = tokenObj.accessToken;
        refreshTokenFromStorage = tokenObj.refreshToken;
        accessTokenExpiresIn = tokenObj.expiresIn;
        username = tokenObj.username;
    }

    // Get new token after 1 day, because access token will expired after 1 day
    if (Number(accessTokenExpiresIn) >= Number(moment().valueOf())) {
        const getTokenRes = getNewAccessToken(username, refreshTokenFromStorage);
        if (!isEmpty(getTokenRes)) {
            accessTokenFromStorage = getTokenRes.accessToken;

            // Override token object in local storage
            reactLocalStorage.setObject('token', {
                username,
                accessToken: accessTokenFromStorage,
                refreshToken: refreshTokenFromStorage,
                expiresIn: moment().add(1, 'd').valueOf()
            });
        }
    }

    return fetch(endpoint, {
        method: "GET",
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Authorization': `bearer ${accessToken || accessTokenFromStorage}`
        },
    });
}

const getNewAccessToken = async (username,refreshToken)=> {
    let result = null;
    const getTokenRes = await call(EndPoint.NEW_TOKEN, { username, refreshToken });
    if(!getTokenRes.ok){
        reactLocalStorage.remove('token');
        window.location.reload();
        return;
    }
    if (!isEmpty(getTokenRes)) {

        // Override token object in local storage
        reactLocalStorage.setObject('token', {
            username,
            accessToken: getTokenRes.accessToken,
            refreshToken: refreshToken,
            expiresIn: moment().add(1, 'd').valueOf()
        });

        return getTokenRes.accessToken;

    }
    return result;
}

export {
    get,
    call
}