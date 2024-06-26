// Roland-V600UHD

const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')

const config = require('./src/config')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')

const utils = require('./src/utils')
const constants = require('./src/constants')

class v600uhdInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...utils,
			...constants
		});

		this.socket = undefined;

		this.data = {
			product: '',
			version: '',
		}
	}


	

	async destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy();
		}
		this.stopPoll();
	}

	async init(config) {
		this.configUpdated(config);
	}

	async configUpdated(config) {
		this.config = config;

		this.updateStatus(InstanceStatus.Connecting);
		
		this.initActions();
		this.initFeedbacks();
		this.initVariables();
		this.initPresets();

		this.initTCP();
	}
}

runEntrypoint(v600uhdInstance, UpgradeScripts);