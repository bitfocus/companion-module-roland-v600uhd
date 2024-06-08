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
			self.log('info', `Opening connection to ${self.config.host}:${self.config.port}`);

			self.socket = new TCPHelper(self.config.host, self.config.port);
		
			self.socket.on('error', function (err) {
				self.log('error','Network error: ' + err.message);
			});
	
			self.socket.on('connect', function () {
				self.updateStatus(InstanceStatus.Ok);
			});
	
			self.socket.on('data', function(buffer) {
				let indata = buffer.toString('utf8');
				//update feedbacks and variables
				self.updateData(indata);
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
	},


	updateData: function(data) {
		let self = this;
	
		if (self.config.verbose) {
			self.log('debug', data);
		}
	
		if(data.trim() =='Enter password:') {
			self.updateStatus(InstanceStatus.UnknownWarning, 'Authenticating');
			self.log('info', 'Sending passcode: ' + self.config.password);
			self.socket.send(self.config.password + '\n');
		}
		else if (data.trim() == 'Welcome to Roland V-600UHD.') {
			self.updateStatus(InstanceStatus.Ok);
			self.log('info', 'Authenticated.');
			self.sendCommand('VER;'); //request version info
			//self.sendRawCommand('VER'); //request version info
			//self.startInterval(); //request tally states
			//self.subscribeToTally(); //request tally changes
		}
		else if (data.trim() == 'ERR:0;') {
			//an error with something that it received
		}
		else {
			//do stuff with the data
			try {
				if (data.indexOf(';')) {
					let dataGroups = data.trim().split(';');
	
					for (let j = 0; j < dataGroups.length; j++) {
						dataGroups[j] = dataGroups[j].trim();
						if (dataGroups[j] !== 'ACK' && dataGroups[j] !== '') {
							let dataSet = dataGroups[j].trim().split(':');
							if (Array.isArray(dataSet)) {
								let dataPrefix = '';
								
								if (dataSet[0] !== undefined) {
									dataPrefix = dataSet[0].toString().trim();
								}
	
								let dataSuffix = '';
								
								if (dataSet.length > 1) {
									if (dataSet[1].toString().indexOf(',')) {
										dataSuffix = dataSet[1].toString().split(',');
	
										if (dataPrefix.indexOf('VER') > -1) {
											self.MODEL = dataSuffix[0].toString();
											self.VERSION = dataSuffix[1].toString();
										}
						
									}
								}
								else {
									//likely just ERR:0;
								}						
							}
						}
					}
				
					//now update feedbacks and variables
					//self.checkFeedbacks();
					self.checkVariables();
				}
			}
			catch(error) {
				self.log('error', 'Error parsing incoming data: ' + error);
				self.log('error', 'Data: ' + data);
			}
		}
	}

}