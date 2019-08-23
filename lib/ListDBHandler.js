const Error = require("./InterDBError")
const mysql = require("mysql2/promise")

class ListDBHandler {
	constructor(configs){
		this.pools = []
		this.configs = configs

		for (let config of Object.keys(this.configs)){
			this.connect(config)
		}
	}

	hasConfig(key){
		return this.configs[key] !== undefined
	}

	hasPool(key){
		return this.pools[key] !== undefined
	}

	has(key){
		return this.pools[key] !== undefined || this.configs[key] !== undefined
	}

	connect(key){
		if (!this.hasConfig(key)){
			throw new Error("Bad key provided to connect()")
		}

		this.pools[key] = mysql.createPool(this.config[key])
		return this.pools[key]
	}

	get(key){
		if (!this.hasPool(key)){
			return this.connect(key)
		} else {
			return this.pools[key]
		}
	}
}

module.exports = ListDBHandler