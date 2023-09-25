import {default as ListDBHandler, Configuration} from "./ListDBHandler"
import Handler from "@doctor_internet/interenv"
import {PoolOptions} from "mysql2/promise";

export default class EnvDBHandler extends ListDBHandler {
	constructor(path: string | Handler){
		let env
		if (path instanceof Handler){
			env = path
		} else {
			env = new Handler(path)
		}

		let configs: Configuration = {}
		let subEnv = env.prefixed("DB_")
		configs["default"] = EnvDBHandler.makeConfig(subEnv)

		let autos = subEnv.list("AUTO")
		for (let auto of autos){
			configs[auto.toLowerCase()] = EnvDBHandler.makeConfig(subEnv.prefixed(`${auto}_`), configs["default"])
		}

		super(configs)
	}

	static makeConfig(data: Handler, defaults: PoolOptions = {host: "localhost", user: "root", port: 3306}){
		let cfg: PoolOptions = {
			host: data.raw("HOST"),
			user: data.raw("USER"),
			port: data.int("PORT") as number | undefined,
			password: data.raw("PASS"),
			database: data.raw("DB")
		}

		for (let key of Object.keys(defaults) as (keyof PoolOptions)[]){
			if (cfg[key] === undefined || cfg[key] === null){
				cfg[key] = defaults[key]
			}
		}

		for (let [key, value] of Object.entries(cfg) as ([keyof PoolOptions, any][])){
			if (value === "" || value[key] === null){
				delete cfg[key]
			}
		}

		return cfg
	}
}
