/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
 constructor () {
   this.url = ''
 }
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    let options = {};
    options.url = this.url;
    options.data = data;
    options.callback = callback();
    options.method = 'GET';
    options.responseType = 'json';
    return createRequest(options);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let options = {};
    options.url = this.url;
    options.data = {
     ...data,
      _method: 'PUT'
    };
    options.callback = callback();
    options.method = 'PUT';
    options.responseType = 'json';
    return createRequest(options);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let options = {};
    options.url = this.url;
    options.data = data;
    options.callback = callback();
    options.method = 'GET';
    options.responseType = 'json';
    return createRequest(options);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let options = {};
    options.url = this.url;
    options.data = {
      ...data,
      _method: 'DELETE',
      id: id
    };
    options.callback = callback();
    options.method = 'GET';
    options.responseType = 'json';
    return createRequest(options);
  }
}

