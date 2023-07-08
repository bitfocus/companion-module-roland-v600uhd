const { InstanceStatus, TCPHelper } = require('@companion-module/base')

module.exports = {
	initTCP: function() {
		let self = this;
		let receivebuffer = '';
	
		if (self.socket !== undefined) {
			self.socket.destroy();
			delete self.socket;
		}
	
		if (self.config.port === undefined) {
			self.config.port = 8023;
		}
	
		if (self.config.host) {
			self.socket = new TCPHelper(self.config.host, self.config.port);
		
			self.socket.on('error', function (err) {
				self.log('error','Network error: ' + err.message);
			});
	
			self.socket.on('connect', function () {
				self.updateStatus(InstanceStatus.Ok);
			});
	
			self.socket.on('data', function(buffer) {
				let indata = buffer.toString('utf8');
				//future feedback can be added here
			});
	
		}
	},

	sendCommand(cmd) {
		let self = this;

		if (cmd !== undefined) {
			if (self.socket !== undefined && self.socket.isConnected) {
				self.socket.send(cmd + '\r\n');
			} else {
				self.log('error', 'Socket not connected');
			}
		}
	}
}