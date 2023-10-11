import {assert} from "chai"

import {Environment} from "@doctor_internet/interenv"
import {ListDBHandler} from "../index"

describe("ListDBHandler", () =>{
	describe("#constructor()", () =>{
		it("should construct when passed an empty object", () => {
			const databases = new ListDBHandler({})
			const check = new Map()

			assert.deepStrictEqual(databases['configs'], check)
		})
		it("should construct when passed a non-empty object", () => {
			const check = new Map()
			check.set("name", {"host": "localhost"})

			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})

			assert.deepStrictEqual(databases['configs'], check)
		})
	})

	describe('#hasConfig', () => {
		it('returns true when it has a config', () => {
			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})

			assert.isTrue(databases.hasConfig("name"))
		})

		it('returns false when it does not have a config', () => {
			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})

			assert.isFalse(databases.hasConfig("undefined"))
		})
	});

	describe('#hasPool', () => {
		it('returns true when it has a pool', () => {
			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})

			assert.isTrue(databases.hasPool("name"))
		})

		it('returns false when it does not have a pool', () => {
			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})

			assert.isFalse(databases.hasPool("undefined"))
		})
	});

	describe('#has', () => {
		it('returns true when it has a pool', () => {
			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})

			assert.isTrue(databases.hasPool("name"))
			assert.isTrue(databases.has("name"))
		})

		it('returns false when it does not have either', () => {
			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})

			assert.isFalse(databases.hasConfig("undefined"))
			assert.isFalse(databases.hasPool("undefined"))
			assert.isFalse(databases.has("undefined"))
		})

		it('returns true when it has a config but no pool', () => {
			const databases = new ListDBHandler({})
			databases.set("name", {host: "localhost"})

			assert.isTrue(databases.hasConfig("name"))
			assert.isFalse(databases.hasPool("name"))
			assert.isTrue(databases.has("name"))
		})
	});

	// describe('#connect', () => {
	// 	it('allows connecting to a configured key', () => {
	// 		const databases = new ListDBHandler({
	// 			name: {
	// 				host: "localhost"
	// 			}
	// 		})
	// 		const pool = databases['connect']('name')
	// 	})
	//
	// 	it('errors when connecting to an undefined key', () => {
	// 		const databases = new ListDBHandler({
	// 			name: {
	// 				host: "localhost"
	// 			}
	// 		})
	// 		assert.throws(() => {
	// 			const pool = databases['connect']('undefined')
	// 		})
	// 	})
	//
	// 	it('returns true when it has a config but no pool', () => {
	// 		const databases = new ListDBHandler({})
	// 		databases.set("name", {host: "localhost"})
	//
	// 		assert.isTrue(databases.hasConfig("name"))
	// 		assert.isFalse(databases.hasPool("name"))
	// 		assert.isTrue(databases.has("name"))
	// 	})
	// });

	describe('#get', () => {
		it('allows connecting to a default configured key', () => {
			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})
			const pool = databases.get('name')
		})

		it('allows connecting to a set configured key', () => {
			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})
			databases.set("key", {host: "localhost"})
			const pool = databases.get('key')
		})

		it('errors when connecting to an undefined key', () => {
			const databases = new ListDBHandler({
				name: {
					host: "localhost"
				}
			})
			assert.throws(() => {
				const pool = databases.get('undefined')
			})
		})
	});
})
