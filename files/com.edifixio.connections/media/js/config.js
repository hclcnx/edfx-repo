dojo.provide("com.edifixio.connections.media.js.config");

(function(){
	com.edifixio.connections.media.js.config = {
		edfxAPI: {
			baseUrl: '/profiles/ajaxProxy/https/edfx-translator-api.eu-de.mybluemix.net',
			apiVersion: '/v1',
			identify: '/identify',
			translate: '/translate',
			health: '/health',
			clientId: '8e77b85d-c000-400c-a8cd-c95c23102657',
			clientSecret: 'mf6bd775--eb08',
			languages_src: ['en','fr','es','it','de','pt'],
			languages_target: {
				'en': ['fr','es','it','de','pt'],
				'fr': ['en','es','de'],
				'es': ['en','fr'],
				'it': ['en','de'],
				'de': ['en','fr','it'],
				'pt': ['en']
			}
        },
        icVersion: "5.5", // IBM Connections Version
		defaultTargetLang: "fr",
		defaultLocal: "fr"
	}
})();

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://edfx-translator-api.eu-de.mybluemix.net/health", true);
xhr.setRequestHeader("X-IBM-Client-Id", "8e77b85d-c000-400c-a8cd-c95c23102657");
xhr.setRequestHeader("X-IBM-Client-Secret", "mf6bd775--eb08");
xhr.send('');