(this.webpackJsonpbx_cloud=this.webpackJsonpbx_cloud||[]).push([[0],{12:function(e,a,t){e.exports=t(22)},21:function(e,a,t){},22:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),r=t(11),i=t.n(r),s=t(7),o=new WebSocket("ws://64.227.107.166/wb"),m=t(24),c=t(25),d=t(26),u=t(6),g=t.n(u);var h=function(e){var a={series:[null===e.data?0:parseInt(e.data.Nitrite),null===e.data?0:parseInt(e.data.Fikosin),null===e.data?0:parseInt(e.data.Nitrate),null===e.data?0:parseInt(e.data.Chlorophyll),null===e.data?0:parseInt(e.data.Sulfate),null===e.data?0:parseInt(e.data.No3),null===e.data?0:parseInt(e.data.Blurring),null===e.data?0:parseInt(e.data.Alkaline)],options:{chart:{width:380,type:"pie"},labels:["Nitrit","Fikosin","Nitrat","Xlorofil","Sulfat","No3","Sodium ","Alkalin"],responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}]}};return n.a.createElement("div",{id:"chart"},n.a.createElement(g.a,{options:a.options,series:a.series,type:"pie",width:380}))};var p=function(e){var a={series:[{name:"N\u0259tic\u0259",data:[null===e.data?0:e.data.WaterLevel,null===e.data?0:e.data.SalinityOfWater,null===e.data?0:e.data.WaterPermeability,null===e.data?0:e.data.WaterOxygen,null===e.data?0:e.data.Sodium,null===e.data?0:e.data.Fikosin,null===e.data?0:e.data.SuspendedSolids,null===e.data?0:e.data.Ammonia,null===e.data?0:e.data.NitrogenDioxide,null===e.data?0:e.data.HardnessOfTheWater,null===e.data?0:e.data.ChemicalOxygenDemand,null===e.data?0:e.data.BiochemicalOxygenDemand]}],options:{chart:{height:350,type:"bar"},plotOptions:{bar:{columnWidth:"50%",endingShape:"rounded"}},stroke:{width:2},grid:{row:{colors:["#fff","#f2f2f2"]}},xaxis:{labels:{rotate:-45},categories:["Suyun s\u0259viyy\u0259si-m","Ax\u0131n s\xfcr\u0259ti - l/d","Suyun x\xfcsusi ke\xe7iriciliyi - \u03bcS/cm","H\u0259ll edilmi\u015f oksigenin miqdar\u0131 - mg/l","Havan\u0131n tempraturu - C","Fikosinin - mg/l","As\u0131lm\u0131\u015f b\u0259rk madd\u0259l\u0259r (SS) - mg/l","Ammonyak - mg/l","Nitrogen Dioxksid(NO2) - mg/l","Codlulugu - mg/l","Kimy\u0259vi oksigen  t\u0259l\u0259bi (COD) mg/l ","Biokimy\u0259vi oksigen t\u0259l\u0259bi - mg/l"],tickPlacement:"on"},fill:{type:"gradient",gradient:{shade:"light",type:"horizontal",shadeIntensity:.25,gradientToColors:void 0,inverseColors:!0,opacityFrom:.85,opacityTo:.85,stops:[50,0,100]}}}};return n.a.createElement("div",null,n.a.createElement("div",{id:"chart"},n.a.createElement(g.a,{options:a.options,series:a.series,type:"bar",height:350})))},y=t(8),b=t.n(y);var E=function(e){var a=e.data,t=new Date,r={year:t.getFullYear()+"-"+(t.getMonth()+1)+"-6",watch:t.getHours()+":"+t.getMinutes()},i=Object(l.useState)([r]),o=Object(s.a)(i,1)[0];return n.a.createElement("div",null,n.a.createElement("div",{className:"header text-white"},n.a.createElement("div",{className:"d-flex h-100 align-items-center justify-content-evenly"},n.a.createElement("h5",null,"BetaX"))),n.a.createElement(m.a,{fluid:!0},n.a.createElement(c.a,{className:"pt-3"},n.a.createElement(d.a,{lg:10},n.a.createElement("div",{className:" pt-3"},n.a.createElement("div",{className:"box"},n.a.createElement(c.a,null,n.a.createElement(d.a,{lg:7,sm:12,md:12,xs:12},n.a.createElement("div",{className:"big-box"},n.a.createElement(p,{data:a}))),n.a.createElement(d.a,{lg:5,sm:12,md:12,xs:12,className:"pl-0"},n.a.createElement("div",{className:"big-box"},n.a.createElement("div",{className:"big-header "},n.a.createElement("h6",null,"Suyun kimy\u0259vi t\u0259rkibi")),n.a.createElement(h,{data:a}))),n.a.createElement(d.a,{lg:7},n.a.createElement("div",{className:"big-box big-box-2 w-100"},n.a.createElement(c.a,{className:"justify-content-around p-2"},n.a.createElement(d.a,{lg:3,className:"text-center"},n.a.createElement(b.a,{animate:!0,animationDuration:"1s",responsive:!0,progress:null===a?0:a.WaterAcidity,size:15,progressColor:"#9bdeac",showPercentageSymbol:!1}),n.a.createElement("h6",null,"Suyun tur\u015fulu\u011fu (pH)")),n.a.createElement(d.a,{lg:3,className:"text-center"},n.a.createElement(b.a,{animate:!0,animationDuration:"1s",responsive:!0,progress:null===a?0:a.SalinityOfWater,showPercentageSymbol:!1}),n.a.createElement("h6",null,"Suyun duzlulu\u011fu (mg/l)")),n.a.createElement(d.a,{lg:3,className:"text-center"},n.a.createElement(b.a,{animate:!0,animationDuration:"1s",responsive:!0,progress:null===a?0:a.FlowRate,progressColor:"#d92027",showPercentageSymbol:!1}),n.a.createElement("h6",null,"Suyun temperaturu - (C)"))))),n.a.createElement(d.a,{lg:5,className:"pl-0"},n.a.createElement(c.a,null,n.a.createElement(d.a,{lg:12},n.a.createElement("div",{className:"big-box big-box-2"},n.a.createElement("div",{className:"big-header "},n.a.createElement("h6",null,"Suyun yararl\u0131l\u0131\u011f\u0131 haqq\u0131nda m\u0259lumat")),n.a.createElement("div",{className:"pl-4 pr-4"},n.a.createElement("p",{className:"m-0"},"Suyun keyfiyy\u0259tini bilm\u0259k biz\u0259 ilk \xf6nc\u0259 onun n\u0259y\u0259 yararl\u0131 olmas\u0131 haqq\u0131nda m\u0259lumat verir.  Suyun keyfiyy\u0259tini bilib biz onun suvarma \xfc\xe7\xfcn yaxud da i\xe7m\u0259y\u0259 yararl\u0131 ya da yarars\u0131z olmas\u0131n\u0131 bil\u0259 bil\u0259rik. M\u0259s\u0259l\u0259n  \u015for su suvarma \xfc\xe7\xfcn  eyni zamanda da i\xe7m\u0259k \xfc\xe7\xfcn yarars\u0131z hesab olunur. T\u0259rkibind\u0259 az yod olan, \xe7irkli, z\u0259r\u0259rli bakteriyalar olan, ax\u0131m\u0131 olmayan su i\xe7m\u0259k \xfc\xe7\xfcn yarars\u0131z hesab olunur."),n.a.createElement("div",{className:"alert mt-1 text-center text-white"},n.a.createElement("h6",null,"Su i\xe7m\u0259k \xfc\xe7\xfcn yararl\u0131d\u0131r!"))))))))))),n.a.createElement(d.a,{lg:2,style:{height:"auto"},className:"mb-2 bg-white big-box mt-3"},n.a.createElement("div",{className:"big-header pl-0 pr-0 pt-2 pb-2"},n.a.createElement("h6",null,"Cihaz\u0131n yerl\u0259\u015fm\u0259 n\xf6qt\u0259si")),n.a.createElement("div",{style:{height:"150px"},className:"map w-100"},n.a.createElement("iframe",{title:"map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.4463740276674!2d49.920235515399455!3d40.53172637935183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMxJzU0LjIiTiA0OcKwNTUnMjAuNyJF!5e0!3m2!1sen!2s!4v1593886057478!5m2!1sen!2s",frameBorder:"0",style:{width:"100%",height:"100%",border:0},allowFullScreen:"","aria-hidden":"false",tabIndex:"0"})),n.a.createElement("ul",{className:"list-ul"},null===a?"":n.a.createElement("li",{className:"d-flex align-items-center justify-content-between"},n.a.createElement("div",null,n.a.createElement("div",null,o[0].year),n.a.createElement("div",null,o[0].watch)),n.a.createElement("div",null,n.a.createElement("svg",{fill:"#0166ff",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},n.a.createElement("path",{d:"M11 6v8h7v-2h-5v-6h-2zm10.854 7.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208z"})))))))))};var v=function(){var e=Object(l.useState)(null),a=Object(s.a)(e,2),t=a[0],r=a[1];return Object(l.useEffect)((function(){return o.onopen=function(){console.log("connected to websocket")},o.onmessage=function(e){r(JSON.parse(e.data)),console.log(JSON.parse(e.data))},o.onerror=function(e){console.log(e)},function(){o.onclose=function(){console.log("disconnected")}}}),[t]),n.a.createElement("div",null,n.a.createElement(E,{data:t}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(20),t(21);i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[12,1,2]]]);
//# sourceMappingURL=main.f2876f78.chunk.js.map