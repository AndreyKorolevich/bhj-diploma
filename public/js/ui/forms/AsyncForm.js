/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
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
     * Необходимо запретить отправку формы. В момент отправки
     * вызывает метод submit()
     * */
    registerEvents() {
        this.element.addEventListener('submit', event => {
            if ( !this.element.checkValidity()) {
                return;
            }
            this.submit();
            event.preventDefault();
        })
    }

    /**
     * Преобразует данные формы в объект вида
     * {
     *  'название поля формы 1': 'значение поля формы 1',
     *  'название поля формы 2': 'значение поля формы 2'
     * }
     * */
    getData() {
        let result = {};
        const inputs = this.element.querySelectorAll('input');
        inputs.forEach(elem => {
            result[elem.name] = elem.value;
        });
        return result
    }

    onSubmit(options) {

    }

    /**
     * Вызывает метод onSubmit и передаёт туда
     * данные, полученные из метода getData()
     * */
    submit() {
        const data = this.getData();
        this.onSubmit({
            data: data
        })
    }
}
