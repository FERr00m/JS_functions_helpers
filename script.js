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
//=======================================
//
//
//=======================================
{
/*
 * Асинхронная функция для потоковой передачи тела объекта Response,
 * полученного из запроса fetch(). Принимает в первом аргументе
 * объект Response и за ним два необязательных обратных вызова.
 *
 * Если вы указали функцию в качестве второго аргумента, то этот обратный
 * вызов reportProgress будет вызываться один раз для каждой получаемой порции.
 * В первом аргументе передается общее количество байтов, полученных до сих пор.
 * Во втором аргументе передается число между 0 и 1, которое указывает,
 * насколько загрузка завершена. Однако если объект Response не имеет
 * заголовка "Content-Length”, тогда вторым аргументом всегда будет NaN.
 *
 * Если вы хотите обрабатывать данные в порциях, когда они прибывают,
 * то укажите функцию в третьем аргументе. Порции будут передаваться
 * этому обратному вызову
 * processChunk как объекты Uint8Array.
 *
 * streamBody() возвращает объект Promise, который разрешается в строку.
 * Если обратный вызов processChunk был предоставлен, тогда эта строка
 * является сцеплением значений, возвращенных processChunk. Иначе строка
 * будет сцеплением значений порций, преобразованных в строки UTF-8.
 */
async function streamBody(response, reportProgress, processChunk) {
  // Ожидаемое количество байтов или NaN, если нет заголовка.
  let expectedBytes = parseInt(response.headers.get("Content-Length"));
  let bytesRead = 0; // Сколько байтов получено до сих пор.
  let reader = response.body.getReader(); // Читать байты с помощью этой функции.
  let decoder = new TextDecoder("utf-8"); //Для преобразования байтов в текст
  let body = ""; // Текст, прочитанный до сих пор.
  document.querySelector("#img").src = response.url;
  while (true) {
    // Цикл, пока не будет выход ниже,
    let { done, value } = await reader.read(); // Читать порцию.
    if (value) {
      // Если мы получили байтовый массив:
      if (processChunk) {
        // обработать байты, когда обратный вызов был передан,
        let processed = processChunk(value);
        if (processed) {
          body += processed;
        }
      } else {
        //В противном случае преобразовать байты
        body += decoder.decode(value, { stream: true }); // в текст.
      }
      if (reportProgress) {
        // Если обратный вызов продвижения был передан, тогда вызвать его.
        bytesRead += value.length;
        reportProgress(
          bytesRead,
          expectedBytes,
          bytesRead / expectedBytes,
          response.url
        );
      }
    }
    if (done) {
      // Если это последняя порция,
      break; // тогда выйти из него.
    }
  }
  return body; // Возвратить накопленный текст тела.
}

function updateProgress(bytesRead, expectedBytes, prog, url) {
  let progress = document.querySelector("#progress");
  if (isNaN(prog)) {
    return;
  }
  progress.value = prog;
}
async function loop(url) {
  let result = await fetch(url).then((res) => {
    return res;
  });
  return result;
}
async function findGoodPicture(url) {
  let res = await loop(url);
  let headers = res.headers.get("Content-Length");
  while (!headers) { // Делаем запросы пока не получим картинку с Content-Length
    res = await loop(url);
    headers = res.headers.get("Content-Length");
  }
  fetch(res.url)
    .then((response) => streamBody(response, updateProgress))
    .then((bodyText) => JSON.parse(bodyText))
    .then((res) => console.log(res))
    .catch((err) => {
      updateProgress("", 1);
    });
}

findGoodPicture("https://picsum.photos/2000/3000");
}
