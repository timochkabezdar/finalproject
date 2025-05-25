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
        }
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
        }