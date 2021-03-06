/* ==========================================================
 * bootstrap-alerts.js v1.3.0
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */!function(a){var b;a(document).ready(function(){a.support.transition=function(){var a=document.body||document.documentElement,b=a.style,c=b.transition!==undefined||b.WebkitTransition!==undefined||b.MozTransition!==undefined||b.MsTransition!==undefined||b.OTransition!==undefined;return c}(),a.support.transition&&(b="TransitionEnd",a.browser.webkit?b="webkitTransitionEnd":a.browser.mozilla?b="transitionend":a.browser.opera&&(b="oTransitionEnd"))});var c=function(b,c){this.settings=a.extend({},a.fn.alert.defaults,c),this.$element=a(b).delegate(this.settings.selector,"click",this.close)};c.prototype={close:function(c){function e(){d.remove()}var d=a(this).parent(".alert-message");c&&c.preventDefault(),d.removeClass("in"),a.support.transition&&d.hasClass("fade")?d.bind(b,e):e()}},a.fn.alert=function(b){return b===!0?this.data("alert"):this.each(function(){var d=a(this);if(typeof b=="string")return d.data("alert")[b]();a(this).data("alert",new c(this,b))})},a.fn.alert.defaults={selector:".close"},a(document).ready(function(){new c(a("body"),{selector:".alert-message[data-alert] .close"})})}(window.jQuery||window.ender);/* ============================================================
 * bootstrap-dropdown.js v1.3.0
 * http://twitter.github.com/bootstrap/javascript.html#dropdown
 * ============================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */!function(a){function c(){a(b).parent("li").removeClass("open")}a.fn.dropdown=function(e){return this.each(function(){a(this).delegate(e||b,"click",function(b){var d=a(this).parent("li"),e=d.hasClass("open");return c(),!e&&d.toggleClass("open"),!1})})};var b="a.menu, .dropdown-toggle";a(function(){a("html").bind("click",c),a("body").dropdown("[data-dropdown] a.menu, [data-dropdown] .dropdown-toggle")})}(window.jQuery||window.ender);/* =========================================================
 * bootstrap-popover.js v1.3.0
 * http://twitter.github.com/bootstrap/javascript.html#popover
 * ===========================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */
/*!function(a){var b=function(b,c){this.$element=a(b),this.options=c,this.enabled=!0,this.fixTitle()};b.prototype=a.extend({},a.fn.twipsy.Twipsy.prototype,{setContent:function(){var a=this.tip();a.find(".title")[this.options.html?"html":"text"](this.getTitle()),a.find(".content p")[this.options.html?"html":"text"](this.getContent()),a[0].className="popover"},getContent:function(){var a,b=this.$element,c=this.options;return typeof this.options.content=="string"?a=b.attr(c.content):typeof this.options.content=="function"&&(a=this.options.content.call(this.$element[0])),a},tip:function(){return this.$tip||(this.$tip=a('<div class="popover" />').html('<div class="arrow"></div><div class="inner"><h3 class="title"></h3><div class="content"><p></p></div></div>')),this.$tip}}),a.fn.popover=function(c){return typeof c=="object"&&(c=a.extend({},a.fn.popover.defaults,c)),a.fn.twipsy.initWith.call(this,c,b,"popover"),this},a.fn.popover.defaults=a.extend({},a.fn.twipsy.defaults,{content:"data-content",placement:"right"})}(window.jQuery||window.ender);/* =============================================================

 * bootstrap-scrollspy.js v1.3.0
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */!function(a){function c(c,d){var e=a.proxy(this.processScroll,this);this.$topbar=a(c),this.selector=d||"li > a",this.refresh(),this.$topbar.delegate(this.selector,"click",e),b.scroll(e),this.processScroll()}var b=a(window);c.prototype={refresh:function(){this.targets=this.$topbar.find(this.selector).map(function(){var b=a(this).attr("href");return/^#\w/.test(b)&&a(b).length?b:null}),this.offsets=a.map(this.targets,function(b){return a(b).offset().top})},processScroll:function(){var a=b.scrollTop()+10,c=this.offsets,d=this.targets,e=this.activeTarget,f;for(f=c.length;f--;)e!=d[f]&&a>=c[f]&&(!c[f+1]||a<=c[f+1])&&this.activateButton(d[f])},activateButton:function(a){this.activeTarget=a,this.$topbar.find(this.selector).parent(".active").removeClass("active"),this.$topbar.find(this.selector+'[href="'+a+'"]').parent("li").addClass("active")}},a.fn.scrollSpy=function(b){var d=this.data("scrollspy");return d?b===!0?d:(typeof b=="string"&&d[b](),this):this.each(function(){a(this).data("scrollspy",new c(this,b))})},a(document).ready(function(){a("body").scrollSpy("[data-scrollspy] li > a")})}(window.jQuery||window.ender);/* ========================================================
 * bootstrap-tabs.js v1.3.0
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */!function(a){function b(a,b){b.find("> .active").removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),a.addClass("active"),a.parent(".dropdown-menu")&&a.closest("li.dropdown").addClass("active")}function c(c){var d=a(this),e=d.closest("ul:not(.dropdown-menu)"),f=d.attr("href"),g;if(/^#\w+/.test(f)){c.preventDefault();if(d.parent("li").hasClass("active"))return;g=e.find(".active a").last()[0],$href=a(f),b(d.parent("li"),e),b($href,$href.parent()),d.trigger({type:"change",relatedTarget:g})}}a.fn.tabs=a.fn.pills=function(b){return this.each(function(){a(this).delegate(b||".tabs li > a, .pills > li > a","click",c)})},a(document).ready(function(){a("body").tabs("ul[data-tabs] li > a, ul[data-pills] > li > a")})}(window.jQuery||window.ender);/* ==========================================================
 * bootstrap-twipsy.js v1.3.0
 * http://twitter.github.com/bootstrap/javascript.html#twipsy
 * Adapted from the original jQuery.tipsy by Jason Frame
 * ==========================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */!function(a){function d(a,b,c){return typeof a=="function"?a.apply(b,c):a}var b;a(document).ready(function(){a.support.transition=function(){var a=document.body||document.documentElement,b=a.style,c=b.transition!==undefined||b.WebkitTransition!==undefined||b.MozTransition!==undefined||b.MsTransition!==undefined||b.OTransition!==undefined;return c}(),a.support.transition&&(b="TransitionEnd",a.browser.webkit?b="webkitTransitionEnd":a.browser.mozilla?b="transitionend":a.browser.opera&&(b="oTransitionEnd"))});var c=function(b,c){this.$element=a(b),this.options=c,this.enabled=!0,this.fixTitle()};c.prototype={show:function(){var b,c,e,f,g,h;if(this.getTitle()&&this.enabled){g=this.tip(),this.setContent(),this.options.animate&&g.addClass("fade"),g.remove().css({top:0,left:0,display:"block"}).prependTo(document.body),b=a.extend({},this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight}),c=g[0].offsetWidth,e=g[0].offsetHeight,f=d(this.options.placement,this,[g[0],this.$element[0]]);switch(f){case"below":h={top:b.top+b.height+this.options.offset,left:b.left+b.width/2-c/2};break;case"above":h={top:b.top-e-this.options.offset,left:b.left+b.width/2-c/2};break;case"left":h={top:b.top+b.height/2-e/2,left:b.left-c-this.options.offset};break;case"right":h={top:b.top+b.height/2-e/2,left:b.left+b.width+this.options.offset}}g.css(h).addClass(f).addClass("in")}},setContent:function(){var a=this.tip();a.find(".twipsy-inner")[this.options.html?"html":"text"](this.getTitle()),a[0].className="twipsy"},hide:function(){function e(){d.remove()}var c=this,d=this.tip();d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.bind(b,e):e()},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},getTitle:function(){var a,b=this.$element,c=this.options;return this.fixTitle(),typeof c.title=="string"?a=b.attr(c.title=="title"?"data-original-title":c.title):typeof c.title=="function"&&(a=c.title.call(b[0])),a=(""+a).replace(/(^\s*|\s*$)/,""),a||c.fallback},tip:function(){return this.$tip||(this.$tip=a('<div class="twipsy" />').html('<div class="twipsy-arrow"></div><div class="twipsy-inner"></div>')),this.$tip},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled}},a.fn.twipsy=function(b){return a.fn.twipsy.initWith.call(this,b,c,"twipsy"),this},a.fn.twipsy.initWith=function(b,c,d){function i(e){var f=a.data(e,d);return f||(f=new c(e,a.fn.twipsy.elementOptions(e,b)),a.data(e,d,f)),f}function j(){var a=i(this);a.hoverState="in",b.delayIn==0?a.show():(a.fixTitle(),setTimeout(function(){a.hoverState=="in"&&a.show()},b.delayIn))}function k(){var a=i(this);a.hoverState="out",b.delayOut==0?a.hide():setTimeout(function(){a.hoverState=="out"&&a.hide()},b.delayOut)}var e,f,g,h;return b===!0?this.data(d):typeof b=="string"?(e=this.data(d),e&&e[b](),this):(b=a.extend({},a.fn[d].defaults,b),b.live||this.each(function(){i(this)}),b.trigger!="manual"&&(f=b.live?"live":"bind",g=b.trigger=="hover"?"mouseenter":"focus",h=b.trigger=="hover"?"mouseleave":"blur",this[f](g,j)[f](h,k)),this)},a.fn.twipsy.Twipsy=c,a.fn.twipsy.defaults={animate:!0,delayIn:0,delayOut:0,fallback:"",placement:"above",html:!1,live:!1,offset:0,title:"title",trigger:"hover"},a.fn.twipsy.elementOptions=function(b,c){return a.metadata?a.extend({},c,a(b).metadata()):c}}(window.jQuery||window.ender);