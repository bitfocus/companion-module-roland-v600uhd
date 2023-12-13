module.exports = {
	initActions() {
		let self = this;

		let actions = {};

		actions.select_pgm = {
			name: 'Select PGM Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: '0',
					choices: self.CHOICES_INPUTS
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `PGM:${options.source};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.select_pst = {
			name: 'Select PST Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: '0',
					choices: self.CHOICES_INPUTS
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `PST:${options.source};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.select_aux = {
			name: 'Select AUX Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: '0',
					choices: self.CHOICES_INPUTS
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `AUX:${options.source};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.select_transition_pattern = {
			name: 'Select transition pattern',
			options: [
				{
					type: 'dropdown',
					label: 'Transition Pattern',
					id: 'transitionpattern',
					default: '0',
					choices: self.CHOICES_TRANSITION_PATTERNS
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `TRS:${options.transitionpattern};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.set_transition_time = {
			name: 'Set Video Transition Time',
			options: [
				{
					type: 'textinput',
					label: 'Time between 0 (0.0 sec) and 40 (4.0 sec)',
					id: 'transitiontime',
					default: '1'
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `TIM:${options.transitiontime};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.auto = {
			name: 'Press the [AUTO] button',
			options: [],
			callback: async (action) => {
				let options = action.options;
				let cmd = 'ATO;';
				self.sendCommand(cmd);
			}
		}
		
		actions.cut = {
			name: 'Press the [CUT] button',
			options: [],
			callback: async (action) => {
				let options = action.options;
				let cmd = 'CUT;';
				self.sendCommand(cmd);
			}
		};
		
		actions.select_composition_type = {
			name: 'Select Composition Type',
			options: [
				{
					type: 'dropdown',
					label: 'Composition Type',
					id: 'compositiontype',
					default: '0',
					choices: self.CHOICES_COMPOSITION_TYPES
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `CTY:${options.compositiontype};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.select_dsk_type = {
			name: 'Select DSK Type',
			options: [
				{
					type: 'dropdown',
					label: 'DSK Type',
					id: 'dsktype',
					default: '0',
					choices: self.CHOICES_DSK_TYPES
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `DTY:${options.dsktype};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.composition = {
			name: 'Press the [COMPOSITION] button',
			options: [],
			callback: async (action) => {
				let options = action.options;
				let cmd = 'CMP;';
				self.sendCommand(cmd);
			}
		};
		
		actions.dsk = {
			name: 'Press the [DSK] button',
			options: [],
			callback: async (action) => {
				let options = action.options;
				let cmd = 'DSK;';
				self.sendCommand(cmd);
			}
		};
		
		actions.set_outputfade_onoff = {
			name: 'Set Output Fade On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'Setting',
					id: 'setting',
					default: '0',
					choices: [
						{ id: '0', label: 'Off'},
						{ id: '1', label: 'On'}
					]
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `FDE:${options.setting};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.set_outputfade_time = {
			name: 'Set Output Fade Time',
			options: [
				{
					type: 'textinput',
					label: 'Time between 0 (0.0 sec) and 100 (10.0 sec)',
					id: 'transitiontime',
					default: '1'
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `FDT:${options.transitiontime};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.audio_input_level = {
			name: 'Adjust Volume Level of Input Audio',
			options: [
				{
					type: 'dropdown',
					label: 'Audio Channel',
					id: 'audiochannel',
					default: '0',
					choices: self.CHOICES_AUDIOINPUTS
				},
				{
					type: 'textinput',
					label: '-801 (-INF dB), -800 (-80.0 dB) – 0 (0.0 dB) –100 (10.0 dB)',
					id: 'level',
					default: '0'
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `IAL:${options.audiochannel},${options.level};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.audio_master_level = {
			name: 'Adjust Volume Level for Master Out',
			options: [
				{
					type: 'textinput',
					label: '-801 (-INF dB), -800 (-80.0 dB) – 0 (0.0 dB) –100 (10.0 dB)',
					id: 'level',
					default: '0'
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `OAX:${options.level};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.audio_aux_level = {
			name: 'Adjust Volume Level for Aux Bus',
			options: [
				{
					type: 'textinput',
					label: '-801 (-INF dB), -800 (-80.0 dB) – 0 (0.0 dB) –100 (10.0 dB)',
					id: 'level',
					default: '0'
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `OAX:${options.level};`;
				self.sendCommand(cmd);
			}
		};
		
		actions.memory = {
			name: 'Call Up Memory',
			options: [
				{
					type: 'dropdown',
					label: 'Memory',
					id: 'memory',
					default: '0',
					choices: self.CHOICES_MEMORIES
				}
			],
			callback: async (action) => {
				let options = action.options;
				let cmd = `MEM:${options.memory};`;
				self.sendCommand(cmd);
			}
		};
		
		this.setActionDefinitions(actions)
	}
}
