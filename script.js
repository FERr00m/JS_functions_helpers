export default class Utils {
  //=======================================
  // получить "атрибут класса" объекта, содержаий информацию о типе, которая по-другому не доступна.
  // Следующая функция classof() возможно полезнее, чем операция
  // typeof, которая не делает никаких различий между типам и объектов
  classof(o) {
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
  //=======================================
  //
  //
  //=======================================
  // Инит и обработка кастомных событий
  setDispather(name, callback) {
    document.addEventListener(name, callback);
  }

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
  //=======================================
  //
  //
  //=======================================
  // Эта функция осуществляет переключение между "светлой" и "темной" темами
  // Для этого в <link rel="stylesheet" id="light-theme"> или <style id="dark-theme"> должен быть id.
  toggleTheme() {
    let lightTheme = document.querySelector("#light-theme");
    let darkTheme = document.querySelector("#dark-theme");
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
  //=======================================
  //
  //
  //=======================================
  loadAudio(source) {
    // Заблаговременно загрузить звуковой эффект,
    // чтобы он был готов к использованию.
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
  //=======================================
  //
  //
  //=======================================
  // Функцию randomInteger(min, max), которая генерирует случайное целое (integer) число от min до max (включительно).
  randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  //=======================================
  //
  //
  //=======================================

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
  async findGoodPicture(url, selectorProgress, selectorImg = "") {
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

  //findGoodPicture("https://picsum.photos/2000/3000");
  //=======================================
  //
  //
  //=======================================
  // Эта функция похожа на fetch (), но добавляет поддержку свойства
  // тайм-аута (timeout) в объекте параметров (options) и прекращает
  // извлечение, если оно не завершилось за количество миллисекунд,
  // указанное в timeout.
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

  // fetchWithTimeout("https://picsum.photos/2000/3000", { timeout: 200 }).then(
  //   (res) => console.log(res)
  // );
  //=======================================
  //
  //
  //=======================================
  // Возвращает cookie-наборы документа как объект Мар.
  // Предполагает, что значения cookie-наборов
  // закодированы посредством encodeURIComponent ().
  // document.cookie = `version=${encodeURIComponent(document.lastModified)}`;
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
  //=======================================
  //
  //
  //=======================================
  // Сохраняет пару имя/значение как cookie-набор, кодируя значение
  // с помощью encodeURIComponent () для отмены точек с запятой,
  // запятых и пробелов.
  // options = { 'max-age': 5, 'path': '/', 'domain': 'example.com', 'secure': 'secure' }
  // Передача 0 приводит к удалению cookie-набора,
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
  //=======================================
  //
  //
  //=======================================
  // Приведение в безопасный вид текста.
  // console.log(htmlEscape("<p class=\"greeting\">Hello world!</p>"));
  // "&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt";
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
  //=======================================
  //
  //
  //=======================================
  // Метод сравнивает string с string2 и возвращает в каком отношении (в алфавитном порядке)
  // они друг к другу относятся
  determineOrder(string, string2) {
    let result = string.toLowerCase().localeCompare(string2.toLowerCase());
    if (result < 0) {
      console.log(`Строка '${string}' находится ДО строки '${string2}'.`);
    } else if (result > 0) {
      console.log(`Строка '${string}' находится ПОСЛЕ строки '${string2}'.`);
    } else {
      console.log(`Строка '${string}' идентична строке '${string2}'.`);
    }
  }
  //=======================================
  //
  //
  //=======================================
  // Массив объектов сортирует 
  // по произвольному свойству объекта
  // let data = [
  //   {name: "Zachary", age: 28},
  //   {name: "Nicholas", age: 29}
  // ];
  // data.sort(createComparisonFunction("name"));
  // console.log(data[0].name); // Nicholas
  createComparisonFunction(propertyName) {
    return function(object1, object2) {
      let value1 = object1[propertyName];
      let value2 = object2[propertyName];
      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  //=======================================
  //
  //
  //=======================================
  // Метод сериализирует форму в вмде строки запроса либо в JSON формате
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
  //=======================================
  //
  //
  //=======================================
  // Метод читает файлы и выводит их содержание и размер
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
}
