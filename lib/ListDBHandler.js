const Error = require("./InterDBError")
const mysql = require("mysql2/promise")
const Pool = mysql.PromisePool

class ListDBHandler {
	/**
	 * Create a list DB handler.
	 * @param configs Object with keys referring to DB objects, values being a key/value pair of settings to pass to the connection pool.
	 */
	constructor(configs){
		this.pools = []
		this.configs = configs

		for (let config of Object.keys(this.configs)){
			this.connect(config)
		}
	}

	/**
	 * Check if a given config exists.
	 * @param key
	 * @returns {boolean}
	 */
	hasConfig(key){
		return this.configs[key] !== undefined
	}

	/**
	 * Check if a given pool exists
	 * @param key
	 * @returns {boolean}
	 */
	hasPool(key){
		return this.pools[key] !== undefined
	}

	/**
	 * Check if a given key is possible (currently connected or has a config for connection)
	 * @param key
	 * @returns {boolean}
	 */
	has(key){
		return this.pools[key] !== undefined || this.configs[key] !== undefined
	}

	/**
	 * Internally create the pool and return it.
	 * @param key
	 * @returns {Pool}
	 */
	connect(key){
		if (!this.hasConfig(key)){
			throw new Error("Bad key provided to connect()")
		}

		this.pools[key] = mysql.createPool(this.configs[key])
		return this.pools[key]
	}

	/**
	 *
	 * @param key
	 * @returns {Pool}
	 */
	get(key){
		if (!this.hasPool(key)){
			return this.connect(key)
		} else {
			return this.pools[key]
		}
	}
}

module.exports = ListDBHandler