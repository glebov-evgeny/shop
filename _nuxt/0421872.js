(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{349:function(t,o){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"ru":{"dateinfo":"Разработка, продвижение, etc.","fixed_btn":"Задать вопрос"},"en":{"dateinfo":"Development, promotion, etc.","fixed_btn":"Ask something"}}'),delete t.options._Ctor}},379:function(t,o,e){var content=e(380);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(100).default)("3d048eb0",content,!0,{sourceMap:!1})},380:function(t,o,e){var n=e(99)(!1);n.push([t.i,".footer{padding:1.25rem 0;color:var(--color-white);background:var(--color-black)}@media(min-width:768px){.footer{padding:1.25rem 0}}.footer__container{display:flex;justify-content:space-between;align-items:center}.footer__date{font-size:.75rem}.footer__lang{display:flex}.footer__lang-icon{font-size:.75rem}.footer__lang-icon._line{margin:0 .3125rem}.footer__lang-icon._active{font-weight:900}.footer__bottom{position:fixed;left:0;bottom:.625rem;width:100%}@media(min-width:768px){.footer__bottom{display:none}}.footer__bottom-btn{display:flex;justify-content:center;align-items:center;width:calc(100% - 1.875rem);min-height:2.8125rem;margin:0 auto;color:var(--color-black);background-color:var(--color-yellow);border:none;border-radius:var(--border-radius-sm);font-size:1rem;font-weight:900;cursor:pointer}.footer._fixed{padding:1.25rem 0 4rem}@media(min-width:768px){.footer._fixed{padding:1.25rem 0}}",""]),t.exports=n},381:function(t,o,e){"use strict";var n=e(349),r=e.n(n);o.default=r.a},390:function(t,o,e){"use strict";e.r(o);e(379);var n={name:"s-footer",props:{fixedBtn:{type:Boolean}},data:function(){return{}},methods:{fixedBtnHandler:function(){this.$emit("fixedBtnHandler")}}},r=e(65),l=e(381),component=Object(r.a)(n,(function(){var t=this,o=t._self._c;return o("footer",{staticClass:"footer",class:t.fixedBtn?"_fixed":""},[o("div",{staticClass:"container footer__container"},[o("p",{staticClass:"footer__date"},[t._v("© "+t._s((new Date).getFullYear())+". "+t._s(t.$t("dateinfo")))]),t._v(" "),o("div",{staticClass:"footer__lang"},[o("nuxt-link",{staticClass:"footer__lang-icon _active",attrs:{to:t.switchLocalePath("ru")}},[t._v("Ru")]),t._v(" "),o("span",{staticClass:"footer__lang-icon _line"},[t._v("/")]),t._v(" "),o("nuxt-link",{staticClass:"footer__lang-icon",attrs:{to:t.switchLocalePath("en")}},[t._v("En")])],1)]),t._v(" "),o("div",{staticClass:"footer__bottom"},[t.fixedBtn?o("button",{staticClass:"footer__bottom-btn",on:{click:function(o){return o.stopPropagation(),t.fixedBtnHandler.apply(null,arguments)}}},[t._v(t._s(t.$t("fixed_btn")))]):t._e()])])}),[],!1,null,null,null);"function"==typeof l.default&&Object(l.default)(component);o.default=component.exports}}]);