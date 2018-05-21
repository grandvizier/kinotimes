# kinotimes
app for searching film times

## To run in production mode:
* `docker-compose up -d`

first time:
* initialize data: `docker exec KINOTIMES_BACKEND npm run initialData`

```
docker exec app_backend_1 node core/getFilmsJob.js --days 5
docker exec app_backend_1 node core/getFilmsJob.js --genUpdate
docker exec app_backend_1 node core/getFilmsJob.js --imdb
docker exec app_backend_1 node core/getFilmsJob.js --images
```

### env vars
```
export KT_MONGO_HOST=localhost:27017
export KT_MONGO_DB=films
export TMDB_TOKEN=
export OMDB_APIKEY=
export REACT_APP_KT_URL=http://localhost
export REACT_APP_KT_BACKEND_PORT=3333
export REACT_APP_KT_PORT=3000
```

## build local docker images
* `sudo docker build -f backend/Dockerfile.backend -t kinotimes_backend backend/`

**frontend**
* `cd frontend`
* `npm install`
* `npm run build`
* `sudo docker build -f Dockerfile.web -t kinotimes_web .`

## To run in dev mode:
* `npm install -g create-react-app`
* `npm install -g nodemon`
* set appropriate env vars (see above)
  * you'll need `mongo` running at localhost:27017 (or maybe setup a free instance @ mlab.com)
  * if using mlab, set env vars:
    * KT_MONGO_HOST=<dbuser>:<dbpassword>@<assigned-id>.mlab.com:<assigned-port>
    * KT_MONGO_DB=<unique-db-name>
* in backend & frontend: `npm install`
* if first time, run initialize data:
  * `node backend/core/getFilmsJob.js --days 2`
  * `node backend/core/getFilmsJob.js --genUpdate`
  * `node backend/core/getFilmsJob.js --imdb`
  * `node backend/core/getFilmsJob.js --images`

In different terminals:
* backend: `npm run start-dev`
* frontend: `npm run start-dev`
* frontend: `npm test`
