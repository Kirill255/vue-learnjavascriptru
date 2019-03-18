# nuxt-start

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

### Как устанвливал

1. https://github.com/nuxt-community/starter-template через `npx vue-cli init nuxt-community/starter-template nuxt-start` (первый раз была ошибка, переустановил снова и всё заработало), ещё нашёл другой способ https://github.com/nuxt-community/create-nuxt-app
2. Дальше установил зависимости `npm i -S @fortawesome/fontawesome-free animate.css bootstrap bootstrap-datepicker dropzone epic-spinners flatpickr jquery medium-editor vue2-medium-editor selectric text-mask-addons vue-js-toggle-button vue-text-mask vuelidate vuex-cache axios`
3. Настроить nuxt.config.js, прописал секции css, vendor, env, transition, plugins и build/plugins, build/cssSourceMap
4. Также вместо vue-resource установили axios `npm install --save axios`, у nuxt с ним лучше совместимость, а nprogress не устанавливаем, т.к. он в nuxt из коробки, также не устанавливаем vuex, он тоже из коробки, создаём в папке store файл index.js и vuex автоматом подтягивается
5. С bootstrap у nuxt есть проблемы https://github.com/nuxt/nuxt.js/issues/178 и вот ещё может поможет https://github.com/nuxt/nuxt.js/issues/1417, сообственно я не стал подключать bootstrap.js в vendor, подключал только css, поэтому я только создал файл в папке plugins/bootstrap.js со следующим содержанием из ссылки и всё, а для js там нужно всё из этого https://github.com/nuxt/nuxt.js/issues/178#issuecomment-276207994, там же есть ещё способ подключить просто через cdn, или взять Bulma =). Update: установил настройки для bootstrap полностью, подключил `const webpack = require('webpack')`, добавил секцию plugins в build, установил зависимости `npm install --save popper.js`, а jquery уже был установлен до этого, вот ещё пара полезных ссылок https://github.com/nuxt/nuxt.js/issues/2710 и https://github.com/twbs/bootstrap/issues/23381 для решения проблемы связаной с '/bootstrap.min.css.map', можно либо удалить строки кода из bootstrap.css или прописать `cssSourceMap: false` в build, или подключить через cdn
6. Установили json-server `npm install -S json-server` и перенёс базу db.json, т добавил в package.json `"fake": "json-server --watch db.json --port 3004" внимательнее с портами может быть проблема, просто назначить другие`
6. Просто установить node-sass и sass-loader без настроек `npm i node-sass sass-loader -S`
7. Добавил в layouts новый layout с названием именно error.vue для использования этого шаблона для ошибок 404 https://ru.nuxtjs.org/guide/layouts#%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0-%D0%BE%D1%88%D0%B8%D0%B1%D0%BA%D0%B8
8. В assets сделал папку css с файлом main.css(тут будут общие стили) и подключил в конфиге
9. Во всех файлах заменил router-link на nuxt-link, также заменил router-view на <nuxt/>
10. Все плагины которые используют спецефичные для браузера свойства и методы(window, document и т.д.) должны подключаться через условие `if (process.browser) {}` и с использованием старого синтаксиса так как это серверная сторона `var Dropzone = require("dropzone");` важно внутри использовать `var` из-за области видимости, ну или тогда нужно объявить переменную заранее
11. Перенёс папку services с своими кастомными валидаторами
12. Все плагины pure-js или jquery или vue-плагины без инициализации(которые просто импортятся в нужное место и всё) их нужно просто подключить в vendor, а все vue-плагины которым нужна инициализация, например `Vue.use(Vuelidate)`, нужно прописать в vendor, прописать в plugins, и создать соответствующий файл в папке plugins https://nuxtjs.org/guide/plugins
13. Изменил подключение плагина vue-js-toggle-button на ssr-подключение https://github.com/euvl/vue-js-toggle-button#ssr, также скопировал стили прямо в компонент руками, так как с этим были проблемы и убрал scoped атрибут, транспилировал стили из scss в css через онлайн-сервис, хотя вроде и с scss работает, у нас же установлены sass-loader и node-sass



<!-- 
vuelidate
https://github.com/nuxt/nuxt.js/issues/1391
-->

<!-- 
В данный момент есть проблема при перезагрузке приложения в браузере, если находишься на странице на которой используется плагин epic-spinners
https://github.com/epicmaxco/epic-spinners/issues/17
-->

### Устанавливаем свежую версию `nuxt` => `nuxt-edge`

* `npm install -g vue-cli`
* `vue init nuxt-community/starter-template nuxt-test`
* `npm uninstall nuxt`
* `npm install nuxt-edge -S`
* `npm run dev`

1. Изменить конфиг в секции build, in nuxt-edge was removed `isClient` https://github.com/nuxt/nuxt.js/issues/3216
2. Добавил в конфиг в секцию build свойство transpile: ['epic-spinners'],
