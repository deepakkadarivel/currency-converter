(function(e){function n(n){for(var r,a,o=n[0],i=n[1],s=n[2],l=0,f=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&f.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);b&&b(n);while(f.length)f.shift()();return u.push.apply(u,s||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,o=1;o<t.length;o++){var i=t[o];0!==c[i]&&(r=!1)}r&&(u.splice(n--,1),e=a(a.s=t[0]))}return e}var r={},c={app:0},u=[];function a(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=e,a.c=r,a.d=function(e,n,t){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,n){if(1&n&&(e=a(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)a.d(t,r,function(n){return e[n]}.bind(null,r));return t},a.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="/currency-converter/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],i=o.push.bind(o);o.push=n,o=o.slice();for(var s=0;s<o.length;s++)n(o[s]);var b=i;u.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"3d35":function(e,n,t){},"4e40":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("7a23"),c=Object(r["f"])("header",null,[Object(r["f"])("h1",{class:"header"},"Currency Converter")],-1),u={key:0},a={key:1},o={key:2};function i(e,n,t,i,s,b){var l=Object(r["n"])("currency-row"),f=Object(r["n"])("currency-hint");return Object(r["h"])(),Object(r["c"])(r["a"],null,[c,i.isLoading?(Object(r["h"])(),Object(r["c"])("p",u,"Loading ...")):Object(r["d"])("",!0),i.isError?(Object(r["h"])(),Object(r["c"])("p",a,"Data request error, please refresh page.")):(Object(r["h"])(),Object(r["c"])("div",o,[Object(r["f"])("section",null,[Object(r["f"])(l,{options:i.currencyData.options,currency:i.currencyData.baseCurrency,amount:i.currencyData.baseAmount,onOnChangeCurrency:i.changeBaseCurrency,onOnChangeAmount:i.changeBaseAmount},null,8,["options","currency","amount","onOnChangeCurrency","onOnChangeAmount"]),Object(r["f"])(f,{fromCurrency:i.currencyData.baseCurrency,toCurrency:i.currencyData.quoteCurrency,exchangeRate:i.calcBaseToQuoteAmount(1,i.currencyData.exchangeRate)},null,8,["fromCurrency","toCurrency","exchangeRate"])]),Object(r["f"])("section",null,[Object(r["f"])(l,{options:i.currencyData.options,currency:i.currencyData.quoteCurrency,amount:i.currencyData.quoteAmount,onOnChangeCurrency:i.changeQuoteCurrency,onOnChangeAmount:i.changeQuoteAmount},null,8,["options","currency","amount","onOnChangeCurrency","onOnChangeAmount"]),Object(r["f"])(f,{fromCurrency:i.currencyData.quoteCurrency,toCurrency:i.currencyData.baseCurrency,exchangeRate:i.calcQuoteToBaseAmount(1,i.currencyData.exchangeRate)},null,8,["fromCurrency","toCurrency","exchangeRate"])])]))],64)}t("99af"),t("b64b"),t("d3b7");var s=t("2909"),b={BASE_URL:"https://api.exchangeratesapi.io/latest"},l=b;t("a9e3"),t("b680"),t("ac1f"),t("5319");function f(e){return e.replace(/[^0-9.]+/g,"")}function p(e){return Number((Math.floor(1e4*e)/1e4).toFixed(4))}function y(e,n){return p(e*n)}function h(e,n){return p(e/n)}var O=Object(r["p"])("data-v-129fb3c2"),g=O((function(e,n,t,c,u,a){var o=Object(r["n"])("base-input"),i=Object(r["n"])("base-select");return Object(r["h"])(),Object(r["c"])("div",null,[Object(r["f"])(o,{value:t.amount,onOnChange:c.changeAmount},null,8,["value","onOnChange"]),t.currency?(Object(r["h"])(),Object(r["c"])(i,{key:0,value:t.currency,options:t.options,onOnChange:c.changeCurrency},null,8,["value","options","onOnChange"])):Object(r["d"])("",!0)])})),j=Object(r["p"])("data-v-a86c58b6"),d=j((function(e,n,t,c,u,a){return Object(r["h"])(),Object(r["c"])("input",{class:"input",type:"number",value:t.value,onInput:n[1]||(n[1]=function(){return c.numberOnly&&c.numberOnly.apply(c,arguments)})},null,40,["value"])})),m={emits:["onChange"],props:{value:Number},setup:function(e,n){function t(e){var t=f(e.target.value),r=p(t);e.target.value=r,n.emit("onChange",r)}return{numberOnly:t}}};t("9ee8");m.render=d,m.__scopeId="data-v-a86c58b6";var v=m,C=Object(r["p"])("data-v-237e858e"),A=C((function(e,n,t,c,u,a){return Object(r["h"])(),Object(r["c"])("select",{value:t.value,onChange:n[1]||(n[1]=function(){return c.onChange&&c.onChange.apply(c,arguments)})},[(Object(r["h"])(!0),Object(r["c"])(r["a"],null,Object(r["m"])(t.options,(function(e){return Object(r["h"])(),Object(r["c"])("option",{key:e},Object(r["o"])(e),1)})),128))],40,["value"])})),x={emits:["onChange"],props:{options:{type:Array,required:!1,default:function(){return[]}},value:{type:String}},setup:function(e,n){var t=Object(r["l"])("");function c(e){n.emit("onChange",e.target.value)}return{currencyInput:t,onChange:c}}};t("d485");x.render=A,x.__scopeId="data-v-237e858e";var q=x,_={emits:["onChangeCurrency","onChangeAmount"],components:{BaseInput:v,BaseSelect:q},props:{options:{type:Array,required:!1,default:function(){return[]}},currency:{type:String},amount:{type:Number}},setup:function(e,n){function t(e){n.emit("onChangeCurrency",e)}function r(e){n.emit("onChangeAmount",e)}return{changeCurrency:t,changeAmount:r}}};_.render=g,_.__scopeId="data-v-129fb3c2";var R=_,D=Object(r["p"])("data-v-34bd892c");Object(r["j"])("data-v-34bd892c");var B={class:"hint"},S={class:"hint-value"};Object(r["i"])();var w=D((function(e,n,t,c,u,a){return Object(r["h"])(),Object(r["c"])("p",B,[Object(r["e"])(" 1 "+Object(r["o"])(t.fromCurrency)+" = ",1),Object(r["f"])("span",S,Object(r["o"])(t.exchangeRate),1),Object(r["e"])(" "+Object(r["o"])(t.toCurrency),1)])})),k={props:{fromCurrency:{type:String,required:!0},toCurrency:{type:String,required:!0},exchangeRate:{type:Number,required:!0}}};t("a976");k.render=w,k.__scopeId="data-v-34bd892c";var Q=k,I={name:"App",components:{CurrencyRow:R,CurrencyHint:Q},setup:function(){var e=Object(r["l"])(!1),n=Object(r["l"])(!1),t=Object(r["k"])({options:[],rates:{},baseCurrency:"",quoteCurrency:"",amount:1,baseAmount:0,quoteAmount:0,exchangeRate:0});function c(){return e.value=!0,fetch(l.BASE_URL).then((function(e){return e.json()})).then((function(e){var n=Object.keys(e.rates),r=n[0],c=e.rates[r];t.options=[e.base].concat(Object(s["a"])(n)),t.baseCurrency=e.base,t.quoteCurrency=r,a(c)})).catch((function(){return n.value=!0})).then((function(){return e.value=!1}))}function u(){var e=l.BASE_URL+"?base="+t.baseCurrency+"&symbols="+t.quoteCurrency;return fetch(e).then((function(e){return e.json()})).then((function(e){var n=e.rates[t.quoteCurrency];a(n)})).catch((function(){return n.value=!0}))}function a(e){t.exchangeRate=e,t.baseAmount=p(t.amount),t.quoteAmount=y(t.amount,e)}function o(e){t.baseCurrency=e,u()}function i(e){t.quoteCurrency=e,u()}function b(e){t.baseAmount=e,t.quoteAmount=y(e,t.exchangeRate)}function f(e){t.quoteAmount=e,t.baseAmount=h(e,t.exchangeRate)}return Object(r["g"])((function(){return c()})),{isLoading:e,isError:n,currencyData:t,changeBaseCurrency:o,changeQuoteCurrency:i,changeBaseAmount:b,changeQuoteAmount:f,calcBaseToQuoteAmount:y,calcQuoteToBaseAmount:h}}};t("b723");I.render=i;var P=I;Object(r["b"])(P).mount("#app")},"9ee8":function(e,n,t){"use strict";t("c7b0")},a976:function(e,n,t){"use strict";t("3d35")},b723:function(e,n,t){"use strict";t("dbd2")},c7b0:function(e,n,t){},d485:function(e,n,t){"use strict";t("4e40")},dbd2:function(e,n,t){}});
//# sourceMappingURL=app.37157564.js.map