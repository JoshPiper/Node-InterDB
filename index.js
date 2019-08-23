function doExport(exported){
	module.exports[exported] = require(`./lib/${exported}`)
}

doExport("InterDBError")
doExport("ListDBHandler")

try {
	require("@doctor_internet/interenv")
	doExport("EnvDBHandler")
} catch (e){
	// Noop.
}