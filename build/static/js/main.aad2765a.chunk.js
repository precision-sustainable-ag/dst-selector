(this["webpackJsonpdecision-support-tool"]=this["webpackJsonpdecision-support-tool"]||[]).push([[0],{101:function(e,t,a){},102:function(e,t,a){},121:function(e,t,a){},122:function(e,t,a){},123:function(e,t,a){},125:function(e,t,a){},133:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(9),s=a.n(o),l=(a(101),a(102),a(187)),c=a(172),i=a(7);a(121);var m=function(){return r.a.createElement(i.k,{className:"primaryFooter font-small pt-4"},r.a.createElement(i.f,{fluid:!0,className:"text-center text-md-left"},r.a.createElement(i.p,null,r.a.createElement(i.e,{md:"6"},r.a.createElement("p",null,"Disclaimer: Actual cover crop performance may vary. Consult an"," ",r.a.createElement("a",{className:"footerLink",href:"http://placehold.it/1000x1000",style:{color:"#fff"}},"NRCS Extension Educator")," ","for detailed guidance.")),r.a.createElement(i.e,{md:"4",className:"offset-md-2 rightSideFooterLinks"},r.a.createElement(c.a,{href:"https://opensource.org/",style:{paddingRight:"50px",color:"#000"}},"OPEN SOURCE"),r.a.createElement(c.a,{href:"https://google.com/",style:{paddingRight:"50px",color:"#000"}},"CONTACT US"),r.a.createElement(c.a,{href:"https://google.com",style:{paddingRight:"50px",color:"#000"}},"2019")))))},d=a(31),u=a(26),p=a(37),h=a(38),f=a(39),g=(a(122),a(176)),E=function(e){function t(){var e;Object(d.a)(this,t),e=Object(p.a)(this,Object(h.a)(t).call(this));var a=new Date,n=[];n[0]="January",n[1]="February",n[2]="March",n[3]="April",n[4]="May",n[5]="June",n[6]="July",n[7]="August",n[8]="September",n[9]="October",n[10]="November",n[11]="December";var r=n[a.getMonth()];return e.state={date:"".concat(r," ").concat(a.getDate(),", ").concat(a.getFullYear())},e}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.state.date}}]),t}(n.Component),v=(a(123),function(e,t){return r.a.createElement("svg",{width:e,height:t,viewBox:"0 0 14 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z",fill:"white"}))}),C=function(e,t){return r.a.createElement("svg",{height:t,width:e,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM6 15.5C4.62 15.5 3.5 14.38 3.5 13C3.5 11.62 4.62 10.5 6 10.5C7.38 10.5 8.5 11.62 8.5 13C8.5 14.38 7.38 15.5 6 15.5ZM7.5 6C7.5 4.62 8.62 3.5 10 3.5C11.38 3.5 12.5 4.62 12.5 6C12.5 7.38 11.38 8.5 10 8.5C8.62 8.5 7.5 7.38 7.5 6ZM14 15.5C12.62 15.5 11.5 14.38 11.5 13C11.5 11.62 12.62 10.5 14 10.5C15.38 10.5 16.5 11.62 16.5 13C16.5 14.38 15.38 15.5 14 15.5Z",fill:"white"}))},b=function(e,t){return r.a.createElement("svg",{width:e,height:t,viewBox:"0 0 24 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M19.35 6.04C18.67 2.59 15.64 0 12 0C9.11 0 6.6 1.64 5.35 4.04C2.34 4.36 0 6.91 0 10C0 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04Z",fill:"black"}))},k=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(p.a)(this,Object(h.a)(t).call(this,e))).flag=!1,a.checkIfWellUpdated=function(){void 0===a.props.wellState?(console.log("undefined"),a.flag=!1):void 0===a.props.wellState.address||"stepperState"===a.props.wellState?(a.flag=!1,console.log("address undefined")):a.flag=!0},a.formattedAddress=function(){var e=a.props.wellState.address.toString().substring(0,19);return r.a.createElement("div",{className:"addressBar"},r.a.createElement(g.a,{size:"small"},v(20,20),"\xa0 ",e))},a.formatterZone=function(){return r.a.createElement("div",{className:"zoneBar"},r.a.createElement(g.a,{size:"small"},C(20,20),"\xa0 Plant Hardiness ",a.props.wellState.zoneText))},console.log(a.props.wellState),a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(){this.checkIfWellUpdated()}},{key:"render",value:function(){return r.a.createElement("div",{className:"greenBarContainer"},!0===this.flag&&"Enter Address"!==this.props.wellState.address?this.formattedAddress():"",!0===this.flag&&void 0!==this.props.wellState.zoneText?this.formatterZone():"")}}]),t}(n.Component),y=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(p.a)(this,Object(h.a)(t).call(this,e))).setProgressBackground=function(){return a.progressInterval=setInterval((function(){var e=localStorage.getItem("stepperState");"stepperState"===(e=JSON.parse(e))||""===e?a.setState({progress:2}):isNaN(e.progress)||a.setState({progress:2}),a.state.progress&&document.getElementsByClassName("itemButton".concat(a.state.progress))[0].classList.add("active"),a.setState({wellState:e})}),100),a.progressInterval},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.setProgressBackground()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.progressInterval)}},{key:"render",value:function(){"url(".concat(this.props.logoPath,")");return r.a.createElement("header",null,r.a.createElement("div",{className:"topHeader"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("a",{href:""},"ABOUT")),r.a.createElement("li",null,r.a.createElement("a",{href:""},"NECCC")),r.a.createElement("li",null,r.a.createElement("a",{href:""},"USDA NRCS")),r.a.createElement("li",null,r.a.createElement("a",{href:""},"NE SARE")),r.a.createElement("li",null,r.a.createElement("a",{href:""},"HELP")),r.a.createElement("li",null,r.a.createElement("a",{href:""},"FEEDBACK")))),r.a.createElement("div",{className:"bottomHeader"},r.a.createElement("section",null,r.a.createElement("div",{className:"logoContainer"},r.a.createElement("img",{src:this.props.logoPath})),r.a.createElement("div",null,r.a.createElement(E,null))),r.a.createElement("ul",null,r.a.createElement(g.a,{size:"large",className:"listitemButton itemButton1"},"COVER CROP EXPLORER"),r.a.createElement(g.a,{size:"large",className:"listitemButton itemButton2"},"SPECIES SELECTOR"),r.a.createElement(g.a,{size:"large",className:"listitemButton itemButton3"},"MIX MAKER"),r.a.createElement(g.a,{size:"large",className:"listitemButton itemButton4"},"SEED RATE CALCULATOR"),r.a.createElement(g.a,{size:"large",className:"listitemButton itemButton5"},"MY COVER CROP LIST"))),r.a.createElement(k,this.state))}}]),t}(n.Component),w=a(21),S=a(190),N=a(196),x=a(185),O=a(197),z=(a(124),a(20)),B=a.n(z),A=(a(125),a(177)),T=a(178),j=a(179),R=a(180),Z=a(192),M=a(188),P=a(194),D=a(195),L=a(198),W=a(199),I=a(191),G=a(6);delete B.a.Icon.Default.prototype._getIconUrl,B.a.Icon.Default.mergeOptions({iconRetinaUrl:a(126),iconUrl:a(127),shadowUrl:a(128)});var U=Object(G.a)({root:{backgroundColor:"#e3f2f4",borderRadius:"20px",color:"#000",padding:"10px 20px 10px 20px","&:hover":{backgroundColor:"#48a8ab",color:"#fff"}}})(g.a),H=function(e){function t(){var e;return Object(d.a)(this,t),(e=Object(p.a)(this,Object(h.a)(t).call(this))).myMap=r.a.createRef(),e.queryGEORevAPI=function(t,a){fetch("https://nominatim.openstreetmap.org/reverse?lat=".concat(t,"&lon=").concat(a,"&format=json"),{method:"GET"}).then((function(e){if(e.ok)return e.json()})).then((function(t){var a=t.display_name;e.setZoneState(t.address.postcode),e.setState({address:a,addressVerified:!0})}))},e.setZoneState=function(t){console.log(t),fetch("https://phzmapi.org/".concat(t,".json"),{method:"GET"}).then((function(e){if(e.ok)return e.json()})).then((function(e){var t=0;return null!==e&&void 0!==e?(t=e.zone.length>1?e.zone.charAt(0):e.zone,parseInt(t)):7})).then((function(t){t<=7&&t>1?2===t||3===t?e.setState({zoneText:"Zone 2 & 3"}):e.setState({zoneText:"Zone ".concat(t)}):e.setState({zoneText:"Zone 7"})}))},e.addMarker=function(t){var a=e.state.markers;a.pop(),a.push(t.latlng),e.setState({markers:a});var n=a[0].lng,r=a[0].lat;e.queryGEORevAPI(r,n)},e.handleSnackClose=function(){e.setState({snackOpen:!1,snackMessage:""})},e.handleMapClick=function(e){var t=e.latlng,a=t.lat,n=t.long;console.log("Clicked at ".concat(a,", ").concat(n))},e.handleAddressChangeByText=function(t){e.setState({address:t.target.value,showAddressChangeBtn:!0})},e.getZipByLatLong=function(){},e.updateAddressOnClick=function(){var t=e.state.address;fetch("https://nominatim.openstreetmap.org/search/?q=".concat(t,"&format=json"),{method:"GET"}).then((function(e){if(e.ok)return e.json()})).then((function(t){console.log(t),1===t.length?e.setState({markers:[[t[0].lat,t[0].lon]],zoom:15,addressVerified:!0,address:t[0].display_name}):e.setState({address:"",addressVerified:!1,snackOpen:!0,snackMessage:"Please complete the address"})})).then((function(){e.setState({showAddressChangeBtn:!1})}))},e.renderProgress=function(){switch(e.state.progress){case 0:return r.a.createElement(i.f,{fluid:!0,className:"pl-0 pr-0 pt-0 mt-0"},r.a.createElement(i.p,null,r.a.createElement(i.e,{className:"parentJumbotronRow",size:"12"},r.a.createElement(i.m,{fluid:!0,style:{padding:0},className:"mb-0"},r.a.createElement(i.e,{className:"text-white text-center parentJumbotronCol",style:{backgroundImage:"url(/images/cover-crop-field.png)",backgroundSize:"cover"}},r.a.createElement(i.e,{id:"mainJumbotronWrapper",className:"py-5",style:{}},r.a.createElement("div",{id:"mainJumbotronTextWrapper",style:{}},r.a.createElement(i.d,{className:"h1-responsive pt-3 m-5 font-bold"},"Welcome to the NECCC Cover Crop Decision Support Tool"),r.a.createElement("p",{className:"mb-5 text-left"},"You are currently interacting with a Beta version of the Cover Crop DSTs. The purpose of this interaction is so that we may gather feedback about the usability and usefulness of these tools."),r.a.createElement("p",{className:"mb-5 text-left"},"The cover crop data you will see has been created by the NECCC Data Verification Team of cover crop experts, the original MCCC species selector tool, a seeding rate calculator developd by NRCS NY, and several other data sources. Please note: these data are still being finalized by NECCC teams for each of the plant hardiness zones. The data shown are a preview and are yet to be finalized."),r.a.createElement("p",{className:"mb-5 text-left",style:{fontWeight:"bold"}},"Thank you for your time and consideration. We look forward to your feedback and hope to build a pleasant cover crop tool experience for you to effectively select and manage your cover crops.")),r.a.createElement(U,{className:"mb-5 mt-5",onClick:function(){e.setWellProgress(1)}},"NEXT")))))));case 1:return r.a.createElement(A.a,{container:!0,alignItems:"center",justify:"center",style:{marginTop:"5em"}},r.a.createElement(T.a,{children:2,cols:2,cellHeight:300,style:{backgroundColor:"rgba(255,255,255,1)",boxShadow:"rgb(136, 136, 136) 0px 0px 1px",width:"90%",margin:"0 auto",textAlign:"",padding:"20px"}},r.a.createElement(j.a,{item:!0,md:6},r.a.createElement("h1",null,"Where is your field located? "),r.a.createElement("p",null,"Select plant hardiness zone for least site specific results. Enter address or zip code for county-level specificity. For more specific results, mark out your field boundary in the map."),r.a.createElement("form",{noValidate:!0,autoComplete:"off"},r.a.createElement(R.a,{variant:"outlined",style:{width:"40%"}},r.a.createElement(Z.a,{id:"demo-simple-select-outlined-label",disabled:!0},"Plant Hardiness Zone"),r.a.createElement(M.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",onChange:function(){},disabled:!0},r.a.createElement(P.a,{value:""},r.a.createElement("em",null,"None")),r.a.createElement(P.a,{value:0},"Zone 2 and 3"),r.a.createElement(P.a,{value:1},"Zone 4"),r.a.createElement(P.a,{value:2},"Zone 5"),r.a.createElement(P.a,{value:3},"Zone 6"),r.a.createElement(P.a,{value:4},"Zone 7"))),"\xa0\xa0",r.a.createElement(D.a,{value:""===e.state.address?"":e.state.address,id:"locationAddress",label:"Location",variant:"outlined",style:{width:"40%"},onChange:e.handleAddressChangeByText}),e.state.showAddressChangeBtn?r.a.createElement(U,{style:{marginLeft:"15px",marginTop:"5px"},onClick:e.updateAddressOnClick},"Update"):"")),r.a.createElement(j.a,{item:!0,md:6},r.a.createElement(S.a,{style:{height:"100%",width:"100%"},center:e.state.markers[0],zoom:e.state.zoom,minZoom:3,maxZoom:20,onClick:e.addMarker,ref:e.myMap},r.a.createElement(N.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?"}),e.state.markers.map((function(t,a){return r.a.createElement(x.a,{key:"marker-".concat(a),position:t},r.a.createElement(O.a,null,r.a.createElement("span",null,e.state.address)))}))))));case 2:return r.a.createElement(i.f,{fluid:!0,className:"secondStepContainer"},r.a.createElement(i.p,null,r.a.createElement(i.e,{md:"6",sm:"12"}," ",r.a.createElement(i.p,{className:"case2FirstRow"},r.a.createElement(i.e,{md:"4",sm:"12"},r.a.createElement(S.a,{style:{width:"100%",height:"100%"},center:e.state.markers[0],zoom:e.state.zoom,minZoom:14,maxZoom:20,onClick:e.addMarker,ref:e.myMap},r.a.createElement(N.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?"}),e.state.markers.map((function(t,a){return r.a.createElement(x.a,{key:"marker-".concat(a),position:t},r.a.createElement(O.a,null,r.a.createElement("span",null,e.state.address)))})))),r.a.createElement(i.e,{md:"8",sm:"12"},r.a.createElement("h2",null,"Location Details"),r.a.createElement("div",null,"Your cover crop recommendations will come from the Plant Hardiness"," ",r.a.createElement(i.g,{className:"zoneDrowdown",size:"sm"},r.a.createElement(i.j,{caret:!0,color:"primary"},void 0!==e.state.zoneText?"".concat(e.state.zoneText):"Zone 7"),r.a.createElement(i.i,null,r.a.createElement(i.h,{header:!0},"Zones"),r.a.createElement(i.h,null,"Zone 2 & 3"),r.a.createElement(i.h,null,"Zone 4"),r.a.createElement(i.h,null,"Zone 5"),r.a.createElement(i.h,null,"Zone 6"),r.a.createElement(i.h,null,"Zone 7"))),"NECC Dataset")),r.a.createElement(i.e,{size:"12",className:"mt-3"},r.a.createElement(D.a,{value:e.state.address,style:{width:"100%"},label:"Location",variant:"outlined",disabled:!0})),r.a.createElement(i.e,{size:"12",className:"mt-3"},r.a.createElement("p",null,"Disclaimer: Cover crop recommendations are based omn expert opitions. Your cover crop performance will vary based on location, management, cultivars, and many other variables. Consult an"," ",r.a.createElement("a",{href:"https://google.com",target:"_blank",rel:"noopener noreferrer"},"NRCS Extension Expert")," ","for detailed guidance.")))),r.a.createElement(i.e,{size:"6"},r.a.createElement("h2",null,"Weather Conditions? "),r.a.createElement("p",null,b(20,20)," Historical Weather Data"),r.a.createElement("p",null,"Average Frost Dates"),r.a.createElement("p",null,"Average Precipitation"),r.a.createElement("p",null,"Frost Free Days"))));case 3:return r.a.createElement(i.f,{fluid:!0,className:"thirdStepContainer"},r.a.createElement(i.p,{className:"case3FirstRow",sm:12},r.a.createElement("h1",null,"What are your cover cropping goals")),r.a.createElement(i.p,{sm:12,className:"case3SecondRow"},r.a.createElement("p",null,"Select upto three. Hover for more information")),r.a.createElement(i.p,{className:"case3ThirdRow mt-4 mb-4"},e.state.allGoals.map((function(t,a){if(!t.fields["Cover Crop Goal"].startsWith("TBD"))return r.a.createElement(i.e,{size:"auto"},r.a.createElement(L.a,{title:r.a.createElement("div",{className:"tooltipText"},t.fields.Description),interactive:!0,arrow:!0},r.a.createElement(W.a,{label:t.fields["Cover Crop Goal"].toUpperCase(),onClick:function(){var n=Object(w.a)(e.state.selectedGoals);if(-1===n.indexOf(t.fields["Cover Crop Goal"]))e.setState({selectedGoals:[].concat(Object(w.a)(e.state.selectedGoals),[t.fields["Cover Crop Goal"]])}),document.getElementById("chip".concat(a)).classList.add("active");else{var r=n.indexOf(t.fields["Cover Crop Goal"]);n.splice(r,1),e.setState({selectedGoals:n}),document.getElementById("chip".concat(a)).classList.remove("active")}},clickable:!0,variant:"outlined",className:"chip",id:"chip".concat(a),size:"medium"})))}))));default:return"non handled case"}},e.isValid=function(){return 3===e.state.progress&&e.state.selectedGoals.length<3},e.progressBar=function(){return r.a.createElement(i.f,{className:"progressContainer"},r.a.createElement(i.p,{md:"12"},r.a.createElement(i.e,{md:"4"},r.a.createElement(U,{onClick:function(){e.setWellProgress(e.state.progress-1),e.setLocalStorage(e.state)}},"Back"),r.a.createElement(U,{disabled:e.isValid(),style:{marginLeft:"3px"},onClick:function(){e.setWellProgress(e.state.progress+1),e.setLocalStorage(e.state)}},"Next")),r.a.createElement(i.e,{md:"4",className:"offset-md-4"},r.a.createElement("div",{className:"progress"},r.a.createElement("div",{className:"progress-track"}),r.a.createElement("div",{id:"step1",className:"progress-step",style:1!==e.state.progress?{backgroundColor:"#f0f7eb",color:"black"}:{backgroundColor:"#8abc62"}}),r.a.createElement("div",{id:"step2",className:"progress-step",style:2!==e.state.progress?{backgroundColor:"#f0f7eb",color:"black"}:{backgroundColor:"#8abc62"}}),r.a.createElement("div",{id:"step3",className:"progress-step",style:3!==e.state.progress?{backgroundColor:"#f0f7eb",color:"black"}:{backgroundColor:"#8abc62"}}),r.a.createElement("div",{id:"step4",className:"progress-step",style:4!==e.state.progress?{backgroundColor:"#f0f7eb",color:"black"}:{backgroundColor:"#8abc62"}})))),r.a.createElement(i.p,{md:"12"},r.a.createElement(i.e,{md:"4",className:"offset-md-8",style:{textAlign:"center"}},r.a.createElement("p",null,"Question ",e.state.progress," of 4"))))},e.snackBar=function(){return r.a.createElement(I.a,{anchorOrigin:{vertical:e.state.snackVertical,horizontal:e.state.snackHorizontal},key:{vertical:e.state.snackVertical,horizontal:e.state.snackHorizontal},autoHideDuration:5e3,open:e.state.snackOpen,onClose:e.handleSnackClose,ContentProps:{"aria-describedby":"message-id"},message:e.state.snackMessage})},e.state={progress:0,address:"Enter Address",markers:[[39.03,-76.92]],showAddressChangeBtn:!1,allGoals:[],selectedGoals:[],zoom:13,addressVerified:!1,snackOpen:!1,snackVertical:"bottom",snackHorizontal:"center",snackMessage:""},e}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setLocalStorage("stepperState",this.state);var t=new Headers;t.append("Authorization","Bearer keywdZxSD9AC4vL6e"),fetch("https://api.airtable.com/v0/appC47111lCOTaMYe/Cover%20Crop%20Goals?maxRecords=300",{headers:t}).then((function(e){return e.json()})).then((function(t){e.setState({allGoals:t.records})}))}},{key:"setLocalStorage",value:function(e){localStorage.setItem("stepperState",JSON.stringify(e))}},{key:"setWellProgress",value:function(e){2===e?this.state.addressVerified?this.setState({progress:e}):this.setState({snackOpen:!0,snackMessage:"Please select a valid address first!"}):this.setState({progress:e}),console.log(e)}},{key:"isParent",value:function(){return 0===this.state.progress}},{key:"render",value:function(){return r.a.createElement("div",{className:"",style:{width:"100%",minHeight:"50vh"}},this.renderProgress(),0!==this.state.progress?this.progressBar():"",this.snackBar())}}]),t}(n.Component),V="/images/neccc_wide_logo_color_web.jpg";var F=function(){return r.a.createElement("div",null,r.a.createElement(l.a,{component:"div",className:"mainContainer"},r.a.createElement(y,{logoPath:"".concat(V)}),r.a.createElement(H,null)),r.a.createElement(m,null))},J=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function _(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}a(129),a(130),a(131),a(132);s.a.render(r.a.createElement(F,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");J?(!function(e,t){fetch(e).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):_(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):_(t,e)}))}}()},96:function(e,t,a){e.exports=a(133)}},[[96,1,2]]]);
//# sourceMappingURL=main.aad2765a.chunk.js.map