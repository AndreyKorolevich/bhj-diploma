/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
    /**
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * Сохраняет переданный элемент и регистрирует события
     * через registerEvents()
     * */
    constructor(element) {
        if (!element) {
            throw new Error('Element is not defined');
        }
        this.element = element;
        this.registerEvents();
    }

    /**
     * Вызывает метод render для отрисовки страницы
     * */
    update() {
        if (this.lastOptions) {
            this.render(this.lastOptions);
            return
        }
        this.render();

    }

    /**
     * Отслеживает нажатие на кнопку удаления транзакции
     * и удаления самого счёта. Внутри обработчика пользуйтесь
     * методами TransactionsPage.removeTransaction и
     * TransactionsPage.removeAccount соответственно
     * */
    registerEvents() {
        document.querySelector('.remove-account').addEventListener('click', () => {
            this.removeAccount();
        });
      /*  document.querySelector('.transaction__remove').addEventListener('click', (event) => {
            this.removeTransaction(event.target.dataset.id);
        });*/
    }

    /**
     * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
     * Если пользователь согласен удалить счёт, вызовите
     * Account.remove, а также TransactionsPage.clear с
     * пустыми данными для того, чтобы очистить страницу.
     * По успешному удалению необходимо вызвать метод App.update()
     * для обновления приложения
     * */
    removeAccount() {
        if (!this.lastOptions) {
            return
        }
        let isDelete = confirm('Вы действительно хотите удалить счёт?');
        if (isDelete) {
            this.clear();
            Account.remove(this.lastOptions, {}, (err, response) => {
                if (!response.success) {
                    return
                }
                App.update();
            })
        }
    }

    /**
     * Удаляет транзакцию (доход или расход). Требует
     * подтверждеия действия (с помощью confirm()).
     * По удалению транзакции вызовите метод App.update()
     * */
    removeTransaction(id) {
        let isDelete = confirm('Вы действительно хотите удалить эту транзакцию?');
        if (isDelete) {
            Transaction.remove(id, {}, (err, response) => {
                if (!response.success) {
                    return
                }
                App.update();
            })
        }
    }

    /**
     * С помощью Account.get() получает название счёта и отображает
     * его через TransactionsPage.renderTitle.
     * Получает список Transaction.list и полученные данные передаёт
     * в TransactionsPage.renderTransactions()
     * */
    render(options) {
        if (!options) {
            return
        }
        this.lastOptions = options;
        Account.get(options.account_id, {}, (err, response) => {
            if (!response.success) {
                return
            }
            console.log(response)
            this.renderTitle(response.name)
        });
        Transaction.list(options, (err, response) => {
            if (!response.success) {
                return
            }
            this.renderTransactions(response.data);
        })
    }

    /**
     * Очищает страницу. Вызывает
     * TransactionsPage.renderTransactions() с пустым массивом.
     * Устанавливает заголовок: «Название счёта»
     * */
    clear() {
        this.renderTransactions([]);
        this.renderTitle('Название счёта');
        this.lastOptions = null;
    }

    /**
     * Устанавливает заголовок в элемент .content-title
     * */
    renderTitle(name) {
        document.querySelector('.content-title').textContent = name;

    }

    /**
     * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
     * в формат «10 марта 2019 г. в 03:20»
     * */
    formatDate(date) {
        let formatDate = new Date(date);

        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
        };

        return (formatDate.toLocaleString("ru", options));
    }

    /**
     * Формирует HTML-код транзакции (дохода или расхода).
     * item - объект с информацией о транзакции
     * */
    getTransactionHTML(item) {
     // console.log(item)
        return `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      ${item.sum} 
      <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
    }

    /**
     * Отрисовывает список транзакций на странице
     * используя getTransactionHTML
     * */
    renderTransactions(data) {
        let content = document.querySelector('.content');
        data.forEach(elem => {
            content.innerHTML += this.getTransactionHTML(elem);
        })
    }
}
