var newScript = document.createElement("script");
newScript.type = "text/javascript";
newScript.src = "http://res.wx.qq.com/open/js/jweixin-1.2.0.js";

var head = document.getElementsByTagName("head")[0];
head.appendChild(newScript);

/**************************** 动作类 ****************************/
// 返回上一层
function back() {
    history.back(-1)
}
//跳转页面
function goTo(url, param) {
    if (!param) {
        url = url;
    } else {
        url = url + "?" + param;
    }
    window.location.href = url;
}
//上传图片
function uploadImg(input) {
    var imgObj = $(input).siblings('img');
    //是否支持
    if (typeof FileReader === 'undefined') {
        alert("抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！");
        input.setAttribute('disabled', 'disabled');
    }
    if (input.files && input.files[0]) {
        var file = input.files[0],
            reader = new FileReader();
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
            alert('不是有效的图片文件！');
            return;
        }
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var result = 　this.result; //获取到base64的图片

            var img = new Image();

            img.src = result;

            $(".UpImage").prepend(img)

        }
    }
}

/******************************* 判断类 **************************/
// 验证手机
function isPhone(phone) {
    if ((/^1[3|4|5|8][0-9]\d{8}$/.test(phone))) {
        return true
    } else {
        return false;
    }
}
// 验证身份证
function isIdNum(ID) {
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(ID)) {
        return false;
    } else {
        return true
    }
}
// 验证车牌号
function isCarNum(num) {
    if (vehicleNumber.length == 7) {
        var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        if (express.test(vehicleNumber)) {
            return false;
        } else {
            return true
        }
    } else {
        return false
    }
}
// 判断是否为空
function isNull(value) {
    if ($.trim(value).length) {
        return false;
    } else {
        return true;
    }
}
// 判断是否为数字
function isNum(num) {
    if (isNaN(num)) {
        return true;
    } else {
        return false;
    }
}
// 判断邮箱是否正确
function isEmail(email) {
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var isok = reg.test(email);
    if (isok) {
        return true;
    } else {
        return false;
    }
}

/***************************** 转换类 *******************************/
/**
 * @param now 时间
 * @param ff 格式 Y-m-d H:i:s / Y-m-d / Y-m-d H:i
 */
// 日期格式化
function formatDate(now, ff) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    var minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    var second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    if (ff == 'Y-m-d') {
        return year + "-" + month + "-" + date;
    } else if (ff == 'Y-m-d H:i:s') {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    } else if (ff == 'Y-m-d H:i') {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
}
// 转换时间
function format(time, ff) {
    if (time.length == 10) time = time * 1000;
    var d = new Date(time);
    return formatDate(d, ff);
}
// 转时间戳
function turnTimestamp(timestamp, ff) {
    var time = new Date();
    time.setTime(timestamp);
    return format(time, ff);
}
/**
 * 和PHP一样的时间戳格式化函数
 * @param  {string} format    格式  Y-m-d H:i:s
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 */
function dateChange(format, timestamp) {
    var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
    var pad = function(n, c) {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var txt_ordin = { 1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st" };
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var f = {
        // Day
        d: function() { return pad(f.j(), 2) },
        D: function() { return f.l().substr(0, 3) },
        j: function() { return jsdate.getDate() },
        l: function() { return txt_weekdays[f.w()] },
        N: function() { return f.w() + 1 },
        S: function() { return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th' },
        w: function() { return jsdate.getDay() },
        z: function() { return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0 },

        // Week
        W: function() {
            var a = f.z(),
                b = 364 + f.L() - a;
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
                return 1;
            } else {
                if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime() / 1000));
                } else {
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                }
            }
        },

        // Month
        F: function() { return txt_months[f.n()] },
        m: function() { return pad(f.n(), 2) },
        M: function() { return f.F().substr(0, 3) },
        n: function() { return jsdate.getMonth() + 1 },
        t: function() {
            var n;
            if ((n = jsdate.getMonth() + 1) == 2) {
                return 28 + f.L();
            } else {
                if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                    return 31;
                } else {
                    return 30;
                }
            }
        },

        // Year
        L: function() { var y = f.Y(); return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0 },
        //o not supported yet
        Y: function() { return jsdate.getFullYear() },
        y: function() { return (jsdate.getFullYear() + "").slice(2) },

        // Time
        a: function() { return jsdate.getHours() > 11 ? "pm" : "am" },
        A: function() { return f.a().toUpperCase() },
        B: function() {
            // peter paul koch:
            var off = (jsdate.getTimezoneOffset() + 60) * 60;
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
            var beat = Math.floor(theSeconds / 86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00" + beat;
            if ((String(beat)).length == 2) beat = "0" + beat;
            return beat;
        },
        g: function() { return jsdate.getHours() % 12 || 12 },
        G: function() { return jsdate.getHours() },
        h: function() { return pad(f.g(), 2) },
        H: function() { return pad(jsdate.getHours(), 2) },
        i: function() { return pad(jsdate.getMinutes(), 2) },
        s: function() { return pad(jsdate.getSeconds(), 2) },
        //u not supported yet

        // Timezone
        //e not supported yet
        //I not supported yet
        O: function() {
            var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
            else t = "+" + t;
            return t;
        },
        P: function() { var O = f.O(); return (O.substr(0, 3) + ":" + O.substr(3, 2)) },
        //T not supported yet
        //Z not supported yet

        // Full Date/Time
        c: function() { return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P() },
        //r not supported yet
        U: function() { return Math.round(jsdate.getTime() / 1000) }
    };

    return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {
        if (t != s) {
            // escaped
            ret = s;
        } else if (f[s]) {
            // a date function exists
            ret = f[s]();
        } else {
            // nothing special
            ret = s;
        }
        return ret;
    });
}

/****************************** 缓存类 ******************************/
// 设置本地缓存
function setItem(key, val) {
    return window.localStorage.setItem(key, val)
}
// 获取本地缓存
function getItem(key) {
    return window.localStorage.getItem(key);
}
// 删除本地缓存
function moveItem(key) {
    localStorage.removeItem(key);
}
/**
 * @param name cookie名称
 * @param value cookie值
 * @param iDay cookie的时间
 */
// 设置cookie
function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
}
// 获取cookie
function getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return '';
}
// 删除cookie
function removeCookie(name) {
    setCookie(name, 1, -1);
}

/****************************** 获取url参数 *********************/
function getParam() {
    var url = location.search; //获取url中"?"符后的字串  
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/******************************* Ajax ***************************/
/**
 * @param Param 参数
 * @param callback 成功回调
 * @param error 失败回调
 */
// 请求ajax
function ajaxPost(Param, url, callback, async) {
    $.ajax({
        type: "POST",
        url: "http://xinfengji.app.xiaozhuschool.com/" + url, // ajax请求路径
        dataType: "JSON",
        data: Param,
        async: async == false ? false : true,
        success: function (data) {
            callback(data);
        },
        error: function (errorThrown) {
            // dlctipbox.show("数据处理出错，请及时联系开发人员");
        }
    })
}

function ajaxPost1(Param, url, callback, async) {
    $.ajax({
        type: "POST",
        url: "http://39.105.4.244/" + url, // ajax请求路径
        dataType: "JSON",
        data: Param,
        async: async == false ? false : true,
        success: function (data) {
            callback(data);
        },
        error: function (errorThrown) {
            // dlctipbox.show("数据处理出错，请及时联系开发人员");
        }
    })
}

/***************************** 随机验证码 *************************/
function createCode() {
    var code = '';
    var codeLength = 4;
    //设置随机字符
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //循环codeLength 我设置的4就是循环4次
    for (var i = 0; i < codeLength; i++) {
        //设置随机数范围,这设置为0 ~ 36
        var index = Math.floor(Math.random() * 36);
        //字符串拼接 将每次随机的字符 进行拼接
        code += random[index];
    }
    return code;
}

/******************************* 判断支付环境 ***********************/
function isWX_Allipay() {
    if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
        return 'WX';
    } else if (window.navigator.userAgent.toLowerCase().match(/AlipayClient/i) == 'alipayclient') {
        return 'Allipay';
    } else {
        return 'Others';
    }
}

/******************************* 微信JS-sdk ***********************/
function wx_js(signature, timestamp, nonceStr) {
    var e = decodeURIComponent('jsapi_ticket=' + signature + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + location.href.split("#")[0]),
        s = new jsSHA(e, "TEXT"),
        signature = s.getHash("SHA-1", "HEX");
    return signature; // 返回微信签名算法
}
/******************************* 微信JS-sdk ***********************/

// 公共方法
function Scan() {
    showModal("#Scan");
}

function ScanCode() {
    getWx();
    $.showLoading();
    wx.ready(function(){
        $.hideLoading();
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                // alert(JSON.stringify(res));
                location.href = "../html/o_pay.html?type=1&macno="+res.resultStr;
            },
            error:function(err){
                dlctipbox.show(err);
            }
        });
    })
}

function Booking() {
    goTo("../html/o_booking.html");
}

function Return() {
    goTo("../html/o_returnList.html");
}

function InputCode() {
    goTo("../html/o_deviceCode.html");
}

function RecommendCode() {
    goTo("../html/o_recommendCode.html");
}

/**
 * 修改o_indexDevice.html页面滑块高度
 **/
// $("li").width($(window).width());
// var mixHeight = $(".mix1").height();
// $(".contentBox").height(mixHeight);
// $(".contentBox ul").height(mixHeight);
// $(".contentBox ul li").height(mixHeight);

$(".mask").on("click", function () {
    $(this).fadeOut();
    $(".maskBox").hide();
});

function getWx() {
    ajaxPost({
        "api_name": "getTicket"
    }, 'app/public/api', function (res) {
        if (res.code == 1) {
            var timestamp = (new Date().getTime() / 1000).toFixed(0);
            var nonceStr = Math.random().toString(36).substr(2);
            var ticket = wx_js(res.data.ticket, timestamp, nonceStr);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端//alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: "wx3f92587de79b0592", // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: ticket, // 必填，签名，见附录1
                jsApiList: ['checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        } else {
            dlctipbox.show(res.msg);
        }
    })
}