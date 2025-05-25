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