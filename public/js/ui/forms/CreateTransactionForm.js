/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();
    if (currentUser) {
      Account.list(currentUser.id, (err, response) => {
        if (!response.success) {
          return
        }
        document.querySelectorAll('.accounts-select').forEach( elem => elem.innerHTML = '');
        document.querySelectorAll('.accounts-select').forEach(elem => {
            for (let i = 0; i < response.data.length; i++) {
              let newOption = new Option(response.data[i].name, response.data[i].id);
              elem.append(newOption);
          }
        })
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options.data, (err, response) => {
      if (!response.success) {
        return
      }
      this.element.reset();
      App.update();
      const modal = new Modal(this.element.closest('.modal'));
      modal.close();
    })
  }
}
