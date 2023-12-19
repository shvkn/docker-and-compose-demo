# Докеризация приложения

### Развернутое приложение доступно по адресу: <br>
**Frontend**: https://kp.another-one.ru<br>
**Backend**: https://api.kp.another-one.ru<br>

Два сценания **Continuous delivery (CD)**: 
- Локальная сборка Dockerfiles
- Сборка через [Docker Hub](https://hub.docker.com) (Github workflows)

### Параметры сборки и запуска (переменные окружения)

Задаются через .env \ terminal

`POSTGRES_DB`: <имя базы данных> <br>
`POSTGRES_USER`: <имя пользователя базы данных> <br>
`POSTGRES_PASSWORD`: <пароль пользователя базы данных> <br>
`DB_PORT`: <хост порт БД><br>
`BACKEND_APP_PORT`: <хост порт для бэкенда><br>
`JWT_SECRET`: <JWT секрет><br>
`JWT_EXPIRES_IN`: <время жизни JWT><br>
`SWAGGER_API_PATH`: <путь до Swagger><br>
`API_SERVER_URL`: <URL бэкенда><br>
`FRONTEND_APP_PORT`: <хост порт для фронтенда><br>

## 1. Локальная сборка Dockerfiles

### Запуск
После запуска приложение будет доступно по адресу http://localhost:8081

**Пример .env**
```bash
cat << EOF > .env
DB_DATABASE=kupipodariday
DB_USERNAME=student
DB_PASSWORD=student
DB_HOST=database
PORT=4000
DB_PORT=5432
JWT_SECRET=some-jwt-secret
JWT_EXPIRES_IN=24h
SWAGGER_API_PATH=api
API_SERVER_URL=http://localhost:4000
FRONTEND_APP_PORT=8081
EOF
```
**Запуск**
```bash
docker compose up -d
```
**Остановка и удаление контейнеров**
```bash
docker compose down
```


## 2. Сборка через Docker Hub (Github workflows)

Сборка и публикация образов происходит во время pull-request\push в основную ветку, с помощю github workflows (deploy.yml).

### Секреты и переменные
`secrets.DOCKER_HUB_ACCESS_TOKEN`: *<токен доступа docker hub>*<br>
`secrets.DOCKER_HUB_USERNAME`: *<username владельца репозитория docker hub>*<br>
`vars.API_SERVER_URL`: *<адрес хоста API для сборки фронтенда>*<br>

### Запуск
После запуска приложение будет доступно по адресу http://localhost:8081

**Пример .env**
```bash
cat << EOF > .env
DB_DATABASE=kupipodariday
DB_USERNAME=student
DB_PASSWORD=student
DB_HOST=database
PORT=4000
DB_PORT=5432
JWT_SECRET=some-jwt-secret
JWT_EXPIRES_IN=24h
SWAGGER_API_PATH=api
FRONTEND_APP_PORT=8081
EOF
```
**Запуск**
```bash
docker compose -f docker-compose.hub.yml up -d
```
**Остановка и удаление контейнеров**
```bash
docker compose -f docker-compose.hub.yml down
```