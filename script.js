//=======================================
// получить "атрибут класса" объекта, содержаий информацию о типе, которая по-другому не доступна. 
// Следующая функция classof() возможно полезнее, чем операция 
// typeof, которая не делает никаких различий между типам и объектов
function classof(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

// classof(1)  // => "Number"
// classof(()=>{})  // => "Function"
// classof(new Date ())  // => "Date"
//=======================================
//
//
//=======================================
// Асинхронно загружает и выполняет сценарий из указанного URL.
// Возвращает объект Promise, который разрешается, когда сценарий загружен
function importScript(url) {
  return new Promise((resolve, reject) => {
    let s = document.createElement ("script"); // Создать элемент <script>.
    s.onload = () => { resolve(); }; // Разрешить объект Promise, когда сценарий загружен,
    s.onerror = (е) => { reject(е); };// Отклонить объект Promise в случае неудачи.
    s.src = url; // Установить URL сценария,
    document .head, append (s); //Добавить <script> в документ
  });
}
//=======================================
