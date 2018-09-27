dojo.provide("com.edifixio.connections.media.js.utils");

(function () {
    com.edifixio.connections.media.js.utils = {
        stripHtml: function (html) {
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        },
        isEmpty: function (a) {
            for (var b in a)
                if (a.hasOwnProperty(b)) return !1;
            return !0
        },
        show: function (node) {
            node && node.style && (node.style.display = "")
        },
        hide: function (node) {
            node && node.style && (node.style.display = "none")
        },
        innerText: function (node) {
            return 3 == node.nodeType ? node.nodeValue : "undefined" != typeof node.innerText ?
                node.innerText : node.textContent
        },
        getDirAttribute: function (a) {
            return "heb" == a || "ara" == a ? "rtl" :
                "ltr"
        },
        createCookie: function (cname,cvalue,expvalue,expkey) {
            var d=new Date(),
                secondeInMillis = 1000,
                minuteInMillis = 60*1000,
                hourInMillis = 60*60*1000,
                dayInMillis = 24*60*60*1000,
                expInMillis;
            switch (expkey) {
                case "s": 
                    expInMillis = secondeInMillis;
                    break;
                case "m":
                    expInMillis = minuteInMillis;
                    break;
                case "h":
                    expInMillis = hourInMillis;
                    break;
                case "d":
                    expInMillis = dayInMillis;
                    break;
                default:
                    expInMillis = dayInMillis
            }
            d.setTime(d.getTime()+(expvalue*expInMillis));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
        },
        getCookie: function (cname) {
            var name = cname + "=",
                decodedCookie = decodeURIComponent(document.cookie),
                ca = decodedCookie.split(';');
            for (var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name)==0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";            
        },
        deleteCookie: function (name) {
            com.edifixio.connections.media.js.utils.createCookie(name, "", -1);
        }
    }
})();


dojo.provide("com.edifixio.connections.media.js.config");

(function(){
	com.edifixio.connections.media.js.config = {
		edfxAPI: {
			baseUrl: 'https://edfx-translator-api.eu-de.mybluemix.net',
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
        icVersion: "Cloud", // IBM Connections Version
		defaultTargetLang: "fr",
		defaultLocal: "fr"
	}
})();

dojo.provide("com.edifixio.connections.media.js.local");

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

dojo.provide("com.edifixio.connections.media.js.dom");

(function() {

    Object.at = function(selectorKey, b) {
                    if("object"===typeof b) {
                        selectorKey=selectorKey.replace(/\[(\w+)\]/g, ".$1");
                        selectorKey=selectorKey.replace(/^\./, "");
                        for(var c=selectorKey.split("."), d=0, f=c.length; d<f; ++d) {
                            var e=c[d];
                            if(e in b)
                                b=b[e];
                            else 
                                return
                        }
                        return b
                    }
                };
    
    var selectors= {// default 5.5
                        "default": {
                            header: {
                                menu: ".lotusBanner ul.lotusUtility", logoutBtn: "#logoutLi"
                            }
                            , blog: {
                                entry: {
                                    blogTitle: "h1 .bidiAware", title: "#entries .lotusTable .lotusFirst .entryContentContainerTD h4", content: "#entries .lotusTable .lotusFirst .entryContentContainerTD .entryContentContainer", actionsMenu: "#lotusContent > .lotusActionBar"
                                }
                                , comment: {
                                    container: ".lotusPostContent.lotusForum", content: "p.blogsWrapText", actionsMenu: ".lotusInlinelist"
                                }
                            }
                            , wiki: {
                                entry: {
                                    title: ".lotusMain .lotusContent .wikiHeader .lotusHeader h1", content: ".lotusMain .lotusContent #pageDetails #wikiContentDiv div", actionsMenu: ".lotusMain .lotusContent .wikiHeader .lotusHeader .lotusBtnContainer"
                                }
                                , comment: {
                                    container: ".lotusPostContent", actionsMenu: ".lotusInlinelist", actionsMenuContainer: ".lotusPostDetails", content: ".lotusPostDetails p"
                                }
                            }
                            , forum: {
                                post: {
                                    container: ".hentry.lotusPost", content: ".entry-content.lotusPostDetails", actionsMenu: ".lotusActions .lotusInlinelist"
                                }
                            }
                            , file: {
                                comment: {
                                    container: ".comment", content: ".textContainer .bidiAware", footer: ".footer"
                                }
                            }
                            , activityStream: {
                                sharebox: {
                                    container: ".streamSharebox", actionsMenu: ".lotusInlinelist.lotusLeft", content: ".lotusMentionsDiv", contentIframe: "[id^='lconn_news_microblogging_sharebox'] iframe", contentWithinContentIframe: "p"
                                }
                                , post: {
                                    footer: ".lotusMeta.lotusChunk"
                                }
                                , comment: {
                                    container: ".lotusCommentItem .lotusPost", content: ".lotusPostDetails .bidiAware", contentIncludingShowMore: ".lotusPostDetails", actionsMenu: ".lotusInlinelist"
                                }
                            }
                            , profile: {
                                background: {
                                    tab: "#backgroundInfo_TabItem", container: "#backgroundInfoSection", content: "#_backgroundInfo_profileDetails_widget_container"
                                }
                            }
                            , community: {
                                description: {
                                    subcontainer: "#descContent", content: ".communityOverview", actionsMenu: ".lotusMeta"
                                }
                            }
                        }
                        , "6.0": {} //TODO
                        , "Cloud": {
                            header: {
                                menu: ".ics-scbanner", logoutBtn: "#logoutLi"
                            }
                            , blog: {
                                entry: {
                                    blogTitle: "h1 .bidiAware", title: "#entries .lotusTable .lotusFirst .entryContentContainerTD h4", content: "#entries .lotusTable .lotusFirst .entryContentContainerTD .entryContentContainer", actionsMenu: "#lotusContent > .lotusActionBar"
                                }
                                , comment: {
                                    container: ".lotusPostContent.lotusForum", content: "p.blogsWrapText", actionsMenu: ".lotusInlinelist"
                                }
                            }
                            , wiki: {
                                entry: {
                                    title: ".lotusMain .lotusContent .wikiHeader .lotusHeader h1", content: ".lotusMain .lotusContent #pageDetails #wikiContentDiv div", actionsMenu: ".lotusMain .lotusContent .wikiHeader .lotusHeader .lotusBtnContainer"
                                }
                                , comment: {
                                    container: ".lotusPostContent", actionsMenu: ".lotusInlinelist", actionsMenuContainer: ".lotusPostDetails", content: ".lotusPostDetails p"
                                }
                            }
                            , forum: {
                                post: {
                                    container: ".hentry.lotusPost", content: ".entry-content.lotusPostDetails", actionsMenu: ".lotusActions .lotusInlinelist"
                                }
                            }
                            , file: {
                                comment: {
                                    container: ".comment", content: ".textContainer .bidiAware", footer: ".footer"
                                }
                            }
                            , activityStream: {
                                sharebox: {
                                    container: ".streamSharebox", actionsMenu: ".lotusInlinelist.lotusLeft", content: ".lotusMentionsDiv", contentIframe: "[id^='lconn_news_microblogging_sharebox'] iframe", contentWithinContentIframe: "p"
                                }
                                , post: {
                                    footer: ".lotusMeta.lotusChunk"
                                }
                                , comment: {
                                    container: ".lotusCommentItem .lotusPost", content: ".lotusPostDetails .bidiAware", contentIncludingShowMore: ".lotusPostDetails", actionsMenu: ".lotusInlinelist"
                                }
                            }
                            , profile: {
                                background: {
                                    tab: "#backgroundInfo_TabItem", container: "#backgroundInfoSection", content: "#_backgroundInfo_profileDetails_widget_container"
                                }
                            }
                            , community: {
                                description: {
                                    subcontainer: "#descContent", content: ".communityOverview", actionsMenu: ".lotusMeta"
                                }
                            }
                        }
                    };

    com.edifixio.connections.media.js.dom= {
            getSelector:function(selectorKey, icVersion) {
                return Object.at(selectorKey, selectors[icVersion])||Object.at(selectorKey, selectors["default"])
            }
        }

})();

dojo.provide("com.edifixio.connections.media.js.translation");

(function () {

    var config = com.edifixio.connections.media.js.config,
        identify = function (text) {
            var sourceLanguageCode,
                xhrArgs = {
                    url: config.edfxAPI.baseUrl + config.edfxAPI.apiVersion + config.edfxAPI.identify,
                    postData: dojo.toJson({
                        "textToTranslate": text
                        }),
                    headers: {
                        "Content-Type": "application/json",
                        "X-IBM-Client-Id": config.edfxAPI.clientId,
                        "X-IBM-Client-Secret": config.edfxAPI.clientSecret,
                        "Accept": "application/json",
                        "Cache-Control": "no-cache"
                    },
                    sync: true,
                    handleAs: "json",
                    load: function(data){
                        sourceLanguageCode = data.sourceLanguageCode;
                    },
                    error: function(error){
                        console.log("==> EDFX Translator API identify error: "+error);
                    }
                }            
            dojo.xhrPost(xhrArgs);
            return sourceLanguageCode;           
        },
        translate = function (text, origin, target) {
            var translatedText,
                xhrArgs = {
                    url: config.edfxAPI.baseUrl + config.edfxAPI.apiVersion + config.edfxAPI.translate,
                    postData: dojo.toJson({
                        "textToTranslate": text,
                        "sourceLanguageCode": origin,
                        "targetLanguageCode": target
                        }),
                    headers: {
                        "Content-Type": "application/json",
                        "X-IBM-Client-Id": config.edfxAPI.clientId,
                        "X-IBM-Client-Secret": config.edfxAPI.clientSecret,
                        "Accept": "application/json",
                        "Cache-Control": "no-cache"
                    },
                    sync: true,
                    handleAs: "json",
                    load: function(data){
                        translatedText = data.translatedText;
                    },
                    error: function(error){
                        console.log("==> EDFX Translator API translate error: "+error);
                    }
                }            
            dojo.xhrPost(xhrArgs);
            return translatedText;    
        };

    com.edifixio.connections.media.js.translation = {
        start: function (text, fromTo) {
            //fromTo: {src: '',target: ''}
            var srcLang, targetLang;
            
            fromTo && fromTo.src && (srcLang = fromTo.src);
            fromTo && fromTo.target && (targetLang = fromTo.target);
            !srcLang && (srcLang = identify(text));
            //!targetLang && (targetLang = config.defaultTargetLang);

            if(!targetLang) {
                var targetLangCookie = utils.getCookie("edfx-target-lang");
                if(targetLangCookie && config.edfxAPI.languages_target[srcLang].indexOf(targetLangCookie) !== -1) {
                    targetLang = targetLangCookie;
                }else {
                    if(config.edfxAPI.languages_target[srcLang].indexOf(config.defaultTargetLang) !== -1) {
                        targetLang = config.defaultTargetLang
                    }else {
                        targetLang = config.edfxAPI.languages_target[srcLang][0];
                    }
                }
            }

            if (targetLang === srcLang) {
                if (targetLang === config.defaultTargetLang) {
                    var i;
                    for (i = 0; i < config.edfxAPI.languages_src.length && (config.edfxAPI.languages_src[i] === srcLang); i++);
                    targetLang = config.edfxAPI.languages_src[i];
                }else {
                    targetLang = config.defaultTargetLang;
                }
            }

            return translate(text, srcLang, targetLang);
        },
        identifyLang: function (text) {
            return identify(text);
        },
        health: function () {
            var status,
                xhrArgs = {
                    url: config.edfxAPI.baseUrl + config.edfxAPI.health,                    
                    headers: {
                        "X-IBM-Client-Id": config.edfxAPI.clientId,
                        "X-IBM-Client-Secret": config.edfxAPI.clientSecret,
                        "Accept": "application/json",
                        "Cache-Control": "no-cache"
                    },
                    sync: true,
                    handleAs: "json",
                    load: function(data){
                        status = data.status;
                    },
                    error: function(error){
                        console.log("==> EDFX Translator API health error: "+error);
                    }
                }            
            dojo.xhrGet(xhrArgs);
            return status;
        }
    }

})();

dojo.provide("com.edifixio.connections.media.js.design");

var config = com.edifixio.connections.media.js.config,
    local = com.edifixio.connections.media.js.local,
    utils = com.edifixio.connections.media.js.utils,
    translation = com.edifixio.connections.media.js.translation,
    entryContentOriginalHtml;

function populateTargetLangList(elet) {
    var sourceLang = elet.options[elet.selectedIndex].value,
        targetLangCookie = utils.getCookie("edfx-target-lang"),
        targetLangSelect = elet.parentNode.getElementsByClassName("edfx-target-lang")[0],
        langs = config.edfxAPI.languages_target[sourceLang];
    targetLangSelect.options.length = 0;
    for (i = 0; i < langs.length; i++) {
        if (langs[i] !== sourceLang) {
            var opt = document.createElement('option');
            opt.value = langs[i];
            if (langs[i] === targetLangCookie) {
                opt.selected = "true";
            }
            opt.text = local.getString(langs[i]);
            targetLangSelect.options.add(opt);
        }
    }
    callTranslateInline(elet);
};

function populateTargetLangModal(elet) {
    var sourceLang = elet.options[elet.selectedIndex].value,
        targetLangCookie = utils.getCookie("edfx-target-lang"),
        targetLangSelect = document.getElementById("edfx-target-lang-modal"),
        langs = config.edfxAPI.languages_target[sourceLang];
    targetLangSelect.options.length = 0;
    for (i = 0; i < langs.length; i++) {
        if (langs[i] !== sourceLang) {
            var opt = document.createElement('option');
            opt.value = langs[i];
            if (langs[i] === targetLangCookie) {
                opt.selected = "true";
            }
            opt.text = local.getString(langs[i]);
            targetLangSelect.options.add(opt);
        }
    }
    callTranslate();
};

function populateTargetLangEntry(elet) {
    var sourceLang = elet.options[elet.selectedIndex].value,
        targetLangCookie = utils.getCookie("edfx-target-lang"),
        targetLangSelect = elet.parentNode.getElementsByClassName("edfx-target-lang")[0],
        langs = config.edfxAPI.languages_target[sourceLang];//config.edfxAPI.languages_src;//
    targetLangSelect.options.length = 0;
    for (i = 0; i < langs.length; i++) {
        if (langs[i] !== sourceLang) {
            var opt = document.createElement('option');
            opt.value = langs[i];
            if (langs[i] === targetLangCookie) {
                opt.selected = "true";
            }
            opt.text = local.getString(langs[i]);
            targetLangSelect.options.add(opt);
        }
    }
};

function callTranslateEntry(elet, nodeEntryContent) {
        
    var list = elet.parentNode,
        htmlEntryContent = list.getElementsByClassName("edfx-content-entry")[0].innerHTML,
        htmlEntryTitle = list.getElementsByClassName("edfx-title-entry")[0].innerHTML,
        textEntryTitle = utils.stripHtml(htmlEntryTitle),
        textEntryContent = utils.stripHtml(htmlEntryContent),
        sourceLangSelect = list.getElementsByClassName("edfx-src-lang")[0],
        sourceLang = sourceLangSelect.options[sourceLangSelect.selectedIndex].value,
        targetLangSelect = list.getElementsByClassName("edfx-target-lang")[0],
        targetLang = targetLangSelect.options[targetLangSelect.selectedIndex].value,
        translatedText;

    translatedText = translation.start(htmlEntryContent, {
        src: sourceLang,
        target: targetLang
    });

    nodeEntryContent.innerHTML = translatedText;
    nodeEntryContent.classList.add("edfx-entry");
};

function unlockSourceLang(elet) {    
    for (var i = 0; i < elet.parentNode.parentNode.childNodes.length; i++) {
        var child = elet.parentNode.parentNode.childNodes[i];
        if (child.classList) {
            if (child.classList.contains("edfx-src-lang")) {
                child.disabled = !elet.checked;
                elet.checked && populateTargetLangList(child);
                //break;
            }
            if (!elet.checked && child.classList.contains("edfx-target-lang")) {
                var langs = config.edfxAPI.languages_src;
                child.options.length = 0;
                for (i = 0; i < langs.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = langs[i];
                    opt.text = local.getString(langs[i]);
                    child.options.add(opt);
                }
            }
        }
    }
};

function callTranslate() {
    var text = document.getElementById('edfx-src-text').value,
        sourceLangSelect = document.getElementById("edfx-src-lang-modal"),
        sourceLang;
    sourceLangSelect.disabled && (sourceLang = translation.identifyLang(text));
    !sourceLang && (sourceLang = sourceLangSelect.options[sourceLangSelect.selectedIndex].value);
    var targetLangSelect = document.getElementById("edfx-target-lang-modal"),
        targetLang = targetLangSelect.options[targetLangSelect.selectedIndex].value,
        translatedText;
    //Save the target as cookie
    utils.createCookie("edfx-target-lang", targetLang, 5, "d");
    if (config.edfxAPI.languages_src.indexOf(sourceLang) !== -1) {
        translatedText = translation.start(text, {
            src: sourceLang,
            target: targetLang
        });
    }else {
        translatedText = local.getString('error_src_not_available').replace('{edfx}', local.getString(sourceLang));
    }
    document.getElementById('edfx-target-text').value = translatedText;
};

function callTranslateInline(elet) {    
    var list = elet.parentNode,
        text = list.parentNode.getElementsByClassName('edfx-inline-src-text')[0].innerHTML,
        sourceLangSelect = list.getElementsByClassName("edfx-src-lang")[0],
        sourceLang;
    sourceLangSelect.disabled && (sourceLang = translation.identifyLang(text));
    !sourceLang && (sourceLang = sourceLangSelect.options[sourceLangSelect.selectedIndex].value);
    var targetLangSelect = list.getElementsByClassName("edfx-target-lang")[0],
        targetLang = targetLangSelect.options[targetLangSelect.selectedIndex].value,
        translatedText;
    //Save the target as cookie
    utils.createCookie("edfx-target-lang", targetLang, 5, "d");
    if (config.edfxAPI.languages_src.indexOf(sourceLang) !== -1) {
        translatedText = translation.start(text, {
            src: sourceLang,
            target: targetLang
        });
    }else {
        translatedText = local.getString('error_src_not_available').replace('{edfx}', local.getString(sourceLang));
    }
    list.parentNode.getElementsByClassName('edfx-inline-target-text')[0].innerHTML = translatedText;
};

function closeModal() {
    document.getElementById('edfx-header-translation').innerHTML = "";
    document.getElementById('edfx-header-modal').style.display = "none";
};

/*
function callTranslateHtml(nodeEntryTitle, nodeEntryContent, htmlEntryTitle, htmlEntryContent, translateNode, saveTranslateNodeHtml, targetLang) {

    var textEntryTitle = utils.stripHtml(htmlEntryTitle),
        textEntryContent = utils.stripHtml(htmlEntryContent),
        srcLang,
        translatedText;

    //to translate    
    srcLang = translation.identifyLang(textEntryTitle);
    translatedText = translation.start(textEntryTitle, {
        src: srcLang,
        target: targetLang
    });
    nodeEntryTitle.innerHTML = translatedText;

    srcLang = translation.identifyLang(textEntryContent);
    translatedText = translation.start(htmlEntryContent, {
        src: srcLang,
        target: targetLang
    });
    nodeEntryContent.innerHTML = translatedText;
    nodeEntryContent.classList.add("edfx-entry");    
}
*/

(function () {

    com.edifixio.connections.media.js.design = {
        initModal: function (text) {
                        
            var srcLang;
            text && (srcLang = translation.identifyLang(text));
            var langs = config.edfxAPI.languages_src;
            var translationHtml = '<ul class="edfx-modal-lang">' +
                '<li>' +
                '<select id="edfx-src-lang-modal" class="edfx-src-lang edfx-select" onchange="populateTargetLangModal(this)"';
            if (!text) {
                translationHtml += ' disabled';
            }
            translationHtml += '>';
            //populate source select
            for (i = 0; i < langs.length; i++) {
                translationHtml += '<option value="' + langs[i] + '"';
                if (srcLang && langs[i] === srcLang) {
                    translationHtml += ' selected';
                }
                translationHtml += ' >' + local.getString(langs[i]) + '</option>';
            }
            translationHtml += '</select>' +
                                '<textarea id="edfx-src-text" disabled class="edfx-modal-textarea" rows="6"';
            if(text) {
                translationHtml += ' >'+text;
            }else {
                translationHtml += ' placeholder="'+local.getString('help')+'" >';
            }
            translationHtml += '</textarea>' +
                '</li>' +
                '<li>' +
                '<select id="edfx-target-lang-modal" class="edfx-target-lang edfx-select" onchange="callTranslate()"';
            if (!text) {
                translationHtml += ' disabled';
            }
            translationHtml += '>';
            //populate target select
            var langs_target, targetLangCookie;
            srcLang && (langs_target = config.edfxAPI.languages_target[srcLang]);
            !srcLang && (langs_target = config.edfxAPI.languages_src);
            targetLangCookie = utils.getCookie("edfx-target-lang");
            !targetLangCookie && (targetLangCookie = config.defaultTargetLang);
            for (i = 0; i < langs_target.length; i++) {                
                translationHtml += '<option value="' + langs_target[i] + '" ';
                if(langs_target[i] === targetLangCookie){
                    translationHtml += 'selected';
                }
                translationHtml += ' >' + local.getString(langs_target[i]) + '</option>';
            }
            translationHtml += '</select>' +
                               '<textarea id="edfx-target-text" disabled class="edfx-modal-textarea" rows="6">';
            if (srcLang && langs.indexOf(srcLang) !== -1) {                
                translationHtml += translation.start(text);
            }else {
                if(srcLang) {
                    translationHtml += local.getString('error_src_not_available').replace('{edfx}', local.getString(srcLang));
                }else {
                    translationHtml += local.getString('help_translated');
                }                
            }
            translationHtml += '</textarea>' +
                '</li>' +
                '</ul>';

            document.getElementById('edfx-header-translation').innerHTML = translationHtml;
            var modal = document.getElementById('edfx-header-modal');
            modal.style.display = "block";
        },
        initInline: function (text, nodePlace, position, translateNode) {
            
            var saveTranslateNodeHtml = translateNode.innerHTML;
            //loader
            translateNode.innerHTML = '<div class="edfx-loader"></div>';

            setTimeout(function(){
                dojo.destroy(dojo.query(".edfx-inline-translator", nodePlace.parentNode)[0]);
                var srcLang = translation.identifyLang(text),
                    langs = config.edfxAPI.languages_src;
                

                var translationHtml = 
                '<div class="edfx-inline-translator edfx-container" onclick="event.stopPropagation();">' +
                    '<img class="edfx-logo" src="/files/customizer/files/com.edifixio.connections/media/img/edfx_logo.png?repoName=edfx-repo"/>'+
                    '<div class="edfx-inline-lang">' +
                    '<select class="edfx-src-lang edfx-select" onchange="populateTargetLangList(this)">';
                //populate source select
                for (i = 0; i < langs.length; i++) {
                    translationHtml += '<option value="' + langs[i] + '"';
                    if (langs[i] == srcLang) {
                        translationHtml += ' selected';
                    }
                    translationHtml += ' >' + local.getString(langs[i]) + '</option>';
                }
                translationHtml += '</select>' +
                    '<select class="edfx-target-lang edfx-select edfx-margin-left-10" onchange="callTranslateInline(this)">';
                //populate target select
                var langs_target, targetLangCookie;
                targetLangCookie = utils.getCookie("edfx-target-lang");
                !targetLangCookie && (targetLangCookie = config.defaultTargetLang);
                srcLang && (config.edfxAPI.languages_src.indexOf(srcLang) !== -1) && (langs_target = config.edfxAPI.languages_target[srcLang]);
                (!srcLang || (config.edfxAPI.languages_src.indexOf(srcLang) == -1)) && (langs_target = config.edfxAPI.languages_src);
                for (i = 0; i < langs_target.length; i++) {
                    translationHtml += '<option value="' + langs_target[i] + '" ';
                    if(langs_target[i] === targetLangCookie){
                        translationHtml += 'selected';
                    }
                    translationHtml += '>' + local.getString(langs_target[i]) + '</option>';
                }
                translationHtml += '</select>' +
                    '<span class="edfx-close">&times;</span>' +
                    '</div>';
                //add source and target text
                translationHtml += '<div class="edfx-inline-text">' +
                    '<div disabled class="edfx-inline-src-text edfx-diplay-none" >' + text + '</div>' +
                    '<div disabled class="edfx-inline-target-text" >';
                if (langs.indexOf(srcLang) !== -1) {
                    translationHtml += translation.start(text);                    
                }else {
                    translationHtml += local.getString('error_src_not_available').replace('{edfx}', local.getString(srcLang));
                }    
                translationHtml += '</div>' +
                                    '</div>' +
                                    '</div>';
                                    
                dojo.place(translationHtml, nodePlace, position);
                dojo.query(".edfx-inline-src-text", nodePlace).innerHTML = text;
                utils.hide(translateNode);
                
                dojo.connect(dojo.query(".edfx-close", nodePlace.parentNode)[0], "onclick", function () {
                    this.parentNode.parentNode.style.display = "none";
                    translateNode.innerHTML = saveTranslateNodeHtml;
                    utils.show(translateNode);
                });
            },1);

        },
        initEntry: function (nodeEntryTitle, nodeEntryContent, translateNode) {

            entryContentOriginalHtml = nodeEntryContent.innerHTML;
        
            var textEntryContent = utils.stripHtml(entryContentOriginalHtml),
                srcLang = translation.identifyLang(textEntryContent),
                langs = config.edfxAPI.languages_src;

            var translationHtml = 
            '<div class="edfx-inline-translator edfx-container" onclick="event.stopPropagation();" style="text-align:left; padding:5px 10px; border-radius:0px; box-shadow:none;">' +
                '<div class="edfx-inline-lang">' +
                    '<select class="edfx-src-lang edfx-select">';
            //populate source select
            for (i = 0; i < langs.length; i++) {
                translationHtml += '<option value="' + langs[i] + '"';
                if (langs[i] == srcLang) {
                    translationHtml += ' selected';
                }
                translationHtml += ' >' + local.getString(langs[i]) + '</option>';
            }
            translationHtml += '</select>' +
                    '<select class="edfx-target-lang edfx-select edfx-margin-left-10" >';
            //populate target select
            var langs_target, targetLangCookie;
            targetLangCookie = utils.getCookie("edfx-target-lang");
            !targetLangCookie && (targetLangCookie = config.defaultTargetLang);
            srcLang && (config.edfxAPI.languages_src.indexOf(srcLang) !== -1) && (langs_target = config.edfxAPI.languages_target[srcLang]);
            (!srcLang || (config.edfxAPI.languages_src.indexOf(srcLang) == -1)) && (langs_target = config.edfxAPI.languages_src);
            for (i = 0; i < langs_target.length; i++) {
                translationHtml += '<option value="' + langs_target[i] + '" ';
                if(langs_target[i] === targetLangCookie){
                    translationHtml += 'selected';
                }
                translationHtml += '>' + local.getString(langs_target[i]) + '</option>';
            }
            translationHtml += '</select>' +
                            '<div class="edfx-content-entry edfx-diplay-none">'+nodeEntryContent.innerHTML+'</div>' +
                            '<div class="edfx-title-entry edfx-diplay-none">'+nodeEntryTitle.innerHTML+'</div>' +
                            '</div>' +
                        '</div>';            

            translateNode.innerHTML = translationHtml;

            var initialEntryTitleHtml = nodeEntryTitle.innerHTML,
                initialEntryContentHtml = nodeEntryContent.innerHTML;

            var saveTranslateNodeHtml = translateNode.innerHTML;

            var targetLangSelect = translateNode.getElementsByClassName("edfx-target-lang")[0],
                targetLang = targetLangSelect.options[targetLangSelect.selectedIndex].value;

            //callTranslateHtml(nodeEntryTitle, nodeEntryContent, initialEntryTitleHtml, initialEntryContentHtml, translateNode, saveTranslateNodeHtml, targetLang);

            callTranslateEntry(dojo.query(".edfx-target-lang", translateNode)[0], nodeEntryContent);

            dojo.connect(dojo.query(".edfx-target-lang", translateNode)[0], "onchange", function () {           
                //get target lang
                var targetLangSelect = translateNode.getElementsByClassName("edfx-target-lang")[0],
                    targetLang = targetLangSelect.options[targetLangSelect.selectedIndex].value;
                //Save the target as cookie
                utils.createCookie("edfx-target-lang", targetLang, 5, "d");
                //loader
                //translateNode.innerHTML = '<div class="edfx-loader"></div>';
                //translate
                setTimeout(function() {
                    callTranslateEntry(dojo.query(".edfx-target-lang", translateNode)[0], nodeEntryContent);
                }, 1);
            });

            dojo.connect(dojo.query(".edfx-src-lang", translateNode)[0], "onchange", function () {
                populateTargetLangEntry(dojo.query(".edfx-src-lang", translateNode)[0]);
                callTranslateEntry(dojo.query(".edfx-src-lang", translateNode)[0], nodeEntryContent);
            });

        }
    }
})();

dojo.provide("com.edifixio.connections.textTranslator.header");

(function() {

  var dom = com.edifixio.connections.media.js.dom,
      config = com.edifixio.connections.media.js.config,
      local = com.edifixio.connections.media.js.local,
      translation = com.edifixio.connections.media.js.translation,
      design = com.edifixio.connections.media.js.design,
      icMenu = dom.getSelector("header.menu", config.icVersion),
      icLogout = dom.getSelector("header.logoutBtn", config.icVersion),

      selectedText = function(c, a) {
        var d = null;
        c.getSelection && "" != c.getSelection().toString() ? d = c.getSelection().toString() : a.getSelection && "" != a.getSelection().toString() ? d = a.getSelection().toString() : a.selection && a.selection.createRange && "" != a.selection.createRange().text && (d = a.selection.createRange().text);
        return d
      }

  dojo.ready(function() {
    
    //add edfx translator css to the head
    dojo.create("link", {
      href: "/files/customizer/files/com.edifixio.connections/media/css/edfx-translator.css?repoName=edfx-repo",
      type: "text/css",
      rel: "stylesheet"
    }, document.getElementsByTagName("head")[0]);

    //add header translate modal
    var modalHtml = '<div id="edfx-header-modal" class="edfx-container edfx-modal edfx-black-theme">'+
                      '<div class="edfx-modal-content">'+
                        '<div class= "edfx-modal-title">'+
                          '<img class="edfx-logo" src="/files/customizer/files/com.edifixio.connections/media/img/edfx_logo.png?repoName=edfx-repo"/>'+
                          '<span class="edfx-title">'+local.getString('plugin_name')+'</span>'+                          
                          '<span class="edfx-close" onclick="closeModal()">&times;</span>'+
                        '</div>'+
                        '<div id="edfx-header-translation" class="edfx-modal-translation">'+
                        '</div>'+
                      '</div>'+
                    '</div>',
        translatorModal = dojo.place(modalHtml, dojo.body(), 'first'),
    //add header translate button
        btnHtml = '<a id="edfx-header-btn" class="lotusBannerBtn" href="javascript:;">'+local.getString('translate')+'</a>',
        translateBtn = dojo.create('div', {innerHTML: btnHtml}, dojo.query(icMenu)[0], 'first');

    dojo.connect(translateBtn, "onclick", function() {
      design.initModal(selectedText(window, document));
    });
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == translatorModal) {
        document.getElementById('edfx-header-translation').innerHTML = "";
        translatorModal.style.display = "none";
      }
    }
    
  });

})();