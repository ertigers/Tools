!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Gulu=t()}(this,(function(){"use strict";const e=(e,t,o)=>new Promise(((s,n)=>{const r=new XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&(200===r.status?s(JSON.parse(r.responseText)):n(r.status))},"get"!==e&&"GET"!==e||("object"==typeof o&&(o=Object.keys(o).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(o[e])})).join("&")),t=o?t+"?"+o:t,r.open(e,t,!0),r.send()),"post"!==e&&"POST"!==e||(r.open(e,t,!0),r.setRequestHeader("Content-type","application/json; charset=utf-8"),r.setRequestHeader("Accept","*/*"),r.send(JSON.stringify(o)))})),t=(e,t,o)=>new Promise(((s,n)=>{const r=new XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&(200===r.status?s(r.responseText):n(r.status))},"post"!==e&&"POST"!==e||(r.open(e,t,!0),r.setRequestHeader("Content-type","application/json; charset=utf-8"),r.setRequestHeader("Accept","*/*"),r.send(JSON.stringify(o)))})),o="http://127.0.0.1:9585/icvs2/";return{login:t=>e("post",`${o}login`,t),getDeviceList:t=>e("get",`${o}CAS/C_CAS_QueryPUIDSets`,t),getDeviceByPuid:t=>e("get",`${o}C_CAS_QueryPUIDRes`,t),getPlayVideoId:t=>e("get",`${o}video/startVideo2`,t),ptzControl:t=>{let s=t.puid||"",n=t.idx||0,r=t.control||"",i="",a=t.token;if(s&&r){if("left"===r||"up"===r||"right"===r||"down"===r||"stop"===r){return e("post",`${o}PTZ/C_PTZ_Turn`,{puid:s,motion:r,idx:n,token:a})}if("zoomin"===r){return e("post",`${o}PTZ/C_PTZ_ZoomInPicture`,{puid:s,idx:n,token:a})}if("zoomout"===r){return e("post",`${o}PTZ/C_PTZ_ZoomOutPicture`,{puid:s,idx:n,token:a})}if("stopzoom"===r){return e("post",`${o}PTZ/C_PTZ_StopPictureZoom`,{puid:s,idx:n,token:a})}if("focusfar"===r){return e("post",`${o}PTZ/C_PTZ_MakeFocusFar`,{puid:s,idx:n,token:a})}if("focusnear"===r){return e("post",`${o}PTZ/C_PTZ_MakeFocusNear`,{puid:s,idx:n,token:a})}if("stopfocus"===r){return e("post",`${o}PTZ/C_PTZ_StopFocusMove`,{puid:s,idx:n,token:a})}if("augment"===r){return i='<?xml version="1.0" encoding="UTF-8"?><M Type="ComReq"><C Type="G" Prio="1" EPID="system" Lang="zh_CN"> <Res Type="IV" Idx="'+n+'" OptID="C_PTZ_AugmentAperture" Stream="0"><Param></Param></Res></C></M>',e("post",`${o}RawRequest?dstType=201&dstID='${s}'&token=${a}`,{xml:i})}if("minish"===r){return i='<?xml version="1.0" encoding="UTF-8"?><M Type="ComReq"><C Type="G" Prio="1" EPID="system" Lang="zh_CN"><Res Type="IV" Idx="'+n+'" OptID="C_PTZ_MinishAperture" Stream="0"><Param></Param></Res></C></M>',e("post",`${o}RawRequest?dstType=201&dstID='${s}'&token=${a}`,{xml:i})}if("stopaperture"===r){return i='<?xml version="1.0" encoding="UTF-8"?><M Type="ComReq"><C Type="G" Prio="1" EPID="system" Lang="zh_CN"><Res Type="IV" Idx="'+n+'" OptID="C_PTZ_StopApertureZoom" Stream="0"><Param></Param></Res></C></M>',e("post",`${o}RawRequest?dstType=201&dstID='${s}'&token=${a}`,{xml:i})}}},setPresetPos:t=>e("post",`${o}PTZ/C_PTZ_SetPresetPos`,t),moveToPresetPos:t=>e("post",`${o}PTZ/C_PTZ_MoveToPresetPos`,t),gotoOriginalPresetPos:t=>e("post",`${o}PTZ/C_PTZ_GotoOriginalPresetPos`,t),startCloudSnapshot:t=>e("post",`${o}CSS/C_CSS_StartManualSnapshot`,t),startCloudStorage:t=>e("post",`${o}CSS/C_CSS_StartManualStorage`,t),stopCloudStorage:t=>e("post",`${o}CSS/C_CSS_StopManualStorage`,t),startTalk:t=>e("get",`${o}audio/startTalk2`,t),startCall:t=>e("get",`${o}audio/startCall2`,t),stoptStream:t=>e("get",`${o}stopPlay2`,t),getCloudFile:t=>e("get",`${o}CSS/C_CSS_QueryStorageFiles`,t),getDeviceFile:t=>e("get",`${o}SG/C_SG_QueryRecordFiles`,t),downloadCloudFile:t=>e("get",`${o}downloadCloudFile2`,t),downloadDeviceFile:t=>e("get",`${o}downloadDeviceFile2`,t),setPuaseDownload:t=>e("get",`${o}puaseDownload2`,t),setRestoreDownload:t=>e("get",`${o}restoreDownload2`,t),setStopDownload:t=>e("get",`${o}stopDownload2`,t),getVodCloudFile:t=>e("get",`${o}vodCloudFile2`,t),getVodDeviceFile:t=>e("get",`${o}vodDeviceFile2`,t),setPuaseVod:t=>e("get",`${o}puaseVod2`,t),setRestoreVod:t=>e("get",`${o}restoreVod2`,t),setSpeedVod:t=>e("get",`${o}setVodSpeed2`,t),setOffsetVod:t=>e("get",`${o}setVodOffset2`,t),subscriptionGps:e=>{let s=e.token,n=e.epid||"",r=e.puid||"",i=e.idx||0;return t("POST",o+"RawRequest?dstType=33&token="+s,{xml:'<?xml version="1.0" encoding="UTF-8"?><M Type="ComReq"><C Type="C" Prio="1" EPID="'+n+'"><Res Type="ST" Idx="'+i+'" OptID="C_GS_SubscribeGPSData"><Param></Param></Res></C><OSets><Res OType="201" OID="'+r+'" Type="GPS" Idx="'+i+'"></Res></OSets></M>'})},getPuidLastGps:e=>{let s=e.token,n=e.puid||[],r=e.epid||"",i="<OSets>";return i+='<Res OType="201" OID="'+n+'" Type="GPS" Idx="0"></Res>',i+="</OSets>",t("POST",o+'RawRequest?dstType=33&dstID=""&token='+s,{xml:'<?xml version="1.0" encoding="UTF-8"?><M Type="ComReq"><C Type="C" Prio="1" EPID="'+r+'"><Res Type="ST" Idx="0" OptID="C_GS_QueryLastGPSData"><Param></Param></Res></C>'+i+"</M>"})},getPuidHistoryGps:e=>{let s=e.token,n=e.offset||0,r=e.count||100,i=e.begin,a=e.end,p=e.puid,d=e.epid||"",u="<OSets>";return u+='<Res OType="201" OID="'+p+'" Type="ST" Idx="0"></Res>',u+="</OSets>",t("POST",o+'RawRequest?dstType=33&dstID=""&token='+s,{xml:'<?xml version="1.0" encoding="UTF-8"?><M Type="ComReq"><C Type="C" Prio="1" EPID="'+d+'"><Res Type="ST" Idx="0" OptID="C_GS_QueryHistoryGPSData"><Param  Offset="'+n+'" Count="'+r+'" Begin="'+i+'" End="'+a+'"></Param></Res></C>'+u+"</M>"})}}}));