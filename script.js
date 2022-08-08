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
    document.head, append (s); //Добавить <script> в документ
  });
}
//=======================================
//
//
//=======================================
// Где-то в другом месте программы можно зарегистрировать обработчик
// для событий "busy" и использовать его для показа или сокрытия
// вращателя, уведомляющего пользователя о занятости,
document.addEventListener("busy", (е) => {
  if (е.detail) {
    showSpinner();
  } else {
    hideSpinner();
  }
});
// Отправить специальное событие, чтобы уведомить
// пользовательский интерфейс о том, что мы заняты.
document.dispatchEvent(new CustomEvent ("busy", { detail: true }));
// Выполнить сетевую операцию,
fetch(url)
  .then(handleNetworkResponse)
  .catch(handleNetworkError)
  .finally(() => {
    // После того, как сетевой запрос пройдет успешно или потерпит
    // неудачу, отправить еще одно событие, чтобы уведомить
    // пользовательский интерфейс о том, что мы больше не заняты,
    document.dispatchEvent(new CustomEvent("busy", { detail: false }));
  });
//=======================================
//
//
//=======================================
// Эта функция осуществляет переключение между "светлой" и "темной" темами
// Для этого в <link rel="stylesheet" id="light-theme"> или <style id="dark-theme"> должен быть id.
function toggleTheme() {
  let lightTheme = document .querySelector ("#light-theme");
  let darkTheme = document.querySelector("#dark-theme");
  if (darkTheme.disabled) { // В текущий момент светлая тема, переключить на темную.
    lightTheme. disabled = true;
    darkTheme.disabled = false;
  } else { // В текущий момент темная тема, переключить на светлую.
    lightTheme.disabled = false;
    darkTheme.disabled = true;
  }
}
{
  // Заблаговременно загрузить звуковой эффект,
  // чтобы он был готов к использованию.
  let soundeffect = new Audio("soundeffect.mp3");
  // Воспроизводить звуковой эффект всякий раз,
  // когда пользователь щелкает кнопкой мыши.
  document.addEventListener("click", () => {
  soundeffect.cloneNode().play() ; //Загрузить и воспроизвести звук.
  })
  // Обратите внимание на применение здесь cloneNode (). Если пользователь 
  // быстро щелкает кнопкой мыши, то мы хотим иметь возможность одновременно 
  // воспроизводить множество перекрывающихся копий звукового эффекта. Для 
  // Этого нам нужно множество элементов <audio>. Поскольку элементы <audio> 
  // Не Добавлялись к документу, они будут подвергнуты сборке мусора, когда заокончат воспроизведение.
}
//=======================================
//
//
//=======================================
// Функцию randomInteger(min, max), которая генерирует случайное целое (integer) число от min до max (включительно).
function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
