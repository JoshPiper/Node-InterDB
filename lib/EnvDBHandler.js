const Error = require("./InterDBError")
const ListDBHandler = require("./ListDBHandler")
const Handler = require("interenv")

class EnvDBHandler extends ListDBHandler {
	constructor(envPath){
		let env
		if (envPath instanceof Handler){
			env = envPath
		} else {
			env = new Handler(envPath)
		}

		let configs = {}
		let subEnv = env.prefixed("DB_")
		configs["default"] = EnvDBHandler.makeConfig(subEnv)

		let autos = subEnv.list("AUTO")
		for (let auto of autos){
			configs[auto.toLowerCase()] = EnvDBHandler.makeConfig(subEnv.prefixed(`${auto}_`), configs["default"])
		}

		console.log(configs)
		super(configs)
	}

	static makeConfig(data, defaults = {}){
		console.log(data)
		let cfg = {
			host: data.has("HOST") ? data.raw("HOST") : "localhost",
			user: data.has("USER") ? data.raw("USER") : "root",
			port: data.has("PORT") ? data.int("PORT") : 3306,
			password: data.raw("PASS"),
			database: data.raw("DB")
		}

		for (let key of Object.keys(defaults)){
			if (cfg[key] === undefined){
				cfg[key] = defaults[key]
			}
		}

		for (let key of Object.keys(cfg)){
			if (cfg[key] === "" || cfg[key] === null){
				delete cfg[key]
			}
		}

		return cfg
	}
}

module.exports = EnvDBHandler