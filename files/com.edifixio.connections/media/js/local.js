dojo.provide("com.edifixio.connections.media.js.local");
dojo.require("com.edifixio.connections.media.js.config");

(function () {
    var config = com.edifixio.connections.media.js.config,
        getUserLang = function () {
            return djConfig.locale.substring(0, 2) || navigator.language || config.defaultLocal;
        },
        localKeys = {
            en: {
                plugin_name: "EDIFIXIO Translator",
                translate: "Translate",
                initial_text: "Initial text",
                help: "Select text in the page, then click on the translation button.",
                help_translated: "The translated text will be displayed here.",

                error_src_not_available: "Translation from the detected language {edfx} is not available with your translation service licence. Please contact the service manager for more details.",
                                
                de: "German",
                en: "English",
                es: "Spanish",
                fr: "French",
                it: "Italian",
                ja: "Japanese",
                pt: "Portuguese",
                ru: "Russian",
                zh: "Chinese",
                da: "Danish"
            },
            fr: {
                plugin_name: "EDIFIXIO Translator",
                translate: "Traduire",
                initial_text: "Texte initial",
                help: "Sélectionnez du texte dans la page, puis cliquez sur le bouton de traduction.",
                help_translated: "Le texte traduit sera affiché ici.",

                error_src_not_available: "La traduction depuis la langue identifiée {edfx} n'est pas disponible avec votre licence de traduction. Veuillez contacter le responsable du service pour plus de détails.",
                
                de: "Allemand",
                en: "Anglais",
                es: "Espagnol",
                fr: "Français",
                it: "Italien",
                ja: "Japonais",
                pt: "Portugais",
                ru: "Russe",
                zh: "Chinois",
                da: "Danois"
            },
            de: {
                plugin_name: "EDIFIXIO Translator",
                translate: "Übersetzen",
                initial_text: "Anfangstext",
                help: "Wählen Sie den Text auf der Seite aus und klicken Sie dann auf die Übersetzungsschaltfläche.",
                help_translated: "Der übersetzte Text wird hier angezeigt.",

                error_src_not_available: "Die Übersetzung aus der erkannten Sprache {edfx} ist mit Ihrer Übersetzungsdienstlizenz nicht verfügbar. Bitte kontaktieren Sie den Service Manager für weitere Details.",
                
                de: "Deutsch",
                en: "Englisch",
                es: "Spanisch",
                fr: "Franz\u00f6sisch",
                it: "Italienisch",
                ja: "Japanisch",
                pt: "Portugiesisch",
                ru: "Russisch",
                zh: "Chinesisch",
                da: "Dänisch"
            },
            es: {
                plugin_name: "EDIFIXIO Translator",
                translate: "Traducir",
                initial_text: "Texto inicial",
                help: "Seleccione texto en la página, luego haga clic en el botón de traducción.",
                help_translated: "El texto traducido se mostrará aquí.",

                error_src_not_available: "La traducción desde el idioma detectado {edfx} no está disponible con su licencia de servicio de traducción. Por favor, póngase en contacto con el administrador del servicio para más detalles.",
                
                de: "Alem\u00e1n",
                en: "Ingl\u00e9s",
                es: "Espa\u00f1ol",
                fr: "Franc\u00e9s",
                it: "Italiano",
                ja: "Japon\u00e9s",
                pt: "Portugu\u00e9s",
                ru: "Ruso",
                zh: "Chino"
            },
            it: {
                plugin_name: "EDIFIXIO Translator",
                translate: "Tradurre",
                initial_text: "Testo iniziale",
                help: "Seleziona il testo nella pagina, quindi fai clic sul pulsante di traduzione.",
                help_translated: "Il testo tradotto verrà visualizzato qui.",
                
                error_src_not_available: "La traduzione dalla lingua rilevata {edfx} non è disponibile con la licenza del servizio di traduzione. Si prega di contattare il responsabile del servizio per maggiori dettagli.",

                de: "Tedesco",
                en: "Inglese",
                es: "Spagnolo",
                fr: "Francese",
                it: "Italiano",
                ja: "Giapponese",
                pt: "Portoghese",
                ru: "Russo",
                zh: "Cinese",
                da: "Danese"
            }
        };
    com.edifixio.connections.media.js.local = {
        getString: function (key) {
            if (key === "") return "";
            return localKeys[getUserLang()][key];
        }
    }
})();
