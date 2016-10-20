/*
CRS-10368 | Author(s): 206394, 904360, 909403, 909490 | Project Owner: 205932 ~dj.paris
5 Aug 2016: Updated to include both EDU propensity and B2B Corp
16 Aug 2016: HTTPS Everywhere compliance
*/
(function () {
    "use strict";

    var $,
        utils = {
            setCookie: function (name, value, expires, path, domain, secure) {
                var expiresDate;

                if (expires && (expires < 1000)) {
                    expiresDate = new Date();
                    expiresDate.setTime(expiresDate.getTime() + expires * 24 * 60 * 60 * 1000);
                }

                return document.cookie = name + "=" + encodeURIComponent(value) +
                    ((path) ? ";path=" + path : ";path=/") +
                    ((expires) ? ";expires=" + expiresDate.toUTCString() : "") +
                    ((domain) ? ";domain=" + domain : ";domain=.nytimes.com") +
                    ((secure) ? ";secure" : "");
            },
            getParameterByName: function (name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        };

    // -----------------------------------------
    // ------      Select NYT4/NYT5       ------

    function isNyt5() {
        var nyt5meta = document.getElementsByName('sourceApp');
        var nytApps = {
            'nyt-v5': true,
            'blogs': true
        };
        return (typeof nyt5meta[0] !== "undefined") && (nyt5meta[0].getAttribute('content') in nytApps);
    }


    function run() {
        checkUser(function (EDUsegments, CORPsegments) {
            var isEduUser = false;
            var isCorpUser = false;
            var orgName = CORPsegments.org_name;
            var orgType = CORPsegments.type;
            var nickName = EDUsegments.nick_name;
            
            if (EDUsegments.edu) {
                isEduUser = EDUsegments.edu === "yes";
            }
            if (isEduUser && typeof nickName !== "undefined") {
                utils.setCookie("propensityEDU", nickName, 30);
                utils.setCookie("isEDU", "true", 30);
            } else if (isEduUser) {
                utils.setCookie("propensityEDU", "true", 30);
                utils.setCookie("isEDU", "true", 30);
            }
            if (CORPsegments.corp) {
                isCorpUser = CORPsegments.corp === "yes";
            } 
            if (isCorpUser && orgType === "CORP_ADBLOCK") {
                utils.setCookie("B2B_CORP_ADBLOCK", "true", 30);
                utils.setCookie("B2B", orgName, 30);
            } else if (isCorpUser && typeof orgName !== "undefined") {
                utils.setCookie("B2B", orgName, 30);
            } else if (isCorpUser) {
                utils.setCookie("B2B", "true", 30);
            }
        });
    }

    function checkUser(onCheckReady, callbackAlias) {
        var isCallbackDone = false;

        var newCallback = function (data) {
            var dataIsObject = (typeof data === 'object'); // true or false
            var dataStatus = (data && data.status && (data.status.toUpperCase() === 'OK')); // true, false or undefined
            var EDUsegments;
            var CORPsegments;
            isCallbackDone = true;
            if (dataIsObject && dataStatus) {
                // getting items in according with API response data structure
                EDUsegments = data.payload.segments[0].e;
                CORPsegments = data.payload.segments[0].c;
                onCheckReady(EDUsegments, CORPsegments);
            }
        };

        var testIp = utils.getParameterByName("test_ip");
        var testIpQueryStr = "";

        if (testIp) {
            testIpQueryStr = "test_ip=" + testIp + "&";
        }
		var envUrl;
		if (window.location.hostname.match(/stg\.nytimes\.com$/gi)) {
			envUrl = "http://10.50.161.66/r1/jp/ip_seg_v2_test.rep?" + testIpQueryStr + "jsoncallback=?";
		}
		else {
			envUrl = "//cigawsloadbalancer-17715275.us-east-1.elb.amazonaws.com/r1/jp/ip_seg_v2.rep?" + testIpQueryStr + "jsoncallback=?";
        }
        var ajaxParams = {
            url: envUrl,
            data: null,
            cache: true,
            dataType: "jsonp"
        };

        if (callbackAlias) {
            if (callbackAlias === 'default') {
                callbackAlias = 'jsonFeedCallback';
            }
            window[callbackAlias] = newCallback;
            ajaxParams.jsonpCallback = callbackAlias;
        } else {
            ajaxParams.success = newCallback;
        }

        $.ajax(ajaxParams); // NOTE: shared instance
    }

    if (isNyt5()) {
        require(['foundation/main', 'jquery/nyt'], function (main, jQuery) {
            $ = jQuery;
            run();
        });
    } else {
        $ = window.NYTD && window.NYTD.jQuery || window.jQuery;
        run();
    }
})();