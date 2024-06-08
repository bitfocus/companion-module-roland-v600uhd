const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module will connect to a Roland Pro AV V-600UHD Video Switcher.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				width: 6,
				default: '192.168.0.1',
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'password',
				label: 'Password',
				width: 6,
				default: '0000'
			},

			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false
			},
			{
				type: 'static-text',
				id: 'info3',
				width: 12,
				label: ' ',
				value: `
				<div class="alert alert-info">
					<div>
						Enabling Verbose Logging will push all incoming and outgoing data to the log, which is helpful for debugging.
					</div>
				</div>
				`,
				isVisible: (configValues) => configValues.verbose === true,
			},
		]
	}
}