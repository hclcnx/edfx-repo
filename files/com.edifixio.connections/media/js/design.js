dojo.provide("com.edifixio.connections.media.js.design");

dojo.require("com.edifixio.connections.media.js.config");
dojo.require("com.edifixio.connections.media.js.local");
dojo.require("com.edifixio.connections.media.js.translation");
dojo.require("com.edifixio.connections.media.js.utils");

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
                    '<img class="edfx-logo" src="/files/com.edifixio.connections/media/img/edfx_logo.png"/>'+
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