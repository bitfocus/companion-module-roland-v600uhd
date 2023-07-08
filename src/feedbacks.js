const { combineRgb } = require('@companion-module/base')

module.exports = {
	initFeedbacks() {
		let self = this;
		
		let feedbacks = {}

		this.setFeedbackDefinitions(feedbacks)
	}
}