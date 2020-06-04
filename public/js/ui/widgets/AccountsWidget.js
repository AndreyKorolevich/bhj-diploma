/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
    /**
     * Устанавливает текущий элемент в свойство element
     * Регистрирует обработчики событий с помощью
     * AccountsWidget.registerEvents()
     * Вызывает AccountsWidget.update() для получения
     * списка счетов и последующего отображения
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (!element) {
            throw new Error('Element is not defined');
        }
        this.element = element;
        this.registerEvents();
        this.update();
    }

    /**
     * При нажатии на .create-account открывает окно
     * #modal-new-account для создания нового счёта
     * При нажатии на один из существующих счетов
     * (которые отображены в боковой колонке),
     * вызывает AccountsWidget.onSelectAccount()
     * */
    registerEvents() {
        const createAccount = document.querySelector('.create-account');
        const sidebarMenu = document.querySelector('.sidebar-menu');
        createAccount.addEventListener('click', () => {
            App.getModal('createAccount').open();
        });

        sidebarMenu.addEventListener('click', (event) => {
            const target = event.target.closest('li');
            if (target.classList.contains('account')) {
                this.onSelectAccount(target);
            }
        })

    }

    /**
     * Метод доступен только авторизованным пользователям
     * (User.current()).
     * Если пользователь авторизован, необходимо
     * получить список счетов через Account.list(). При
     * успешном ответе необходимо очистить список ранее
     * отображённых счетов через AccountsWidget.clear().
     * Отображает список полученных счетов с помощью
     * метода renderItem()
     * */
    update() {
        const currentUser = User.current();
        if (currentUser) {
            this.clear();
            Account.list(currentUser, (err, response) => {
                if (!response.success) {
                    return
                }
                response.data.forEach(elem => this.renderItem(elem));
            })
        }

    }

    /**
     * Очищает список ранее отображённых счетов.
     * Для этого необходимо удалять все элементы .account
     * в боковой колонке
     * */
    clear() {
        document.querySelectorAll('.account').forEach(e => e.remove());
    }

    /**
     * Срабатывает в момент выбора счёта
     * Устанавливает текущему выбранному элементу счёта
     * класс .active. Удаляет ранее выбранному элементу
     * счёта класс .active.
     * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
     * */
    onSelectAccount(element) {
      if(document.querySelector('.active')){
        document.querySelector('.active').classList.remove('active');
      }
        element.classList.add('active');
        App.showPage('transactions', {account_id: element.dataset.id});
    }

    /**
     * Возвращает HTML-код счёта для последующего
     * отображения в боковой колонке.
     * item - объект с данными о счёте
     * */
    getAccountHTML(item) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const span1 = document.createElement('span1');
        const span2 = document.createElement('span2');

        li.className = 'account';
        li.dataset.id = item.id;
        a.href = '#';
        span1.textContent = item.name;
        span2.textContent = item.sum;

        li.insertAdjacentElement('afterbegin', a);
        a.insertAdjacentElement('afterbegin', span1);
        a.insertAdjacentElement('beforeend', span2);

        return li
    }

    /**
     * Получает массив с информацией о счетах.
     * Отображает полученный с помощью метода
     * AccountsWidget.getAccountHTML HTML-код элемента
     * и добавляет его внутрь элемента виджета
     * */
    renderItem(item) {
        const account = this.getAccountHTML(item);
        document.querySelector('.sidebar-menu').insertAdjacentElement('beforeend', account)
    }
}
