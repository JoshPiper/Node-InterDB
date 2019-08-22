class InterDBError extends Error {
	constructor(msg){
		super(msg)
		this.name = "InterDBError"
	}
}
module.exports = InterDBError