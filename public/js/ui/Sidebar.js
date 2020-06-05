/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
        const button = document.querySelector('.sidebar-toggle');
        button.addEventListener('click', () => {
            document.querySelector('body').classList.toggle('sidebar-open')
            document.querySelector('body').classList.toggle('sidebar-collapse')
        })

    }

    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регастрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() {
        const register = document.querySelector('.menu-item_register');
        register.addEventListener('click', () => {
            const modal = App.getModal('register');
            modal.open();
        })

        const login = document.querySelector('.menu-item_login');
        login.addEventListener('click', () => {
            const modal = App.getModal('login');
            modal.open();
        })

        const logout = document.querySelector('.menu-item_logout');
        logout.addEventListener('click', () => {
            const data = User.current();
            User.logout(data, (err, response) => {
                if (!response.success) {
                    return
                }
                AccountsWidget.clear();
                App.setState('init');
            })
        })
    }

}
