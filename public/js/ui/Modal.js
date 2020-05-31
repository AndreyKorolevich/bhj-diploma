/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
    /**
     * Устанавливает текущий элемент в свойство element
     * Регистрирует обработчики событий с помощью
     * AccountsWidget.registerEvents()
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (!element) {
            throw new UserException('Element is not defined');
        }
        this.element = element;
        this.registerEvents();
        this.onClose = this.onClose.bind(this);
    }

    /**
     * При нажатии на элемент с data-dismiss="modal"
     * должен закрыть текущее окно
     * (с помощью метода Modal.onClose)
     * */
    registerEvents() {
        this.buttons = this.element.querySelectorAll('[data-dismiss="modal"]');
        this.buttons.forEach(e => e.addEventListener('click', this.onClose));
    }

    /**
     * Срабатывает после нажатия на элементы, закрывающие окно.
     * Закрывает текущее окно (Modal.close())
     * */
    onClose(e) {
        e.preventDefault();
        this.close();
    }

    /**
     * Удаляет обработчики событий
     * */
    unregisterEvents() {
        this.buttons.forEach(e => e.removeEventListener('click', this.onClose));
    }

    /**
     * Открывает окно: устанавливает CSS-свойство display
     * со значением «block»
     * */
    open() {
        this.element.classList.add('modal-block');
    }

    /**
     * Закрывает окно: удаляет CSS-свойство display
     * */
    close() {
        this.element.classList.remove('modal-block');
    }
}
