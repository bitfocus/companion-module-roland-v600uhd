const constants = require('./constants')

module.exports = {
	initVariables() {
		let self = this;

		self.logDebug('Initializing variables');

		let variables = []

		variables.push({variableId: 'product', name: 'Product Name'})
		variables.push({variableId: 'version', name: 'Version'})
		
		self.setVariableDefinitions(variables)

		self.setVariableValues({
			product: '',
			version: '',
		})
		
	},


}