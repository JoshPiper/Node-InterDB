import Error from "./InterDBError"
import {createPool, Pool, PoolOptions} from "mysql2/promise"

interface Configuration {
	[index: string]: PoolOptions
}

class ListDBHandler {
	private readonly pools: Map<string, Pool>;
	private readonly configs: Map<string, PoolOptions>;

	/**
	 * Create a list DB handler.
	 * @param configs Object with keys referring to DB objects, values being a key/value pair of settings to pass to the connection pool.
	 */
	constructor(configs: Map<string, PoolOptions> | Configuration){
		this.pools = new Map()

		if (configs instanceof Map){
			this.configs = configs
		} else {
			this.configs = new Map()
			for (let config of Object.keys(configs)){
				this.configs.set(config, configs[config] as any)
			}
		}

		for (let config of this.configs.keys()){
			this.connect(config)
		}
	}

	/**
	 * Check if a given config exists.
	 * @param {string} key
	 * @returns {boolean}
	 */
	hasConfig(key: string): boolean {
		return this.configs.has(key)
	}

	/**
	 * Check if a given pool exists
	 * @param {string} key
	 * @returns {boolean}
	 */
	hasPool(key: string): boolean {
		return this.pools.has(key)
	}

	/**
	 * Check if a given key is possible (currently connected or has a config for connection)
	 * @param key
	 * @returns {boolean}
	 */
	has(key: string): boolean {
		return this.hasConfig(key) || this.hasConfig(key)
	}

	/**
	 * Internally create the pool and return it.
	 * @param key
	 * @returns {Pool}
	 */
	connect(key: string): Pool {
		let config = this.configs.get(key)
		if (config === undefined){
			throw new Error("Bad key provided to connect()")
		}

		let pool = createPool(config)
		this.pools.set(key, pool)
		return pool
	}

	/**
	 *
	 * @param key
	 * @returns {Pool}
	 * @throws {Error} Throws an InterDBError if the requested config is not in the list.
	 */
	get(key: string): Pool {
		if (!this.hasPool(key)){
			return this.connect(key)
		}

		return this.pools.get(key)!
	}
}

export default ListDBHandler
export {Configuration}
