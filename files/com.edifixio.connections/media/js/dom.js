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
                        , "6.0": {} //TODO
                    };

    com.edifixio.connections.media.js.dom= {
            getSelector:function(selectorKey, icVersion) {
                return Object.at(selectorKey, selectors[icVersion])||Object.at(selectorKey, selectors["default"])
            }
        }

})();