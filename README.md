### DOCKER

## install Ubuntu

```bash
wsl --install -d Ubuntu
```

## check version

```bash
wsl -l -v
```

[example]

| NAME                | STATE     | VERSION |
|---------------------|-----------|---------|
| docker-desktop      | Running   | 2       |
| docker-desktop-data | Stopped   | 2       |
| Ubuntu              | Installed | 2       |

## run

```bash
wsl -d Ubuntu
```

# Обновляем пакеты

```bash
sudo apt update && sudo apt upgrade -y
```

# Ставим curl, если ещё нет

```bash
sudo apt install -y curl
```

# Добавляем репозиторий Node.js (например, версия LTS 20.x)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

# Устанавливаем Node.js

```bash
sudo apt install -y nodejs
```

# Проверяем

```bash
node -v
npm -v
```

## docker

```bash
 docker -v
sudo docker build -t result .
sudo docker run result
```

## commands

# Docker + Docker Compose (WSL + Node.js) — Мини-шпаргалка

## 🔹 Основные Docker команды

| Команда                                  | Описание                                                     |
|------------------------------------------|--------------------------------------------------------------|
| `docker run -it -p 3000:3000 image_name` | Запустить контейнер интерактивно с пробросом порта 3000      |
| `docker run -d -p 3000:3000 image_name`  | Запустить контейнер в фоне (detached mode) с пробросом порта |
| `docker ps`                              | Показать запущенные контейнеры                               |
| `docker ps -a`                           | Показать все контейнеры, включая остановленные               |
| `docker stop <container_id>`             | Остановить работающий контейнер                              |
| `docker rm <container_id>`               | Удалить остановленный контейнер                              |
| `docker logs <container_id>`             | Посмотреть логи контейнера                                   |
| `docker exec -it <container_id> bash`    | Зайти внутрь контейнера (интерактивный терминал)             |
| `docker build -t image_name .`           | Собрать образ из Dockerfile                                  |
| `docker images`                          | Показать локальные образы                                    |
| `docker rmi <image_id>`                  | Удалить образ                                                |
| `docker image prune -a`                  | Удалить все образы                                           |
| `sudo docker images`                     | grep userHub                                                 |  Проверить образы в хабе                                           |
| `docker pull image_name`                 | Скачать образ из Docker Hub                                  |
| `docker push image_name`                 | Отправить образ в Docker Hub                                 |
| `docker stop $(docker ps -q)`            | Остановить все контейнеры                                    |
| `docker system prune -a --volumes`       | Полная очистка: контейнеры, образы, тома, сети               |

---

## 🔹 Основные Docker Compose команды

| Команда                              | Описание                                                 |
|--------------------------------------|----------------------------------------------------------|
| `docker-compose up`                  | Запустить контейнеры из `docker-compose.yml`             |
| `docker-compose up -d`               | Запустить контейнеры в фоне (detached mode)              |
| `docker-compose down`                | Остановить и удалить все контейнеры, сети и тома Compose |
| `docker-compose ps`                  | Показать статус контейнеров Compose                      |
| `docker-compose logs`                | Посмотреть логи всех сервисов Compose                    |
| `docker-compose build`               | Собрать образы всех сервисов Compose                     |
| `docker-compose stop`                | Остановить контейнеры без удаления                       |
| `docker-compose restart`             | Перезапустить контейнеры                                 |
| `docker-compose exec <service> bash` | Зайти в контейнер конкретного сервиса                    |

---

## 🔹 Советы для Node.js + WSL

1. **Порт пробрасывать обязательно**:

```bash
   docker run -p 3000:3000 image_name
   docker-compose up -d
```

## 🔹 Код проекта монтировать в контейнер, чтобы видеть изменения без пересборки

```bash
docker run -it -p 3000:3000 -v /mnt/c/projects/university/docker:/app -w /app image_name
```

## Использовать интерактивный терминал для логов и работы с сервером:

```bash
docker run -it -p 3000:3000 image_name
docker-compose up
docker-compose exec <service> bash
```

## Dockerfile

```bash
# Используем официальный Node.js LTS образ
FROM node:20

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Открываем порт 3000
EXPOSE 3000

# Команда для запуска сервера
CMD ["node", "index.js"]

```

## docker-compose.yml

```bash
version: "3.9"

services:
  node-app:
    build: .
    ports:
      - "3000:3000"   # проброс порта на localhost
    volumes:
      - .:/app        # чтобы изменения кода сразу отражались
    stdin_open: true   # для интерактивной работы
    tty: true
    depens_on: some_service

```

## Запуск

```bash
docker-compose up -d // Собрать и запустить контейнер в фоне
docker-compose logs -f // docker-compose logs -f
docker-compose down // docker-compose down
```

## Удаление

Проверка текущих образов

```bash
docker images
```

Вывод покажет все локальные образы с IMAGE ID и REPOSITORY.

2️⃣ Удаление всех неиспользуемых образов (без активных контейнеров)

```bash
docker image prune -a
```

Опция -a → удаляет все образы, которые не используются контейнерами.
Потребует подтверждения y/n.
3️⃣ Удаление всех образов без исключений
Удалить все локальные образы, даже если к ним привязаны контейнеры, сначала останавливаем и удаляем все контейнеры:

```bash
docker stop $(docker ps -q)
docker rm $(docker ps -a -q)
```

Потом удаляем все образы:

```bash
docker rmi $(docker images -q)
docker images -q \→ выдаёт список всех IMAGE ID.
docker rmi удаляет каждый из них.
```

4️⃣ Полная очистка (контейнеры, тома, образы, сети)

```bash
docker system prune -a --volumes
```

# Разделение Docker Compose для разработки и продакшена

## 1️⃣ Структура проекта
project/
├─ src/
├─ Dockerfile
├─ docker-compose.dev.yml # содержит build для локальной разработки
├─ docker-compose.prod.yml # только image для сервера / продакшена
├─ .env

---

### 2️⃣ docker-compose.dev.yml (локальная разработка)

```yaml
services:
  result:
    build: .
    image: mailtime2010/result
    ports:
      - "3000:3000"
    env_file:
      - .env
```
### 3️⃣ docker-compose.prod.yml (сервер / продакшен)
```yaml
services:
  result:
    image: mailtime2010/result:abc1234
    ports:
      - "3000:3000"
    env_file:
      - .env
```
### Как запускать
Локально (разработка, пересборка)
```yaml
docker compose -f docker-compose.dev.yml up --build
```
На сервере (prod, готовые образы)
```yaml
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d

```
