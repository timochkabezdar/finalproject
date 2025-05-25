// Получаем элемент, куда перетаскиваем поля формы (область построения формы)
const formPreview = document.getElementById('formPreview'); // Получение области для перетаскивания


// Получаем контейнер, в который добавляем созданные элементы формы
const form = document.getElementById('form'); // Получение контейнера формы


// Элемент для вывода сгенерированного HTML-кода формы
const output = document.getElementById('output'); // Получение элемента для вывода HTML кода


// Счётчик для уникальных id элементов формы (чтобы не было дублирования)
let elementCount = 0; // Инициализация счётчика для уникальных идентификаторов


// Назначаем обработчик события dragstart для всех элементов с классом .draggable
// При начале перетаскивания записываем в dataTransfer тип элемента (data-type)
document.querySelectorAll('.draggable').forEach(item => { // Выбор всех элементов с классом .draggable
    item.addEventListener('dragstart', (e) => { // Назначение события при начале перетаскивания
        e.dataTransfer.setData('text/plain', item.dataset.type); // Сохранение типа элемента для передачи
    });
});


// Обработчик события dragover для области formPreview — нужен, чтобы разрешить сброс (drop)
formPreview.addEventListener('dragover', (e) => { // Назначение события при перетаскивании над областью
    e.preventDefault(); // Разрешение сброса, предотвращая стандартное поведение
});
    // Получаем тип перетаскиваемого элемента из dataTransfer
    const type = e.dataTransfer.getData('text/plain'); // Получение типа элемента


    // Увеличиваем счётчик для уникальных id элементов
    elementCount++; // Увеличение счётчика для нового элемента


    // Создаём обёртку для нового элемента формы
    const elementWrapper = document.createElement('div'); // Создание контейнера для элемента формы
    elementWrapper.className = 'form-element-wrapper'; // Назначение класса для стилизации
    elementWrapper.dataset.type = type; // Сохранение типа элемента в дата-атрибут
    elementWrapper.dataset.id = elementCount; // Сохранение уникального id в дата-атрибут
// В зависимости от типа создаём соответствующий элемент формы
    switch (type) {
        case 'text': { // Обработка для текстового поля
            // Создаём метку для текстового поля
            const label = document.createElement('label'); // Создание элемента label
            label.htmlFor = `text${elementCount}`; // Связь с input по id
            label.textContent = 'Текстовое поле'; // Текст метки


            // Создаём поле ввода текста
            const input = document.createElement('input'); // Создание элемента input
            input.type = 'text'; // Установка типа input
            input.id = `text${elementCount}`; // Уникальный id
            input.name = `text${elementCount}`; // Имя для формы
            input.placeholder = 'Введите текст'; // Placeholder

            // Добавляем метку и поле в обёртку
            elementWrapper.appendChild(label); // Вставка метки
            elementWrapper.appendChild(input); // Вставка input
            break; // Выход из case
        };
        case 'textarea': { // Обработка для текстовой области
            // Создаём метку для textarea
            const label = document.createElement('label'); // Создание label
            label.htmlFor = `textarea${elementCount}`; // Связь с textarea
            label.textContent = 'Текстовая область'; // Текст метки


            // Создаём сам textarea
            const textarea = document.createElement('textarea'); // Создание textarea
            textarea.id = `textarea${elementCount}`; // Уникальный id
            textarea.name = `textarea${elementCount}`; // Имя


            // Добавляем метку и textarea в обёртку
            elementWrapper.appendChild(label); // Вставка метки
            elementWrapper.appendChild(textarea); // Вставка textarea
            break; // Выход из case
        };
    // Создаём кнопку для удаления этого элемента формы
    const removeBtn = document.createElement('button'); // Создание кнопки удаления
    removeBtn.type = 'button'; // Установка типа кнопки
    removeBtn.textContent = 'Удалить элемент'; // Текст на кнопке
    removeBtn.className = 'remove-element-btn'; // Назначение класса для стилизации
    // Назначаем обработчик клика для удаления элемента
    removeBtn.addEventListener('click', () => { // Обработка клика по кнопке удаления
        elementWrapper.remove(); // Удаление обёртки полностью
    });
       // Добавляем метку, select и кнопку в обёртку
            elementWrapper.appendChild(label); // Метка
            elementWrapper.appendChild(select); // select
            elementWrapper.appendChild(addOptionBtn); // кнопка
            break; // Выход из case
        case 'checkbox': { // Обработка группы чекбоксов
            // Создаём метку для группы чекбоксов
            const label = document.createElement('label'); // Метка
            label.textContent = 'Чекбокс'; // Текст


            // Создаём контейнер для вариантов чекбоксов
            const optionsContainer = document.createElement('div'); // Контейнер варианта
            optionsContainer.className = 'options-container'; // Назначение класса


            // Функция для добавления варианта чекбокса
            function addCheckboxOption(text) { // Функция добавления варианта
                const optionWrapper = document.createElement('div'); // Обёртка варианта
                optionWrapper.className = 'option-wrapper'; // Класс


                // Создаём input типа checkbox
                const input = document.createElement('input'); // Чекбокс
                input.type = 'checkbox'; // Тип
                input.name = `checkboxGroup${elementCount}`; // Группа


                // Создаём метку для варианта
                const optionLabel = document.createElement('label'); // Метка
                optionLabel.textContent = text; // Текст


                // Создаём кнопку для удаления варианта
                const removeOptionBtn = document.createElement('button'); // Кнопка
                removeOptionBtn.type = 'button'; // Тип
                removeOptionBtn.textContent = '×'; // Значение
                removeOptionBtn.title = 'Удалить вариант'; // Подсказка
                removeOptionBtn.className = 'remove-option-btn'; // Класс


                // Обработчик для удаления варианта
                removeOptionBtn.addEventListener('click', () => { // Обработка клика
                    optionWrapper.remove(); // Удаление варианта
                });


                // Собираем вариант: чекбокс + метка + кнопка
                optionWrapper.appendChild(input); // Чекбокс
                optionWrapper.appendChild(optionLabel); // Метка
                optionWrapper.appendChild(removeOptionBtn); // Кнопка


                // Добавляем вариант в контейнер
                optionsContainer.appendChild(optionWrapper); // Вставка варианта
            };
// Создаём кнопку для добавления варианта чекбокса
            const addOptionBtn = document.createElement('button'); // Кнопка
            addOptionBtn.type = 'button'; // Тип
            addOptionBtn.textContent = 'Добавить вариант'; // Текст


            // Обработчик для добавления варианта
            addOptionBtn.addEventListener('click', () => { // Обработка
                const optionText = prompt('Введите текст варианта:'); // Запрос текста
                if (optionText) addCheckboxOption(optionText); // Добавление варианта
            });


            // Добавляем в обёртку: метку, контейнер вариантов и кнопку
            elementWrapper.appendChild(label); // Метка
            elementWrapper.appendChild(optionsContainer); // Контейнер
            elementWrapper.appendChild(addOptionBtn); // Кнопка
            break; // Выход из case
        }
        case 'radio': { // Обработка группы радиокнопок
            // Создаём метку для группы радио
            const label = document.createElement('label'); // Метка
            label.textContent = 'Радио-кнопка'; // Текст


            // Создаём контейнер для вариантов радио
            const optionsContainer = document.createElement('div'); // Контейнер
            optionsContainer.className = 'options-container'; // Класс


            // Функция для добавления варианта радио
            function addRadioOption(text) { // Функция
                const optionWrapper = document.createElement('div'); // Обёртка
                optionWrapper.className = 'option-wrapper'; // Класс


                // Создаём input типа radio
                const input = document.createElement('input'); // Радио
                input.type = 'radio'; // Тип
                input.name = `radioGroup${elementCount}`; // Группа


                // Создаём метку для варианта
                const optionLabel = document.createElement('label'); // Метка
                optionLabel.textContent = text; // Текст


                // Создаём кнопку для удаления варианта
                const removeOptionBtn = document.createElement('button'); // Кнопка
                removeOptionBtn.type = 'button'; // Тип
                removeOptionBtn.textContent = '×'; // Значение
                removeOptionBtn.title = 'Удалить вариант'; // Подсказка
                removeOptionBtn.className = 'remove-option-btn'; // Класс


                // Обработчик для удаления варианта
                removeOptionBtn.addEventListener('click', () => { // Обработка
                    optionWrapper.remove(); // Удаление варианта
                });


                // Собираем вариант: радио + метка + кнопка
                optionWrapper.appendChild(input); // Радио
                optionWrapper.appendChild(optionLabel); // Метка
                optionWrapper.appendChild(removeOptionBtn); // Кнопка


                // Добавляем вариант в контейнер
                optionsContainer.appendChild(optionWrapper); // Вставка варианта
            }


            // Создаём кнопку для добавления варианта радио
            const addOptionBtn = document.createElement('button'); // Кнопка
            addOptionBtn.type = 'button'; // Тип
            addOptionBtn.textContent = 'Добавить вариант'; // Текст


            // Обработчик для добавления варианта
            addOptionBtn.addEventListener('click', () => { // Обработка
                const optionText = prompt('Введите текст варианта:'); // Запрос текста
                if (optionText) addRadioOption(optionText); // Добавление варианта
            });


            // Вставляем в обёртку: метку, контейнер вариантов и кнопку
            elementWrapper.appendChild(label); // Метка
            elementWrapper.appendChild(optionsContainer); // Контейнер
            elementWrapper.appendChild(addOptionBtn); // Кнопка
            break; // Выход из case
        }

    // В конец обёртки добавляем кнопку удаления элемента
    elementWrapper.appendChild(removeBtn); // Кнопка удаления


    // Добавляем созданный элемент формы в контейнер формы
    form.appendChild(elementWrapper); // Вставка элемента формы
    }
    // Функция для генерации HTML кода всей формы с учётом всех элементов и вариантов
function generateFormHTML() { // Определение функции
    let html = '<form>\n'; // Начинаем тег формы


    // Получаем все обёртки элементов формы
    const wrappers = form.querySelectorAll('.form-element-wrapper'); // Выбор всех элементов-обёрток


    // Обрабатываем каждый элемент
    wrappers.forEach(wrapper => { // Перебор всех обёрток
        const type = wrapper.dataset.type; // Получение типа элемента


        if (type === 'text') { // Обработка текста
            // Для текстового поля получаем input и метку
            const input = wrapper.querySelector('input[type="text"]'); // Поиск input
            const label = wrapper.querySelector('label'); // Поиск метки


            // Генерируем HTML для метки и поля
            html += `  <label for="${input.id}">${label.textContent}</label>\n`; // Метка
            html += `  <input type="text" id="${input.id}" name="${input.name}" placeholder="${input.placeholder}">\n`; // Input

        } else if (type === 'textarea') { // Обработка textarea
            // Для textarea получаем textarea и метку
            const textarea = wrapper.querySelector('textarea'); // Поиск textarea
            const label = wrapper.querySelector('label'); // Поиск метки


            // Генерируем HTML для метки и textarea
            html += `  <label for="${textarea.id}">${label.textContent}</label>\n`; // Метка
            html += `  <textarea id="${textarea.id}" name="${textarea.name}">${textarea.value}</textarea>\n`; // Textarea

        } else if (type === 'select') { // Обработка select
            // Для select получаем select и метку
            const select = wrapper.querySelector('select'); // Поиск select
            const label = wrapper.querySelector('label'); // Поиск метки


            // Генерируем HTML для метки и select с вариантами
            html += `  <label for="${select.id}">${label.textContent}</label>\n`; // Метка
            html += `  <select id="${select.id}" name="${select.name}">\n`; // Начало select
            // Добавляем все options
            Array.from(select.options).forEach(option => { // Перебор вариантов
                html += `    <option value="${option.value}">${option.text}</option>\n`; // Вариант
            });
            html += '  </select>\n'; // Закрытие select
        } else if (type === 'checkbox') { // Обработка чекбоксов
            // Для чекбоксов перебираем все варианты
            const optionsContainer = wrapper.querySelector('.options-container'); // Контейнер вариантов
            Array.from(optionsContainer.children).forEach(optionWrapper => { // Перебор вариантов
                const input = optionWrapper.querySelector('input[type="checkbox"]'); // Поиск чекбокса
                const label = optionWrapper.querySelector('label'); // Поиск метки
                // Генерируем HTML для каждого варианта
                html += `  <label>\n`; // Начало метки
                html += `    <input type="checkbox" name="${input.name}" value="${label.textContent}">\n`; // Чекбокс
                html += `    ${label.textContent}\n`; // Текст варианта
                html += `  </label>\n`; // Конец метки
            });
        } else if (type === 'radio') { // Обработка радиокнопок
            // Для радиокнопок перебираем все варианты
            const optionsContainer = wrapper.querySelector('.options-container'); // Контейнер вариантов
            Array.from(optionsContainer.children).forEach(optionWrapper => { // Перебор вариантов
                const input = optionWrapper.querySelector('input[type="radio"]'); // Поиск радио
                const label = optionWrapper.querySelector('label'); // Поиск метки
                // Генерируем HTML для каждого варианта
                html += `  <label>\n`; // Начало метки
                html += `    <input type="radio" name="${input.name}" value="${label.textContent}">\n`; // Радио
                html += `    ${label.textContent}\n`; // Текст варианта
                html += `  </label>\n`; // Конец метки
            });
        }
    });


    html += '</form>'; // Закрытие тега формы
    return html; // Возврат готового HTML
}
