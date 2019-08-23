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
				"DB_HOST": "nigeria",
				"DB_USER": "big_money_prince",
				"DB_PORT": "3307",
				"DB_API_DB": "money",
				"DB_API_PASS": "${NODE_ENV}",
				"DB_API_USER": ""
			})
			assert.deepStrictEqual(x.configs, {
				default: {
					host: 'nigeria',
					user: 'big_money_prince',
					port: 3307
				},
				api: {
					host: 'nigeria',
					port: 3307,
					password: 'test',
					database: 'money'
				}
			})
		})
	})
})