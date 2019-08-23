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

		super(configs)
	}

	static makeConfig(data, defaults = {host: "localhost", user: "root", port: 3306}){
		let cfg = {
			host: data.raw("HOST"),
			user: data.raw("USER"),
			port: data.int("PORT"),
			password: data.raw("PASS"),
			database: data.raw("DB")
		}

		for (let key of Object.keys(defaults)){
			if (cfg[key] === undefined || cfg[key] === null){
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