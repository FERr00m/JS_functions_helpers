export default class Utils {
  constructor() {
    console.info(`Utils loaded.
 _________________________________________
|   _____ _____ _____     ___ ___         |
|  |   __|   __| __  |___|   |   |_____   |
|  |   __|   __|    -|  _| | | | |     |  |
|  |__|  |_____|__|__|_| |___|___|_|_|_|  |
|_________________________________________|
    `);
  }
  /**
   * Метод получает "атрибут класса" объекта, содержаий информацию о типе, которая по-другому не доступна.
   * функция classof() возможно полезнее, чем операция typeof, которая не делает никаких различий между типам и объектов
   *
   * Примеры:
   * classof(1) => "Number"
   * classof(()=>{}) => "Function"
   * classof(new Date ()) => "Date"
   *
   * @param {any} object - Любая сущность.
   * @returns {string}
   *
   */
  classof(object) {
    return Object.prototype.toString.call(o).slice(8, -1);
  }
  // classof(1)  // => "Number"
  // classof(()=>{})  // => "Function"
  // classof(new Date ())  // => "Date"
  /**
   * Метод асинхронно загружает и выполняет сценарий из указанного URL.
   * Возвращает объект Promise, который разрешается, когда сценарий загружен
   *
   * @param {string} url - Адрес скрипта.
   * @returns {Promise}
   *
   */
  importScript(url) {
    return new Promise((resolve, reject) => {
      let s = document.createElement("script"); // Создать элемент <script>.
      s.onload = () => {
        resolve({ loaded: true });
      }; // Разрешить объект Promise, когда сценарий загружен,
      s.onerror = (е) => {
        reject(е);
      }; // Отклонить объект Promise в случае неудачи.
      s.src = url; // Установить URL сценария,
      document.head.append(s); //Добавить <script> в документ
    });
  }
  /**
   * Метод осуществляет инит и обработку кастомных событий
   *
   * @param {string} name - Имя события.
   * @param {Function} callback - Функция колбэк, которая сработает при диспатче события.
   * @returns {void}
   *
   */
  setDispather(name, callback) {
    document.addEventListener(name, callback);
  }
  /**
   * Метод запускает событие
   *
   * @param {string} name - Имя события.
   * @param {object} data - Объект параметров.
   * @returns {void}
   *
   */
  initEvent(name, data = { detail: true }) {
    document.dispatchEvent(new CustomEvent(name, data));
  }
  // Где-то в другом месте программы можно зарегистрировать обработчик
  // для событий "busy" и использовать его для показа или сокрытия
  // вращателя, уведомляющего пользователя о занятости,
  // setDispather("busy", (е) => {
  //   if (е.detail) {
  //     showSpinner();
  //   } else {
  //     hideSpinner();
  //   }
  // });
  // Отправить специальное событие, чтобы уведомить
  // пользовательский интерфейс о том, что мы заняты.
  // initEvent("busy", { detail: true });
  // Выполнить сетевую операцию,
  // fetch(url)
  //   .then(handleNetworkResponse)
  //   .catch(handleNetworkError)
  //   .finally(() => {
  //     // После того, как сетевой запрос пройдет успешно или потерпит
  //     // неудачу, отправить еще одно событие, чтобы уведомить
  //     // пользовательский интерфейс о том, что мы больше не заняты,
  //     initEvent("busy", { detail: false });
  //   });
  /**
   * Метод осуществляет переключение между "светлой" и "темной" темами
   * Для этого в <link rel="stylesheet" id="light-theme"> или <style id="dark-theme"> должен быть id или любой другой селектор.
   *
   * @param {string} lightThemeSelector - Селектор светлой темы.
   * @param {string} darkThemeSelector - Селектор тёмной темы.
   * @returns {void}
   *
   */
  // Эта функция осуществляет переключение между "светлой" и "темной" темами
  // Для этого в <link rel="stylesheet" id="light-theme"> или <style id="dark-theme"> должен быть id.
  toggleTheme(lightThemeSelector, darkThemeSelector) {
    let lightTheme = document.querySelector(lightThemeSelector);
    let darkTheme = document.querySelector(darkThemeSelector);
    if (darkTheme.disabled) {
      // В текущий момент светлая тема, переключить на темную.
      lightTheme.disabled = true;
      darkTheme.disabled = false;
    } else {
      // В текущий момент темная тема, переключить на светлую.
      lightTheme.disabled = false;
      darkTheme.disabled = true;
    }
  }
  /**
   * Метод заблаговременно грузит звуковой эффект, чтобы он был готов к использованию.
   * Воспроизводит звуковой эффект всякий раз, когда пользователь щелкает кнопкой мыши.
   *
   * @param {string} source - Источник аудио.
   * @returns {void}
   *
   */
  loadAudio(source) {
    let soundeffect = new Audio(source);
    // Воспроизводить звуковой эффект всякий раз,
    // когда пользователь щелкает кнопкой мыши.
    document.addEventListener("click", () => {
      soundeffect.cloneNode().play(); //Загрузить и воспроизвести звук.
    });
    // Обратите внимание на применение здесь cloneNode (). Если пользователь
    // быстро щелкает кнопкой мыши, то мы хотим иметь возможность одновременно
    // воспроизводить множество перекрывающихся копий звукового эффекта. Для
    // Этого нам нужно множество элементов <audio>. Поскольку элементы <audio>
    // Не Добавлялись к документу, они будут подвергнуты сборке мусора, когда заокончат воспроизведение.
  }
  /**
   * Метод генерирует случайное(псевдо) целое число от min до max (включительно).
   *
   * @param {number} min - Минимальное число.
   * @param {number} max - Максимальное число.
   * @returns {number}
   *
   */
  randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  /**
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
   *
   * @param {string} url - Адрес запроса.
   * @param {string} optiselectorProgressons - Селектор прогрессбара
   * @param {string} selectorImg - Селектор img куда вывести изображение
   * @returns {Promise}
   */
  async findGoodPicture(url, selectorProgress, selectorImg = "") {
    async function streamBody(
      response,
      reportProgress,
      processChunk,
      selectorProgress
    ) {
      // Ожидаемое количество байтов или NaN, если нет заголовка.
      let expectedBytes = parseInt(response.headers.get("Content-Length"));
      let bytesRead = 0; // Сколько байтов получено до сих пор.
      let reader = response.body.getReader(); // Читать байты с помощью этой функции.
      let decoder = new TextDecoder("utf-8"); //Для преобразования байтов в текст
      let body = ""; // Текст, прочитанный до сих пор.

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
              response.url,
              selectorProgress
            );
          }
        }
        if (done) {
          // Если это последняя порция,
          break; // тогда выйти из него.
        }
      }
      if (selectorImg) document.querySelector(selectorImg).src = response.url;
      return body; // Возвратить накопленный текст тела.
    }

    function updateProgress(
      bytesRead,
      expectedBytes,
      prog,
      url,
      selectorProgress = "progress"
    ) {
      let progress = document.querySelector(selectorProgress);
      if (isNaN(prog)) {
        console.warn("Error");
        return;
      }
      progress.value = Number(prog * 100).toFixed(2);
    }

    async function loop(url) {
      let result = await fetch(url).then((res) => {
        return res;
      });
      return result;
    }

    let res = await loop(url);
    let headers = res.headers.get("Content-Length");
    while (!headers) {
      // Делаем запросы пока не получим картинку с Content-Length
      res = await loop(url);
      headers = res.headers.get("Content-Length");
    }
    fetch(res.url)
      .then((response) =>
        streamBody(response, updateProgress, false, selectorProgress)
      )
      .then((bodyText) => JSON.parse(bodyText))
      .then((res) => console.log(res))
      .catch((err) => console.warn(err));
  }
  /**
   * Метод похожа на fetch (), но добавляет поддержку свойства тайм-аута (timeout) в объекте параметров (options)
   * и прекращает извлечение, если оно не завершилось за количество миллисекунд, указанное в timeout.
   *
   * fetchWithTimeout("https://picsum.photos/2000/3000", { timeout: 200 })
   *  .then((res) => console.log(res));
   *
   * @param {string} url - Адрес запроса.
   * @param {object} options - Параметры { timeout: 200 }
   * @returns {Promise}
   *
   */
  fetchWithTimeout(url, options = {}) {
    if (options.timeout) {
      // Если свойство timeout существует и не равно нулю
      let controller = new AbortController(); // тогда создать контроллер
      options.signal = controller.signal; // и установить свойство signal.
      // Запустить таймер, который будет посылать сигнал прекращения
      // по прошествии указанного количество миллисекунд. Обратите
      // внимание, что мы никогда не отменяем этот таймер. Вызов abort()
      // после того, как извлечение завершено, не имеет эффекта.
      setTimeout(() => {
        controller.abort();
      }, options.timeout);
    }
    // Теперь просто выполнить нормальное извлечение.
    return fetch(url, options);
  }
  /**
   * Метод возвращает cookie-наборы документа как объект Мар.
   * Предполагает, что значения cookie-наборов закодированы посредством encodeURIComponent ().
   * @returns {Map}
   *
   */
  getCookies() {
    const cookies = new Map(); // Объект, который будет возвращен,
    const all = document.cookie; // Получить все cookie-наборы в одной большой строке.
    const list = all.split("; "); // Разбить на индивидуальные пары имя/значение.
    for (const cookie of list) {
      //Для каждого cookie-набора в этом списке:
      if (!cookie.includes("=")) continue; // Пропустить, если нет знака =

      const p = cookie.indexOf("="); // Найти первый знак =.
      const name = cookie.substring(0, p); // Получить имя cookie-набора
      let value = cookie.substring(p + 1); // Получить значение cookie-набора.

      value = decodeURIComponent(value); // Декодировать значение,
      cookies.set(name, value); // Запомнить имя и значение cookie-набора.
    }
    return cookies;
  }
  /**
   * Метод сохраняет пару имя/значение как cookie-набор, кодируя значение
   * с помощью encodeURIComponent () для отмены точек с запятой,
   * запятых и пробелов.
   * Передача 'max-age': 0 приводит к удалению cookie-набора.
   *
   * Пример
   * options = { 'max-age': 5, 'path': '/', 'domain': 'example.com', 'secure': 'secure' }
   * @param {string} name - Название куки.
   * @param {string} value - Значение куки.
   * @param {object} options - Параметры куки.
   * @returns {void}
   *
   */
  setCookie(
    name,
    value,
    options = { "max-age": "", path: "", domain: "", secure: "" }
  ) {
    let cookie = `${name}=${encodeURIComponent(value)}`;
    for (const option in options) {
      if (options[option] !== "") {
        if (option === "max-age") {
          cookie += `; ${option}=${options[option] * 60 * 60 * 24}`; // max-age принимает количество дней и переводит в секунды
        } else if (option === "secure") {
          cookie += `; ${option}`;
        } else {
          cookie += `; ${option}=${options[option]}`;
        }
      }
    }
    document.cookie = cookie;
  }
  /**
   * Метод приводит html в безопасный вид текста.
   * @param {string} text - Текст для обработки.
   * @returns {string}
   *
   */
  htmlEscape(text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
      switch (match) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case '"':
          return "&quot;";
      }
    });
  }
  /**
   * Метод сравнивает string с string2 и возвращает в каком отношении (в алфавитном порядке)
   * они друг к другу расположены.
   * @param {string} string - Первая строка.
   * @param {string} string2 - Вторая строка.
   * @returns {boolean}
   *
   */
  determineOrder(string, string2) {
    let result = string.toLowerCase().localeCompare(string2.toLowerCase());
    if (result < 0) {
      console.log(`Строка '${string}' находится ДО строки '${string2}'.`);
    } else if (result > 0) {
      console.log(`Строка '${string}' находится ПОСЛЕ строки '${string2}'.`);
    } else {
      console.log(`Строка '${string}' идентична строке '${string2}'.`);
    }
    return result;
  }
  /**
   * Метод сортирует массив объектов по нужному свойству объекта.
   * Пример:
   *
   * let data = [
   *  {name: "Zachary", age: 28},
   *  {name: "Nicholas", age: 29}
   * ];
   * data.sort(createComparisonFunction("name"));
   * console.log(data[0].name); // Nicholas
   * @param {string} propertyName - Имя свойства, по которому нужно провести сортировку.
   * @returns {object}
   *
   */
  createComparisonFunction(propertyName) {
    return function (object1, object2) {
      let value1 = object1[propertyName];
      let value2 = object2[propertyName];
      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      } else {
        return 0;
      }
    };
  }
  /**
   * Метод сериализирует форму в виде строки запроса либо в JSON формате
   * @param {Element} form - Форма, которая будет обрабатываться.
   * @param {boolean} json - Возвращать данные в JSON или в виде строки запроса?
   * @returns {string | JSON}
   *
   */
  serialize(form, json = false) {
    let body = json ? {} : [];
    let optValue;
    for (let field of form.elements) {
      switch (field.type) {
        case "select-one":
        case "select-multiple":
          if (json && field.type === "select-multiple") {
            body[encodeURIComponent(field.name)] = [];
          }
          if (field.name.length) {
            for (let option of field.options) {
              if (option.selected) {
                optValue = "";
                if (option.hasAttribute) {
                  optValue = option.hasAttribute("value")
                    ? option.value
                    : option.text;
                } else {
                  optValue = option.attributes["value"].specified
                    ? option.value
                    : option.text;
                }
                if (json && field.type === "select-multiple") {
                  body[encodeURIComponent(field.name)].push(
                    encodeURIComponent(optValue)
                  );
                } else if (json && field.type === "select-one") {
                  body[encodeURIComponent(field.name)] =
                    encodeURIComponent(optValue);
                } else {
                  body.push(
                    encodeURIComponent(field.name) +
                      "=" +
                      encodeURIComponent(optValue)
                  );
                }
              }
            }
          }
          break;
        case undefined: // коллекция полей
        case "file": // поле добавления файлов
        case "submit": // кнопка отправки
        case "reset": // кнопка сброса
        case "button": // пользовательская кнопка
          break;
        case "radio": // переключатель
        case "checkbox": // флажок
          if (!field.checked) {
            break;
          }
        default:
          // поля формы без имен не сериализуются
          if (field.name.length) {
            if (json) {
              body[encodeURIComponent(field.name)] = encodeURIComponent(
                field.value
              );
            } else {
              body.push(
                `${encodeURIComponent(field.name)}=${encodeURIComponent(
                  field.value
                )}`
              );
            }
          }
      }
    }
    return json ? JSON.stringify(body) : body.join("&");
  }
  /**
   * Метод читает файлы и выводит их содержание и размер
   * @param {string} inputSelector - Селектор, который находит инпут с файлом.
   * @param {string} outputSelector - Селектор, который блок для вывода результата.
   * @param {string} progressSelector - Селектор, который находит прогрессбар.
   * @returns {void}
   *
   */
  fileReader(inputSelector, outputSelector, progressSelector) {
    let filesList = document.querySelector(inputSelector);
    filesList.addEventListener("change", (event) => {
      let info = "",
        output = document.querySelector(outputSelector),
        progress = document.querySelector(progressSelector),
        files = event.target.files,
        type = "default",
        reader = new FileReader();
      if (/image/.test(files[0].type)) {
        reader.readAsDataURL(files[0]);
        type = "image";
      } else {
        reader.readAsText(files[0]);
        type = "text";
      }
      reader.onerror = function () {
        output.innerHTML =
          "Could not read file, error code is " + reader.error.code;
      };
      reader.onprogress = function (event) {
        if (event.lengthComputable) {
          progress.innerHTML = `${event.loaded}/${event.total}`;
        }
      };
      reader.onload = function () {
        let html = "";
        switch (type) {
          case "image":
            html = `<img src="${reader.result}">`;
            break;
          case "text":
            html = reader.result;
            break;
        }
        output.innerHTML = html;
      };
    });
  }
  /**
   * Переопределение Math.random() с использованием CSPRNG может быть выполнено
   * путем генерации одного случайного 32-битного числа и деления его на максимальное возможное значение,
   * 0xFFFFFFFF. Это позволяет получить значение от 0 до 1:
   * @returns {number}
   *
   */
  randomFloat() {
    // Генерация 32 рандомных битов
    const fooArray = new Uint32Array(1);
    // Максимальное значение — 2^32 - 1
    const maxUint32 = 0xffffffff;
    // Деление на максимальное возможное значение
    return crypto.getRandomValues(fooArray)[0] / maxUint32;
  }
  /**
   * Метод принимает индикатор серьезности ошибки и сообщение об ошибке.
   * Объект Image выбран для отправки запроса из следующих соображений:
   * 1. Он доступен во всех браузерах, даже тех, которые не поддерживают объект XMLHttpRequest.
   * 2. На него не распространяются ограничения взаимодействия между доменами.
   * Если один сервер должен принимать сведения об ошибках от многих других
   * серверов, объект XMLHttpRequest не будет работать.
   * 3. Это снижает вероятность сбоя во время протоколирования ошибки. Как правило, обмен данными по технологии Ajax
   * осуществляется с помощью оболочек из JavaScript-библиотек.
   * Если в коде библиотеки, которую вы пытаетесь использовать для протоколирования ошибки,
   * случится сбой, сообщение об ошибке может быть утеряно
   *
   * logError("https://my-server.com/log.php", "nonfatal", 'Module init failed: ${ex.message}');
   * @param {string} serverUrl - URL сервера, который примет сообщение об ошибке.
   * @param {string} degree - Степень ошибки.
   * @param {string} msg - Сообщение об ошибке.
   * @returns {void}
   *
   */
  logError(serverUrl, degree, msg) {
    let img = new Image();
    let encodedDegree = encodeURIComponent(degree);
    let encodedMsg = encodeURIComponent(msg);
    img.src = `${serverUrl}?error=${encodedDegree}&msg=${encodedMsg}`;
  }
  /**
   * Метод выводит отладочную инфу на страницу
   * @param {string} message - Сообщение, которое будет показано
   * @returns {void}
   *
   */
  log(message) {
    // Лексическая область этой функции будет использовать следующий экземпляр
    // вместо window.console
    let console = document.getElementById("debuginfo");
    if (console === null) {
      console = document.createElement("div");
      console.id = "debuginfo";
      console.style.background = "#dedede";
      console.style.border = "1px solid silver";
      console.style.padding = "5px";
      console.style.width = "400px";
      console.style.position = "absolute";
      console.style.right = "0px";
      console.style.top = "0px";
      document.body.appendChild(console);
    }
    console.innerHTML += `<p> ${message}</p>`;
  }
  /**
   * Метод проверяет параметры функции на их соответствие нужным условиям
   *
   * Пример:
   * function divide(num1, num2) {
   * assert(typeof num1 == "number" && typeof num2 == "number", "divide(): Both arguments must be numbers.");
   * return num1 / num2;
   * }
   * @param {boolean} condition - Если в условиях будет false, будет создана ошибка
   * @param {string} message - Сообщение, которое будет показано
   * @returns {Error | void}
   *
   */
  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }
  /**
   * Метод возвращает уникальный id
   *
   * @returns {string}
   *
   */
  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  /**
   * Метод добавляет параметр запроса к урлу
   *
   * @param {string} url - Исходный урл
   * @param {string} name - Имя параметра
   * @param {string} value - Значение параметра
   * @returns {string}
   *
   */
  addURLParam(url, name, value) {
    url += url.indexOf("?") == -1 ? "?" : "&";
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
  }
}
