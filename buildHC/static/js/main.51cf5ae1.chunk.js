(this.webpackJsonpbx_cloud=this.webpackJsonpbx_cloud||[]).push([[0],{12:function(e,t,a){e.exports=a.p+"static/media/logo-w.4419aa9a.svg"},17:function(e,t,a){e.exports=a(27)},26:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),r=a(11),i=a.n(r),o=a(7),s=new WebSocket("ws://64.227.107.166/wb"),c=a(12),m=a.n(c),u=a(29),d=a(30),p=a(31),h=a(13),g=a(14),v=a(16),E=a(15),f=a(6),w=a.n(f),y=function(e){Object(v.a)(a,e);var t=Object(E.a)(a);function a(e){var l;return Object(h.a)(this,a),(l=t.call(this,e)).state={series:[l.props.Nitrite?l.props.Nitrite:0,l.props.Fikosin?l.props.Fikosin:0,l.props.Nitrate?l.props.Nitrate:0,l.props.Chlorophyll?l.props.Chlorophyll:0,l.props.Sulfate?l.props.Sulfate:0,l.props.No3?l.props.No3:0,l.props.Sodium?l.props.Sodium:0,l.props.Alkaline?l.props.Alkaline:0],options:{chart:{width:380,type:"pie"},labels:["Nitrit","Fikosin","Nitrat","Xlorofil","Sulfat","No3","Sodium ","Alkalin"],responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}]}},l}return Object(g.a)(a,[{key:"shouldComponentUpdate",value:function(){return this.props}},{key:"componentDidUpdate",value:function(){return this.props}},{key:"render",value:function(){return n.a.createElement("div",{id:"chart"},n.a.createElement(w.a,{options:this.state.options,series:this.state.series,type:"pie",width:380}))}}]),a}(n.a.Component);var b=function(e){var t=e.data;null===t?console.log("data yoxdu"):(console.log("data var"),console.log(typeof t.WaterLevel));var a=Object(l.useState)({series:[{name:"Servings",data:[null===t?0:Number(t.WaterLevel),null===t?0:t.FlowRate,null===t?0:t.WaterPermeability,null===t?0:t.WaterOxygen,null===t?0:t.Blurring,null===t?0:t.Fikosin,null===t?0:t.SuspendedSolids,null===t?0:t.Ammonia,null===t?0:t.NitrogenDioxide,null===t?0:t.HardnessOfTheWater,null===t?0:t.ChemicalOxygenDemand,null===t?0:t.BiochemicalOxygenDemand]}],options:{chart:{height:350,type:"bar"},plotOptions:{bar:{columnWidth:"50%",endingShape:"rounded"}},stroke:{width:2},grid:{row:{colors:["#fff","#f2f2f2"]}},xaxis:{labels:{rotate:-45},categories:["Suyun s\u0259viyy\u0259si","Ax\u0131n s\xfcr\u0259ti","Suyun x\xfcsusi ke\xe7iriciliyi","H\u0259ll edilmi\u015f oksigenin miqdar\u0131 ","Bulanl\u0131ql\u0131q","Fikosinin","As\u0131lm\u0131\u015f b\u0259rk madd\u0259l\u0259r (SS) - mg/l","Ammonyak","Nitrogen Dioxksid(NO2) - mg/l","Codlulugu","Kimy\u0259vi oksigen  t\u0259l\u0259bi (COD) mg/l ","Biokimy\u0259vi oksigen t\u0259l\u0259bi"],tickPlacement:"on"},fill:{type:"gradient",gradient:{shade:"light",type:"horizontal",shadeIntensity:.25,gradientToColors:void 0,inverseColors:!0,opacityFrom:.85,opacityTo:.85,stops:[50,0,100]}}}}),r=Object(o.a)(a,1)[0];return n.a.createElement("div",{id:"chart"},n.a.createElement(w.a,{options:r.options,series:r.series,type:"bar",height:350}))},x=a(8),N=a.n(x);var k=function(e){var t=e.data;return n.a.createElement("div",null,n.a.createElement("div",{className:"header d-flex align-items-center text-white"},n.a.createElement(u.a,{fluid:!0},n.a.createElement("img",{src:m.a,height:"30",alt:"logo"}))),n.a.createElement(u.a,{fluid:!0},n.a.createElement(d.a,{className:"pt-3"},n.a.createElement(p.a,{lg:10},n.a.createElement("div",{className:"big-box pt-3"},n.a.createElement("div",{className:"box"},n.a.createElement(d.a,null,n.a.createElement(p.a,{lg:7,sm:12,md:12,xs:12},n.a.createElement(b,{data:t})),n.a.createElement(p.a,{lg:5,sm:12,md:12,xs:12},n.a.createElement(y,{data:t})),n.a.createElement(p.a,{lg:12},n.a.createElement(d.a,{className:"pl-2 pr-2"},n.a.createElement(p.a,{lg:2,className:"text-center"},n.a.createElement(N.a,{animate:!0,animationDuration:"1s",responsive:!0,progress:null===t?0:t.WaterAcidity,size:15,progressColor:"#9bdeac",showPercentageSymbol:!1}),n.a.createElement("h6",null,"Suyun tur\u015fulu\u011fu (pH)")),n.a.createElement(p.a,{lg:2,className:"text-center"},n.a.createElement(N.a,{animate:!0,animationDuration:"1s",responsive:!0,progress:null===t?0:t.SalinityOfWater,showPercentageSymbol:!1}),n.a.createElement("h6",null,"Suyun duzlulu\u011fu")),n.a.createElement(p.a,{lg:2,className:"text-center"},n.a.createElement(N.a,{animate:!0,animationDuration:"1s",responsive:!0,progress:null===t?0:t.WaterTemperature,progressColor:"#d92027",showPercentageSymbol:!1}),n.a.createElement("h6",null,"Suyun temperaturu")),n.a.createElement(p.a,{lg:6},n.a.createElement("div",{className:"p-3"},"Suyun neye yararliligi haqda melumatin oldugu yer")))))))),n.a.createElement(p.a,{lg:2,className:"mb-2"},n.a.createElement("h5",null,"Cihaz\u0131n yerl\u0259\u015fm\u0259 n\xf6qt\u0259si"),n.a.createElement("div",{style:{height:"150px"},className:"map w-100"},n.a.createElement("iframe",{title:"map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.4463740276674!2d49.920235515399455!3d40.53172637935183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMxJzU0LjIiTiA0OcKwNTUnMjAuNyJF!5e0!3m2!1sen!2s!4v1593886057478!5m2!1sen!2s",frameBorder:"0",style:{width:"100%",height:"100%",border:0},allowFullScreen:"","aria-hidden":"false",tabIndex:"0"})),n.a.createElement("ul",{className:"list-ul"},n.a.createElement("li",{className:"d-flex align-items-center justify-content-between"},n.a.createElement("div",null,n.a.createElement("div",null,"2020-07-06"),n.a.createElement("div",null,"05:30")),n.a.createElement("div",null,n.a.createElement("svg",{fill:"#0166ff",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},n.a.createElement("path",{d:"M11 6v8h7v-2h-5v-6h-2zm10.854 7.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208z"})))),n.a.createElement("li",{className:"d-flex align-items-center justify-content-between"},n.a.createElement("div",null,n.a.createElement("div",null,"2020-07-06"),n.a.createElement("div",null,"11:23")),n.a.createElement("div",null,n.a.createElement("svg",{fill:"#0166ff",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},n.a.createElement("path",{d:"M11 6v8h7v-2h-5v-6h-2zm10.854 7.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208z"})))),n.a.createElement("li",{className:"d-flex align-items-center justify-content-between"},n.a.createElement("div",null,n.a.createElement("div",null,"2020-04-03"),n.a.createElement("div",null,"02:10")),n.a.createElement("div",null,n.a.createElement("svg",{fill:"#0166ff",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},n.a.createElement("path",{d:"M11 6v8h7v-2h-5v-6h-2zm10.854 7.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208z"})))))))))};var S=function(){var e=Object(l.useState)(null),t=Object(o.a)(e,2),a=t[0],r=t[1];return Object(l.useEffect)((function(){return s.onopen=function(){console.log("connected to websocket")},s.onmessage=function(e){r(JSON.parse(e.data))},s.onerror=function(e){console.log(e)},function(){s.onclose=function(){console.log("disconnected")}}}),[a]),n.a.createElement("div",null,n.a.createElement(k,{data:a}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(25),a(26);i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.51cf5ae1.chunk.js.map