!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){e.exports=t(1)},function(e,n,t){Nova.booting(function(e,n){e.component("index-belongs-to-dependency",e.component("index-belongs-to-field")),e.component("detail-belongs-to-dependency",e.component("detail-belongs-to-field")),e.component("form-belongs-to-dependency",e.component("form-belongs-to-field").extend(t(2)))})},function(e,n,t){var o=t(3)(t(4),null,!1,null,null,null);e.exports=o.exports},function(e,n){e.exports=function(e,n,t,o,r,i){var c,s=e=e||{},d=typeof e.default;"object"!==d&&"function"!==d||(c=e,s=e.default);var u,a="function"==typeof s?s.options:s;if(n&&(a.render=n.render,a.staticRenderFns=n.staticRenderFns,a._compiled=!0),t&&(a.functional=!0),r&&(a._scopeId=r),i?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},a._ssrRegister=u):o&&(u=o),u){var l=a.functional,p=l?a.render:a.beforeCreate;l?(a._injectStyles=u,a.render=function(e,n){return u.call(n),p(e,n)}):a.beforeCreate=p?[].concat(p,u):[u]}return{esModule:c,exports:s,options:a}}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{dependsOnValue:null,watcherDebounce:null,watcherDebounceTimeout:100}},created:function(){void 0!==this.field.dependsOn&&this.registerDependencyWatchers(this.$root)},beforeDestroy:function(){this.watcherDebounce&&clearTimeout(this.watcherDebounce)},methods:{registerDependencyWatchers:function(e){var n=this;e.$children.forEach(function(e){n.componentIsDependency(e)&&(void 0!==e.selectedResourceId?(e.$watch("selectedResourceId",n.dependencyWatcher,{immediate:!0}),n.dependencyWatcher(e.selectedResourceId)):void 0!==e.value&&(e.$watch("value",n.dependencyWatcher,{immediate:!0}),n.dependencyWatcher(e.value))),n.registerDependencyWatchers(e)})},componentIsDependency:function(e){return void 0!==e.field&&e.field.attribute===this.field.dependsOn},dependencyWatcher:function(e){var n=this;clearTimeout(this.watcherDebounce),this.watcherDebounce=setTimeout(function(){e!==n.dependsOnValue&&(n.dependsOnValue=e,n.clearSelection(),setTimeout(function(){n.initializeComponent()},1e3),n.watcherDebounce=null)},this.watcherDebounceTimeout)}},computed:{queryParams:function(){return{params:{current:this.selectedResourceId,first:this.initializingWithExistingResource,search:this.search,withTrashed:this.withTrashed,dependsOnValue:this.dependsOnValue}}}}}}]);