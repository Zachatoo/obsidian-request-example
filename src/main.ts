import { Plugin } from "obsidian";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RequestExamplePluginSettings {}

const DEFAULT_SETTINGS: RequestExamplePluginSettings = {};

export default class RequestExamplePlugin extends Plugin {
	settings: RequestExamplePluginSettings;

	async onload() {
		await this.loadSettings();
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
