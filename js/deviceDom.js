$.showLoading();
ajaxPost({
  api_name: "home",
  token: getItem("token"),
  page: 1,
  pagesize: 999
}, "app/FanMac/api", function (res) {
  if (res.code == 1) {
    if (res.type == 1) {
      console.log('我的设备数据', res);
      var deviceStr = '';
      for (var i = 0; i < res.data.length; i++) {
        // if(i == 0){
        //   continue;
        // }
        deviceStr += '<div class="swiper-slide" data-macno="' + res.data[i].device_number + '" data-type="' + res.data[i].type + '" data-device_id="' + res.data[i].id + '" data-device_name="' + res.data[i].device_name + '" data-device_type="' + res.data[i].type + '"></div>';
      }
      $('.swiper-wrapper').html(deviceStr);
      $.hideLoading();
    } else {
      goTo("./o_index.html");
    }
  } else {
    dlctipbox.show(res.msg ? res.msg : '请求异常，请刷新或联系客服');
  }
}, false);

var macno, index, device_id, device_name, api_name, sign, device_type;
macno = String($('.swiper-slide').eq(0).data('macno'));
device_id = $('.swiper-slide').eq(0).data('device_id');
device_name = $('.swiper-slide').eq(0).data('device_name');
device_type = $('.swiper-slide').eq(0).data('device_type');
index = 0;
api_name = 'set_device';
sign = 'xinfengji';

function loadDeviceinfo(index, device_type, macno, device_name) {
  $("title").text(macno);
  ajaxPost1({
    api_name: "getruninfo",
    token: getItem("token"),
    macno: macno,
    sign: 'xinfengji'
  }, "Xinfengji/api", function (res) {
    console.log('设备详情数据', res);
    // alert(JSON.stringify(res))
    var data = res.data;
    var per_deviceStr = '';
    // if (res.code == 1) {
    // device_type = 2;
    if (device_type == 1) {

      if (res.code != 1) {
        data = {
          status1: 0,
          status2: 0,
          status3: 0,
          pm: 0,
          voc: 0,
          co2: 0,
          intemper: 0,
          outtemper: 0,
          inhumidity: 0,
          outhumidity: 0,
          macno: macno,
          time: 0,
          mtype: 1,
          online: 0,
          inwind: 0,
          outwind: 0,
        }
      }

      $('#sliderTrack1').css('width', data.inwind + '%');
      $('#sliderHandler1').css('left', data.inwind + '%');
      $('#inwindValue').text(data.inwind);
      $('#sliderTrack2').css('width', data.outwind + '%');
      $('#sliderHandler2').css('left', data.outwind + '%');
      $('#outwindValue').text(data.outwind);

      per_deviceStr =
        '<div class="mix h100">' +
        '<div class="top h45">' +
        '<div class="flex flexWrap">' +
        '<div class="bimg box colfff pm25">' +
        "<div>" +
        "<div>PM2.5</div>" +
        '<div class="ta-center font24 fontb">' + data.pm + '</div>' +
        "<div>μg/m³</div>" +
        "</div>" +
        "</div>" +
        '<div class="bimg box colfff voc">' +
        "<div>" +
        "<div>VOC</div>" +
        '<div class="ta-center font24 fontb">' + (data.voc == 0 ? '优' : data.voc == 1 ? '良' : data.voc == 2 ? '良' : '差') + '</div>' +
        "<div>PPM</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="flex flexEnd ta-center">' +
        '<div class="wd">' +
        '<div class="box">' +
        '<img src="../img/o_wendu.png" class="wd-30">' +
        "<span>温度</span>" +
        "</div>" +
        '<div class="ta-center col666">室内/<span class="colwd">' + data.intemper + '℃</span></div>' +
        '<div class="ta-center col666">室外/<span class="colwd">' + data.outtemper + '℃</span></div>' +
        "</div>" +
        '<div class="bimg box colfff co2">' +
        "<div>" +
        "<div>CO²</div>" +
        '<div class="ta-center font24 fontb">' + data.co2 + '</div>' +
        "<div>PPM</div>" +
        "</div>" +
        "</div>" +
        '<div class="sd">' +
        '<div class="box">' +
        '<img src="../img/o_shidu.png" class="wd-30">' +
        "<span>湿度</span>" +
        "</div>" +
        '<div class="ta-center col666">室内/<span class="colsd">' + data.inhumidity + '</span></div>' +
        '<div class="ta-center col666">室外/<span class="colsd">' + data.outhumidity + '</span></div>' +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="middle h20">' + (data.swit == 0 ? '<div class="ta-center col666 mg-10">设备未开启！</div><div class="btnNoBorder wd-70 mg-auto switch swit" data-status="false" onclick="clickBtn(this)">开启设备</div>' : '<div class="ta-center col666 mg-10">设备已开启！</div><div class="btnNoBorder wd-70 mg-auto switch swit pick" data-status="true" onclick="clickBtn(this)">关闭设备</div>') +
        "</div>" +
        '<div class="bottom h30 flex flexWrap border-t colc2 pd-b-10 pd-t-10">' +
        ((data.status1 == 1 && data.swit != 0) ? '<div class="wd-25 ta-center servType pick" data-type="0" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbzd_p.png" class="wd-40 pickImg" data-pic="../img/o_sbzd.png"><div>自动</div></div>' : '<div class="wd-25 ta-center servType" data-type="0" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbzd.png" class="wd-40" data-pic="../img/o_sbzd_p.png"><div>自动</div></div>') +
        ((data.status1 == 2 && data.swit == 1) ? '<div class="wd-25 ta-center servType pick" data-type="1" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbnxh_p.png" class="wd-40 pickImg" data-pic="../img/o_sbnxh.png"><div>内循环</div></div>' : '<div class="wd-25 ta-center servType" data-type="1" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbnxh.png" class="wd-40" data-pic="../img/o_sbnxh_p.png"><div>内循环</div></div>') +
        ((data.status1 == 3 && data.swit == 1) ? '<div class="wd-25 ta-center hand pick speed" data-type="2" onclick="clickBtn(this)"><img src="../img/o_sbsd_p.png" class="wd-40" data-pic="../img/o_sbsd.png"><div>手动</div></div>' : '<div class="wd-25 ta-center hand speed" data-type="2" onclick="clickBtn(this)"><img src="../img/o_sbsd.png" class="wd-40" data-pic="../img/o_sbsd_p.png"><div>手动</div></div>') +
        '<div class="wd-25 ta-center custom" onclick="clickBtn(this)">' +
        '<img src="../img/o_sbzdy.png" class="wd-40" data-pic="../img/o_sbzdy_p.png">' +
        "<div>自定义</div>" +
        "</div>" +
        ((data.status1 == 5 && data.swit == 1) ? '<div class="wd-25 ta-center servType pick" data-type="4" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbsm_p.png" class="wd-40 pickImg" data-pic="../img/o_sbsm.png"><div>睡眠</div></div>' : '<div class="wd-25 ta-center servType" data-type="4" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbsm.png" class="wd-40" data-pic="../img/o_sbsm_p.png"><div>睡眠</div></div>') +
        ((data.status2 == 1 && data.swit == 1) ? '<div class="wd-25 ta-center switch pick" data-switch="sterilize" onclick="clickBtn(this)"><img src="../img/o_sbsj_p.png" class="wd-40 pickImg" data-pic="../img/o_sbsj.png"><div>杀菌</div></div>' : '<div class="wd-25 ta-center switch" data-switch="sterilize" onclick="clickBtn(this)"><img src="../img/o_sbsj.png" class="wd-40" data-pic="../img/o_sbsj_p.png"><div>杀菌</div></div>') +
        ((data.status3 == 1 && data.swit == 1) ? '<div class="wd-25 ta-center switch pick" data-switch="heating" onclick="clickBtn(this)"><img src="../img/o_sbdfr_p.png" class="wd-40 pickImg" data-pic="../img/o_sbdfr.png"><div>电辅热</div></div>' : '<div class="wd-25 ta-center switch" data-switch="heating" onclick="clickBtn(this)"><img src="../img/o_sbdfr.png" class="wd-40" data-pic="../img/o_sbdfr_p.png"><div>电辅热</div></div>') +
        "</div>" +
        "</div>";
    } else if (device_type == 2) {

      if (res.code != 1) {
        data = {
          swit: 0,
          model: 0,
          windspeed: 0,
          lightstatus: 0,
          newwind: 0,
          childrenlock: 0,
          pm: 0,
          intemper: 0,
          inhumidity: 0,
          macno: macno,
          time: 0,
          mtype: 2,
          online: 0,
        }
      }

      per_deviceStr = '<div class="mix h100">' +
        '<div class="top h100">' +
        '<div class="view box">' +
        '<div class="ta-center wd-70">' +
        '<div class="wd-100 ta-center"><span class="colmain font50">' + (data.windspeed == 1 ? '130' : data.windspeed == 2 ? '230' : data.windspeed == 3 ? '360' : data.windspeed == 4 ? '500' : data.windspeed == 5 ? '610' : data.windspeed == 6 ? '760' : '0') + '</span><span>m³/h</span></div>' +
        '<div class="wd-60 box ta-center col666 mg-auto">' +
        '<div class="wd-33">PM2.5</div>' +
        '<div class="colmain font24 wd-33">' + data.pm + '</div>' +
        '<div class="wd-33">μg/m³</div>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='h40'>" +
        '<div class="middle border-t h20 box col666">' +
        '<div class="wd-50 box">' +
        '<img src="../img/o_wendu.png" class="wd-15"> 温度' +
        '<span class="colwd mg-l-5">' + data.intemper + '℃</span>' +
        "</div>" +
        '<div class="wd-50 box">' +
        '<img src="../img/o_shidu.png" class="wd-15"> 湿度' +
        '<span class="colsd ta-center">' + data.inhumidity + '</span>' +
        "</div>" +
        "</div>" +
        '<div class="bottom h80 flex flexWrap border-t colc2">' +
        (data.swit == 1 ? '<div class="wd-25 ta-center switch swit mg-t-5" data-status="true" onclick="clickBtn(this)"><img src="../img/o_sbkg.png" class="wd-40" data-pic="../img/o_sbkg_p.png"><div>开关</div></div>' : '<div class="wd-25 ta-center switch swit pick mg-t-5" data-status="false" onclick="clickBtn(this)"><img src="../img/o_sbkg_p.png" class="wd-40 pickImg" data-pic="../img/o_sbkg.png"><div>开关</div></div>') +
        ((data.model == 1 && data.swit == 1) ? '<div class="wd-25 ta-center servType pick mg-t-5" data-type="0" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbzd_p.png" class="wd-40 pickImg" data-pic="../img/o_sbzd.png"><div>自动</div></div>' : '<div class="wd-25 ta-center servType mg-t-5" data-type="0" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbzd.png" class="wd-40" data-pic="../img/o_sbzd_p.png"><div>自动</div></div>') +
        ((data.model == 2 && data.swit == 1) ? '<div class="wd-25 ta-center servType pick mg-t-5" data-type="1" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbjs_p.png" class="wd-40 pickImg" data-pic="../img/o_sbjs.png"><div>速效</div></div>' : '<div class="wd-25 ta-center servType mg-t-5" data-type="1" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbjs.png" class="wd-40" data-pic="../img/o_sbjs_p.png"><div>速效</div></div>') +
        ((data.windspeed > 0 && data.model == 3) ? '<div class="wd-25 ta-center switch speed pick mg-t-5" data-dom="#speed2" onclick="clickBtn(this)"><img src="../img/o_sbfs_p.png" class="wd-40 speed2 pickImg" data-pic="../img/o_sbfs.png"><div>风速</div></div>' : '<div class="wd-25 ta-center switch speed mg-t-5" data-dom="#speed2" onclick="clickBtn(this)"><img src="../img/o_sbfs.png" class="wd-40 speed2" data-pic="../img/o_sbfs_p.png"><div>风速</div></div>' )+
        ((data.model == 4 && data.swit == 1) ? '<div class="wd-25 ta-center custom pick" data-type="3" onclick="clickBtn(this)"><img src="../img/o_sbds_p.png" class="wd-40 pickImg" data-pic="../img/o_sbds.png"><div>定时</div></div>' : '<div class="wd-25 ta-center custom" data-type="3" onclick="clickBtn(this)"><img src="../img/o_sbds.png" class="wd-40" data-pic="../img/o_sbds_p.png"><div>定时</div></div>') +
        ((data.model == 5 && data.swit == 1) ? '<div class="wd-25 ta-center servType pick" data-type="4" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbsm_p.png" class="wd-40 pickImg" data-pic="../img/o_sbsm.png"><div>睡眠</div></div>' : '<div class="wd-25 ta-center servType" data-type="4" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbsm.png" class="wd-40" data-pic="../img/o_sbsm_p.png"><div>睡眠</div></div>') +
        ((data.lightstatus == 1 && data.swit == 1) ? '<div class="wd-25 ta-center switch pick" data-switch="lightstatus" onclick="clickBtn(this)"><img src="../img/o_sbdg_p.png" class="wd-40 pickImg" data-pic="../img/o_sbdg.png"><div>灯光</div></div>' : '<div class="wd-25 ta-center switch" data-switch="lightstatus" onclick="clickBtn(this)"><img src="../img/o_sbdg.png" class="wd-40" data-pic="../img/o_sbdg_p.png"><div>灯光</div></div>') +
        ((data.childrenlock == 1 && data.swit == 1) ? '<div class="wd-25 ta-center switch pick" data-switch="childrenlock" onclick="clickBtn(this)"><img src="../img/o_sbts_p.png" class="wd-40 pickImg" data-pic="../img/o_sbts.png"><div>童锁</div></div>' : '<div class="wd-25 ta-center switch" data-switch="childrenlock" onclick="clickBtn(this)"><img src="../img/o_sbts.png" class="wd-40" data-pic="../img/o_sbts_p.png"><div>童锁</div></div>') +
        ((data.newwind == 1 && data.swit == 1) ? '<div class="wd-25 ta-center switch pick" data-switch="newwind" onclick="clickBtn(this)"><img src="../img/o_sbxf_p.png" class="wd-40 pickImg" data-pic="../img/o_sbxf.png"><div>新风</div></div>' : '<div class="wd-25 ta-center switch" data-switch="newwind" onclick="clickBtn(this)"><img src="../img/o_sbxf.png" class="wd-40" data-pic="../img/o_sbxf_p.png"><div>新风</div></div>') +
        "</div>" +
        "</div>" +
        "</div>";
    } else if (device_type == 3) {
      if (res.code != 1) {
        data = {
          swit: 0,
          type: 5,
          anion: 0,
          arofene: 0,
          times_swit: 0,
          windspeed: 0,
          times: 0,
          online: 0,
          pm: 0,
          csq: 0,
          dectimes: 0,
          intemper: 0,
          inhumidity: 0,
          newwind: 0,
          lightstatus: 0,
          childrenlock: 0,
          macno: macno,
          mtype: 3,
          time: 0,
        }
      }
      per_deviceStr = '<div class="mix h100">' +
        '<div class="top h100">' +
        '<div class="view box">' +
        '<div class="ta-center wd-70">' +
        '<div class="wd-100 ta-center"><span class="colmain font50">' + (data.windspeed == 1 ? '130' : data.windspeed == 2 ? '230' : data.windspeed == 3 ? '360' : data.windspeed == 4 ? '500' : data.windspeed == 5 ? '610' : data.windspeed == 6 ? '760' : '0') + '</span><span>m³/h</span></div>' +
        '<div class="wd-60 box ta-center col666 mg-auto">' +
        '<div class="wd-33">PM2.5</div>' +
        '<div class="colmain font24 wd-33">' + data.pm + '</div>' +
        '<div class="wd-33">μg/m³</div>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='h40'>" +
        '<div class="middle border-t h25 box col666">' +
        '<div class="wd-50 box">' +
        '<img src="../img/o_wendu.png" class="wd-15"> 温度' +
        '<span class="colwd mg-l-5">' + data.intemper + '℃</span>' +
        "</div>" +
        '<div class="wd-50 box">' +
        '<img src="../img/o_shidu.png" class="wd-15"> 湿度' +
        '<span class="colsd ta-center">' + data.inhumidity + '%</span>' +
        "</div>" +
        "</div>" +
        '<div class="bottom h35 flex flexWrap border-t colc2">' +
        (data.swit == 1 ? '<div class="wd-25 ta-center switch swit mg-t-5" data-status="true" onclick="clickBtn(this)"><img src="../img/o_sbkg.png" class="wd-40" data-pic="../img/o_sbkg_p.png"><div>开关</div></div>' : '<div class="wd-25 ta-center switch pick swit mg-t-5"  data-status="false" onclick="clickBtn(this)"><img src="../img/o_sbkg_p.png" class="wd-40 pickImg" data-pic="../img/o_sbkg.png"><div>开关</div></div>') +
        ((data.type == 2 && data.swit == 1) ? '<div class="wd-25 ta-center servType pick mg-t-5" data-type="2" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbzd_p.png" class="wd-40 pickImg" data-pic="../img/o_sbzd.png"><div>自动</div></div>' : '<div class="wd-25 ta-center servType mg-t-5" data-type="2" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbzd.png" class="wd-40" data-pic="../img/o_sbzd_p.png"><div>自动</div></div>') +
        ((data.anion == 1 && data.swit == 1) ? '<div class="wd-25 ta-center switch pick mg-t-5" data-switch="anion" onclick="clickBtn(this)"><img src="../img/o_sbflz_p.png" class="wd-40 pickImg" data-pic="../img/o_sbflz.png"><div>速效</div></div>' : '<div class="wd-25 ta-center switch mg-t-5" data-switch="anion" onclick="clickBtn(this)"><img src="../img/o_sbflz.png" class="wd-40" data-pic="../img/o_sbflz_p.png"><div>速效</div></div>') +
        ((data.windspeed > 0 && data.type == 3 ) ? '<div class="wd-25 ta-center servType switch speed pick mg-t-5" data-dom="#speed3" onclick="clickBtn(this)"><img src="../img/o_sbfs_p.png" class="wd-40 pickImg" data-pic="../img/o_sbfs.png"><div>风速</div></div>' : '<div class="wd-25 ta-center servType switch speed mg-t-5" data-dom="#speed3" onclick="clickBtn(this)"><img src="../img/o_sbfs.png" class="wd-40" data-pic="../img/o_sbfs_p.png"><div>风速</div></div>') +
        ((data.times_swit == 1 && data.swit == 1) ? '<div class="wd-25 ta-center pick custom" onclick="clickBtn(this)"><img src="../img/o_sbds_p.png" class="wd-40 pickImg" data-pic="../img/o_sbds.png"><div>定时</div></div>' : '<div class="wd-25 ta-center custom" onclick="clickBtn(this)"><img src="../img/o_sbds.png" class="wd-40" data-pic="../img/o_sbds_p.png"><div>定时</div></div>') +
        ((data.type == 5 && data.swit == 1) ? '<div class="wd-25 ta-center servType pick" data-type="5" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbsm_p.png" class="wd-40 pickImg" data-pic="../img/o_sbsm.png"><div>睡眠</div></div>' : '<div class="wd-25 ta-center servType" data-type="5" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbsm.png" class="wd-40" data-pic="../img/o_sbsm_p.png"><div>睡眠</div></div>') +
        ((data.lightstatus == 1 && data.swit == 1) ? '<div class="wd-25 ta-center switch pick" data-switch="lightstatus" onclick="clickBtn(this)"><img src="../img/o_sbdg_p.png" class="wd-40 pickImg" data-pic="../img/o_sbdg.png"><div>灯光</div></div>' : '<div class="wd-25 ta-center switch" data-switch="lightstatus" onclick="clickBtn(this)"><img src="../img/o_sbdg.png" class="wd-40" data-pic="../img/o_sbdg_p.png"><div>灯光</div></div>') +
        ((data.childrenlock == 1 && data.swit == 1) ? '<div class="wd-25 ta-center switch pick" data-switch="childrenlock" onclick="clickBtn(this)"><img src="../img/o_sbts_p.png" class="wd-40 pickImg" data-pic="../img/o_sbts.png"><div>童锁</div></div>' : '<div class="wd-25 ta-center switch" data-switch="childrenlock" onclick="clickBtn(this)"><img src="../img/o_sbts.png" class="wd-40" data-pic="../img/o_sbts_p.png"><div>童锁</div></div>') +
        ((data.newwind == 1 && data.swit == 1) ? '<div class="wd-25 ta-center switch pick" data-switch="newwind" onclick="clickBtn(this)"><img src="../img/o_sbxf_p.png" class="wd-40 pickImg" data-pic="../img/o_sbxf.png"><div>新风</div></div>' : '<div class="wd-25 ta-center switch" data-switch="newwind" onclick="clickBtn(this)"><img src="../img/o_sbxf.png" class="wd-40" data-pic="../img/o_sbxf_p.png"><div>新风</div></div>') +
        "</div>" +
        "</div>" +
        "</div>";
    } else if (device_type == 4) {
      if (res.code != 1) {
        data = {
          swit: 0,
          type: 5,
          anion: 0,
          arofene: 0,
          times_swit: 0,
          windspeed: 0,
          times: 0,
          online: 0,
          pm: 0,
          csq: 0,
          dectimes: 0,
          macno: macno,
          mtype: 4,
          time: 0,
        }
      }
      per_deviceStr =
        '<div class="mix h100">' +
        '<div class="top h65">' +
        "<div class>" +
        '<div class="ta-center">' +
        '<div class="Bimg box colfff ypm25">' +
        "<div>" +
        "<div>PM2.5</div>" +
        '<div class="ta-center font24 fontb">' + data.pm + '</div>' +
        "<div>空气质量" + (data.pm >= 0 && data.pm < 75 ? '优' : data.pm >= 75 && data.pm < 100 ? '良' : data.pm > 100 ? '差' : '差') + "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="box ta-center col666 mg-t-20">' +
        '<div class="wd-33"></div>' +
        '<div class="colmain font24 wd-33 ta-center">' +
        (data.swit == 1 ? '<img src="../img/o_switch.png" class="wd-40 switch swit pick"  data-status="true" onclick="clickBtn(this)">' : '<img src="../img/o_switch.png" class="wd-50 switch swit" data-status="false" onclick="clickBtn(this)">') +
        "</div>" +
        '<div class="wd-33">定时：' +
        "<span>" + data.times + "</span>h</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="bottom flex flexWrap border-t colc2 h30">' +
        ((data.swit == 1 && data.type == 2) ? '<div class="wd-25 ta-center pd-t-10 servType pick" data-type="2" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbzd_p.png" class="wd-40 pickImg" data-pic="../img/o_sbzd.png"><div>自动</div></div>' : '<div class="wd-25 ta-center pd-t-10 servType" data-type="2" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbzd.png" class="wd-40" data-pic="../img/o_sbzd_p.png"><div>自动</div></div>') +
        ((data.swit == 1 && data.times_swit == 1) ? '<div class="wd-25 ta-center pd-t-10 switch time pick" data-dom="#times4" onclick="clickBtn(this)"><img src="../img/o_sbds_p.png" class="wd-40 pickImg" data-pic="../img/o_sbds.png"><div>定时</div></div>' : '<div class="wd-25 ta-center pd-t-10 switch time" data-dom="#times4" onclick="clickBtn(this)"><img src="../img/o_sbds.png" class="wd-40" data-pic="../img/o_sbds_p.png"><div>定时</div></div>') +
        ((data.swit == 1 && data.type == 5) ? '<div class="wd-25 ta-center pd-t-10 servType pick" data-type="5" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbsm_p.png" class="wd-40 pickImg" data-pic="../img/o_sbsm.png"><div>睡眠</div></div>' : '<div class="wd-25 ta-center pd-t-10 servType" data-type="5" onclick="clickBtn(this,\''+data.swit+'\')"><img src="../img/o_sbsm.png" class="wd-40" data-pic="../img/o_sbsm_p.png"><div>睡眠</div></div>') +
        ((data.swit == 1 && data.arofene == 1) ? '<div class="wd-25 ta-center pd-t-10 switch pick" data-switch="arofene" onclick="clickBtn(this)"><img src="../img/o_sbjqls_p.png" class="wd-40 pickImg" data-pic="../img/o_sbjqls.png"><div>甲醛猎手</div></div>' : '<div class="wd-25 ta-center pd-t-10 switch" data-switch="arofene" onclick="clickBtn(this)"><img src="../img/o_sbjqls.png" class="wd-40" data-pic="../img/o_sbjqls_p.png"><div>甲醛猎手</div></div>') +
        ((data.windspeed > 0 && data.type == 3 && data.swit == 1) ? '<div class="wd-25 ta-center pd-t-10 switch speed pick" data-dom="#speed4" onclick="clickBtn(this)"><img src="../img/o_sbfs_p.png" class="wd-40 pickImg" data-pic="../img/o_sbfs.png"><div>风速调整</div></div>' : '<div class="wd-25 ta-center pd-t-10 switch speed" data-dom="#speed4" onclick="clickBtn(this)"><img src="../img/o_sbfs.png" class="wd-40" data-pic="../img/o_sbfs_p.png"><div>风速调整</div></div>')+
        ((data.swit == 1 && data.anion == 1) ? '<div class="wd-25 ta-center pd-t-10 switch pick" data-switch="anion" onclick="clickBtn(this)"><img src="../img/o_sbflz_p.png" class="wd-40 pickImg" data-pic="../img/o_sbflz.png"><div>速效</div></div>' : '<div class="wd-25 ta-center pd-t-10 switch" data-switch="anion" onclick="clickBtn(this)"><img src="../img/o_sbflz.png" class="wd-40" data-pic="../img/o_sbflz_p.png"><div>速效</div></div>') +
        "</div>" +
        "</div>";
    }
    $('.swiper-slide').eq(index).html(per_deviceStr);
    $(".h100").css("height", $(window).height() - 103);
    // } else {
    //   dlctipbox.show(res.msg ? res.msg : '请求异常，请刷新或联系客服');
    // }
  }, false);
}

loadDeviceinfo(index, device_type, macno, device_name);
var timer = setInterval(function () {
  loadDeviceinfo(index, device_type, macno, device_name);
}, 40000);

var swiper;
swiper = new Swiper('.swiper-container', {
  on: {
    slideChangeTransitionEnd: function () {
      $(".h100").css("height", $(window).height() - 103);
      index = this.activeIndex;
      macno = String($('.swiper-slide').eq(index).data('macno'));
      device_id = $('.swiper-slide').eq(index).data('device_id');
      device_name = $('.swiper-slide').eq(index).data('device_name');
      device_type = $('.swiper-slide').eq(index).data('device_type');
      loadDeviceinfo(index, device_type, macno, device_name);
      clearInterval(timer);
      timer = setInterval(function () {
        $(".h100").css("height", $(window).height() - 103);
        loadDeviceinfo(index, device_type, macno, device_name);
      }, 40000);
    }
  }
}); // 初始化Swiper