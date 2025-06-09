// Получаем элемент, куда перетаскиваем поля формы (область построения формы)
const formPreview = document.getElementById('formPreview');

// Получаем контейнер, в который добавляем созданные элементы формы
const form = document.getElementById('form');

// Элемент для вывода сгенерированного HTML-кода формы
const output = document.getElementById('output');

// Счётчик для уникальных id элементов формы (чтобы не было дублирования)
let elementCount = 0;

// Назначаем обработчик события dragstart для всех элементов с классом .draggable
// При начале перетаскивания записываем в dataTransfer тип элемента (data-type)
document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.dataset.type);
    });
});

// Обработчик события dragover для области formPreview — нужен, чтобы разрешить сброс (drop)
formPreview.addEventListener('dragover', (e) => {
    e.preventDefault(); // Отменяем стандартное поведение, чтобы разрешить drop
});

// Обработчик события drop — срабатывает, когда пользователь отпускает элемент в области formPreview
formPreview.addEventListener('drop', (e) => {
    e.preventDefault(); // Отменяем стандартное поведение

    // Получаем тип перетаскиваемого элемента из dataTransfer
    const type = e.dataTransfer.getData('text/plain');

    elementCount++; // Увеличиваем счётчик для уникальности id

    // Создаём обёртку для нового элемента формы
    const elementWrapper = document.createElement('div');
    elementWrapper.className = 'form-element-wrapper'; // Класс для стилизации
    elementWrapper.dataset.type = type; // Сохраняем тип в data-атрибут
    elementWrapper.dataset.id = elementCount; // Сохраняем id в data-атрибут

    // Создаём кнопку удаления всего элемента формы
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Удалить элемент';
    removeBtn.className = 'remove-element-btn';
    // При клике удаляем весь элемент вместе с кнопкой
    removeBtn.addEventListener('click', () => {
        elementWrapper.remove();
    });

    // В зависимости от типа создаём соответствующий элемент формы с меткой и настройками
    switch (type) {
        case 'text': {
            // Метка для текстового поля
            const label = document.createElement('label');
            label.htmlFor = `text${elementCount}`; // Связываем с input по id
            label.textContent = 'Текстовое поле';

            // Текстовое поле ввода
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `text${elementCount}`;
            input.name = `text${elementCount}`;
            input.placeholder = 'Введите текст';

            // Добавляем метку и поле в обёртку
            elementWrapper.appendChild(label);
            elementWrapper.appendChild(input);
            break;
        }
        case 'textarea': {
            // Метка для текстовой области
            const label = document.createElement('label');
            label.htmlFor = `textarea${elementCount}`;
            label.textContent = 'Текстовая область';

            // Текстовая область
            const textarea = document.createElement('textarea');
            textarea.id = `textarea${elementCount}`;
            textarea.name = `textarea${elementCount}`;

            // Добавляем метку и область в обёртку
            elementWrapper.appendChild(label);
            elementWrapper.appendChild(textarea);
            break;
        }
        case 'select': {
            // Метка для выпадающего списка
            const label = document.createElement('label');
            label.htmlFor = `select${elementCount}`;
            label.textContent = 'Выпадающий список';

            // Создаём сам select
            const select = document.createElement('select');
            select.id = `select${elementCount}`;
            select.name = `select${elementCount}`;

            // Контейнер для вариантов (не используется в коде, можно убрать или расширить)
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';

            // Кнопка для добавления вариантов в select
            const addOptionBtn = document.createElement('button');
            addOptionBtn.type = 'button';
            addOptionBtn.textContent = 'Добавить вариант';
            // При клике вызывается prompt для ввода текста варианта
            addOptionBtn.addEventListener('click', () => {
                const optionText = prompt('Введите текст варианта:');
                if (optionText) {
                    // Создаём новый option и добавляем в select
                    const option = document.createElement('option');
                    option.value = optionText;
                    option.textContent = optionText;
                    select.appendChild(option);
                }
            });

            // Добавляем метку, select и кнопку в обёртку
            elementWrapper.appendChild(label);
            elementWrapper.appendChild(select);
            elementWrapper.appendChild(addOptionBtn);
            break;
        }
        case 'checkbox': {
            // Метка для группы чекбоксов
            const label = document.createElement('label');
            label.textContent = 'Чекбокс';

            // Контейнер для вариантов чекбоксов
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';

            // Функция добавления варианта чекбокса
            function addCheckboxOption(text) {
                const optionWrapper = document.createElement('div');
                optionWrapper.className = 'option-wrapper';

                // Создаём input типа checkbox
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = `checkboxGroup${elementCount}`; // Общее имя для группы

                // Метка для варианта
                const optionLabel = document.createElement('label');
                optionLabel.textContent = text;

                // Кнопка для удаления варианта
                const removeOptionBtn = document.createElement('button');
                removeOptionBtn.type = 'button';
                removeOptionBtn.textContent = '×';
                removeOptionBtn.title = 'Удалить вариант';
                removeOptionBtn.className = 'remove-option-btn';
                // При клике удаляем этот вариант
                removeOptionBtn.addEventListener('click', () => {
                    optionWrapper.remove();
                });

                // Собираем вариант из чекбокса, метки и кнопки удаления
                optionWrapper.appendChild(input);
                optionWrapper.appendChild(optionLabel);
                optionWrapper.appendChild(removeOptionBtn);

                // Добавляем вариант в контейнер вариантов
                optionsContainer.appendChild(optionWrapper);
            }

            // Кнопка добавления варианта чекбокса
            const addOptionBtn = document.createElement('button');
            addOptionBtn.type = 'button';
            addOptionBtn.textContent = 'Добавить вариант';
            // При клике вызываем prompt и добавляем вариант, если текст введён
            addOptionBtn.addEventListener('click', () => {
                const optionText = prompt('Введите текст варианта:');
                if (optionText) addCheckboxOption(optionText);
            });

            // Добавляем метку, контейнер вариантов и кнопку добавления в обёртку
            elementWrapper.appendChild(label);
            elementWrapper.appendChild(optionsContainer);
            elementWrapper.appendChild(addOptionBtn);
            break;
        }
        case 'radio': {
            // Метка для группы радио-кнопок
            const label = document.createElement('label');
            label.textContent = 'Радио-кнопка';

            // Контейнер для вариантов радио
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';

            // Функция добавления варианта радио
            function addRadioOption(text) {
                const optionWrapper = document.createElement('div');
                optionWrapper.className = 'option-wrapper';

                // Создаём input типа radio
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `radioGroup${elementCount}`; // Общее имя для группы, чтобы работали переключения

                // Метка для варианта
                const optionLabel = document.createElement('label');
                optionLabel.textContent = text;

                // Кнопка удаления варианта
                const removeOptionBtn = document.createElement('button');
                removeOptionBtn.type = 'button';
                removeOptionBtn.textContent = '×';
                removeOptionBtn.title = 'Удалить вариант';
                removeOptionBtn.className = 'remove-option-btn';
                // При клике удаляем вариант
                removeOptionBtn.addEventListener('click', () => {
                    optionWrapper.remove();
                });

                // Собираем вариант из радио, метки и кнопки удаления
                optionWrapper.appendChild(input);
                optionWrapper.appendChild(optionLabel);
                optionWrapper.appendChild(removeOptionBtn);

                // Добавляем вариант в контейнер вариантов
                optionsContainer.appendChild(optionWrapper);
            }

            // Кнопка добавления варианта радио
            const addOptionBtn = document.createElement('button');
            addOptionBtn.type = 'button';
            addOptionBtn.textContent = 'Добавить вариант';
            // При клике вызываем prompt и добавляем вариант
            addOptionBtn.addEventListener('click', () => {
                const optionText = prompt('Введите текст варианта:');
                if (optionText) addRadioOption(optionText);
            });

            // Добавляем метку, контейнер вариантов и кнопку добавления в обёртку
            elementWrapper.appendChild(label);
            elementWrapper.appendChild(optionsContainer);
            elementWrapper.appendChild(addOptionBtn);
            break;
        }
    }

    // Добавляем кнопку удаления элемента в конец обёртки
    elementWrapper.appendChild(removeBtn);

    // Добавляем сформированный элемент формы в контейнер формы
    form.appendChild(elementWrapper);
});

// Функция для генерации HTML-кода всей формы с учётом всех добавленных элементов и вариантов
function generateFormHTML() {
    let html = '<form>\n';

    // Получаем все обёртки элементов формы
    const wrappers = form.querySelectorAll('.form-element-wrapper');

    wrappers.forEach(wrapper => {
        const type = wrapper.dataset.type; // Тип элемента из data-атрибута

        if (type === 'text') {
            // Для текстового поля берём input и label
            const input = wrapper.querySelector('input[type="text"]');
            const label = wrapper.querySelector('label');
            // Формируем HTML с меткой и input
            html += `  <label for="${input.id}">${label.textContent}</label>\n`;
            html += `  <input type="text" id="${input.id}" name="${input.name}" placeholder="${input.placeholder}">\n`;

        } else if (type === 'textarea') {
            // Для текстовой области берём textarea и label
            const textarea = wrapper.querySelector('textarea');
            const label = wrapper.querySelector('label');
            // Формируем HTML с меткой и textarea
            html += `  <label for="${textarea.id}">${label.textContent}</label>\n`;
            html += `  <textarea id="${textarea.id}" name="${textarea.name}"></textarea>\n`;

        } else if (type === 'select') {
            // Для select берём select и label
            const select = wrapper.querySelector('select');
            const label = wrapper.querySelector('label');
            html += `  <label for="${select.id}">${label.textContent}</label>\n`;
            html += `  <select id="${select.id}" name="${select.name}">\n`;
            // Перебираем все option и добавляем их в HTML
            Array.from(select.options).forEach(opt => {
                html += `    <option value="${opt.value}">${opt.textContent}</option>\n`;
            });
            html += `  </select>\n`;

        } else if (type === 'checkbox') {
            // Для группы чекбоксов формируем fieldset с legend
            const label = wrapper.querySelector('label');
            html += `  <fieldset>\n    <legend>${label.textContent}</legend>\n`;
            const options = wrapper.querySelectorAll('.option-wrapper');
            options.forEach((opt, i) => {
                const input = opt.querySelector('input[type="checkbox"]');
                const optLabel = opt.querySelector('label').textContent;
                // Уникальный id для связи label с input
                const id = `${input.name}_${i+1}`;
                // Формируем input и label для варианта
                html += `    <input type="checkbox" id="${id}" name="${input.name}" value="${optLabel}">\n`;
                html += `    <label for="${id}">${optLabel}</label>\n`;
            });
            html += `  </fieldset>\n`;

        } else if (type === 'radio') {
            // Для группы радио формируем fieldset с legend
            const label = wrapper.querySelector('label');
            html += `  <fieldset>\n    <legend>${label.textContent}</legend>\n`;
            const options = wrapper.querySelectorAll('.option-wrapper');
            options.forEach((opt, i) => {
                const input = opt.querySelector('input[type="radio"]');
                const optLabel = opt.querySelector('label').textContent;
                const id = `${input.name}_${i+1}`;
                // Формируем input и label для варианта радио
                html += `    <input type="radio" id="${id}" name="${input.name}" value="${optLabel}">\n`;
                html += `    <label for="${id}">${optLabel}</label>\n`;
            });
            html += `  </fieldset>\n`;
        }
    });

    html += '</form>';
    return html;
}

// Обработчик кнопки "Сгенерировать код" — выводит сформированный HTML в блок output
document.getElementById('generateBtn').addEventListener('click', () => {
    const formHTML = generateFormHTML();
    output.innerText = formHTML; // Показываем сгенерированный код
});

// Обработчик кнопки "Скопировать код" — копирует сгенерированный HTML в буфер обмена
document.getElementById('copyBtn').addEventListener('click', () => {
    const formHTML = generateFormHTML();
    navigator.clipboard.writeText(formHTML).then(() => {
        alert('Код скопирован в буфер обмена!'); // Уведомление об успешном копировании
    }).catch(err => {
        console.error('Ошибка при копировании: ', err);
    });
});

// Обработчик кнопки "Очистить форму" — очищает все элементы формы и вывод
document.getElementById('clearBtn').addEventListener('click', () => {
    form.innerHTML = ''; // Удаляем все элементы из формы
    output.innerText = ''; // Очищаем вывод сгенерированного кода
    elementCount = 0; // Сбрасываем счётчик id
});