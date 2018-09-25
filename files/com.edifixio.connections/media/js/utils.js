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
