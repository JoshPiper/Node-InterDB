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
	})
})