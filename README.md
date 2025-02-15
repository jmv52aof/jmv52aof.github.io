# React + TypeScript + Vite
## 1. Настройка проекта
### 1.1. Запуск

`npm install --save-dev`
`npm run dev`
### 1.2. Работа с пакетами

В `dependencies` находятся зависимости, необходимые для запуска проекта. В `devDependencies` находятся зависимости, необходимые для разработки. 

Пакеты, необходимые для разработки, следует устанавливать через 
`npm install <package> --save-dev`. 
### 1.3. Версии

Версионирование проекта происходит с помощью поля `version` в файле package.json. Пока проект не отдан клиентам, его версия должна быть ниже 1.0.0.

**X.Y.Z**
1) X - номер мажорной версии. Существенные изменения, не совместимые с предыдущими версиями. 
2) Y - номер минорной версии. Изменения, совместимые с предыдущими версиями. Пример: новая небольшая функциональность
3) Z - номер патча. Незначительные изменения, совместимые с предыдущими версиями, как правило исправление ошибок
## 2. Разработка
### 2.1. Импорты

Во время разработки следует импортировать функции и другие вещи через абсолютные пути, чтобы не привязываться к слоям структуры проекта.

До каждого слоя есть свой абсолютный путь:
* **pages - @pages**
* **layouts - @layouts**
* **features - @features**
* **components - @components**
* **common - @common**
* **assets - @assets**

Пример импорта компонента в странице:
```ts
import Search from '@components/search/Search'
```

Абсолютные пути можно расширить, добавив нужный слой при необходимости. Для этого:
1) Зайти в tsconfig.app.json
2) Добавить новую запись в объекте **paths**: `"@name/*": ["name/*"]`, где вместо `name` указать название слоя. 
### 2.2. Архитектура проекта

Архитектура проекта описывается слоями и их взаимодействием:
1) **router** - маршрутизация. Здесь react отлавливает урлы приложения и подставляет соответствующие страницы
2) **pages** - страницы. Здесь содержатся все страницы приложения. Каждая страница представляет собой файл с экспортируемой функцией, возвращающей JSX код.
3) **features** - фичи или функциональности приложения. Здесь содержатся основные функции приложения, т.е. бизнес-логика. По сути, это те же компоненты, только более сложные. Часто фичу можно представить как смесь из нескольких компонент, объединяющую их в более сложную функциональную единицу. 
4) **components** - компоненты приложения. Это то, на чём строится приложение. Компоненты могут иметь свою внутреннюю логику исполнения. Компоненты должны иметь некоторый уровень абстракции, чтобы их можно было переиспользовать в нескольких местах.
5) **ui** - простейшие компоненты приложения, которые собираются в более сложные на верхних уровнях. По сути, данный слой представляет кирпичики, из которых собирается функциональность приложения. Здесь могут быть простые элементы интерфейса без бизнес логики.

Порядок использования строгий - сверху вниз (от п.1 до п.5). Так, слой components не может обращаться к слою features, а слой features не может обращаться к слою pages и т.д. Однако, хорошей практикой может быть перепрыгивать нижестоящие слои. Например, слой pages может обращаться к слою components, минуя features. 
