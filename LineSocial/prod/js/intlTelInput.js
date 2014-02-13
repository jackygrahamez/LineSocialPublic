!function(){"use strict";!function(c,e,n,i){function l(a,e){this.element=a,this.options=c.extend({},d,e),this._defaults=d,this.id=o++,this._name=t,this.init()}var t="intlTelInput",o=1,d={preferredCountries:["us","gb"],americaMode:!1,onlyCountries:[],defaultStyling:!0,autoHideDialCode:!0,defaultCountry:""};l.prototype={init:function(){var i=this;if(this.options.onlyCountries.length>0){var l=[],t={};c.each(this.options.onlyCountries,function(a,c){var e=i._getCountryData(c,!0);if(e){l.push(e);var n=e["calling-code"];t[n]?t[n].push(c):t[n]=[c]}}),e.intlData={countries:l,countryCodes:t}}else e.intlData=a;var o=[];c.each(this.options.preferredCountries,function(a,c){var e=i._getCountryData(c,!1);e&&o.push(e)}),this.defaultCountry=this.options.defaultCountry?this._getCountryData(this.options.defaultCountry,!1):o.length?o[0]:intlData.countries[0],this.telInput=c(this.element),this.options.autoHideDialCode||""!==this.telInput.val()||this._resetToDialCode(this.defaultCountry["calling-code"]);var d="intl-tel-input";this.options.defaultStyling&&(d+=" pretty"),this.telInput.wrap(c("<div>",{"class":d}));var s=c("<div>",{"class":"flag-dropdown f16"}).insertBefore(this.telInput),g=c("<div>",{"class":"selected-flag"}).appendTo(s),r=this.defaultCountry.cca2;this.selectedFlagInner=c("<div>",{"class":"flag "+r}).appendTo(g),c("<div>",{"class":"down-arrow"}).appendTo(this.selectedFlagInner),this.countryList=c("<ul>",{"class":"country-list hide"}).appendTo(s),o.length&&(this._appendListItems(o,"preferred"),c("<li>",{"class":"divider"}).appendTo(this.countryList)),this._appendListItems(intlData.countries,""),this.countryListItems=this.countryList.children(".country"),this.countryListItems.first().addClass("active"),this.options.autoHideDialCode&&(this.telInput.focusin(function(){var a=c.trim(i.telInput.val());if(0===a.length){var e=i.selectedFlagInner.attr("class").split(" ")[1],n=i._getCountryData(e,!1);i._resetToDialCode(n["calling-code"])}}),this.telInput.focusout(function(){var a=c.trim(i.telInput.val());if(a.length>0){var e=i._getDialCode(a);"+"+e==a&&i.telInput.val("")}})),this.telInput.keyup(function(){i._updateFlagFromInputVal()}),i._updateFlagFromInputVal(),g.click(function(){if(i.countryList.hasClass("hide")){var a=i.countryList.children(".active");i._highlightListItem(a),i.countryList.removeClass("hide"),i._scrollTo(a);var e=!0;c("html").bind("click.intlTelInput"+i.id,function(){e||i._closeDropdown(),e=!1}),c(n).bind("keydown.intlTelInput"+i.id,function(a){if(38==a.which||40==a.which){a.preventDefault();var e=i.countryList.children(".highlight").first(),n=38==a.which?e.prev():e.next();n.length&&(n.hasClass("divider")&&(n=38==a.which?n.prev():n.next()),i._highlightListItem(n),i._scrollTo(n))}else if(13==a.which){var l=i.countryList.children(".highlight").first();l.length&&i._selectListItem(l)}else if(9==a.which||27==a.which)i._closeDropdown();else if(a.which>=97&&a.which<=122||a.which>=65&&a.which<=90){var t=String.fromCharCode(a.which),o=i.countryListItems.filter(function(){return c(this).text().charAt(0)==t&&!c(this).hasClass("preferred")});if(o.length){var d,s=o.filter(".highlight").first();d=s&&s.next()&&s.next().text().charAt(0)==t?s.next():o.first(),i._highlightListItem(d),i._scrollTo(d)}}})}}),this.countryListItems.mouseover(function(){i._highlightListItem(c(this))}),this.countryListItems.click(function(a){var e=c(a.currentTarget);i._selectListItem(e)})},_updateFlagFromInputVal:function(){var a,e=this,n=!1,i=this._getDialCode(this.telInput.val());if(i){var l=intlData.countryCodes[i];c.each(l,function(a,c){e.selectedFlagInner.hasClass(c)&&(n=!0)}),a=l[0]}else a=this.defaultCountry.cca2;n||this._selectFlag(a)},_resetToDialCode:function(a){var c="1"==a&&this.options.americaMode?"":"+"+a+" ";this.telInput.val(c)},_highlightListItem:function(a){this.countryListItems.removeClass("highlight"),a.addClass("highlight")},_getCountryData:function(c,e){for(var n=e?a.countries:intlData.countries,i=0;i<n.length;i++)if(n[i].cca2==c)return n[i]},_selectFlag:function(a){this.selectedFlagInner.attr("class","flag "+a);var c=this.countryListItems.children(".flag."+a).parent();this.countryListItems.removeClass("active"),c.addClass("active")},_selectListItem:function(a){var c=a.attr("data-country-code");this._selectFlag(c);var e=this._updateNumber(a.attr("data-dial-code"));this.telInput.val(e),this.telInput.focus()},_closeDropdown:function(){this.countryList.addClass("hide"),c(n).unbind("keydown.intlTelInput"+this.id),c("html").unbind("click.intlTelInput"+this.id)},_scrollTo:function(a){var c=this.countryList,e=c.height(),n=c.offset().top,i=n+e,l=a.outerHeight(),t=a.offset().top,o=t+l,d=t-n+c.scrollTop();if(n>t)c.scrollTop(d);else if(o>i){var s=e-l;c.scrollTop(d-s)}},_updateNumber:function(a){var e,n=this.telInput.val(),i="+"+this._getDialCode(n),l="+"+a;return i.length>1?(e=n.replace(i,l),n==i&&(e+=" ")):e=n.length&&"+"!=n.substr(0,1)?l+" "+c.trim(n):l+" ",this.options.americaMode&&"+1 "==e.substring(0,3)&&(e=e.substring(3)),e},_getDialCode:function(a){var e=c.trim(a).split(" ")[0];if("+"==e.substring(0,1))for(var n=e.replace(/\D/g,"").substring(0,4),i=n.length;i>0;i--)if(n=n.substring(0,i),intlData.countryCodes[n])return n;return""},_appendListItems:function(a,e){var n="";c.each(a,function(a,c){n+="<li class='country "+e+"' data-dial-code='"+c["calling-code"]+"' data-country-code='"+c.cca2+"'>",n+="<div class='flag "+c.cca2+"'></div>",n+="<span class='country-name'>"+c.name+"</span>",n+="<span class='dial-code'>+"+c["calling-code"]+"</span>",n+="</li>"}),this.countryList.append(n)},setNumber:function(a){this.telInput.val(a),this._updateFlagFromInputVal()},selectCountry:function(a){if(!this.selectedFlagInner.hasClass(a)&&(this._selectFlag(a),!this.options.autoHideDialCode)){var c=this._getCountryData(a,!1);this._resetToDialCode(c["calling-code"])}}},c.fn[t]=function(a){var e=arguments;if(a===i||"object"==typeof a)return this.each(function(){c.data(this,"plugin_"+t)||c.data(this,"plugin_"+t,new l(this,a))});if("string"==typeof a&&"_"!==a[0]&&"init"!==a){var n;return this.each(function(){var i=c.data(this,"plugin_"+t);i instanceof l&&"function"==typeof i[a]&&(n=i[a].apply(i,Array.prototype.slice.call(e,1)))}),n!==i?n:this}},c.fn[t].getCountryData=function(){return a},c.fn[t].setCountryData=function(c){a=c}}(jQuery,window,document);var a={countries:[{name:"Afghanistan (افغانستان‎)",cca2:"af","calling-code":"93"},{name:"Albania (Shqipëria)",cca2:"al","calling-code":"355"},{name:"Algeria (الجزائر‎)",cca2:"dz","calling-code":"213"},{name:"American Samoa",cca2:"as","calling-code":"1684"},{name:"Andorra",cca2:"ad","calling-code":"376"},{name:"Angola",cca2:"ao","calling-code":"244"},{name:"Anguilla",cca2:"ai","calling-code":"1264"},{name:"Antigua and Barbuda",cca2:"ag","calling-code":"1268"},{name:"Argentina",cca2:"ar","calling-code":"54"},{name:"Armenia (Հայաստան)",cca2:"am","calling-code":"374"},{name:"Aruba",cca2:"aw","calling-code":"297"},{name:"Australia",cca2:"au","calling-code":"61"},{name:"Austria (Österreich)",cca2:"at","calling-code":"43"},{name:"Azerbaijan (Azərbaycan)",cca2:"az","calling-code":"994"},{name:"Bahamas",cca2:"bs","calling-code":"1242"},{name:"Bahrain (البحرين‎)",cca2:"bh","calling-code":"973"},{name:"Bangladesh (বাংলাদেশ)",cca2:"bd","calling-code":"880"},{name:"Barbados",cca2:"bb","calling-code":"1246"},{name:"Belarus (Беларусь)",cca2:"by","calling-code":"375"},{name:"Belgium (België)",cca2:"be","calling-code":"32"},{name:"Belize",cca2:"bz","calling-code":"501"},{name:"Benin (Bénin)",cca2:"bj","calling-code":"229"},{name:"Bermuda",cca2:"bm","calling-code":"1441"},{name:"Bhutan (འབྲུག)",cca2:"bt","calling-code":"975"},{name:"Bolivia",cca2:"bo","calling-code":"591"},{name:"Bosnia and Herzegovina (Босна и Херцеговина)",cca2:"ba","calling-code":"387"},{name:"Botswana",cca2:"bw","calling-code":"267"},{name:"Brazil (Brasil)",cca2:"br","calling-code":"55"},{name:"Brunei",cca2:"bn","calling-code":"673"},{name:"Bulgaria (България)",cca2:"bg","calling-code":"359"},{name:"Burkina Faso",cca2:"bf","calling-code":"226"},{name:"Burundi (Uburundi)",cca2:"bi","calling-code":"257"},{name:"Cambodia (កម្ពុជា)",cca2:"kh","calling-code":"855"},{name:"Cameroon (Cameroun)",cca2:"cm","calling-code":"237"},{name:"Canada",cca2:"ca","calling-code":"1"},{name:"Cape Verde (Kabu Verdi)",cca2:"cv","calling-code":"238"},{name:"Cayman Islands",cca2:"ky","calling-code":"1345"},{name:"Central African Republic (République centrafricaine)",cca2:"cf","calling-code":"236"},{name:"Chad (Tchad)",cca2:"td","calling-code":"235"},{name:"Chile",cca2:"cl","calling-code":"56"},{name:"China (中国)",cca2:"cn","calling-code":"86"},{name:"Colombia",cca2:"co","calling-code":"57"},{name:"Comoros (جزر القمر‎)",cca2:"km","calling-code":"269"},{name:"Congo [DRC] (Jamhuri ya Kidemokrasia ya Kongo)",cca2:"cd","calling-code":"243"},{name:"Congo [Republic] (Congo-Brazzaville)",cca2:"cg","calling-code":"242"},{name:"Cook Islands",cca2:"ck","calling-code":"682"},{name:"Costa Rica",cca2:"cr","calling-code":"506"},{name:"Côte d’Ivoire",cca2:"ci","calling-code":"225"},{name:"Croatia (Hrvatska)",cca2:"hr","calling-code":"385"},{name:"Cuba",cca2:"cu","calling-code":"53"},{name:"Cyprus (Κύπρος)",cca2:"cy","calling-code":"357"},{name:"Czech Republic (Česká republika)",cca2:"cz","calling-code":"420"},{name:"Denmark (Danmark)",cca2:"dk","calling-code":"45"},{name:"Djibouti",cca2:"dj","calling-code":"253"},{name:"Dominica",cca2:"dm","calling-code":"1767"},{name:"Dominican Republic (República Dominicana)",cca2:"do","calling-code":"1809"},{name:"Ecuador",cca2:"ec","calling-code":"593"},{name:"Egypt (مصر‎)",cca2:"eg","calling-code":"20"},{name:"El Salvador",cca2:"sv","calling-code":"503"},{name:"Equatorial Guinea (Guinea Ecuatorial)",cca2:"gq","calling-code":"240"},{name:"Eritrea",cca2:"er","calling-code":"291"},{name:"Estonia (Eesti)",cca2:"ee","calling-code":"372"},{name:"Ethiopia",cca2:"et","calling-code":"251"},{name:"Faroe Islands (Føroyar)",cca2:"fo","calling-code":"298"},{name:"Fiji",cca2:"fj","calling-code":"679"},{name:"Finland (Suomi)",cca2:"fi","calling-code":"358"},{name:"France",cca2:"fr","calling-code":"33"},{name:"French Polynesia (Polynésie française)",cca2:"pf","calling-code":"689"},{name:"Gabon",cca2:"ga","calling-code":"241"},{name:"Gambia",cca2:"gm","calling-code":"220"},{name:"Georgia (საქართველო)",cca2:"ge","calling-code":"995"},{name:"Germany (Deutschland)",cca2:"de","calling-code":"49"},{name:"Ghana (Gaana)",cca2:"gh","calling-code":"233"},{name:"Gibraltar",cca2:"gi","calling-code":"350"},{name:"Greece (Ελλάδα)",cca2:"gr","calling-code":"30"},{name:"Greenland (Kalaallit Nunaat)",cca2:"gl","calling-code":"299"},{name:"Grenada",cca2:"gd","calling-code":"1473"},{name:"Guadeloupe",cca2:"gp","calling-code":"590"},{name:"Guam",cca2:"gu","calling-code":"1671"},{name:"Guatemala",cca2:"gt","calling-code":"502"},{name:"Guernsey",cca2:"gg","calling-code":"44"},{name:"Guinea (Guinée)",cca2:"gn","calling-code":"224"},{name:"Guinea-Bissau (Guiné Bissau)",cca2:"gw","calling-code":"245"},{name:"Guyana",cca2:"gy","calling-code":"592"},{name:"Haiti",cca2:"ht","calling-code":"509"},{name:"Honduras",cca2:"hn","calling-code":"504"},{name:"Hong Kong (香港)",cca2:"hk","calling-code":"852"},{name:"Hungary (Magyarország)",cca2:"hu","calling-code":"36"},{name:"Iceland (Ísland)",cca2:"is","calling-code":"354"},{name:"India (भारत)",cca2:"in","calling-code":"91"},{name:"Indonesia",cca2:"id","calling-code":"62"},{name:"Iran (ایران‎)",cca2:"ir","calling-code":"98"},{name:"Iraq (العراق‎)",cca2:"iq","calling-code":"964"},{name:"Ireland",cca2:"ie","calling-code":"353"},{name:"Isle of Man",cca2:"im","calling-code":"44"},{name:"Israel (ישראל‎)",cca2:"il","calling-code":"972"},{name:"Italy (Italia)",cca2:"it","calling-code":"39"},{name:"Jamaica",cca2:"jm","calling-code":"1876"},{name:"Japan (日本)",cca2:"jp","calling-code":"81"},{name:"Jersey",cca2:"je","calling-code":"44"},{name:"Jordan (الأردن‎)",cca2:"jo","calling-code":"962"},{name:"Kazakhstan (Казахстан)",cca2:"kz","calling-code":"7"},{name:"Kenya",cca2:"ke","calling-code":"254"},{name:"Kiribati",cca2:"ki","calling-code":"686"},{name:"Kuwait (الكويت‎)",cca2:"kw","calling-code":"965"},{name:"Kyrgyzstan",cca2:"kg","calling-code":"996"},{name:"Laos (ສ.ປ.ປ ລາວ)",cca2:"la","calling-code":"856"},{name:"Latvia (Latvija)",cca2:"lv","calling-code":"371"},{name:"Lebanon (لبنان‎)",cca2:"lb","calling-code":"961"},{name:"Lesotho",cca2:"ls","calling-code":"266"},{name:"Liberia",cca2:"lr","calling-code":"231"},{name:"Libya (ليبيا‎)",cca2:"ly","calling-code":"218"},{name:"Liechtenstein",cca2:"li","calling-code":"423"},{name:"Lithuania (Lietuva)",cca2:"lt","calling-code":"370"},{name:"Luxembourg",cca2:"lu","calling-code":"352"},{name:"Macau (澳門)",cca2:"mo","calling-code":"853"},{name:"Macedonia [FYROM] (Македонија)",cca2:"mk","calling-code":"389"},{name:"Madagascar (Madagasikara)",cca2:"mg","calling-code":"261"},{name:"Malawi",cca2:"mw","calling-code":"265"},{name:"Malaysia",cca2:"my","calling-code":"60"},{name:"Maldives",cca2:"mv","calling-code":"960"},{name:"Mali",cca2:"ml","calling-code":"223"},{name:"Malta",cca2:"mt","calling-code":"356"},{name:"Marshall Islands",cca2:"mh","calling-code":"692"},{name:"Martinique",cca2:"mq","calling-code":"596"},{name:"Mauritania (موريتانيا‎)",cca2:"mr","calling-code":"222"},{name:"Mauritius (Moris)",cca2:"mu","calling-code":"230"},{name:"Mexico (México)",cca2:"mx","calling-code":"52"},{name:"Micronesia",cca2:"fm","calling-code":"691"},{name:"Moldova (Republica Moldova)",cca2:"md","calling-code":"373"},{name:"Monaco",cca2:"mc","calling-code":"377"},{name:"Mongolia (Монгол)",cca2:"mn","calling-code":"976"},{name:"Montenegro (Crna Gora)",cca2:"me","calling-code":"382"},{name:"Montserrat",cca2:"ms","calling-code":"1664"},{name:"Morocco (المغرب‎)",cca2:"ma","calling-code":"212"},{name:"Mozambique (Moçambique)",cca2:"mz","calling-code":"258"},{name:"Myanmar [Burma] (မြန်မာ)",cca2:"mm","calling-code":"95"},{name:"Namibia",cca2:"na","calling-code":"264"},{name:"Nauru",cca2:"nr","calling-code":"674"},{name:"Nepal (नेपाल)",cca2:"np","calling-code":"977"},{name:"Netherlands (Nederland)",cca2:"nl","calling-code":"31"},{name:"New Caledonia (Nouvelle-Calédonie)",cca2:"nc","calling-code":"687"},{name:"New Zealand",cca2:"nz","calling-code":"64"},{name:"Nicaragua",cca2:"ni","calling-code":"505"},{name:"Niger (Nijar)",cca2:"ne","calling-code":"227"},{name:"Nigeria",cca2:"ng","calling-code":"234"},{name:"North Korea (조선 민주주의 인민 공화국)",cca2:"kp","calling-code":"850"},{name:"Norway (Norge)",cca2:"no","calling-code":"47"},{name:"Oman (عُمان‎)",cca2:"om","calling-code":"968"},{name:"Pakistan (پاکستان‎)",cca2:"pk","calling-code":"92"},{name:"Palau",cca2:"pw","calling-code":"680"},{name:"Palestine (فلسطين‎)",cca2:"ps","calling-code":"970"},{name:"Panama (Panamá)",cca2:"pa","calling-code":"507"},{name:"Papua New Guinea",cca2:"pg","calling-code":"675"},{name:"Paraguay",cca2:"py","calling-code":"595"},{name:"Peru (Perú)",cca2:"pe","calling-code":"51"},{name:"Philippines",cca2:"ph","calling-code":"63"},{name:"Poland (Polska)",cca2:"pl","calling-code":"48"},{name:"Portugal",cca2:"pt","calling-code":"351"},{name:"Puerto Rico",cca2:"pr","calling-code":"1787"},{name:"Qatar (قطر‎)",cca2:"qa","calling-code":"974"},{name:"Réunion",cca2:"re","calling-code":"262"},{name:"Romania (România)",cca2:"ro","calling-code":"40"},{name:"Russia (Россия)",cca2:"ru","calling-code":"7"},{name:"Rwanda",cca2:"rw","calling-code":"250"},{name:"Saint Kitts and Nevis",cca2:"kn","calling-code":"1869"},{name:"Saint Lucia",cca2:"lc","calling-code":"1758"},{name:"Saint Vincent and the Grenadines",cca2:"vc","calling-code":"1784"},{name:"Samoa",cca2:"ws","calling-code":"685"},{name:"San Marino",cca2:"sm","calling-code":"378"},{name:"São Tomé and Príncipe (São Tomé e Príncipe)",cca2:"st","calling-code":"239"},{name:"Saudi Arabia (المملكة العربية السعودية‎)",cca2:"sa","calling-code":"966"},{name:"Senegal (Sénégal)",cca2:"sn","calling-code":"221"},{name:"Serbia (Србија)",cca2:"rs","calling-code":"381"},{name:"Seychelles",cca2:"sc","calling-code":"248"},{name:"Sierra Leone",cca2:"sl","calling-code":"232"},{name:"Singapore",cca2:"sg","calling-code":"65"},{name:"Slovakia (Slovensko)",cca2:"sk","calling-code":"421"},{name:"Slovenia (Slovenija)",cca2:"si","calling-code":"386"},{name:"Solomon Islands",cca2:"sb","calling-code":"677"},{name:"Somalia (Soomaaliya)",cca2:"so","calling-code":"252"},{name:"South Africa",cca2:"za","calling-code":"27"},{name:"South Korea (대한민국)",cca2:"kr","calling-code":"82"},{name:"Spain (España)",cca2:"es","calling-code":"34"},{name:"Sri Lanka (ශ්‍රී ලංකාව)",cca2:"lk","calling-code":"94"},{name:"Sudan (السودان‎)",cca2:"sd","calling-code":"249"},{name:"Suriname",cca2:"sr","calling-code":"597"},{name:"Swaziland",cca2:"sz","calling-code":"268"},{name:"Sweden (Sverige)",cca2:"se","calling-code":"46"},{name:"Switzerland (Schweiz)",cca2:"ch","calling-code":"41"},{name:"Syria (سوريا‎)",cca2:"sy","calling-code":"963"},{name:"Taiwan (台灣)",cca2:"tw","calling-code":"886"},{name:"Tajikistan",cca2:"tj","calling-code":"992"},{name:"Tanzania",cca2:"tz","calling-code":"255"},{name:"Thailand (ไทย)",cca2:"th","calling-code":"66"},{name:"Timor-Leste",cca2:"tl","calling-code":"670"},{name:"Togo",cca2:"tg","calling-code":"228"},{name:"Tonga",cca2:"to","calling-code":"676"},{name:"Trinidad and Tobago",cca2:"tt","calling-code":"1868"},{name:"Tunisia (تونس‎)",cca2:"tn","calling-code":"216"},{name:"Turkey (Türkiye)",cca2:"tr","calling-code":"90"},{name:"Turkmenistan",cca2:"tm","calling-code":"993"},{name:"Turks and Caicos Islands",cca2:"tc","calling-code":"1649"},{name:"Tuvalu",cca2:"tv","calling-code":"688"},{name:"Uganda",cca2:"ug","calling-code":"256"},{name:"Ukraine (Україна)",cca2:"ua","calling-code":"380"},{name:"United Arab Emirates (الإمارات العربية المتحدة‎)",cca2:"ae","calling-code":"971"},{name:"United Kingdom",cca2:"gb","calling-code":"44"},{name:"United States",cca2:"us","calling-code":"1"},{name:"Uruguay",cca2:"uy","calling-code":"598"},{name:"Uzbekistan (Ўзбекистон)",cca2:"uz","calling-code":"998"},{name:"Vanuatu",cca2:"vu","calling-code":"678"},{name:"Vatican City (Città del Vaticano)",cca2:"va","calling-code":"379"},{name:"Venezuela",cca2:"ve","calling-code":"58"},{name:"Vietnam (Việt Nam)",cca2:"vn","calling-code":"84"},{name:"British Virgin Islands",cca2:"vg","calling-code":"1284"},{name:"U.S. Virgin Islands",cca2:"vi","calling-code":"1340"},{name:"Western Sahara (الصحراء الغربية‎)",cca2:"eh","calling-code":"212"},{name:"Yemen (اليمن‎)",cca2:"ye","calling-code":"967"},{name:"Zambia",cca2:"zm","calling-code":"260"},{name:"Zimbabwe",cca2:"zw","calling-code":"263"}],countryCodes:{1:["us","ca"],7:["ru","kz"],20:["eg"],27:["za"],30:["gr"],31:["nl"],32:["be"],33:["fr"],34:["es"],36:["hu"],39:["it"],40:["ro"],41:["ch"],43:["at"],44:["gb","gg","im","je"],45:["dk"],46:["se"],47:["no","sj"],48:["pl"],49:["de"],51:["pe"],52:["mx"],53:["cu"],54:["ar"],55:["br"],56:["cl"],57:["co"],58:["ve"],60:["my"],61:["au","cc","cx"],62:["id"],63:["ph"],64:["nz"],65:["sg"],66:["th"],81:["jp"],82:["kr"],84:["vn"],86:["cn"],90:["tr"],91:["in"],92:["pk"],93:["af"],94:["lk"],95:["mm"],98:["ir"],211:["ss"],212:["ma","eh"],213:["dz"],216:["tn"],218:["ly"],220:["gm"],221:["sn"],222:["mr"],223:["ml"],224:["gn"],225:["ci"],226:["bf"],227:["ne"],228:["tg"],229:["bj"],230:["mu"],231:["lr"],232:["sl"],233:["gh"],234:["ng"],235:["td"],236:["cf"],237:["cm"],238:["cv"],239:["st"],240:["gq"],241:["ga"],242:["cg"],243:["cd"],244:["ao"],245:["gw"],246:["io"],247:["ac"],248:["sc"],249:["sd"],250:["rw"],251:["et"],252:["so"],253:["dj"],254:["ke"],255:["tz"],256:["ug"],257:["bi"],258:["mz"],260:["zm"],261:["mg"],262:["re","yt"],263:["zw"],264:["na"],265:["mw"],266:["ls"],267:["bw"],268:["sz"],269:["km"],290:["sh"],291:["er"],297:["aw"],298:["fo"],299:["gl"],350:["gi"],351:["pt"],352:["lu"],353:["ie"],354:["is"],355:["al"],356:["mt"],357:["cy"],358:["fi","ax"],359:["bg"],370:["lt"],371:["lv"],372:["ee"],373:["md"],374:["am"],375:["by"],376:["ad"],377:["mc"],378:["sm"],379:["va"],380:["ua"],381:["rs"],382:["me"],385:["hr"],386:["si"],387:["ba"],389:["mk"],420:["cz"],421:["sk"],423:["li"],500:["fk"],501:["bz"],502:["gt"],503:["sv"],504:["hn"],505:["ni"],506:["cr"],507:["pa"],508:["pm"],509:["ht"],590:["gp","bl","mf"],591:["bo"],592:["gy"],593:["ec"],594:["gf"],595:["py"],596:["mq"],597:["sr"],598:["uy"],599:["cw","bq"],670:["tl"],672:["nf"],673:["bn"],674:["nr"],675:["pg"],676:["to"],677:["sb"],678:["vu"],679:["fj"],680:["pw"],681:["wf"],682:["ck"],683:["nu"],685:["ws"],686:["ki"],687:["nc"],688:["tv"],689:["pf"],690:["tk"],691:["fm"],692:["mh"],850:["kp"],852:["hk"],853:["mo"],855:["kh"],856:["la"],880:["bd"],886:["tw"],960:["mv"],961:["lb"],962:["jo"],963:["sy"],964:["iq"],965:["kw"],966:["sa"],967:["ye"],968:["om"],970:["ps"],971:["ae"],972:["il"],973:["bh"],974:["qa"],975:["bt"],976:["mn"],977:["np"],992:["tj"],993:["tm"],994:["az"],995:["ge"],996:["kg"],998:["uz"],1242:["bs"],1246:["bb"],1264:["ai"],1268:["ag"],1284:["vg"],1340:["vi"],1345:["ky"],1441:["bm"],1473:["gd"],1649:["tc"],1664:["ms"],1671:["gu"],1684:["as"],1758:["lc"],1767:["dm"],1784:["vc"],1787:["pr"],1809:["do"],1868:["tt"],1869:["kn"],1876:["jm"]}}}();