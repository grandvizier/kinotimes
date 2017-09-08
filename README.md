# kinotimes
app for searching film times

## To run in production mode:
* copy config/example.json -> config/default.json _(and add tokens)_
* `npm build`
* `docker-compose up -d`


first time, use: `docker-compose up --build`
* initialize data: `docker exec KINOTIMES_WEB_1 npm run initialData`

```
docker exec kinotimes_worker_1 node core/getFilmsJob.js --days 5
docker exec kinotimes_worker_1 node core/getFilmsJob.js --genUpdate
docker exec kinotimes_worker_1 node core/getFilmsJob.js --imdb
docker exec kinotimes_worker_1 node core/getFilmsJob.js --images
```

-------------
`sudo crontab -e`
```
0 5 * * * echo 'morning time...' >> /var/log/cron.log 2>&1

----
### env vars

KT_HOST_PORT
KT_BASE_URL
KT_MONGO_HOST
KT_MONGO_DB
TMDB_TOKEN
OMDB_APIKEY
REACT_APP_KT_BACKEND_PORT
REACT_APP_KT_PORT


# get new films/showtimes on Sun, Tues and Thursday at 5:20am
20 5 * * 0,2,4 docker exec kinotimes_worker_1 node core/getFilmsJob.js --days 5 >> /var/log/cron.log 2>&1

# update the films a litte bit later
40 5 * * 0,2,4 root /usr/local/bin/node core/getFilmsJob.js --genUpdate >> /var/log/cron.log 2>&1

# and then update the images
55 5 * * 0,2,4 root /usr/local/bin/node core/getFilmsJob.js --images >> /var/log/cron.log 2>&1
59 5 * * 0,2,4 root /usr/local/bin/node core/getFilmsJob.js --images >> /var/log/cron.log 2>&1
```

## To run in dev mode:
* `npm install`
In three terminals:
* `npm start`
* `npm start-dev`
* `npm test`
