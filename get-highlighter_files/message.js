if(!window.dhtmlx)window.dhtmlx={};(function(){function a(a,b){var d=a.callback;c(false);a.box.parentNode.removeChild(a.box);m=a.box=null;if(d)d(b)}function b(b){if(m){b=b||event;var c=b.which||event.keyCode;if(dhtmlx.message.keyboard){if(c==13||c==32)a(m,true);if(c==27)a(m,false)}if(b.preventDefault)b.preventDefault();return!(b.cancelBubble=true)}}function c(a){if(!c.cover){c.cover=document.createElement("DIV");c.cover.onkeydown=b;c.cover.className="dhx_modal_cover";document.body.appendChild(c.cover)}var d=document.body.scrollHeight;c.cover.style.display=a?"inline-block":"none"}function d(a,b){return"<div class='dhtmlx_popup_button' result='"+b+"' ><div>"+a+"</div></div>"}function e(a,b){var c=document.getElementById(b)||document.body;if(!n.area){n.area=document.createElement("DIV");n.area.className="dhtmlx_message_area";n.area.style[n.position]="0px";var d=c.firstChild;while(d.nodeType!==1){d=d.nextSibling}c.insertBefore(n.area,d)}n.hide(a.id);var e=document.createElement("DIV");e.innerHTML="<div>"+a.text+"</div>";e.className="dhtmlx-info dhtmlx-"+a.type;e.onclick=function(){n.hide(a.id);a=null};if(n.position=="bottom"&&n.area.firstChild)n.area.insertBefore(e,n.area.firstChild);else n.area.appendChild(e);var f=Math.abs(Math.floor(((window.innerWidth||document.documentElement.offsetWidth)-n.area.offsetWidth)/2));n.area.style.left=f+"px";var g=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;if(g>c.offsetTop){n.area.style.top="0px";n.area.style.position="fixed"}else{n.area.style.position="absolute";var h=c.offsetTop;n.area.style.top=h+"px"}if(a.expire>0)n.timers[a.id]=window.setTimeout(function(){n.hide(a.id)},a.expire);n.pull[a.id]=e;e=null;return a.id}function f(b,c,e){var f=document.createElement("DIV");f.className=" dhtmlx_modal_box dhtmlx-"+b.type;f.setAttribute("dhxbox",1);var g="";if(b.width)f.style.width=b.width;if(b.height)f.style.height=b.height;if(b.title)g+='<div class="dhtmlx_popup_title">'+b.title+"</div>";g+='<div class="dhtmlx_popup_text"><span>'+(b.content?"":b.text)+'</span></div><div  class="dhtmlx_popup_controls">';if(c)g+=d(b.ok||"OK",true);if(e)g+=d(b.cancel||"Cancel",false);if(b.buttons){for(var h=0;h<b.buttons.length;h++)g+=d(b.buttons[h],h)}g+="</div>";f.innerHTML=g;if(b.content){var i=b.content;if(typeof i=="string")i=document.getElementById(i);if(i.style.display=="none")i.style.display="";f.childNodes[b.title?1:0].appendChild(i)}f.onclick=function(c){c=c||event;var d=c.target||c.srcElement;if(!d.className)d=d.parentNode;if(d.className=="dhtmlx_popup_button"){result=d.getAttribute("result");result=result=="true"||(result=="false"?false:result);a(b,result)}};b.box=f;if(c||e)m=b;return f}function g(a,d,e){var g=a.tagName?a:f(a,d,e);if(!a.hidden)c(true);document.body.appendChild(g);var h=Math.abs(Math.floor(((window.innerWidth||document.documentElement.offsetWidth)-g.offsetWidth)/2));var i=Math.abs(Math.floor(((window.innerHeight||document.documentElement.offsetHeight)-g.offsetHeight)/2));if(a.position=="top")g.style.top="-3px";else g.style.top=i+"px";g.style.left=h+"px";g.onkeydown=b;g.focus();if(a.hidden)dhtmlx.modalbox.hide(g);return g}function h(a){return g(a,true,false)}function i(a){return g(a,true,true)}function j(a){return g(a)}function k(a,b,c){if(typeof a!="object"){if(typeof b=="function"){c=b;b=""}a={text:a,type:b,callback:c}}return a}function l(a,b,c,d,e){if(typeof a!="object")a={text:a,type:c,expire:d,id:e};a.id=a.id||n.uid();a.expire=a.expire||n.expire;return a}var m=null;if(document.attachEvent)document.attachEvent("onkeydown",b);else document.addEventListener("keydown",b,true);dhtmlx.alert=function(){text=k.apply(this,arguments);text.type=text.type||"confirm";return h(text)};dhtmlx.confirm=function(){text=k.apply(this,arguments);text.type=text.type||"alert";return i(text)};dhtmlx.modalbox=function(){text=k.apply(this,arguments);text.type=text.type||"alert";return j(text)};dhtmlx.modalbox.hide=function(a){while(a&&a.getAttribute&&!a.getAttribute("dhxbox"))a=a.parentNode;if(a){a.parentNode.removeChild(a);c(false)}};var n=dhtmlx.message=function(a,b,c,d,f){if(typeof d=="string"){if(d==="long"){d=3e4}else if(d==="medium"){d=1e4}else{d=4e3}}a=l.apply(this,arguments);a.type=a.type||"info";var g=a.type.split("-")[0];switch(g){case"alert":return h(a);case"confirm":return i(a);case"modalbox":return j(a);default:return e(a,b);break}};n.seed=(new Date).valueOf();n.uid=function(){return n.seed++};n.expire=4e3;n.keyboard=true;n.position="top";n.pull={};n.timers={};n.hideAll=function(){for(var a in n.pull)n.hide(a)};n.hide=function(a){var b=n.pull[a];if(b&&b.parentNode){window.setTimeout(function(){b.parentNode.removeChild(b);b=null},2e3);b.className+=" hidden";if(n.timers[a])window.clearTimeout(n.timers[a]);delete n.pull[a]}}})()