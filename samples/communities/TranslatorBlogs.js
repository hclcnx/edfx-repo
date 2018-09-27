setTimeout(function(){

dojo.provide("com.edifixio.connections.textTranslator.blog.entry");

(function () {
    var dom = com.edifixio.connections.media.js.dom,
        local = com.edifixio.connections.media.js.local,
        design = com.edifixio.connections.media.js.design,
        utils = com.edifixio.connections.media.js.utils,
        config = com.edifixio.connections.media.js.config;
    dojo.addOnLoad(function () {
        var blogTitle = dom.getSelector("blog.entry.blogTitle", config.icVersion),
            entryTitle = dom.getSelector("blog.entry.title", config.icVersion),
            entryContent = dom.getSelector("blog.entry.content", config.icVersion),
            entryActionsMenu = dom.getSelector("blog.entry.actionsMenu", config.icVersion);
        if (0 <= window.location.pathname.indexOf("/blogs/")) {
            var translateLink = '<a role="button" id="edfx-translate-blog" href="javascript:;">' + local.getString("translate") + "</a>",
                translateNode = dojo.create("span", {
                    innerHTML: translateLink,
                    className: "lotusBtn lotusLeft"
                }, dojo.query(entryActionsMenu)[0]);
            
            dojo.connect(translateNode, "onclick", function (a) {

                var nodeEntryContent = dojo.query(entryContent)[0],
                    nodeEntryTitle = dojo.query(entryTitle)[0],
                    nodeBlogTitle = dojo.query(blogTitle)[0],
                    entryContentOriginalHtml = nodeEntryContent.innerHTML;

                //create initial text node
                var initialLink = '<a role="button" id="edfx-initial-blog" href="javascript:;">' + local.getString("initial_text") + "</a>",
                    initialNode = dojo.create("span", {
                        innerHTML: initialLink,
                        className: "lotusBtn lotusLeft"
                    }, dojo.query(entryActionsMenu)[0]);

                dojo.connect(initialNode, "onclick", function (a) {
                    dojo.query(entryContent)[0].classList.remove("edfx-entry");
                    dojo.query(entryContent)[0].innerHTML = entryContentOriginalHtml;
                    translateNode.innerHTML = translateLink;
                    initialNode.remove();
                })

                //init translation
                design.initEntry(nodeEntryTitle, nodeEntryContent, translateNode);
            })
        }
    })
})();

}, 2500);