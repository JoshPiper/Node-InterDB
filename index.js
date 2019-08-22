function doExport(exported){
	module.exports[exported] = require(`./lib/${exported}`)
}

doExport("InterDBError")
doExport("ListDBHandler")