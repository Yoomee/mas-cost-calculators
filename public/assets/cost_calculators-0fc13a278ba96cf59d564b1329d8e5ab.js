!function(t){var i=0,e=function(){return(new Date).getTime()+i++},s=function(t){return"["+t+"]$1"},o=function(t){return"_"+t+"_$1"};t(document).on("click",".add_fields",function(i){i.preventDefault();var a=t(this),n=a.data("association"),h=a.data("associations"),r=a.data("association-insertion-template"),l=a.data("association-insertion-method")||a.data("association-insertion-position")||"before",d=a.data("association-insertion-node"),p=a.data("association-insertion-traversal"),u=parseInt(a.data("count"),10),c=new RegExp("\\[new_"+n+"\\](.*?\\s)","g"),m=new RegExp("_new_"+n+"_(\\w*)","g"),f=e(),v=r.replace(c,s(f)),g=[];for(v==r&&(c=new RegExp("\\[new_"+h+"\\](.*?\\s)","g"),m=new RegExp("_new_"+h+"_(\\w*)","g"),v=r.replace(c,s(f))),v=v.replace(m,o(f)),g=[v],u=isNaN(u)?1:Math.max(u,1),u-=1;u;)f=e(),v=r.replace(c,s(f)),v=v.replace(m,o(f)),g.push(v),u-=1;d=d?p?a[p](d):"this"==d?a:t(d):a.parent(),t.each(g,function(i,e){var s=t(e);d.trigger("cocoon:before-insert",[s]);d[l](s);d.trigger("cocoon:after-insert",[s])})}),t(document).on("click",".remove_fields.dynamic, .remove_fields.existing",function(i){var e=t(this),s=e.data("wrapper-class")||"nested-fields",o=e.closest("."+s),a=o.parent();i.preventDefault(),a.trigger("cocoon:before-remove",[o]);var n=a.data("remove-timeout")||0;setTimeout(function(){e.hasClass("dynamic")?o.remove():(e.prev("input[type=hidden]").val("1"),o.hide()),a.trigger("cocoon:after-remove",[o])},n)}),t(".remove_fields.existing.destroyed").each(function(){var i=t(this),e=i.data("wrapper-class")||"nested-fields";i.closest("."+e).hide()})}(jQuery),function(){}.call(this),function(t){function i(i,s){if(n[i]){var o=e(this),a=n[i].apply(o,s);return"undefined"==typeof a?t(this):a}throw new Error("method '"+i+"()' does not exist for slider.")}function e(i){var e=t(i).data("slider");if(e&&e instanceof a)return e;throw new Error(o.callingContextNotSliderInstance)}function s(i){var e=t(this);return e.each(function(){var e=t(this),s=e.data("slider"),o="object"==typeof i&&i;s&&!o&&(o={},s.handle1.off(),s.handle2.off(),s.picker.off(),t.each(t.fn.slider.defaults,function(t){o[t]=s[t]})),e.data("slider",new a(this,t.extend({},t.fn.slider.defaults,o)))}),e}var o={formatInvalidInputErrorMsg:function(t){return"Invalid input value '"+t+"' passed in"},callingContextNotSliderInstance:"Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"},a=function(i,e){var s=this.element=t(i).hide(),o=t(i)[0].style.width,a=!1,n=this.element.parent();n.hasClass("slider")===!0?(a=!0,this.picker=n):this.picker=t('<div class="slider"><div class="slider-track"><div class="slider-selection"></div><div class="slider-handle min-slider-handle"></div><div class="slider-handle max-slider-handle"></div></div><div id="tooltip" class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div><div id="tooltip_min" class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div><div id="tooltip_max" class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div></div>').insertBefore(this.element).append(this.element),this.id=this.element.data("slider-id")||e.id,this.id&&(this.picker[0].id=this.id),("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch)&&(this.touchCapable=!0);var h=this.element.data("slider-tooltip")||e.tooltip;switch(this.tooltip=this.picker.find("#tooltip"),this.tooltipInner=this.tooltip.find("div.tooltip-inner"),this.tooltip_min=this.picker.find("#tooltip_min"),this.tooltipInner_min=this.tooltip_min.find("div.tooltip-inner"),this.tooltip_max=this.picker.find("#tooltip_max"),this.tooltipInner_max=this.tooltip_max.find("div.tooltip-inner"),a===!0&&(this.picker.removeClass("slider-horizontal"),this.picker.removeClass("slider-vertical"),this.tooltip.removeClass("hide"),this.tooltip_min.removeClass("hide"),this.tooltip_max.removeClass("hide")),this.orientation=this.element.data("slider-orientation")||e.orientation,this.orientation){case"vertical":this.picker.addClass("slider-vertical"),this.stylePos="top",this.mousePos="pageY",this.sizePos="offsetHeight",this.tooltip.addClass("right")[0].style.left="100%",this.tooltip_min.addClass("right")[0].style.left="100%",this.tooltip_max.addClass("right")[0].style.left="100%";break;default:this.picker.addClass("slider-horizontal").css("width",o),this.orientation="horizontal",this.stylePos="left",this.mousePos="pageX",this.sizePos="offsetWidth",this.tooltip.addClass("top")[0].style.top=-this.tooltip.outerHeight()-14+"px",this.tooltip_min.addClass("top")[0].style.top=-this.tooltip_min.outerHeight()-14+"px",this.tooltip_max.addClass("top")[0].style.top=-this.tooltip_max.outerHeight()-14+"px"}var r=this;t.each(["min","max","step","precision","value","reversed","handle"],function(t,i){r[i]="undefined"!=typeof s.data("slider-"+i)?s.data("slider-"+i):"undefined"!=typeof e[i]?e[i]:"undefined"!=typeof s.prop(i)?s.prop(i):0}),this.value instanceof Array?a&&!this.range?this.value=this.value[0]:this.range=!0:this.range&&(this.value=[this.value,this.max]),this.selection=this.element.data("slider-selection")||e.selection,this.selectionEl=this.picker.find(".slider-selection"),"none"===this.selection&&this.selectionEl.addClass("hide"),this.selectionElStyle=this.selectionEl[0].style,this.handle1=this.picker.find(".slider-handle:first"),this.handle1Stype=this.handle1[0].style,this.handle2=this.picker.find(".slider-handle:last"),this.handle2Stype=this.handle2[0].style,a===!0&&(this.handle1.removeClass("round triangle"),this.handle2.removeClass("round triangle hide"));var l=["round","triangle","custom"];-1!==l.indexOf(this.handle)&&(this.handle1.addClass(this.handle),this.handle2.addClass(this.handle)),this.offset=this.picker.offset(),this.size=this.picker[0][this.sizePos],this.formater=e.formater,this.tooltip_separator=e.tooltip_separator,this.tooltip_split=e.tooltip_split,this.setValue(this.value),this.handle1.on({keydown:t.proxy(this.keydown,this,0)}),this.handle2.on({keydown:t.proxy(this.keydown,this,1)}),this.touchCapable&&this.picker.on({touchstart:t.proxy(this.mousedown,this)}),this.picker.on({mousedown:t.proxy(this.mousedown,this)}),"hide"===h?(this.tooltip.addClass("hide"),this.tooltip_min.addClass("hide"),this.tooltip_max.addClass("hide")):"always"===h?(this.showTooltip(),this.alwaysShowTooltip=!0):(this.picker.on({mouseenter:t.proxy(this.showTooltip,this),mouseleave:t.proxy(this.hideTooltip,this)}),this.handle1.on({focus:t.proxy(this.showTooltip,this),blur:t.proxy(this.hideTooltip,this)}),this.handle2.on({focus:t.proxy(this.showTooltip,this),blur:t.proxy(this.hideTooltip,this)})),this.enabled=e.enabled&&(void 0===this.element.data("slider-enabled")||this.element.data("slider-enabled")===!0),this.enabled?this.enable():this.disable(),this.natural_arrow_keys=this.element.data("slider-natural_arrow_keys")||e.natural_arrow_keys};a.prototype={constructor:a,over:!1,inDrag:!1,showTooltip:function(){this.tooltip_split===!1?this.tooltip.addClass("in"):(this.tooltip_min.addClass("in"),this.tooltip_max.addClass("in")),this.over=!0},hideTooltip:function(){this.inDrag===!1&&this.alwaysShowTooltip!==!0&&(this.tooltip.removeClass("in"),this.tooltip_min.removeClass("in"),this.tooltip_max.removeClass("in")),this.over=!1},layout:function(){var t;if(t=this.reversed?[100-this.percentage[0],this.percentage[1]]:[this.percentage[0],this.percentage[1]],this.handle1Stype[this.stylePos]=t[0]+"%",this.handle2Stype[this.stylePos]=t[1]+"%","vertical"===this.orientation)this.selectionElStyle.top=Math.min(t[0],t[1])+"%",this.selectionElStyle.height=Math.abs(t[0]-t[1])+"%";else{this.selectionElStyle.left=Math.min(t[0],t[1])+"%",this.selectionElStyle.width=Math.abs(t[0]-t[1])+"%";var i=this.tooltip_min[0].getBoundingClientRect(),e=this.tooltip_max[0].getBoundingClientRect();i.right>e.left?(this.tooltip_max.removeClass("top"),this.tooltip_max.addClass("bottom")[0].style.top="18px"):(this.tooltip_max.removeClass("bottom"),this.tooltip_max.addClass("top")[0].style.top="-30px")}this.range?(this.tooltipInner.text(this.formater(this.value[0])+this.tooltip_separator+this.formater(this.value[1])),this.tooltip[0].style[this.stylePos]=(t[1]+t[0])/2+"%","vertical"===this.orientation?this.tooltip.css("margin-top",-this.tooltip.outerHeight()/2+"px"):this.tooltip.css("margin-left",-this.tooltip.outerWidth()/2+"px"),"vertical"===this.orientation?this.tooltip.css("margin-top",-this.tooltip.outerHeight()/2+"px"):this.tooltip.css("margin-left",-this.tooltip.outerWidth()/2+"px"),this.tooltipInner_min.text(this.formater(this.value[0])),this.tooltipInner_max.text(this.formater(this.value[1])),this.tooltip_min[0].style[this.stylePos]=t[0]+"%","vertical"===this.orientation?this.tooltip_min.css("margin-top",-this.tooltip_min.outerHeight()/2+"px"):this.tooltip_min.css("margin-left",-this.tooltip_min.outerWidth()/2+"px"),this.tooltip_max[0].style[this.stylePos]=t[1]+"%","vertical"===this.orientation?this.tooltip_max.css("margin-top",-this.tooltip_max.outerHeight()/2+"px"):this.tooltip_max.css("margin-left",-this.tooltip_max.outerWidth()/2+"px")):(this.tooltipInner.text(this.formater(this.value[0])),this.tooltip[0].style[this.stylePos]=t[0]+"%","vertical"===this.orientation?this.tooltip.css("margin-top",-this.tooltip.outerHeight()/2+"px"):this.tooltip.css("margin-left",-this.tooltip.outerWidth()/2+"px"))},mousedown:function(i){if(!this.isEnabled())return!1;this.touchCapable&&"touchstart"===i.type&&(i=i.originalEvent),this.triggerFocusOnHandle(),this.offset=this.picker.offset(),this.size=this.picker[0][this.sizePos];var e=this.getPercentage(i);if(this.range){var s=Math.abs(this.percentage[0]-e),o=Math.abs(this.percentage[1]-e);this.dragged=o>s?0:1}else this.dragged=0;this.percentage[this.dragged]=this.reversed?100-e:e,this.layout(),this.touchCapable&&t(document).on({touchmove:t.proxy(this.mousemove,this),touchend:t.proxy(this.mouseup,this)}),t(document).on({mousemove:t.proxy(this.mousemove,this),mouseup:t.proxy(this.mouseup,this)}),this.inDrag=!0;var a=this.calculateValue();return this.element.trigger({type:"slideStart",value:a}).data("value",a).prop("value",a),this.setValue(a),!0},triggerFocusOnHandle:function(t){0===t&&this.handle1.focus(),1===t&&this.handle2.focus()},keydown:function(t,i){if(!this.isEnabled())return!1;var e;switch(i.which){case 37:case 40:e=-1;break;case 39:case 38:e=1}if(e){this.natural_arrow_keys&&("vertical"===this.orientation&&!this.reversed||"horizontal"===this.orientation&&this.reversed)&&(e=-1*e);var s=e*this.percentage[2],o=this.percentage[t]+s;o>100?o=100:0>o&&(o=0),this.dragged=t,this.adjustPercentageForRangeSliders(o),this.percentage[this.dragged]=o,this.layout();var a=this.calculateValue();return this.element.trigger({type:"slideStart",value:a}).data("value",a).prop("value",a),this.setValue(a,!0),this.element.trigger({type:"slideStop",value:a}).data("value",a).prop("value",a),!1}},mousemove:function(t){if(!this.isEnabled())return!1;this.touchCapable&&"touchmove"===t.type&&(t=t.originalEvent);var i=this.getPercentage(t);this.adjustPercentageForRangeSliders(i),this.percentage[this.dragged]=this.reversed?100-i:i,this.layout();var e=this.calculateValue();return this.setValue(e,!0),!1},adjustPercentageForRangeSliders:function(t){this.range&&(0===this.dragged&&this.percentage[1]<t?(this.percentage[0]=this.percentage[1],this.dragged=1):1===this.dragged&&this.percentage[0]>t&&(this.percentage[1]=this.percentage[0],this.dragged=0))},mouseup:function(){if(!this.isEnabled())return!1;this.touchCapable&&t(document).off({touchmove:this.mousemove,touchend:this.mouseup}),t(document).off({mousemove:this.mousemove,mouseup:this.mouseup}),this.inDrag=!1,this.over===!1&&this.hideTooltip();var i=this.calculateValue();return this.layout(),this.element.data("value",i).prop("value",i).trigger({type:"slideStop",value:i}),!1},calculateValue:function(){var t;return this.range?(t=[this.min,this.max],0!==this.percentage[0]&&(t[0]=Math.max(this.min,this.min+Math.round(this.diff*this.percentage[0]/100/this.step)*this.step),t[0]=this.applyPrecision(t[0])),100!==this.percentage[1]&&(t[1]=Math.min(this.max,this.min+Math.round(this.diff*this.percentage[1]/100/this.step)*this.step),t[1]=this.applyPrecision(t[1])),this.value=t):(t=this.min+Math.round(this.diff*this.percentage[0]/100/this.step)*this.step,t<this.min?t=this.min:t>this.max&&(t=this.max),t=parseFloat(t),t=this.applyPrecision(t),this.value=[t,this.value[1]]),t},applyPrecision:function(t){var i=this.precision||this.getNumDigitsAfterDecimalPlace(this.step);return this.applyToFixedAndParseFloat(t,i)},getNumDigitsAfterDecimalPlace:function(t){var i=(""+t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return i?Math.max(0,(i[1]?i[1].length:0)-(i[2]?+i[2]:0)):0},applyToFixedAndParseFloat:function(t,i){var e=t.toFixed(i);return parseFloat(e)},getPercentage:function(t){!this.touchCapable||"touchstart"!==t.type&&"touchmove"!==t.type||(t=t.touches[0]);var i=100*(t[this.mousePos]-this.offset[this.stylePos])/this.size;return i=Math.round(i/this.percentage[2])*this.percentage[2],Math.max(0,Math.min(100,i))},getValue:function(){return this.range?this.value:this.value[0]},setValue:function(t,i){if(t||(t=0),this.value=this.validateInputValue(t),this.range?(this.value[0]=this.applyPrecision(this.value[0]),this.value[1]=this.applyPrecision(this.value[1]),this.value[0]=Math.max(this.min,Math.min(this.max,this.value[0])),this.value[1]=Math.max(this.min,Math.min(this.max,this.value[1]))):(this.value=this.applyPrecision(this.value),this.value=[Math.max(this.min,Math.min(this.max,this.value))],this.handle2.addClass("hide"),this.value[1]="after"===this.selection?this.max:this.min),this.diff=this.max-this.min,this.percentage=this.diff>0?[100*(this.value[0]-this.min)/this.diff,100*(this.value[1]-this.min)/this.diff,100*this.step/this.diff]:[0,0,100],this.layout(),i===!0){var e=this.range?this.value:this.value[0];this.element.trigger({type:"slide",value:e}).data("value",e).prop("value",e)}},validateInputValue:function(i){if("number"==typeof i)return i;if(i instanceof Array)return t.each(i,function(t,i){if("number"!=typeof i)throw new Error(o.formatInvalidInputErrorMsg(i))}),i;throw new Error(o.formatInvalidInputErrorMsg(i))},destroy:function(){this.handle1.off(),this.handle2.off(),this.element.off().show().insertBefore(this.picker),this.picker.off().remove(),t(this.element).removeData("slider")},disable:function(){this.enabled=!1,this.handle1.removeAttr("tabindex"),this.handle2.removeAttr("tabindex"),this.picker.addClass("slider-disabled"),this.element.trigger("slideDisabled")},enable:function(){this.enabled=!0,this.handle1.attr("tabindex",0),this.handle2.attr("tabindex",0),this.picker.removeClass("slider-disabled"),this.element.trigger("slideEnabled")},toggle:function(){this.enabled?this.disable():this.enable()},isEnabled:function(){return this.enabled},setAttribute:function(t,i){this[t]=i},getAttribute:function(t){return this[t]}};var n={getValue:a.prototype.getValue,setValue:a.prototype.setValue,setAttribute:a.prototype.setAttribute,getAttribute:a.prototype.getAttribute,destroy:a.prototype.destroy,disable:a.prototype.disable,enable:a.prototype.enable,toggle:a.prototype.toggle,isEnabled:a.prototype.isEnabled};t.fn.slider=function(t){if("string"==typeof t&&"refresh"!==t){var e=Array.prototype.slice.call(arguments,1);return i.call(this,t,e)}return s.call(this,t)},t.fn.slider.defaults={min:0,max:10,step:1,precision:0,orientation:"horizontal",value:5,range:!1,selection:"before",tooltip:"show",tooltip_separator:":",tooltip_split:!1,natural_arrow_keys:!1,handle:"round",reversed:!1,enabled:!0,formater:function(t){return t}},t.fn.slider.Constructor=a}(window.jQuery),require(["jquery"],function(t){"use strict";require(["componentLoader"],function(i){i.init(t("body"))})});