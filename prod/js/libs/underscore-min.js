(function(){var e=this,t=e._,i={},n=Array.prototype,s=Object.prototype,a=Function.prototype,o=n.push,r=n.slice,l=n.concat,c=s.toString,u=s.hasOwnProperty,h=n.forEach,d=n.map,p=n.reduce,f=n.reduceRight,g=n.filter,m=n.every,v=n.some,y=n.indexOf,b=n.lastIndexOf,_=Array.isArray,x=Object.keys,w=a.bind,k=function(e){return e instanceof k?e:this instanceof k?(this._wrapped=e,void 0):new k(e)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=k),exports._=k):e._=k,k.VERSION="1.4.4";var C=k.each=k.forEach=function(e,t,n){if(null!=e)if(h&&e.forEach===h)e.forEach(t,n);else if(e.length===+e.length){for(var s=0,a=e.length;a>s;s++)if(t.call(n,e[s],s,e)===i)return}else for(var o in e)if(k.has(e,o)&&t.call(n,e[o],o,e)===i)return};k.map=k.collect=function(e,t,i){var n=[];return null==e?n:d&&e.map===d?e.map(t,i):(C(e,function(e,s,a){n[n.length]=t.call(i,e,s,a)}),n)};var D="Reduce of empty array with no initial value";k.reduce=k.foldl=k.inject=function(e,t,i,n){var s=arguments.length>2;if(null==e&&(e=[]),p&&e.reduce===p)return n&&(t=k.bind(t,n)),s?e.reduce(t,i):e.reduce(t);if(C(e,function(e,a,o){s?i=t.call(n,i,e,a,o):(i=e,s=!0)}),!s)throw new TypeError(D);return i},k.reduceRight=k.foldr=function(e,t,i,n){var s=arguments.length>2;if(null==e&&(e=[]),f&&e.reduceRight===f)return n&&(t=k.bind(t,n)),s?e.reduceRight(t,i):e.reduceRight(t);var a=e.length;if(a!==+a){var o=k.keys(e);a=o.length}if(C(e,function(r,l,c){l=o?o[--a]:--a,s?i=t.call(n,i,e[l],l,c):(i=e[l],s=!0)}),!s)throw new TypeError(D);return i},k.find=k.detect=function(e,t,i){var n;return T(e,function(e,s,a){return t.call(i,e,s,a)?(n=e,!0):void 0}),n},k.filter=k.select=function(e,t,i){var n=[];return null==e?n:g&&e.filter===g?e.filter(t,i):(C(e,function(e,s,a){t.call(i,e,s,a)&&(n[n.length]=e)}),n)},k.reject=function(e,t,i){return k.filter(e,function(e,n,s){return!t.call(i,e,n,s)},i)},k.every=k.all=function(e,t,n){t||(t=k.identity);var s=!0;return null==e?s:m&&e.every===m?e.every(t,n):(C(e,function(e,a,o){return(s=s&&t.call(n,e,a,o))?void 0:i}),!!s)};var T=k.some=k.any=function(e,t,n){t||(t=k.identity);var s=!1;return null==e?s:v&&e.some===v?e.some(t,n):(C(e,function(e,a,o){return s||(s=t.call(n,e,a,o))?i:void 0}),!!s)};k.contains=k.include=function(e,t){return null==e?!1:y&&e.indexOf===y?-1!=e.indexOf(t):T(e,function(e){return e===t})},k.invoke=function(e,t){var i=r.call(arguments,2),n=k.isFunction(t);return k.map(e,function(e){return(n?t:e[t]).apply(e,i)})},k.pluck=function(e,t){return k.map(e,function(e){return e[t]})},k.where=function(e,t,i){return k.isEmpty(t)?i?null:[]:k[i?"find":"filter"](e,function(e){for(var i in t)if(t[i]!==e[i])return!1;return!0})},k.findWhere=function(e,t){return k.where(e,t,!0)},k.max=function(e,t,i){if(!t&&k.isArray(e)&&e[0]===+e[0]&&65535>e.length)return Math.max.apply(Math,e);if(!t&&k.isEmpty(e))return-1/0;var n={computed:-1/0,value:-1/0};return C(e,function(e,s,a){var o=t?t.call(i,e,s,a):e;o>=n.computed&&(n={value:e,computed:o})}),n.value},k.min=function(e,t,i){if(!t&&k.isArray(e)&&e[0]===+e[0]&&65535>e.length)return Math.min.apply(Math,e);if(!t&&k.isEmpty(e))return 1/0;var n={computed:1/0,value:1/0};return C(e,function(e,s,a){var o=t?t.call(i,e,s,a):e;n.computed>o&&(n={value:e,computed:o})}),n.value},k.shuffle=function(e){var t,i=0,n=[];return C(e,function(e){t=k.random(i++),n[i-1]=n[t],n[t]=e}),n};var I=function(e){return k.isFunction(e)?e:function(t){return t[e]}};k.sortBy=function(e,t,i){var n=I(t);return k.pluck(k.map(e,function(e,t,s){return{value:e,index:t,criteria:n.call(i,e,t,s)}}).sort(function(e,t){var i=e.criteria,n=t.criteria;if(i!==n){if(i>n||void 0===i)return 1;if(n>i||void 0===n)return-1}return e.index<t.index?-1:1}),"value")};var $=function(e,t,i,n){var s={},a=I(t||k.identity);return C(e,function(t,o){var r=a.call(i,t,o,e);n(s,r,t)}),s};k.groupBy=function(e,t,i){return $(e,t,i,function(e,t,i){(k.has(e,t)?e[t]:e[t]=[]).push(i)})},k.countBy=function(e,t,i){return $(e,t,i,function(e,t){k.has(e,t)||(e[t]=0),e[t]++})},k.sortedIndex=function(e,t,i,n){i=null==i?k.identity:I(i);for(var s=i.call(n,t),a=0,o=e.length;o>a;){var r=a+o>>>1;s>i.call(n,e[r])?a=r+1:o=r}return a},k.toArray=function(e){return e?k.isArray(e)?r.call(e):e.length===+e.length?k.map(e,k.identity):k.values(e):[]},k.size=function(e){return null==e?0:e.length===+e.length?e.length:k.keys(e).length},k.first=k.head=k.take=function(e,t,i){return null==e?void 0:null==t||i?e[0]:r.call(e,0,t)},k.initial=function(e,t,i){return r.call(e,0,e.length-(null==t||i?1:t))},k.last=function(e,t,i){return null==e?void 0:null==t||i?e[e.length-1]:r.call(e,Math.max(e.length-t,0))},k.rest=k.tail=k.drop=function(e,t,i){return r.call(e,null==t||i?1:t)},k.compact=function(e){return k.filter(e,k.identity)};var S=function(e,t,i){return C(e,function(e){k.isArray(e)?t?o.apply(i,e):S(e,t,i):i.push(e)}),i};k.flatten=function(e,t){return S(e,t,[])},k.without=function(e){return k.difference(e,r.call(arguments,1))},k.uniq=k.unique=function(e,t,i,n){k.isFunction(t)&&(n=i,i=t,t=!1);var s=i?k.map(e,i,n):e,a=[],o=[];return C(s,function(i,n){(t?n&&o[o.length-1]===i:k.contains(o,i))||(o.push(i),a.push(e[n]))}),a},k.union=function(){return k.uniq(l.apply(n,arguments))},k.intersection=function(e){var t=r.call(arguments,1);return k.filter(k.uniq(e),function(e){return k.every(t,function(t){return k.indexOf(t,e)>=0})})},k.difference=function(e){var t=l.apply(n,r.call(arguments,1));return k.filter(e,function(e){return!k.contains(t,e)})},k.zip=function(){for(var e=r.call(arguments),t=k.max(k.pluck(e,"length")),i=Array(t),n=0;t>n;n++)i[n]=k.pluck(e,""+n);return i},k.object=function(e,t){if(null==e)return{};for(var i={},n=0,s=e.length;s>n;n++)t?i[e[n]]=t[n]:i[e[n][0]]=e[n][1];return i},k.indexOf=function(e,t,i){if(null==e)return-1;var n=0,s=e.length;if(i){if("number"!=typeof i)return n=k.sortedIndex(e,t),e[n]===t?n:-1;n=0>i?Math.max(0,s+i):i}if(y&&e.indexOf===y)return e.indexOf(t,i);for(;s>n;n++)if(e[n]===t)return n;return-1},k.lastIndexOf=function(e,t,i){if(null==e)return-1;var n=null!=i;if(b&&e.lastIndexOf===b)return n?e.lastIndexOf(t,i):e.lastIndexOf(t);for(var s=n?i:e.length;s--;)if(e[s]===t)return s;return-1},k.range=function(e,t,i){1>=arguments.length&&(t=e||0,e=0),i=arguments[2]||1;for(var n=Math.max(Math.ceil((t-e)/i),0),s=0,a=Array(n);n>s;)a[s++]=e,e+=i;return a},k.bind=function(e,t){if(e.bind===w&&w)return w.apply(e,r.call(arguments,1));var i=r.call(arguments,2);return function(){return e.apply(t,i.concat(r.call(arguments)))}},k.partial=function(e){var t=r.call(arguments,1);return function(){return e.apply(this,t.concat(r.call(arguments)))}},k.bindAll=function(e){var t=r.call(arguments,1);return 0===t.length&&(t=k.functions(e)),C(t,function(t){e[t]=k.bind(e[t],e)}),e},k.memoize=function(e,t){var i={};return t||(t=k.identity),function(){var n=t.apply(this,arguments);return k.has(i,n)?i[n]:i[n]=e.apply(this,arguments)}},k.delay=function(e,t){var i=r.call(arguments,2);return setTimeout(function(){return e.apply(null,i)},t)},k.defer=function(e){return k.delay.apply(k,[e,1].concat(r.call(arguments,1)))},k.throttle=function(e,t){var i,n,s,a,o=0,r=function(){o=new Date,s=null,a=e.apply(i,n)};return function(){var l=new Date,c=t-(l-o);return i=this,n=arguments,0>=c?(clearTimeout(s),s=null,o=l,a=e.apply(i,n)):s||(s=setTimeout(r,c)),a}},k.debounce=function(e,t,i){var n,s;return function(){var a=this,o=arguments,r=function(){n=null,i||(s=e.apply(a,o))},l=i&&!n;return clearTimeout(n),n=setTimeout(r,t),l&&(s=e.apply(a,o)),s}},k.once=function(e){var t,i=!1;return function(){return i?t:(i=!0,t=e.apply(this,arguments),e=null,t)}},k.wrap=function(e,t){return function(){var i=[e];return o.apply(i,arguments),t.apply(this,i)}},k.compose=function(){var e=arguments;return function(){for(var t=arguments,i=e.length-1;i>=0;i--)t=[e[i].apply(this,t)];return t[0]}},k.after=function(e,t){return 0>=e?t():function(){return 1>--e?t.apply(this,arguments):void 0}},k.keys=x||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var i in e)k.has(e,i)&&(t[t.length]=i);return t},k.values=function(e){var t=[];for(var i in e)k.has(e,i)&&t.push(e[i]);return t},k.pairs=function(e){var t=[];for(var i in e)k.has(e,i)&&t.push([i,e[i]]);return t},k.invert=function(e){var t={};for(var i in e)k.has(e,i)&&(t[e[i]]=i);return t},k.functions=k.methods=function(e){var t=[];for(var i in e)k.isFunction(e[i])&&t.push(i);return t.sort()},k.extend=function(e){return C(r.call(arguments,1),function(t){if(t)for(var i in t)e[i]=t[i]}),e},k.pick=function(e){var t={},i=l.apply(n,r.call(arguments,1));return C(i,function(i){i in e&&(t[i]=e[i])}),t},k.omit=function(e){var t={},i=l.apply(n,r.call(arguments,1));for(var s in e)k.contains(i,s)||(t[s]=e[s]);return t},k.defaults=function(e){return C(r.call(arguments,1),function(t){if(t)for(var i in t)null==e[i]&&(e[i]=t[i])}),e},k.clone=function(e){return k.isObject(e)?k.isArray(e)?e.slice():k.extend({},e):e},k.tap=function(e,t){return t(e),e};var E=function(e,t,i,n){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return e===t;e instanceof k&&(e=e._wrapped),t instanceof k&&(t=t._wrapped);var s=c.call(e);if(s!=c.call(t))return!1;switch(s){case"[object String]":return e==t+"";case"[object Number]":return e!=+e?t!=+t:0==e?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if("object"!=typeof e||"object"!=typeof t)return!1;for(var a=i.length;a--;)if(i[a]==e)return n[a]==t;i.push(e),n.push(t);var o=0,r=!0;if("[object Array]"==s){if(o=e.length,r=o==t.length)for(;o--&&(r=E(e[o],t[o],i,n)););}else{var l=e.constructor,u=t.constructor;if(l!==u&&!(k.isFunction(l)&&l instanceof l&&k.isFunction(u)&&u instanceof u))return!1;for(var h in e)if(k.has(e,h)&&(o++,!(r=k.has(t,h)&&E(e[h],t[h],i,n))))break;if(r){for(h in t)if(k.has(t,h)&&!o--)break;r=!o}}return i.pop(),n.pop(),r};k.isEqual=function(e,t){return E(e,t,[],[])},k.isEmpty=function(e){if(null==e)return!0;if(k.isArray(e)||k.isString(e))return 0===e.length;for(var t in e)if(k.has(e,t))return!1;return!0},k.isElement=function(e){return!(!e||1!==e.nodeType)},k.isArray=_||function(e){return"[object Array]"==c.call(e)},k.isObject=function(e){return e===Object(e)},C(["Arguments","Function","String","Number","Date","RegExp"],function(e){k["is"+e]=function(t){return c.call(t)=="[object "+e+"]"}}),k.isArguments(arguments)||(k.isArguments=function(e){return!(!e||!k.has(e,"callee"))}),"function"!=typeof/./&&(k.isFunction=function(e){return"function"==typeof e}),k.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},k.isNaN=function(e){return k.isNumber(e)&&e!=+e},k.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"==c.call(e)},k.isNull=function(e){return null===e},k.isUndefined=function(e){return void 0===e},k.has=function(e,t){return u.call(e,t)},k.noConflict=function(){return e._=t,this},k.identity=function(e){return e},k.times=function(e,t,i){for(var n=Array(e),s=0;e>s;s++)n[s]=t.call(i,s);return n},k.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))};var N={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};N.unescape=k.invert(N.escape);var M={escape:RegExp("["+k.keys(N.escape).join("")+"]","g"),unescape:RegExp("("+k.keys(N.unescape).join("|")+")","g")};k.each(["escape","unescape"],function(e){k[e]=function(t){return null==t?"":(""+t).replace(M[e],function(t){return N[e][t]})}}),k.result=function(e,t){if(null==e)return null;var i=e[t];return k.isFunction(i)?i.call(e):i},k.mixin=function(e){C(k.functions(e),function(t){var i=k[t]=e[t];k.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),O.call(this,i.apply(k,e))}})};var P=0;k.uniqueId=function(e){var t=++P+"";return e?e+t:t},k.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,F={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;k.template=function(e,t,i){var n;i=k.defaults({},i,k.templateSettings);var s=RegExp([(i.escape||A).source,(i.interpolate||A).source,(i.evaluate||A).source].join("|")+"|$","g"),a=0,o="__p+='";e.replace(s,function(t,i,n,s,r){return o+=e.slice(a,r).replace(j,function(e){return"\\"+F[e]}),i&&(o+="'+\n((__t=("+i+"))==null?'':_.escape(__t))+\n'"),n&&(o+="'+\n((__t=("+n+"))==null?'':__t)+\n'"),s&&(o+="';\n"+s+"\n__p+='"),a=r+t.length,t}),o+="';\n",i.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{n=Function(i.variable||"obj","_",o)}catch(r){throw r.source=o,r}if(t)return n(t,k);var l=function(e){return n.call(this,e,k)};return l.source="function("+(i.variable||"obj")+"){\n"+o+"}",l},k.chain=function(e){return k(e).chain()};var O=function(e){return this._chain?k(e).chain():e};k.mixin(k),C(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=n[e];k.prototype[e]=function(){var i=this._wrapped;return t.apply(i,arguments),"shift"!=e&&"splice"!=e||0!==i.length||delete i[0],O.call(this,i)}}),C(["concat","join","slice"],function(e){var t=n[e];k.prototype[e]=function(){return O.call(this,t.apply(this._wrapped,arguments))}}),k.extend(k.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);