import {Environment} from "@doctor_internet/interenv"
import * as assert from "assert"
import {ListDBHandler} from "../index"

describe("ListDBHandler", () =>{
	describe("#constructor()", () =>{
		it("should construct when passed an empty object", () => {
			const databases = new ListDBHandler({})
			assert.deepStrictEqual(databases['configs'], {})
		})
		it("should construct when passed a non-empty object", () =>{
			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})
			assert.deepStrictEqual(databases['configs'], {
				name: {
					host: "localhost"
				}
			})
		})
	})
})
