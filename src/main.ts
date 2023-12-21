import { Plugin, TFile, requestUrl } from "obsidian";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RequestExamplePluginSettings {}

const DEFAULT_SETTINGS: RequestExamplePluginSettings = {};

export default class RequestExamplePlugin extends Plugin {
	settings: RequestExamplePluginSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "request-url",
			name: "Request URL",
			callback: async () => {
				const url = "https://google.com";
				const path = "ogimage.png";
				const file = this.app.vault.getAbstractFileByPath(path);
				if (file instanceof TFile) {
					const data = await this.app.vault.readBinary(file);
					const res = await requestUrl({
						url,
						method: "POST",
						body: data,
					});
					console.log("res", res);
				}
			},
		});

		this.addCommand({
			id: "request-url-formdata",
			name: "Request URL FormData (DOESN'T WORK)",
			callback: async () => {
				const url = "https://google.com";
				const path = "ogimage.png";
				const file = this.app.vault.getAbstractFileByPath(path);
				if (file instanceof TFile) {
					const data = await this.app.vault.readBinary(file);
					const blob = new Blob([data], { type: "image/png" });
					const formData = new FormData();
					formData.set("file", blob, path);
					const res = await requestUrl({
						url,
						method: "POST",
						body: formData,
					});
					console.log("res", res);
				}
			},
		});
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
