const constants = require('./constants')

module.exports = {
	initVariables() {
		let self = this;

		self.logDebug('Initializing variables');

		// The dynamic variable exposed to Companion
		self.currentState.dynamicVariables = {
			model: 'N/A',
			version: 'N/A',
		}
		self.currentState.dynamicVariablesDefs = [
			{
				name: 'Model',
				variableId: 'model',
			},
			{
				name: 'Version',
				variableId: 'version',
			},
		]
		self.setVariableDefinitions(self.currentState.dynamicVariablesDefs) 
		self.setVariableValues(self.currentState.dynamicVariables)
	},

	checkVariables() {
		let self = this;
		
		self.logDebug('Checking variables and updating.');

		self.setVariableValues(self.currentState.dynamicVariables)
	}
}