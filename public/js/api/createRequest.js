/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let request = new XMLHttpRequest;
    if (options.responseType) {
        request.responseType = options.responseType;
    }
    request.withCredentials = true;
    /*   for (let key in options.headers) {
           request.setRequestHeader(`${key}`, `${options.headers[key]}`)
       }*/

    let callback = options.callback;

    request.onload = function () {
        callback.call(this, null, request.response);
    };
    request.onerror = function () {
        const err = new Error('Request Error');
        callback.call(this, err);
    };
    let formData = new FormData;
    if (options.method === 'GET') {
        let query = '';
        for (let key in options.data) {
            query += `${key}=${options.data[key]}&`
        }
        options.url = options.url + '?' + query;
    } else {
        for (let key in options.data) {
            formData.append(`${key}`, `${options.data[key]}`);
        }
    }
    try {
        request.open(options.method, options.url);
        request.send(formData);
    } catch (err) {
        callback.call(this, err);
        return request;
    }
    return request;

};

