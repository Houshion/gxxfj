var h = [];
var m = [];
var t = [];
time(24, h);
time(60, m);
time1(240, t);

function time(num, a) {
    for (var i = 0; i < num; i++) {
        i < 10 ? i = "0" + i : i
        a.push(i);
    }
}
function time1(num ,a){
    for (var i = 1; i <= num; i++) {
        i < 10 ? i = "0" + i : i
        a.push(i);
        
    }
}
$(function () {
    $("#start1").picker({
        title: "请选择时间",
        cols: [{
                textAlign: 'center',
                values: h
            },
            {
                textAlign: 'center',
                values: ":"
            },
            {
                textAlign: 'center',
                values: m
            }
        ]
    });
    $("#end1").picker({
        title: "请选择时间",
        cols: [{
            textAlign: 'center',
            values: h
        }, ]
    });
    $("#start2").picker({
        title: "请选择时间",
        cols: [{
                textAlign: 'center',
                values: h
            },
            {
                textAlign: 'center',
                values: ":"
            },
            {
                textAlign: 'center',
                values: m
            }
        ]
    });
    $("#end2").picker({
        title: "请选择时间",
        cols: [{
            textAlign: 'center',
            values: h
        }, ]
    });
    $("#start3").picker({
        title: "请选择时间",
        cols: [{
                textAlign: 'center',
                values: h
            },
            {
                textAlign: 'center',
                values: ":"
            },
            {
                textAlign: 'center',
                values: m
            }
        ]
    });
    $("#end3").picker({
        title: "请选择时间",
        cols: [{
            textAlign: 'center',
            values: h
        }, ]
    });
});