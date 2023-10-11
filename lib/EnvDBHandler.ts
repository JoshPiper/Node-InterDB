import {default as ListDBHandler} from "./ListDBHandler"
import {Environment} from "@doctor_internet/interenv"
import {PoolOptions} from "mysql2/promise";

export default class EnvDBHandler extends ListDBHandler {
	constructor(environ: Environment | undefined = undefined){
		environ = environ === undefined ? (new Environment()) : environ
        environ = environ.prefixed("DB_")

		let envs: Set<string> = new Set()
		envs.add("")

		if (environ.has("AUTO")){
            environ.csv("AUTO").forEach(value => envs.add(value))
		} else {
            const keys = Object.keys(environ.all())
			for (let key of keys){
				for (let suffix of ['HOST', 'USER', 'PORT', 'PASS', 'DB']){
					if (!key.endsWith(suffix)){
						continue
					}

					let infix = key.replace(suffix, "")
					infix = infix.substring(0, infix.length - 1)

					if (!envs.has(infix)){
						envs.add(infix)
						break
					}
				}
			}
		}

        let configs: Map<string, PoolOptions> = new Map()
		for (let key of envs){
			configs.set(
                (key ? key : "default").toLowerCase(),
				key ?
					EnvDBHandler.makeConfig(environ.prefixed(`${key}_`), configs.get("default")) :
                    EnvDBHandler.makeConfig(environ)
			)
		}

		super(configs)
	}

	static makeConfig(data: Environment, defaults: PoolOptions = {host: "localhost", user: "root", port: 3306}){
		let cfg: PoolOptions = {
			host: data.get("HOST"),
			user: data.get("USER"),
			port: data.int("PORT"),
			password: data.get("PASS"),
			database: data.get("DB")
		}

		for (let key of Object.keys(defaults) as (keyof PoolOptions)[]){
			if (cfg[key] === "" || cfg[key] === undefined || cfg[key] === null){
				cfg[key] = defaults[key]
			}
		}

		for (let [key, value] of Object.entries(cfg) as ([keyof PoolOptions, any][])){
			if (value === "" || value === undefined || value === null){
				delete cfg[key]
			}
		}

		return cfg
	}
}
