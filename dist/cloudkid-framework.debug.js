/*! CloudKidFramework 0.0.1 */
!function(a){"use strict";var b={};Function.prototype.bind||(b.bind=Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=Array.prototype.slice.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(Array.prototype.slice.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(Array.prototype.slice.call(arguments)))};return d});for(var c=["ms","moz","webkit","o"],d=0;d<c.length&&!a.requestAnimationFrame;++d)a.requestAnimationFrame=a[c[d]+"RequestAnimationFrame"],a.cancelAnimationFrame=a[c[d]+"CancelAnimationFrame"]||a[c[d]+"CancelRequestAnimationFrame"];if(!a.requestAnimationFrame){var e=0;a.requestAnimationFrame=function(b){var c=f(),d=Math.max(0,16-(c-e)),g=a.setTimeout(function(){b(c+d)},d);return e=c+d,g},a.cancelAnimationFrame=function(a){clearTimeout(a)}}b.requestAnimationFrame=a.requestAnimationFrame,a.requestAnimFrame=a.requestAnimationFrame,b.cancelAnimationFrame=a.cancelAnimationFrame;var f=a.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);f=f?f.bind(performance):Date.now?Date.now.bind(Date):function(){return(new Date).getTime()},b.now=f,namespace("cloudkid").FunctionUtils=b}(window),function(a,b){"use strict";function c(a){return null===a?String(a):"object"==typeof a||"function"==typeof a?Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof a}var d=function(){},e=d.prototype;e._listeners=[],e.trigger=function(a,c){if(this._listeners[a]!==b)for(var d=this._listeners[a],e=0,f=d.length;f>e;e++)d[e](c)},e.on=function(a,b){if("object"===c(a))for(var d in a)a.hasOwnProperty(d)&&this.on(d,a[d]);else if("function"===c(b))for(var e=a.split(" "),f=null,g=0,h=e.length;h>g;g++)f=e[g],this._listeners[f]=this._listeners[f]||[],-1===this._listeners[f].indexOf(b)&&this._listeners[f].push(b);else if("array"===c(b))for(var i=0,j=b.length;j>i;i++)this.on(a,b[i]);return this},e.off=function(a,d){if(a===b)this._listeners=[];else if("array"===c(d))for(var e=0,f=d.length;f>e;e++)this.off(a,d[e]);else for(var g=a.split(" "),h=null,i=0,j=g.length;j>i;i++)if(h=g[i],this._listeners[h]=this._listeners[h]||[],d===b)this._listeners[h].length=0;else{var k=this._listeners[h].indexOf(d);-1!==k&&this._listeners[h].splice(k,1)}return this},e.has=function(a,b){if(!a||!b)return!1;var c=this._listeners[n];return c?c.indexOf(b)>=0:!1},namespace("cloudkid").EventDispatcher=d}(window),function(){var a=function(a){if(z)throw"Only one Application can be opened at a time";z=this,this.options=a||{},this.display=null,p={},g=this._tick.bind(this),this._internalInit()},b=a.prototype=Object.create(cloudkid.EventDispatcher.prototype);a._globalInit=[],a._globalDestroy=[];var c=null,d=0,e=0,f=0,g=null,h=!1,i=-1,j=!1,k=0,l=0,m=null,n=1,o=null,p=null,q={raf:!0,fps:60,resizeElement:null,queryStringParameters:!1,debug:!1,minLogLevel:0,ip:null,canvasId:null,display:null,displayOptions:null},r={width:0,height:0},s="init",t="update",u="resize",v="pause",w="paused",x="resumed",y="destroy";a.registerInit=function(b){a._globalInit.push(b)},a.registerDestroy=function(b){a._globalDestroy.push(b)};var z=null;Object.defineProperty(a,"instance",{get:function(){return z}}),b._internalInit=function(){this.options.queryStringParameters&&A(this.options);for(var b in q)this.options.hasOwnProperty(b)||(this.options[b]=q[b]);for(var d=0;d<a._globalInit.length;++d)a._globalInit[d]();j=this.options.raf,this.fps=this.options.fps;var e=this.options.framerate;e&&(c="string"==typeof e?document.getElementById(e):e);var f=this.options.resizeElement;f&&(m="string"==typeof f?document.getElementById(e):e,this._resize=this._resize.bind(this),m.addEventListener("resize",this._resize)),void 0!==this.options.debug&&(Debug.enabled=this.options.debug===!0||"true"===this.options.debug),void 0!==this.options.minLogLevel&&(Debug.minLogLevel=parseInt(this.options.minLogLevel,10)),"string"==typeof this.options.ip&&Debug.connect(this.options.ip),o=new cloudkid.PageVisibility(this._onVisible.bind(this),this._onHidden.bind(this)),this.options.canvasId&&this.options.display&&this.addDisplay(this.options.canvasId,this.options.display,this.options.displayOptions);var g=function(){this.init&&this.init(),this.trigger(s),this._resize(),this.paused=!1}.bind(this);void 0!==this.options.versionsFile?cloudkid.MediaLoader.instance.cacheManager.addVersionsFile(this.options.versionsFile,g):g()};var A=function(a){var b=window.location.search;if(!b)return a;var c=b.substr(b.indexOf("?")+1),d=c.indexOf("#");c=0>d?c:c.substring(0,d);for(var e,f=c.split("&"),g=0;g<f.length;g++)e=f[g].split("="),Debug.log(e[0]+" -> "+e[1]),a[e[0]]=e[1];return a};b.init=null,b._onHidden=function(){this.paused=!0},b._onVisible=function(){this.paused=!1},Object.defineProperty(b,"paused",{get:function(){return h},set:function(a){h=!!a,this.trigger(v,h),this.trigger(h?w:x,h),h?-1!=i&&(j?cancelAnimationFrame(i):clearTimeout(i),i=-1):(-1==i&&(i=j?requestAnimFrame(g):B(g)),e=d=cloudkid.FunctionUtils.now())}});var B=function(a,b){var c=l;return b&&(c=Math.max(0,l-b)),setTimeout(a,c)};b._resize=function(){if(m){r.width=0|m.innerWidth,r.height=0|m.innerHeight,this.calculateDisplaySize(r),r.width|=0,r.height|=0;for(var a in p)p[a].resize(r.width,r.height);this.trigger(u,r.width,r.height)}},b.calculateDisplaySize=function(a){a.width/a.height<n?a.height=a.width/n:a.width=a.height*n},b.addDisplay=function(a,b,c){if(p[a])return void Debug.error("A display already exists with the id of "+a);var d=p[a]=new b(a,c);return this.display||(this.display=d,n=d.width/d.height),d},b.getDisplay=function(a){return p[a]},b.getDisplays=function(){var a=[];for(var b in p)a.push(p[b]);return a},b.removeDisplay=function(a){var b=p[a];b&&(b.destroy(),delete p[a])},Object.defineProperty(b,"fps",{get:function(){return k},set:function(a){"number"==typeof a&&(k=a,l=1e3/k|0)}}),Object.defineProperty(b,"raf",{get:function(){return j},set:function(a){j=!!a}}),b._tick=function(){if(h)return void(i=-1);var a=cloudkid.FunctionUtils.now(),b=a-d;if(c){f++;var k=a-e;if(k>1e3){var l=1e3/k*f;c.innerHTML="FPS: "+Math.round(1e3*l)/1e3,e=a,f=0}}d=a,this.trigger(t,b);for(var m in p)p[m].render(b);i=j?requestAnimFrame(g):B(g,cloudkid.FunctionUtils.now()-d)},b.destroy=function(){this.paused=!0,this.trigger(y);for(var b in p)p[b].destroy();p=null;for(var d=0;d<a._globalDestroy.length;++d)a._globalDestroy[d]();m&&m.removeEventListener("resize",this._resize),c=m=null,o.destroy(),o=null,this._listeners=null,g=null},namespace("cloudkid").Application=a}(),function(a,b,c){"use strict";var d=function(a,b){this.initialize(a,b)},e=d.prototype,f=null;e._onFocus=null,e._onBlur=null,e._onToggle=null,b.hidden!==c?f="visibilitychange":b.mozHidden!==c?f="mozvisibilitychange":b.msHidden!==c?f="msvisibilitychange":b.webkitHidden!==c&&(f="webkitvisibilitychange"),e.initialize=function(c,d){if(f){this._onBlur=d,this._onFocus=c;var e=function(){b.hidden||b.webkitHidden||b.msHidden||b.mozHidden?d():c()};b.addEventListener(f,e,!1),a.addEventListener("pagehide",d),a.addEventListener("pageshow",c),a.addEventListener("blur",d),a.addEventListener("focus",c),a.addEventListener("visibilitychange",e,!1),this._onToggle=e}},e.destroy=function(){f&&(a.removeEventListener("pagehide",this._onBlur),a.removeEventListener("pageshow",this._onFocus),a.removeEventListener("blur",this._onBlur),a.removeEventListener("focus",this._onFocus),a.removeEventListener("visibilitychange",this._onToggle),b.removeEventListener(f,this._onToggle,!1),this._onFocus=null,this._onBlur=null)},namespace("cloudkid").PageVisibility=d}(window,document),function(a){"use strict";var b=function(){this.initialize()},c=b.prototype={};c._versions=null,c.cacheBust=!1,c.initialize=function(){this._versions=[];var a=cloudkid.Application.instance.options.cacheBust;this.cacheBust=a?"true"===a||a===!0:!1,this.cacheBust&&Debug.log("CacheBust all files is on.")},c.destroy=function(){this._versions=null},c.addVersionsFile=function(a,b,c){Debug.assert(/^.*\.txt$/.test(a),"The versions file must be a *.txt file");var d=cloudkid.MediaLoader.instance;if(this.cacheBust)return void(b&&b());this.addVersion(a,Math.round(1e5*Math.random()));var e=this;d.load(a,function(a){if(a&&a.content){var d,f,g=a.content.replace(/\r/g,"").split("\n");for(d=0;d<g.length;d++)g[d]&&(f=g[d].split(" "),2==f.length&&e.addVersion((c||"")+f[0],f[1]))}b&&b()})},c.addVersion=function(a,b){var c=this._getVersionByUrl(a);c||this._versions.push({url:a,version:b})},c._getVersionByUrl=function(a){var b,c=this._versions.length;for(b=0;c>b;b++)if(a==this._versions[b].url)return this._versions[b];return null},c.prepare=function(b,c){var d=this._getVersionByUrl(b);if(this.cacheBust&&/(\?|\&)cb\=[0-9]*/.test(b)===!1?(this._cbVal||(this._cbVal=(new Date).getTime().toString()),b=b+(b.indexOf("?")<0?"?":"&")+"cb="+this._cbVal):d&&/(\?|\&)v\=[0-9]*/.test(b)===!1&&(b=b+(b.indexOf("?")<0?"?":"&")+"v="+d.version),c){var e=cloudkid.Application.instance.options.basePath;/^http(s)?\:/.test(b)===!1&&e!==a&&-1==b.search(e)&&(b=e+b)}return b},namespace("cloudkid").CacheManager=b}(),function(){"use strict";var a=function(){},b=a.prototype;a.PRIORITY_HIGH=1,a.PRIORITY_NORMAL=0,a.PRIORITY_LOW=-1,b.url=null,b.data=null,b.callback=null,b.priority=0,b.progress=0,b.updateCallback=null,b._boundFail=null,b._boundProgress=null,b._boundComplete=null,b.toString=function(){return"[LoaderQueueItem(url:'"+this.url+"', priority:"+this.priority+")]"},b.destroy=function(){this.callback=null,this.updateCallback=null,this.data=null,this._boundFail=null,this._boundProgress=null,this._boundComplete=null},namespace("cloudkid").LoaderQueueItem=a}(),function(){"use strict";var a=function(){},b=a.prototype;a._instance=null;var c=null,d=null,e=null,f=null,g=null,h=null,j=0,k=null;b._canLoad=!0,b.maxSimultaneousLoads=2,b.cacheManager=null,a.init=function(){return a._instance||(a._instance=new a,a._instance._initialize(),cloudkid.Application.registerDestroy(a._instance.destroy.bind(a._instance))),a._instance},cloudkid.Application.registerInit(a.init),Object.defineProperty(a,"instance",{get:function(){if(!a._instance)throw"Call cloudkid.MediaLoader.init()";return a._instance}}),b.destroy=function(){var b,i,j,l=this.queue;if(l){for(b=0,i=l.length;b>b;++b)l[b].destroy();for(l=f,b=0,i=l.length;b>b;++b)l[b].destroy();for(l=h,b=0,i=l.length;b>b;++b)l[b].destroy();for(j in e)d[j].destroy(),e[j].close()}a._instance=null,this.cacheManager&&this.cacheManager.destroy(),this.cacheManager=null,c=null,h=null,g=null,f=null,d=null,k=null,e=null},b._initialize=function(){f=[],g=[],h=[],c=[],d={},e={},k={},this.cacheManager=new cloudkid.CacheManager},b.load=function(a,b,d,e,f){var g=this._getQI(),h=cloudkid.Application.instance.options.basePath;void 0!==h&&/^http(s)?\:/.test(a)===!1&&-1==a.search(h)&&(g.basePath=h),g.url=a,g.callback=b,g.updateCallback=d||null,g.priority=e||cloudkid.LoaderQueueItem.PRIORITY_NORMAL,g.data=f||null,c.push(g),c.sort(function(a,b){return a.priority-b.priority}),this._tryNextLoad()},b._onLoadFailed=function(a,b){Debug.error("Unable to load file: "+a.url+" - reason: "+b.error);var f=e[a.url];f.removeAllEventListeners(),f.close(),this._poolLoader(f),delete d[a.url],delete e[a.url],k[a.url]?k[a.url]++:k[a.url]=1,k[a.url]>3?this._loadDone(a,null):(j--,c.push(a),this._tryNextLoad())},b._onLoadProgress=function(a,b){a.progress=b.progress,a.updateCallback&&a.updateCallback(a.progress)},b._onLoadCompleted=function(a,b){Debug.log("File loaded successfully from "+a.url);var c=e[a.url];c.removeAllEventListeners(),c.close(),this._poolLoader(c),delete d[a.url],delete e[a.url],this._loadDone(a,this._getResult(b.result,a.url,c))},b._tryNextLoad=function(){if(!(j>this.maxSimultaneousLoads-1||0===c.length)){j++;var a=c.shift();Debug.log("Attempting to load file '"+a.url+"'"),d[a.url]=a;var b=this._getLoader(a.basePath);e[a.url]=b,b.addEventListener("fileload",a._boundComplete),b.addEventListener("error",a._boundFail),b.addEventListener("fileprogress",a._boundProgress);var f=this.cacheManager.prepare(a.url);b.loadFile(a.data?{id:a.data.id,src:f,data:a.data}:f)}},b._loadDone=function(a,b){j--,a.data&&b&&(b.id=a.data.id),a.callback(b),this._poolQI(a),this._tryNextLoad()},b.cancel=function(a){var b=d[a],f=e[a];if(b&&f)return f.close(),delete e[a],delete d[b.url],j--,this._poolLoader(f),this._poolQI(b),!0;for(i=0,len=c.length;len>i;i++)if(b=c[i],b.url==a)return c.splice(i,1),this._poolQI(b),!0;return!1},b._getQI=function(){var a;return f.length?a=f.pop():(a=new cloudkid.LoaderQueueItem,a._boundFail=this._onLoadFailed.bind(this,a),a._boundProgress=this._onLoadProgress.bind(this,a),a._boundComplete=this._onLoadCompleted.bind(this,a)),a},b._poolQI=function(a){f.push(a),a.callback=a.updateCallback=a.data=a.url=null,a.progress=0},b._getLoader=function(a){var b;return g.length?(b=g.pop(),b._basePath=a):b=new createjs.LoadQueue(!0,a),createjs.Sound&&b.installPlugin(createjs.Sound),b},b._poolLoader=function(a){a.removeAll(),g.push(a)},b._getResult=function(a,b,c){var d;return h.length?(d=h.pop(),d.content=a,d.url=b,d.loader=c):d=new cloudkid.MediaLoaderResult(a,b,c),d},b._poolResult=function(a){a.content=a.url=a.loader=a.id=null,h.push(a)},namespace("cloudkid").MediaLoader=a}(),function(){"use strict";var a=function(a,b,c){this.content=a,this.url=b,this.loader=c},b=a.prototype;b.content=null,b.url=null,b.loader=null,b.toString=function(){return"[MediaLoaderResult('"+this.url+"')]"},b.destroy=function(){this.callback=null,this.url=null,this.content=null},namespace("cloudkid").MediaLoaderResult=a}(),function(){"use strict";var a=function(a,b,c,d){b[c]?b[d]=a:a()};a.create=function(b,c,d,e){return a.bind(this,b,c,d,e)},namespace("cloudkid").CombinedCallback=a}(),function(a){"use strict";var b=function(b,c,d,e){this._callback=b,this._delay=c,this._timer=c,this._repeat=!!d,this._autoDestroy=e===a?!0:!!e,this._paused=!1,this._update=this._update.bind(this),cloudkid.Application.instance.on("update",this._update)},c=b.prototype;c._update=function(a){return this._callback?(this._timer-=a,void(this._timer<=0&&(this._callback(),this._repeat?this._timer+=this._delay:this._autoDestroy?this.destroy():cloudkid.Application.instance.off("update",this._update)))):void this.destroy()},c.restart=function(){if(this._callback){var a=cloudkid.Application.instance;a.has("update",this._update)||a.on("update",this._update),this._timer=this._delay,this._paused=!1}},c.stop=function(){cloudkid.Application.instance.off("update",this._update),this._paused=!1},Object.defineProperty(c,"paused",{get:function(){return this._paused},set:function(a){if(this._callback){var b=cloudkid.Application.instance;this._paused&&!a?(this._paused=!1,b.has("update",this._update)||b.on("update",this._update)):a&&b.has("update",this._update)&&(this._paused=!0,b.off("update",this._update))}}}),c.destroy=function(){cloudkid.Application.instance.removeUpdateCallback(this._updateId),this._callback=null},namespace("cloudkid").DelayedCall=b}(),function(){"use strict";var a={},b="undefined"!=typeof window.Storage,c=-1;if(b)try{localStorage.setItem("LS_TEST","test"),localStorage.removeItem("LS_TEST")}catch(d){b=!1}a.remove=function(d){b?(localStorage.removeItem(d),sessionStorage.removeItem(d)):a.write(d,"",c)},a.write=function(a,d,e){if(b)e?sessionStorage.setItem(a,JSON.stringify(d)):localStorage.setItem(a,JSON.stringify(d));else{var f;f=e?e!==c?"":"; expires=Thu, 01 Jan 1970 00:00:00 GMT":"; expires="+new Date(2147483646e3).toGMTString(),document.cookie=a+"="+escape(JSON.stringify(d))+f+"; path=/"}},a.read=function(a){if(b){var c=localStorage.getItem(a)||sessionStorage.getItem(a);return c?JSON.parse(c):null}var d,e=a+"=",f=document.cookie.split(";"),g=0;for(g=0;g<f.length;g++){for(d=f[g];" "==d.charAt(0);)d=d.substring(1,d.length);if(0===d.indexOf(e))return JSON.parse(unescape(d.substring(e.length,d.length)))}return null},namespace("cloudkid").SavedData=a}(),function(){"use strict";window.URL=window.URL||window.webkitURL,window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder;var Worker={};Worker.init=function(a){if(!window.URL||!window.Worker)return new FallbackWorker(a);var b;try{b=new Blob([a],{type:"application/javascript"})}catch(c){if(!window.BlobBuilder)return new FallbackWorker(a);try{b=new BlobBuilder,b.append(a),b=b.getBlob()}catch(d){return new FallbackWorker(a)}}if(!b)return new FallbackWorker(a);try{var e=new Worker(URL.createObjectURL(b));return e}catch(c){return new FallbackWorker(a)}},namespace("cloudkid").createWorker=Worker.init,namespace("cloudkid").Worker=Worker;var SubWorker=function(codeString,parent){this._wParent=parent,eval(codeString)},p=SubWorker.prototype;p.onmessage=null,p._wParent=null,p.postMessage=function(a){var b=this._wParent;setTimeout(b.onmessage.bind(b,{data:a}),1)};var FallbackWorker=function(a){this._wChild=new SubWorker(a,this)};p=FallbackWorker.prototype,p.postMessage=function(a){var b=this._wChild;setTimeout(b.onmessage.bind(b,{data:a}),1)},p.terminate=function(){this.onmessage=null;var a=this._wChild;a._wParent=null,a.onmessage=null,this._wChild=null},p.onmessage=null,p._wChild=null}();