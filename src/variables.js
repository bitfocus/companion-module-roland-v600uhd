const constants = require('./constants')

module.exports = {
	initVariables() {
		let variables = []

		this.setVariableDefinitions(variables);
	},

	checkVariables() {
		try {
		}
		catch(error) {
			this.log('error', `Error checking variables: ${error.toString()}`)
		}
	}
}