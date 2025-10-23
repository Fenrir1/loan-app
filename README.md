# Loan Application - React TypeScript SPA

Одностраничное приложение для подачи заявки на займ с тремя последовательными формами.

## Используемые библиотеки

- **react-router-dom** - для навигации между формами
- **react-bootstrap** - для UI компонентов и стилизации
- **react-phone-input-2** - для ввода телефона
- **@tanstack/react-query** - для общения с сервером и кэширования
- **bootstrap** - для базовых стилей

## API интеграция

- **Получение категорий**: `GET https://dummyjson.com/products/categories`
- **Отправка заявки**: `POST https://dummyjson.com/products/add`


## Запуск приложения

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build
```
