/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  constructor() {
    this.url = '/user'
  }
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user === null){
      user = undefined
    }
    return user
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    let options = {};
    options.url = this.url + '/current';
    options.data = data;
    options.callback = callback;
    options.method = 'GET';
    options.responseType = 'json';
    const result = createRequest(options);
    if(result.success){
      this.setCurrent(result.user)
    }else {
      this.unsetCurrent()
    }
    return result;

  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    let options = {};
    options.url = this.url + '/register';
    options.data = data;
    options.callback = callback;
    options.method = 'POST';
    options.responseType = 'json';
    const result = createRequest(options);
    if(result.success){
      this.setCurrent(result.user)
    }
    return result;
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    let options = {};
    options.url = this.url + '/login';
    options.data = data;
    options.callback = callback;
    options.method = 'POST';
    options.responseType = 'json';
    const result = createRequest(options);
    if(result.success){
      this.setCurrent(callback().user)
    }
    return result;
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    let options = {};
    options.url = this.url + '/login';
    options.data = data;
    options.callback = callback;
    options.method = 'POST';
    options.responseType = 'json';
    const result = createRequest(options);
    if(result.success){
      this.unsetCurrent()
    }
    return result;
  }
}
