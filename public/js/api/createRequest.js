/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let request = new XMLHttpRequest();
    request.responseType = `${options.responseType}`;
    for (let key in options.headers) {
        request.setRequestHeader(`${key}`, `${options.headers[key]}`)
    }
    if (options.method === 'GET') {
        let query = '';
        for (let key in options.data) {
            query += `${key}=${options.data[key]}&`
        }
        request.open(`${options.method}`, `${options.url}?${query}`);
        request.send();
    } else {
        let formData = new FormData;
        for (let key in options.data) {
            formData.append(`${key}`, `${options.data[key]}`);
        }
        request.open(`${options.method}`, `${options.url}`);
        request.send(formData);
    }

    request.addEventListener('readystatechange', function () {
        if (this.readyState === request.DONE && this.status === 200) {
            try {
                return options.callback(this.response);
            } catch (e) {
                return options.callback(e)
            }
        }
    });
};

