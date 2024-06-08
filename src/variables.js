const constants = require('./constants')

module.exports = {
	initVariables() {
		try {
			let variables = [
				{hardware_model: 'undefined'},
				{firmware_version: 'undefined'}
			]
			this.setVariableDefinitions(variables);
		}
		catch(error) {
			this.log('error', `Error initializing variables: ${error.toString()}`)
		}
	},

	checkVariables() {
		try {
			let variables = [
				{hardware_model: self.MODEL},
				{firmware_version: self.VERSION}
			]
			this.setVariableValues(variables)
		}
		catch(error) {
			this.log('error', `Error checking variables: ${error.toString()}`)
		}
	}
}