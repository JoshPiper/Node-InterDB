import {Environment} from "@doctor_internet/interenv"
import * as assert from "assert"
import {EnvDBHandler} from "../index"

describe("EnvDBHandler", () =>{
	describe("#constructor()", () =>{
		it("should construct with no arguments", () => {
			const databases = new EnvDBHandler()
		})
		it("should construct when passed an environment handler", () =>{
			const env = new Environment()
			const databases = new EnvDBHandler(env)
		})

		it("should load values from DB_AUTO, and reject others", function(){
			let x = new EnvDBHandler(new Environment({
				"NODE_ENV": "test",
				"DB_AUTO": "API",
				"DB_HOST": "localhost",
				"DB_USER": "root",
				"DB_PORT": "3307",
				"DB_API_DB": "api",
				"DB_API_PASS": "${NODE_ENV}",
				"DB_API_USER": "api_user",
				"DB_TEST_USER":"yes"
			}))
			assert.deepStrictEqual(Object.fromEntries(x['configs'].entries()), {
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
				},
				test: {
					host: 'db1.localhost',
					user: 'yes',
					port: 3307
				},
			})
		})
	})

	describe('#makeConfig', () => {
		it('should provide default options', () => {
			const env = new Environment({})
			assert.deepStrictEqual(EnvDBHandler.makeConfig(env), {host: 'localhost', user: 'root', port: 3306})
		})

        it('should allow providing default options', () => {
            const env = new Environment({})
            assert.deepStrictEqual(EnvDBHandler.makeConfig(env, {charset: 'none'}), {charset: 'none'})
        })

        it('should load values from the environment', () => {
            const env = new Environment({USER: "user"})
            assert.deepStrictEqual(EnvDBHandler.makeConfig(env), {host: 'localhost', user: 'user', port: 3306})
        })
	})
})
