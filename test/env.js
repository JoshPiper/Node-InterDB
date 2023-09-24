let assert = require("assert")
let db = require("../lib/EnvDBHandler")

describe("EnvDBHandler", function(){
	describe("construct()", function(){
		it("should construct when not requesting an env config.", function(){
			let x = new db()
		})
		it("should construct when an env config.", function(){
			let x = new db(true)
		})
		it("should construct when passing a path.", function(){
			let x = new db("./.env")
		})
		it("should construct when passed an env object.", function(){
			let x = new db({
				"NODE_ENV": "test"
			})
		})
		it("should construct and merge when passed an env object with DB values.", function(){
			let x = new db({
				"NODE_ENV": "test",
				"DB_AUTO": "API",
				"DB_HOST": "db1.localhost",
				"DB_USER": "db1user",
				"DB_PORT": "3307",
				"DB_API_DB": "api",
				"DB_API_PASS": "${NODE_ENV}",
				"DB_API_USER": "api_user"
			})
			assert.deepStrictEqual(x.configs, {
				default: {
					host: 'db1.localhost',
					user: 'db1user',
					port: 3307
				},
				api: {
					host: 'db1.localhost',
					port: 3307,
					password: 'test',
					database: 'api',
					user: 'api_user'
				}
			})
		})
	})
})
