# InterDB

> Handler for multiple named SQL connection pools.

Handling multiple MySQL connection pools to different servers can be a hassle, depending on the implementation.
InterDB aims to reduce the workload required to implement that.

## Usage

```js
let Handler = require('@doctor_internet/interdb').ListDBHandler
let db = new Handler({
    live: {
        host: "db.example.com",
        user: "node-service-worker",
        password: "amazingpassword",
        database: "jobs"
    },
    backup: {
        host: "backup.example.com",
        user: "node-backup-service-worker",
        password: "evenbetterpassword",
        database: "backups"
    }
})
db.get("live").query("SELECT * FROM complete").then(console.log)
```

with this example fetching completed jobs from the live db.
Unfortunately, InterDB only supports MySQL2 promise based connection pools, as opposed to callback based pools or other connection drivers.

There's also a class which automatically pulls connection details from the environment files, assuming interenv is installed.

```env
DB_AUTO=API,LOGS
DB_HOST=db.example.com
DB_USER=exampleuser
DB_PASS=goodpassword
DB_API_DB=api
DB_LOGS_DB=prod_logs
DB_LOGS_PASS=anothergreatpassword
```
```js
let Handler = require('@doctor_internet/interdb').EnvDBHandler
let db = new Handler(process.env)
console.log(db.configs)
```

outputs

```json
{
  default: {
    host: 'db.example.com',
    user: 'exampleuser',
    port: 3306,
    password: 'goodpassword'
  },
  api: {
    host: 'db.example.com',
    user: 'exampleuser',
    port: 3306,
    password: 'goodpassword',
    database: 'api'
  },
  logs: {
    host: 'db.example.com',
    user: 'exampleuser',
    port: 3306,
    password: 'anothergreatpassword',
    database: 'prod_logs'
  }
}
```

## Default Values
No default values are provided for the ListDBHandler, each config is passed to the connection pool as-is.

For the EnvDBHandler, a default host, port and user are provided (localhost, 3306 and root respectively).
Un-namespaced variables are used first, and placed in the "default" key. (ex: DB_HOST -> default.host)

Names in the DB_AUTO list then expanded (comma separated).
Each name is lowercase'd, and used as the config key. (API -> api)
Namespaced DB vars are then found and added (DB_API_DB -> api.database)
Then any vars in the default host which are not in the database are found and merged (DB_HOST -> default.host -> api.host)
Finally, any null or empty string values are unset.

## Value Mappings

DB_HOST -> host
DB_USER -> user
DB_PORT -> port
DB_PASS -> password
DB_DB -> database

## API

```js
const InterDB = require('@doctor_internet/interdb')
const Handler = InterDB.EnvDBHandler

let DB = new Handler()
console.log(DB.has("default")) // boolean: true
console.log(DB.has("some_key_that_doesnt_exist")) // boolean: false
console.log(DB.get("default")) // MySQL2 Promise Connection Pool.
```

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install @doctor_internet/interdb
```

## See Also

- [noffle/common-readme](https://github.com/noffle/common-readme) :: Readme Generation
- [mocha](https://mochajs.org/) :: Testing Suite

## License

MIT


