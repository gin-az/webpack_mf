### WEbPack ### 
Это сборщик модулей, который позволяет скомпилировать JavaScript-модули в единый JS-файл.

При запуске обрабатывает модули, строит между ними граф зависимостей, а потом на основе графа генерирует единый файл.

Используется для:
- Быстрого объединения множества JavaScript-файлов в один большой;
- более легкого подключения кода JS к HTML-странице;
- транспиляции, или перевода кода на TypeScript или CoffeeScript на «чистый» JavaScript;
- подготовки файлов к размещению на сервере для их оптимизации;
- адаптации кода к старым версиям браузера;
- тестирования написанного кода с помощью локального сервера, где запускается собранный проект;
- разнообразных преобразований кода и выполнения дополнительных действий.


#### Понятия 🤟 webpack ####

__Entry__. Точка входа — файл, с которого сборщик начинает объединять модули. Обычно это основной JS-файл проекта, и от него зависят все остальные.

__Output__. Точка выхода — файл, в который запишется собранный проект. При настройке Webpack в качестве точки выхода указывают путь к конечному файлу.

__Bundle__. Бандл — собранный из модулей большой файл, результат работы сборщика.

__Loaders__. Они же лоадеры, или загрузчики — дополнительные сущности, которые расширяют возможности Webpack по преобразованию. По умолчанию сборщик распознает только файлы JS и JSON. С помощью лоадеров можно «научить» его понимать и другие файлы, от таблиц стилей CSS до изображений. Загрузчики скачиваются отдельно.

__Plugins__. Плагины — второй вид дополнительных сущностей. Это надстройки для решения дополнительных задач, например автоматического создания HTML-файла, к которому подключается бандл. Они тоже скачиваются отдельно.

__Режимы__. Режимы работы — наборы настроек для разных задач.

Режим __production__ — для финальной сборки перед загрузкой на сервер. Предусматривает максимальную оптимизацию и сжатие кода.

Режим __development__ — для тестовых сборок, которые нужны при разработке. Упор делается не на оптимизацию, а на читаемость. Можно скачать дополнительный модуль webpack-dev-server и запустить локальный сервер для тестирования проекта. С ним проект будет пересобираться при каждом изменении кода, и эти изменения будут применяться в реальном времени.

Режим __none__ не предусматривает оптимизации и отключает ее настройки.

> По умолчанию Webpack работает в режиме __none__.

---

### Алгоритм работы ###

Перед началом работы в папке проекта создается файл `webpack.config.js`. Он нужен для его настройки. Чтобы файл заработал, сборщик уже должен быть установлен.

В файле необходимо прописать настройки сборщика для проекта. Указать точку входа и выхода, лоадеры, плагины, которые нужно применить при сборке. Там же можно установить режим работы — production или development.

В настройках менеджера пакетов `npm` следует указать условия для запуска `Webpack`. Теперь при выполнении определенной команды запустится сборщик.
При запуске Webpack использует файл конфигурации `webpack.config.js`, где пользователь ранее указал настройки. Он находит файлы, связанные с точкой входа, строит граф их зависимостей, а потом собирает все в единый бандл на основе графа. Так бандл получается корректным, и все в нем подключается в правильном порядке.

---
`npm init`

`npm install -D webpack webpack-cli`

создаем webpack.config.js
index.js
index.html

`npm install -D style-loader less-loader css-loader file-loader`

`npm install -D html-webpack-plugin clean-webpack-plugin`

`npm install -D webpack-dev-server`


## Module Federation ##

![Exp_config](./public/exp-webpack-config.png)
В конфигурационном файле экспортируемого модуля необходимо подключить плагин __ModuleFederationPlugin__ в котором прописываем свойства

`name: 'components'` - Наименование контейнера в котором расположены компоненты для экспорта.

`filename: 'components.js'` - Наименование файла JS  котором будет хранится.

`exposes: {'./WellcomeScreen': './src/components/wellcomeScreen'},` - по url './WellcomeScreen', будем получать компонент.
`shared` - должны быть одинаковые версии пакетов react, react-dom. 

Для использования микросервисов необходимо использовать ленивую загрузку (заимпортить новый файл `наример - bootstrap` в `index.js`, который будет выполнять действия уже ассинхронно)

![Imp_config](./public/imp-webpack-config.png)

В объекте `remotes:` в свойстве `components` указываем, что будет доступен контейнер `components` из файла `genbhttp://localhost:3006/components.js`
Далее указывается, что используется 1 версия реакта глобально во всем приложении.

Для импорта компонента в целевой используется метод `React.lazy`
<pre>const WellcomeScreen = React.lazy(() => import("components/WellcomeScreen"));</pre>

Важно сделать заглушку, на случай если экспортируемый сервис в данный момент недоступен. На примере `ErrorBoundary`