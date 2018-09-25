dojo.provide("com.edifixio.connections.media.js.translation");

dojo.require("com.edifixio.connections.media.js.config");
dojo.require("com.edifixio.connections.media.js.utils");

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
