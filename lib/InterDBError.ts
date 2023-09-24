export default class InterDBError extends Error {
	name: string = "InterDBError"

	constructor(message: string){
		super(message)
	}
}
