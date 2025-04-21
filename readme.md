# Система управления проектами

**Стек**: React, react-router-dom, TypeScript, Redux Toolkit, Ant Design, Vite, Axios, react-hook-form, Zod, SCSS Modules
Линтеры: ESLint, Stylelint, Prettier, Husky + lint-staged

Схематичный функционал проекта:
![pages_navigation](https://github.com/user-attachments/assets/dca13ee8-041a-41e1-80be-bb31418b2fcd)

## Запуск приложения

1. Предварительно необходимо иметь установленный Docker Desktop. Инструкция по установке лежит в [документации серверной части](./server/README.md)

2. Склонируйте репозиторий и перейдите в корень проекта:

```
git clone https://github.com/ksenia-ivanchenko/project-management-system.git
cd project-management-system
```

3. Установите зависимости и запустите проект (проект откроется в браузере автоматически):

```
npm install
npm run start
```

4. Остановка и очистка:

```
npm run docker:down
```

Если вы хотите запустить фронтенд-часть локально для разработки без докера, то выполните следующие шаги:

1. Разверните бэкенд при помощи докера:

```
cd server
make initial-start
```

2. Перейдите в директорию клиентской части:

```
cd ../client
```

3. Создайте файл .env с содержимым файла .env.example
4. Установите зависимости и запустите проект:

```
npm install
npm run dev
```

## Документация проекта

- [Функциональные требования](./docs/task.md)
- [Архитектура](./docs/architecture.md)
- [Обоснование выбора необязательных технологий](./docs/technologies.md)
- [Документация серверной части](./server/README.md)
