// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.12
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = ('__proto__' in {}); // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals. ' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = (key in target);
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ("development" !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
      }

      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.12';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecessary `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"node_modules/util/support/isBufferBrowser.js":[function(require,module,exports) {
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],"node_modules/util/node_modules/inherits/inherits_browser.js":[function(require,module,exports) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/util/util.js":[function(require,module,exports) {
var process = require("process");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
  var keys = Object.keys(obj);
  var descriptors = {};

  for (var i = 0; i < keys.length; i++) {
    descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
  }

  return descriptors;
};

var formatRegExp = /%[sdj%]/g;

exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];

    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }

    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;

    switch (x) {
      case '%s':
        return String(args[i++]);

      case '%d':
        return Number(args[i++]);

      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }

      default:
        return x;
    }
  });

  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }

  return str;
}; // Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.


exports.deprecate = function (fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  } // Allow for deprecating things in the process of starting up.


  if (typeof process === 'undefined') {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;

exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = undefined || '';
  set = set.toUpperCase();

  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;

      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }

  return debugs[set];
};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */

/* legacy: obj, showHidden, depth, colors*/


function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  }; // legacy...

  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];

  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  } // set default options


  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

exports.inspect = inspect; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
}; // Don't use 'blue' not visible on cmd.exe

inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);

    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }

    return ret;
  } // Primitive types cannot have properties


  var primitive = formatPrimitive(ctx, value);

  if (primitive) {
    return primitive;
  } // Look up the keys of the object.


  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  } // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  } // Some type of object without properties can be shortcutted.


  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }

    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }

    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }

    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}']; // Make Array say that they are Array

  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  } // Make functions say that they are functions


  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  } // Make RegExps say that they are RegExps


  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  } // Make dates with properties first say the date


  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  } // Make error with message first say the error


  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);
  var output;

  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }

  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];

  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };

  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }

  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }

      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }

  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }

    name = JSON.stringify('' + key);

    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
} // NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.


function isArray(ar) {
  return Array.isArray(ar);
}

exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}

exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}

exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}

exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}

exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}

exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}

exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}

exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}

exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}

exports.isPrimitive = isPrimitive;
exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
} // log is just a thin wrapper to console.log that prepends a timestamp


exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */


exports.inherits = require('inherits');

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function') throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];

    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }

    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true
  });
  return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
};

exports.promisify.custom = kCustomPromisifiedSymbol;

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }

  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  } // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.


  function callbackified() {
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();

    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }

    var self = this;

    var cb = function () {
      return maybeCb.apply(self, arguments);
    }; // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)


    original.apply(this, args).then(function (ret) {
      process.nextTick(cb, null, ret);
    }, function (rej) {
      process.nextTick(callbackifyOnRejected, rej, cb);
    });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
  return callbackified;
}

exports.callbackify = callbackify;
},{"./support/isBuffer":"node_modules/util/support/isBufferBrowser.js","inherits":"node_modules/util/node_modules/inherits/inherits_browser.js","process":"node_modules/process/browser.js"}],"node_modules/markdown/lib/markdown.js":[function(require,module,exports) {
// Released under MIT license
// Copyright (c) 2009-2010 Dominic Baggott
// Copyright (c) 2009-2010 Ash Berlin
// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)

/*jshint browser:true, devel:true */

(function( expose ) {

/**
 *  class Markdown
 *
 *  Markdown processing in Javascript done right. We have very particular views
 *  on what constitutes 'right' which include:
 *
 *  - produces well-formed HTML (this means that em and strong nesting is
 *    important)
 *
 *  - has an intermediate representation to allow processing of parsed data (We
 *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
 *
 *  - is easily extensible to add new dialects without having to rewrite the
 *    entire parsing mechanics
 *
 *  - has a good test suite
 *
 *  This implementation fulfills all of these (except that the test suite could
 *  do with expanding to automatically run all the fixtures from other Markdown
 *  implementations.)
 *
 *  ##### Intermediate Representation
 *
 *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
 *
 *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
 **/
var Markdown = expose.Markdown = function(dialect) {
  switch (typeof dialect) {
    case "undefined":
      this.dialect = Markdown.dialects.Gruber;
      break;
    case "object":
      this.dialect = dialect;
      break;
    default:
      if ( dialect in Markdown.dialects ) {
        this.dialect = Markdown.dialects[dialect];
      }
      else {
        throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
      }
      break;
  }
  this.em_state = [];
  this.strong_state = [];
  this.debug_indent = "";
};

/**
 *  parse( markdown, [dialect] ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *
 *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
 **/
expose.parse = function( source, dialect ) {
  // dialect will default if undefined
  var md = new Markdown( dialect );
  return md.toTree( source );
};

/**
 *  toHTML( markdown, [dialect]  ) -> String
 *  toHTML( md_tree ) -> String
 *  - markdown (String): markdown string to parse
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Take markdown (either as a string or as a JsonML tree) and run it through
 *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
 **/
expose.toHTML = function toHTML( source , dialect , options ) {
  var input = expose.toHTMLTree( source , dialect , options );

  return expose.renderJsonML( input );
};

/**
 *  toHTMLTree( markdown, [dialect] ) -> JsonML
 *  toHTMLTree( md_tree ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
 *  to this function, it is first parsed into a markdown tree by calling
 *  [[parse]].
 **/
expose.toHTMLTree = function toHTMLTree( input, dialect , options ) {
  // convert string input to an MD tree
  if ( typeof input ==="string" ) input = this.parse( input, dialect );

  // Now convert the MD tree to an HTML tree

  // remove references from the tree
  var attrs = extract_attr( input ),
      refs = {};

  if ( attrs && attrs.references ) {
    refs = attrs.references;
  }

  var html = convert_tree_to_html( input, refs , options );
  merge_text_nodes( html );
  return html;
};

// For Spidermonkey based engines
function mk_block_toSource() {
  return "Markdown.mk_block( " +
          uneval(this.toString()) +
          ", " +
          uneval(this.trailing) +
          ", " +
          uneval(this.lineNumber) +
          " )";
}

// node
function mk_block_inspect() {
  var util = require("util");
  return "Markdown.mk_block( " +
          util.inspect(this.toString()) +
          ", " +
          util.inspect(this.trailing) +
          ", " +
          util.inspect(this.lineNumber) +
          " )";

}

var mk_block = Markdown.mk_block = function(block, trail, line) {
  // Be helpful for default case in tests.
  if ( arguments.length == 1 ) trail = "\n\n";

  var s = new String(block);
  s.trailing = trail;
  // To make it clear its not just a string
  s.inspect = mk_block_inspect;
  s.toSource = mk_block_toSource;

  if ( line != undefined )
    s.lineNumber = line;

  return s;
};

function count_lines( str ) {
  var n = 0, i = -1;
  while ( ( i = str.indexOf("\n", i + 1) ) !== -1 ) n++;
  return n;
}

// Internal - split source into rough blocks
Markdown.prototype.split_blocks = function splitBlocks( input, startLine ) {
  input = input.replace(/(\r\n|\n|\r)/g, "\n");
  // [\s\S] matches _anything_ (newline or space)
  // [^] is equivalent but doesn't work in IEs.
  var re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
      blocks = [],
      m;

  var line_no = 1;

  if ( ( m = /^(\s*\n)/.exec(input) ) != null ) {
    // skip (but count) leading blank lines
    line_no += count_lines( m[0] );
    re.lastIndex = m[0].length;
  }

  while ( ( m = re.exec(input) ) !== null ) {
    if (m[2] == "\n#") {
      m[2] = "\n";
      re.lastIndex--;
    }
    blocks.push( mk_block( m[1], m[2], line_no ) );
    line_no += count_lines( m[0] );
  }

  return blocks;
};

/**
 *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
 *  - block (String): the block to process
 *  - next (Array): the following blocks
 *
 * Process `block` and return an array of JsonML nodes representing `block`.
 *
 * It does this by asking each block level function in the dialect to process
 * the block until one can. Succesful handling is indicated by returning an
 * array (with zero or more JsonML nodes), failure by a false value.
 *
 * Blocks handlers are responsible for calling [[Markdown#processInline]]
 * themselves as appropriate.
 *
 * If the blocks were split incorrectly or adjacent blocks need collapsing you
 * can adjust `next` in place using shift/splice etc.
 *
 * If any of this default behaviour is not right for the dialect, you can
 * define a `__call__` method on the dialect that will get invoked to handle
 * the block processing.
 */
Markdown.prototype.processBlock = function processBlock( block, next ) {
  var cbs = this.dialect.block,
      ord = cbs.__order__;

  if ( "__call__" in cbs ) {
    return cbs.__call__.call(this, block, next);
  }

  for ( var i = 0; i < ord.length; i++ ) {
    //D:this.debug( "Testing", ord[i] );
    var res = cbs[ ord[i] ].call( this, block, next );
    if ( res ) {
      //D:this.debug("  matched");
      if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
        this.debug(ord[i], "didn't return a proper array");
      //D:this.debug( "" );
      return res;
    }
  }

  // Uhoh! no match! Should we throw an error?
  return [];
};

Markdown.prototype.processInline = function processInline( block ) {
  return this.dialect.inline.__call__.call( this, String( block ) );
};

/**
 *  Markdown#toTree( source ) -> JsonML
 *  - source (String): markdown source to parse
 *
 *  Parse `source` into a JsonML tree representing the markdown document.
 **/
// custom_tree means set this.tree to `custom_tree` and restore old value on return
Markdown.prototype.toTree = function toTree( source, custom_root ) {
  var blocks = source instanceof Array ? source : this.split_blocks( source );

  // Make tree a member variable so its easier to mess with in extensions
  var old_tree = this.tree;
  try {
    this.tree = custom_root || this.tree || [ "markdown" ];

    blocks:
    while ( blocks.length ) {
      var b = this.processBlock( blocks.shift(), blocks );

      // Reference blocks and the like won't return any content
      if ( !b.length ) continue blocks;

      this.tree.push.apply( this.tree, b );
    }
    return this.tree;
  }
  finally {
    if ( custom_root ) {
      this.tree = old_tree;
    }
  }
};

// Noop by default
Markdown.prototype.debug = function () {
  var args = Array.prototype.slice.call( arguments);
  args.unshift(this.debug_indent);
  if ( typeof print !== "undefined" )
      print.apply( print, args );
  if ( typeof console !== "undefined" && typeof console.log !== "undefined" )
      console.log.apply( null, args );
}

Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
  // Dont use /g regexps with this
  var m,
      b = block.valueOf();

  while ( b.length && (m = re.exec(b) ) != null ) {
    b = b.substr( m[0].length );
    cb.call(this, m);
  }
  return b;
};

/**
 * Markdown.dialects
 *
 * Namespace of built-in dialects.
 **/
Markdown.dialects = {};

/**
 * Markdown.dialects.Gruber
 *
 * The default dialect that follows the rules set out by John Gruber's
 * markdown.pl as closely as possible. Well actually we follow the behaviour of
 * that script which in some places is not exactly what the syntax web page
 * says.
 **/
Markdown.dialects.Gruber = {
  block: {
    atxHeader: function atxHeader( block, next ) {
      var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

      if ( !m ) return undefined;

      var header = [ "header", { level: m[ 1 ].length } ];
      Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    setextHeader: function setextHeader( block, next ) {
      var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

      if ( !m ) return undefined;

      var level = ( m[ 2 ] === "=" ) ? 1 : 2;
      var header = [ "header", { level : level }, m[ 1 ] ];

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    code: function code( block, next ) {
      // |    Foo
      // |bar
      // should be a code block followed by a paragraph. Fun
      //
      // There might also be adjacent code block to merge.

      var ret = [],
          re = /^(?: {0,3}\t| {4})(.*)\n?/,
          lines;

      // 4 spaces + content
      if ( !block.match( re ) ) return undefined;

      block_search:
      do {
        // Now pull out the rest of the lines
        var b = this.loop_re_over_block(
                  re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

        if ( b.length ) {
          // Case alluded to in first comment. push it back on as a new block
          next.unshift( mk_block(b, block.trailing) );
          break block_search;
        }
        else if ( next.length ) {
          // Check the next block - it might be code too
          if ( !next[0].match( re ) ) break block_search;

          // Pull how how many blanks lines follow - minus two to account for .join
          ret.push ( block.trailing.replace(/[^\n]/g, "").substring(2) );

          block = next.shift();
        }
        else {
          break block_search;
        }
      } while ( true );

      return [ [ "code_block", ret.join("\n") ] ];
    },

    horizRule: function horizRule( block, next ) {
      // this needs to find any hr in the block to handle abutting blocks
      var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

      if ( !m ) {
        return undefined;
      }

      var jsonml = [ [ "hr" ] ];

      // if there's a leading abutting block, process it
      if ( m[ 1 ] ) {
        jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );
      }

      // if there's a trailing abutting block, stick it into next
      if ( m[ 3 ] ) {
        next.unshift( mk_block( m[ 3 ] ) );
      }

      return jsonml;
    },

    // There are two types of lists. Tight and loose. Tight lists have no whitespace
    // between the items (and result in text just in the <li>) and loose lists,
    // which have an empty line between list items, resulting in (one or more)
    // paragraphs inside the <li>.
    //
    // There are all sorts weird edge cases about the original markdown.pl's
    // handling of lists:
    //
    // * Nested lists are supposed to be indented by four chars per level. But
    //   if they aren't, you can get a nested list by indenting by less than
    //   four so long as the indent doesn't match an indent of an existing list
    //   item in the 'nest stack'.
    //
    // * The type of the list (bullet or number) is controlled just by the
    //    first item at the indent. Subsequent changes are ignored unless they
    //    are for nested lists
    //
    lists: (function( ) {
      // Use a closure to hide a few variables.
      var any_list = "[*+-]|\\d+\\.",
          bullet_list = /[*+-]/,
          number_list = /\d+\./,
          // Capture leading indent as it matters for determining nested lists.
          is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
          indent_re = "(?: {0,3}\\t| {4})";

      // TODO: Cache this regexp for certain depths.
      // Create a regexp suitable for matching an li for a given stack depth
      function regex_for_depth( depth ) {

        return new RegExp(
          // m[1] = indent, m[2] = list_type
          "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
          // m[3] = cont
          "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
        );
      }
      function expand_tab( input ) {
        return input.replace( / {0,3}\t/g, "    " );
      }

      // Add inline content `inline` to `li`. inline comes from processInline
      // so is an array of content
      function add(li, loose, inline, nl) {
        if ( loose ) {
          li.push( [ "para" ].concat(inline) );
          return;
        }
        // Hmmm, should this be any block level element or just paras?
        var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == "para"
                   ? li[li.length -1]
                   : li;

        // If there is already some content in this list, add the new line in
        if ( nl && li.length > 1 ) inline.unshift(nl);

        for ( var i = 0; i < inline.length; i++ ) {
          var what = inline[i],
              is_str = typeof what == "string";
          if ( is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == "string" ) {
            add_to[ add_to.length-1 ] += what;
          }
          else {
            add_to.push( what );
          }
        }
      }

      // contained means have an indent greater than the current one. On
      // *every* line in the block
      function get_contained_blocks( depth, blocks ) {

        var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
            replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
            ret = [];

        while ( blocks.length > 0 ) {
          if ( re.exec( blocks[0] ) ) {
            var b = blocks.shift(),
                // Now remove that indent
                x = b.replace( replace, "");

            ret.push( mk_block( x, b.trailing, b.lineNumber ) );
          }
          else {
            break;
          }
        }
        return ret;
      }

      // passed to stack.forEach to turn list items up the stack into paras
      function paragraphify(s, i, stack) {
        var list = s.list;
        var last_li = list[list.length-1];

        if ( last_li[1] instanceof Array && last_li[1][0] == "para" ) {
          return;
        }
        if ( i + 1 == stack.length ) {
          // Last stack frame
          // Keep the same array, but replace the contents
          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ) );
        }
        else {
          var sublist = last_li.pop();
          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ), sublist );
        }
      }

      // The matcher function
      return function( block, next ) {
        var m = block.match( is_list_re );
        if ( !m ) return undefined;

        function make_list( m ) {
          var list = bullet_list.exec( m[2] )
                   ? ["bulletlist"]
                   : ["numberlist"];

          stack.push( { list: list, indent: m[1] } );
          return list;
        }


        var stack = [], // Stack of lists for nesting.
            list = make_list( m ),
            last_li,
            loose = false,
            ret = [ stack[0].list ],
            i;

        // Loop to search over block looking for inner block elements and loose lists
        loose_search:
        while ( true ) {
          // Split into lines preserving new lines at end of line
          var lines = block.split( /(?=\n)/ );

          // We have to grab all lines for a li and call processInline on them
          // once as there are some inline things that can span lines.
          var li_accumulate = "";

          // Loop over the lines in this block looking for tight lists.
          tight_search:
          for ( var line_no = 0; line_no < lines.length; line_no++ ) {
            var nl = "",
                l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });

            // TODO: really should cache this
            var line_re = regex_for_depth( stack.length );

            m = l.match( line_re );
            //print( "line:", uneval(l), "\nline match:", uneval(m) );

            // We have a list item
            if ( m[1] !== undefined ) {
              // Process the previous list item, if any
              if ( li_accumulate.length ) {
                add( last_li, loose, this.processInline( li_accumulate ), nl );
                // Loose mode will have been dealt with. Reset it
                loose = false;
                li_accumulate = "";
              }

              m[1] = expand_tab( m[1] );
              var wanted_depth = Math.floor(m[1].length/4)+1;
              //print( "want:", wanted_depth, "stack:", stack.length);
              if ( wanted_depth > stack.length ) {
                // Deep enough for a nested list outright
                //print ( "new nested list" );
                list = make_list( m );
                last_li.push( list );
                last_li = list[1] = [ "listitem" ];
              }
              else {
                // We aren't deep enough to be strictly a new level. This is
                // where Md.pl goes nuts. If the indent matches a level in the
                // stack, put it there, else put it one deeper then the
                // wanted_depth deserves.
                var found = false;
                for ( i = 0; i < stack.length; i++ ) {
                  if ( stack[ i ].indent != m[1] ) continue;
                  list = stack[ i ].list;
                  stack.splice( i+1, stack.length - (i+1) );
                  found = true;
                  break;
                }

                if (!found) {
                  //print("not found. l:", uneval(l));
                  wanted_depth++;
                  if ( wanted_depth <= stack.length ) {
                    stack.splice(wanted_depth, stack.length - wanted_depth);
                    //print("Desired depth now", wanted_depth, "stack:", stack.length);
                    list = stack[wanted_depth-1].list;
                    //print("list:", uneval(list) );
                  }
                  else {
                    //print ("made new stack for messy indent");
                    list = make_list(m);
                    last_li.push(list);
                  }
                }

                //print( uneval(list), "last", list === stack[stack.length-1].list );
                last_li = [ "listitem" ];
                list.push(last_li);
              } // end depth of shenegains
              nl = "";
            }

            // Add content
            if ( l.length > m[0].length ) {
              li_accumulate += nl + l.substr( m[0].length );
            }
          } // tight_search

          if ( li_accumulate.length ) {
            add( last_li, loose, this.processInline( li_accumulate ), nl );
            // Loose mode will have been dealt with. Reset it
            loose = false;
            li_accumulate = "";
          }

          // Look at the next block - we might have a loose list. Or an extra
          // paragraph for the current li
          var contained = get_contained_blocks( stack.length, next );

          // Deal with code blocks or properly nested lists
          if ( contained.length > 0 ) {
            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            last_li.push.apply( last_li, this.toTree( contained, [] ) );
          }

          var next_block = next[0] && next[0].valueOf() || "";

          if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
            block = next.shift();

            // Check for an HR following a list: features/lists/hr_abutting
            var hr = this.dialect.block.horizRule( block, next );

            if ( hr ) {
              ret.push.apply(ret, hr);
              break;
            }

            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            loose = true;
            continue loose_search;
          }
          break;
        } // loose_search

        return ret;
      };
    })(),

    blockquote: function blockquote( block, next ) {
      if ( !block.match( /^>/m ) )
        return undefined;

      var jsonml = [];

      // separate out the leading abutting block, if any. I.e. in this case:
      //
      //  a
      //  > b
      //
      if ( block[ 0 ] != ">" ) {
        var lines = block.split( /\n/ ),
            prev = [],
            line_no = block.lineNumber;

        // keep shifting lines until you find a crotchet
        while ( lines.length && lines[ 0 ][ 0 ] != ">" ) {
            prev.push( lines.shift() );
            line_no++;
        }

        var abutting = mk_block( prev.join( "\n" ), "\n", block.lineNumber );
        jsonml.push.apply( jsonml, this.processBlock( abutting, [] ) );
        // reassemble new block of just block quotes!
        block = mk_block( lines.join( "\n" ), block.trailing, line_no );
      }


      // if the next block is also a blockquote merge it in
      while ( next.length && next[ 0 ][ 0 ] == ">" ) {
        var b = next.shift();
        block = mk_block( block + block.trailing + b, b.trailing, block.lineNumber );
      }

      // Strip off the leading "> " and re-process as a block.
      var input = block.replace( /^> ?/gm, "" ),
          old_tree = this.tree,
          processedBlock = this.toTree( input, [ "blockquote" ] ),
          attr = extract_attr( processedBlock );

      // If any link references were found get rid of them
      if ( attr && attr.references ) {
        delete attr.references;
        // And then remove the attribute object if it's empty
        if ( isEmpty( attr ) ) {
          processedBlock.splice( 1, 1 );
        }
      }

      jsonml.push( processedBlock );
      return jsonml;
    },

    referenceDefn: function referenceDefn( block, next) {
      var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
      // interesting matches are [ , ref_id, url, , title, title ]

      if ( !block.match(re) )
        return undefined;

      // make an attribute node if it doesn't exist
      if ( !extract_attr( this.tree ) ) {
        this.tree.splice( 1, 0, {} );
      }

      var attrs = extract_attr( this.tree );

      // make a references hash if it doesn't exist
      if ( attrs.references === undefined ) {
        attrs.references = {};
      }

      var b = this.loop_re_over_block(re, block, function( m ) {

        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        var ref = attrs.references[ m[1].toLowerCase() ] = {
          href: m[2]
        };

        if ( m[4] !== undefined )
          ref.title = m[4];
        else if ( m[5] !== undefined )
          ref.title = m[5];

      } );

      if ( b.length )
        next.unshift( mk_block( b, block.trailing ) );

      return [];
    },

    para: function para( block, next ) {
      // everything's a para!
      return [ ["para"].concat( this.processInline( block ) ) ];
    }
  }
};

Markdown.dialects.Gruber.inline = {

    __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
      var m,
          res,
          lastIndex = 0;

      patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
      var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

      m = re.exec( text );
      if (!m) {
        // Just boring text
        return [ text.length, text ];
      }
      else if ( m[1] ) {
        // Some un-interesting text matched. Return that first
        return [ m[1].length, m[1] ];
      }

      var res;
      if ( m[2] in this.dialect.inline ) {
        res = this.dialect.inline[ m[2] ].call(
                  this,
                  text.substr( m.index ), m, previous_nodes || [] );
      }
      // Default for now to make dev easier. just slurp special and output it.
      res = res || [ m[2].length, m[2] ];
      return res;
    },

    __call__: function inline( text, patterns ) {

      var out = [],
          res;

      function add(x) {
        //D:self.debug("  adding output", uneval(x));
        if ( typeof x == "string" && typeof out[out.length-1] == "string" )
          out[ out.length-1 ] += x;
        else
          out.push(x);
      }

      while ( text.length > 0 ) {
        res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
        text = text.substr( res.shift() );
        forEach(res, add )
      }

      return out;
    },

    // These characters are intersting elsewhere, so have rules for them so that
    // chunks of plain text blocks don't include them
    "]": function () {},
    "}": function () {},

    __escape__ : /^\\[\\`\*_{}\[\]()#\+.!\-]/,

    "\\": function escaped( text ) {
      // [ length of input processed, node/children to add... ]
      // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
      if ( this.dialect.inline.__escape__.exec( text ) )
        return [ 2, text.charAt( 1 ) ];
      else
        // Not an esacpe
        return [ 1, "\\" ];
    },

    "![": function image( text ) {

      // Unlike images, alt text is plain text only. no other elements are
      // allowed in there

      // ![Alt text](/path/to/img.jpg "Optional title")
      //      1          2            3       4         <--- captures
      var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

      if ( m ) {
        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

        var attrs = { alt: m[1], href: m[2] || "" };
        if ( m[4] !== undefined)
          attrs.title = m[4];

        return [ m[0].length, [ "img", attrs ] ];
      }

      // ![Alt text][id]
      m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

      if ( m ) {
        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion
        return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
      }

      // Just consume the '!['
      return [ 2, "![" ];
    },

    "[": function link( text ) {

      var orig = String(text);
      // Inline content is possible inside `link text`
      var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), "]" );

      // No closing ']' found. Just consume the [
      if ( !res ) return [ 1, "[" ];

      var consumed = 1 + res[ 0 ],
          children = res[ 1 ],
          link,
          attrs;

      // At this point the first [...] has been parsed. See what follows to find
      // out which kind of link we are (reference or direct url)
      text = text.substr( consumed );

      // [link text](/path/to/img.jpg "Optional title")
      //                 1            2       3         <--- captures
      // This will capture up to the last paren in the block. We then pull
      // back based on if there a matching ones in the url
      //    ([here](/url/(test))
      // The parens have to be balanced
      var m = text.match( /^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
      if ( m ) {
        var url = m[1];
        consumed += m[0].length;

        if ( url && url[0] == "<" && url[url.length-1] == ">" )
          url = url.substring( 1, url.length - 1 );

        // If there is a title we don't have to worry about parens in the url
        if ( !m[3] ) {
          var open_parens = 1; // One open that isn't in the capture
          for ( var len = 0; len < url.length; len++ ) {
            switch ( url[len] ) {
            case "(":
              open_parens++;
              break;
            case ")":
              if ( --open_parens == 0) {
                consumed -= url.length - len;
                url = url.substring(0, len);
              }
              break;
            }
          }
        }

        // Process escapes only
        url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

        attrs = { href: url || "" };
        if ( m[3] !== undefined)
          attrs.title = m[3];

        link = [ "link", attrs ].concat( children );
        return [ consumed, link ];
      }

      // [Alt text][id]
      // [Alt text] [id]
      m = text.match( /^\s*\[(.*?)\]/ );

      if ( m ) {

        consumed += m[ 0 ].length;

        // [links][] uses links as its reference
        attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

        link = [ "link_ref", attrs ].concat( children );

        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion.
        // Store the original so that conversion can revert if the ref isn't found.
        return [ consumed, link ];
      }

      // [id]
      // Only if id is plain (no formatting.)
      if ( children.length == 1 && typeof children[0] == "string" ) {

        attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
        link = [ "link_ref", attrs, children[0] ];
        return [ consumed, link ];
      }

      // Just consume the "["
      return [ 1, "[" ];
    },


    "<": function autoLink( text ) {
      var m;

      if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) != null ) {
        if ( m[3] ) {
          return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];

        }
        else if ( m[2] == "mailto" ) {
          return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
        }
        else
          return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
      }

      return [ 1, "<" ];
    },

    "`": function inlineCode( text ) {
      // Inline code block. as many backticks as you like to start it
      // Always skip over the opening ticks.
      var m = text.match( /(`+)(([\s\S]*?)\1)/ );

      if ( m && m[2] )
        return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
      else {
        // TODO: No matching end code found - warn!
        return [ 1, "`" ];
      }
    },

    "  \n": function lineBreak( text ) {
      return [ 3, [ "linebreak" ] ];
    }

};

// Meta Helper/generator method for em and strong handling
function strong_em( tag, md ) {

  var state_slot = tag + "_state",
      other_slot = tag == "strong" ? "em_state" : "strong_state";

  function CloseTag(len) {
    this.len_after = len;
    this.name = "close_" + md;
  }

  return function ( text, orig_match ) {

    if ( this[state_slot][0] == md ) {
      // Most recent em is of this type
      //D:this.debug("closing", md);
      this[state_slot].shift();

      // "Consume" everything to go back to the recrusion in the else-block below
      return[ text.length, new CloseTag(text.length-md.length) ];
    }
    else {
      // Store a clone of the em/strong states
      var other = this[other_slot].slice(),
          state = this[state_slot].slice();

      this[state_slot].unshift(md);

      //D:this.debug_indent += "  ";

      // Recurse
      var res = this.processInline( text.substr( md.length ) );
      //D:this.debug_indent = this.debug_indent.substr(2);

      var last = res[res.length - 1];

      //D:this.debug("processInline from", tag + ": ", uneval( res ) );

      var check = this[state_slot].shift();
      if ( last instanceof CloseTag ) {
        res.pop();
        // We matched! Huzzah.
        var consumed = text.length - last.len_after;
        return [ consumed, [ tag ].concat(res) ];
      }
      else {
        // Restore the state of the other kind. We might have mistakenly closed it.
        this[other_slot] = other;
        this[state_slot] = state;

        // We can't reuse the processed result as it could have wrong parsing contexts in it.
        return [ md.length, md ];
      }
    }
  }; // End returned function
}

Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
Markdown.dialects.Gruber.inline["*"]  = strong_em("em", "*");
Markdown.dialects.Gruber.inline["_"]  = strong_em("em", "_");


// Build default order from insertion order.
Markdown.buildBlockOrder = function(d) {
  var ord = [];
  for ( var i in d ) {
    if ( i == "__order__" || i == "__call__" ) continue;
    ord.push( i );
  }
  d.__order__ = ord;
};

// Build patterns for inline matcher
Markdown.buildInlinePatterns = function(d) {
  var patterns = [];

  for ( var i in d ) {
    // __foo__ is reserved and not a pattern
    if ( i.match( /^__.*__$/) ) continue;
    var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
             .replace( /\n/, "\\n" );
    patterns.push( i.length == 1 ? l : "(?:" + l + ")" );
  }

  patterns = patterns.join("|");
  d.__patterns__ = patterns;
  //print("patterns:", uneval( patterns ) );

  var fn = d.__call__;
  d.__call__ = function(text, pattern) {
    if ( pattern != undefined ) {
      return fn.call(this, text, pattern);
    }
    else
    {
      return fn.call(this, text, patterns);
    }
  };
};

Markdown.DialectHelpers = {};
Markdown.DialectHelpers.inline_until_char = function( text, want ) {
  var consumed = 0,
      nodes = [];

  while ( true ) {
    if ( text.charAt( consumed ) == want ) {
      // Found the character we were looking for
      consumed++;
      return [ consumed, nodes ];
    }

    if ( consumed >= text.length ) {
      // No closing char found. Abort.
      return null;
    }

    var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
    consumed += res[ 0 ];
    // Add any returned nodes.
    nodes.push.apply( nodes, res.slice( 1 ) );
  }
}

// Helper function to make sub-classing a dialect easier
Markdown.subclassDialect = function( d ) {
  function Block() {}
  Block.prototype = d.block;
  function Inline() {}
  Inline.prototype = d.inline;

  return { block: new Block(), inline: new Inline() };
};

Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );

Markdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );

Markdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {
  var meta = split_meta_hash( meta_string ),
      attr = {};

  for ( var i = 0; i < meta.length; ++i ) {
    // id: #foo
    if ( /^#/.test( meta[ i ] ) ) {
      attr.id = meta[ i ].substring( 1 );
    }
    // class: .foo
    else if ( /^\./.test( meta[ i ] ) ) {
      // if class already exists, append the new one
      if ( attr["class"] ) {
        attr["class"] = attr["class"] + meta[ i ].replace( /./, " " );
      }
      else {
        attr["class"] = meta[ i ].substring( 1 );
      }
    }
    // attribute: foo=bar
    else if ( /\=/.test( meta[ i ] ) ) {
      var s = meta[ i ].split( /\=/ );
      attr[ s[ 0 ] ] = s[ 1 ];
    }
  }

  return attr;
}

function split_meta_hash( meta_string ) {
  var meta = meta_string.split( "" ),
      parts = [ "" ],
      in_quotes = false;

  while ( meta.length ) {
    var letter = meta.shift();
    switch ( letter ) {
      case " " :
        // if we're in a quoted section, keep it
        if ( in_quotes ) {
          parts[ parts.length - 1 ] += letter;
        }
        // otherwise make a new part
        else {
          parts.push( "" );
        }
        break;
      case "'" :
      case '"' :
        // reverse the quotes and move straight on
        in_quotes = !in_quotes;
        break;
      case "\\" :
        // shift off the next letter to be used straight away.
        // it was escaped so we'll keep it whatever it is
        letter = meta.shift();
      default :
        parts[ parts.length - 1 ] += letter;
        break;
    }
  }

  return parts;
}

Markdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {
  // we're only interested in the first block
  if ( block.lineNumber > 1 ) return undefined;

  // document_meta blocks consist of one or more lines of `Key: Value\n`
  if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) ) return undefined;

  // make an attribute node if it doesn't exist
  if ( !extract_attr( this.tree ) ) {
    this.tree.splice( 1, 0, {} );
  }

  var pairs = block.split( /\n/ );
  for ( p in pairs ) {
    var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
        key = m[ 1 ].toLowerCase(),
        value = m[ 2 ];

    this.tree[ 1 ][ key ] = value;
  }

  // document_meta produces no content!
  return [];
};

Markdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {
  // check if the last line of the block is an meta hash
  var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
  if ( !m ) return undefined;

  // process the meta hash
  var attr = this.dialect.processMetaHash( m[ 2 ] );

  var hash;

  // if we matched ^ then we need to apply meta to the previous block
  if ( m[ 1 ] === "" ) {
    var node = this.tree[ this.tree.length - 1 ];
    hash = extract_attr( node );

    // if the node is a string (rather than JsonML), bail
    if ( typeof node === "string" ) return undefined;

    // create the attribute hash if it doesn't exist
    if ( !hash ) {
      hash = {};
      node.splice( 1, 0, hash );
    }

    // add the attributes in
    for ( a in attr ) {
      hash[ a ] = attr[ a ];
    }

    // return nothing so the meta hash is removed
    return [];
  }

  // pull the meta hash off the block and process what's left
  var b = block.replace( /\n.*$/, "" ),
      result = this.processBlock( b, [] );

  // get or make the attributes hash
  hash = extract_attr( result[ 0 ] );
  if ( !hash ) {
    hash = {};
    result[ 0 ].splice( 1, 0, hash );
  }

  // attach the attributes to the block
  for ( a in attr ) {
    hash[ a ] = attr[ a ];
  }

  return result;
};

Markdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {
  // one or more terms followed by one or more definitions, in a single block
  var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
      list = [ "dl" ],
      i, m;

  // see if we're dealing with a tight or loose block
  if ( ( m = block.match( tight ) ) ) {
    // pull subsequent tight DL blocks out of `next`
    var blocks = [ block ];
    while ( next.length && tight.exec( next[ 0 ] ) ) {
      blocks.push( next.shift() );
    }

    for ( var b = 0; b < blocks.length; ++b ) {
      var m = blocks[ b ].match( tight ),
          terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
          defns = m[ 2 ].split( /\n:\s+/ );

      // print( uneval( m ) );

      for ( i = 0; i < terms.length; ++i ) {
        list.push( [ "dt", terms[ i ] ] );
      }

      for ( i = 0; i < defns.length; ++i ) {
        // run inline processing over the definition
        list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
      }
    }
  }
  else {
    return undefined;
  }

  return [ list ];
};

// splits on unescaped instances of @ch. If @ch is not a character the result
// can be unpredictable

Markdown.dialects.Maruku.block.table = function table (block, next) {

    var _split_on_unescaped = function(s, ch) {
        ch = ch || '\\s';
        if (ch.match(/^[\\|\[\]{}?*.+^$]$/)) { ch = '\\' + ch; }
        var res = [ ],
            r = new RegExp('^((?:\\\\.|[^\\\\' + ch + '])*)' + ch + '(.*)'),
            m;
        while(m = s.match(r)) {
            res.push(m[1]);
            s = m[2];
        }
        res.push(s);
        return res;
    }

    var leading_pipe = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
        // find at least an unescaped pipe in each line
        no_leading_pipe = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,
        i, m;
    if (m = block.match(leading_pipe)) {
        // remove leading pipes in contents
        // (header and horizontal rule already have the leading pipe left out)
        m[3] = m[3].replace(/^\s*\|/gm, '');
    } else if (! ( m = block.match(no_leading_pipe))) {
        return undefined;
    }

    var table = [ "table", [ "thead", [ "tr" ] ], [ "tbody" ] ];

    // remove trailing pipes, then split on pipes
    // (no escaped pipes are allowed in horizontal rule)
    m[2] = m[2].replace(/\|\s*$/, '').split('|');

    // process alignment
    var html_attrs = [ ];
    forEach (m[2], function (s) {
        if (s.match(/^\s*-+:\s*$/))       html_attrs.push({align: "right"});
        else if (s.match(/^\s*:-+\s*$/))  html_attrs.push({align: "left"});
        else if (s.match(/^\s*:-+:\s*$/)) html_attrs.push({align: "center"});
        else                              html_attrs.push({});
    });

    // now for the header, avoid escaped pipes
    m[1] = _split_on_unescaped(m[1].replace(/\|\s*$/, ''), '|');
    for (i = 0; i < m[1].length; i++) {
        table[1][1].push(['th', html_attrs[i] || {}].concat(
            this.processInline(m[1][i].trim())));
    }

    // now for body contents
    forEach (m[3].replace(/\|\s*$/mg, '').split('\n'), function (row) {
        var html_row = ['tr'];
        row = _split_on_unescaped(row, '|');
        for (i = 0; i < row.length; i++) {
            html_row.push(['td', html_attrs[i] || {}].concat(this.processInline(row[i].trim())));
        }
        table[2].push(html_row);
    }, this);

    return [table];
}

Markdown.dialects.Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
  if ( !out.length ) {
    return [ 2, "{:" ];
  }

  // get the preceeding element
  var before = out[ out.length - 1 ];

  if ( typeof before === "string" ) {
    return [ 2, "{:" ];
  }

  // match a meta hash
  var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

  // no match, false alarm
  if ( !m ) {
    return [ 2, "{:" ];
  }

  // attach the attributes to the preceeding element
  var meta = this.dialect.processMetaHash( m[ 1 ] ),
      attr = extract_attr( before );

  if ( !attr ) {
    attr = {};
    before.splice( 1, 0, attr );
  }

  for ( var k in meta ) {
    attr[ k ] = meta[ k ];
  }

  // cut out the string and replace it with nothing
  return [ m[ 0 ].length, "" ];
};

Markdown.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;

Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );

var isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) == "[object Array]";
};

var forEach;
// Don't mess with Array.prototype. Its not friendly
if ( Array.prototype.forEach ) {
  forEach = function( arr, cb, thisp ) {
    return arr.forEach( cb, thisp );
  };
}
else {
  forEach = function(arr, cb, thisp) {
    for (var i = 0; i < arr.length; i++) {
      cb.call(thisp || arr, arr[i], i, arr);
    }
  }
}

var isEmpty = function( obj ) {
  for ( var key in obj ) {
    if ( hasOwnProperty.call( obj, key ) ) {
      return false;
    }
  }

  return true;
}

function extract_attr( jsonml ) {
  return isArray(jsonml)
      && jsonml.length > 1
      && typeof jsonml[ 1 ] === "object"
      && !( isArray(jsonml[ 1 ]) )
      ? jsonml[ 1 ]
      : undefined;
}



/**
 *  renderJsonML( jsonml[, options] ) -> String
 *  - jsonml (Array): JsonML array to render to XML
 *  - options (Object): options
 *
 *  Converts the given JsonML into well-formed XML.
 *
 *  The options currently understood are:
 *
 *  - root (Boolean): wether or not the root node should be included in the
 *    output, or just its children. The default `false` is to not include the
 *    root itself.
 */
expose.renderJsonML = function( jsonml, options ) {
  options = options || {};
  // include the root element in the rendered output?
  options.root = options.root || false;

  var content = [];

  if ( options.root ) {
    content.push( render_tree( jsonml ) );
  }
  else {
    jsonml.shift(); // get rid of the tag
    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
      jsonml.shift(); // get rid of the attributes
    }

    while ( jsonml.length ) {
      content.push( render_tree( jsonml.shift() ) );
    }
  }

  return content.join( "\n\n" );
};

function escapeHTML( text ) {
  return text.replace( /&/g, "&amp;" )
             .replace( /</g, "&lt;" )
             .replace( />/g, "&gt;" )
             .replace( /"/g, "&quot;" )
             .replace( /'/g, "&#39;" );
}

function render_tree( jsonml ) {
  // basic case
  if ( typeof jsonml === "string" ) {
    return escapeHTML( jsonml );
  }

  var tag = jsonml.shift(),
      attributes = {},
      content = [];

  if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
    attributes = jsonml.shift();
  }

  while ( jsonml.length ) {
    content.push( render_tree( jsonml.shift() ) );
  }

  var tag_attrs = "";
  for ( var a in attributes ) {
    tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';
  }

  // be careful about adding whitespace here for inline elements
  if ( tag == "img" || tag == "br" || tag == "hr" ) {
    return "<"+ tag + tag_attrs + "/>";
  }
  else {
    return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
  }
}

function convert_tree_to_html( tree, references, options ) {
  var i;
  options = options || {};

  // shallow clone
  var jsonml = tree.slice( 0 );

  if ( typeof options.preprocessTreeNode === "function" ) {
      jsonml = options.preprocessTreeNode(jsonml, references);
  }

  // Clone attributes if they exist
  var attrs = extract_attr( jsonml );
  if ( attrs ) {
    jsonml[ 1 ] = {};
    for ( i in attrs ) {
      jsonml[ 1 ][ i ] = attrs[ i ];
    }
    attrs = jsonml[ 1 ];
  }

  // basic case
  if ( typeof jsonml === "string" ) {
    return jsonml;
  }

  // convert this node
  switch ( jsonml[ 0 ] ) {
    case "header":
      jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
      delete jsonml[ 1 ].level;
      break;
    case "bulletlist":
      jsonml[ 0 ] = "ul";
      break;
    case "numberlist":
      jsonml[ 0 ] = "ol";
      break;
    case "listitem":
      jsonml[ 0 ] = "li";
      break;
    case "para":
      jsonml[ 0 ] = "p";
      break;
    case "markdown":
      jsonml[ 0 ] = "html";
      if ( attrs ) delete attrs.references;
      break;
    case "code_block":
      jsonml[ 0 ] = "pre";
      i = attrs ? 2 : 1;
      var code = [ "code" ];
      code.push.apply( code, jsonml.splice( i, jsonml.length - i ) );
      jsonml[ i ] = code;
      break;
    case "inlinecode":
      jsonml[ 0 ] = "code";
      break;
    case "img":
      jsonml[ 1 ].src = jsonml[ 1 ].href;
      delete jsonml[ 1 ].href;
      break;
    case "linebreak":
      jsonml[ 0 ] = "br";
    break;
    case "link":
      jsonml[ 0 ] = "a";
      break;
    case "link_ref":
      jsonml[ 0 ] = "a";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.href = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
    case "img_ref":
      jsonml[ 0 ] = "img";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.src = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
  }

  // convert all the children
  i = 1;

  // deal with the attribute node, if it exists
  if ( attrs ) {
    // if there are keys, skip over it
    for ( var key in jsonml[ 1 ] ) {
        i = 2;
        break;
    }
    // if there aren't, remove it
    if ( i === 1 ) {
      jsonml.splice( i, 1 );
    }
  }

  for ( ; i < jsonml.length; ++i ) {
    jsonml[ i ] = convert_tree_to_html( jsonml[ i ], references, options );
  }

  return jsonml;
}


// merges adjacent text nodes into a single node
function merge_text_nodes( jsonml ) {
  // skip the tag name and attribute hash
  var i = extract_attr( jsonml ) ? 2 : 1;

  while ( i < jsonml.length ) {
    // if it's a string check the next item too
    if ( typeof jsonml[ i ] === "string" ) {
      if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
        // merge the second string into the first and remove it
        jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
      }
      else {
        ++i;
      }
    }
    // if it's not a string recurse
    else {
      merge_text_nodes( jsonml[ i ] );
      ++i;
    }
  }
}

} )( (function() {
  if ( typeof exports === "undefined" ) {
    window.markdown = {};
    return window.markdown;
  }
  else {
    return exports;
  }
} )() );

},{"util":"node_modules/util/util.js"}],"node_modules/markdown/lib/index.js":[function(require,module,exports) {
// super simple module for the most common nodejs use case.
exports.markdown = require("./markdown");
exports.parse = exports.markdown.toHTML;

},{"./markdown":"node_modules/markdown/lib/markdown.js"}],"components/list.json":[function(require,module,exports) {
module.exports = [{
  "rendered_body": "\n\u003ch1\u003e\n\u003cspan id=\"dockerでdocker-image-push-dockeridというコマンドを実行した時\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#docker%E3%81%A7docker-image-push-dockerid%E3%81%A8%E3%81%84%E3%81%86%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%82%92%E5%AE%9F%E8%A1%8C%E3%81%97%E3%81%9F%E6%99%82\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eDockerで\u003ccode\u003edocker image push dockerID\u003c/code\u003eというコマンドを実行した時\u003c/h1\u003e\n\n\u003cp\u003e\u003ccode\u003edenied: requested access to the resource is denied\u003c/code\u003e\u003cbr\u003e\nこの様に表示された時はまず指定している\u003cstrong\u003edockerID\u003c/strong\u003eが自分dockerIDがあっているかを確認する。\u003c/p\u003e\n\n\u003cp\u003eこれでも解決されない時(preparingとwaitingまで出たけどまたdenitedが出た)は、\u003cbr\u003e\nおそらくpermissionの問題だと思うので、\u003cbr\u003e\n\u003ccode\u003edocker login\u003c/code\u003eというコマンドを叩いてログインすれば正しくpushできるはず。\u003c/p\u003e\n",
  "body": "#Dockerで```docker image push dockerID```というコマンドを実行した時\n```denied: requested access to the resource is denied```\nこの様に表示された時はまず指定している__dockerID__が自分dockerIDがあっているかを確認する。\n\nこれでも解決されない時(preparingとwaitingまで出たけどまたdenitedが出た)は、\nおそらくpermissionの問題だと思うので、\n```docker login```というコマンドを叩いてログインすれば正しくpushできるはず。\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T22:28:33+09:00",
  "group": null,
  "id": "0fff0b7c89297e8d130b",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Docker",
    "versions": []
  }, {
    "name": "DockerHub",
    "versions": []
  }],
  "title": "Dockerでpush時にrequested access to the resource is deniedとなる時",
  "updated_at": "2020-11-17T22:28:33+09:00",
  "url": "https://qiita.com/Naruse__0/items/0fff0b7c89297e8d130b",
  "user": {
    "description": null,
    "facebook_id": null,
    "followees_count": 1,
    "followers_count": 0,
    "github_login_name": "naruse666",
    "id": "Naruse__0",
    "items_count": 2,
    "linkedin_id": null,
    "location": null,
    "name": "",
    "organization": null,
    "permanent_id": 722539,
    "profile_image_url": "https://secure.gravatar.com/avatar/81cbcee67f9adb4161bbedf01835d766",
    "team_only": false,
    "twitter_screen_name": "Naruse__ganbaru",
    "website_url": null
  },
  "page_views_count": null
}, {
  "rendered_body": "\n\u003ch1\u003e\n\u003cspan id=\"はじめに\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eはじめに\u003c/h1\u003e\n\n\u003cp\u003eラズパイやJetsonでCustomVision推論するときに、時間かかるわエラーが出るわでなぜかonnxruntimeが入らないのでOpenCVでやってみようと思いました。その予行演習としてまずはWindowsノートPCで動かしてラズパイ＋Windowsで動かそうと思います。ちなみに、ノートPCで推論するなら普通にonnxruntime入れるほうが手っ取り早いです。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"ノートpcで推論\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%8E%E3%83%BC%E3%83%88pc%E3%81%A7%E6%8E%A8%E8%AB%96\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eノートPCで推論\u003c/h1\u003e\n\n\u003cp\u003e\u003cstrong\u003e環境\u003c/strong\u003e\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003ePython3.6(Anaconda)\u003c/li\u003e\n\u003cli\u003eOpenCV\u0026gt;=4.0.0\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003e必要なライブラリは、OpenCVとpillowとnumpyです。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003epip install pillow numpy opencv-python\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003eOpenCVはバージョン4以降じゃないとだめかもです。\u003cbr\u003e\nCustomVisionのモデルは、ONNXでエクスポートしてダウンロードしておいてください。Compactドメインで学習して、パフォーマンスタブからエクスポートできます(\u003ca href=\"https://docs.microsoft.com/ja-jp/azure/cognitive-services/custom-vision-service/export-your-model\" rel=\"nofollow noopener\" target=\"_blank\"\u003e参考\u003c/a\u003e)。\u003cbr\u003e\n展開したら以下のような構成になっていると思います。C#とPythonのサンプルコードがついてます。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e$ tree /f\nE:.\n│  cvexport.manifest\n│  labels.txt\n│  LICENSE\n│  model.onnx\n│\n├─CSharp\n│      ObjectDetection.cs\n│\n└─python\n    │  cntk_predict.py\n    │  object_detection.py\n    │  onnxruntime_predict.py\n    │\n    └─__pycache__\n            object_detection.cpython-36.pyc\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003epythonというフォルダに移動して以下のコードを保存します。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003einference.py\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"nn\"\u003ecv2\u003c/span\u003e\n\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"nn\"\u003enumpy\u003c/span\u003e \u003cspan class=\"k\"\u003eas\u003c/span\u003e \u003cspan class=\"n\"\u003enp\u003c/span\u003e\n\u003cspan class=\"kn\"\u003efrom\u003c/span\u003e \u003cspan class=\"nn\"\u003eobject_detection\u003c/span\u003e \u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"n\"\u003eObjectDetection\u003c/span\u003e\n\u003cspan class=\"kn\"\u003efrom\u003c/span\u003e \u003cspan class=\"nn\"\u003ePIL\u003c/span\u003e \u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"n\"\u003eImage\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eImageDraw\u003c/span\u003e\n\n\u003cspan class=\"n\"\u003efilename\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s\"\u003e'test1.png'\u003c/span\u003e        \u003cspan class=\"c1\"\u003e# 推論したい画像のパス\n\u003c/span\u003e\u003cspan class=\"n\"\u003emodelname\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s\"\u003e'../model.onnx'\u003c/span\u003e   \u003cspan class=\"c1\"\u003e# 推論に使うモデルのパス\n\u003c/span\u003e\u003cspan class=\"n\"\u003elabelpath\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s\"\u003e'../labels.txt'\u003c/span\u003e   \u003cspan class=\"c1\"\u003e# エクスポートした中にあったlabels.txtへのパス\n\u003c/span\u003e\n\u003cspan class=\"k\"\u003eclass\u003c/span\u003e \u003cspan class=\"nc\"\u003eODbyCV2\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eObjectDetection\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003e__init__\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003emodel_filename\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003elabels\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n        \u003cspan class=\"nb\"\u003esuper\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eODbyCV2\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e).\u003c/span\u003e\u003cspan class=\"n\"\u003e__init__\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003elabels\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n        \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003emodel\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ednn\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ereadNetFromONNX\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003emodelname\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003epredict\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n        \u003cspan class=\"n\"\u003eimg\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epil2cv\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n        \u003cspan class=\"n\"\u003eh\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003ew\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003ec\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eshape\u003c/span\u003e\n        \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003emodel\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003esetInput\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ednn\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eblobFromImage\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003esize\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ew\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003eh\u003c/span\u003e\u003cspan class=\"p\"\u003e),\u003c/span\u003e\u003cspan class=\"n\"\u003eswapRB\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"bp\"\u003eTrue\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003ecrop\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"bp\"\u003eFalse\u003c/span\u003e\u003cspan class=\"p\"\u003e))\u003c/span\u003e\n        \u003cspan class=\"n\"\u003eresults\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003emodel\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eforward\u003c/span\u003e\u003cspan class=\"p\"\u003e()\u003c/span\u003e\n        \u003cspan class=\"k\"\u003ereturn\u003c/span\u003e \u003cspan class=\"n\"\u003enp\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003esqueeze\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eresults\u003c/span\u003e\u003cspan class=\"p\"\u003e).\u003c/span\u003e\u003cspan class=\"n\"\u003etranspose\u003c/span\u003e\u003cspan class=\"p\"\u003e((\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"mi\"\u003e2\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e)).\u003c/span\u003e\u003cspan class=\"n\"\u003eastype\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003enp\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003efloat32\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003epil2cv\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eimage\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n        \u003cspan class=\"n\"\u003enew_image\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003enp\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003earray\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eimage\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edtype\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003enp\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003euint8\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"n\"\u003enew_image\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003endim\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"mi\"\u003e2\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n            \u003cspan class=\"k\"\u003epass\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eelif\u003c/span\u003e \u003cspan class=\"n\"\u003enew_image\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eshape\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"mi\"\u003e2\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"mi\"\u003e3\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n            \u003cspan class=\"n\"\u003enew_image\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ecvtColor\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003enew_image\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eCOLOR_RGB2BGR\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eelif\u003c/span\u003e \u003cspan class=\"n\"\u003enew_image\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eshape\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"mi\"\u003e2\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"mi\"\u003e4\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n            \u003cspan class=\"n\"\u003enew_image\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ecvtColor\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003enew_image\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eCOLOR_RGBA2BGRA\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n        \u003cspan class=\"k\"\u003ereturn\u003c/span\u003e \u003cspan class=\"n\"\u003enew_image\u003c/span\u003e\n\n\u003cspan class=\"c1\"\u003e# ラベル読み込み\n\u003c/span\u003e\u003cspan class=\"k\"\u003ewith\u003c/span\u003e \u003cspan class=\"nb\"\u003eopen\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003elabelpath\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"s\"\u003e'r'\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e \u003cspan class=\"k\"\u003eas\u003c/span\u003e \u003cspan class=\"n\"\u003ef\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n    \u003cspan class=\"n\"\u003elabels\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"n\"\u003el\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003estrip\u003c/span\u003e\u003cspan class=\"p\"\u003e()\u003c/span\u003e \u003cspan class=\"k\"\u003efor\u003c/span\u003e \u003cspan class=\"n\"\u003el\u003c/span\u003e \u003cspan class=\"ow\"\u003ein\u003c/span\u003e \u003cspan class=\"n\"\u003ef\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ereadlines\u003c/span\u003e\u003cspan class=\"p\"\u003e()]\u003c/span\u003e\n\n\u003cspan class=\"n\"\u003emodel\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eODbyCV2\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003emodelname\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003elabels\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003cspan class=\"n\"\u003eimg\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eImage\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eopen\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003efilename\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\n\u003cspan class=\"c1\"\u003e# 推論\n\u003c/span\u003e\u003cspan class=\"n\"\u003eresults\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003emodel\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epredict_image\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003cspan class=\"k\"\u003eprint\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eresults\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\n\u003cspan class=\"c1\"\u003e# 以下推論結果の表示\n\u003c/span\u003e\u003cspan class=\"n\"\u003eimg\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eimread\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003efilename\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003cspan class=\"n\"\u003eheight\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003ewidth\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003echannel\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eshape\u003c/span\u003e\n\n\u003cspan class=\"n\"\u003efont_face\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eFONT_HERSHEY_DUPLEX\u003c/span\u003e\n\u003cspan class=\"n\"\u003efont_scale\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"mf\"\u003e0.6\u003c/span\u003e\n\u003cspan class=\"n\"\u003efont_thickness\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"mi\"\u003e1\u003c/span\u003e\n\u003cspan class=\"k\"\u003efor\u003c/span\u003e \u003cspan class=\"n\"\u003eresult\u003c/span\u003e \u003cspan class=\"ow\"\u003ein\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"n\"\u003eresults\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e]]:\u003c/span\u003e\n    \u003cspan class=\"c1\"\u003e# if result['probability'] \u0026gt;= 0.3:\n\u003c/span\u003e    \u003cspan class=\"n\"\u003etext_str\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"nb\"\u003estr\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nb\"\u003eint\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eresult\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'tagName'\u003c/span\u003e\u003cspan class=\"p\"\u003e]))\u003c/span\u003e\n    \u003cspan class=\"n\"\u003etext_w\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003etext_h\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003egetTextSize\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003etext_str\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003efont_face\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003efont_scale\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003efont_thickness\u003c/span\u003e\u003cspan class=\"p\"\u003e)[\u003c/span\u003e\u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\n    \u003cspan class=\"n\"\u003escore_w\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003escore_h\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003egetTextSize\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nb\"\u003estr\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nb\"\u003eround\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eresult\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'probability'\u003c/span\u003e\u003cspan class=\"p\"\u003e],\u003c/span\u003e\u003cspan class=\"mi\"\u003e2\u003c/span\u003e\u003cspan class=\"p\"\u003e)),\u003c/span\u003e \u003cspan class=\"n\"\u003efont_face\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003efont_scale\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003efont_thickness\u003c/span\u003e\u003cspan class=\"p\"\u003e)[\u003c/span\u003e\u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ex1\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"nb\"\u003eint\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ewidth\u003c/span\u003e\u003cspan class=\"o\"\u003e*\u003c/span\u003e\u003cspan class=\"n\"\u003eresult\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'boundingBox'\u003c/span\u003e\u003cspan class=\"p\"\u003e][\u003c/span\u003e\u003cspan class=\"s\"\u003e'left'\u003c/span\u003e\u003cspan class=\"p\"\u003e])\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ey1\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"nb\"\u003eint\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eheight\u003c/span\u003e\u003cspan class=\"o\"\u003e*\u003c/span\u003e\u003cspan class=\"n\"\u003eresult\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'boundingBox'\u003c/span\u003e\u003cspan class=\"p\"\u003e][\u003c/span\u003e\u003cspan class=\"s\"\u003e'top'\u003c/span\u003e\u003cspan class=\"p\"\u003e])\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ex2\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"nb\"\u003eint\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ewidth\u003c/span\u003e\u003cspan class=\"o\"\u003e*\u003c/span\u003e\u003cspan class=\"n\"\u003eresult\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'boundingBox'\u003c/span\u003e\u003cspan class=\"p\"\u003e][\u003c/span\u003e\u003cspan class=\"s\"\u003e'width'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\u003cspan class=\"o\"\u003e+\u003c/span\u003e\u003cspan class=\"n\"\u003ewidth\u003c/span\u003e\u003cspan class=\"o\"\u003e*\u003c/span\u003e\u003cspan class=\"n\"\u003eresult\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'boundingBox'\u003c/span\u003e\u003cspan class=\"p\"\u003e][\u003c/span\u003e\u003cspan class=\"s\"\u003e'left'\u003c/span\u003e\u003cspan class=\"p\"\u003e])\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ey2\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"nb\"\u003eint\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eheight\u003c/span\u003e\u003cspan class=\"o\"\u003e*\u003c/span\u003e\u003cspan class=\"n\"\u003eresult\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'boundingBox'\u003c/span\u003e\u003cspan class=\"p\"\u003e][\u003c/span\u003e\u003cspan class=\"s\"\u003e'height'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\u003cspan class=\"o\"\u003e+\u003c/span\u003e\u003cspan class=\"n\"\u003eheight\u003c/span\u003e\u003cspan class=\"o\"\u003e*\u003c/span\u003e\u003cspan class=\"n\"\u003eresult\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'boundingBox'\u003c/span\u003e\u003cspan class=\"p\"\u003e][\u003c/span\u003e\u003cspan class=\"s\"\u003e'top'\u003c/span\u003e\u003cspan class=\"p\"\u003e])\u003c/span\u003e\n    \u003cspan class=\"n\"\u003etext_pt\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ex1\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ey1\u003c/span\u003e \u003cspan class=\"o\"\u003e-\u003c/span\u003e \u003cspan class=\"mi\"\u003e3\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"n\"\u003etext_color\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"mi\"\u003e255\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"mi\"\u003e255\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"mi\"\u003e255\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ergb\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"mi\"\u003e255\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003erectangle\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ex1\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ey1\u003c/span\u003e\u003cspan class=\"p\"\u003e),(\u003c/span\u003e\u003cspan class=\"n\"\u003ex2\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003ey2\u003c/span\u003e\u003cspan class=\"p\"\u003e),\u003c/span\u003e\u003cspan class=\"n\"\u003ergb\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"mi\"\u003e2\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003erectangle\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ex1\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ey1\u003c/span\u003e\u003cspan class=\"p\"\u003e),(\u003c/span\u003e\u003cspan class=\"n\"\u003ex1\u003c/span\u003e\u003cspan class=\"o\"\u003e+\u003c/span\u003e\u003cspan class=\"n\"\u003etext_w\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003ey1\u003c/span\u003e\u003cspan class=\"o\"\u003e-\u003c/span\u003e\u003cspan class=\"n\"\u003etext_h\u003c/span\u003e\u003cspan class=\"o\"\u003e-\u003c/span\u003e\u003cspan class=\"mi\"\u003e4\u003c/span\u003e\u003cspan class=\"p\"\u003e),\u003c/span\u003e\u003cspan class=\"n\"\u003ergb\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"o\"\u003e-\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003erectangle\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ex1\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ey1\u003c/span\u003e\u003cspan class=\"p\"\u003e),(\u003c/span\u003e\u003cspan class=\"n\"\u003ex1\u003c/span\u003e\u003cspan class=\"o\"\u003e+\u003c/span\u003e\u003cspan class=\"n\"\u003escore_w\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003ey1\u003c/span\u003e\u003cspan class=\"o\"\u003e+\u003c/span\u003e\u003cspan class=\"n\"\u003escore_h\u003c/span\u003e\u003cspan class=\"o\"\u003e+\u003c/span\u003e\u003cspan class=\"mi\"\u003e4\u003c/span\u003e\u003cspan class=\"p\"\u003e),\u003c/span\u003e\u003cspan class=\"n\"\u003ergb\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"o\"\u003e-\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eputText\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003etext_str\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003etext_pt\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003efont_face\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003efont_scale\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003etext_color\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003efont_thickness\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eLINE_AA\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eputText\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"nb\"\u003estr\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nb\"\u003eround\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eresult\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'probability'\u003c/span\u003e\u003cspan class=\"p\"\u003e],\u003c/span\u003e\u003cspan class=\"mi\"\u003e2\u003c/span\u003e\u003cspan class=\"p\"\u003e)),\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ex1\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ey1\u003c/span\u003e \u003cspan class=\"o\"\u003e+\u003c/span\u003e\u003cspan class=\"n\"\u003escore_h\u003c/span\u003e\u003cspan class=\"p\"\u003e),\u003c/span\u003e \u003cspan class=\"n\"\u003efont_face\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003efont_scale\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003etext_color\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003efont_thickness\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eLINE_AA\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\n\u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eimshow\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'test'\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003eimg\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ewaitKey\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003cspan class=\"n\"\u003ecv2\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003edestroyAllWindows\u003c/span\u003e\u003cspan class=\"p\"\u003e()\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cp\u003eエクスポートしてきたときについているサンプルコードを参考にしました。object_detection.pyのObjectDetectionクラスを継承してpredict関数をオーバーライドしています。このコードを実行すると以下のような結果が得られます。8がtagName、0.72がprobabilityです。\u003c/p\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F685335%2F763bd8b5-676e-bfbc-9e20-14ac65d0121c.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=aad23ed37abd5bc9c2930fd33efa885a\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F685335%2F763bd8b5-676e-bfbc-9e20-14ac65d0121c.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=aad23ed37abd5bc9c2930fd33efa885a\" alt=\"result.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/685335/763bd8b5-676e-bfbc-9e20-14ac65d0121c.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F685335%2F763bd8b5-676e-bfbc-9e20-14ac65d0121c.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=05417ce0e7c3dc909cfaf98cc7e1a9a6 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"ラズパイwindows10で推論\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%A9%E3%82%BA%E3%83%91%E3%82%A4windows10%E3%81%A7%E6%8E%A8%E8%AB%96\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eラズパイ(Windows10)で推論\u003c/h1\u003e\n\n\u003cp\u003e結論からいうと上記と全く同じ流れでできます。しかし、NumpyがWindows＋Armに対応してないのか、import時に以下のようなwarningが出て、推論時にもたくさんwarningが出てきます。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003eC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:172: RuntimeWarning: divide by zero encountered in exp2\n  eps=exp2(ld(-112)),\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:51: RuntimeWarning: divide by zero encountered in log10\n  self.precision = int(-log10(self.eps))\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:52: RuntimeWarning: divide by zero encountered in power\n  self.resolution = float_to_float(float_conv(10) ** (-self.precision))\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:184: RuntimeWarning: divide by zero encountered in exp2\n  epsneg_f80 = exp2(ld(-64))\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:185: RuntimeWarning: divide by zero encountered in exp2\n  tiny_f80 = exp2(ld(-16382))\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:199: RuntimeWarning: divide by zero encountered in exp2\n  eps=exp2(ld(-63)),\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:212: RuntimeWarning: divide by zero encountered in nextafter\n  if hasattr(umath, 'nextafter')  # Missing on some platforms?\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:224: RuntimeWarning: divide by zero encountered in exp2\n  eps=exp2(ld(-105)),\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:225: RuntimeWarning: divide by zero encountered in exp2\n  epsneg= exp2(ld(-106)),\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:227: RuntimeWarning: divide by zero encountered in exp2\n  tiny=exp2(ld(-1022)))\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\__init__.py:316: RuntimeWarning: divide by zero encountered in subtract\n  if not abs(x.dot(x) - 2.0) \u0026lt; 1e-5:\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\__init__.py:316: RuntimeWarning: divide by zero encountered in absolute\n  if not abs(x.dot(x) - 2.0) \u0026lt; 1e-5:\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e\u003ca href=\"https://github.com/numpy/numpy/issues/17747\" rel=\"nofollow noopener\" target=\"_blank\"\u003eここ\u003c/a\u003eに同じwarningが出るという報告がありますが解決策はわからず...。import時はともかく推論実行時に出るのでうまく推論できているのかもわからないです(同じような結果が得られるのでただしそうではありますが...)。解決策があれば教えてください。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"おわりに\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eおわりに\u003c/h1\u003e\n\n\u003cp\u003eお疲れさまでした。opencvでCustomVisionのモデルの推論をしました。cv2.dnn.forward()の出力が何を表しているかもわかっていないので知っている方は教えていただければ幸いです。\u003c/p\u003e\n\n\u003cp\u003e間違い等ありましたらご指摘よろしくお願いします。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"参考\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%8F%82%E8%80%83\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e参考\u003c/h1\u003e\n\n\u003cul\u003e\n\u003cli\u003e\u003ca href=\"https://qiita.com/mkht/items/9d173334dc5b26bfef46\" id=\"reference-ae628a4bc665ceb86eae\"\u003eラズパイ4にWindows 10 on ARM64をインストールする\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"https://qiita.com/derodero24/items/f22c22b22451609908ee\" id=\"reference-eced326668686dfd0894\"\u003e【Python】Pillow ↔ OpenCV 変換\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n",
  "body": "# はじめに\n\nラズパイやJetsonでCustomVision推論するときに、時間かかるわエラーが出るわでなぜかonnxruntimeが入らないのでOpenCVでやってみようと思いました。その予行演習としてまずはWindowsノートPCで動かしてラズパイ＋Windowsで動かそうと思います。ちなみに、ノートPCで推論するなら普通にonnxruntime入れるほうが手っ取り早いです。\n\n# ノートPCで推論\n\n**環境**\n\n- Python3.6(Anaconda)\n- OpenCV\u003e=4.0.0\n\n\n必要なライブラリは、OpenCVとpillowとnumpyです。\n\n```\npip install pillow numpy opencv-python\n```\n\nOpenCVはバージョン4以降じゃないとだめかもです。\nCustomVisionのモデルは、ONNXでエクスポートしてダウンロードしておいてください。Compactドメインで学習して、パフォーマンスタブからエクスポートできます([参考](https://docs.microsoft.com/ja-jp/azure/cognitive-services/custom-vision-service/export-your-model))。\n展開したら以下のような構成になっていると思います。C#とPythonのサンプルコードがついてます。\n\n```\n$ tree /f\nE:.\n│  cvexport.manifest\n│  labels.txt\n│  LICENSE\n│  model.onnx\n│\n├─CSharp\n│      ObjectDetection.cs\n│\n└─python\n    │  cntk_predict.py\n    │  object_detection.py\n    │  onnxruntime_predict.py\n    │\n    └─__pycache__\n            object_detection.cpython-36.pyc\n```\n\npythonというフォルダに移動して以下のコードを保存します。\n\n```python:inference.py\nimport cv2\nimport numpy as np\nfrom object_detection import ObjectDetection\nfrom PIL import Image, ImageDraw\n\nfilename = 'test1.png'        # 推論したい画像のパス\nmodelname = '../model.onnx'   # 推論に使うモデルのパス\nlabelpath = '../labels.txt'   # エクスポートした中にあったlabels.txtへのパス\n\nclass ODbyCV2(ObjectDetection):\n    def __init__(self, model_filename, labels):\n        super(ODbyCV2, self).__init__(labels)\n        self.model = cv2.dnn.readNetFromONNX(modelname)\n    def predict(self, img):\n        img = self.pil2cv(img)\n        h,w,c = img.shape\n        self.model.setInput(cv2.dnn.blobFromImage(img,size=(w,h),swapRB=True,crop=False))\n        results = self.model.forward()\n        return np.squeeze(results).transpose((1,2,0)).astype(np.float32)\n    def pil2cv(self, image):\n        new_image = np.array(image, dtype=np.uint8)\n        if new_image.ndim == 2:\n            pass\n        elif new_image.shape[2] == 3:\n            new_image = cv2.cvtColor(new_image, cv2.COLOR_RGB2BGR)\n        elif new_image.shape[2] == 4:\n            new_image = cv2.cvtColor(new_image, cv2.COLOR_RGBA2BGRA)\n        return new_image\n\n# ラベル読み込み\nwith open(labelpath, 'r') as f:\n    labels = [l.strip() for l in f.readlines()]\n\nmodel = ODbyCV2(modelname,labels)\nimg = Image.open(filename)\n\n# 推論\nresults = model.predict_image(img)\nprint(results)\n\n# 以下推論結果の表示\nimg = cv2.imread(filename)\nheight,width,channel = img.shape\n\nfont_face = cv2.FONT_HERSHEY_DUPLEX\nfont_scale = 0.6\nfont_thickness = 1\nfor result in [results[0]]:\n    # if result['probability'] \u003e= 0.3:\n    text_str = str(int(result['tagName']))\n    text_w, text_h = cv2.getTextSize(text_str, font_face, font_scale, font_thickness)[0]\n    score_w, score_h = cv2.getTextSize(str(round(result['probability'],2)), font_face, font_scale, font_thickness)[0]\n    x1 = int(width*result['boundingBox']['left'])\n    y1 = int(height*result['boundingBox']['top'])\n    x2 = int(width*result['boundingBox']['width']+width*result['boundingBox']['left'])\n    y2 = int(height*result['boundingBox']['height']+height*result['boundingBox']['top'])\n    text_pt = (x1, y1 - 3)\n    text_color = [255,255,255]\n    rgb = [255,0,0]\n    cv2.rectangle(img, (x1, y1),(x2,y2),rgb,2)\n    cv2.rectangle(img, (x1, y1),(x1+text_w,y1-text_h-4),rgb,-1)\n    cv2.rectangle(img, (x1, y1),(x1+score_w,y1+score_h+4),rgb,-1)\n    cv2.putText(img, text_str, text_pt, font_face, font_scale, text_color, font_thickness, cv2.LINE_AA)\n    cv2.putText(img, str(round(result['probability'],2)), (x1, y1 +score_h), font_face, font_scale, text_color, font_thickness, cv2.LINE_AA)\n        \ncv2.imshow('test',img)\ncv2.waitKey(0)\ncv2.destroyAllWindows()\n```\n\nエクスポートしてきたときについているサンプルコードを参考にしました。object_detection.pyのObjectDetectionクラスを継承してpredict関数をオーバーライドしています。このコードを実行すると以下のような結果が得られます。8がtagName、0.72がprobabilityです。\n\n![result.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/685335/763bd8b5-676e-bfbc-9e20-14ac65d0121c.png)\n\n# ラズパイ(Windows10)で推論\n\n結論からいうと上記と全く同じ流れでできます。しかし、NumpyがWindows＋Armに対応してないのか、import時に以下のようなwarningが出て、推論時にもたくさんwarningが出てきます。\n\n```\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:172: RuntimeWarning: divide by zero encountered in exp2\n  eps=exp2(ld(-112)),\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:51: RuntimeWarning: divide by zero encountered in log10\n  self.precision = int(-log10(self.eps))\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:52: RuntimeWarning: divide by zero encountered in power\n  self.resolution = float_to_float(float_conv(10) ** (-self.precision))\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:184: RuntimeWarning: divide by zero encountered in exp2\n  epsneg_f80 = exp2(ld(-64))\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:185: RuntimeWarning: divide by zero encountered in exp2\n  tiny_f80 = exp2(ld(-16382))\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:199: RuntimeWarning: divide by zero encountered in exp2\n  eps=exp2(ld(-63)),\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:212: RuntimeWarning: divide by zero encountered in nextafter\n  if hasattr(umath, 'nextafter')  # Missing on some platforms?\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:224: RuntimeWarning: divide by zero encountered in exp2\n  eps=exp2(ld(-105)),\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:225: RuntimeWarning: divide by zero encountered in exp2\n  epsneg= exp2(ld(-106)),\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\core\\getlimits.py:227: RuntimeWarning: divide by zero encountered in exp2\n  tiny=exp2(ld(-1022)))\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\__init__.py:316: RuntimeWarning: divide by zero encountered in subtract\n  if not abs(x.dot(x) - 2.0) \u003c 1e-5:\nC:\\Users\\pi\\anaconda3\\envs\\test\\lib\\site-packages\\numpy\\__init__.py:316: RuntimeWarning: divide by zero encountered in absolute\n  if not abs(x.dot(x) - 2.0) \u003c 1e-5:\n```\n\n[ここ](https://github.com/numpy/numpy/issues/17747)に同じwarningが出るという報告がありますが解決策はわからず...。import時はともかく推論実行時に出るのでうまく推論できているのかもわからないです(同じような結果が得られるのでただしそうではありますが...)。解決策があれば教えてください。\n\n\n# おわりに\nお疲れさまでした。opencvでCustomVisionのモデルの推論をしました。cv2.dnn.forward()の出力が何を表しているかもわかっていないので知っている方は教えていただければ幸いです。\n\n間違い等ありましたらご指摘よろしくお願いします。\n\n# 参考\n\n- [ラズパイ4にWindows 10 on ARM64をインストールする](https://qiita.com/mkht/items/9d173334dc5b26bfef46)\n- [【Python】Pillow ↔ OpenCV 変換](https://qiita.com/derodero24/items/f22c22b22451609908ee)\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T22:27:07+09:00",
  "group": null,
  "id": "2563d48bd2fb4637fccb",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "OpenCV",
    "versions": []
  }, {
    "name": "RaspberryPi",
    "versions": []
  }, {
    "name": "CustomVision",
    "versions": []
  }],
  "title": "OpenCVでCustomVision推論",
  "updated_at": "2020-11-17T22:27:07+09:00",
  "url": "https://qiita.com/yosiiii/items/2563d48bd2fb4637fccb",
  "user": {
    "description": "大学院で制御工学を勉強しています。\r\n趣味はバイクに乗ることです。",
    "facebook_id": "",
    "followees_count": 0,
    "followers_count": 0,
    "github_login_name": null,
    "id": "yosiiii",
    "items_count": 4,
    "linkedin_id": "",
    "location": "熊本",
    "name": "",
    "organization": "",
    "permanent_id": 685335,
    "profile_image_url": "https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/685335/4d33f198913677e047436cbae520aca39cc407b3/large.png?1602159536",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth\u003e開発環境\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd\u003emacOS Big Sur\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n\n\u003cp\u003e下記の記事を参考に環境構築を行ったのですが、\u003cbr\u003e\nやれ\u003ccode\u003ewget\u003c/code\u003eコマンドが無いだの、\u003ccode\u003eapt-get\u003c/code\u003eコマンドが無いだの初心者の方への導入への障壁がいくつかあったため、\u003cbr\u003e\nそれを乗り越えるための記事にしたいと思います。（※注：下記の記事は決して悪くありません。）\u003c/p\u003e\n\n\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth\u003eタイトル\u003c/th\u003e\n\u003cth\u003eリンク\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd\u003e5分で作るLaravel＋Vue.js開発環境（docker-compose）\u003c/td\u003e\n\u003ctd\u003e\u003ca href=\"https://qiita.com/yusukeito58/items/37bd551560e495dbd1b8\" class=\"autolink\" id=\"reference-78c879742258b3fc1629\"\u003ehttps://qiita.com/yusukeito58/items/37bd551560e495dbd1b8\u003c/a\u003e\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"apt-getコマンドインストール\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#apt-get%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e\u003ccode\u003eapt-get\u003c/code\u003eコマンドインストール\u003c/h1\u003e\n\n\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth\u003eタイトル\u003c/th\u003e\n\u003cth\u003eリンク\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd\u003eMac - wgetコマンドをインストール（使えるようにする）\u003c/td\u003e\n\u003ctd\u003e\u003ca href=\"https://qiita.com/th4inf/items/f85c1b91065d85af67b9\" class=\"autolink\" id=\"reference-62bbad6e8aee0d509ec6\"\u003ehttps://qiita.com/th4inf/items/f85c1b91065d85af67b9\u003c/a\u003e\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"apt-getコマンドインストール-1\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#apt-get%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB-1\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e\u003ccode\u003eapt-get\u003c/code\u003eコマンドインストール\u003c/h1\u003e\n\n\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth\u003eタイトル\u003c/th\u003e\n\u003cth\u003eリンク\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd\u003einstall apt-get to Mac\u003c/td\u003e\n\u003ctd\u003e\u003ca href=\"https://qiita.com/th4inf/items/f85c1b91065d85af67b9\" class=\"autolink\"\u003ehttps://qiita.com/th4inf/items/f85c1b91065d85af67b9\u003c/a\u003e\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n",
  "body": "|開発環境|\n|---|\n|macOS Big Sur|\n\n\n\n下記の記事を参考に環境構築を行ったのですが、\nやれ`wget`コマンドが無いだの、`apt-get`コマンドが無いだの初心者の方への導入への障壁がいくつかあったため、\nそれを乗り越えるための記事にしたいと思います。（※注：下記の記事は決して悪くありません。）\n\n|タイトル|リンク|\n|---|---|\n|5分で作るLaravel＋Vue.js開発環境（docker-compose）|https://qiita.com/yusukeito58/items/37bd551560e495dbd1b8|\n\n# `apt-get`コマンドインストール\n|タイトル|リンク|\n|---|---|\n|Mac - wgetコマンドをインストール（使えるようにする）|https://qiita.com/th4inf/items/f85c1b91065d85af67b9|\n\n# `apt-get`コマンドインストール\n|タイトル|リンク|\n|---|---|\n|install apt-get to Mac|https://qiita.com/th4inf/items/f85c1b91065d85af67b9|\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T22:26:07+09:00",
  "group": null,
  "id": "5c01042ad4f7481447af",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "PHP",
    "versions": []
  }, {
    "name": "Laravel",
    "versions": []
  }, {
    "name": "Docker",
    "versions": []
  }, {
    "name": "Vue.js",
    "versions": []
  }],
  "title": "5分で作るDocker＋Laravel PHP＋Vue.js開発環境構築",
  "updated_at": "2020-11-17T22:26:07+09:00",
  "url": "https://qiita.com/captainUmaru/items/5c01042ad4f7481447af",
  "user": {
    "description": "",
    "facebook_id": "profile.php?id=100004569888629",
    "followees_count": 0,
    "followers_count": 0,
    "github_login_name": null,
    "id": "captainUmaru",
    "items_count": 6,
    "linkedin_id": "",
    "location": "",
    "name": "Lightning Spring",
    "organization": "",
    "permanent_id": 394931,
    "profile_image_url": "https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/394931/9e2fd3fbecbf8a32a5e85941ac53e14fba85487b/large.png?1605104726",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003cp\u003e個人的メモです。\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"ダウンロードしたモデルの場所\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%97%E3%81%9F%E3%83%A2%E3%83%87%E3%83%AB%E3%81%AE%E5%A0%B4%E6%89%80\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eダウンロードしたモデルの場所\u003c/h2\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F512516%2F65b43b75-591d-de15-d2c1-eddc0f7eb037.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=33c5ca5d0fbb131459c611b391302104\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F512516%2F65b43b75-591d-de15-d2c1-eddc0f7eb037.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=33c5ca5d0fbb131459c611b391302104\" alt=\"Screenshot from 2020-11-17 22-01-28.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/512516/65b43b75-591d-de15-d2c1-eddc0f7eb037.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F512516%2F65b43b75-591d-de15-d2c1-eddc0f7eb037.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=a06ddb7ec8f528d5a88482fd0d4e0a73 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"yamlファイル内容\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#yaml%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%86%85%E5%AE%B9\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eyamlファイル内容\u003c/h2\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F512516%2F01eb2583-ad1d-b60d-93d7-549175ae09c7.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=f73b31aba4419b08ec985402a0a37401\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F512516%2F01eb2583-ad1d-b60d-93d7-549175ae09c7.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=f73b31aba4419b08ec985402a0a37401\" alt=\"Screenshot from 2020-11-17 22-03-22.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/512516/01eb2583-ad1d-b60d-93d7-549175ae09c7.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F512516%2F01eb2583-ad1d-b60d-93d7-549175ae09c7.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=ff4bf170b2d09c76a1aa7fe759696974 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"stl表示サンプル\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#stl%E8%A1%A8%E7%A4%BA%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eSTL表示サンプル\u003c/h2\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F512516%2F82a1a84e-2232-7aeb-fbab-92b146d0688c.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=f1a13f9144430f21f7595d341db8106d\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F512516%2F82a1a84e-2232-7aeb-fbab-92b146d0688c.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=f1a13f9144430f21f7595d341db8106d\" alt=\"Screenshot from 2020-11-17 22-11-44.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/512516/82a1a84e-2232-7aeb-fbab-92b146d0688c.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F512516%2F82a1a84e-2232-7aeb-fbab-92b146d0688c.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=d03117a65ee18a7fd02ecd104b7b0bd3 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n",
  "body": "個人的メモです。\n\n##ダウンロードしたモデルの場所\n![Screenshot from 2020-11-17 22-01-28.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/512516/65b43b75-591d-de15-d2c1-eddc0f7eb037.png)\n\n##yamlファイル内容\n![Screenshot from 2020-11-17 22-03-22.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/512516/01eb2583-ad1d-b60d-93d7-549175ae09c7.png)\n\n##STL表示サンプル\n![Screenshot from 2020-11-17 22-11-44.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/512516/82a1a84e-2232-7aeb-fbab-92b146d0688c.png)\n\n\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T22:17:52+09:00",
  "group": null,
  "id": "7b561d6b4f0b2632c07a",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Gazebo",
    "versions": []
  }, {
    "name": "Ignition",
    "versions": []
  }],
  "title": "Ignition Gazebo モデル表示　メモ",
  "updated_at": "2020-11-17T22:18:25+09:00",
  "url": "https://qiita.com/moto4MBW/items/7b561d6b4f0b2632c07a",
  "user": {
    "description": null,
    "facebook_id": null,
    "followees_count": 1,
    "followers_count": 0,
    "github_login_name": null,
    "id": "moto4MBW",
    "items_count": 1,
    "linkedin_id": null,
    "location": null,
    "name": "",
    "organization": null,
    "permanent_id": 512516,
    "profile_image_url": "https://secure.gravatar.com/avatar/1bde3ccf590d427de12d8f7ed9661a8b",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": null
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003cp\u003e未経験からエンジニアになって2年目になるのですが、そろそろ何かしらの資格に挑戦してみようかなあと思い、SAAを受験してみました。\u003c/p\u003e\n\n\u003cp\u003e勉強期間、試験内容など、どんな感じだったかまとめていきたいと思います〜\u003c/p\u003e\n\n\u003cp\u003eSAAの試験の概要は\u003ca href=\"https://aws.amazon.com/jp/certification/certified-solutions-architect-associate/\" rel=\"nofollow noopener\" target=\"_blank\"\u003eこちら\u003c/a\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"勉強時間勉強方法\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%8B%89%E5%BC%B7%E6%99%82%E9%96%93%E5%8B%89%E5%BC%B7%E6%96%B9%E6%B3%95\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e勉強時間、勉強方法\u003c/h2\u003e\n\n\u003cp\u003e勉強期間はトータルして大体5週間ちょっとぐらいです。9月下旬に勉強を始めて、11月16日に試験を受けたので、期間としては2ヶ月程ありますが、サボったり、仕事が忙しかったり、ドラマにはまってしまったりwと勉強してない期間も結構あったので、そこは省いた期間となります。\u003c/p\u003e\n\n\u003cp\u003e教材は、Udemyで、\u003cbr\u003e\n- AWS認定ソリューションアーキテクト – アソシエイト試験突破講座\u003cbr\u003e\n- AWS認定ソリューションアーキテクト アソシエイト模擬試験問題集\u003c/p\u003e\n\n\u003cp\u003eこの２つを購入しました。\u003c/p\u003e\n\n\u003cp\u003e勉強方法としてはいたってシンプルで、\u003c/p\u003e\n\n\u003col\u003e\n\u003cli\u003e教材の動画をみて内容を理解\u003c/li\u003e\n\u003cli\u003e問題を解く。\u003c/li\u003e\n\u003cli\u003e解けるようになるまで繰り返す。\u003c/li\u003e\n\u003c/ol\u003e\n\n\u003cp\u003eこんな感じでやりました。\u003c/p\u003e\n\n\u003cp\u003e正直、これやっとけば全然受かるやろと調子こいてましたが、蓋を開けてみたら、合格ラインが720/1000のところ、741点とめっちゃギリギリで合格してました。。ひえ。。\u003c/p\u003e\n\n\u003cp\u003e今になってから言えることですが、結構ちゃんと勉強しないと受からない試験なんじゃないかなと思います。。\u003c/p\u003e\n\n\u003cp\u003e自分の場合、ただひたすら解いて覚えることに集中してしまい、\u003c/p\u003e\n\n\u003cp\u003e内容を根本から理解する、仕組みを理解する\u003c/p\u003e\n\n\u003cp\u003eといったことがちょっと甘くなってました。\u003c/p\u003e\n\n\u003cp\u003eこれが、あまり点数が取れなかった原因だと思ってます。\u003c/p\u003e\n\n\u003cp\u003eただ、このudemyの教材で、試験直前に復習していた内容が、ほぼほぼそのまま出たりもしました。(逆にそれがなかったら落ちてたんじゃないかとw)\u003c/p\u003e\n\n\u003cp\u003eなので、この教材はすごいおすすめです。\u003c/p\u003e\n\n\u003cp\u003e一つ言うなら、ちょっと解説が分かりにくいというか、足りないことがちょこちょこあるので、そういったところは、随時調べて意味を理解する、、という作業が必要になるかと思います。\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"受験時の試験内容\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%8F%97%E9%A8%93%E6%99%82%E3%81%AE%E8%A9%A6%E9%A8%93%E5%86%85%E5%AE%B9\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e受験時の試験内容\u003c/h2\u003e\n\n\u003cp\u003e試験内容としては、主に\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003eEBS, EFS, S3 \u003c/li\u003e\n\u003cli\u003eAuto Scaling, Ec2、CloudFrontあたりを使ったアーキテクチャ構成\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003eこの辺りの問題が結構出てきた印象でした。\u003c/p\u003e\n\n\u003cp\u003e試験を受けた後に、分野別にスコアと評価が見られるのですが、「高パフォーマンスアーキテクチャの設計」については、再学習した方が良いよーと書かれてました。やはり問題を解くだけでなく、特にアーキテクチャに関しては、自分で図を書いてみたり等、理解することに重点を置いた勉強も大事なのではないかと思いました。\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"受験後の感想\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%8F%97%E9%A8%93%E5%BE%8C%E3%81%AE%E6%84%9F%E6%83%B3\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e受験後の感想\u003c/h3\u003e\n\n\u003cp\u003e資格としては取得できたものの、\u003cbr\u003e\n知識としては曖昧な部分も結構多く、決してドヤ顔はできません。\u003c/p\u003e\n\n\u003cp\u003e実際に触ってなんぼ、なところもあるかなと思っているので、\u003cbr\u003e\n改めて、色々アプリを動かしてみながらインフラを触っていくことでもっとできるようになれればと思います〜\u003c/p\u003e\n",
  "body": "未経験からエンジニアになって2年目になるのですが、そろそろ何かしらの資格に挑戦してみようかなあと思い、SAAを受験してみました。\n\n\n勉強期間、試験内容など、どんな感じだったかまとめていきたいと思います〜\n\n\nSAAの試験の概要は[こちら](https://aws.amazon.com/jp/certification/certified-solutions-architect-associate/)\n\n\n## 勉強時間、勉強方法\n\n\n勉強期間はトータルして大体5週間ちょっとぐらいです。9月下旬に勉強を始めて、11月16日に試験を受けたので、期間としては2ヶ月程ありますが、サボったり、仕事が忙しかったり、ドラマにはまってしまったりwと勉強してない期間も結構あったので、そこは省いた期間となります。\n\n教材は、Udemyで、\n- AWS認定ソリューションアーキテクト – アソシエイト試験突破講座\n- AWS認定ソリューションアーキテクト アソシエイト模擬試験問題集\n\nこの２つを購入しました。\n\n勉強方法としてはいたってシンプルで、\n\n1. 教材の動画をみて内容を理解\n2. 問題を解く。\n3. 解けるようになるまで繰り返す。\n\nこんな感じでやりました。\n\n正直、これやっとけば全然受かるやろと調子こいてましたが、蓋を開けてみたら、合格ラインが720/1000のところ、741点とめっちゃギリギリで合格してました。。ひえ。。\n\n\n今になってから言えることですが、結構ちゃんと勉強しないと受からない試験なんじゃないかなと思います。。\n\n自分の場合、ただひたすら解いて覚えることに集中してしまい、\n\n内容を根本から理解する、仕組みを理解する\n\nといったことがちょっと甘くなってました。\n\n\nこれが、あまり点数が取れなかった原因だと思ってます。\n\n\nただ、このudemyの教材で、試験直前に復習していた内容が、ほぼほぼそのまま出たりもしました。(逆にそれがなかったら落ちてたんじゃないかとw)\n\n\nなので、この教材はすごいおすすめです。\n\n一つ言うなら、ちょっと解説が分かりにくいというか、足りないことがちょこちょこあるので、そういったところは、随時調べて意味を理解する、、という作業が必要になるかと思います。\n\n\n## 受験時の試験内容\n\n試験内容としては、主に\n\n- EBS, EFS, S3 \n- Auto Scaling, Ec2、CloudFrontあたりを使ったアーキテクチャ構成\n\n\nこの辺りの問題が結構出てきた印象でした。\n\n\n試験を受けた後に、分野別にスコアと評価が見られるのですが、「高パフォーマンスアーキテクチャの設計」については、再学習した方が良いよーと書かれてました。やはり問題を解くだけでなく、特にアーキテクチャに関しては、自分で図を書いてみたり等、理解することに重点を置いた勉強も大事なのではないかと思いました。\n\n\n### 受験後の感想\n\n資格としては取得できたものの、\n知識としては曖昧な部分も結構多く、決してドヤ顔はできません。\n\n実際に触ってなんぼ、なところもあるかなと思っているので、\n改めて、色々アプリを動かしてみながらインフラを触っていくことでもっとできるようになれればと思います〜\n\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T22:15:48+09:00",
  "group": null,
  "id": "a6df3f43d3bd4b4ffe00",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "AWS",
    "versions": []
  }, {
    "name": "saa",
    "versions": []
  }, {
    "name": "SAA-C02",
    "versions": []
  }],
  "title": "SAAに合格したのでどんな感じだったか書いてみる",
  "updated_at": "2020-11-17T22:15:48+09:00",
  "url": "https://qiita.com/katsu_puchi/items/a6df3f43d3bd4b4ffe00",
  "user": {
    "description": "",
    "facebook_id": "",
    "followees_count": 0,
    "followers_count": 0,
    "github_login_name": null,
    "id": "katsu_puchi",
    "items_count": 1,
    "linkedin_id": "",
    "location": "",
    "name": "カツ",
    "organization": "",
    "permanent_id": 399271,
    "profile_image_url": "https://pbs.twimg.com/profile_images/1210581518680088577/KVDMP6l6_bigger.jpg",
    "team_only": false,
    "twitter_screen_name": "katsu_puchi",
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003cp\u003eコンテナ初学者の新人社員でk8sを勉強しています。\u003c/p\u003e\n\n\u003cp\u003e今回はAWSのEC2にMinikubeをインストールして、nginxのテストページが見れるまでの手順を記したいと思います。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"開発環境\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e開発環境\u003c/h1\u003e\n\n\u003cul\u003e\n\u003cli\u003eAWS EC2 t3.small\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003e今回、Minikubeを利用する環境として、EC2のt3.smallを選択しました。\u003cbr\u003e\n2GB以上のメモリや20GB以上のディスクスペースがないとMinikubeをうまくインストールできないようです。\u003c/p\u003e\n\n\u003cp\u003e多少料金がかかってしまいます。試す場合は注意しましょう。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"準備\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%BA%96%E5%82%99\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e準備\u003c/h1\u003e\n\n\u003cp\u003eEC2インスタンスを起動する手順までは省きます。私はやりなれているUbuntuをインストールしたEC2を選択しました。\u003c/p\u003e\n\n\u003cp\u003e以下のように入力して起動したEC2に接続します。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e$ ssh -i test-key.pem ubuntu@xxx.xxx.xxx.xxx\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003etest-key.pem はEC2を作成した際にダウンロードした鍵のファイル名です。\u003cbr\u003e\nxxx.xxx.xxx.xxx はEC2のパブリックIPを指定します。\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"dockerのインストール\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#docker%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eDockerのインストール\u003c/h3\u003e\n\n\u003cp\u003e無事EC2に接続できたらDockerをインストールしましょう。\u003cbr\u003e\nほぼ\u003ca href=\"https://docs.docker.com/engine/install/ubuntu/\" rel=\"nofollow noopener\" target=\"_blank\"\u003e公式の手順通り\u003c/a\u003eです。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"terminal\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eDockerのインストール\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eUbuntuのパッケージをアップデート\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo \u003c/span\u003eapt-get update\n\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e必要なパッケージのインストール\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo \u003c/span\u003eapt-get \u003cspan class=\"nb\"\u003einstall\u003c/span\u003e \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n    apt-transport-https \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n    ca-certificates \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n    curl \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n    gnupg-agent \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n    software-properties-common\n\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eDockerの公式GPGキーの追加\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ecurl \u003cspan class=\"nt\"\u003e-fsSL\u003c/span\u003e https://download.docker.com/linux/ubuntu/gpg | \u003cspan class=\"nb\"\u003esudo \u003c/span\u003eapt-key add -\n\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eDockerのダウンロードサイトをaptレポジトリに追加\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo \u003c/span\u003eadd-apt-repository \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n   \u003cspan class=\"s2\"\u003e\"deb [arch=amd64] https://download.docker.com/linux/ubuntu \u003c/span\u003e\u003cspan class=\"se\"\u003e\\\u003c/span\u003e\u003cspan class=\"s2\"\u003e\n   \u003c/span\u003e\u003cspan class=\"si\"\u003e$(\u003c/span\u003elsb_release \u003cspan class=\"nt\"\u003e-cs\u003c/span\u003e\u003cspan class=\"si\"\u003e)\u003c/span\u003e\u003cspan class=\"s2\"\u003e \u003c/span\u003e\u003cspan class=\"se\"\u003e\\\u003c/span\u003e\u003cspan class=\"s2\"\u003e\n   stable\"\u003c/span\u003e\n\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eDocker Engineのインストール\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo \u003c/span\u003eapt-get update\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo \u003c/span\u003eapt-get \u003cspan class=\"nb\"\u003einstall \u003c/span\u003edocker-ce docker-ce-cli containerd.io\n\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eバージョンが表示されればインストール成功\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo \u003c/span\u003edocker \u003cspan class=\"nt\"\u003e--version\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"minikubeのインストール\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#minikube%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eMinikubeのインストール\u003c/h3\u003e\n\n\u003cp\u003e続いてMinikubeをインストールしましょう。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"terminal\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eminikubeのダウンロードと実行権限の付与\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ecurl \u003cspan class=\"nt\"\u003e-Lo\u003c/span\u003e minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n  \u003cspan class=\"o\"\u003e\u0026amp;\u0026amp;\u003c/span\u003e \u003cspan class=\"nb\"\u003echmod\u003c/span\u003e +x minikube\n\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eminikubeバイナリの移動\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo mv \u003c/span\u003eminikube /usr/local/bin/\n\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eバージョンが表示されればインストール成功\n\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eminikube version\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"kubectlのインストール\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#kubectl%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003ekubectlのインストール\u003c/h3\u003e\n\n\u003cp\u003eKubernetesはkubectlコマンドを使って操作するので、kubectlコマンドをインストールしていきます。\u003cbr\u003e\n\u003ca href=\"https://kubernetes.io/ja/docs/tasks/tools/install-kubectl/\" rel=\"nofollow noopener\" target=\"_blank\"\u003e公式の手順\u003c/a\u003e通りです。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"terminal\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e必要なパッケージのインストール\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo \u003c/span\u003eapt-get update \u003cspan class=\"o\"\u003e\u0026amp;\u0026amp;\u003c/span\u003e \u003cspan class=\"nb\"\u003esudo \u003c/span\u003eapt-get \u003cspan class=\"nb\"\u003einstall\u003c/span\u003e \u003cspan class=\"nt\"\u003e-y\u003c/span\u003e apt-transport-https gnupg2\n\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ekubectlのパッケージを追加\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ecurl \u003cspan class=\"nt\"\u003e-s\u003c/span\u003e https://packages.cloud.google.com/apt/doc/apt-key.gpg | \u003cspan class=\"nb\"\u003esudo \u003c/span\u003eapt-key add - \n\u003cspan class=\"go\"\u003e  echo \"deb https://apt.kubernetes.io/ kubernetes-xenial main\" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list\n\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ekubectlのインストール\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo \u003c/span\u003eapt-get update\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo \u003c/span\u003eapt-get \u003cspan class=\"nb\"\u003einstall\u003c/span\u003e \u003cspan class=\"nt\"\u003e-y\u003c/span\u003e kubectl\n\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eバージョンが表示されればインストール成功\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ekubectl version \u003cspan class=\"nt\"\u003e--client\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e最後にMinikubeを起動します。\u003cbr\u003e\nエラーがなければ無事起動できています。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"terminal\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"nb\"\u003esudo \u003c/span\u003eminikube start \u003cspan class=\"nt\"\u003e--vm-driver\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003enone\n\u003cspan class=\"go\"\u003e・\n・\n・\n💡  This can also be done automatically by setting the env var CHANGE_MINIKUBE_NONE_USER=true\n🔎  Verifying Kubernetes components...\n🌟  Enabled addons: storage-provisioner, default-storageclass\n🏄  Done! kubectl is now configured to use \"minikube\" by default\n\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"マニフェストファイルの作成\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%9E%E3%83%8B%E3%83%95%E3%82%A7%E3%82%B9%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E4%BD%9C%E6%88%90\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eマニフェストファイルの作成\u003c/h1\u003e\n\n\u003cp\u003ekubectlを用いてリソースの操作をするわけですが、リソースの設定値が多いので、kubectlの引数で細かく設定するのはあまり現実的ではありません。\u003cbr\u003e\nそのため、リソースの情報はファイルに記述しておいて、作成したファイルをkubectlに読み込ませるというやり方が一般的なようです。\u003c/p\u003e\n\n\u003cp\u003eリソースの情報を「マニフェスト」と呼び、それを記述したファイルのことを「マニフェストファイル」と呼びます。\u003cbr\u003e\nマニフェストファイルはJSON形式またはYAML形式で記述するのですが、読みやすいYAML形式で記述されているものがほとんどです。\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"pod作成\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#pod%E4%BD%9C%E6%88%90\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003ePod作成\u003c/h3\u003e\n\n\u003cp\u003eそれでは nginx のPodを作っていきましょう。\u003cbr\u003e\nPodのマニフェストファイルは以下のように記述しました。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"yaml\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003enginx.yaml\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"na\"\u003eapiVersion\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003ev1\u003c/span\u003e\n\u003cspan class=\"na\"\u003ekind\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003ePod\u003c/span\u003e\n\u003cspan class=\"na\"\u003emetadata\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n  \u003cspan class=\"na\"\u003ename\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003etest-nginx\u003c/span\u003e \n\u003cspan class=\"na\"\u003espec\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n  \u003cspan class=\"na\"\u003econtainers\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n    \u003cspan class=\"pi\"\u003e-\u003c/span\u003e \u003cspan class=\"na\"\u003ename\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003emy-nginx-container\u003c/span\u003e\n      \u003cspan class=\"na\"\u003eimage\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003enginx:latest\u003c/span\u003e\n      \u003cspan class=\"na\"\u003eports\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"pi\"\u003e-\u003c/span\u003e \u003cspan class=\"na\"\u003econtainerPort\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"m\"\u003e80\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cp\u003ePodをつくりたいので、kindにはPodと指定しておきます。\u003cbr\u003e\nmetadataには、Podの名前を指定します。test-nginxとしました。\u003cbr\u003e\nspecでは、Podの詳細情報を記します。\u003cbr\u003e\ncontainerの項目では、nameにコンテナ名、imageにはイメージ名、portsではコンテナが使用するポート番号を指定します。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"terminal\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ePod作成\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ekubectl create \u003cspan class=\"nt\"\u003e-f\u003c/span\u003e nginx.yaml\n\u003cspan class=\"go\"\u003epod/test-nginx created\n\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ePodの状態を確認\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ekubectl get pods\n\u003cspan class=\"go\"\u003eNAME         READY   STATUS    RESTARTS   AGE\ntest-nginx   1/1     Running   0          8s\n\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ePodの詳細情報の取得\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ekubectl describe pods my-pod\n\u003cspan class=\"go\"\u003eName:         test-nginx\nNamespace:    default\nPriority:     0\nNode:         ip-10-0-1-23/10.0.1.23\nStart Time:   Sat, 14 Nov 2020 10:28:37 +0000\n\u003c/span\u003e\u003cspan class=\"gp\"\u003eLabels:       \u0026lt;none\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003eAnnotations:  \u0026lt;none\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"go\"\u003eStatus:       Running\nIP:           172.17.0.3\nIPs:\n  IP:  172.17.0.3\nContainers:\n  my-nginx-container:\n    Container ID:   docker://a580525cc1eb22f7a237b2d3424f8899ba04cf17ec71a1c2810c6d7e9700ebfc\n    Image:          nginx:latest\n    Image ID:       docker-pullable://nginx@sha256:aeade65e99e5d5e7ce162833636f692354c227ff438556e5f3ed0335b7cc2f1b\n    Port:           80/TCP\n    Host Port:      0/TCP\n    State:          Running\n      Started:      Sat, 14 Nov 2020 10:28:42 +0000\n    Ready:          True\n    Restart Count:  0\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e    Environment:    \u0026lt;none\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"go\"\u003e    Mounts:\n      /var/run/secrets/kubernetes.io/serviceaccount from default-token-5qpwm (ro)\nConditions:\n  Type              Status\n  Initialized       True\n  Ready             True\n  ContainersReady   True\n  PodScheduled      True\nVolumes:\n  default-token-5qpwm:\n    Type:        Secret (a volume populated by a Secret)\n    SecretName:  default-token-5qpwm\n    Optional:    false\nQoS Class:       BestEffort\n\u003c/span\u003e\u003cspan class=\"gp\"\u003eNode-Selectors:  \u0026lt;none\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"go\"\u003eTolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s\n                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s\nEvents:\n  Type    Reason     Age    From               Message\n  ----    ------     ----   ----               -------\n  Normal  Scheduled  2m16s  default-scheduler  Successfully assigned default/test-nginx to ip-10-0-1-23\n  Normal  Pulling    2m16s  kubelet            Pulling image \"nginx:latest\"\n  Normal  Pulled     2m13s  kubelet            Successfully pulled image \"nginx:latest\" in 3.237396456s\n  Normal  Created    2m13s  kubelet            Created container my-nginx-container\n  Normal  Started    2m12s  kubelet            Started container my-nginx-container\n\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e\u003ccode\u003ekubectl describe\u003c/code\u003e でPodのIPアドレスは \u003ccode\u003e172.17.0.3\u003c/code\u003eだということがわかりました。\u003cbr\u003e\ncurlコマンドを実行してみると、nginxが起動していることがわかります。\u003cbr\u003e\nただこのままだとテストページを見ることができません。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"terminal\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ecurl 172.17.0.3\n\u003cspan class=\"gp\"\u003e\u0026lt;!DOCTYPE html\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;html\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;head\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;title\u0026gt;\u003c/span\u003eWelcome to nginx!\u0026lt;/title\u0026gt;\n\u003cspan class=\"gp\"\u003e\u0026lt;style\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"go\"\u003e    body {\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e        width: 35em;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e        margin: 0 auto;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e        font-family: Tahoma, Verdana, Arial, sans-serif;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"go\"\u003e    }\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;/style\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;/head\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;body\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;h1\u0026gt;\u003c/span\u003eWelcome to nginx!\u0026lt;/h1\u0026gt;\n\u003cspan class=\"gp\"\u003e\u0026lt;p\u0026gt;\u003c/span\u003eIf you see this page, the nginx web server is successfully installed and\n\u003cspan class=\"gp\"\u003eworking. Further configuration is required.\u0026lt;/p\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;p\u0026gt;\u003c/span\u003eFor online documentation and support please refer to\n\u003cspan class=\"gp\"\u003e\u0026lt;a href=\"http://nginx.org/\"\u0026gt;\u003c/span\u003enginx.org\u0026lt;/a\u0026gt;.\u0026lt;br/\u0026gt;\n\u003cspan class=\"go\"\u003eCommercial support is available at\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;a href=\"http://nginx.com/\"\u0026gt;\u003c/span\u003enginx.com\u0026lt;/a\u0026gt;.\u0026lt;/p\u0026gt;\n\u003cspan class=\"go\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;p\u0026gt;\u003c/span\u003e\u0026lt;em\u0026gt;Thank you \u003cspan class=\"k\"\u003efor \u003c/span\u003eusing nginx.\u0026lt;/em\u0026gt;\u0026lt;/p\u0026gt;\n\u003cspan class=\"gp\"\u003e\u0026lt;/body\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e\u0026lt;/html\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"テストページの確認\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%86%E3%82%B9%E3%83%88%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AE%E7%A2%BA%E8%AA%8D\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eテストページの確認\u003c/h1\u003e\n\n\u003cp\u003e今度はテストページが見れるようにするための設定をしていきましょう。\u003cbr\u003e\nあまり意味はないですが、複数Podの起動も合わせてやっていきましょう。\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"deplymentの作成\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#deplyment%E3%81%AE%E4%BD%9C%E6%88%90\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eDeplymentの作成\u003c/h3\u003e\n\n\u003cp\u003eDeploymentを使って複数Podを作成できるようにします。\u003cbr\u003e\nDeploymentのマニフェストファイルは以下のように記述しました。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"yaml\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003edeployment.yaml\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"na\"\u003eapiVersion\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eapps/v1\u003c/span\u003e\n\u003cspan class=\"na\"\u003ekind\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eDeployment\u003c/span\u003e\n\u003cspan class=\"na\"\u003emetadata\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n  \u003cspan class=\"na\"\u003ename\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003emy-deploymnet\u003c/span\u003e\n\u003cspan class=\"na\"\u003espec\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n  \u003cspan class=\"na\"\u003ereplicas\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"m\"\u003e2\u003c/span\u003e\n  \u003cspan class=\"na\"\u003eselector\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n    \u003cspan class=\"na\"\u003ematchLabels\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n      \u003cspan class=\"na\"\u003eapp\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003emy-nginx\u003c/span\u003e\n  \u003cspan class=\"na\"\u003etemplate\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n    \u003cspan class=\"na\"\u003emetadata\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n      \u003cspan class=\"na\"\u003elabels\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"na\"\u003eapp\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003emy-nginx\u003c/span\u003e\n    \u003cspan class=\"na\"\u003espec\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n      \u003cspan class=\"na\"\u003econtainers\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"pi\"\u003e-\u003c/span\u003e \u003cspan class=\"na\"\u003ename\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003etest-nginx\u003c/span\u003e\n          \u003cspan class=\"na\"\u003eimage\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003enginx:latest\u003c/span\u003e\n          \u003cspan class=\"na\"\u003eports\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n            \u003cspan class=\"pi\"\u003e-\u003c/span\u003e \u003cspan class=\"na\"\u003econtainerPort\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"m\"\u003e80\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cp\u003eDeploymentのAPIGROUPはappsなので、apiVersionを \u003ccode\u003eapps/v1\u003c/code\u003e とします。\u003ccode\u003ekubectl api-resources\u003c/code\u003e と実行すると確認できます。\u003cbr\u003e\nmetadataでは、Deploymentの名前を指定します。\u003cbr\u003e\nspecでは、Deploymentの詳細情報を記述していきます。\u003cbr\u003e\nReplicaSetでは、レプリカ数を指定します。このファイルの場合、同じ構成のPodを2つ作成するという意味になります。\u003cbr\u003e\nselectorでは、どのようなPodを作成するのかを指定します。app: my-nginxと指定しますが、すぐ下のtemplateで定義されたものを使用するという意味です。\u003cbr\u003e\ntemplateで具体的なPodの情報を記述します。selectorで選択してもらえるようにapp: my-nginx と設定します。\u003cbr\u003e\nそれ以外は \u003ccode\u003enginx.yaml\u003c/code\u003e と同じように記述します。\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"serviceの作成\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#service%E3%81%AE%E4%BD%9C%E6%88%90\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eServiceの作成\u003c/h3\u003e\n\n\u003cp\u003e次はServiceを使って外部からアクセスできるようにします。\u003cbr\u003e\nServiceのマニフェストファイルは以下のように記述しました。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"yaml\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eservice.yaml\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"na\"\u003eapiVersion\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003ev1\u003c/span\u003e\n\u003cspan class=\"na\"\u003ekind\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eService\u003c/span\u003e\n\u003cspan class=\"na\"\u003emetadata\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \n  \u003cspan class=\"na\"\u003ename\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003enginx-service\u003c/span\u003e\n\u003cspan class=\"na\"\u003espec\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n  \u003cspan class=\"na\"\u003etype\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eNodePort\u003c/span\u003e\n  \u003cspan class=\"na\"\u003eports\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n    \u003cspan class=\"pi\"\u003e-\u003c/span\u003e \u003cspan class=\"na\"\u003enodePort\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"m\"\u003e30000\u003c/span\u003e\n      \u003cspan class=\"na\"\u003eport\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"m\"\u003e8080\u003c/span\u003e\n      \u003cspan class=\"na\"\u003etargetPort\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"m\"\u003e80\u003c/span\u003e\n      \u003cspan class=\"na\"\u003eprotocol\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eTCP\u003c/span\u003e\n  \u003cspan class=\"na\"\u003eselector\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n    \u003cspan class=\"na\"\u003eapp\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003emy-nginx\u003c/span\u003e \n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cp\u003eapiVersionでは、\u003ccode\u003ekubectl api-resources\u003c/code\u003eで確認したところ空欄なので\u003ccode\u003ev1\u003c/code\u003eとします。\u003cbr\u003e\nmetadataでは、Serviceの名前を指定します。\u003cbr\u003e\nspecでは、Serviceの詳細を記述していきます。\u003cbr\u003e\ntypeはServiceの種類を指定します。ここでは、ノード（今回だとEC2）のIPアドレスを通じてアクセスできるNodePortとしました。試してないですが、ほかの種類にしてもできるかもしれません。\u003cbr\u003e\nportsでは、ポートの設定を行います。\u003cbr\u003e\nnodePortはノードのポート番号、portはServiceのポート番号、targetPortはPodのポート番号です。\u003cbr\u003e\nノードがポート30000で通信を待ち受け、そこからServiceのポート8080に転送、最後にPodのポート80に転送というような流れとなります。\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"serviceを使ってnginxのテストページを確認する\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#service%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6nginx%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eServiceを使ってnginxのテストページを確認する\u003c/h3\u003e\n\n\u003cp\u003eDeploymentとService オブジェクトを用いて、nginxのテストページを確認していきます。\u003cbr\u003e\nServiceのポートは8080、ノードのポートには30000が割り当てられていることがわかります。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"terminal\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eDeploymentオブジェクトの作成\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ekubectl create \u003cspan class=\"nt\"\u003e-f\u003c/span\u003e deployment.yaml\n\u003cspan class=\"go\"\u003edeployment.apps/my-deploymnet created\n\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eServiceオブジェクトの作成\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ekubectl create \u003cspan class=\"nt\"\u003e-f\u003c/span\u003e service.yaml\n\u003cspan class=\"go\"\u003eservice/nginx-service created\n\n\u003c/span\u003e\u003cspan class=\"gp\"\u003e#\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003eServiceの状態を確認\n\u003cspan class=\"gp\"\u003e$\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003ekubectl get services\n\u003cspan class=\"go\"\u003eNAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE\n\u003c/span\u003e\u003cspan class=\"gp\"\u003ekubernetes      ClusterIP   10.96.0.1       \u0026lt;none\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e        \u003c/span\u003e443/TCP          11d\n\u003cspan class=\"gp\"\u003enginx-service   NodePort    10.110.191.26   \u0026lt;none\u0026gt;\u003c/span\u003e\u003cspan class=\"w\"\u003e        \u003c/span\u003e8080:30000/TCP   82s\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003eまだやることがあります。\u003cbr\u003e\nEC2のセキュリティグループの設定で30000ポートを許可してあげないとテストページが見れません。\u003cbr\u003e\n※初めてやったときにここでつまりました笑\u003c/p\u003e\n\n\u003cp\u003eAWSにログインして、EC2 \u0026gt; セキュリティグループでEC2に割り当てたセキュリティグループ名を選択し、インバウンドルールを編集というボタンがあるのでそのボタンをクリックします。\u003c/p\u003e\n\n\u003cp\u003e私は以下のように設定しました。\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F379397%2F7c1d0d02-cf16-9eea-ae1a-fa3c2242673b.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=466babcf3ecb92b949c986b7154d00b9\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F379397%2F7c1d0d02-cf16-9eea-ae1a-fa3c2242673b.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=466babcf3ecb92b949c986b7154d00b9\" alt=\"image.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/379397/7c1d0d02-cf16-9eea-ae1a-fa3c2242673b.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F379397%2F7c1d0d02-cf16-9eea-ae1a-fa3c2242673b.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=4de0a4bf01aba21087eb7df0d776e88a 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003eブラウザで \u003ccode\u003exxx.xxx.xxx.xxx:30000\u003c/code\u003e（xxx.xxx.xxx.xxxはEC2のパブリックIP）に接続するとnginxのテストページを確認できました。\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F379397%2Fad6d30bc-7b6f-d3b6-8f2e-ad4eb976ab64.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=2ccb389bd8458517dd1a27ce5d068d5e\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F379397%2Fad6d30bc-7b6f-d3b6-8f2e-ad4eb976ab64.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=2ccb389bd8458517dd1a27ce5d068d5e\" alt=\"キャプチャ.PNG\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/379397/ad6d30bc-7b6f-d3b6-8f2e-ad4eb976ab64.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F379397%2Fad6d30bc-7b6f-d3b6-8f2e-ad4eb976ab64.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=37735ab254f45b3ecc4696b2dbd9c8fe 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"感想\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%84%9F%E6%83%B3\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e感想\u003c/h1\u003e\n\n\u003cp\u003e今回の検証を通して、Kubernetesの基本的な使い方をなんとなく知ることができました。\u003cbr\u003e\n手を動かしたほうが、理解が進んだような気がします。\u003c/p\u003e\n\n\u003cp\u003e今度は以前やったBIND, Unboundのマニフェスト化に取り組んでいけたらと思います。\u003c/p\u003e\n",
  "body": "コンテナ初学者の新人社員でk8sを勉強しています。\n\n今回はAWSのEC2にMinikubeをインストールして、nginxのテストページが見れるまでの手順を記したいと思います。\n\n#開発環境\n* AWS EC2 t3.small\n\n今回、Minikubeを利用する環境として、EC2のt3.smallを選択しました。\n2GB以上のメモリや20GB以上のディスクスペースがないとMinikubeをうまくインストールできないようです。\n\n多少料金がかかってしまいます。試す場合は注意しましょう。\n\n#準備\n\nEC2インスタンスを起動する手順までは省きます。私はやりなれているUbuntuをインストールしたEC2を選択しました。\n\n以下のように入力して起動したEC2に接続します。\n\n```\n$ ssh -i test-key.pem ubuntu@xxx.xxx.xxx.xxx\n```\n\ntest-key.pem はEC2を作成した際にダウンロードした鍵のファイル名です。\nxxx.xxx.xxx.xxx はEC2のパブリックIPを指定します。\n\n\n###Dockerのインストール\n無事EC2に接続できたらDockerをインストールしましょう。\nほぼ[公式の手順通り](https://docs.docker.com/engine/install/ubuntu/)です。\n\n```terminal:Dockerのインストール\n# Ubuntuのパッケージをアップデート\n$ sudo apt-get update\n\n# 必要なパッケージのインストール\n$ sudo apt-get install \\\n    apt-transport-https \\\n    ca-certificates \\\n    curl \\\n    gnupg-agent \\\n    software-properties-common\n\n# Dockerの公式GPGキーの追加\n$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -\n\n# Dockerのダウンロードサイトをaptレポジトリに追加\n$ sudo add-apt-repository \\\n   \"deb [arch=amd64] https://download.docker.com/linux/ubuntu \\\n   $(lsb_release -cs) \\\n   stable\"\n\n# Docker Engineのインストール\n$ sudo apt-get update\n$ sudo apt-get install docker-ce docker-ce-cli containerd.io\n\n# バージョンが表示されればインストール成功\n$ sudo docker --version\n```\n\n###Minikubeのインストール\n続いてMinikubeをインストールしましょう。\n\n```terminal\n# minikubeのダウンロードと実行権限の付与\n$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \\\n  \u0026\u0026 chmod +x minikube\n\n# minikubeバイナリの移動\n$ sudo mv minikube /usr/local/bin/\n\n# バージョンが表示されればインストール成功\n# minikube version\n```\n\n###kubectlのインストール\nKubernetesはkubectlコマンドを使って操作するので、kubectlコマンドをインストールしていきます。\n[公式の手順](https://kubernetes.io/ja/docs/tasks/tools/install-kubectl/)通りです。\n\n```terminal\n# 必要なパッケージのインストール\n$ sudo apt-get update \u0026\u0026 sudo apt-get install -y apt-transport-https gnupg2\n\n# kubectlのパッケージを追加\n$ curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add - \n  echo \"deb https://apt.kubernetes.io/ kubernetes-xenial main\" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list\n\n# kubectlのインストール\n$ sudo apt-get update\n$ sudo apt-get install -y kubectl\n\n# バージョンが表示されればインストール成功\n$ kubectl version --client\n```\n\n最後にMinikubeを起動します。\nエラーがなければ無事起動できています。\n\n```terminal\n$ sudo minikube start --vm-driver=none\n・\n・\n・\n💡  This can also be done automatically by setting the env var CHANGE_MINIKUBE_NONE_USER=true\n🔎  Verifying Kubernetes components...\n🌟  Enabled addons: storage-provisioner, default-storageclass\n🏄  Done! kubectl is now configured to use \"minikube\" by default\n```\n\n#マニフェストファイルの作成\nkubectlを用いてリソースの操作をするわけですが、リソースの設定値が多いので、kubectlの引数で細かく設定するのはあまり現実的ではありません。\nそのため、リソースの情報はファイルに記述しておいて、作成したファイルをkubectlに読み込ませるというやり方が一般的なようです。\n\nリソースの情報を「マニフェスト」と呼び、それを記述したファイルのことを「マニフェストファイル」と呼びます。\nマニフェストファイルはJSON形式またはYAML形式で記述するのですが、読みやすいYAML形式で記述されているものがほとんどです。\n\n###Pod作成\nそれでは nginx のPodを作っていきましょう。\nPodのマニフェストファイルは以下のように記述しました。\n\n```yaml:nginx.yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: test-nginx \nspec:\n  containers:\n    - name: my-nginx-container\n      image: nginx:latest\n      ports:\n        - containerPort: 80\n```\nPodをつくりたいので、kindにはPodと指定しておきます。\nmetadataには、Podの名前を指定します。test-nginxとしました。\nspecでは、Podの詳細情報を記します。\ncontainerの項目では、nameにコンテナ名、imageにはイメージ名、portsではコンテナが使用するポート番号を指定します。\n\n```terminal\n# Pod作成\n$ kubectl create -f nginx.yaml\npod/test-nginx created\n\n# Podの状態を確認\n$ kubectl get pods\nNAME         READY   STATUS    RESTARTS   AGE\ntest-nginx   1/1     Running   0          8s\n\n# Podの詳細情報の取得\n$ kubectl describe pods my-pod\nName:         test-nginx\nNamespace:    default\nPriority:     0\nNode:         ip-10-0-1-23/10.0.1.23\nStart Time:   Sat, 14 Nov 2020 10:28:37 +0000\nLabels:       \u003cnone\u003e\nAnnotations:  \u003cnone\u003e\nStatus:       Running\nIP:           172.17.0.3\nIPs:\n  IP:  172.17.0.3\nContainers:\n  my-nginx-container:\n    Container ID:   docker://a580525cc1eb22f7a237b2d3424f8899ba04cf17ec71a1c2810c6d7e9700ebfc\n    Image:          nginx:latest\n    Image ID:       docker-pullable://nginx@sha256:aeade65e99e5d5e7ce162833636f692354c227ff438556e5f3ed0335b7cc2f1b\n    Port:           80/TCP\n    Host Port:      0/TCP\n    State:          Running\n      Started:      Sat, 14 Nov 2020 10:28:42 +0000\n    Ready:          True\n    Restart Count:  0\n    Environment:    \u003cnone\u003e\n    Mounts:\n      /var/run/secrets/kubernetes.io/serviceaccount from default-token-5qpwm (ro)\nConditions:\n  Type              Status\n  Initialized       True\n  Ready             True\n  ContainersReady   True\n  PodScheduled      True\nVolumes:\n  default-token-5qpwm:\n    Type:        Secret (a volume populated by a Secret)\n    SecretName:  default-token-5qpwm\n    Optional:    false\nQoS Class:       BestEffort\nNode-Selectors:  \u003cnone\u003e\nTolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s\n                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s\nEvents:\n  Type    Reason     Age    From               Message\n  ----    ------     ----   ----               -------\n  Normal  Scheduled  2m16s  default-scheduler  Successfully assigned default/test-nginx to ip-10-0-1-23\n  Normal  Pulling    2m16s  kubelet            Pulling image \"nginx:latest\"\n  Normal  Pulled     2m13s  kubelet            Successfully pulled image \"nginx:latest\" in 3.237396456s\n  Normal  Created    2m13s  kubelet            Created container my-nginx-container\n  Normal  Started    2m12s  kubelet            Started container my-nginx-container\n```\n\n`kubectl describe` でPodのIPアドレスは `172.17.0.3`だということがわかりました。\ncurlコマンドを実行してみると、nginxが起動していることがわかります。\nただこのままだとテストページを見ることができません。\n\n```terminal\n$ curl 172.17.0.3\n\u003c!DOCTYPE html\u003e\n\u003chtml\u003e\n\u003chead\u003e\n\u003ctitle\u003eWelcome to nginx!\u003c/title\u003e\n\u003cstyle\u003e\n    body {\n        width: 35em;\n        margin: 0 auto;\n        font-family: Tahoma, Verdana, Arial, sans-serif;\n    }\n\u003c/style\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n\u003ch1\u003eWelcome to nginx!\u003c/h1\u003e\n\u003cp\u003eIf you see this page, the nginx web server is successfully installed and\nworking. Further configuration is required.\u003c/p\u003e\n\n\u003cp\u003eFor online documentation and support please refer to\n\u003ca href=\"http://nginx.org/\"\u003enginx.org\u003c/a\u003e.\u003cbr/\u003e\nCommercial support is available at\n\u003ca href=\"http://nginx.com/\"\u003enginx.com\u003c/a\u003e.\u003c/p\u003e\n\n\u003cp\u003e\u003cem\u003eThank you for using nginx.\u003c/em\u003e\u003c/p\u003e\n\u003c/body\u003e\n\u003c/html\u003e\n```\n\n#テストページの確認\n今度はテストページが見れるようにするための設定をしていきましょう。\nあまり意味はないですが、複数Podの起動も合わせてやっていきましょう。\n\n###Deplymentの作成\nDeploymentを使って複数Podを作成できるようにします。\nDeploymentのマニフェストファイルは以下のように記述しました。\n\n```yaml:deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-deploymnet\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: my-nginx\n  template:\n    metadata:\n      labels:\n        app: my-nginx\n    spec:\n      containers:\n        - name: test-nginx\n          image: nginx:latest\n          ports:\n            - containerPort: 80\n```\nDeploymentのAPIGROUPはappsなので、apiVersionを `apps/v1` とします。`kubectl api-resources` と実行すると確認できます。\nmetadataでは、Deploymentの名前を指定します。\nspecでは、Deploymentの詳細情報を記述していきます。\nReplicaSetでは、レプリカ数を指定します。このファイルの場合、同じ構成のPodを2つ作成するという意味になります。\nselectorでは、どのようなPodを作成するのかを指定します。app: my-nginxと指定しますが、すぐ下のtemplateで定義されたものを使用するという意味です。\ntemplateで具体的なPodの情報を記述します。selectorで選択してもらえるようにapp: my-nginx と設定します。\nそれ以外は `nginx.yaml` と同じように記述します。\n\n###Serviceの作成\n次はServiceを使って外部からアクセスできるようにします。\nServiceのマニフェストファイルは以下のように記述しました。\n\n```yaml:service.yaml\napiVersion: v1\nkind: Service\nmetadata: \n  name: nginx-service\nspec:\n  type: NodePort\n  ports:\n    - nodePort: 30000\n      port: 8080\n      targetPort: 80\n      protocol: TCP\n  selector:\n    app: my-nginx \n```\napiVersionでは、`kubectl api-resources`で確認したところ空欄なので`v1`とします。\nmetadataでは、Serviceの名前を指定します。\nspecでは、Serviceの詳細を記述していきます。\ntypeはServiceの種類を指定します。ここでは、ノード（今回だとEC2）のIPアドレスを通じてアクセスできるNodePortとしました。試してないですが、ほかの種類にしてもできるかもしれません。\nportsでは、ポートの設定を行います。\nnodePortはノードのポート番号、portはServiceのポート番号、targetPortはPodのポート番号です。\nノードがポート30000で通信を待ち受け、そこからServiceのポート8080に転送、最後にPodのポート80に転送というような流れとなります。\n\n###Serviceを使ってnginxのテストページを確認する\nDeploymentとService オブジェクトを用いて、nginxのテストページを確認していきます。\nServiceのポートは8080、ノードのポートには30000が割り当てられていることがわかります。\n\n```terminal\n# Deploymentオブジェクトの作成\n$ kubectl create -f deployment.yaml\ndeployment.apps/my-deploymnet created\n\n# Serviceオブジェクトの作成\n$ kubectl create -f service.yaml\nservice/nginx-service created\n\n# Serviceの状態を確認\n$ kubectl get services\nNAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE\nkubernetes      ClusterIP   10.96.0.1       \u003cnone\u003e        443/TCP          11d\nnginx-service   NodePort    10.110.191.26   \u003cnone\u003e        8080:30000/TCP   82s\n```\n\nまだやることがあります。\nEC2のセキュリティグループの設定で30000ポートを許可してあげないとテストページが見れません。\n※初めてやったときにここでつまりました笑\n\nAWSにログインして、EC2 \u003e セキュリティグループでEC2に割り当てたセキュリティグループ名を選択し、インバウンドルールを編集というボタンがあるのでそのボタンをクリックします。\n\n私は以下のように設定しました。\n![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/379397/7c1d0d02-cf16-9eea-ae1a-fa3c2242673b.png)\n\nブラウザで `xxx.xxx.xxx.xxx:30000`（xxx.xxx.xxx.xxxはEC2のパブリックIP）に接続するとnginxのテストページを確認できました。\n![キャプチャ.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/379397/ad6d30bc-7b6f-d3b6-8f2e-ad4eb976ab64.png)\n\n#感想\n今回の検証を通して、Kubernetesの基本的な使い方をなんとなく知ることができました。\n手を動かしたほうが、理解が進んだような気がします。\n\n今度は以前やったBIND, Unboundのマニフェスト化に取り組んでいけたらと思います。\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T22:08:46+09:00",
  "group": null,
  "id": "cf48b593249a79fb6718",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "kubernetes",
    "versions": []
  }, {
    "name": "minikube",
    "versions": []
  }],
  "title": "Minikubeでk8sの基本操作を学ぶ",
  "updated_at": "2020-11-17T22:08:46+09:00",
  "url": "https://qiita.com/e_krecker/items/cf48b593249a79fb6718",
  "user": {
    "description": "都内のIT企業",
    "facebook_id": "",
    "followees_count": 4,
    "followers_count": 0,
    "github_login_name": "ekrecker",
    "id": "e_krecker",
    "items_count": 3,
    "linkedin_id": "",
    "location": "",
    "name": "",
    "organization": "",
    "permanent_id": 379397,
    "profile_image_url": "https://avatars0.githubusercontent.com/u/26991786?v=4",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\n\u003ch2\u003e\n\u003cspan id=\"目次\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E7%9B%AE%E6%AC%A1\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e目次\u003c/h2\u003e\n\n\u003col\u003e\n\u003cli\u003e\u003ca href=\"#%E6%A6%82%E8%A6%81\"\u003e概要\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"#%E5%89%8D%E6%8F%90%E6%9D%A1%E4%BB%B6\"\u003e前提条件\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"#%E3%83%87%E3%83%BC%E3%82%BF%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%E3%81%AE%E4%BB%95%E7%B5%84%E3%81%BF\"\u003eデータアップロードの仕組み\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"#%E3%83%87%E3%83%BC%E3%82%BF%E9%80%A3%E6%90%BA%E3%81%AE%E8%87%AA%E5%8B%95%E5%8C%96\"\u003eデータ連携の自動化\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"#%E3%81%BE%E3%81%A8%E3%82%81\"\u003eまとめ\u003c/a\u003e\u003c/li\u003e\n\u003c/ol\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"概要\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%A6%82%E8%A6%81\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e概要\u003c/h2\u003e\n\n\u003cp\u003e最近、\u003ca href=\"https://codeforafrica.org\" rel=\"nofollow noopener\" target=\"_blank\"\u003eCode for Africa\u003c/a\u003eという団体が運営している\u003ca href=\"https://open.africa\" rel=\"nofollow noopener\" target=\"_blank\"\u003eopenAFRICA\u003c/a\u003eというアフリカのオープンデータのポータルサイトと、自身がルワンダの水道公社WASACと共同でメンテナンスしている水道ベクトルタイルデータの自動連携機能を、Pythonで実装した。\u003c/p\u003e\n\n\u003cp\u003e日本の自治体のオープンデータサイトでも多く使われていると思われるCKANというAPIを用いているので、自組織が持っているファイルなどのオープンデータをAPI経由で自動連携させたい場合に活用できると思うので、共有したいと思う。\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"前提条件\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%89%8D%E6%8F%90%E6%9D%A1%E4%BB%B6\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e前提条件\u003c/h2\u003e\n\n\u003cul\u003e\n\u003cli\u003e\n\u003ca href=\"https://docs.ckan.org/en/2.7/api/#api-examples\" rel=\"nofollow noopener\" target=\"_blank\"\u003eCKAN API\u003c/a\u003eを使っているオープンデータプラットフォームに自組織のアカウントを持っている\u003c/li\u003e\n\u003cli\u003eGithubでオープンデータを管理している\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003eこの記事を通して、Githubに置いてあるオープンデータを更新したタイミングで、Github Actionを用いて、CKAN経由でプラットフォーム上のデータを自動連携させるようにします。\u003c/p\u003e\n\n\u003cp\u003eちなみにルワンダの水道公社の水道ベクトルタイルのオープンデータのopenAFRICAのページは以下のリンクにあります。\u003cbr\u003e\n\u003ca href=\"https://open.africa/dataset/rw-water-vectortiles\" class=\"autolink\" rel=\"nofollow noopener\" target=\"_blank\"\u003ehttps://open.africa/dataset/rw-water-vectortiles\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F858331%2Fb46451ae-dd33-af48-1927-63718068c6f8.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=17286b83fabd02d5a128a80940ebaff1\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F858331%2Fb46451ae-dd33-af48-1927-63718068c6f8.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=17286b83fabd02d5a128a80940ebaff1\" alt=\"image.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/858331/b46451ae-dd33-af48-1927-63718068c6f8.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F858331%2Fb46451ae-dd33-af48-1927-63718068c6f8.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=f1a404a011104fff3b368002432abbb1 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003eまた水道ベクトルタイルのGithubリポジトリは以下のリンクにあり、毎週水道公社内のサーバーからGithubに自動更新されます。\u003cbr\u003e\n\u003ca href=\"https://github.com/WASAC/vt\" class=\"autolink\" rel=\"nofollow noopener\" target=\"_blank\"\u003ehttps://github.com/WASAC/vt\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F858331%2F012139e2-6dfd-3244-d44e-fa8d0b57bb91.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=4320c4ccfbe33e895fc0e07155f66078\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F858331%2F012139e2-6dfd-3244-d44e-fa8d0b57bb91.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=4320c4ccfbe33e895fc0e07155f66078\" alt=\"image.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/858331/012139e2-6dfd-3244-d44e-fa8d0b57bb91.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F858331%2F012139e2-6dfd-3244-d44e-fa8d0b57bb91.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=739f7d40dbebee98c5ef90d8f1b798a9 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"データアップロードの仕組み\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%87%E3%83%BC%E3%82%BF%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%E3%81%AE%E4%BB%95%E7%B5%84%E3%81%BF\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eデータアップロードの仕組み\u003c/h2\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"リポジトリのダウンロードとインストール\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%81%AE%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%A8%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eリポジトリのダウンロードとインストール\u003c/h3\u003e\n\n\u003cp\u003epipenvがインストールされていない場合は、まず設定を行ってください。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003egit clone https://github.com/watergis/open-africa-uploader\ncd open-africa-uploader\npipenv install\npipenv shell\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"ckan-apiを用いたファイルのアップロードの仕組み\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#ckan-api%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%E3%81%AE%E4%BB%95%E7%B5%84%E3%81%BF\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eCKAN APIを用いたファイルのアップロードの仕組み\u003c/h3\u003e\n\n\u003cp\u003eまずリポジトリ内の\u003ccode\u003eOpenAfricaUploader.py\u003c/code\u003eのソースコード全文を載せます。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"nn\"\u003eos\u003c/span\u003e\n\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"nn\"\u003eckanapi\u003c/span\u003e\n\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"nn\"\u003erequests\u003c/span\u003e\n\n\n\u003cspan class=\"k\"\u003eclass\u003c/span\u003e \u003cspan class=\"nc\"\u003eOpanAfricaUploader\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nb\"\u003eobject\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n  \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003e__init__\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eapi_key\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"s\"\u003e\"\"\"Constructor\n\n    Args:\n        api_key (string): CKAN api key\n    \"\"\"\u003c/span\u003e\n    \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003edata_portal\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s\"\u003e'https://africaopendata.org'\u003c/span\u003e\n    \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eAPIKEY\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eapi_key\u003c/span\u003e\n    \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eckan\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eckanapi\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eRemoteCKAN\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003edata_portal\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eapikey\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eAPIKEY\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\n  \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003ecreate_package\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eurl\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003etitle\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"s\"\u003e\"\"\"create new package if it does not exist yet.\n\n    Args:\n        url (str): the url of package eg. https://open.africa/dataset/{package url}\n        title (str): the title of package\n    \"\"\"\u003c/span\u003e\n    \u003cspan class=\"n\"\u003epackage_name\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eurl\u003c/span\u003e\n    \u003cspan class=\"n\"\u003epackage_title\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003etitle\u003c/span\u003e\n    \u003cspan class=\"k\"\u003etry\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'Creating \"{package_title}\" package'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"o\"\u003e**\u003c/span\u003e\u003cspan class=\"nb\"\u003elocals\u003c/span\u003e\u003cspan class=\"p\"\u003e()))\u003c/span\u003e\n        \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eckan\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eaction\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage_create\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ename\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003epackage_name\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n                                            \u003cspan class=\"n\"\u003etitle\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003epackage_title\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n                                            \u003cspan class=\"n\"\u003eowner_org\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s\"\u003e'water-and-sanitation-corporation-ltd-wasac'\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eexcept\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eckanapi\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eValidationError\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e \u003cspan class=\"k\"\u003eas\u003c/span\u003e \u003cspan class=\"n\"\u003ee\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ee\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eerror_dict\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'__type'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"s\"\u003e'Validation Error'\u003c/span\u003e \u003cspan class=\"ow\"\u003eand\u003c/span\u003e\n          \u003cspan class=\"n\"\u003ee\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eerror_dict\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'That URL is already in use.'\u003c/span\u003e\u003cspan class=\"p\"\u003e]):\u003c/span\u003e\n            \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'\"{package_title}\" package already exists'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"o\"\u003e**\u003c/span\u003e\u003cspan class=\"nb\"\u003elocals\u003c/span\u003e\u003cspan class=\"p\"\u003e()))\u003c/span\u003e\n            \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eckan\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eaction\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage_show\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nb\"\u003eid\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003epackage_name\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eelse\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n            \u003cspan class=\"k\"\u003eraise\u003c/span\u003e\n\n  \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003eresource_create\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eapi\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"/api/action/resource_create\"\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"s\"\u003e\"\"\"create new resource, or update existing resource\n\n    Args:\n        data (object): data for creating resource. data must contain package_id, name, format, description. If you overwrite existing resource, id also must be included.\n        path (str): file path for uploading\n        api (str, optional): API url for creating or updating. Defaults to \"/api/action/resource_create\". If you want to update, please specify url for \"/api/action/resource_update\"\n    \"\"\"\u003c/span\u003e\n    \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eapi_url\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003edata_portal\u003c/span\u003e \u003cspan class=\"o\"\u003e+\u003c/span\u003e \u003cspan class=\"n\"\u003eapi\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'Creating \"{}\"'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e]))\u003c/span\u003e\n    \u003cspan class=\"n\"\u003er\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003erequests\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epost\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eapi_url\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n                      \u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n                      \u003cspan class=\"n\"\u003eheaders\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"s\"\u003e'Authorization'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eAPIKEY\u003c/span\u003e\u003cspan class=\"p\"\u003e},\u003c/span\u003e\n                      \u003cspan class=\"n\"\u003efiles\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"p\"\u003e[(\u003c/span\u003e\u003cspan class=\"s\"\u003e'upload'\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"nb\"\u003eopen\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"s\"\u003e'rb'\u003c/span\u003e\u003cspan class=\"p\"\u003e))])\u003c/span\u003e\n\n    \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"n\"\u003er\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003estatus_code\u003c/span\u003e \u003cspan class=\"o\"\u003e!=\u003c/span\u003e \u003cspan class=\"mi\"\u003e200\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'Error while creating resource: {0}'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003er\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003econtent\u003c/span\u003e\u003cspan class=\"p\"\u003e))\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eelse\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n      \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'Uploaded \"{}\" successfully'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e]))\u003c/span\u003e\n\n  \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003eresource_update\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"s\"\u003e\"\"\"update existing resource\n\n    Args:\n        data (object): data for creating resource. data must contain id, package_id, name, format, description.\n        path (str): file path for uploading\n    \"\"\"\u003c/span\u003e\n    \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eresource_create\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"s\"\u003e\"/api/action/resource_update\"\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\n  \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003eupload_datasets\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edescription\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"s\"\u003e\"\"\"upload datasets under the package\n\n    Args:\n        path (str): file path for uploading\n        description (str): description for the dataset\n    \"\"\"\u003c/span\u003e\n    \u003cspan class=\"n\"\u003efilename\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eos\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ebasename\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"n\"\u003eextension\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eos\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003esplitext\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003efilename\u003c/span\u003e\u003cspan class=\"p\"\u003e)[\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e\u003cspan class=\"p\"\u003e][\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e\u003cspan class=\"p\"\u003e:].\u003c/span\u003e\u003cspan class=\"n\"\u003elower\u003c/span\u003e\u003cspan class=\"p\"\u003e()\u003c/span\u003e\n\n    \u003cspan class=\"n\"\u003edata\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n      \u003cspan class=\"s\"\u003e'package_id'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'id'\u003c/span\u003e\u003cspan class=\"p\"\u003e],\u003c/span\u003e\n      \u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"n\"\u003efilename\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n      \u003cspan class=\"s\"\u003e'format'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"n\"\u003eextension\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n      \u003cspan class=\"s\"\u003e'description'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"n\"\u003edescription\u003c/span\u003e\n    \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\n    \u003cspan class=\"n\"\u003eresources\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'resources'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"nb\"\u003elen\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eresources\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e \u003cspan class=\"o\"\u003e\u0026gt;\u003c/span\u003e \u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n      \u003cspan class=\"n\"\u003etarget_resource\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eNone\u003c/span\u003e\n      \u003cspan class=\"k\"\u003efor\u003c/span\u003e \u003cspan class=\"n\"\u003eresource\u003c/span\u003e \u003cspan class=\"ow\"\u003ein\u003c/span\u003e \u003cspan class=\"nb\"\u003ereversed\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eresources\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"n\"\u003efilename\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"n\"\u003eresource\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e]:\u003c/span\u003e\n          \u003cspan class=\"n\"\u003etarget_resource\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eresource\u003c/span\u003e\n          \u003cspan class=\"k\"\u003ebreak\u003c/span\u003e\n\n      \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"n\"\u003etarget_resource\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"bp\"\u003eNone\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eresource_create\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n      \u003cspan class=\"k\"\u003eelse\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'Resource \"{}\" already exists, it will be overwritten'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003etarget_resource\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e]))\u003c/span\u003e\n        \u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'id'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003etarget_resource\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'id'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\n        \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eresource_update\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eelse\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n      \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eresource_create\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e\u003ccode\u003eOpenAfricaUploader.py\u003c/code\u003eを呼び出してファイルをアップロードするソースコードは以下のような感じです。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"nn\"\u003eos\u003c/span\u003e\n\u003cspan class=\"kn\"\u003efrom\u003c/span\u003e \u003cspan class=\"nn\"\u003eOpenAfricaUploader\u003c/span\u003e \u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"n\"\u003eOpanAfricaUploader\u003c/span\u003e\n\n\u003cspan class=\"n\"\u003euploader\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eOpanAfricaUploader\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eargs\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ekey\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003cspan class=\"n\"\u003euploader\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ecreate_package\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'rw-water-vectortiles'\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"s\"\u003e'Vector Tiles for rural water supply systems in Rwanda'\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003cspan class=\"n\"\u003euploader\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eupload_datasets\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eos\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eabspath\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'../data/rwss.mbtiles'\u003c/span\u003e\u003cspan class=\"p\"\u003e),\u003c/span\u003e \u003cspan class=\"s\"\u003e'mbtiles format of Mapbox Vector Tiles which was created by tippecanoe.'\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003chr\u003e\n\n\u003cp\u003e一個ずつ説明していきます。\u003c/p\u003e\n\n\u003ch4\u003e\n\u003cspan id=\"コンストラクタ\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%82%B3%E3%83%B3%E3%82%B9%E3%83%88%E3%83%A9%E3%82%AF%E3%82%BF\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eコンストラクタ\u003c/h4\u003e\n\n\u003cp\u003eこのモジュールはあらかじめopenAFRICAにアップロードするためにベースとなるポータルサイトのURLをコンストラクタ内で設定しています。\u003c/p\u003e\n\n\u003cp\u003e\u003ccode\u003eself.data_portal = 'https://africaopendata.org'\u003c/code\u003eの部分のURLを自組織が利用しているCKAN APIのURLと置き換えてください。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e  \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003e__init__\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eapi_key\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"s\"\u003e\"\"\"Constructor\n\n    Args:\n        api_key (string): CKAN api key\n    \"\"\"\u003c/span\u003e\n    \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003edata_portal\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s\"\u003e'https://africaopendata.org'\u003c/span\u003e\n    \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eAPIKEY\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eapi_key\u003c/span\u003e\n    \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eckan\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eckanapi\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eRemoteCKAN\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003edata_portal\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eapikey\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eAPIKEY\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003eコンストラクタの呼び出しは次のようになります。\u003ccode\u003eargs.key\u003c/code\u003eにご自身のアカウントのCKAN APIキーを指定してください。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"n\"\u003euploader\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eOpanAfricaUploader\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eargs\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ekey\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch4\u003e\n\u003cspan id=\"パッケージの作成\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E3%81%AE%E4%BD%9C%E6%88%90\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eパッケージの作成\u003c/h4\u003e\n\n\u003cp\u003e\u003ca href=\"https://docs.ckan.org/en/2.7/api/index.html?highlight=package_create#module-ckan.logic.action.create\" rel=\"nofollow noopener\" target=\"_blank\"\u003epackage_create\u003c/a\u003eというAPIを利用してパッケージを作成します。その際引数には以下を指定します。\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003ename=ここで指定した文字列がパッケージのURLになります\u003c/li\u003e\n\u003cli\u003etitle=パッケージのタイトルです\u003c/li\u003e\n\u003cli\u003eowner_org=CKANのポータル上の対象組織のIDです\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003e作成に成功すると、パッケージ情報が戻り値として返って来ます。既にある場合はエラーになるため、例外処理の中で既存のパッケージ情報を取得する処理を書いています。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e  \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003ecreate_package\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eurl\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003etitle\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"s\"\u003e\"\"\"create new package if it does not exist yet.\n\n    Args:\n        url (str): the url of package eg. https://open.africa/dataset/{package url}\n        title (str): the title of package\n    \"\"\"\u003c/span\u003e\n    \u003cspan class=\"n\"\u003epackage_name\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eurl\u003c/span\u003e\n    \u003cspan class=\"n\"\u003epackage_title\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003etitle\u003c/span\u003e\n    \u003cspan class=\"k\"\u003etry\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'Creating \"{package_title}\" package'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"o\"\u003e**\u003c/span\u003e\u003cspan class=\"nb\"\u003elocals\u003c/span\u003e\u003cspan class=\"p\"\u003e()))\u003c/span\u003e\n        \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eckan\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eaction\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage_create\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ename\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003epackage_name\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n                                            \u003cspan class=\"n\"\u003etitle\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003epackage_title\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n                                            \u003cspan class=\"n\"\u003eowner_org\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s\"\u003e'water-and-sanitation-corporation-ltd-wasac'\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eexcept\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eckanapi\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eValidationError\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e \u003cspan class=\"k\"\u003eas\u003c/span\u003e \u003cspan class=\"n\"\u003ee\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ee\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eerror_dict\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'__type'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"s\"\u003e'Validation Error'\u003c/span\u003e \u003cspan class=\"ow\"\u003eand\u003c/span\u003e\n          \u003cspan class=\"n\"\u003ee\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eerror_dict\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'That URL is already in use.'\u003c/span\u003e\u003cspan class=\"p\"\u003e]):\u003c/span\u003e\n            \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'\"{package_title}\" package already exists'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"o\"\u003e**\u003c/span\u003e\u003cspan class=\"nb\"\u003elocals\u003c/span\u003e\u003cspan class=\"p\"\u003e()))\u003c/span\u003e\n            \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eckan\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eaction\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage_show\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nb\"\u003eid\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003epackage_name\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eelse\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n            \u003cspan class=\"k\"\u003eraise\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003eこの関数の呼び出し方は以下の通りになります\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"n\"\u003euploader\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ecreate_package\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'rw-water-vectortiles'\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"s\"\u003e'Vector Tiles for rural water supply systems in Rwanda'\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch4\u003e\n\u003cspan id=\"リソースの作成及び更新\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E3%81%AE%E4%BD%9C%E6%88%90%E5%8F%8A%E3%81%B3%E6%9B%B4%E6%96%B0\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eリソースの作成及び更新\u003c/h4\u003e\n\n\u003cp\u003eリソースの作成は\u003ccode\u003eresource_create\u003c/code\u003eという関数で行っています。\u003ccode\u003e/api/action/resource_create\u003c/code\u003eというREST APIを使用して、アップロード対象のバイナリデータやファイル情報などもろもろを渡してあげれば良いです。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003eresource_create\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eapi\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"/api/action/resource_create\"\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eapi_url\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003edata_portal\u003c/span\u003e \u003cspan class=\"o\"\u003e+\u003c/span\u003e \u003cspan class=\"n\"\u003eapi\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'Creating \"{}\"'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e]))\u003c/span\u003e\n    \u003cspan class=\"n\"\u003er\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003erequests\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epost\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eapi_url\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n                      \u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n                      \u003cspan class=\"n\"\u003eheaders\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"s\"\u003e'Authorization'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eAPIKEY\u003c/span\u003e\u003cspan class=\"p\"\u003e},\u003c/span\u003e\n                      \u003cspan class=\"n\"\u003efiles\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"p\"\u003e[(\u003c/span\u003e\u003cspan class=\"s\"\u003e'upload'\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"nb\"\u003eopen\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"s\"\u003e'rb'\u003c/span\u003e\u003cspan class=\"p\"\u003e))])\u003c/span\u003e\n\n    \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"n\"\u003er\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003estatus_code\u003c/span\u003e \u003cspan class=\"o\"\u003e!=\u003c/span\u003e \u003cspan class=\"mi\"\u003e200\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'Error while creating resource: {0}'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003er\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003econtent\u003c/span\u003e\u003cspan class=\"p\"\u003e))\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eelse\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n      \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'Uploaded \"{}\" successfully'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e]))\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e但し、\u003ccode\u003eresource_create\u003c/code\u003eだけだとリソースの追加だけしかできず、更新するたびにどんどん数が増えてしまいますので、\u003ccode\u003e/api/action/resource_update\u003c/code\u003eというAPIを使って、既存のリソースがあったら更新してあげるようにします。\u003c/p\u003e\n\n\u003cp\u003e\u003ccode\u003eresource_update\u003c/code\u003eの使い方は基本的に\u003ccode\u003eresource_create\u003c/code\u003eと同じで、違いは\u003ccode\u003edata\u003c/code\u003eのなかに\u003ccode\u003eresource_id\u003c/code\u003eがあるかないかだけです\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003eresource_update\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eresource_create\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"s\"\u003e\"/api/action/resource_update\"\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e\u003ccode\u003eresource_create\u003c/code\u003eと\u003ccode\u003eresource_update\u003c/code\u003eをいい感じに組み合わせて、既存のリソースがあったら更新し、なかったら新規作成するという処理にしたのが\u003ccode\u003eupload_datasets\u003c/code\u003eという関数です。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003eupload_datasets\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edescription\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n    \u003cspan class=\"c1\"\u003e# ファイル名を拡張子と分離します\n\u003c/span\u003e    \u003cspan class=\"n\"\u003efilename\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eos\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ebasename\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"n\"\u003eextension\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eos\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003esplitext\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003efilename\u003c/span\u003e\u003cspan class=\"p\"\u003e)[\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e\u003cspan class=\"p\"\u003e][\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e\u003cspan class=\"p\"\u003e:].\u003c/span\u003e\u003cspan class=\"n\"\u003elower\u003c/span\u003e\u003cspan class=\"p\"\u003e()\u003c/span\u003e\n\n    \u003cspan class=\"c1\"\u003e# リソース作成用のデータを作ります\n\u003c/span\u003e    \u003cspan class=\"n\"\u003edata\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n      \u003cspan class=\"s\"\u003e'package_id'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'id'\u003c/span\u003e\u003cspan class=\"p\"\u003e],\u003c/span\u003e \u003cspan class=\"c1\"\u003e#パッケージのID\n\u003c/span\u003e      \u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"n\"\u003efilename\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e                 \u003cspan class=\"c1\"\u003e#更新対象のファイル名\n\u003c/span\u003e      \u003cspan class=\"s\"\u003e'format'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"n\"\u003eextension\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e              \u003cspan class=\"c1\"\u003e#フォーマット（ここでは拡張子にしています）\n\u003c/span\u003e      \u003cspan class=\"s\"\u003e'description'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"n\"\u003edescription\u003c/span\u003e        \u003cspan class=\"c1\"\u003e#ファイルの説明\n\u003c/span\u003e    \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\n    \u003cspan class=\"c1\"\u003e# 既にパッケージ内にリソースがあった場合はアップロード対象のファイル名と同じ名前のリソースがあるかないかチェックする。\n\u003c/span\u003e    \u003cspan class=\"n\"\u003eresources\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'resources'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"nb\"\u003elen\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eresources\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e \u003cspan class=\"o\"\u003e\u0026gt;\u003c/span\u003e \u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n      \u003cspan class=\"n\"\u003etarget_resource\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"bp\"\u003eNone\u003c/span\u003e\n      \u003cspan class=\"k\"\u003efor\u003c/span\u003e \u003cspan class=\"n\"\u003eresource\u003c/span\u003e \u003cspan class=\"ow\"\u003ein\u003c/span\u003e \u003cspan class=\"nb\"\u003ereversed\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eresources\u003c/span\u003e\u003cspan class=\"p\"\u003e):\u003c/span\u003e\n        \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"n\"\u003efilename\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"n\"\u003eresource\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e]:\u003c/span\u003e\n          \u003cspan class=\"n\"\u003etarget_resource\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eresource\u003c/span\u003e\n          \u003cspan class=\"k\"\u003ebreak\u003c/span\u003e\n\n      \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"n\"\u003etarget_resource\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"bp\"\u003eNone\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"c1\"\u003e# 同じ名前のリソースがない場合はresource_createを呼び出す\n\u003c/span\u003e        \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eresource_create\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n      \u003cspan class=\"k\"\u003eelse\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"c1\"\u003e# リソースがある場合はdataにIDを設定してresource_updateを呼び出す\n\u003c/span\u003e        \u003cspan class=\"k\"\u003eprint\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'Resource \"{}\" already exists, it will be overwritten'\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003eformat\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003etarget_resource\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'name'\u003c/span\u003e\u003cspan class=\"p\"\u003e]))\u003c/span\u003e\n        \u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'id'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003etarget_resource\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"s\"\u003e'id'\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\n        \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eresource_update\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eelse\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n      \u003cspan class=\"c1\"\u003e# リソースがない場合はresource_createを呼び出す\n\u003c/span\u003e      \u003cspan class=\"bp\"\u003eself\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eresource_create\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e\u003ccode\u003eupload_datasets\u003c/code\u003e関数の呼び出し方は以下のようになります。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e \u003cspan class=\"n\"\u003euploader\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eupload_datasets\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eos\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eabspath\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'../data/rwss.mbtiles'\u003c/span\u003e\u003cspan class=\"p\"\u003e),\u003c/span\u003e \u003cspan class=\"s\"\u003e'mbtiles format of Mapbox Vector Tiles which was created by tippecanoe.'\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"アップロードのソースをコマンドラインから呼べるようにする\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%E3%81%AE%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%92%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%83%A9%E3%82%A4%E3%83%B3%E3%81%8B%E3%82%89%E5%91%BC%E3%81%B9%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eアップロードのソースをコマンドラインから呼べるようにする\u003c/h3\u003e\n\n\u003cp\u003e\u003ccode\u003eupload2openafrica.py\u003c/code\u003eでコマンドラインから呼べるようにしています。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"python\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"nn\"\u003eos\u003c/span\u003e\n\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"nn\"\u003eargparse\u003c/span\u003e\n\u003cspan class=\"kn\"\u003efrom\u003c/span\u003e \u003cspan class=\"nn\"\u003eOpenAfricaUploader\u003c/span\u003e \u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"n\"\u003eOpanAfricaUploader\u003c/span\u003e\n\n\u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003eget_args\u003c/span\u003e\u003cspan class=\"p\"\u003e():\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eprog\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s\"\u003e\"upload2openafrica.py\"\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eusage\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s\"\u003e\"%(prog)s [options]\"\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eparser\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eargparse\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eArgumentParser\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eprog\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003eprog\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003eusage\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"n\"\u003eusage\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eparser\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eadd_argument\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e\"--key\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edest\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"key\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ehelp\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"Your CKAN api key\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003erequired\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"bp\"\u003eTrue\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eparser\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eadd_argument\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e\"--pkg\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edest\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"package\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ehelp\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"Target url of your package\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003erequired\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"bp\"\u003eTrue\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eparser\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eadd_argument\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e\"--title\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edest\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"title\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ehelp\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"Title of your package\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003erequired\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"bp\"\u003eTrue\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eparser\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eadd_argument\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e\"--file\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edest\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"file\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ehelp\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"Relative path of file which you would like to upload\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003erequired\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"bp\"\u003eTrue\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eparser\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eadd_argument\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e\"--desc\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003edest\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"description\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003ehelp\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"any description for your file\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"n\"\u003erequired\u003c/span\u003e\u003cspan class=\"o\"\u003e=\u003c/span\u003e\u003cspan class=\"bp\"\u003eTrue\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eargs\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eparser\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eparse_args\u003c/span\u003e\u003cspan class=\"p\"\u003e()\u003c/span\u003e\n\n  \u003cspan class=\"k\"\u003ereturn\u003c/span\u003e \u003cspan class=\"n\"\u003eargs\u003c/span\u003e\n\n\u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"n\"\u003e__name__\u003c/span\u003e \u003cspan class=\"o\"\u003e==\u003c/span\u003e \u003cspan class=\"s\"\u003e\"__main__\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eargs\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eget_args\u003c/span\u003e\u003cspan class=\"p\"\u003e()\u003c/span\u003e\n\n  \u003cspan class=\"n\"\u003euploader\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eOpanAfricaUploader\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eargs\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ekey\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n  \u003cspan class=\"n\"\u003euploader\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003ecreate_package\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eargs\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epackage\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"n\"\u003eargs\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003etitle\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n  \u003cspan class=\"n\"\u003euploader\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eupload_datasets\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eos\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003epath\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003eabspath\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eargs\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nb\"\u003efile\u003c/span\u003e\u003cspan class=\"p\"\u003e),\u003c/span\u003e \u003cspan class=\"n\"\u003eargs\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"n\"\u003edescription\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e実際に使う際は以下のような感じになります。\u003ccode\u003eupload_mbtiles.sh\u003c/code\u003eというシェルスクリプトを作っています。環境変数に\u003ccode\u003eCKAN_API_KEY\u003c/code\u003eを設定するようにしてください。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"bash\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\n\u003cspan class=\"c\"\u003e#!/bin/bash\u003c/span\u003e\n\npipenv run python upload2openafrica.py \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e--key\u003c/span\u003e \u003cspan class=\"k\"\u003e${\u003c/span\u003e\u003cspan class=\"nv\"\u003eCKAN_API_KEY\u003c/span\u003e\u003cspan class=\"k\"\u003e}\u003c/span\u003e \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e--pkg\u003c/span\u003e rw-water-vectortiles \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e--title\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"Vector Tiles for rural water supply systems in Rwanda\"\u003c/span\u003e \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e--file\u003c/span\u003e ../data/rwss.mbtiles \u003cspan class=\"se\"\u003e\\\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e--desc\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"mbtiles format of Mapbox Vector Tiles which was created by tippecanoe.\"\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003eこれでCKAN APIを使ってオープンデータをアップロードできるようになりました。\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"データ連携の自動化\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%87%E3%83%BC%E3%82%BF%E9%80%A3%E6%90%BA%E3%81%AE%E8%87%AA%E5%8B%95%E5%8C%96\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eデータ連携の自動化\u003c/h2\u003e\n\n\u003cp\u003eでも毎回手動でCKANと連携するのは面倒なので、Github Actionで自動化します。ワークフローファイルは以下のような感じです。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"yaml\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"na\"\u003ename\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eopenAFRICA upload\u003c/span\u003e\n\n\u003cspan class=\"na\"\u003eon\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n  \u003cspan class=\"na\"\u003epush\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n    \u003cspan class=\"na\"\u003ebranches\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"pi\"\u003e[\u003c/span\u003e \u003cspan class=\"nv\"\u003emaster\u003c/span\u003e \u003cspan class=\"pi\"\u003e]\u003c/span\u003e\n    \u003cspan class=\"c1\"\u003e# ここではdataフォルダ以下が更新された場合にワークフローが走るようにしています\u003c/span\u003e\n    \u003cspan class=\"na\"\u003epaths\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n      \u003cspan class=\"pi\"\u003e-\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"\u003c/span\u003e\u003cspan class=\"s\"\u003edata/**\"\u003c/span\u003e\n\n\u003cspan class=\"na\"\u003ejobs\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n  \u003cspan class=\"na\"\u003ebuild\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n\n    \u003cspan class=\"na\"\u003eruns-on\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eubuntu-latest\u003c/span\u003e\n\n    \u003cspan class=\"na\"\u003esteps\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n    \u003cspan class=\"pi\"\u003e-\u003c/span\u003e \u003cspan class=\"na\"\u003euses\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eactions/checkout@v2\u003c/span\u003e\n    \u003cspan class=\"pi\"\u003e-\u003c/span\u003e \u003cspan class=\"na\"\u003ename\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eSet up Python \u003c/span\u003e\u003cspan class=\"m\"\u003e3.8\u003c/span\u003e\n      \u003cspan class=\"na\"\u003euses\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eactions/setup-python@v2\u003c/span\u003e\n      \u003cspan class=\"na\"\u003ewith\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"na\"\u003epython-version\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"m\"\u003e3.8\u003c/span\u003e\n    \u003cspan class=\"pi\"\u003e-\u003c/span\u003e \u003cspan class=\"na\"\u003ename\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eInstall dependencies\u003c/span\u003e\n      \u003cspan class=\"c1\"\u003e# ここでまずPipenvの初期設定をします\u003c/span\u003e\n      \u003cspan class=\"na\"\u003erun\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"pi\"\u003e|\u003c/span\u003e\n        \u003cspan class=\"s\"\u003ecd scripts\u003c/span\u003e\n        \u003cspan class=\"s\"\u003epip install pipenv\u003c/span\u003e\n        \u003cspan class=\"s\"\u003epipenv install\u003c/span\u003e\n    \u003cspan class=\"pi\"\u003e-\u003c/span\u003e \u003cspan class=\"na\"\u003ename\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eupload to openAFRICA\u003c/span\u003e\n      \u003cspan class=\"c1\"\u003e# GithubのリポジトリのSettingsページのSecretsでCKAN_API_KEYという名前で登録しておけば次のようにして環境変数を使うことができます\u003c/span\u003e\n      \u003cspan class=\"na\"\u003eenv\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n        \u003cspan class=\"na\"\u003eCKAN_API_KEY\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003e${{secrets.CKAN_API_KEY}}\u003c/span\u003e\n      \u003cspan class=\"c1\"\u003e# その上で、シェルスクリプトを呼んであげるようにします\u003c/span\u003e\n      \u003cspan class=\"na\"\u003erun\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"pi\"\u003e|\u003c/span\u003e\n        \u003cspan class=\"s\"\u003ecd scripts\u003c/span\u003e\n        \u003cspan class=\"s\"\u003e./upload_mbtiles.sh\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003eこれだけでGithubにファイルがアップロードされたらオープンデータプラットフォームに自動連携できるようになりました。次の画像はルワンダの水道公社のGithub Acitonが実行された際の画面です。\u003c/p\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F858331%2Fa6cd15c0-878c-468d-eaa4-be7d7c3762cf.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=e42c7ba37106ac947b761b9c82b59c04\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F858331%2Fa6cd15c0-878c-468d-eaa4-be7d7c3762cf.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=e42c7ba37106ac947b761b9c82b59c04\" alt=\"image.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/858331/a6cd15c0-878c-468d-eaa4-be7d7c3762cf.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F858331%2Fa6cd15c0-878c-468d-eaa4-be7d7c3762cf.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=32a15816b4a358a801972ccdcb48162a 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"まとめ\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%81%BE%E3%81%A8%E3%82%81\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eまとめ\u003c/h2\u003e\n\n\u003cp\u003eCKAN APIは国内外の様々なオープンソースプラットフォームで使用されています。そのCKAN APIはPythonを用いることで比較的簡単にデータ連携を実装することが可能です。またオープンデータを管理しているのがGithub上なら、Github Actionを用いてさらに容易に自動連携することができます。\u003c/p\u003e\n\n\u003cp\u003e今回openAFRICA向けに作成したモジュールが国内外の他のCKANを使ったオープンデータの利活用に役に立つことを願っています。\u003c/p\u003e\n",
  "body": "## 目次\n\n1. [概要](#概要)\n1. [前提条件](#前提条件)\n1. [データアップロードの仕組み](#データアップロードの仕組み)\n1. [データ連携の自動化](#データ連携の自動化)\n1. [まとめ](#まとめ)\n\n## 概要\n\n最近、[Code for Africa](https://codeforafrica.org)という団体が運営している[openAFRICA](https://open.africa)というアフリカのオープンデータのポータルサイトと、自身がルワンダの水道公社WASACと共同でメンテナンスしている水道ベクトルタイルデータの自動連携機能を、Pythonで実装した。\n\n日本の自治体のオープンデータサイトでも多く使われていると思われるCKANというAPIを用いているので、自組織が持っているファイルなどのオープンデータをAPI経由で自動連携させたい場合に活用できると思うので、共有したいと思う。\n\n## 前提条件\n\n- [CKAN API](https://docs.ckan.org/en/2.7/api/#api-examples)を使っているオープンデータプラットフォームに自組織のアカウントを持っている\n- Githubでオープンデータを管理している\n\nこの記事を通して、Githubに置いてあるオープンデータを更新したタイミングで、Github Actionを用いて、CKAN経由でプラットフォーム上のデータを自動連携させるようにします。\n\nちなみにルワンダの水道公社の水道ベクトルタイルのオープンデータのopenAFRICAのページは以下のリンクにあります。\nhttps://open.africa/dataset/rw-water-vectortiles\n\n![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/858331/b46451ae-dd33-af48-1927-63718068c6f8.png)\n\nまた水道ベクトルタイルのGithubリポジトリは以下のリンクにあり、毎週水道公社内のサーバーからGithubに自動更新されます。\nhttps://github.com/WASAC/vt\n\n![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/858331/012139e2-6dfd-3244-d44e-fa8d0b57bb91.png)\n\n\n## データアップロードの仕組み\n\n### リポジトリのダウンロードとインストール\n\npipenvがインストールされていない場合は、まず設定を行ってください。\n\n```\ngit clone https://github.com/watergis/open-africa-uploader\ncd open-africa-uploader\npipenv install\npipenv shell\n```\n\n### CKAN APIを用いたファイルのアップロードの仕組み\n\nまずリポジトリ内の`OpenAfricaUploader.py`のソースコード全文を載せます。\n\n```python\nimport os\nimport ckanapi\nimport requests\n\n\nclass OpanAfricaUploader(object):\n  def __init__(self, api_key):\n    \"\"\"Constructor\n\n    Args:\n        api_key (string): CKAN api key\n    \"\"\"\n    self.data_portal = 'https://africaopendata.org'\n    self.APIKEY = api_key\n    self.ckan = ckanapi.RemoteCKAN(self.data_portal, apikey=self.APIKEY)\n\n  def create_package(self, url, title):\n    \"\"\"create new package if it does not exist yet.\n\n    Args:\n        url (str): the url of package eg. https://open.africa/dataset/{package url}\n        title (str): the title of package\n    \"\"\"\n    package_name = url\n    package_title = title\n    try:\n        print ('Creating \"{package_title}\" package'.format(**locals()))\n        self.package = self.ckan.action.package_create(name=package_name,\n                                            title=package_title,\n                                            owner_org = 'water-and-sanitation-corporation-ltd-wasac')\n    except (ckanapi.ValidationError) as e:\n        if (e.error_dict['__type'] == 'Validation Error' and\n          e.error_dict['name'] == ['That URL is already in use.']):\n            print ('\"{package_title}\" package already exists'.format(**locals()))\n            self.package = self.ckan.action.package_show(id=package_name)\n        else:\n            raise\n\n  def resource_create(self, data, path, api=\"/api/action/resource_create\"):\n    \"\"\"create new resource, or update existing resource\n\n    Args:\n        data (object): data for creating resource. data must contain package_id, name, format, description. If you overwrite existing resource, id also must be included.\n        path (str): file path for uploading\n        api (str, optional): API url for creating or updating. Defaults to \"/api/action/resource_create\". If you want to update, please specify url for \"/api/action/resource_update\"\n    \"\"\"\n    self.api_url = self.data_portal + api\n    print ('Creating \"{}\"'.format(data['name']))\n    r = requests.post(self.api_url,\n                      data=data,\n                      headers={'Authorization': self.APIKEY},\n                      files=[('upload', open(path, 'rb'))])\n\n    if r.status_code != 200:\n        print ('Error while creating resource: {0}'.format(r.content))\n    else:\n      print ('Uploaded \"{}\" successfully'.format(data['name']))\n\n  def resource_update(self, data, path):\n    \"\"\"update existing resource\n\n    Args:\n        data (object): data for creating resource. data must contain id, package_id, name, format, description.\n        path (str): file path for uploading\n    \"\"\"\n    self.resource_create(data, path, \"/api/action/resource_update\")\n\n  def upload_datasets(self, path, description):\n    \"\"\"upload datasets under the package\n\n    Args:\n        path (str): file path for uploading\n        description (str): description for the dataset\n    \"\"\"\n    filename = os.path.basename(path)\n    extension = os.path.splitext(filename)[1][1:].lower()\n    \n    data = {\n      'package_id': self.package['id'],\n      'name': filename,\n      'format': extension,\n      'description': description\n    }\n\n    resources = self.package['resources']\n    if len(resources) \u003e 0:\n      target_resource = None\n      for resource in reversed(resources):\n        if filename == resource['name']:\n          target_resource = resource\n          break\n\n      if target_resource == None:\n        self.resource_create(data, path)\n      else:\n        print ('Resource \"{}\" already exists, it will be overwritten'.format(target_resource['name']))\n        data['id'] = target_resource['id']\n        self.resource_update(data, path)\n    else:\n      self.resource_create(data, path)\n```\n\n`OpenAfricaUploader.py`を呼び出してファイルをアップロードするソースコードは以下のような感じです。\n\n```python\nimport os\nfrom OpenAfricaUploader import OpanAfricaUploader\n\nuploader = OpanAfricaUploader(args.key)\nuploader.create_package('rw-water-vectortiles','Vector Tiles for rural water supply systems in Rwanda')\nuploader.upload_datasets(os.path.abspath('../data/rwss.mbtiles'), 'mbtiles format of Mapbox Vector Tiles which was created by tippecanoe.')\n```\n\n---\n\n一個ずつ説明していきます。\n\n#### コンストラクタ\n\nこのモジュールはあらかじめopenAFRICAにアップロードするためにベースとなるポータルサイトのURLをコンストラクタ内で設定しています。\n\n`self.data_portal = 'https://africaopendata.org'`の部分のURLを自組織が利用しているCKAN APIのURLと置き換えてください。\n\n```python\n  def __init__(self, api_key):\n    \"\"\"Constructor\n\n    Args:\n        api_key (string): CKAN api key\n    \"\"\"\n    self.data_portal = 'https://africaopendata.org'\n    self.APIKEY = api_key\n    self.ckan = ckanapi.RemoteCKAN(self.data_portal, apikey=self.APIKEY)\n```\n\nコンストラクタの呼び出しは次のようになります。`args.key`にご自身のアカウントのCKAN APIキーを指定してください。\n\n```python\nuploader = OpanAfricaUploader(args.key)\n```\n\n#### パッケージの作成\n\n[package_create](https://docs.ckan.org/en/2.7/api/index.html?highlight=package_create#module-ckan.logic.action.create)というAPIを利用してパッケージを作成します。その際引数には以下を指定します。\n\n- name=ここで指定した文字列がパッケージのURLになります\n- title=パッケージのタイトルです\n- owner_org=CKANのポータル上の対象組織のIDです\n\n作成に成功すると、パッケージ情報が戻り値として返って来ます。既にある場合はエラーになるため、例外処理の中で既存のパッケージ情報を取得する処理を書いています。\n\n```python\n  def create_package(self, url, title):\n    \"\"\"create new package if it does not exist yet.\n\n    Args:\n        url (str): the url of package eg. https://open.africa/dataset/{package url}\n        title (str): the title of package\n    \"\"\"\n    package_name = url\n    package_title = title\n    try:\n        print ('Creating \"{package_title}\" package'.format(**locals()))\n        self.package = self.ckan.action.package_create(name=package_name,\n                                            title=package_title,\n                                            owner_org = 'water-and-sanitation-corporation-ltd-wasac')\n    except (ckanapi.ValidationError) as e:\n        if (e.error_dict['__type'] == 'Validation Error' and\n          e.error_dict['name'] == ['That URL is already in use.']):\n            print ('\"{package_title}\" package already exists'.format(**locals()))\n            self.package = self.ckan.action.package_show(id=package_name)\n        else:\n            raise\n```\n\nこの関数の呼び出し方は以下の通りになります\n\n```python\nuploader.create_package('rw-water-vectortiles','Vector Tiles for rural water supply systems in Rwanda')\n```\n\n#### リソースの作成及び更新\n\nリソースの作成は`resource_create`という関数で行っています。`/api/action/resource_create`というREST APIを使用して、アップロード対象のバイナリデータやファイル情報などもろもろを渡してあげれば良いです。\n\n```python\ndef resource_create(self, data, path, api=\"/api/action/resource_create\"):\n    self.api_url = self.data_portal + api\n    print ('Creating \"{}\"'.format(data['name']))\n    r = requests.post(self.api_url,\n                      data=data,\n                      headers={'Authorization': self.APIKEY},\n                      files=[('upload', open(path, 'rb'))])\n\n    if r.status_code != 200:\n        print ('Error while creating resource: {0}'.format(r.content))\n    else:\n      print ('Uploaded \"{}\" successfully'.format(data['name']))\n```\n\n但し、`resource_create`だけだとリソースの追加だけしかできず、更新するたびにどんどん数が増えてしまいますので、`/api/action/resource_update`というAPIを使って、既存のリソースがあったら更新してあげるようにします。\n\n`resource_update`の使い方は基本的に`resource_create`と同じで、違いは`data`のなかに`resource_id`があるかないかだけです\n\n```python\ndef resource_update(self, data, path):\n    self.resource_create(data, path, \"/api/action/resource_update\")\n```\n\n`resource_create`と`resource_update`をいい感じに組み合わせて、既存のリソースがあったら更新し、なかったら新規作成するという処理にしたのが`upload_datasets`という関数です。\n\n```python\ndef upload_datasets(self, path, description):\n    # ファイル名を拡張子と分離します\n    filename = os.path.basename(path)\n    extension = os.path.splitext(filename)[1][1:].lower()\n    \n    # リソース作成用のデータを作ります\n    data = {\n      'package_id': self.package['id'], #パッケージのID\n      'name': filename,                 #更新対象のファイル名\n      'format': extension,              #フォーマット（ここでは拡張子にしています）\n      'description': description        #ファイルの説明\n    }\n\n    # 既にパッケージ内にリソースがあった場合はアップロード対象のファイル名と同じ名前のリソースがあるかないかチェックする。\n    resources = self.package['resources']\n    if len(resources) \u003e 0:\n      target_resource = None\n      for resource in reversed(resources):\n        if filename == resource['name']:\n          target_resource = resource\n          break\n\n      if target_resource == None:\n        # 同じ名前のリソースがない場合はresource_createを呼び出す\n        self.resource_create(data, path)\n      else:\n        # リソースがある場合はdataにIDを設定してresource_updateを呼び出す\n        print ('Resource \"{}\" already exists, it will be overwritten'.format(target_resource['name']))\n        data['id'] = target_resource['id']\n        self.resource_update(data, path)\n    else:\n      # リソースがない場合はresource_createを呼び出す\n      self.resource_create(data, path)\n```\n\n`upload_datasets`関数の呼び出し方は以下のようになります。\n\n```python\n uploader.upload_datasets(os.path.abspath('../data/rwss.mbtiles'), 'mbtiles format of Mapbox Vector Tiles which was created by tippecanoe.')\n```\n\n### アップロードのソースをコマンドラインから呼べるようにする\n\n`upload2openafrica.py`でコマンドラインから呼べるようにしています。\n\n```python\nimport os\nimport argparse\nfrom OpenAfricaUploader import OpanAfricaUploader\n\ndef get_args():\n  prog = \"upload2openafrica.py\"\n  usage = \"%(prog)s [options]\"\n  parser = argparse.ArgumentParser(prog=prog, usage=usage)\n  parser.add_argument(\"--key\", dest=\"key\", help=\"Your CKAN api key\", required=True)\n  parser.add_argument(\"--pkg\", dest=\"package\", help=\"Target url of your package\", required=True)\n  parser.add_argument(\"--title\", dest=\"title\", help=\"Title of your package\", required=True)\n  parser.add_argument(\"--file\", dest=\"file\", help=\"Relative path of file which you would like to upload\", required=True)\n  parser.add_argument(\"--desc\", dest=\"description\", help=\"any description for your file\", required=True)\n  args = parser.parse_args()\n\n  return args\n\nif __name__ == \"__main__\":\n  args = get_args()\n\n  uploader = OpanAfricaUploader(args.key)\n  uploader.create_package(args.package,args.title)\n  uploader.upload_datasets(os.path.abspath(args.file), args.description)\n```\n\n実際に使う際は以下のような感じになります。`upload_mbtiles.sh`というシェルスクリプトを作っています。環境変数に`CKAN_API_KEY`を設定するようにしてください。\n\n```bash\n\n#!/bin/bash\n\npipenv run python upload2openafrica.py \\\n  --key ${CKAN_API_KEY} \\\n  --pkg rw-water-vectortiles \\\n  --title \"Vector Tiles for rural water supply systems in Rwanda\" \\\n  --file ../data/rwss.mbtiles \\\n  --desc \"mbtiles format of Mapbox Vector Tiles which was created by tippecanoe.\"\n```\n\nこれでCKAN APIを使ってオープンデータをアップロードできるようになりました。\n\n## データ連携の自動化\n\nでも毎回手動でCKANと連携するのは面倒なので、Github Actionで自動化します。ワークフローファイルは以下のような感じです。\n\n```yaml\nname: openAFRICA upload\n\non:\n  push:\n    branches: [ master ]\n    # ここではdataフォルダ以下が更新された場合にワークフローが走るようにしています\n    paths:\n      - \"data/**\"\n\njobs:\n  build:\n\n    runs-on: ubuntu-latest\n\n    steps:\n    - uses: actions/checkout@v2\n    - name: Set up Python 3.8\n      uses: actions/setup-python@v2\n      with:\n        python-version: 3.8\n    - name: Install dependencies\n      # ここでまずPipenvの初期設定をします\n      run: |\n        cd scripts\n        pip install pipenv\n        pipenv install\n    - name: upload to openAFRICA\n      # GithubのリポジトリのSettingsページのSecretsでCKAN_API_KEYという名前で登録しておけば次のようにして環境変数を使うことができます\n      env:\n        CKAN_API_KEY: ${{secrets.CKAN_API_KEY}}\n      # その上で、シェルスクリプトを呼んであげるようにします\n      run: |\n        cd scripts\n        ./upload_mbtiles.sh\n```\n\nこれだけでGithubにファイルがアップロードされたらオープンデータプラットフォームに自動連携できるようになりました。次の画像はルワンダの水道公社のGithub Acitonが実行された際の画面です。\n\n![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/858331/a6cd15c0-878c-468d-eaa4-be7d7c3762cf.png)\n\n\n## まとめ\n\nCKAN APIは国内外の様々なオープンソースプラットフォームで使用されています。そのCKAN APIはPythonを用いることで比較的簡単にデータ連携を実装することが可能です。またオープンデータを管理しているのがGithub上なら、Github Actionを用いてさらに容易に自動連携することができます。\n\n今回openAFRICA向けに作成したモジュールが国内外の他のCKANを使ったオープンデータの利活用に役に立つことを願っています。\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T22:06:45+09:00",
  "group": null,
  "id": "b773aa998e96459cb696",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Python",
    "versions": []
  }, {
    "name": "opendata",
    "versions": []
  }, {
    "name": "civictech",
    "versions": []
  }, {
    "name": "ckan",
    "versions": []
  }, {
    "name": "GitHubActions",
    "versions": []
  }],
  "title": "PythonでCKAN APIを使ってオープンデータとしてアップロード\u0026Github Actionsで自動連携する",
  "updated_at": "2020-11-17T22:24:12+09:00",
  "url": "https://qiita.com/JinIgarashi/items/b773aa998e96459cb696",
  "user": {
    "description": "GIS Software Developer",
    "facebook_id": "",
    "followees_count": 0,
    "followers_count": 1,
    "github_login_name": "JinIgarashi",
    "id": "JinIgarashi",
    "items_count": 2,
    "linkedin_id": "jinigarashi",
    "location": "Kanagawa",
    "name": "Jin IGARASHI ",
    "organization": "MIERUNE Inc",
    "permanent_id": 858331,
    "profile_image_url": "https://avatars1.githubusercontent.com/u/2639701?v=4",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": "https://docs.water-gis.com"
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003cp\u003e\u003c/p\u003e\u003cblockquote class=\"twitter-tweet\"\u003e\n\u003cp\u003eペンギンの「ペンペン」が現れて何かしゃべるところまで。\u003ca href=\"https://twitter.com/hashtag/protoout?src=hash\u0026amp;ref_src=twsrc%5Etfw\" rel=\"nofollow noopener\" target=\"_blank\"\u003e#protoout\u003c/a\u003e \u003ca href=\"https://twitter.com/hashtag/AR?src=hash\u0026amp;ref_src=twsrc%5Etfw\" rel=\"nofollow noopener\" target=\"_blank\"\u003e#AR\u003c/a\u003e \u003ca href=\"https://t.co/mew6weQHUA\" rel=\"nofollow noopener\" target=\"_blank\"\u003epic.twitter.com/mew6weQHUA\u003c/a\u003e\u003c/p\u003e— 3do. (@3doHi) \u003ca href=\"https://twitter.com/3doHi/status/1328597873378914305?ref_src=twsrc%5Etfw\" rel=\"nofollow noopener\" target=\"_blank\"\u003eNovember 17, 2020\u003c/a\u003e\n\u003c/blockquote\u003e \u003cscript async src=\"https://platform.twitter.com/widgets.js\"\u003e\u003c/script\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"イヤイヤ期を解決する子育てサポートwebarアプリケーション\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%82%A4%E3%83%A4%E3%82%A4%E3%83%A4%E6%9C%9F%E3%82%92%E8%A7%A3%E6%B1%BA%E3%81%99%E3%82%8B%E5%AD%90%E8%82%B2%E3%81%A6%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88webar%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e「イヤイヤ期」を解決する子育てサポートWebARアプリケーション\u003c/h1\u003e\n\n\u003cp\u003e　現在、イヤイヤ期を迎えたこどもを持つパパ/ママ向けの子育てサポートWebアプリケーションを作成中です。\u003c/p\u003e\n\n\u003cp\u003e　試作の状態のため、「アプリケーションを作ろうと思った背景」や、「プロダクトの全体像」、「解決しようとしている課題とその狙い」などの詳細説明は、本記事では割愛しますが、\u003cb\u003e制作の状況や、完成品はQiitaにも都度アップデート出来ればと思っていますので、ご興味あれば引き続き記事のチェックお願いします！\u003c/b\u003e\u003c/p\u003e\n\n\u003cp\u003e　ざっくり言うと、\u003cb\u003eこどもの『ごはんのイヤイヤ（最後まで食べずに遊びたい）と、その後のお風呂のイヤイヤ（お風呂入りたくない）を、お風呂場にあるおもちゃのARコンテンツで解決したい』\u003c/b\u003eと思っています！\u003c/p\u003e\n\n\u003cp\u003e　現時点で出来ている下記2点までで、娘に使ってもらうテストをしてみましたので、その様子と、見えてきた改善点などを記事にしてみたいと思います。\u003cbr\u003e\n・ARマーカーを読み取りマーカー上にモデルを出現させる\u003cbr\u003e\n・モデルを画面に出現させたタイミングでmp3音源を再生する\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"娘に使ってもらいその様子を観察した\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%A8%98%E3%81%AB%E4%BD%BF%E3%81%A3%E3%81%A6%E3%82%82%E3%82%89%E3%81%84%E3%81%9D%E3%81%AE%E6%A7%98%E5%AD%90%E3%82%92%E8%A6%B3%E5%AF%9F%E3%81%97%E3%81%9F\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e娘に使ってもらい、その様子を観察した\u003c/h1\u003e\n\n\u003cp\u003e\u003cb\u003e１．使用感\u003c/b\u003e\u003cbr\u003e\n　1才11か月の娘には\u003cb\u003eARの世界観を理解してもらえるか（怖がったりしないか）、不安なところもありました\u003c/b\u003eが、スマホをかざすと、現実には存在しないペンギンが現れることに\u003cb\u003eかなり興味を示し、楽しんでる様子でした！\u003c/b\u003eスマホの中を覗き込んだり、スマホの外からマーカーを直接見たりしながら、「現実にあるようで無い」世界観をニヤニヤしながら楽しんでいました。\u003cbr\u003e\n　一方で、よっぽど楽しいのか何度も何度も「スマホをかずす」→「やめる」の繰り返しとなり、終わりのない感じになってしまいました。この点は、\u003cb\u003eアプリケーションとしての「終わり」を準備してあげる必要性を感じました。\u003c/b\u003e\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F737339%2F132d067c-8a8d-a113-bee1-61728e5151a2.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=0829b938a5a933990810a0b638838db5\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F737339%2F132d067c-8a8d-a113-bee1-61728e5151a2.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=0829b938a5a933990810a0b638838db5\" alt=\"IMG_9587.PNG\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/737339/132d067c-8a8d-a113-bee1-61728e5151a2.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F737339%2F132d067c-8a8d-a113-bee1-61728e5151a2.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=83ee93ddea49bb7c4df83b28cc114ca7 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003cbr\u003e\n\u003cb\u003e２．効果\u003c/b\u003e\u003cbr\u003e\n　ペンギンのARが出現したタイミングで、アプリケーション内で流れる「●●ちゃん、お風呂に入ろう！」という音声については、「･･･お風呂」と小さな声で呟いていたので、「お風呂」というキーワードは認識してくれたと思います。さらに妻が「ペンペン(←我が家のペンギンの愛称)がお風呂で待ってるってよ～」と促すと、\u003cb\u003eいつもよりスムーズにお風呂場に向かってくれました。\u003c/b\u003eそして、洗面台にいるペンペンに対面したときは\u003cb\u003e「あーペンペンだー！」\u003c/b\u003eと言って、嬉しそうにペンギンのおもちゃを手にしていましたので、お風呂に入りたくないという\u003cb\u003eイヤイヤの改善効果はある程度見込めるのではないかと思いました！\u003c/b\u003e\u003cbr\u003e\n　ただし、初めてだったので、\u003cb\u003e目新しもあり、良い反応を示したということもある\u003c/b\u003eと思いましたので、継続して利用してもらえるように、ペンギンだけでなく「今日は誰がお風呂で待ってくれてるだろう感」が必要な気がしました。\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F737339%2Fd17de963-c22b-be62-2994-7d6e7cd00288.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=326bb67c66bf8f03effeb54b1af25eb7\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F737339%2Fd17de963-c22b-be62-2994-7d6e7cd00288.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=326bb67c66bf8f03effeb54b1af25eb7\" alt=\"IMG_9588.PNG\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/737339/d17de963-c22b-be62-2994-7d6e7cd00288.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F737339%2Fd17de963-c22b-be62-2994-7d6e7cd00288.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=f8c9cb58851f8ac315ca70c2abe6ddf5 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003e\u003cb\u003e３．妻へのヒアリング\u003c/b\u003e\u003cbr\u003e\n　娘の反応は結構いいね！という同じ評価をもらえましたが、下記3点の指摘ももらいました。\u003cbr\u003e\n・ARモデルのペンペン(ペンギン)がリアルすぎてお風呂にいるおもちゃとギャップある。\u003cbr\u003e\n・娘の操作だと、スマホが固定できずARマーカーの読み取りが途中で切れてしまうことが何度かあった。音声が途中で途切れてしまうと、「お風呂に入ろう！」というキーワードまで辿りつかないこともあった。\u003cbr\u003e\n・うちの娘以外の反応も見てみた方がいいのではないか？\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"ということで今後考えたい改善点\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%81%A8%E3%81%84%E3%81%86%E3%81%93%E3%81%A8%E3%81%A7%E4%BB%8A%E5%BE%8C%E8%80%83%E3%81%88%E3%81%9F%E3%81%84%E6%94%B9%E5%96%84%E7%82%B9\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eということで、今後考えたい改善点\u003c/h1\u003e\n\n\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth\u003e見えた課題\u003c/th\u003e\n\u003cth\u003e対策\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd\u003eARが楽しくて終わりがない\u003c/td\u003e\n\u003ctd\u003e音声再生が終わったらペンペン(←我が家のペンギンの愛称)が自ら立ち去るようにしたい\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003e継続して利用してもらえるかわからない\u003c/td\u003e\n\u003ctd\u003eペンギンだけでないARモデルも準備したい\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003eARモデルのペンペンがリアルすぎてお風呂にいるおもちゃとギャップある\u003c/td\u003e\n\u003ctd\u003eもう少しデフォルメされたペンギンのARモデルを探す\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003e娘の操作だと、スマホが固定できずARマーカーの読み取りが途中で切れて、音声が途切れてしまう\u003c/td\u003e\n\u003ctd\u003e対策検討中（持ちやすそうなカメラ型のスマホケース買ってみたので次はそれでテスト予定）\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003e我が子以外のこどもの反応が悪い可能性がある\u003c/td\u003e\n\u003ctd\u003e検証に協力してくれる人を探して、色んなフィードバックをもらう\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"今回は以上引き続き頑張ります\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E4%BB%8A%E5%9B%9E%E3%81%AF%E4%BB%A5%E4%B8%8A%E5%BC%95%E3%81%8D%E7%B6%9A%E3%81%8D%E9%A0%91%E5%BC%B5%E3%82%8A%E3%81%BE%E3%81%99\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e今回は以上。引き続き頑張ります！\u003c/h1\u003e\n\n\u003cp\u003e　とりあえずはベースとなる機能と簡単な検証は成功したとと思うので、今回見えた課題の改善に取り組み、より良いモノを引き続き目指していきたいです！！\u003c/p\u003e\n\n\u003cp\u003e続く。\u003c/p\u003e\n",
  "body": "\u003cblockquote class=\"twitter-tweet\"\u003e\u003cp lang=\"ja\" dir=\"ltr\"\u003eペンギンの「ペンペン」が現れて何かしゃべるところまで。\u003ca href=\"https://twitter.com/hashtag/protoout?src=hash\u0026amp;ref_src=twsrc%5Etfw\"\u003e#protoout\u003c/a\u003e \u003ca href=\"https://twitter.com/hashtag/AR?src=hash\u0026amp;ref_src=twsrc%5Etfw\"\u003e#AR\u003c/a\u003e \u003ca href=\"https://t.co/mew6weQHUA\"\u003epic.twitter.com/mew6weQHUA\u003c/a\u003e\u003c/p\u003e\u0026mdash; 3do. (@3doHi) \u003ca href=\"https://twitter.com/3doHi/status/1328597873378914305?ref_src=twsrc%5Etfw\"\u003eNovember 17, 2020\u003c/a\u003e\u003c/blockquote\u003e \u003cscript async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"\u003e\u003c/script\u003e\n\n#「イヤイヤ期」を解決する子育てサポートWebARアプリケーション\n　現在、イヤイヤ期を迎えたこどもを持つパパ/ママ向けの子育てサポートWebアプリケーションを作成中です。\n\n　試作の状態のため、「アプリケーションを作ろうと思った背景」や、「プロダクトの全体像」、「解決しようとしている課題とその狙い」などの詳細説明は、本記事では割愛しますが、\u003cB\u003e制作の状況や、完成品はQiitaにも都度アップデート出来ればと思っていますので、ご興味あれば引き続き記事のチェックお願いします！\u003c/B\u003e\n\n　ざっくり言うと、\u003cB\u003eこどもの『ごはんのイヤイヤ（最後まで食べずに遊びたい）と、その後のお風呂のイヤイヤ（お風呂入りたくない）を、お風呂場にあるおもちゃのARコンテンツで解決したい』\u003c/B\u003eと思っています！\n\n　現時点で出来ている下記2点までで、娘に使ってもらうテストをしてみましたので、その様子と、見えてきた改善点などを記事にしてみたいと思います。\n・ARマーカーを読み取りマーカー上にモデルを出現させる\n・モデルを画面に出現させたタイミングでmp3音源を再生する\n\n#娘に使ってもらい、その様子を観察した\n\n\u003cB\u003e１．使用感\u003c/B\u003e\n　1才11か月の娘には\u003cB\u003eARの世界観を理解してもらえるか（怖がったりしないか）、不安なところもありました\u003c/B\u003eが、スマホをかざすと、現実には存在しないペンギンが現れることに\u003cB\u003eかなり興味を示し、楽しんでる様子でした！\u003c/B\u003eスマホの中を覗き込んだり、スマホの外からマーカーを直接見たりしながら、「現実にあるようで無い」世界観をニヤニヤしながら楽しんでいました。\n　一方で、よっぽど楽しいのか何度も何度も「スマホをかずす」→「やめる」の繰り返しとなり、終わりのない感じになってしまいました。この点は、\u003cB\u003eアプリケーションとしての「終わり」を準備してあげる必要性を感じました。\u003c/B\u003e\n![IMG_9587.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/737339/132d067c-8a8d-a113-bee1-61728e5151a2.png)\n\u003cB\u003e２．効果\u003c/B\u003e\n　ペンギンのARが出現したタイミングで、アプリケーション内で流れる「●●ちゃん、お風呂に入ろう！」という音声については、「･･･お風呂」と小さな声で呟いていたので、「お風呂」というキーワードは認識してくれたと思います。さらに妻が「ペンペン(←我が家のペンギンの愛称)がお風呂で待ってるってよ～」と促すと、\u003cB\u003eいつもよりスムーズにお風呂場に向かってくれました。\u003c/B\u003eそして、洗面台にいるペンペンに対面したときは\u003cB\u003e「あーペンペンだー！」\u003c/B\u003eと言って、嬉しそうにペンギンのおもちゃを手にしていましたので、お風呂に入りたくないという\u003cB\u003eイヤイヤの改善効果はある程度見込めるのではないかと思いました！\u003c/B\u003e\n　ただし、初めてだったので、\u003cB\u003e目新しもあり、良い反応を示したということもある\u003c/B\u003eと思いましたので、継続して利用してもらえるように、ペンギンだけでなく「今日は誰がお風呂で待ってくれてるだろう感」が必要な気がしました。\n![IMG_9588.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/737339/d17de963-c22b-be62-2994-7d6e7cd00288.png)\n\n\u003cB\u003e３．妻へのヒアリング\u003c/B\u003e\n　娘の反応は結構いいね！という同じ評価をもらえましたが、下記3点の指摘ももらいました。\n・ARモデルのペンペン(ペンギン)がリアルすぎてお風呂にいるおもちゃとギャップある。\n・娘の操作だと、スマホが固定できずARマーカーの読み取りが途中で切れてしまうことが何度かあった。音声が途中で途切れてしまうと、「お風呂に入ろう！」というキーワードまで辿りつかないこともあった。\n・うちの娘以外の反応も見てみた方がいいのではないか？\n\n#ということで、今後考えたい改善点\n\n|見えた課題|対策                  |\n|------------|--------------------------|\n|ARが楽しくて終わりがない|音声再生が終わったらペンペン(←我が家のペンギンの愛称)が自ら立ち去るようにしたい|\n|継続して利用してもらえるかわからない|ペンギンだけでないARモデルも準備したい|\n|ARモデルのペンペンがリアルすぎてお風呂にいるおもちゃとギャップある|もう少しデフォルメされたペンギンのARモデルを探す|\n|娘の操作だと、スマホが固定できずARマーカーの読み取りが途中で切れて、音声が途切れてしまう|対策検討中（持ちやすそうなカメラ型のスマホケース買ってみたので次はそれでテスト予定）|\n|我が子以外のこどもの反応が悪い可能性がある|検証に協力してくれる人を探して、色んなフィードバックをもらう|\n#今回は以上。引き続き頑張ります！\n　とりあえずはベースとなる機能と簡単な検証は成功したとと思うので、今回見えた課題の改善に取り組み、より良いモノを引き続き目指していきたいです！！\n\n続く。\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T22:06:03+09:00",
  "group": null,
  "id": "47d2eb8d9a092e168685",
  "likes_count": 1,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "JavaScript",
    "versions": []
  }, {
    "name": "AR",
    "versions": []
  }, {
    "name": "A-Frame",
    "versions": []
  }, {
    "name": "Netlify",
    "versions": []
  }, {
    "name": "Poly",
    "versions": []
  }],
  "title": "子育てサポートWebARアプリケーションを作成中！プログラム初心者パパの挑戦",
  "updated_at": "2020-11-17T22:26:47+09:00",
  "url": "https://qiita.com/m3do/items/47d2eb8d9a092e168685",
  "user": {
    "description": "",
    "facebook_id": "",
    "followees_count": 7,
    "followers_count": 20,
    "github_login_name": null,
    "id": "m3do",
    "items_count": 15,
    "linkedin_id": "",
    "location": "東京都文京区",
    "name": "三戸 誠",
    "organization": "",
    "permanent_id": 737339,
    "profile_image_url": "https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/737339/6bf2bc9e72f199792e56ec850cebdcd0ac8888d9/large.png?1602845702",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003cp\u003e\u003cstrong\u003eimage_picker\u003c/strong\u003eで、ライブラリからの画像選択、カメラを起動・撮影した画像の利用が可能。\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"パッケージの導入\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E3%81%AE%E5%B0%8E%E5%85%A5\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eパッケージの導入\u003c/h2\u003e\n\n\u003cp\u003epubspec.yamlにimage_pickerを追加\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"yaml\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003epubspec.yaml\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"na\"\u003edependencies\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n  \u003cspan class=\"na\"\u003eflutter\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e\n    \u003cspan class=\"na\"\u003esdk\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003eflutter\u003c/span\u003e\n  \u003cspan class=\"na\"\u003eimage_picker\u003c/span\u003e\u003cspan class=\"pi\"\u003e:\u003c/span\u003e \u003cspan class=\"s\"\u003e^0.6.7+14\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"image_pickerを用いた画像選択処理\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#image_picker%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E7%94%BB%E5%83%8F%E9%81%B8%E6%8A%9E%E5%87%A6%E7%90%86\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eimage_pickerを用いた画像選択処理\u003c/h2\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"dart\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003euser_icon_photo_page.dart\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"s\"\u003e'dart:io'\u003c/span\u003e\u003cspan class=\"o\"\u003e;\u003c/span\u003e\n\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"s\"\u003e'package:flutter/material.dart'\u003c/span\u003e\u003cspan class=\"o\"\u003e;\u003c/span\u003e\n\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"s\"\u003e'package:image_picker/image_picker.dart'\u003c/span\u003e\u003cspan class=\"o\"\u003e;\u003c/span\u003e\n\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"s\"\u003e'package:project_name/widgets/custom_button_text.dart'\u003c/span\u003e\u003cspan class=\"o\"\u003e;\u003c/span\u003e\n\n\n\u003cspan class=\"kd\"\u003eclass\u003c/span\u003e \u003cspan class=\"nc\"\u003eUserIconPhotoPage\u003c/span\u003e \u003cspan class=\"kd\"\u003eextends\u003c/span\u003e \u003cspan class=\"n\"\u003eStatefulWidget\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"nd\"\u003e@override\u003c/span\u003e\n  \u003cspan class=\"n\"\u003e_UserIconPhotoPageState\u003c/span\u003e \u003cspan class=\"n\"\u003ecreateState\u003c/span\u003e\u003cspan class=\"o\"\u003e()\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u0026gt;\u003c/span\u003e \u003cspan class=\"n\"\u003e_UserIconPhotoPageState\u003c/span\u003e\u003cspan class=\"o\"\u003e();\u003c/span\u003e\n\u003cspan class=\"o\"\u003e}\u003c/span\u003e\n\n\u003cspan class=\"kd\"\u003eclass\u003c/span\u003e \u003cspan class=\"nc\"\u003e_UserIconPhotoPageState\u003c/span\u003e \u003cspan class=\"kd\"\u003eextends\u003c/span\u003e \u003cspan class=\"n\"\u003eState\u003c/span\u003e\u003cspan class=\"o\"\u003e\u0026lt;\u003c/span\u003e\u003cspan class=\"n\"\u003eUserIconPhotoPage\u003c/span\u003e\u003cspan class=\"o\"\u003e\u0026gt;\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eFile\u003c/span\u003e \u003cspan class=\"n\"\u003e_image\u003c/span\u003e\u003cspan class=\"o\"\u003e;\u003c/span\u003e\n  \u003cspan class=\"kd\"\u003efinal\u003c/span\u003e \u003cspan class=\"n\"\u003e_picker\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eImagePicker\u003c/span\u003e\u003cspan class=\"o\"\u003e();\u003c/span\u003e\n\n  \u003cspan class=\"n\"\u003eFuture\u003c/span\u003e\u003cspan class=\"o\"\u003e\u0026lt;\u003c/span\u003e\u003cspan class=\"kt\"\u003evoid\u003c/span\u003e\u003cspan class=\"o\"\u003e\u0026gt;\u003c/span\u003e \u003cspan class=\"n\"\u003e_getImage\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eImageSource\u003c/span\u003e \u003cspan class=\"kn\"\u003esource\u003c/span\u003e\u003cspan class=\"o\"\u003e)\u003c/span\u003e \u003cspan class=\"n\"\u003easync\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"kd\"\u003efinal\u003c/span\u003e \u003cspan class=\"n\"\u003epickedFile\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eawait\u003c/span\u003e \u003cspan class=\"n\"\u003e_picker\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003egetImage\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"kn\"\u003esource\u003c/span\u003e\u003cspan class=\"o\"\u003e:\u003c/span\u003e \u003cspan class=\"kn\"\u003esource\u003c/span\u003e\u003cspan class=\"o\"\u003e);\u003c/span\u003e\n\n    \u003cspan class=\"n\"\u003esetState\u003c/span\u003e\u003cspan class=\"o\"\u003e(()\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n      \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003epickedFile\u003c/span\u003e \u003cspan class=\"o\"\u003e!=\u003c/span\u003e \u003cspan class=\"kc\"\u003enull\u003c/span\u003e\u003cspan class=\"o\"\u003e)\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n        \u003cspan class=\"n\"\u003e_image\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"n\"\u003eFile\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003epickedFile\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003epath\u003c/span\u003e\u003cspan class=\"o\"\u003e);\u003c/span\u003e\n      \u003cspan class=\"o\"\u003e}\u003c/span\u003e \u003cspan class=\"k\"\u003eelse\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n        \u003cspan class=\"n\"\u003eprint\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e'画像が選択されていません'\u003c/span\u003e\u003cspan class=\"o\"\u003e);\u003c/span\u003e\n      \u003cspan class=\"o\"\u003e}\u003c/span\u003e\n    \u003cspan class=\"o\"\u003e});\u003c/span\u003e\n  \u003cspan class=\"o\"\u003e}\u003c/span\u003e\n\n  \u003cspan class=\"nd\"\u003e@override\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eWidget\u003c/span\u003e \u003cspan class=\"n\"\u003ebuild\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eBuildContext\u003c/span\u003e \u003cspan class=\"n\"\u003econtext\u003c/span\u003e\u003cspan class=\"o\"\u003e)\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"k\"\u003ereturn\u003c/span\u003e \u003cspan class=\"n\"\u003eScaffold\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\n      \u003cspan class=\"nl\"\u003ebody:\u003c/span\u003e \u003cspan class=\"n\"\u003eCenter\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\n        \u003cspan class=\"nl\"\u003echild:\u003c/span\u003e \u003cspan class=\"n\"\u003eColumn\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\n          \u003cspan class=\"nl\"\u003emainAxisAlignment:\u003c/span\u003e \u003cspan class=\"n\"\u003eMainAxisAlignment\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003ecenter\u003c/span\u003e\u003cspan class=\"o\"\u003e,\u003c/span\u003e\n          \u003cspan class=\"nl\"\u003echildren:\u003c/span\u003e \u003cspan class=\"o\"\u003e[\u003c/span\u003e\n            \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003e_image\u003c/span\u003e \u003cspan class=\"o\"\u003e!=\u003c/span\u003e \u003cspan class=\"kc\"\u003enull\u003c/span\u003e\u003cspan class=\"o\"\u003e)\u003c/span\u003e \u003cspan class=\"n\"\u003eImage\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003efile\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003e_image\u003c/span\u003e\u003cspan class=\"o\"\u003e),\u003c/span\u003e \u003cspan class=\"c1\"\u003e// 画像選択後、画像が表示される\u003c/span\u003e\n            \u003cspan class=\"n\"\u003eRaisedButton\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\n              \u003cspan class=\"nl\"\u003ecolor:\u003c/span\u003e \u003cspan class=\"n\"\u003eColors\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003egrey\u003c/span\u003e\u003cspan class=\"o\"\u003e,\u003c/span\u003e\n              \u003cspan class=\"nl\"\u003eshape:\u003c/span\u003e \u003cspan class=\"n\"\u003eStadiumBorder\u003c/span\u003e\u003cspan class=\"o\"\u003e(),\u003c/span\u003e\n              \u003cspan class=\"nl\"\u003eonPressed:\u003c/span\u003e \u003cspan class=\"o\"\u003e()\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n                \u003cspan class=\"n\"\u003e_getImage\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eImageSource\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003egallery\u003c/span\u003e\u003cspan class=\"o\"\u003e);\u003c/span\u003e\n              \u003cspan class=\"o\"\u003e},\u003c/span\u003e\n              \u003cspan class=\"nl\"\u003echild:\u003c/span\u003e \u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"n\"\u003eCustomButtonText\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"nl\"\u003ebuttonText:\u003c/span\u003e \u003cspan class=\"s\"\u003e\"ライブラリから選択\"\u003c/span\u003e\u003cspan class=\"o\"\u003e)\u003c/span\u003e\n            \u003cspan class=\"o\"\u003e),\u003c/span\u003e\n            \u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"n\"\u003eSizedBox\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\n              \u003cspan class=\"nl\"\u003eheight:\u003c/span\u003e \u003cspan class=\"mi\"\u003e20\u003c/span\u003e\u003cspan class=\"o\"\u003e,\u003c/span\u003e\n            \u003cspan class=\"o\"\u003e),\u003c/span\u003e\n            \u003cspan class=\"n\"\u003eRaisedButton\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\n              \u003cspan class=\"nl\"\u003ecolor:\u003c/span\u003e \u003cspan class=\"n\"\u003eColors\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003egrey\u003c/span\u003e\u003cspan class=\"o\"\u003e,\u003c/span\u003e\n              \u003cspan class=\"nl\"\u003eshape:\u003c/span\u003e \u003cspan class=\"n\"\u003eStadiumBorder\u003c/span\u003e\u003cspan class=\"o\"\u003e(),\u003c/span\u003e\n              \u003cspan class=\"nl\"\u003eonPressed:\u003c/span\u003e \u003cspan class=\"o\"\u003e()\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n                \u003cspan class=\"n\"\u003e_getImage\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eImageSource\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003ecamera\u003c/span\u003e\u003cspan class=\"o\"\u003e);\u003c/span\u003e\n              \u003cspan class=\"o\"\u003e},\u003c/span\u003e\n              \u003cspan class=\"nl\"\u003echild:\u003c/span\u003e \u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"n\"\u003eCustomButtonText\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"nl\"\u003ebuttonText:\u003c/span\u003e \u003cspan class=\"s\"\u003e\"写真を撮影する\"\u003c/span\u003e\u003cspan class=\"o\"\u003e),\u003c/span\u003e\n            \u003cspan class=\"o\"\u003e),\u003c/span\u003e\n          \u003cspan class=\"o\"\u003e],\u003c/span\u003e\n        \u003cspan class=\"o\"\u003e),\u003c/span\u003e\n      \u003cspan class=\"o\"\u003e),\u003c/span\u003e\n    \u003cspan class=\"o\"\u003e);\u003c/span\u003e\n  \u003cspan class=\"o\"\u003e}\u003c/span\u003e\n\u003cspan class=\"o\"\u003e}\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cp\u003e※ RaisedButtonに利用するテキストを別Widgetに切り出しています。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"dart\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003ecustom_button_text.dart\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"kn\"\u003eimport\u003c/span\u003e \u003cspan class=\"s\"\u003e'package:flutter/material.dart'\u003c/span\u003e\u003cspan class=\"o\"\u003e;\u003c/span\u003e\n\n\u003cspan class=\"kd\"\u003eclass\u003c/span\u003e \u003cspan class=\"nc\"\u003eCustomButtonText\u003c/span\u003e \u003cspan class=\"kd\"\u003eextends\u003c/span\u003e \u003cspan class=\"n\"\u003eStatelessWidget\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"kd\"\u003efinal\u003c/span\u003e \u003cspan class=\"n\"\u003ebuttonText\u003c/span\u003e\u003cspan class=\"o\"\u003e;\u003c/span\u003e\n\n  \u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"n\"\u003eCustomButtonText\u003c/span\u003e\u003cspan class=\"o\"\u003e({\u003c/span\u003e\u003cspan class=\"n\"\u003eKey\u003c/span\u003e \u003cspan class=\"n\"\u003ekey\u003c/span\u003e\u003cspan class=\"o\"\u003e,\u003c/span\u003e \u003cspan class=\"k\"\u003ethis\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003ebuttonText\u003c/span\u003e\u003cspan class=\"o\"\u003e})\u003c/span\u003e \u003cspan class=\"o\"\u003e:\u003c/span\u003e \u003cspan class=\"k\"\u003esuper\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"nl\"\u003ekey:\u003c/span\u003e \u003cspan class=\"n\"\u003ekey\u003c/span\u003e\u003cspan class=\"o\"\u003e);\u003c/span\u003e\n\n  \u003cspan class=\"nd\"\u003e@override\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eWidget\u003c/span\u003e \u003cspan class=\"n\"\u003ebuild\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003eBuildContext\u003c/span\u003e \u003cspan class=\"n\"\u003econtext\u003c/span\u003e\u003cspan class=\"o\"\u003e)\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"k\"\u003ereturn\u003c/span\u003e \u003cspan class=\"n\"\u003eContainer\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\n      \u003cspan class=\"nl\"\u003ewidth:\u003c/span\u003e \u003cspan class=\"mi\"\u003e200\u003c/span\u003e\u003cspan class=\"o\"\u003e,\u003c/span\u003e\n      \u003cspan class=\"nl\"\u003eheight:\u003c/span\u003e \u003cspan class=\"mi\"\u003e40\u003c/span\u003e\u003cspan class=\"o\"\u003e,\u003c/span\u003e\n      \u003cspan class=\"nl\"\u003echild:\u003c/span\u003e \u003cspan class=\"n\"\u003eCenter\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\n        \u003cspan class=\"nl\"\u003echild:\u003c/span\u003e \u003cspan class=\"n\"\u003eText\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\n          \u003cspan class=\"n\"\u003ebuttonText\u003c/span\u003e\u003cspan class=\"o\"\u003e,\u003c/span\u003e\n          \u003cspan class=\"nl\"\u003estyle:\u003c/span\u003e \u003cspan class=\"n\"\u003eTextStyle\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\n            \u003cspan class=\"nl\"\u003ecolor:\u003c/span\u003e \u003cspan class=\"n\"\u003eColors\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003ewhite\u003c/span\u003e\u003cspan class=\"o\"\u003e,\u003c/span\u003e\n            \u003cspan class=\"nl\"\u003efontSize:\u003c/span\u003e \u003cspan class=\"mi\"\u003e18\u003c/span\u003e\u003cspan class=\"o\"\u003e,\u003c/span\u003e\n          \u003cspan class=\"o\"\u003e),\u003c/span\u003e\n        \u003cspan class=\"o\"\u003e),\u003c/span\u003e\n      \u003cspan class=\"o\"\u003e),\u003c/span\u003e\n    \u003cspan class=\"o\"\u003e);\u003c/span\u003e\n  \u003cspan class=\"o\"\u003e}\u003c/span\u003e\n\u003cspan class=\"o\"\u003e}\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"参考\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%8F%82%E8%80%83\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e参考\u003c/h2\u003e\n\n\u003cul\u003e\n\u003cli\u003eimage_picker : \u003ca href=\"https://pub.dev/packages/image_picker\" class=\"autolink\" rel=\"nofollow noopener\" target=\"_blank\"\u003ehttps://pub.dev/packages/image_picker\u003c/a\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n",
  "body": "**image_picker**で、ライブラリからの画像選択、カメラを起動・撮影した画像の利用が可能。\n\n## パッケージの導入\npubspec.yamlにimage_pickerを追加\n\n```pubspec.yaml\ndependencies:\n  flutter:\n    sdk: flutter\n  image_picker: ^0.6.7+14\n```\n\n## image_pickerを用いた画像選択処理\n\n```user_icon_photo_page.dart\nimport 'dart:io';\nimport 'package:flutter/material.dart';\nimport 'package:image_picker/image_picker.dart';\nimport 'package:project_name/widgets/custom_button_text.dart';\n\n\nclass UserIconPhotoPage extends StatefulWidget {\n  @override\n  _UserIconPhotoPageState createState() =\u003e _UserIconPhotoPageState();\n}\n\nclass _UserIconPhotoPageState extends State\u003cUserIconPhotoPage\u003e {\n  File _image;\n  final _picker = ImagePicker();\n\n  Future\u003cvoid\u003e _getImage(ImageSource source) async {\n    final pickedFile = await _picker.getImage(source: source);\n\n    setState(() {\n      if (pickedFile != null) {\n        _image = File(pickedFile.path);\n      } else {\n        print('画像が選択されていません');\n      }\n    });\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            if (_image != null) Image.file(_image), // 画像選択後、画像が表示される\n            RaisedButton(\n              color: Colors.grey,\n              shape: StadiumBorder(),\n              onPressed: () {\n                _getImage(ImageSource.gallery);\n              },\n              child: const CustomButtonText(buttonText: \"ライブラリから選択\")\n            ),\n            const SizedBox(\n              height: 20,\n            ),\n            RaisedButton(\n              color: Colors.grey,\n              shape: StadiumBorder(),\n              onPressed: () {\n                _getImage(ImageSource.camera);\n              },\n              child: const CustomButtonText(buttonText: \"写真を撮影する\"),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}\n``` \n\n※ RaisedButtonに利用するテキストを別Widgetに切り出しています。\n\n```custom_button_text.dart\nimport 'package:flutter/material.dart';\n\nclass CustomButtonText extends StatelessWidget {\n  final buttonText;\n\n  const CustomButtonText({Key key, this.buttonText}) : super(key: key);\n\n  @override\n  Widget build(BuildContext context) {\n    return Container(\n      width: 200,\n      height: 40,\n      child: Center(\n        child: Text(\n          buttonText,\n          style: TextStyle(\n            color: Colors.white,\n            fontSize: 18,\n          ),\n        ),\n      ),\n    );\n  }\n}\n```\n\n## 参考\n- image_picker : https://pub.dev/packages/image_picker\n\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T22:05:32+09:00",
  "group": null,
  "id": "0242481d92b04653ce86",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Flutter",
    "versions": []
  }],
  "title": "【Flutter】image_pickerを利用した画像選択処理（カメラ撮影・ギャラリーから選択）",
  "updated_at": "2020-11-17T22:05:32+09:00",
  "url": "https://qiita.com/kedev01/items/0242481d92b04653ce86",
  "user": {
    "description": null,
    "facebook_id": null,
    "followees_count": 0,
    "followers_count": 0,
    "github_login_name": null,
    "id": "kedev01",
    "items_count": 1,
    "linkedin_id": null,
    "location": null,
    "name": "",
    "organization": null,
    "permanent_id": 681808,
    "profile_image_url": "https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png",
    "team_only": false,
    "twitter_screen_name": "kedev01",
    "website_url": null
  },
  "page_views_count": null
}, {
  "rendered_body": "\n\u003ch2\u003e\n\u003cspan id=\"概要\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%A6%82%E8%A6%81\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e概要\u003c/h2\u003e\n\n\u003cp\u003eコンテナを立ち上げるときにエラーが起きたので、その対処法とコマンドをまとめておきます。\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"エラー文\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%82%A8%E3%83%A9%E3%83%BC%E6%96%87\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eエラー文\u003c/h2\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"terminal\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eターミナル\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"go\"\u003eError response from daemon: Conflict. The container name \"コンテナ名\" is already in use by container \"コンテナID\". You have to remove (or rename) that container to be able to reuse that name.\n\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cp\u003eコンテナがすでにあるので、名前を変更するか削除するかしてください。要するに同じコンテナ名は複数つくれないということですね！！\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"仮説\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E4%BB%AE%E8%AA%AC\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e仮説\u003c/h2\u003e\n\n\u003cul\u003e\n\u003cli\u003e動作しているコンテナ一覧を見る。\u003c/li\u003e\n\u003cli\u003e動作を止め、コンテナ削除。\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"必要になるコマンド\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%BF%85%E8%A6%81%E3%81%AB%E3%81%AA%E3%82%8B%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e必要になるコマンド\u003c/h2\u003e\n\n\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth style=\"text-align: center\"\u003eDockerコマンド\u003c/th\u003e\n\u003cth style=\"text-align: center\"\u003e備考\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd style=\"text-align: center\"\u003e\u003ccode\u003edocker ps\u003c/code\u003e\u003c/td\u003e\n\u003ctd style=\"text-align: center\"\u003e動作中コンテナ一覧\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd style=\"text-align: center\"\u003edocker ps -a     　\u003c/td\u003e\n\u003ctd style=\"text-align: center\"\u003eコンテナ一覧\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd style=\"text-align: center\"\u003edocker stop コンテナID\u003c/td\u003e\n\u003ctd style=\"text-align: center\"\u003e動作しているコンテナをストップ\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd style=\"text-align: center\"\u003edocker rm (-f) コンテナID\u003c/td\u003e\n\u003ctd style=\"text-align: center\"\u003e停止しているコンテナを削除 ※-fオプションを付けると強制削除\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n\n\u003cp\u003e注意が必要なのが、コンテナをストップしてからでないとコンテナ削除ができないこと。\u003cbr\u003e動作しているコンテナを停止コマンドで停止させたあと、\u003cstrong\u003e\u003cem\u003eそのまま削除するのではなく、動作していたコンテナが停止できたのか？を確認をしてから削除\u003c/em\u003e\u003c/strong\u003eする。また、\u003cstrong\u003e\u003cem\u003e削除に成功したあとも削除できたのか確認する。\u003c/em\u003e\u003c/strong\u003e\u003cbr\u003e\nもしくは\u003ccode\u003e-f\u003c/code\u003eオプションで強制的に削除してしまえばコンテナ起動中でも削除可能。\u003cbr\u003e\n\u003cbr\u003e\u003cstrong\u003e\u003cem\u003eこのようにいちいち確認する癖をつけておけば後で痛い目に合う確率が減ると思いました。\u003c/em\u003e\u003c/strong\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"再度コンテナ作成\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%86%8D%E5%BA%A6%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E4%BD%9C%E6%88%90\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e再度コンテナ作成\u003c/h2\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.gyazo.com%2F88d42501ee7e603343c145b24f7e30b7.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=bcef5e734dbb3bae715587c964483ffc\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.gyazo.com%2F88d42501ee7e603343c145b24f7e30b7.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=bcef5e734dbb3bae715587c964483ffc\" alt=\"image.png\" data-canonical-src=\"https://i.gyazo.com/88d42501ee7e603343c145b24f7e30b7.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.gyazo.com%2F88d42501ee7e603343c145b24f7e30b7.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=be98689c7c86c5208ab7537d1c78eea7 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003eCookieが大きいというエラー。読み取るとおそらくCookieが溜まってるから削除して！！という感じだと思います。\u003cbr\u003e\n早速溜まったCookieを削除し挙動を確認。\u003c/p\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.gyazo.com%2F34d41a3d38669caf2b3d130d6eca0cce.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=4e40b057eb7a38dad2d5591048582d5c\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.gyazo.com%2F34d41a3d38669caf2b3d130d6eca0cce.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=4e40b057eb7a38dad2d5591048582d5c\" alt=\"image.png\" data-canonical-src=\"https://i.gyazo.com/34d41a3d38669caf2b3d130d6eca0cce.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fi.gyazo.com%2F34d41a3d38669caf2b3d130d6eca0cce.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=585232d5acfd341db623ecedca8c756e 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003e\u003cstrong\u003e\u003cem\u003e仮説通りnginxコンテナを実行することができました！！\u003c/em\u003e\u003c/strong\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"まとめ\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%81%BE%E3%81%A8%E3%82%81\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eまとめ\u003c/h2\u003e\n\n\u003cul\u003e\n\u003cli\u003eコンテナは同じ名前のものを作ることができない。\u003c/li\u003e\n\u003cli\u003eコンテナ削除とイメージ削除で少しコマンドが違う(\u003ccode\u003ermi\u003c/code\u003e か　\u003ccode\u003erm\u003c/code\u003e)ので削除に失敗しても落ち着く。\u003c/li\u003e\n\u003cli\u003e\n\u003ccode\u003ermi\u003c/code\u003eの\u003ccode\u003ei\u003c/code\u003eはイメージのことで\u003ccode\u003ei\u003c/code\u003eを\u003ccode\u003eremoving\u003c/code\u003e（取り除く）ということ。\u003c/li\u003e\n\u003cli\u003eコマンドを打ったあと挙動が正しいか確認する癖をつける。\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"参考文献\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e参考文献\u003c/h2\u003e\n\n\u003cp\u003eこの記事は以下の情報を参考にして執筆しました。\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003e\u003ca href=\"https://qiita.com/tifa2chan/items/e9aa408244687a63a0ae\" id=\"reference-2be55bc5b57dea0d0283\"\u003eDockerイメージとコンテナの削除方法\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"http://hokoxjouhou.blog105.fc2.com/blog-entry-1548.html\" rel=\"nofollow noopener\" target=\"_blank\"\u003eChromeに「 400 Bad Request Header Or Cookie Too Large 」が出たときの対処方法\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n",
  "body": "## 概要\nコンテナを立ち上げるときにエラーが起きたので、その対処法とコマンドをまとめておきます。\n\n## エラー文\n\n```terminal:ターミナル\nError response from daemon: Conflict. The container name \"コンテナ名\" is already in use by container \"コンテナID\". You have to remove (or rename) that container to be able to reuse that name.\n```\n\nコンテナがすでにあるので、名前を変更するか削除するかしてください。要するに同じコンテナ名は複数つくれないということですね！！\n\n## 仮説\n- 動作しているコンテナ一覧を見る。\n- 動作を止め、コンテナ削除。\n\n## 必要になるコマンド\n\n| Dockerコマンド | 備考 |\n|:-:|:-:|\n| `docker ps`           |  動作中コンテナ一覧 |\n|  docker ps -a     　  | コンテナ一覧  |\n|  docker stop コンテナID |   動作しているコンテナをストップ |\n| docker rm (-f) コンテナID    | 停止しているコンテナを削除 ※-fオプションを付けると強制削除 |\n\n注意が必要なのが、コンテナをストップしてからでないとコンテナ削除ができないこと。\u003cbr\u003e動作しているコンテナを停止コマンドで停止させたあと、***そのまま削除するのではなく、動作していたコンテナが停止できたのか？を確認をしてから削除***する。また、***削除に成功したあとも削除できたのか確認する。***\nもしくは`-f`オプションで強制的に削除してしまえばコンテナ起動中でも削除可能。\n\u003cbr\u003e***このようにいちいち確認する癖をつけておけば後で痛い目に合う確率が減ると思いました。***\n\n## 再度コンテナ作成\n![image.png](https://i.gyazo.com/88d42501ee7e603343c145b24f7e30b7.png)\n\nCookieが大きいというエラー。読み取るとおそらくCookieが溜まってるから削除して！！という感じだと思います。\n早速溜まったCookieを削除し挙動を確認。\n\n![image.png](https://i.gyazo.com/34d41a3d38669caf2b3d130d6eca0cce.png)\n\n***仮説通りnginxコンテナを実行することができました！！***\n\n## まとめ\n- コンテナは同じ名前のものを作ることができない。\n- コンテナ削除とイメージ削除で少しコマンドが違う(`rmi` か　`rm`)ので削除に失敗しても落ち着く。\n- `rmi`の`i`はイメージのことで`i`を`removing`（取り除く）ということ。\n- コマンドを打ったあと挙動が正しいか確認する癖をつける。\n\n\n## 参考文献\n\nこの記事は以下の情報を参考にして執筆しました。\n\n- [Dockerイメージとコンテナの削除方法](https://qiita.com/tifa2chan/items/e9aa408244687a63a0ae)\n- [Chromeに「 400 Bad Request Header Or Cookie Too Large 」が出たときの対処方法](http://hokoxjouhou.blog105.fc2.com/blog-entry-1548.html)\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:58:29+09:00",
  "group": null,
  "id": "069f4517bd9a0d2ac704",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Docker",
    "versions": []
  }, {
    "name": "container",
    "versions": []
  }],
  "title": "Error response from daemon: conflict: Dockerコンテナを作成しようとしたらコンフリクトが起きたので解決法",
  "updated_at": "2020-11-17T21:59:32+09:00",
  "url": "https://qiita.com/suzu12/items/069f4517bd9a0d2ac704",
  "user": {
    "description": "プログラミング学習中です。主にRailsを中心に学習しております。\r\nエラーが出たときの対処法や思考の整理の場として活用、また活用してもらったら幸いです！\r\n間違いなどあればぜひ、コメントお願いいたします。\r\nよろしくお願いいたします！",
    "facebook_id": "",
    "followees_count": 0,
    "followers_count": 0,
    "github_login_name": "suzu12",
    "id": "suzu12",
    "items_count": 4,
    "linkedin_id": "",
    "location": "",
    "name": "",
    "organization": "",
    "permanent_id": 647973,
    "profile_image_url": "https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/647973/98013b20d6e3671518c2bfb1c82cb742d10c2dcb/x_large.png?1604881442",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003cp\u003eはいどうも！\u003cbr\u003e\n某プログラミングスクールに通い始めた37歳のおっさんです。\u003cbr\u003e\nプログラミングは完全に未経験。\u003cbr\u003e\nそんなおっさんが転職するまでの軌跡（奇跡？）をぼちぼち綴っていこうと思います。\u003c/p\u003e\n\n\u003cp\u003e投稿は今日が初めてですがスクールは今日で9日目。\u003cbr\u003e\nHTML＆CSSをやってRubyに入り、Railsをやって試験を受けて、というところです。\u003cbr\u003e\u003cbr\u003e\u003c/p\u003e\n\n\u003cp\u003e簡単に私の経歴を\u003cbr\u003e\n↪️\u003cbr\u003e\n地方出身、東京の文系私立大学卒、東京で就職し営業職(toC \u0026amp; toB)でマネジメント経験あり。\u003cbr\u003e\nインディーズですが学生時代にやっていたバンドでCDを1枚だけ出しています。\u003cbr\u003e\nキャンプとジム通い、音楽掘りが趣味。\u003cbr\u003e\nジャンルはRock、JazzからEDMまで幅広く聴きます。\u003cbr\u003e\n今はちょっと難しくなってしまいましたが海外旅行もそこそこ行きました。\u003cbr\u003e\n\u003cbr\u003e\u003cbr\u003e\u003cbr\u003e\u003cbr\u003e\nなぜプログラミングを始めたのか、どうして転職を決意したのかなどは後々ゆっくりとupしていこうと思います。\u003cbr\u003e\nとりあえずまだ始めたばかりですが感想としては\u003cbr\u003e\n「めちゃくちゃやることがいっぱいある」\u003cbr\u003e\n「勉強すること、覚えることが今までやってきたことの比じゃないレベルで多い」\u003cbr\u003e\nこの二つですね。\u003cbr\u003e\n日々思ったこと、できなかったこと、疑問点などなど\u003cbr\u003e\n自分が見返した時に\u003cbr\u003e\n「あ〜こんなことあったな」とか、\u003cbr\u003e\n「こんなことで悩んでたんだな」とかとか、\u003cbr\u003e\nあとはこれを読んだ他の方に少しでも役に立てればなと思います。\u003c/p\u003e\n\n\u003cp\u003eそんな具合ですが本日は頭がパンクしているのでこれにて\u003cimg alt=\":wave_tone1:\" class=\"emoji\" height=\"20\" src=\"https://cdn.qiita.com/emoji/twemoji/unicode/1f44b-1f3fb.png\" title=\":wave_tone1:\" width=\"20\" loading=\"lazy\"\u003e\u003c/p\u003e\n",
  "body": "はいどうも！\n某プログラミングスクールに通い始めた37歳のおっさんです。\nプログラミングは完全に未経験。\nそんなおっさんが転職するまでの軌跡（奇跡？）をぼちぼち綴っていこうと思います。\n\n投稿は今日が初めてですがスクールは今日で9日目。\nHTML＆CSSをやってRubyに入り、Railsをやって試験を受けて、というところです。\u003cbr\u003e\u003cbr\u003e\n\n\n\n\n簡単に私の経歴を\n↪️\n地方出身、東京の文系私立大学卒、東京で就職し営業職(toC \u0026 toB)でマネジメント経験あり。\nインディーズですが学生時代にやっていたバンドでCDを1枚だけ出しています。\nキャンプとジム通い、音楽掘りが趣味。\nジャンルはRock、JazzからEDMまで幅広く聴きます。\n今はちょっと難しくなってしまいましたが海外旅行もそこそこ行きました。\n\u003cbr\u003e\u003cbr\u003e\u003cbr\u003e\nなぜプログラミングを始めたのか、どうして転職を決意したのかなどは後々ゆっくりとupしていこうと思います。\nとりあえずまだ始めたばかりですが感想としては\n「めちゃくちゃやることがいっぱいある」\n「勉強すること、覚えることが今までやってきたことの比じゃないレベルで多い」\nこの二つですね。\n日々思ったこと、できなかったこと、疑問点などなど\n自分が見返した時に\n「あ〜こんなことあったな」とか、\n「こんなことで悩んでたんだな」とかとか、\nあとはこれを読んだ他の方に少しでも役に立てればなと思います。\n\nそんな具合ですが本日は頭がパンクしているのでこれにて:wave_tone1:\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:58:10+09:00",
  "group": null,
  "id": "807122fb311031c44c59",
  "likes_count": 1,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Ruby",
    "versions": []
  }, {
    "name": "HTML",
    "versions": []
  }, {
    "name": "CSS",
    "versions": []
  }, {
    "name": "Rails",
    "versions": []
  }],
  "title": "未経験のおっさんがプログラミングを学ぶまで",
  "updated_at": "2020-11-17T21:58:10+09:00",
  "url": "https://qiita.com/bon_hxg/items/807122fb311031c44c59",
  "user": {
    "description": "37歳未経験のおっさんが\r\nエンジニアになるまでの道のり",
    "facebook_id": "",
    "followees_count": 1,
    "followers_count": 1,
    "github_login_name": null,
    "id": "bon_hxg",
    "items_count": 1,
    "linkedin_id": "",
    "location": "",
    "name": "",
    "organization": "",
    "permanent_id": 887559,
    "profile_image_url": "https://lh3.googleusercontent.com/a-/AOh14GjLrzgp7LGDi7ZGQ5soGORBI3fW6rZbV_m49xCF2g=s50",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\n\u003ch2\u003e\n\u003cspan id=\"問題\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%95%8F%E9%A1%8C\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e問題\u003c/h2\u003e\n\n\u003cp\u003eAnaconda で　install したはずの　パッケージが使用できず　下記のようなエラーが発生しました．\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003eModuleNotFoundError: No module named 'selenium'\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e今回はselenium をinstall したはずなのに　上記のようなエラーが出ました．\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"原因\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%8E%9F%E5%9B%A0\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e原因\u003c/h2\u003e\n\n\u003cp\u003eanacondaプロンプトで python プログラム(****.py) を動作するときにpy.exeを使用していた．\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"対策\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%AF%BE%E7%AD%96\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e対策\u003c/h2\u003e\n\n\u003cp\u003e起動するときに　以下のように記述した．\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"前-py-py-エラーが出た\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%89%8D-py-py-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%8C%E5%87%BA%E3%81%9F\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e前: py *********.py (エラーが出た)\u003c/h3\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"後-python-py--動いた\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%BE%8C-python-py--%E5%8B%95%E3%81%84%E3%81%9F\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e後: python *********.py  (動いた)\u003c/h3\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"感想\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%84%9F%E6%83%B3\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e感想\u003c/h2\u003e\n\n\u003cp\u003epyrhon.exe と　py.exe 2種は違うものだと知った(今までは同じだと思っていた)\u003cbr\u003e\n py.exe とはいったい何なのか，新たな疑問が生まれた\u003cbr\u003e\n 解決してみれば非常に単純な問題だが，時間がかかった\u003cbr\u003e\n 単純なミス過ぎて，ネットで検索しても出てこなかった．この記事が誰かの役に立とうれしいです．\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"解決までの道\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E8%A7%A3%E6%B1%BA%E3%81%BE%E3%81%A7%E3%81%AE%E9%81%93\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e解決までの道\u003c/h2\u003e\n\n\u003cp\u003e自分に対するメモです\u003cbr\u003e\n1.問題に気づく\u003cbr\u003e\n2.py と　python パッケージをどこからimportしているか調べる\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003eimport sys,pprint\npprint.pprint(sys.path)\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"結果が違うことに気づく計2時間程度\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E7%B5%90%E6%9E%9C%E3%81%8C%E9%81%95%E3%81%86%E3%81%93%E3%81%A8%E3%81%AB%E6%B0%97%E3%81%A5%E3%81%8F%E8%A8%882%E6%99%82%E9%96%93%E7%A8%8B%E5%BA%A6\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e結果が違うことに気づく!!(計　2時間程度)\u003c/h3\u003e\n\n\u003cp\u003e3.解決 (力尽きて作業進まず)\u003c/p\u003e\n",
  "body": "##問題\nAnaconda で　install したはずの　パッケージが使用できず　下記のようなエラーが発生しました．\n\n```\nModuleNotFoundError: No module named 'selenium'\n```\n今回はselenium をinstall したはずなのに　上記のようなエラーが出ました．\n##原因\n anacondaプロンプトで python プログラム(****.py) を動作するときにpy.exeを使用していた．\n\n##対策\n起動するときに　以下のように記述した．\n\n###前: py *********.py (エラーが出た)\n###後: python *********.py  (動いた)\n\n##感想\n pyrhon.exe と　py.exe 2種は違うものだと知った(今までは同じだと思っていた)\n py.exe とはいったい何なのか，新たな疑問が生まれた\n 解決してみれば非常に単純な問題だが，時間がかかった\n 単純なミス過ぎて，ネットで検索しても出てこなかった．この記事が誰かの役に立とうれしいです．\n\n\n##解決までの道\n自分に対するメモです\n1.問題に気づく\n2.py と　python パッケージをどこからimportしているか調べる\n\n```\nimport sys,pprint\npprint.pprint(sys.path)\n```\n###結果が違うことに気づく!!(計　2時間程度)\n3.解決 (力尽きて作業進まず)\n\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:57:22+09:00",
  "group": null,
  "id": "77454cbcbc989415d784",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Python",
    "versions": []
  }, {
    "name": "Anaconda",
    "versions": []
  }],
  "title": "Anaconda で　conda install したはずの　パッケージが import できない",
  "updated_at": "2020-11-17T22:08:22+09:00",
  "url": "https://qiita.com/tzks1/items/77454cbcbc989415d784",
  "user": {
    "description": "",
    "facebook_id": "",
    "followees_count": 3,
    "followers_count": 0,
    "github_login_name": null,
    "id": "tzks1",
    "items_count": 2,
    "linkedin_id": "",
    "location": "",
    "name": "",
    "organization": "",
    "permanent_id": 550504,
    "profile_image_url": "https://lh6.googleusercontent.com/-NuMrlH6iPR4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reX5To8qg2-9lVJV1wYHpHSPpc64w/s50/photo.jpg",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\n\u003ch2\u003e\n\u003cspan id=\"起こった事\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E8%B5%B7%E3%81%93%E3%81%A3%E3%81%9F%E4%BA%8B\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e起こった事\u003c/h2\u003e\n\n\u003cp\u003e\u003ccode\u003ego run ***.go\u003c/code\u003eでサーバーを立ちあげた後にエディターでgoファイルを編集すると\u003ccode\u003egocode-gomod\u003c/code\u003eがかなりCPUを食いエディターがフリーズ＆PCが落ちてしまう、、、、\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"環境\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E7%92%B0%E5%A2%83\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e環境\u003c/h2\u003e\n\n\u003cul\u003e\n\u003cli\u003ego 1.15.3\u003c/li\u003e\n\u003cli\u003edocker\u003c/li\u003e\n\u003cli\u003eVSCode\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"解決策\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E8%A7%A3%E6%B1%BA%E7%AD%96\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e解決策\u003c/h2\u003e\n\n\u003cp\u003e設定ファイル(\u003ccode\u003esetting.json\u003c/code\u003e)を開き以下のコードを追記すると治るそう\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"json\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003esetting.json\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"w\"\u003e\n  \u003c/span\u003e\u003cspan class=\"nl\"\u003e\"go.useLanguageServer\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"kc\"\u003etrue\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"p\"\u003e}\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"原因\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%8E%9F%E5%9B%A0\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e原因\u003c/h2\u003e\n\n\u003cblockquote\u003e\n\u003cp\u003e\u003ca href=\"https://github.com/golang/vscode-go/issues/249#issuecomment-647902730\" class=\"autolink\" rel=\"nofollow noopener\" target=\"_blank\"\u003ehttps://github.com/golang/vscode-go/issues/249#issuecomment-647902730\u003c/a\u003e\u003c/p\u003e\n\u003c/blockquote\u003e\n\n\u003cp\u003e\u003ccode\u003ego\u003c/code\u003eの候補表示してくれる\u003ccode\u003egocode-gomod\u003c/code\u003eは現在メモリをかなり食ってしまうようになっているらしくメンテナンス中かつ開発がストップしているそう、、\u003cbr\u003e\nなので、変わりに\u003ccode\u003egopls\u003c/code\u003eを使ってくれとの事でした！\u003c/p\u003e\n\n\u003cp\u003eこれでgoでの開発に集中できる^^\u003c/p\u003e\n",
  "body": "## 起こった事\n`go run ***.go`でサーバーを立ちあげた後にエディターでgoファイルを編集すると`gocode-gomod`がかなりCPUを食いエディターがフリーズ＆PCが落ちてしまう、、、、\n\n## 環境\n- go 1.15.3\n- docker\n- VSCode\n\n\n## 解決策\n設定ファイル(`setting.json`)を開き以下のコードを追記すると治るそう\n\n```json:setting.json\n{\n  \"go.useLanguageServer\": true,\n}\n```\n\n\n## 原因\n\u003ehttps://github.com/golang/vscode-go/issues/249#issuecomment-647902730\n\n`go`の候補表示してくれる`gocode-gomod`は現在メモリをかなり食ってしまうようになっているらしくメンテナンス中かつ開発がストップしているそう、、\nなので、変わりに`gopls`を使ってくれとの事でした！\n\nこれでgoでの開発に集中できる^^\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:56:47+09:00",
  "group": null,
  "id": "e64b16ca8ad1b62c6f27",
  "likes_count": 1,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Go",
    "versions": []
  }, {
    "name": "Docker",
    "versions": []
  }, {
    "name": "VSCode",
    "versions": []
  }],
  "title": "goでサーバーを立ちあげたらVSCodeがフリーズ＆PCが落ちる",
  "updated_at": "2020-11-17T22:01:16+09:00",
  "url": "https://qiita.com/uta3chame/items/e64b16ca8ad1b62c6f27",
  "user": {
    "description": "つよつよエンジニアになるまでの成長日記、、、",
    "facebook_id": "",
    "followees_count": 16,
    "followers_count": 5,
    "github_login_name": "chameleon333",
    "id": "uta3chame",
    "items_count": 9,
    "linkedin_id": "",
    "location": "",
    "name": "yusei kaneta",
    "organization": "",
    "permanent_id": 335593,
    "profile_image_url": "https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/335593/profile-images/1582621616",
    "team_only": false,
    "twitter_screen_name": "uta3chame",
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003cp\u003eこの記事では、OCIのマネージドTerraform環境であるリソース・マネージャを使って、MySQL Database Serviceを作成してみたことを紹介します。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"リソースマネージャとは\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%A3%E3%81%A8%E3%81%AF\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eリソース・マネージャとは\u003c/h1\u003e\n\n\u003cp\u003eOracle Cloud Infrastructureリソースをプロビジョニングするプロセスを自動化できるOracle Cloud Infrastructureサービス\u003cbr\u003e\n「infrastructure-as-code」モデルを使用してリソースをインストール、構成、および管理するのに役立つTerraformのマネージド環境\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"リソースマネージャの機能\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%A3%E3%81%AE%E6%A9%9F%E8%83%BD\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eリソース・マネージャの機能\u003c/h2\u003e\n\n\u003cp\u003eリソース・マネージャは以下のような特徴、機能があります（2020/11/15時点）\u003cbr\u003e\n- インフラストラクチャの自動化と標準化、環境のレプリケーションを容易に行う\u003cbr\u003e\n- Terraform エンジンのフルマネージドサービス\u003cbr\u003e\n- 指定したコンパートメントのリソースをTerraform構成ファイルの生成（Resource Discovery）\u003cbr\u003e\n- GitLabで管理されたTerraform構成ファイルからリソース・マネージャスタックの作成（構成ソース・プロバイダ）\u003cbr\u003e\n- スタックの最後に実行された構成と実際(現在)のインフラストラクチャの状態との差分抽出（ドリフト検出）\u003cbr\u003e\n- サンプル構成を使った環境構築\u003cbr\u003e\n- 使用できる Terraform フォーマットは v0.11/v0.12/v0.13\u003c/p\u003e\n\n\u003cp\u003e以下のサンプルは Terraform v0.12 フォーマットで記載しています。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"mysql-database-service-作成サンプル\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#mysql-database-service-%E4%BD%9C%E6%88%90%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eMYSQL Database Service 作成サンプル\u003c/h1\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"使用している変数\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E5%A4%89%E6%95%B0\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e使用している変数\u003c/h2\u003e\n\n\u003cul\u003e\n\u003cli\u003emysql_configuration_id：MYSQL Database ServiceのコンフィグレーションID\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2F9eff2800-1d5b-cb7a-f48f-679c3a3d8717.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=dc9e75ff4a02271a4fb90d30f90d7faa\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2F9eff2800-1d5b-cb7a-f48f-679c3a3d8717.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=dc9e75ff4a02271a4fb90d30f90d7faa\" alt=\"zu05.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/108635/9eff2800-1d5b-cb7a-f48f-679c3a3d8717.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2F9eff2800-1d5b-cb7a-f48f-679c3a3d8717.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=a1cf6dad3a5051f9806bde329334cc14 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\n\u003c/li\u003e\n\u003cli\u003emysql_password    ：管理者ユーザパスワード\u003c/li\u003e\n\u003cli\u003emysql_shape       ：MYSQL Database Serviceで利用するシェイプ\u003c/li\u003e\n\u003cli\u003eprivateSubnet_id  ：サブネットOCID\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"指定している名前\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%8C%87%E5%AE%9A%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E5%90%8D%E5%89%8D\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e指定している名前\u003c/h2\u003e\n\n\u003cul\u003e\n\u003cli\u003eadmin_username    ：管理者ユーザ名（admin）\u003c/li\u003e\n\u003cli\u003ehostname_label/display_name：ホスト名（mysql1）\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"そのほかはデフォルト設定を指定\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%81%9D%E3%81%AE%E3%81%BB%E3%81%8B%E3%81%AF%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88%E8%A8%AD%E5%AE%9A%E3%82%92%E6%8C%87%E5%AE%9A\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eそのほかはデフォルト設定を指定\u003c/h2\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"hcl\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003emysql.tf\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"nx\"\u003eresource\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_mysql_mysql_db_system\u003c/span\u003e \u003cspan class=\"nx\"\u003eexport_MySQL1\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eadmin_password\u003c/span\u003e      \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003emysql_password\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eadmin_username\u003c/span\u003e      \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"admin\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eavailability_domain\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003edata\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eoci_identity_availability_domain\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eTGjA\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"nx\"\u003eAD\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003ename\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ebackup_policy\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003eis_enabled\u003c/span\u003e        \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"true\"\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003eretention_in_days\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"7\"\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003ewindow_start_time\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"00:00\"\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ecompartment_id\u003c/span\u003e          \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003ecompartment_ocid\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003econfiguration_id\u003c/span\u003e        \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003emysql_configuration_id\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003edata_storage_size_in_gb\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"50\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003edisplay_name\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"MySQL1\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003efault_domain\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"FAULT-DOMAIN-1\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ehostname_label\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"mysql1\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003emaintenance\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003ewindow_start_time\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"WEDNESDAY 04:22\"\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003cspan class=\"c1\"\u003e#  mysql_version = \"8.0.22-u2-cloud\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eport\u003c/span\u003e          \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"3306\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eport_x\u003c/span\u003e        \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"33060\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eshape_name\u003c/span\u003e    \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003emysql_shape\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003estate\u003c/span\u003e     \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"ACTIVE\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003esubnet_id\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eprivateSubnet_id\u003c/span\u003e\n\n  \u003cspan class=\"nx\"\u003elifecycle\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003eignore_changes\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"nx\"\u003eadmin_password\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"nx\"\u003eadmin_username\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003cspan class=\"nx\"\u003edata\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_identity_availability_domain\u003c/span\u003e \u003cspan class=\"nx\"\u003eexport_TGjA\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"nx\"\u003eAD\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ecompartment_id\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003ecompartment_ocid\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ead_number\u003c/span\u003e      \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"1\"\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"サンプル環境の作成\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB%E7%92%B0%E5%A2%83%E3%81%AE%E4%BD%9C%E6%88%90\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eサンプル環境の作成\u003c/h1\u003e\n\n\u003cp\u003eMySQL Database Serviceを構築する例として以下の構成を作成\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Ff54467dc-441f-c4d5-8f32-dd19f7709d53.gif?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=ac39590dc19fb36f5deeae343386a4b4\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Ff54467dc-441f-c4d5-8f32-dd19f7709d53.gif?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=ac39590dc19fb36f5deeae343386a4b4\" alt=\"zu01.gif\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/108635/f54467dc-441f-c4d5-8f32-dd19f7709d53.gif\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Ff54467dc-441f-c4d5-8f32-dd19f7709d53.gif?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=d55d86d78613a5df3a2deafa67d3d445 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003cbr\u003e\nコンピュートインスタンスにnginxとphpをインストールし、wordpressモジュールを展開、MySQL Database ServiceにDatabaseとユーザを作成しています。\u003cbr\u003e\nTerraform構成ファイルは\u003ca href=\"https://github.com/kenwatan/terraform_OCIRM_sample_wordpress\" rel=\"nofollow noopener\" target=\"_blank\"\u003egithub\u003c/a\u003eからダウンロード可能です。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"環境構築の実行\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89%E3%81%AE%E5%AE%9F%E8%A1%8C\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e環境構築の実行\u003c/h1\u003e\n\n\u003cp\u003e1.Webコンソールのメニューから「リソース・マネージャ」＞「スタック」を開き「スタックの作成」をクリック\u003cbr\u003e\n2.githubから入手したtfファイルを圧縮したZIPファイルもしくはフォルダを指定してリソース・マネージャスタックを作成\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Ff86ea1f6-9fa7-30dd-df20-d8e221de6e11.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=b632bcf2bde0dca2f86f3c144242a568\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Ff86ea1f6-9fa7-30dd-df20-d8e221de6e11.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=b632bcf2bde0dca2f86f3c144242a568\" alt=\"zu03.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/108635/f86ea1f6-9fa7-30dd-df20-d8e221de6e11.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Ff86ea1f6-9fa7-30dd-df20-d8e221de6e11.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=08e7985e68f1f1997d896ecb2f4aeb81 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003cbr\u003e\n3. 計画ジョブ・適用ジョブを実行\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"サンプルファイルの補足\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E8%A3%9C%E8%B6%B3\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eサンプルファイルの補足\u003c/h1\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"予約済パブリックipの使用\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E4%BA%88%E7%B4%84%E6%B8%88%E3%83%91%E3%83%96%E3%83%AA%E3%83%83%E3%82%AFip%E3%81%AE%E4%BD%BF%E7%94%A8\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e予約済パブリックIPの使用\u003c/h2\u003e\n\n\u003cp\u003eコンピュートインスタンスとロード・バランサには、それぞれ予約済パブリックIPを割り当ててみた\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"予約済パブリックipの生成\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E4%BA%88%E7%B4%84%E6%B8%88%E3%83%91%E3%83%96%E3%83%AA%E3%83%83%E3%82%AFip%E3%81%AE%E7%94%9F%E6%88%90\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e予約済パブリックIPの生成\u003c/h3\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"hcl\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003epublicip.tf\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"nx\"\u003eresource\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_core_public_ip\u003c/span\u003e \u003cspan class=\"nx\"\u003epublicip_lb\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ecompartment_id\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003ecompartment_ocid\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003edisplay_name\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"lb01\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003elifetime\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"RESERVED\"\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"コンピュートインスタンスへの割り当て\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%83%88%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%81%B8%E3%81%AE%E5%89%B2%E3%82%8A%E5%BD%93%E3%81%A6\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eコンピュートインスタンスへの割り当て\u003c/h3\u003e\n\n\u003cp\u003eパブリックIPを割り当てるVNIC、プライベートIPのOCIDを取得し、予約済パブリックIPを割り当てる\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"hcl\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003epublicip_compute.tf\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"nx\"\u003edata\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_identity_availability_domain\u003c/span\u003e \u003cspan class=\"nx\"\u003eAD\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ecompartment_id\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003ecompartment_ocid\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ead_number\u003c/span\u003e      \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"1\"\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003cspan class=\"nx\"\u003edata\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_core_vnic_attachments\u003c/span\u003e \u003cspan class=\"nx\"\u003einstance1_vnics\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eavailability_domain\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003edata\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eoci_identity_availability_domain\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eAD\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003ename\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ecompartment_id\u003c/span\u003e      \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003ecompartment_ocid\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003einstance_id\u003c/span\u003e         \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_core_instance\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eap1\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eid\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\n\u003cspan class=\"nx\"\u003edata\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_core_vnic\u003c/span\u003e \u003cspan class=\"nx\"\u003einstance1_primary_vnic\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003evnic_id\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003edata\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eoci_core_vnic_attachments\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003einstance1_vnics\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003evnic_attachments\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003evnic_id\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\n\u003cspan class=\"nx\"\u003edata\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_core_private_ips\u003c/span\u003e \u003cspan class=\"nx\"\u003einstance1_ip\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003evnic_id\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003edata\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eoci_core_vnic\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003einstance1_primary_vnic\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eid\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003cspan class=\"nx\"\u003eresource\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_core_public_ip\u003c/span\u003e \u003cspan class=\"nx\"\u003epublicip_ap\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ecompartment_id\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003ecompartment_ocid\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003edisplay_name\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"ap01\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003elifetime\u003c/span\u003e      \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"RESERVED\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eprivate_ip_id\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003edata\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eoci_core_private_ips\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003einstance1_ip\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eprivate_ips\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e]\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eid\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"ロードバランサへの割り当て\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%AD%E3%83%BC%E3%83%89%E3%83%90%E3%83%A9%E3%83%B3%E3%82%B5%E3%81%B8%E3%81%AE%E5%89%B2%E3%82%8A%E5%BD%93%E3%81%A6\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eロード・バランサへの割り当て\u003c/h3\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"hcl\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003epublicip_lb.tf\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"nx\"\u003eresource\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_load_balancer_load_balancer\u003c/span\u003e \u003cspan class=\"nx\"\u003eLB1\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ecompartment_id\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003evar\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003ecompartment_ocid\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003edisplay_name\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"LB1\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eip_mode\u003c/span\u003e    \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"IPV4\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eis_private\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"false\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003ereserved_ips\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003eid\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003eoci_core_public_ip\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003epublicip_lb\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eid\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003enetwork_security_group_ids\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003eoci_core_network_security_group\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eexport_Network\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"nx\"\u003eSecurity\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"nx\"\u003eGroup\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"nx\"\u003efor\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"nx\"\u003eAP\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eid\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e]\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003eshape\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"100Mbps\"\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003esubnet_ids\u003c/span\u003e \u003cspan class=\"p\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003eoci_core_subnet\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eexport_PublicSubnet\u003c/span\u003e\u003cspan class=\"err\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eid\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e]\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"適用ジョブログ\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E9%81%A9%E7%94%A8%E3%82%B8%E3%83%A7%E3%83%96%E3%83%AD%E3%82%B0\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e適用ジョブログ\u003c/h2\u003e\n\n\u003cp\u003e適用ジョブのログに、ロードバランサ、APサーバのパブリックIPアドレスとAPサーバへのsshログイン用秘密鍵ファイル内容が出力される\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Fd7d14641-4682-676c-e540-9c9f070456a1.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=4d8af30b901447a62735c6251e4c09e1\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Fd7d14641-4682-676c-e540-9c9f070456a1.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=4d8af30b901447a62735c6251e4c09e1\" alt=\"zu04.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/108635/d7d14641-4682-676c-e540-9c9f070456a1.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Fd7d14641-4682-676c-e540-9c9f070456a1.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=81e8534e4331b942dc7fe5fff1980c84 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"wordpressの初期設定\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#wordpress%E3%81%AE%E5%88%9D%E6%9C%9F%E8%A8%AD%E5%AE%9A\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003ewordpressの初期設定\u003c/h2\u003e\n\n\u003cp\u003eコンピュートインスタンスのパブリックIPアドレスに ブラウザで httpアクセスすることで wordpress 初期画面が表示されることを確認\u003cbr\u003e\nhttp://\u0026lt;コンピュートインスタンスパブリックIPアドレス\u0026gt;/\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Fd5a79762-c0c8-b24e-8fec-dab031258d13.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=26d49dab2500d9d4d9bfd2aee93a588f\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Fd5a79762-c0c8-b24e-8fec-dab031258d13.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=26d49dab2500d9d4d9bfd2aee93a588f\" alt=\"zu02.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/108635/d5a79762-c0c8-b24e-8fec-dab031258d13.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F108635%2Fd5a79762-c0c8-b24e-8fec-dab031258d13.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=cd3f3b1ba7611dff96638d0908eafafe 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"おわりに\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eおわりに\u003c/h1\u003e\n\n\u003cp\u003eOCIの Terraform マネージドサービスのリソース・マネージャを使用して MySQL Database Serviceおよびそれにアクセスするコンピュートインスタンスにwordpress環境をデプロイしてみた。\u003c/p\u003e\n",
  "body": "\nこの記事では、OCIのマネージドTerraform環境であるリソース・マネージャを使って、MySQL Database Serviceを作成してみたことを紹介します。\n\n# リソース・マネージャとは\nOracle Cloud Infrastructureリソースをプロビジョニングするプロセスを自動化できるOracle Cloud Infrastructureサービス\n「infrastructure-as-code」モデルを使用してリソースをインストール、構成、および管理するのに役立つTerraformのマネージド環境\n\n## リソース・マネージャの機能\nリソース・マネージャは以下のような特徴、機能があります（2020/11/15時点）\n- インフラストラクチャの自動化と標準化、環境のレプリケーションを容易に行う\n- Terraform エンジンのフルマネージドサービス\n- 指定したコンパートメントのリソースをTerraform構成ファイルの生成（Resource Discovery）\n- GitLabで管理されたTerraform構成ファイルからリソース・マネージャスタックの作成（構成ソース・プロバイダ）\n- スタックの最後に実行された構成と実際(現在)のインフラストラクチャの状態との差分抽出（ドリフト検出）\n- サンプル構成を使った環境構築\n- 使用できる Terraform フォーマットは v0.11/v0.12/v0.13\n\n以下のサンプルは Terraform v0.12 フォーマットで記載しています。\n\n# MYSQL Database Service 作成サンプル\n## 使用している変数\n- mysql_configuration_id：MYSQL Database ServiceのコンフィグレーションID![zu05.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/108635/9eff2800-1d5b-cb7a-f48f-679c3a3d8717.png)\n- mysql_password\t：管理者ユーザパスワード\n- mysql_shape\t\t：MYSQL Database Serviceで利用するシェイプ\n- privateSubnet_id\t：サブネットOCID\n\n## 指定している名前\n- admin_username\t：管理者ユーザ名（admin）\n- hostname_label/display_name：ホスト名（mysql1）\n\n## そのほかはデフォルト設定を指定\n\n```mysql.tf\nresource oci_mysql_mysql_db_system export_MySQL1 {\n  admin_password      = var.mysql_password\n  admin_username      = \"admin\"\n  availability_domain = data.oci_identity_availability_domain.TGjA-AD-1.name\n  backup_policy {\n    is_enabled        = \"true\"\n    retention_in_days = \"7\"\n    window_start_time = \"00:00\"\n  }\n  compartment_id          = var.compartment_ocid\n  configuration_id        = var.mysql_configuration_id\n  data_storage_size_in_gb = \"50\"\n  display_name = \"MySQL1\"\n  fault_domain = \"FAULT-DOMAIN-1\"\n  hostname_label = \"mysql1\"\n  maintenance {\n    window_start_time = \"WEDNESDAY 04:22\"\n  }\n#  mysql_version = \"8.0.22-u2-cloud\"\n  port          = \"3306\"\n  port_x        = \"33060\"\n  shape_name    = var.mysql_shape\n  state     = \"ACTIVE\"\n  subnet_id = var.privateSubnet_id\n\n  lifecycle {\n    ignore_changes = [admin_password, admin_username]\n  }\n}\ndata oci_identity_availability_domain export_TGjA-AD-1 {\n  compartment_id = var.compartment_ocid\n  ad_number      = \"1\"\n}\n```\n\n# サンプル環境の作成\nMySQL Database Serviceを構築する例として以下の構成を作成\n![zu01.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/108635/f54467dc-441f-c4d5-8f32-dd19f7709d53.gif)\nコンピュートインスタンスにnginxとphpをインストールし、wordpressモジュールを展開、MySQL Database ServiceにDatabaseとユーザを作成しています。\nTerraform構成ファイルは[github](https://github.com/kenwatan/terraform_OCIRM_sample_wordpress)からダウンロード可能です。\n\n\n\n# 環境構築の実行\n\n1.Webコンソールのメニューから「リソース・マネージャ」＞「スタック」を開き「スタックの作成」をクリック\n2.githubから入手したtfファイルを圧縮したZIPファイルもしくはフォルダを指定してリソース・マネージャスタックを作成![zu03.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/108635/f86ea1f6-9fa7-30dd-df20-d8e221de6e11.png)\n3. 計画ジョブ・適用ジョブを実行\n\n# サンプルファイルの補足\n## 予約済パブリックIPの使用\nコンピュートインスタンスとロード・バランサには、それぞれ予約済パブリックIPを割り当ててみた\n\n### 予約済パブリックIPの生成\n\n```publicip.tf\nresource oci_core_public_ip publicip_lb {\n  compartment_id = var.compartment_ocid\n  display_name = \"lb01\"\n  lifetime = \"RESERVED\"\n}\n```\n\n### コンピュートインスタンスへの割り当て\nパブリックIPを割り当てるVNIC、プライベートIPのOCIDを取得し、予約済パブリックIPを割り当てる\n\n```publicip_compute.tf\ndata oci_identity_availability_domain AD-1 {\n  compartment_id = var.compartment_ocid\n  ad_number      = \"1\"\n}\ndata oci_core_vnic_attachments instance1_vnics {\n  availability_domain = data.oci_identity_availability_domain.AD-1.name\n  compartment_id      = var.compartment_ocid\n  instance_id         = oci_core_instance.ap1.id\n}\n\ndata oci_core_vnic instance1_primary_vnic {\n    vnic_id = data.oci_core_vnic_attachments.instance1_vnics.vnic_attachments[0].vnic_id\n}\n\ndata oci_core_private_ips instance1_ip {\n    vnic_id = data.oci_core_vnic.instance1_primary_vnic.id\n}\nresource oci_core_public_ip publicip_ap {\n  compartment_id = var.compartment_ocid\n  display_name = \"ap01\"\n  lifetime      = \"RESERVED\"\n  private_ip_id = data.oci_core_private_ips.instance1_ip.private_ips[0].id\n}\n```\n\n### ロード・バランサへの割り当て\n```publicip_lb.tf\nresource oci_load_balancer_load_balancer LB1 {\n  compartment_id = var.compartment_ocid\n  display_name = \"LB1\"\n  ip_mode    = \"IPV4\"\n  is_private = \"false\"\n  reserved_ips {\n    id = oci_core_public_ip.publicip_lb.id\n  }\n  network_security_group_ids = [\n    oci_core_network_security_group.export_Network-Security-Group-for-AP.id,\n  ]\n  shape = \"100Mbps\"\n  subnet_ids = [\n    oci_core_subnet.export_PublicSubnet.id,\n  ]\n}\n```\n\n## 適用ジョブログ\n適用ジョブのログに、ロードバランサ、APサーバのパブリックIPアドレスとAPサーバへのsshログイン用秘密鍵ファイル内容が出力される\n![zu04.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/108635/d7d14641-4682-676c-e540-9c9f070456a1.png)\n\n\n## wordpressの初期設定\nコンピュートインスタンスのパブリックIPアドレスに ブラウザで httpアクセスすることで wordpress 初期画面が表示されることを確認\nhttp://\u003cコンピュートインスタンスパブリックIPアドレス\u003e/\n![zu02.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/108635/d5a79762-c0c8-b24e-8fec-dab031258d13.png)\n\n\n# おわりに\nOCIの Terraform マネージドサービスのリソース・マネージャを使用して MySQL Database Serviceおよびそれにアクセスするコンピュートインスタンスにwordpress環境をデプロイしてみた。\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:53:27+09:00",
  "group": null,
  "id": "a7dde25954c5f1f5d92b",
  "likes_count": 1,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "MySQL",
    "versions": []
  }, {
    "name": "Terraform",
    "versions": []
  }, {
    "name": "oci",
    "versions": []
  }, {
    "name": "ResourceManager",
    "versions": []
  }],
  "title": "[OCI]リソース・マネージャを使って、MYSQL Database Serviceを作成してみた (2020/11/15)",
  "updated_at": "2020-11-17T22:25:00+09:00",
  "url": "https://qiita.com/kenwatan/items/a7dde25954c5f1f5d92b",
  "user": {
    "description": "Database 好き",
    "facebook_id": "",
    "followees_count": 6,
    "followers_count": 24,
    "github_login_name": null,
    "id": "kenwatan",
    "items_count": 30,
    "linkedin_id": "",
    "location": "",
    "name": "",
    "organization": "日本オラクル株式会社",
    "permanent_id": 108635,
    "profile_image_url": "https://qiita-image-store.s3.amazonaws.com/0/108635/profile-images/1473710616",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003cp\u003e自作PCの自動起動を好きにカスタムできる良い感じのアプリが無いので、自分で製作を考えている。試しにobnizを利用してWebアプリから電源ONを試作。　※今回は電源ONの代わりにLED点灯を試す。\u003cbr\u003e\nちょっと分かり辛いが、電源ONクリックするとLEDが１秒点灯して消える。\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F725039%2F18d24f32-0fcf-eaa8-7ef0-19cf9e4d9d60.gif?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=b78d9a9c2fe8b29ffc7366ab7149bd12\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F725039%2F18d24f32-0fcf-eaa8-7ef0-19cf9e4d9d60.gif?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=b78d9a9c2fe8b29ffc7366ab7149bd12\" width=\"200\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/725039/18d24f32-0fcf-eaa8-7ef0-19cf9e4d9d60.gif\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F725039%2F18d24f32-0fcf-eaa8-7ef0-19cf9e4d9d60.gif?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=b934524162aad4080160b00aaa017c20 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"webアプリ画面\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#web%E3%82%A2%E3%83%97%E3%83%AA%E7%94%BB%E9%9D%A2\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eWebアプリ画面\u003c/h1\u003e\n\n\u003cp\u003e曜日別に起動時間を設定したいので、曜日別時間設定画面を設けた。データベース保存はまだ実装出来ていない。\u003ca href=\"https://codepen.io/pmanrabbit/pen/jOrJOjr\" rel=\"nofollow noopener\" target=\"_blank\"\u003eCodePenはコチラから\u003c/a\u003e\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F725039%2Fbf72e907-8cda-f2b3-841d-37067e08a152.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=2b82f3d3e62fc9176d01488ea31fbaf6\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F725039%2Fbf72e907-8cda-f2b3-841d-37067e08a152.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=2b82f3d3e62fc9176d01488ea31fbaf6\" alt=\"image.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/725039/bf72e907-8cda-f2b3-841d-37067e08a152.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F725039%2Fbf72e907-8cda-f2b3-841d-37067e08a152.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=17c68b0e5e32e05621228fb89976fbba 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"コード\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%82%B3%E3%83%BC%E3%83%89\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eコード\u003c/h1\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"html\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003e.html\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"cp\"\u003e\u0026lt;!DOCTYPE html\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;html\u003c/span\u003e \u003cspan class=\"na\"\u003elang=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"jp\"\u003c/span\u003e \u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;head\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;meta\u003c/span\u003e \u003cspan class=\"na\"\u003echarset=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"UTF-8\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;title\u0026gt;\u003c/span\u003eHPC-accede\u003cspan class=\"nt\"\u003e\u0026lt;/title\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;meta\u003c/span\u003e \u003cspan class=\"na\"\u003ename=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"viewport\"\u003c/span\u003e \u003cspan class=\"na\"\u003econtent=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"width=device-width, initial-scale=1\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;link\u003c/span\u003e \u003cspan class=\"na\"\u003erel=\u003c/span\u003e\u003cspan class=\"s\"\u003e'stylesheet'\u003c/span\u003e \u003cspan class=\"na\"\u003ehref=\u003c/span\u003e\u003cspan class=\"s\"\u003e'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css'\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;/head\u0026gt;\u003c/span\u003e\n\n\u003cspan class=\"nt\"\u003e\u0026lt;body\u0026gt;\u003c/span\u003e\n\u003cspan class=\"c\"\u003e\u0026lt;!-- 全体をVue.js有効にする --\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eid=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"app\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"container text-white bg-dark p-1\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n\n  \u003cspan class=\"c\"\u003e\u0026lt;!-- タイトル --\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"row text-center\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"col-sm-6 mx-auto\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u0026lt;h1\u0026gt;\u003c/span\u003eHPC-accede\u003cspan class=\"nt\"\u003e\u0026lt;/h1\u0026gt;\u0026lt;/div\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"c\"\u003e\u0026lt;!-- 設定 --\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-group my-3 mx-4\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"border-bottom col-sm-12\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u0026lt;h5\u0026gt;\u003c/span\u003eObniz ID\u003cspan class=\"nt\"\u003e\u0026lt;/h5\u0026gt;\u0026lt;/div\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-group form-inline my-3 mx-5\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;input\u003c/span\u003e \u003cspan class=\"na\"\u003ev-model:value=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"ObnizID[0]\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-control\"\u003c/span\u003e \u003cspan class=\"na\"\u003etype=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"text\"\u003c/span\u003e \u003cspan class=\"na\"\u003emaxlength=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"4\"\u003c/span\u003e \u003cspan class=\"na\"\u003estyle=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"width:80px;\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;label\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"control-label mx-2\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e-\u003cspan class=\"nt\"\u003e\u0026lt;/label\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;input\u003c/span\u003e \u003cspan class=\"na\"\u003ev-model:value=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"ObnizID[1]\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-control\"\u003c/span\u003e \u003cspan class=\"na\"\u003etype=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"text\"\u003c/span\u003e \u003cspan class=\"na\"\u003emaxlength=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"4\"\u003c/span\u003e \u003cspan class=\"na\"\u003estyle=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"width:80px;\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e  \n  \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n\n  \u003cspan class=\"c\"\u003e\u0026lt;!-- 即時電源ON --\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-group my-3 mx-4\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"border-bottom col-sm-12\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u0026lt;h5\u0026gt;\u003c/span\u003e即時起動\u003cspan class=\"nt\"\u003e\u0026lt;/h5\u0026gt;\u0026lt;/div\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-group my-3 mx-5\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;button\u003c/span\u003e \u003cspan class=\"na\"\u003ev-on:click=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"PowerON\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"btn btn-success\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e電源ON\u003cspan class=\"nt\"\u003e\u0026lt;/button\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n\n  \u003cspan class=\"c\"\u003e\u0026lt;!-- 曜日指定 --\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-group my-3 mx-4\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"border-bottom col-sm-12\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u0026lt;h5\u0026gt;\u003c/span\u003e曜日別時間設定\u003cspan class=\"nt\"\u003e\u0026lt;/h5\u0026gt;\u0026lt;/div\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n\n  \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-group form-inline col-sm-12\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"c\"\u003e\u0026lt;!-- 日曜 --\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-inline col-sm-4 mb-2\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;label\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"control-label mx-3\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e日曜：\u003cspan class=\"nt\"\u003e\u0026lt;/label\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;input\u003c/span\u003e \u003cspan class=\"na\"\u003ev-model:value=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"WeekTime['Sun']\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-control\"\u003c/span\u003e \u003cspan class=\"na\"\u003etype=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"time\"\u003c/span\u003e \u003cspan class=\"na\"\u003estep=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"1\"\u003c/span\u003e \u003cspan class=\"na\"\u003estyle=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"width:130px;\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"c\"\u003e\u0026lt;!-- 月曜 --\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-inline col-sm-4 mb-2\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;label\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"control-label mx-3\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e月曜：\u003cspan class=\"nt\"\u003e\u0026lt;/label\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;input\u003c/span\u003e \u003cspan class=\"na\"\u003ev-model:value=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"WeekTime['Mon']\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-control\"\u003c/span\u003e \u003cspan class=\"na\"\u003etype=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"time\"\u003c/span\u003e \u003cspan class=\"na\"\u003estep=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"1\"\u003c/span\u003e \u003cspan class=\"na\"\u003estyle=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"width:130px;\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"c\"\u003e\u0026lt;!-- 火曜 --\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-inline col-sm-4 mb-2\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;label\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"control-label mx-3\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e火曜：\u003cspan class=\"nt\"\u003e\u0026lt;/label\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;input\u003c/span\u003e \u003cspan class=\"na\"\u003ev-model:value=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"WeekTime['Tue']\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-control\"\u003c/span\u003e \u003cspan class=\"na\"\u003etype=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"time\"\u003c/span\u003e \u003cspan class=\"na\"\u003estep=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"1\"\u003c/span\u003e \u003cspan class=\"na\"\u003estyle=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"width:130px;\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"c\"\u003e\u0026lt;!-- 水曜 --\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-inline col-sm-4 mb-2\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;label\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"control-label mx-3\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e水曜：\u003cspan class=\"nt\"\u003e\u0026lt;/label\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;input\u003c/span\u003e \u003cspan class=\"na\"\u003ev-model:value=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"WeekTime['Wed']\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-control\"\u003c/span\u003e \u003cspan class=\"na\"\u003etype=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"time\"\u003c/span\u003e \u003cspan class=\"na\"\u003estep=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"1\"\u003c/span\u003e \u003cspan class=\"na\"\u003estyle=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"width:130px;\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"c\"\u003e\u0026lt;!-- 木曜 --\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-inline col-sm-4 mb-2\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;label\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"control-label mx-3\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e木曜：\u003cspan class=\"nt\"\u003e\u0026lt;/label\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;input\u003c/span\u003e \u003cspan class=\"na\"\u003ev-model:value=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"WeekTime['Thu']\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-control\"\u003c/span\u003e \u003cspan class=\"na\"\u003etype=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"time\"\u003c/span\u003e \u003cspan class=\"na\"\u003estep=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"1\"\u003c/span\u003e \u003cspan class=\"na\"\u003estyle=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"width:130px;\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"c\"\u003e\u0026lt;!-- 金曜 --\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-inline col-sm-4 mb-2\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;label\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"control-label mx-3\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e金曜：\u003cspan class=\"nt\"\u003e\u0026lt;/label\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;input\u003c/span\u003e \u003cspan class=\"na\"\u003ev-model:value=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"WeekTime['Fri']\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-control\"\u003c/span\u003e \u003cspan class=\"na\"\u003etype=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"time\"\u003c/span\u003e \u003cspan class=\"na\"\u003estep=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"1\"\u003c/span\u003e \u003cspan class=\"na\"\u003estyle=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"width:130px;\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"c\"\u003e\u0026lt;!-- 土曜 --\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;div\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-inline col-sm-4 mb-2\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;label\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"control-label mx-3\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e土曜：\u003cspan class=\"nt\"\u003e\u0026lt;/label\u0026gt;\u003c/span\u003e\n      \u003cspan class=\"nt\"\u003e\u0026lt;input\u003c/span\u003e \u003cspan class=\"na\"\u003ev-model:value=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"WeekTime['Sat']\"\u003c/span\u003e \u003cspan class=\"na\"\u003eclass=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"form-control\"\u003c/span\u003e \u003cspan class=\"na\"\u003etype=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"time\"\u003c/span\u003e \u003cspan class=\"na\"\u003estep=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"1\"\u003c/span\u003e \u003cspan class=\"na\"\u003estyle=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"width:130px;\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n    \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n  \u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;/div\u0026gt;\u003c/span\u003e\n\n\u003cspan class=\"c\"\u003e\u0026lt;!-- CDN --\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;script \u003c/span\u003e\u003cspan class=\"na\"\u003esrc=\u003c/span\u003e\u003cspan class=\"s\"\u003e'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js'\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u0026lt;/script\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;script \u003c/span\u003e\u003cspan class=\"na\"\u003esrc=\u003c/span\u003e\u003cspan class=\"s\"\u003e'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u0026lt;/script\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;script \u003c/span\u003e\u003cspan class=\"na\"\u003esrc=\u003c/span\u003e\u003cspan class=\"s\"\u003e'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/js/bootstrap.min.js'\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u0026lt;/script\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;script \u003c/span\u003e\u003cspan class=\"na\"\u003esrc=\u003c/span\u003e\u003cspan class=\"s\"\u003e'https://unpkg.com/obniz@3.9.0/obniz.js'\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;/script\u0026gt;\u0026lt;script  \u003c/span\u003e\u003cspan class=\"na\"\u003esrc=\u003c/span\u003e\u003cspan class=\"s\"\u003e\"./script.js\"\u003c/span\u003e\u003cspan class=\"nt\"\u003e\u0026gt;\u0026lt;/script\u0026gt;\u003c/span\u003e\n\n\u003cspan class=\"nt\"\u003e\u0026lt;/body\u0026gt;\u003c/span\u003e\n\u003cspan class=\"nt\"\u003e\u0026lt;/html\u0026gt;\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"javascript\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003escript.js\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"c1\"\u003e// 任意の秒数待つことができる関数\u003c/span\u003e\n\u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"nx\"\u003esleep\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003emsec\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u0026gt;\u003c/span\u003e \u003cspan class=\"k\"\u003enew\u003c/span\u003e \u003cspan class=\"nb\"\u003ePromise\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003eres\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u0026gt;\u003c/span\u003e \u003cspan class=\"nx\"\u003esetTimeout\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003eres\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"nx\"\u003emsec\u003c/span\u003e\u003cspan class=\"p\"\u003e));\u003c/span\u003e\n\u003cspan class=\"c1\"\u003e// Obniz関数\u003c/span\u003e\n\u003cspan class=\"kd\"\u003elet\u003c/span\u003e \u003cspan class=\"nx\"\u003eobniz\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n\n\u003cspan class=\"c1\"\u003e// Obniz呼び出し関数\u003c/span\u003e\n\u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"nx\"\u003econnect\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"kd\"\u003efunction\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003efunc\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"nx\"\u003eob\u003c/span\u003e\u003cspan class=\"p\"\u003e){\u003c/span\u003e\n  \u003cspan class=\"nx\"\u003econsole\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003elog\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003eob\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003econnectionState\u003c/span\u003e\u003cspan class=\"p\"\u003e);\u003c/span\u003e\n  \u003cspan class=\"c1\"\u003e// Obnizへの接続を確認\u003c/span\u003e\n  \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003eob\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003econnectionState\u003c/span\u003e \u003cspan class=\"o\"\u003e===\u003c/span\u003e \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003econnected\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003efunc\u003c/span\u003e\u003cspan class=\"p\"\u003e();\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e}\u003c/span\u003e \u003cspan class=\"k\"\u003eelse\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"nx\"\u003eob\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eon\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003econnect\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"p\"\u003e()\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u0026gt;\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n      \u003cspan class=\"nx\"\u003efunc\u003c/span\u003e\u003cspan class=\"p\"\u003e();\u003c/span\u003e\n    \u003cspan class=\"p\"\u003e})\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\n\u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"nx\"\u003eapp\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"k\"\u003enew\u003c/span\u003e \u003cspan class=\"nx\"\u003eVue\u003c/span\u003e\u003cspan class=\"p\"\u003e({\u003c/span\u003e\n  \u003cspan class=\"na\"\u003eel\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003e#app\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"c1\"\u003e// Vueが管理する一番外側のDOM要素\u003c/span\u003e\n  \u003cspan class=\"na\"\u003edata\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"c1\"\u003e// Vue内部で利用する変数定義\u003c/span\u003e\n    \u003cspan class=\"na\"\u003eObnizID\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003e0000\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003e0000\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e],\u003c/span\u003e\n    \u003cspan class=\"na\"\u003eWeekTime\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\n      \u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003eSun\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003e00:00:00\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e},\u003c/span\u003e\n      \u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003eMon\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003e00:00:00\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e},\u003c/span\u003e\n      \u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003eTue\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003e00:00:00\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e},\u003c/span\u003e\n      \u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003eWed\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003e00:00:00\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e},\u003c/span\u003e\n      \u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003eThu\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003e00:00:00\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e},\u003c/span\u003e\n      \u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003eFri\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003e00:00:00\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e},\u003c/span\u003e\n      \u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003eSat\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003e00:00:00\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e},\u003c/span\u003e\n    \u003cspan class=\"p\"\u003e],\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e},\u003c/span\u003e\n\n  \u003cspan class=\"na\"\u003emethods\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"c1\"\u003e// 関数はココに記述\u003c/span\u003e\n    \u003cspan class=\"na\"\u003ePowerON\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"kd\"\u003efunction\u003c/span\u003e\u003cspan class=\"p\"\u003e()\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n      \u003cspan class=\"c1\"\u003e// LED ON\u003c/span\u003e\n      \u003cspan class=\"c1\"\u003e// Obniz ID 指定\u003c/span\u003e\n      \u003cspan class=\"kd\"\u003elet\u003c/span\u003e \u003cspan class=\"nx\"\u003eobnizid\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e`\u003c/span\u003e\u003cspan class=\"p\"\u003e${\u003c/span\u003e\u003cspan class=\"k\"\u003ethis\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eObnizID\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e]}\u003c/span\u003e\u003cspan class=\"err\"\u003e-\u003c/span\u003e\u003cspan class=\"p\"\u003e${\u003c/span\u003e\u003cspan class=\"k\"\u003ethis\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eObnizID\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"mi\"\u003e1\u003c/span\u003e\u003cspan class=\"p\"\u003e]}\u003c/span\u003e\u003cspan class=\"s2\"\u003e`\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n      \u003cspan class=\"nx\"\u003econsole\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003elog\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003eobnizid\u003c/span\u003e\u003cspan class=\"p\"\u003e);\u003c/span\u003e\n      \u003cspan class=\"k\"\u003ethis\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eobniz\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"k\"\u003enew\u003c/span\u003e \u003cspan class=\"nx\"\u003eObniz\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003eobnizid\u003c/span\u003e\u003cspan class=\"p\"\u003e);\u003c/span\u003e\n\n      \u003cspan class=\"kd\"\u003elet\u003c/span\u003e \u003cspan class=\"nx\"\u003eme\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"k\"\u003ethis\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e \u003cspan class=\"c1\"\u003e// thisを関数内で使えないので変数に代入\u003c/span\u003e\n      \u003cspan class=\"c1\"\u003e// connect関数を呼んで、connect関数内で以下のFunctionを実行\u003c/span\u003e\n      \u003cspan class=\"nx\"\u003econnect\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"k\"\u003easync\u003c/span\u003e \u003cspan class=\"kd\"\u003efunction\u003c/span\u003e\u003cspan class=\"p\"\u003e()\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n        \u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"nx\"\u003eled\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003eme\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eobniz\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003ewired\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003eLED\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e \u003cspan class=\"na\"\u003eanode\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"mi\"\u003e0\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"na\"\u003ecathode\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"mi\"\u003e1\u003c/span\u003e \u003cspan class=\"p\"\u003e});\u003c/span\u003e\n        \u003cspan class=\"nx\"\u003eme\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eobniz\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003edisplay\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eclear\u003c/span\u003e\u003cspan class=\"p\"\u003e();\u003c/span\u003e\n        \u003cspan class=\"nx\"\u003eme\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eobniz\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003edisplay\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eprint\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"s1\"\u003eON\u003c/span\u003e\u003cspan class=\"dl\"\u003e'\u003c/span\u003e\u003cspan class=\"p\"\u003e);\u003c/span\u003e\n        \u003cspan class=\"nx\"\u003eled\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eon\u003c/span\u003e\u003cspan class=\"p\"\u003e();\u003c/span\u003e \u003cspan class=\"k\"\u003eawait\u003c/span\u003e \u003cspan class=\"nx\"\u003esleep\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"mi\"\u003e1000\u003c/span\u003e\u003cspan class=\"p\"\u003e);\u003c/span\u003e \u003cspan class=\"nx\"\u003eled\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eoff\u003c/span\u003e\u003cspan class=\"p\"\u003e();\u003c/span\u003e   \u003cspan class=\"c1\"\u003e// LED点灯 1s\u003c/span\u003e\n        \u003cspan class=\"nx\"\u003eme\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eobniz\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003edisplay\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eclear\u003c/span\u003e\u003cspan class=\"p\"\u003e();\u003c/span\u003e\n      \u003cspan class=\"p\"\u003e},\u003c/span\u003e \u003cspan class=\"k\"\u003ethis\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eobniz\u003c/span\u003e\u003cspan class=\"p\"\u003e);\u003c/span\u003e\n    \u003cspan class=\"p\"\u003e},\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e},\u003c/span\u003e\n\u003cspan class=\"p\"\u003e});\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"弟に使い勝手とかを聞いてみた\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%BC%9F%E3%81%AB%E4%BD%BF%E3%81%84%E5%8B%9D%E6%89%8B%E3%81%A8%E3%81%8B%E3%82%92%E8%81%9E%E3%81%84%E3%81%A6%E3%81%BF%E3%81%9F\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e弟に使い勝手とかを聞いてみた\u003c/h1\u003e\n\n\u003cp\u003e今回はLED点灯だが、完成後はPCが起動するようになるイメージを持ってもらったうえで使ってもらった。\u003c/p\u003e\n\n\u003ch4\u003e\n\u003cspan id=\"操作面\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%93%8D%E4%BD%9C%E9%9D%A2\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e操作面\u003c/h4\u003e\n\n\u003cul\u003e\n\u003cli\u003e初回実行時のLED点灯の動作がちょっとおかしい。　※コーディングミスってるかも。\u003c/li\u003e\n\u003cli\u003e初期設定（ObnizID）は別メニューの方が良いと思う。\u003c/li\u003e\n\u003cli\u003e電源ON を押したらすぐ起動しちゃうの？間違えて起動とか考慮したら？\u003c/li\u003e\n\u003cli\u003e毎日を同じ時間にしたい場合、一つずつ設定するのは面倒では？\u003c/li\u003e\n\u003cli\u003e電源OFF は出来ないんだよね？（聞いてみただけみたい。）\u003c/li\u003e\n\u003cli\u003eこの日だけ臨時で時間設定とか出来たら良いのでは？\u003c/li\u003e\n\u003cli\u003eプリセット登録（パターンを予め設定できる）とかどう？\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch4\u003e\n\u003cspan id=\"企画面\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E4%BC%81%E7%94%BB%E9%9D%A2\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e企画面\u003c/h4\u003e\n\n\u003cul\u003e\n\u003cli\u003e自作PCじゃないから使わないな。（自作PCでしか出来ない？）\u003c/li\u003e\n\u003cli\u003e同じ仕組みで遠隔起動出来ると良いかもしれないけど、思いつかないね。（私も思いつかない。）\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"なぜ自動起動したいか補足\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%81%AA%E3%81%9C%E8%87%AA%E5%8B%95%E8%B5%B7%E5%8B%95%E3%81%97%E3%81%9F%E3%81%84%E3%81%8B%E8%A3%9C%E8%B6%B3\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eなぜ自動起動したいか（補足）\u003c/h1\u003e\n\n\u003cp\u003ePCでTV録画しているからって理由。毎日同じ時間で起動はBIOSで設定できるけど、もう少し起動時間をフレキシブルに変更したいっていう私のわがまま。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"想定イメージ\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%83%B3%E5%AE%9A%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e想定イメージ\u003c/h1\u003e\n\n\u003cp\u003e今回はWebアプリとObnizの連携部分のみの実装。\u003cstrong\u003eLED部分をリレーと置き換え、自作PCのPowerSWと置き換えてショートさせれば電源ON出来る想定。（たぶん。）\u003c/strong\u003e\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F725039%2Fb52cdc08-5878-4805-1737-80a5f82f9a40.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=6e3783c39159114381608cdd1a488aaf\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F725039%2Fb52cdc08-5878-4805-1737-80a5f82f9a40.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=6e3783c39159114381608cdd1a488aaf\" width=\"450\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/725039/b52cdc08-5878-4805-1737-80a5f82f9a40.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F725039%2Fb52cdc08-5878-4805-1737-80a5f82f9a40.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=13714baf7628c9e3443a11330a6e3496 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n",
  "body": "自作PCの自動起動を好きにカスタムできる良い感じのアプリが無いので、自分で製作を考えている。試しにobnizを利用してWebアプリから電源ONを試作。　※今回は電源ONの代わりにLED点灯を試す。\nちょっと分かり辛いが、電源ONクリックするとLEDが１秒点灯して消える。\n\u003cimg src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/725039/18d24f32-0fcf-eaa8-7ef0-19cf9e4d9d60.gif\" width=\"200\"\u003e\n\n#Webアプリ画面\n曜日別に起動時間を設定したいので、曜日別時間設定画面を設けた。データベース保存はまだ実装出来ていない。[CodePenはコチラから](https://codepen.io/pmanrabbit/pen/jOrJOjr)\n![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/725039/bf72e907-8cda-f2b3-841d-37067e08a152.png)\n\n#コード\n```html:.html\n\u003c!DOCTYPE html\u003e\n\u003chtml lang=\"jp\" \u003e\n\u003chead\u003e\n  \u003cmeta charset=\"UTF-8\"\u003e\n  \u003ctitle\u003eHPC-accede\u003c/title\u003e\n  \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003e\n    \u003clink rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css'\u003e\n\u003c/head\u003e\n\n\u003cbody\u003e\n\u003c!-- 全体をVue.js有効にする --\u003e\n\u003cdiv id=\"app\" class=\"container text-white bg-dark p-1\"\u003e\n\n  \u003c!-- タイトル --\u003e\n  \u003cdiv class=\"row text-center\"\u003e\n    \u003cdiv class=\"col-sm-6 mx-auto\"\u003e\u003ch1\u003eHPC-accede\u003c/h1\u003e\u003c/div\u003e\n  \u003c/div\u003e\n  \u003c!-- 設定 --\u003e\n  \u003cdiv class=\"form-group my-3 mx-4\"\u003e\n    \u003cdiv class=\"border-bottom col-sm-12\"\u003e\u003ch5\u003eObniz ID\u003c/h5\u003e\u003c/div\u003e\n  \u003c/div\u003e\n  \u003cdiv class=\"form-group form-inline my-3 mx-5\"\u003e\n    \u003cinput v-model:value=\"ObnizID[0]\" class=\"form-control\" type=\"text\" maxlength=\"4\" style=\"width:80px;\"\u003e\n    \u003clabel class=\"control-label mx-2\"\u003e-\u003c/label\u003e\n    \u003cinput v-model:value=\"ObnizID[1]\" class=\"form-control\" type=\"text\" maxlength=\"4\" style=\"width:80px;\"\u003e  \n  \u003c/div\u003e\n\n  \u003c!-- 即時電源ON --\u003e\n  \u003cdiv class=\"form-group my-3 mx-4\"\u003e\n    \u003cdiv class=\"border-bottom col-sm-12\"\u003e\u003ch5\u003e即時起動\u003c/h5\u003e\u003c/div\u003e\n  \u003c/div\u003e\n  \u003cdiv class=\"form-group my-3 mx-5\"\u003e\n    \u003cbutton v-on:click=\"PowerON\" class=\"btn btn-success\"\u003e電源ON\u003c/button\u003e\n  \u003c/div\u003e\n\n  \u003c!-- 曜日指定 --\u003e\n  \u003cdiv class=\"form-group my-3 mx-4\"\u003e\n    \u003cdiv class=\"border-bottom col-sm-12\"\u003e\u003ch5\u003e曜日別時間設定\u003c/h5\u003e\u003c/div\u003e\n  \u003c/div\u003e\n\n  \u003cdiv class=\"form-group form-inline col-sm-12\"\u003e\n    \u003c!-- 日曜 --\u003e\n    \u003cdiv class=\"form-inline col-sm-4 mb-2\"\u003e\n      \u003clabel class=\"control-label mx-3\"\u003e日曜：\u003c/label\u003e\n      \u003cinput v-model:value=\"WeekTime['Sun']\" class=\"form-control\" type=\"time\" step=\"1\" style=\"width:130px;\"\u003e\n    \u003c/div\u003e\n    \u003c!-- 月曜 --\u003e\n    \u003cdiv class=\"form-inline col-sm-4 mb-2\"\u003e\n      \u003clabel class=\"control-label mx-3\"\u003e月曜：\u003c/label\u003e\n      \u003cinput v-model:value=\"WeekTime['Mon']\" class=\"form-control\" type=\"time\" step=\"1\" style=\"width:130px;\"\u003e\n    \u003c/div\u003e\n    \u003c!-- 火曜 --\u003e\n    \u003cdiv class=\"form-inline col-sm-4 mb-2\"\u003e\n      \u003clabel class=\"control-label mx-3\"\u003e火曜：\u003c/label\u003e\n      \u003cinput v-model:value=\"WeekTime['Tue']\" class=\"form-control\" type=\"time\" step=\"1\" style=\"width:130px;\"\u003e\n    \u003c/div\u003e\n    \u003c!-- 水曜 --\u003e\n    \u003cdiv class=\"form-inline col-sm-4 mb-2\"\u003e\n      \u003clabel class=\"control-label mx-3\"\u003e水曜：\u003c/label\u003e\n      \u003cinput v-model:value=\"WeekTime['Wed']\" class=\"form-control\" type=\"time\" step=\"1\" style=\"width:130px;\"\u003e\n    \u003c/div\u003e\n    \u003c!-- 木曜 --\u003e\n    \u003cdiv class=\"form-inline col-sm-4 mb-2\"\u003e\n      \u003clabel class=\"control-label mx-3\"\u003e木曜：\u003c/label\u003e\n      \u003cinput v-model:value=\"WeekTime['Thu']\" class=\"form-control\" type=\"time\" step=\"1\" style=\"width:130px;\"\u003e\n    \u003c/div\u003e\n    \u003c!-- 金曜 --\u003e\n    \u003cdiv class=\"form-inline col-sm-4 mb-2\"\u003e\n      \u003clabel class=\"control-label mx-3\"\u003e金曜：\u003c/label\u003e\n      \u003cinput v-model:value=\"WeekTime['Fri']\" class=\"form-control\" type=\"time\" step=\"1\" style=\"width:130px;\"\u003e\n    \u003c/div\u003e\n    \u003c!-- 土曜 --\u003e\n    \u003cdiv class=\"form-inline col-sm-4 mb-2\"\u003e\n      \u003clabel class=\"control-label mx-3\"\u003e土曜：\u003c/label\u003e\n      \u003cinput v-model:value=\"WeekTime['Sat']\" class=\"form-control\" type=\"time\" step=\"1\" style=\"width:130px;\"\u003e\n    \u003c/div\u003e\n  \u003c/div\u003e\n\u003c/div\u003e\n\n\u003c!-- CDN --\u003e\n\u003cscript src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js'\u003e\u003c/script\u003e\n\u003cscript src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'\u003e\u003c/script\u003e\n\u003cscript src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/js/bootstrap.min.js'\u003e\u003c/script\u003e\n\u003cscript src='https://unpkg.com/obniz@3.9.0/obniz.js'\u003e\n\u003c/script\u003e\u003cscript  src=\"./script.js\"\u003e\u003c/script\u003e\n\n\u003c/body\u003e\n\u003c/html\u003e\n```\n\n```javascript:script.js\n// 任意の秒数待つことができる関数\nconst sleep = (msec) =\u003e new Promise(res =\u003e setTimeout(res, msec));\n// Obniz関数\nlet obniz;\n\n// Obniz呼び出し関数\nconst connect = function(func, ob){\n  console.log(ob.connectionState);\n  // Obnizへの接続を確認\n  if (ob.connectionState === \"connected\") {\n    func();\n  } else {\n    ob.on('connect', () =\u003e {\n      func();\n    })\n  }\n}\n\nconst app = new Vue({\n  el: '#app', // Vueが管理する一番外側のDOM要素\n  data: {\n    // Vue内部で利用する変数定義\n    ObnizID: ['0000', '0000'],\n    WeekTime: [\n      {'Sun':'00:00:00'},\n      {'Mon':'00:00:00'},\n      {'Tue':'00:00:00'},\n      {'Wed':'00:00:00'},\n      {'Thu':'00:00:00'},\n      {'Fri':'00:00:00'},\n      {'Sat':'00:00:00'},\n    ],\n  },\n\n  methods: {\n    // 関数はココに記述\n    PowerON: function() {\n      // LED ON\n      // Obniz ID 指定\n      let obnizid = `${this.ObnizID[0]}-${this.ObnizID[1]}`;\n      console.log(obnizid);\n      this.obniz = new Obniz(obnizid);\n\n      let me = this; // thisを関数内で使えないので変数に代入\n      // connect関数を呼んで、connect関数内で以下のFunctionを実行\n      connect(async function() {\n        const led = me.obniz.wired('LED', { anode: 0, cathode: 1 });\n        me.obniz.display.clear();\n        me.obniz.display.print('ON');\n        led.on(); await sleep(1000); led.off();   // LED点灯 1s\n        me.obniz.display.clear();\n      }, this.obniz);\n    },\n  },\n});\n```\n\n#弟に使い勝手とかを聞いてみた\n今回はLED点灯だが、完成後はPCが起動するようになるイメージを持ってもらったうえで使ってもらった。\n\n####操作面\n* 初回実行時のLED点灯の動作がちょっとおかしい。　※コーディングミスってるかも。\n* 初期設定（ObnizID）は別メニューの方が良いと思う。\n* 電源ON を押したらすぐ起動しちゃうの？間違えて起動とか考慮したら？\n* 毎日を同じ時間にしたい場合、一つずつ設定するのは面倒では？\n* 電源OFF は出来ないんだよね？（聞いてみただけみたい。）\n* この日だけ臨時で時間設定とか出来たら良いのでは？\n* プリセット登録（パターンを予め設定できる）とかどう？\n\n####企画面\n* 自作PCじゃないから使わないな。（自作PCでしか出来ない？）\n* 同じ仕組みで遠隔起動出来ると良いかもしれないけど、思いつかないね。（私も思いつかない。）\n\n#なぜ自動起動したいか（補足）\nPCでTV録画しているからって理由。毎日同じ時間で起動はBIOSで設定できるけど、もう少し起動時間をフレキシブルに変更したいっていう私のわがまま。\n\n#想定イメージ\n今回はWebアプリとObnizの連携部分のみの実装。**LED部分をリレーと置き換え、自作PCのPowerSWと置き換えてショートさせれば電源ON出来る想定。（たぶん。）**\n\u003cimg src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/725039/b52cdc08-5878-4805-1737-80a5f82f9a40.png\" width=\"450\"\u003e\n\n\n\n\n\n\n\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:53:02+09:00",
  "group": null,
  "id": "dc265392961b2182b9b0",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "HTML",
    "versions": []
  }, {
    "name": "JavaScript",
    "versions": []
  }, {
    "name": "Vue.js",
    "versions": []
  }, {
    "name": "obniz",
    "versions": []
  }],
  "title": "自作PC特化だけど、リモート起動や自動起動を好きにカスタムできるWebアプリをobnizで試作してみた",
  "updated_at": "2020-11-17T21:53:52+09:00",
  "url": "https://qiita.com/PmanRabbit/items/dc265392961b2182b9b0",
  "user": {
    "description": "",
    "facebook_id": "",
    "followees_count": 8,
    "followers_count": 9,
    "github_login_name": null,
    "id": "PmanRabbit",
    "items_count": 16,
    "linkedin_id": "",
    "location": "",
    "name": "Jun Is",
    "organization": "",
    "permanent_id": 725039,
    "profile_image_url": "https://lh4.googleusercontent.com/-HiRgT9BwGhs/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn6fEww7AM-iQ47zqz2c1L2l8N65A/s50/photo.jpg",
    "team_only": false,
    "twitter_screen_name": "PmanRabbit",
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\n\u003ch1\u003e\n\u003cspan id=\"はじめに\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eはじめに\u003c/h1\u003e\n\n\u003cp\u003e今回はDeviseを使ってログイン機能を作成していきます。\u003cbr\u003e\nまたDeviseの日本語化やBootstrap4の適用までを行っていきます。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"準備\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%BA%96%E5%82%99\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e準備\u003c/h1\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e$ rails new devise-sample \n$ rails g controller homes index\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"ruby\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003econfig/routes.rb\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"no\"\u003eRails\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003eapplication\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003eroutes\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003edraw\u003c/span\u003e \u003cspan class=\"k\"\u003edo\u003c/span\u003e\n  \u003cspan class=\"n\"\u003eroot\u003c/span\u003e \u003cspan class=\"s1\"\u003e'homes#index'\u003c/span\u003e\n\u003cspan class=\"k\"\u003eend\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"ナビバーを追加しレスポンシブ対応のためのmetaタグを追加\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%8A%E3%83%93%E3%83%90%E3%83%BC%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%97%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B7%E3%83%96%E5%AF%BE%E5%BF%9C%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AEmeta%E3%82%BF%E3%82%B0%E3%82%92%E8%BF%BD%E5%8A%A0\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eナビバーを追加し，レスポンシブ対応のためのmetaタグを追加\u003c/h2\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"html+erb\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eapp/views/layouts/application.html.erb\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e (略)\n     \u0026lt;%= csrf_meta_tags %\u0026gt;\n     \u0026lt;%= csp_meta_tag %\u0026gt;\n     \u0026lt;meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"\u0026gt;　　//追加\n (略)\n  \u0026lt;body\u0026gt;\n     \u0026lt;%= render 'shared/header' %\u0026gt;     //追加\n     \u0026lt;%= yield %\u0026gt;\n   \u0026lt;/body\u0026gt;\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"html+erb\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eapp/views/homes/index.html.erb\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u0026lt;%= render 'shared/flash_messages' %\u0026gt;\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"新しくsharedフォルダと各renderファイルを作成\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%96%B0%E3%81%97%E3%81%8Fshared%E3%83%95%E3%82%A9%E3%83%AB%E3%83%80%E3%81%A8%E5%90%84render%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E4%BD%9C%E6%88%90\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e新しくsharedフォルダと各renderファイルを作成\u003c/h3\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"html+erb\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eapp/views/shared/flash_messages.html.erb\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u0026lt;% flash.each do |msg_type, msg| %\u0026gt;\n  \u0026lt;div class=\"alert alert-\u0026lt;%= msg_type %\u0026gt;\" role=\"alert\" id=\"alert\"\u0026gt;\n    \u0026lt;a href=\"#\" class=\"close\" data-dismiss=\"alert\"\u0026gt;×\u0026lt;/a\u0026gt;\n    \u0026lt;%= msg %\u0026gt;\n  \u0026lt;/div\u0026gt;\n\u0026lt;% end %\u0026gt;\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"html+erb\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eapp/views/shared/_header.html.erb\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u0026lt;header\u0026gt;\n  \u0026lt;nav class=\"navbar navbar-expand navbar-light\"\u0026gt;\n    \u0026lt;%= link_to \"Deviseサンプル\", root_path, class: 'navbar-brand' %\u0026gt;\n    \u0026lt;div id=\"Navber\"\u0026gt;\n      \u0026lt;ul class=\"navbar-nav\"\u0026gt;\n        \u0026lt;% if user_signed_in? %\u0026gt;\n          \u0026lt;li class=\"nav-item active\"\u0026gt;\n            \u0026lt;%= link_to 'アカウント編集', edit_user_registration_path, class: 'nav-link' %\u0026gt;\n          \u0026lt;/li\u0026gt;\n          \u0026lt;li class=\"nav-item active\"\u0026gt;\n            \u0026lt;%= link_to 'ログアウト', destroy_user_session_path, method: :delete, class: 'nav-link' %\u0026gt;\n          \u0026lt;/li\u0026gt;\n      \u0026lt;% else %\u0026gt;\n          \u0026lt;li class=\"nav-item active\"\u0026gt;\n            \u0026lt;%= link_to \"新規登録\", new_user_registration_path, class: 'nav-link' %\u0026gt;\n          \u0026lt;/li\u0026gt;\n          \u0026lt;li class=\"nav-item active\"\u0026gt;\n            \u0026lt;%= link_to \"ログイン\", new_user_session_path, class: 'nav-link' %\u0026gt;\n          \u0026lt;/li\u0026gt;\n        \u0026lt;% end %\u0026gt;\n      \u0026lt;/ul\u0026gt;\n    \u0026lt;/div\u0026gt;\n  \u0026lt;/nav\u0026gt;\n\u0026lt;/header\u0026gt;\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"gemの追加\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#gem%E3%81%AE%E8%BF%BD%E5%8A%A0\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eGemの追加\u003c/h2\u003e\n\n\u003cp\u003eGemfileに以下を追加して\u003ccode\u003e$ bundle install\u003c/code\u003e\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"Gemfile\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e# ログイン機能に必要なGem\ngem 'devise'\n\n# 日本語化に必要なGem\ngem 'rails-i18n', '~\u0026gt; 5.1'\ngem 'devise-i18n'\n\n# Bootstrapに必要なGem\ngem 'bootstrap', '~\u0026gt; 4.4.1'\ngem 'jquery-rails'\ngem 'devise-bootstrap-views', '~\u0026gt; 1.0'\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e$ bundle install\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"bootstrapの導入\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#bootstrap%E3%81%AE%E5%B0%8E%E5%85%A5\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eBootstrapの導入\u003c/h2\u003e\n\n\u003cul\u003e\n\u003cli\u003e\u003cp\u003e\u003ccode\u003eapplication.css\u003c/code\u003eの拡張子を\u003ccode\u003escss\u003c/code\u003eに変更\u003c/p\u003e\u003c/li\u003e\n\u003cli\u003e\u003cp\u003e\u003ccode\u003eapplication.scss\u003c/code\u003eから，\u003ccode\u003e*= require_tree .\u003c/code\u003eと\u003ccode\u003e*= require_self\u003c/code\u003eを削除\u003c/p\u003e\u003c/li\u003e\n\u003cli\u003e\u003cp\u003e\u003ccode\u003eapplication.scss\u003c/code\u003eに\u003ccode\u003e@import \"bootstrap\";\u003c/code\u003eを追加\u003c/p\u003e\u003c/li\u003e\n\u003cli\u003e\u003cp\u003eスタイルも追加\u003c/p\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"scss\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eapp/assets/stylesheets/application.scss\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"k\"\u003e@import\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"bootstrap\"\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n\n\u003cspan class=\"c1\"\u003e// ログイン画面\u003c/span\u003e\n\n\u003cspan class=\"nc\"\u003e.container-login\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"k\"\u003e@extend\u003c/span\u003e \u003cspan class=\"nc\"\u003e.container-fluid\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n  \u003cspan class=\"nl\"\u003emax-width\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"m\"\u003e576px\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n  \u003cspan class=\"nl\"\u003epadding\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"m\"\u003e2rem\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\n\u003cspan class=\"c1\"\u003e// 「ログインしました」などのフラッシュ用スタイル\u003c/span\u003e\n\n\u003cspan class=\"nc\"\u003e.alert-notice\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"k\"\u003e@extend\u003c/span\u003e \u003cspan class=\"nc\"\u003e.alert-info\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\n\u003cspan class=\"nc\"\u003e.alert-alert\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"k\"\u003e@extend\u003c/span\u003e \u003cspan class=\"nc\"\u003e.alert-danger\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"applicationjsに３つ追加\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#applicationjs%E3%81%AB%EF%BC%93%E3%81%A4%E8%BF%BD%E5%8A%A0\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eapplication.jsに３つ追加\u003c/h3\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"javascript\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eapp/assets/javascripts/application.js\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"c1\"\u003e//= require jquery3\u003c/span\u003e\n\u003cspan class=\"c1\"\u003e//= require popper\u003c/span\u003e\n\u003cspan class=\"c1\"\u003e//= require bootstrap-sprockets\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"deviseの導入\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#devise%E3%81%AE%E5%B0%8E%E5%85%A5\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eDeviseの導入\u003c/h2\u003e\n\n\u003cp\u003e\u003ccode\u003eDevise\u003c/code\u003eをインストール（userの箇所は，任意のモデル名でOKです）\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e$ rails g devise:install\n$ rails g devise user\n$ rails db:create db:migrate\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e問題がなければ，\u003ccode\u003e$ rails s\u003c/code\u003eの後，\u003ccode\u003ehttp://localhost:3000\u003c/code\u003eからログインボタンを押せば，ログイン画面が表示されます。\u003c/p\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Fdd512864-c4ee-b2e8-b1ca-6b877cc8562e.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=c5fe6d2a81422949f78fddbedd125e75\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Fdd512864-c4ee-b2e8-b1ca-6b877cc8562e.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=c5fe6d2a81422949f78fddbedd125e75\" alt=\"スクリーンショット 2020-11-16 15.19.55.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/dd512864-c4ee-b2e8-b1ca-6b877cc8562e.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Fdd512864-c4ee-b2e8-b1ca-6b877cc8562e.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=50f77bd3c1d886ca94d161ac9fb9a268 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"deviseの日本語化\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#devise%E3%81%AE%E6%97%A5%E6%9C%AC%E8%AA%9E%E5%8C%96\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eDeviseの日本語化\u003c/h2\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"ruby\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003econfig/application.rb\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"k\"\u003emodule\u003c/span\u003e \u003cspan class=\"nn\"\u003eAssociationTutorial\u003c/span\u003e\n  \u003cspan class=\"k\"\u003eclass\u003c/span\u003e \u003cspan class=\"nc\"\u003eApplication\u003c/span\u003e \u003cspan class=\"o\"\u003e\u0026lt;\u003c/span\u003e \u003cspan class=\"no\"\u003eRails\u003c/span\u003e\u003cspan class=\"o\"\u003e::\u003c/span\u003e\u003cspan class=\"no\"\u003eApplication\u003c/span\u003e\n    \u003cspan class=\"c1\"\u003e# 以下を追加すれば日本語に\u003c/span\u003e\n    \u003cspan class=\"n\"\u003econfig\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003ei18n\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003edefault_locale\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"ss\"\u003e:ja\u003c/span\u003e \n    \u003cspan class=\"c1\"\u003e# タイムゾーンも変更するなら，以下を追加\u003c/span\u003e\n    \u003cspan class=\"n\"\u003econfig\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003etime_zone\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s1\"\u003e'Asia/Tokyo'\u003c/span\u003e   \n  \u003cspan class=\"k\"\u003eend\u003c/span\u003e\n\u003cspan class=\"k\"\u003eend\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cp\u003eサーバーを落として\u003ccode\u003e$ rails s\u003c/code\u003e\u003cbr\u003e\nで再起動すれば日本語に変更されます。\u003c/p\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F23554109-48a5-ccd8-d5ae-920455fb038e.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=05ab34e9e72ccf8e0c64d2320be04619\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F23554109-48a5-ccd8-d5ae-920455fb038e.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=05ab34e9e72ccf8e0c64d2320be04619\" alt=\"スクリーンショット 2020-11-16 15.28.53.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/23554109-48a5-ccd8-d5ae-920455fb038e.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F23554109-48a5-ccd8-d5ae-920455fb038e.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=8010294cc474d7873f6dd55fd44460bf 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"日本語訳を変更\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%97%A5%E6%9C%AC%E8%AA%9E%E8%A8%B3%E3%82%92%E5%A4%89%E6%9B%B4\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e日本語訳を変更\u003c/h2\u003e\n\n\u003cp\u003e日本語訳を変更したい場合は，次のコマンドでconfig/locales/devise.views.ja.ymlを作成し，編集すればOKです。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e$ rails g devise:i18n:locale ja\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e例えばアカウント登録を新規登録に変更したい場合は，config/locals/devise.views.ja.ymlの該当文字を置換すればOKです。\u003c/p\u003e\n\n\u003cp\u003eパスワードを忘れましたか?も違和感がありますので，パスワードの再設定に置換するのがよいと思います\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"ログイン画面などの変更\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E7%94%BB%E9%9D%A2%E3%81%AA%E3%81%A9%E3%81%AE%E5%A4%89%E6%9B%B4\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eログイン画面などの変更\u003c/h2\u003e\n\n\u003cp\u003eまず，次のコマンドでビューファイルを作成します。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e$ rails g devise:i18n:views\n$ rails g devise:views:bootstrap_templates -f\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e【参考】それぞれのコマンドの最後に例えばuserをつけることで，usersディレクトリ内にファイルを作成することもできますが，その場合は，次の3つの作業を行わないと反映されません。\u003c/p\u003e\n\n\u003cp\u003e\u003ccode\u003edevise.views.ja.yml\u003c/code\u003e30行目の\u003ccode\u003edevise\u003c/code\u003eを\u003ccode\u003eusers\u003c/code\u003eに変更\u003cbr\u003e\n\u003ccode\u003econfig/initializers/devise.rbにあるconfig.scoped_views = false\u003c/code\u003eのコメントアウトを外して\u003ccode\u003etrue\u003c/code\u003eに変更\u003cbr\u003e\nサーバーを落として\u003ccode\u003e$ rails s\u003c/code\u003eで再起動\u003c/p\u003e\n\n\u003cp\u003eお好みで変えていく\u003cbr\u003e\n例えば\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u0026lt;div class=\"container-login\"\u0026gt;\n  # 元のプログラム\n\u0026lt;/div\u0026gt;\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Fb18e1cd9-4812-ecd1-dce6-95976cb542f3.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=d6cbb801ed1ae134f813d82baa533274\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Fb18e1cd9-4812-ecd1-dce6-95976cb542f3.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=d6cbb801ed1ae134f813d82baa533274\" alt=\"スクリーンショット 2020-11-17 21.05.45.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/b18e1cd9-4812-ecd1-dce6-95976cb542f3.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Fb18e1cd9-4812-ecd1-dce6-95976cb542f3.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=900c669ace24c60c87de8d4c079d565e 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"エラーメッセージの変更\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%82%A8%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%81%AE%E5%A4%89%E6%9B%B4\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eエラーメッセージの変更\u003c/h2\u003e\n\n\u003cp\u003eエラーメッセージの表示がいまいちなので変更するためにオーバーライドします。\u003cbr\u003e\n\u003ccode\u003eapp/helpers/devise_helper.rb\u003c/code\u003eファイルを作成し、以下を記述。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"ruby\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eapp/helpers/devise_helper.rb\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"k\"\u003emodule\u003c/span\u003e \u003cspan class=\"nn\"\u003eDeviseHelper\u003c/span\u003e\n  \u003cspan class=\"k\"\u003edef\u003c/span\u003e \u003cspan class=\"nf\"\u003ebootstrap_devise_error_messages!\u003c/span\u003e\n    \u003cspan class=\"k\"\u003ereturn\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"\"\u003c/span\u003e \u003cspan class=\"k\"\u003eif\u003c/span\u003e \u003cspan class=\"n\"\u003eresource\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003eerrors\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003eempty?\u003c/span\u003e\n\n    \u003cspan class=\"n\"\u003ehtml\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"s2\"\u003e\"\"\u003c/span\u003e\n    \u003cspan class=\"n\"\u003eresource\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003eerrors\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003efull_messages\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003eeach\u003c/span\u003e \u003cspan class=\"k\"\u003edo\u003c/span\u003e \u003cspan class=\"o\"\u003e|\u003c/span\u003e\u003cspan class=\"n\"\u003eerror_message\u003c/span\u003e\u003cspan class=\"o\"\u003e|\u003c/span\u003e\n      \u003cspan class=\"n\"\u003ehtml\u003c/span\u003e \u003cspan class=\"o\"\u003e+=\u003c/span\u003e \u003cspan class=\"o\"\u003e\u0026lt;\u0026lt;-\u003c/span\u003e\u003cspan class=\"no\"\u003eEOF\u003c/span\u003e\u003cspan class=\"sh\"\u003e\n      \u0026lt;div class=\"alert alert-danger alert-dismissible\" role=\"alert\"\u0026gt;\n        \u0026lt;button type=\"button\" class=\"close\" data-dismiss=\"alert\"\u0026gt;\n          \u0026lt;span aria-hidden=\"true\"\u0026gt;\u0026amp;times;\u0026lt;/span\u0026gt;\n          \u0026lt;span class=\"sr-only\"\u0026gt;close\u0026lt;/span\u0026gt;\n        \u0026lt;/button\u0026gt;\n        \u003c/span\u003e\u003cspan class=\"si\"\u003e#{\u003c/span\u003e\u003cspan class=\"n\"\u003eerror_message\u003c/span\u003e\u003cspan class=\"si\"\u003e}\u003c/span\u003e\u003cspan class=\"sh\"\u003e\n      \u0026lt;/div\u0026gt;\n\u003c/span\u003e\u003cspan class=\"no\"\u003e      EOF\u003c/span\u003e\n    \u003cspan class=\"k\"\u003eend\u003c/span\u003e\n    \u003cspan class=\"n\"\u003ehtml\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nf\"\u003ehtml_safe\u003c/span\u003e\n  \u003cspan class=\"k\"\u003eend\u003c/span\u003e\n\u003cspan class=\"k\"\u003eend\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Feee35f4e-f827-84e7-3cda-465cd30c9fb1.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=16183d95d96bc05c03b7682960907343\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Feee35f4e-f827-84e7-3cda-465cd30c9fb1.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=16183d95d96bc05c03b7682960907343\" alt=\"スクリーンショット 2020-11-17 21.16.46.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/eee35f4e-f827-84e7-3cda-465cd30c9fb1.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Feee35f4e-f827-84e7-3cda-465cd30c9fb1.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=5b34a76930de4dc7bd6a57933e37480e 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"ログイン画面にもエラーメッセージを追加\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E7%94%BB%E9%9D%A2%E3%81%AB%E3%82%82%E3%82%A8%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%82%92%E8%BF%BD%E5%8A%A0\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eログイン画面にもエラーメッセージを追加\u003c/h3\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"html+erb\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eapp/views/devise/sessions/new.html.erb\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e \u0026lt;div class=\"container-login\"\u0026gt;\n   \u0026lt;h1\u0026gt;\u0026lt;%= t('.sign_in') %\u0026gt;\u0026lt;/h1\u0026gt;\n   \u0026lt;%= render 'shared/flash_messages' %\u0026gt;    //追加\n\n   \u0026lt;%= form_for(resource, as: resource_name, url: session_path(resource_name)) do |f| %\u0026gt;\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cul\u003e\n\u003cli\u003e\n\u003ccode\u003eapp/views/devise\u003c/code\u003eディレクトリ内のファイルの\u003ccode\u003ebtn btn-primary\u003c/code\u003eを\u003ccode\u003ebtn btn-primary btn-block\u003c/code\u003eに置換すればボタンの横幅が自然になります。\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F33c11bf6-9e59-f8fe-5a88-c1c783fec992.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=65c0ffc1d5225cbf46d6ff5220ccd212\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F33c11bf6-9e59-f8fe-5a88-c1c783fec992.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=65c0ffc1d5225cbf46d6ff5220ccd212\" alt=\"スクリーンショット 2020-11-17 21.21.35.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/33c11bf6-9e59-f8fe-5a88-c1c783fec992.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F33c11bf6-9e59-f8fe-5a88-c1c783fec992.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=ba0212fb8d9096dc9b134586f315f30d 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"バリデーション\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%90%E3%83%AA%E3%83%87%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eバリデーション\u003c/h2\u003e\n\n\u003cp\u003eバリデーションはフロント側にも簡単に入れられます。\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003e\n\u003ccode\u003ef.email_field，f.password_field\u003c/code\u003eに\u003ccode\u003erequired: true\u003c/code\u003eを入れることで空欄投稿できなくなります。\u003c/li\u003e\n\u003cli\u003e新規登録（アカウント登録）画面では，例えば，\u003ccode\u003ef.password_field\u003c/code\u003eに\u003ccode\u003erequired: true, minlength: @minimum_password_length, maxlength: '30'\u003c/code\u003eを追加すれば，文字数のバリデーションを追加できます。\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"html+erb\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eapp/views/devise/registrations/new.html.erb\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e \u0026lt;div class=\"form-group\"\u0026gt;\n       \u0026lt;%= f.label :password %\u0026gt;\n-      \u0026lt;%= f.password_field :password, autocomplete: 'current-password',\n-                                      class: 'form-control' %\u0026gt;\n+      \u0026lt;%= f.password_field :password, autocomplete: 'current-password',\n+                                      class: 'form-control',\n+                                      required: true,\n+                                      minlength: @minimum_password_length,\n+                                      maxlength: '30' %\u0026gt;\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Fa6992649-7fc0-0b6d-da76-b4c14ae8d494.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=729e0dcdaef7ab5b0aacd87a4c263c6e\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Fa6992649-7fc0-0b6d-da76-b4c14ae8d494.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=729e0dcdaef7ab5b0aacd87a4c263c6e\" alt=\"スクリーンショット 2020-11-17 21.33.29.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/a6992649-7fc0-0b6d-da76-b4c14ae8d494.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2Fa6992649-7fc0-0b6d-da76-b4c14ae8d494.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=97a4940b84aec2315390f8fbc20f536d 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003e\u003ccode\u003e_links.html.erb\u003c/code\u003eを編集して，一番下のリンクをボタンにしてみます。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u0026lt;hr class=\"border-dark my-5\"\u0026gt;\n\u0026lt;div class=\"form-group\"\u0026gt;\n  \u0026lt;%- if controller_name != 'sessions' %\u0026gt;\n    \u0026lt;%= link_to t(\".sign_in\"), new_session_path(resource_name), class: 'btn btn-info btn-block' %\u0026gt;\u0026lt;br /\u0026gt;\n  \u0026lt;% end -%\u0026gt;\n\n  \u0026lt;%- if devise_mapping.registerable? \u0026amp;\u0026amp; controller_name != 'registrations' %\u0026gt;\n    \u0026lt;%= link_to t(\".sign_up\"), new_registration_path(resource_name), class: 'btn btn-info btn-block' %\u0026gt;\u0026lt;br /\u0026gt;\n  \u0026lt;% end -%\u0026gt;\n\n  \u0026lt;%- if devise_mapping.recoverable? \u0026amp;\u0026amp; controller_name != 'passwords' \u0026amp;\u0026amp; controller_name != 'registrations' %\u0026gt;\n    \u0026lt;%= link_to t(\".forgot_your_password\"), new_password_path(resource_name), class: 'btn btn-secondary btn-block' %\u0026gt;\u0026lt;br /\u0026gt;\n  \u0026lt;% end -%\u0026gt;\n\n  \u0026lt;%- if devise_mapping.confirmable? \u0026amp;\u0026amp; controller_name != 'confirmations' %\u0026gt;\n    \u0026lt;%= link_to t('.didn_t_receive_confirmation_instructions'), new_confirmation_path(resource_name), class: 'btn btn-secondary btn-block' %\u0026gt;\u0026lt;br /\u0026gt;\n  \u0026lt;% end -%\u0026gt;\n\n  \u0026lt;%- if devise_mapping.lockable? \u0026amp;\u0026amp; resource_class.unlock_strategy_enabled?(:email) \u0026amp;\u0026amp; controller_name != 'unlocks' %\u0026gt;\n    \u0026lt;%= link_to t('.didn_t_receive_unlock_instructions'), new_unlock_path(resource_name), class: 'btn btn-secondary btn-block' %\u0026gt;\u0026lt;br /\u0026gt;\n  \u0026lt;% end -%\u0026gt;\n\n  \u0026lt;%- if devise_mapping.omniauthable? %\u0026gt;\n    \u0026lt;%- resource_class.omniauth_providers.each do |provider| %\u0026gt;\n      \u0026lt;%= link_to t('.sign_in_with_provider', provider: OmniAuth::Utils.camelize(provider)), omniauth_authorize_path(resource_name, provider), class: 'btn btn-info btn-block' %\u0026gt;\u0026lt;br /\u0026gt;\n    \u0026lt;% end -%\u0026gt;\n  \u0026lt;% end -%\u0026gt;\n\u0026lt;/div\u0026gt;\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F4ead8d0a-6e65-75e2-9529-be259698393f.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=8e076bcf2d86fedf13a579d3e6d2cbd0\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F4ead8d0a-6e65-75e2-9529-be259698393f.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=8e076bcf2d86fedf13a579d3e6d2cbd0\" alt=\"スクリーンショット 2020-11-17 21.37.44.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/4ead8d0a-6e65-75e2-9529-be259698393f.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F4ead8d0a-6e65-75e2-9529-be259698393f.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=6091e2fca1f4a97b6875ed3a08693659 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003eさらに，リンクのログイン，新規登録（アカウント登録）を次のように変更してみます\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e# 上２つを次に置き換え\n\n  \u0026lt;%- if controller_name != 'sessions' %\u0026gt;\n    \u0026lt;%= link_to \"アカウントをお持ちの方\", new_session_path(resource_name), class: 'btn btn-info btn-block' %\u0026gt;\u0026lt;br /\u0026gt;\n  \u0026lt;% end -%\u0026gt;\n\n  \u0026lt;%- if devise_mapping.registerable? \u0026amp;\u0026amp; controller_name != 'registrations' %\u0026gt;\n    \u0026lt;%= link_to \"アカウントをお持ちでない方\", new_registration_path(resource_name), class: 'btn btn-info btn-block' %\u0026gt;\u0026lt;br /\u0026gt;\n  \u0026lt;% end -%\u0026gt;\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"html+erb\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003eapp/views/devise/registrations/edit.html.erb\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u0026lt;!-- ここから --\u0026gt;\n  \u0026lt;p\u0026gt;\u0026lt;%= t('.unhappy') %\u0026gt;\n    ? \u0026lt;%= link_to t('.cancel_my_account'), registration_path(resource_name), data: {confirm: t('.are_you_sure')}, method: :delete %\u0026gt;\n    .\u0026lt;/p\u0026gt;\n\n  \u0026lt;%= link_to t('.back'), :back %\u0026gt;\n\u0026lt;!-- ここまでを次に置き換える --\u0026gt;\n\n  \u0026lt;hr class=\"devise-link my-5\"\u0026gt;\n  \u0026lt;div class=\"form-group\"\u0026gt;\n    \u0026lt;%= link_to \"トップページ\", root_path, class: 'btn btn-info btn-block mb-4' %\u0026gt;\n    \u0026lt;%= link_to t('.cancel_my_account'), registration_path(resource_name), data: {confirm: t('.are_you_sure')}, method: :delete, class: 'btn btn-danger btn-block' %\u0026gt;\n  \u0026lt;/div\u0026gt;\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F14b66ed3-4061-49b9-7e3f-d8cfdae3c8cf.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=b1cf05c598a754f4d28f02a9c30e0777\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F14b66ed3-4061-49b9-7e3f-d8cfdae3c8cf.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=b1cf05c598a754f4d28f02a9c30e0777\" alt=\"スクリーンショット 2020-11-17 21.47.19.png\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/14b66ed3-4061-49b9-7e3f-d8cfdae3c8cf.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F752006%2F14b66ed3-4061-49b9-7e3f-d8cfdae3c8cf.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=f6b3ec32b177496e5a0878e9bbde258a 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003eこれで一応単純なスタイルは完成です。\u003cbr\u003e\nもし間違っているところがあればご教授いただけると幸いです。\u003c/p\u003e\n",
  "body": "# はじめに\n今回はDeviseを使ってログイン機能を作成していきます。\nまたDeviseの日本語化やBootstrap4の適用までを行っていきます。\n\n\n# 準備\n\n```\n$ rails new devise-sample \n$ rails g controller homes index\n```\n```config/routes.rb\nRails.application.routes.draw do\n  root 'homes#index'\nend\n```\n\n## ナビバーを追加し，レスポンシブ対応のためのmetaタグを追加\n```app/views/layouts/application.html.erb\n (略)\n     \u003c%= csrf_meta_tags %\u003e\n     \u003c%= csp_meta_tag %\u003e\n     \u003cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\"\u003e　　//追加\n (略)\n  \u003cbody\u003e\n     \u003c%= render 'shared/header' %\u003e     //追加\n     \u003c%= yield %\u003e\n   \u003c/body\u003e\n```\n\n```app/views/homes/index.html.erb\n\u003c%= render 'shared/flash_messages' %\u003e\n```\n\n### 新しくsharedフォルダと各renderファイルを作成\n\n```app/views/shared/flash_messages.html.erb\n\u003c% flash.each do |msg_type, msg| %\u003e\n  \u003cdiv class=\"alert alert-\u003c%= msg_type %\u003e\" role=\"alert\" id=\"alert\"\u003e\n    \u003ca href=\"#\" class=\"close\" data-dismiss=\"alert\"\u003e×\u003c/a\u003e\n    \u003c%= msg %\u003e\n  \u003c/div\u003e\n\u003c% end %\u003e\n```\n\n ```app/views/shared/_header.html.erb\n\u003cheader\u003e\n  \u003cnav class=\"navbar navbar-expand navbar-light\"\u003e\n    \u003c%= link_to \"Deviseサンプル\", root_path, class: 'navbar-brand' %\u003e\n    \u003cdiv id=\"Navber\"\u003e\n      \u003cul class=\"navbar-nav\"\u003e\n        \u003c% if user_signed_in? %\u003e\n          \u003cli class=\"nav-item active\"\u003e\n            \u003c%= link_to 'アカウント編集', edit_user_registration_path, class: 'nav-link' %\u003e\n          \u003c/li\u003e\n          \u003cli class=\"nav-item active\"\u003e\n            \u003c%= link_to 'ログアウト', destroy_user_session_path, method: :delete, class: 'nav-link' %\u003e\n          \u003c/li\u003e\n      \u003c% else %\u003e\n          \u003cli class=\"nav-item active\"\u003e\n            \u003c%= link_to \"新規登録\", new_user_registration_path, class: 'nav-link' %\u003e\n          \u003c/li\u003e\n          \u003cli class=\"nav-item active\"\u003e\n            \u003c%= link_to \"ログイン\", new_user_session_path, class: 'nav-link' %\u003e\n          \u003c/li\u003e\n        \u003c% end %\u003e\n      \u003c/ul\u003e\n    \u003c/div\u003e\n  \u003c/nav\u003e\n\u003c/header\u003e\n```\n\n## Gemの追加\n\nGemfileに以下を追加して`$ bundle install`\n\n```Gemfile\n# ログイン機能に必要なGem\ngem 'devise'\n\n# 日本語化に必要なGem\ngem 'rails-i18n', '~\u003e 5.1'\ngem 'devise-i18n'\n\n# Bootstrapに必要なGem\ngem 'bootstrap', '~\u003e 4.4.1'\ngem 'jquery-rails'\ngem 'devise-bootstrap-views', '~\u003e 1.0'\n```\n```\n$ bundle install\n```\n\n##Bootstrapの導入\n\n* `application.css`の拡張子を`scss`に変更\n\n* `application.scss`から，`*= require_tree .`と`*= require_self`を削除\n\n* `application.scss`に`@import \"bootstrap\";`を追加\n\n* スタイルも追加\n\n```app/assets/stylesheets/application.scss\n@import \"bootstrap\";\n\n// ログイン画面\n\n.container-login {\n  @extend .container-fluid;\n  max-width: 576px;\n  padding: 2rem;\n}\n\n// 「ログインしました」などのフラッシュ用スタイル\n\n.alert-notice {\n  @extend .alert-info;\n}\n\n.alert-alert {\n  @extend .alert-danger;\n}\n```\n\n###application.jsに３つ追加\n\n```app/assets/javascripts/application.js\n//= require jquery3\n//= require popper\n//= require bootstrap-sprockets\n```\n\n##Deviseの導入\n`Devise`をインストール（userの箇所は，任意のモデル名でOKです）\n\n```\n$ rails g devise:install\n$ rails g devise user\n$ rails db:create db:migrate\n```\n\n問題がなければ，`$ rails s`の後，`http://localhost:3000`からログインボタンを押せば，ログイン画面が表示されます。\n\n![スクリーンショット 2020-11-16 15.19.55.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/dd512864-c4ee-b2e8-b1ca-6b877cc8562e.png)\n\n##Deviseの日本語化\n```config/application.rb\nmodule AssociationTutorial\n  class Application \u003c Rails::Application\n    # 以下を追加すれば日本語に\n    config.i18n.default_locale = :ja \n    # タイムゾーンも変更するなら，以下を追加\n    config.time_zone = 'Asia/Tokyo'   \n  end\nend\n```\n\nサーバーを落として`$ rails s`\nで再起動すれば日本語に変更されます。\n\n![スクリーンショット 2020-11-16 15.28.53.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/23554109-48a5-ccd8-d5ae-920455fb038e.png)\n\n\n## 日本語訳を変更\n日本語訳を変更したい場合は，次のコマンドでconfig/locales/devise.views.ja.ymlを作成し，編集すればOKです。\n\n\n```\n$ rails g devise:i18n:locale ja\n```\n\n例えばアカウント登録を新規登録に変更したい場合は，config/locals/devise.views.ja.ymlの該当文字を置換すればOKです。\n\nパスワードを忘れましたか?も違和感がありますので，パスワードの再設定に置換するのがよいと思います\n\n\n##ログイン画面などの変更\nまず，次のコマンドでビューファイルを作成します。\n\n```\n$ rails g devise:i18n:views\n$ rails g devise:views:bootstrap_templates -f\n```\n\n【参考】それぞれのコマンドの最後に例えばuserをつけることで，usersディレクトリ内にファイルを作成することもできますが，その場合は，次の3つの作業を行わないと反映されません。\n\n`devise.views.ja.yml`30行目の`devise`を`users`に変更\n`config/initializers/devise.rbにあるconfig.scoped_views = false`のコメントアウトを外して`true`に変更\nサーバーを落として`$ rails s`で再起動\n\n\nお好みで変えていく\n例えば\n\n```\n\u003cdiv class=\"container-login\"\u003e\n  # 元のプログラム\n\u003c/div\u003e\n```\n![スクリーンショット 2020-11-17 21.05.45.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/b18e1cd9-4812-ecd1-dce6-95976cb542f3.png)\n\n##エラーメッセージの変更\nエラーメッセージの表示がいまいちなので変更するためにオーバーライドします。\n`app/helpers/devise_helper.rb`ファイルを作成し、以下を記述。\n\n```app/helpers/devise_helper.rb\nmodule DeviseHelper\n  def bootstrap_devise_error_messages!\n    return \"\" if resource.errors.empty?\n\n    html = \"\"\n    resource.errors.full_messages.each do |error_message|\n      html += \u003c\u003c-EOF\n      \u003cdiv class=\"alert alert-danger alert-dismissible\" role=\"alert\"\u003e\n        \u003cbutton type=\"button\" class=\"close\" data-dismiss=\"alert\"\u003e\n          \u003cspan aria-hidden=\"true\"\u003e\u0026times;\u003c/span\u003e\n          \u003cspan class=\"sr-only\"\u003eclose\u003c/span\u003e\n        \u003c/button\u003e\n        #{error_message}\n      \u003c/div\u003e\n      EOF\n    end\n    html.html_safe\n  end\nend\n```\n\n![スクリーンショット 2020-11-17 21.16.46.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/eee35f4e-f827-84e7-3cda-465cd30c9fb1.png)\n\n###ログイン画面にもエラーメッセージを追加\n\n```app/views/devise/sessions/new.html.erb\n \u003cdiv class=\"container-login\"\u003e\n   \u003ch1\u003e\u003c%= t('.sign_in') %\u003e\u003c/h1\u003e\n   \u003c%= render 'shared/flash_messages' %\u003e    //追加\n\n   \u003c%= form_for(resource, as: resource_name, url: session_path(resource_name)) do |f| %\u003e\n```\n\n* `app/views/devise`ディレクトリ内のファイルの`btn btn-primary`を`btn btn-primary btn-block`に置換すればボタンの横幅が自然になります。\n\n\n![スクリーンショット 2020-11-17 21.21.35.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/33c11bf6-9e59-f8fe-5a88-c1c783fec992.png)\n\n##バリデーション\nバリデーションはフロント側にも簡単に入れられます。\n\n* `f.email_field，f.password_field`に`required: true`を入れることで空欄投稿できなくなります。\n* 新規登録（アカウント登録）画面では，例えば，`f.password_field`に`required: true, minlength: @minimum_password_length, maxlength: '30'`を追加すれば，文字数のバリデーションを追加できます。\n\n\n```app/views/devise/registrations/new.html.erb\n \u003cdiv class=\"form-group\"\u003e\n       \u003c%= f.label :password %\u003e\n-      \u003c%= f.password_field :password, autocomplete: 'current-password',\n-                                      class: 'form-control' %\u003e\n+      \u003c%= f.password_field :password, autocomplete: 'current-password',\n+                                      class: 'form-control',\n+                                      required: true,\n+                                      minlength: @minimum_password_length,\n+                                      maxlength: '30' %\u003e\n```\n\n![スクリーンショット 2020-11-17 21.33.29.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/a6992649-7fc0-0b6d-da76-b4c14ae8d494.png)\n\n`_links.html.erb`を編集して，一番下のリンクをボタンにしてみます。\n\n```\n\u003chr class=\"border-dark my-5\"\u003e\n\u003cdiv class=\"form-group\"\u003e\n  \u003c%- if controller_name != 'sessions' %\u003e\n    \u003c%= link_to t(\".sign_in\"), new_session_path(resource_name), class: 'btn btn-info btn-block' %\u003e\u003cbr /\u003e\n  \u003c% end -%\u003e\n\n  \u003c%- if devise_mapping.registerable? \u0026\u0026 controller_name != 'registrations' %\u003e\n    \u003c%= link_to t(\".sign_up\"), new_registration_path(resource_name), class: 'btn btn-info btn-block' %\u003e\u003cbr /\u003e\n  \u003c% end -%\u003e\n\n  \u003c%- if devise_mapping.recoverable? \u0026\u0026 controller_name != 'passwords' \u0026\u0026 controller_name != 'registrations' %\u003e\n    \u003c%= link_to t(\".forgot_your_password\"), new_password_path(resource_name), class: 'btn btn-secondary btn-block' %\u003e\u003cbr /\u003e\n  \u003c% end -%\u003e\n\n  \u003c%- if devise_mapping.confirmable? \u0026\u0026 controller_name != 'confirmations' %\u003e\n    \u003c%= link_to t('.didn_t_receive_confirmation_instructions'), new_confirmation_path(resource_name), class: 'btn btn-secondary btn-block' %\u003e\u003cbr /\u003e\n  \u003c% end -%\u003e\n\n  \u003c%- if devise_mapping.lockable? \u0026\u0026 resource_class.unlock_strategy_enabled?(:email) \u0026\u0026 controller_name != 'unlocks' %\u003e\n    \u003c%= link_to t('.didn_t_receive_unlock_instructions'), new_unlock_path(resource_name), class: 'btn btn-secondary btn-block' %\u003e\u003cbr /\u003e\n  \u003c% end -%\u003e\n\n  \u003c%- if devise_mapping.omniauthable? %\u003e\n    \u003c%- resource_class.omniauth_providers.each do |provider| %\u003e\n      \u003c%= link_to t('.sign_in_with_provider', provider: OmniAuth::Utils.camelize(provider)), omniauth_authorize_path(resource_name, provider), class: 'btn btn-info btn-block' %\u003e\u003cbr /\u003e\n    \u003c% end -%\u003e\n  \u003c% end -%\u003e\n\u003c/div\u003e\n```\n![スクリーンショット 2020-11-17 21.37.44.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/4ead8d0a-6e65-75e2-9529-be259698393f.png)\n\nさらに，リンクのログイン，新規登録（アカウント登録）を次のように変更してみます\n\n```\n# 上２つを次に置き換え\n\n  \u003c%- if controller_name != 'sessions' %\u003e\n    \u003c%= link_to \"アカウントをお持ちの方\", new_session_path(resource_name), class: 'btn btn-info btn-block' %\u003e\u003cbr /\u003e\n  \u003c% end -%\u003e\n\n  \u003c%- if devise_mapping.registerable? \u0026\u0026 controller_name != 'registrations' %\u003e\n    \u003c%= link_to \"アカウントをお持ちでない方\", new_registration_path(resource_name), class: 'btn btn-info btn-block' %\u003e\u003cbr /\u003e\n  \u003c% end -%\u003e\n```\n\n```app/views/devise/registrations/edit.html.erb\n\u003c!-- ここから --\u003e\n  \u003cp\u003e\u003c%= t('.unhappy') %\u003e\n    ? \u003c%= link_to t('.cancel_my_account'), registration_path(resource_name), data: {confirm: t('.are_you_sure')}, method: :delete %\u003e\n    .\u003c/p\u003e\n\n  \u003c%= link_to t('.back'), :back %\u003e\n\u003c!-- ここまでを次に置き換える --\u003e\n\n  \u003chr class=\"devise-link my-5\"\u003e\n  \u003cdiv class=\"form-group\"\u003e\n    \u003c%= link_to \"トップページ\", root_path, class: 'btn btn-info btn-block mb-4' %\u003e\n    \u003c%= link_to t('.cancel_my_account'), registration_path(resource_name), data: {confirm: t('.are_you_sure')}, method: :delete, class: 'btn btn-danger btn-block' %\u003e\n  \u003c/div\u003e\n```\n![スクリーンショット 2020-11-17 21.47.19.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/752006/14b66ed3-4061-49b9-7e3f-d8cfdae3c8cf.png)\n\nこれで一応単純なスタイルは完成です。\nもし間違っているところがあればご教授いただけると幸いです。\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:50:48+09:00",
  "group": null,
  "id": "6adb01cf09dce7b6870f",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Rails",
    "versions": []
  }, {
    "name": "devise",
    "versions": []
  }],
  "title": "Deviseでログイン機能",
  "updated_at": "2020-11-17T21:50:48+09:00",
  "url": "https://qiita.com/mat827/items/6adb01cf09dce7b6870f",
  "user": {
    "description": "某プログラミングスクールに通っていました。現在は転職活動中です。 学んだことやプロダクトをアウトプットしていきます。 よろしくお願いします！",
    "facebook_id": "",
    "followees_count": 0,
    "followers_count": 1,
    "github_login_name": "mat827",
    "id": "mat827",
    "items_count": 32,
    "linkedin_id": "",
    "location": "",
    "name": "Mst",
    "organization": "",
    "permanent_id": 752006,
    "profile_image_url": "https://avatars1.githubusercontent.com/u/62657297?v=4",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003cp\u003eこちらの記事は以下の書籍を参考にアウトプットとして執筆しました。\u003cbr\u003e\n\u003ca href=\"https://www.amazon.co.jp/gp/product/B0787YH4L2/ref=ppx_yo_dt_b_d_asin_title_o00?ie=UTF8\u0026amp;psc=1\" rel=\"nofollow noopener\" target=\"_blank\"\u003e新・明解C++入門\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003eとりあえず1章ずつ記事にしていく方向で行こうと思います。\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"処理系\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%87%A6%E7%90%86%E7%B3%BB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e処理系\u003c/h3\u003e\n\n\u003cp\u003eC++プログラム開発に必要なソフトウェア\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003eMicrosoft zVisual c++\u003c/li\u003e\n\u003cli\u003eGNU C++\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003eなど\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"std名前空間の利用\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#std%E5%90%8D%E5%89%8D%E7%A9%BA%E9%96%93%E3%81%AE%E5%88%A9%E7%94%A8\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003estd名前空間の利用\u003c/h3\u003e\n\n\u003cp\u003estd名前空間の利用しないで\u003ccode\u003ecout\u003c/code\u003eを使用する場合、\u003ccode\u003estd::cout\u003c/code\u003eとする必要がある。\u003cbr\u003e\nいまは呪文として落とし込んでおく。\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"整数接尾語\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%95%B4%E6%95%B0%E6%8E%A5%E5%B0%BE%E8%AA%9E\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e整数接尾語\u003c/h3\u003e\n\n\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth\u003e\u003c/th\u003e\n\u003cth\u003e説明\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd\u003eu,U\u003c/td\u003e\n\u003ctd\u003eその整数定数が符号なしである\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003el,L\u003c/td\u003e\n\u003ctd\u003eその整数定数がlongである\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n\n\u003ch4\u003e\n\u003cspan id=\"例\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E4%BE%8B\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e例\u003c/h4\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e1000→int型で表現できる→int型\n60000→int型で表現できないがlong型で表現可能→long型\n60000U→unsigned型で表現可能→unsigned型\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"文字列の読込\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%96%87%E5%AD%97%E5%88%97%E3%81%AE%E8%AA%AD%E8%BE%BC\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e文字列の読込\u003c/h3\u003e\n\n\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth\u003e\u003c/th\u003e\n\u003cth\u003e説明\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd\u003ecin\u003c/td\u003e\n\u003ctd\u003eスペースを含まない\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003egetline(cin,変数名)\u003c/td\u003e\n\u003ctd\u003eスペースを含む\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"bool\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#bool\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003ebool\u003c/h3\u003e\n\n\u003cp\u003eboolalpha操作子を使うと真偽値をアルファベットで表示\u003cbr\u003e\nnoboolalphaで数値で表示\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"c++\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"n\"\u003ecout\u003c/span\u003e \u003cspan class=\"o\"\u003e\u0026lt;\u0026lt;\u003c/span\u003e \u003cspan class=\"n\"\u003eboolalpha\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n\u003cspan class=\"n\"\u003ecout\u003c/span\u003e \u003cspan class=\"o\"\u003e\u0026lt;\u0026lt;\u003c/span\u003e \u003cspan class=\"n\"\u003enoboolalpha\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"浮動小数点型\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%B5%AE%E5%8B%95%E5%B0%8F%E6%95%B0%E7%82%B9%E5%9E%8B\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e浮動小数点型\u003c/h3\u003e\n\n\u003cp\u003e小数点以下を持つ実数のことで型は\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003efloat\u003c/li\u003e\n\u003cli\u003edouble\u003c/li\u003e\n\u003cli\u003elong double\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003eの3つがある\u003c/p\u003e\n\n\u003ch4\u003e\n\u003cspan id=\"浮動小数点リテラル\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%B5%AE%E5%8B%95%E5%B0%8F%E6%95%B0%E7%82%B9%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e浮動小数点リテラル\u003c/h4\u003e\n\n\u003cp\u003e3.14などの実数を表す定数\u003c/p\u003e\n\n\u003ch4\u003e\n\u003cspan id=\"浮動小数点接尾語\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%B5%AE%E5%8B%95%E5%B0%8F%E6%95%B0%E7%82%B9%E6%8E%A5%E5%B0%BE%E8%AA%9E\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e浮動小数点接尾語\u003c/h4\u003e\n\n\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth\u003e接尾語\u003c/th\u003e\n\u003cth\u003e説明\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd\u003ef,F\u003c/td\u003e\n\u003ctd\u003efloat型\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003el,L\u003c/td\u003e\n\u003ctd\u003elong double型\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003e接尾語がない\u003c/td\u003e\n\u003ctd\u003edouble型\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"演算と型\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%BC%94%E7%AE%97%E3%81%A8%E5%9E%8B\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e演算と型\u003c/h3\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003eint型+int型=int型\ndouble型+double型=double型\nint型+double型=double型\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003eint型とdouble型混同では\u003cstrong\u003e暗黙の型変換\u003c/strong\u003eが起きている\u003cbr\u003e\n整数と浮動小数点の型変換には静的キャストが適している。\u003c/p\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"列挙体\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%88%97%E6%8C%99%E4%BD%93\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e列挙体\u003c/h3\u003e\n\n\u003cp\u003e整数値の集まり\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"配列\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E9%85%8D%E5%88%97\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e配列\u003c/h2\u003e\n\n\u003ch3\u003e\n\u003cspan id=\"定値オブジェクト\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%AE%9A%E5%80%A4%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e定値オブジェクト\u003c/h3\u003e\n\n\u003cp\u003e配列の宣言時に大きさをconstが使えるということ\u003c/p\u003e\n",
  "body": "こちらの記事は以下の書籍を参考にアウトプットとして執筆しました。\n[新・明解C++入門](https://www.amazon.co.jp/gp/product/B0787YH4L2/ref=ppx_yo_dt_b_d_asin_title_o00?ie=UTF8\u0026psc=1)\n\nとりあえず1章ずつ記事にしていく方向で行こうと思います。\n\n\n###処理系\nC++プログラム開発に必要なソフトウェア\n\n- Microsoft zVisual c++\n- GNU C++\n\nなど\n\n###std名前空間の利用\nstd名前空間の利用しないで`cout`を使用する場合、`std::cout`とする必要がある。\nいまは呪文として落とし込んでおく。\n\n###整数接尾語\n||説明|\n|---|---|\n|u,U|その整数定数が符号なしである|\n|l,L|その整数定数がlongである|\n\n####例\n\n```\n1000→int型で表現できる→int型\n60000→int型で表現できないがlong型で表現可能→long型\n60000U→unsigned型で表現可能→unsigned型\n```\n\n\n###文字列の読込\n\n||説明|\n|---|---|\n|cin|スペースを含まない|\n|getline(cin,変数名)|スペースを含む|\n###bool\nboolalpha操作子を使うと真偽値をアルファベットで表示\nnoboolalphaで数値で表示\n\n```c++\ncout \u003c\u003c boolalpha;\ncout \u003c\u003c noboolalpha;\n```\n###浮動小数点型\n小数点以下を持つ実数のことで型は\n\n- float\n- double\n- long double\n\nの3つがある\n\n####浮動小数点リテラル\n3.14などの実数を表す定数\n####浮動小数点接尾語\n|接尾語|説明|\n|---|---|\n|f,F|float型|\n|l,L|long double型|\n|接尾語がない|double型|\n\n###演算と型\n```\nint型+int型=int型\ndouble型+double型=double型\nint型+double型=double型\n```\nint型とdouble型混同では**暗黙の型変換**が起きている\n整数と浮動小数点の型変換には静的キャストが適している。\n\n###列挙体\n整数値の集まり\n\n##配列\n###定値オブジェクト\n配列の宣言時に大きさをconstが使えるということ\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:47:47+09:00",
  "group": null,
  "id": "6013f0f3746053ed6890",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "C++",
    "versions": []
  }],
  "title": "C++入門 私的まとめ",
  "updated_at": "2020-11-17T21:47:47+09:00",
  "url": "https://qiita.com/yktk435/items/6013f0f3746053ed6890",
  "user": {
    "description": "ラズパイ、IoT、chrome拡張機能開発などなど",
    "facebook_id": "",
    "followees_count": 1,
    "followers_count": 3,
    "github_login_name": "yktk435",
    "id": "yktk435",
    "items_count": 152,
    "linkedin_id": "",
    "location": "",
    "name": "",
    "organization": "",
    "permanent_id": 136271,
    "profile_image_url": "https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/136271/profile-images/1586330549",
    "team_only": false,
    "twitter_screen_name": "manhat_gold",
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\u003cp\u003e皆さんSytemVerilogでエディタのタグジャンプ用のTAGSを作るのはどのようにしているでしょうか? ctagsに正規表現でTAGのルールを定義したファイルを食わせて生成している方がほとんどではないでしょうか。Qiitaですと\u003ca href=\"https://qiita.com/tethys_seesaa/items/6c2622d6e63607633493\" id=\"reference-0c599f3d023ea5cc1457\"\u003eここ\u003c/a\u003eに方法が書いてあります。WEB検索すると、SytemVerilogのTAGS生成方法でヒットするのはほとんどがこの方法です。\u003c/p\u003e\n\n\u003cp\u003eただ、この方法はワンラインの正規表現での定義なので構文解析に限界があります。目立つところでは\u003ccode\u003ebit a, b;\u003c/code\u003eのように一行に複数の変数が宣言された場合に対応できない、/*と*/ではさまれたコメントが複数行にわたる場合、そこもctagsに解釈されてしまうなどの問題があります。\u003c/p\u003e\n\n\u003cp\u003egithubにはuniversal-ctagsというツールが登録されています。これはツールネイティブでSystemVerilogに対応しており、前記のctagsよりもはるかに多くの書式に対応しています。とても高機能なのに、SytemVerilogのTAGS生成ツールとしてはなぜかほとんど紹介されていないようです。現在でも活発にSystemVerilogへのサポートが拡充されていますので、是非皆さん使ってみてください。\u003c/p\u003e\n\n\u003cp\u003eレポジトリは以下になります。\u003cbr\u003e\n\u003ca href=\"https://github.com/universal-ctags/ctags\" class=\"autolink\" rel=\"nofollow noopener\" target=\"_blank\"\u003ehttps://github.com/universal-ctags/ctags\u003c/a\u003e\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"コンパイルとインストールの方法\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%82%B3%E3%83%B3%E3%83%91%E3%82%A4%E3%83%AB%E3%81%A8%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%AE%E6%96%B9%E6%B3%95\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eコンパイルとインストールの方法\u003c/h1\u003e\n\n\u003cp\u003e特にstable releaseとかなさそうなので、HEADをコンパイルしてしまいましょう。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"text\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u0026gt; git clone  https://github.com/universal-ctags/ctags\n\u0026gt; cd ctags\n\u0026gt; ./autogen.sh\n\u0026gt; ./configure --program-prefix=ex --prefix=$HOME/local #インストール先を$HOME/localに設定\n\u0026gt; make\n\u0026gt; make install\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"unversal-ctagsの使い方\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#unversal-ctags%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eunversal-ctagsの使い方\u003c/h1\u003e\n\n\u003cp\u003e上記の方法でインストールすると、~/local/binにexctagsというファイルができています。使用方法はctagsと全く同じです。TAGSを作りたいソースツリーの根本まで行き、vimの場合\u003ccode\u003eexctags -R\u003c/code\u003e emacsの場合\u003ccode\u003eexctags -Re\u003c/code\u003eとなります。\u003c/p\u003e\n",
  "body": "皆さんSytemVerilogでエディタのタグジャンプ用のTAGSを作るのはどのようにしているでしょうか? ctagsに正規表現でTAGのルールを定義したファイルを食わせて生成している方がほとんどではないでしょうか。Qiitaですと[ここ](https://qiita.com/tethys_seesaa/items/6c2622d6e63607633493)に方法が書いてあります。WEB検索すると、SytemVerilogのTAGS生成方法でヒットするのはほとんどがこの方法です。\n\nただ、この方法はワンラインの正規表現での定義なので構文解析に限界があります。目立つところでは`bit a, b;`のように一行に複数の変数が宣言された場合に対応できない、/\\*と\\*/ではさまれたコメントが複数行にわたる場合、そこもctagsに解釈されてしまうなどの問題があります。\n\ngithubにはuniversal-ctagsというツールが登録されています。これはツールネイティブでSystemVerilogに対応しており、前記のctagsよりもはるかに多くの書式に対応しています。とても高機能なのに、SytemVerilogのTAGS生成ツールとしてはなぜかほとんど紹介されていないようです。現在でも活発にSystemVerilogへのサポートが拡充されていますので、是非皆さん使ってみてください。\n\nレポジトリは以下になります。\nhttps://github.com/universal-ctags/ctags\n\n# コンパイルとインストールの方法\n\n特にstable releaseとかなさそうなので、HEADをコンパイルしてしまいましょう。\n\n```\n\u003e git clone  https://github.com/universal-ctags/ctags\n\u003e cd ctags\n\u003e ./autogen.sh\n\u003e ./configure --program-prefix=ex --prefix=$HOME/local #インストール先を$HOME/localに設定\n\u003e make\n\u003e make install\n```\n\n# unversal-ctagsの使い方\n上記の方法でインストールすると、~/local/binにexctagsというファイルができています。使用方法はctagsと全く同じです。TAGSを作りたいソースツリーの根本まで行き、vimの場合`exctags -R` emacsの場合`exctags -Re`となります。\n\n\n\n\n\n\n\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:45:28+09:00",
  "group": null,
  "id": "e0c4cfc4b12e18a5095f",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Emacs",
    "versions": []
  }, {
    "name": "Vim",
    "versions": []
  }, {
    "name": "Verilog",
    "versions": []
  }, {
    "name": "SystemVerilog",
    "versions": []
  }],
  "title": "universal-ctagsを使おう",
  "updated_at": "2020-11-17T21:46:33+09:00",
  "url": "https://qiita.com/triggerfish/items/e0c4cfc4b12e18a5095f",
  "user": {
    "description": "ASIC職人です。デザイナですが検証もやります。ネタとしては検証のほうが書きやすいので、そちらが記事のメインになると思います。入門記事よりはプロの方が実務で役に立つような記事を目指しています。内容に不明点がありましたら遠慮なく質問をお願いいたします!",
    "facebook_id": "",
    "followees_count": 0,
    "followers_count": 9,
    "github_login_name": null,
    "id": "triggerfish",
    "items_count": 26,
    "linkedin_id": "",
    "location": "",
    "name": "",
    "organization": "",
    "permanent_id": 235449,
    "profile_image_url": "https://qiita-image-store.s3.amazonaws.com/0/235449/profile-images/1534434027",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}, {
  "rendered_body": "\n\u003ch1\u003e\n\u003cspan id=\"プログラミング勉強日記\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E5%8B%89%E5%BC%B7%E6%97%A5%E8%A8%98\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eプログラミング勉強日記\u003c/h1\u003e\n\n\u003cp\u003e2020年11月17日\u003cbr\u003e\nコードを書いていて、\u003ccode\u003eparseInt\u003c/code\u003eと\u003ccode\u003evalueOf\u003c/code\u003eの違いがわからなかったので備忘録として残しておく。\u003c/p\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"違い\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E9%81%95%E3%81%84\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e違い\u003c/h1\u003e\n\n\u003cp\u003e　コードを実行したときに結果が同じになる。調べてみると\u003cb\u003e戻り値が違う\u003c/b\u003eと出てきた。具体的には、\u003ccode\u003eparseInt\u003c/code\u003eがint型やchar型などのプリミティブ型で\u003ccode\u003evalueOf\u003c/code\u003eはIntegerクラスを返す。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"java\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"kd\"\u003epublic\u003c/span\u003e \u003cspan class=\"kd\"\u003eclass\u003c/span\u003e \u003cspan class=\"nc\"\u003eMain\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"kd\"\u003epublic\u003c/span\u003e \u003cspan class=\"kd\"\u003estatic\u003c/span\u003e \u003cspan class=\"kt\"\u003evoid\u003c/span\u003e \u003cspan class=\"nf\"\u003emain\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"nc\"\u003eString\u003c/span\u003e\u003cspan class=\"o\"\u003e[]\u003c/span\u003e \u003cspan class=\"n\"\u003eargs\u003c/span\u003e\u003cspan class=\"o\"\u003e)\u003c/span\u003e \u003cspan class=\"kd\"\u003ethrows\u003c/span\u003e \u003cspan class=\"nc\"\u003eException\u003c/span\u003e \u003cspan class=\"o\"\u003e{\u003c/span\u003e\n        \u003cspan class=\"kt\"\u003eint\u003c/span\u003e \u003cspan class=\"n\"\u003ehoge\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"nc\"\u003eInteger\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003evalueOf\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e\"12345\"\u003c/span\u003e\u003cspan class=\"o\"\u003e);\u003c/span\u003e\n        \u003cspan class=\"nc\"\u003eSystem\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003eout\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003eprintln\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003ehoge\u003c/span\u003e\u003cspan class=\"o\"\u003e);\u003c/span\u003e\n\n        \u003cspan class=\"kt\"\u003eint\u003c/span\u003e \u003cspan class=\"n\"\u003efuga\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"nc\"\u003eInteger\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003eparseInt\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"s\"\u003e\"12345\"\u003c/span\u003e\u003cspan class=\"o\"\u003e);\u003c/span\u003e\n        \u003cspan class=\"nc\"\u003eSystem\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003eout\u003c/span\u003e\u003cspan class=\"o\"\u003e.\u003c/span\u003e\u003cspan class=\"na\"\u003eprintln\u003c/span\u003e\u003cspan class=\"o\"\u003e(\u003c/span\u003e\u003cspan class=\"n\"\u003efuga\u003c/span\u003e\u003cspan class=\"o\"\u003e);\u003c/span\u003e\n    \u003cspan class=\"o\"\u003e}\u003c/span\u003e\n\u003cspan class=\"o\"\u003e}\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"\"\u003e\n\u003cdiv class=\"code-lang\"\u003e\u003cspan class=\"bold\"\u003e実行結果\u003c/span\u003e\u003c/div\u003e\n\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e12345\n12345\n\u003c/pre\u003e\u003c/div\u003e\n\u003c/div\u003e\n\n\u003ch1\u003e\n\u003cspan id=\"参考文献\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e参考文献\u003c/h1\u003e\n\n\u003cp\u003e\u003ca href=\"http://welovy.hatenablog.com/entry/2013/04/28/121057\" rel=\"nofollow noopener\" target=\"_blank\"\u003eparseIntとvalueOfの違い\u003c/a\u003e\u003cbr\u003e\n\u003ca href=\"https://tomoprog.hatenablog.com/entry/2016/02/03/182803\" rel=\"nofollow noopener\" target=\"_blank\"\u003eparseIntとvalueOfの違いって何！？\u003c/a\u003e\u003c/p\u003e\n",
  "body": "#プログラミング勉強日記\n2020年11月17日\nコードを書いていて、`parseInt`と`valueOf`の違いがわからなかったので備忘録として残しておく。\n\n#違い\n　コードを実行したときに結果が同じになる。調べてみると\u003cb\u003e戻り値が違う\u003c/b\u003eと出てきた。具体的には、`parseInt`がint型やchar型などのプリミティブ型で`valueOf`はIntegerクラスを返す。\n\n```java\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        int hoge = Integer.valueOf(\"12345\");\n        System.out.println(hoge);\n        \n        int fuga = Integer.parseInt(\"12345\");\n        System.out.println(fuga);\n    }\n}\n```\n\n```:実行結果\n12345\n12345\n```\n\n\n\n\n#参考文献\n[parseIntとvalueOfの違い](http://welovy.hatenablog.com/entry/2013/04/28/121057)\n[parseIntとvalueOfの違いって何！？](https://tomoprog.hatenablog.com/entry/2016/02/03/182803)\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:44:41+09:00",
  "group": null,
  "id": "7c9fc853c5fabed1dfb4",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "Java",
    "versions": []
  }, {
    "name": "初心者",
    "versions": []
  }, {
    "name": "valueOf",
    "versions": []
  }, {
    "name": "parseInt",
    "versions": []
  }, {
    "name": "プログラミング勉強日記",
    "versions": []
  }],
  "title": "【Java】parseIntとvalueOfの違い",
  "updated_at": "2020-11-17T21:44:41+09:00",
  "url": "https://qiita.com/mzmz__02/items/7c9fc853c5fabed1dfb4",
  "user": {
    "description": "2020年5月から毎日投稿しています。\r\nフロントエンドエンジニアを目指し、独学で勉強中です。\r\n大学3年生で現在就職活動中です。",
    "facebook_id": "mai.kamihori",
    "followees_count": 1,
    "followers_count": 42,
    "github_login_name": "mzmz02",
    "id": "mzmz__02",
    "items_count": 190,
    "linkedin_id": "",
    "location": "",
    "name": "Mai",
    "organization": "",
    "permanent_id": 642821,
    "profile_image_url": "https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/642821/9da7e80e79595c8e3b4abee6b0d02eae3a0ce5e8/large.png?1602584550",
    "team_only": false,
    "twitter_screen_name": "mai74747304",
    "website_url": "https://www.instagram.com/bb___m13"
  },
  "page_views_count": null
}, {
  "rendered_body": "\n\u003ch2\u003e\n\u003cspan id=\"google-driveの画像をどうしてもgoogle-chatに投稿したかった\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#google-drive%E3%81%AE%E7%94%BB%E5%83%8F%E3%82%92%E3%81%A9%E3%81%86%E3%81%97%E3%81%A6%E3%82%82google-chat%E3%81%AB%E6%8A%95%E7%A8%BF%E3%81%97%E3%81%9F%E3%81%8B%E3%81%A3%E3%81%9F\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eGoogle Driveの画像をどうしてもGoogle Chatに投稿したかった\u003c/h2\u003e\n\n\u003cp\u003eGoogle Apps Script で、SpreadSheet を読み込んで、そこに書かれたテキストや Google Drive に格納された画像ファイルをいい感じにまとめて Google Chat にポストしたかった。\u003cbr\u003e\n全部 Google だし、楽勝だろうと思っていたが、Google Drive の画像がなかなか表示できなかった。\u003c/p\u003e\n\n\u003cp\u003eググると、Share URL にパラメータをつければ見れる！みたいなことがそこらじゅうに書いてあったが、どれもうまく行かなかった。たぶん、かつてはうまく行っていたんだろうと思う。\u003cbr\u003e\nそこで、まずは素直に DriveApp を使ってみた。\u003c/p\u003e\n\n\u003cblockquote\u003e\n\u003cp\u003e\u003ca href=\"https://developers.google.com/apps-script/reference/drive/file\" rel=\"nofollow noopener\" target=\"_blank\"\u003eClass File\u003c/a\u003e\u003c/p\u003e\n\u003c/blockquote\u003e\n\n\u003cp\u003eが、DriveApp で取得できる URL は、そのままでは Chat ではうまく表示できない URL（getUrl メソッド）か、ダウンロードが始まる URL（getDownloadUrl メソッド）だけで、欲しいものではなかった。\u003c/p\u003e\n\n\u003cp\u003e最終的に、Google Drive API v3 を利用して、サムネイル画像をなんとか引っ張ってきて表示することができた。サムネイルだけなのは、AWS S3 みたいに画像ストレージとしては使えないよってことなんだろうと理解した。\u003c/p\u003e\n\n\u003cp\u003eこの記事は「サムネイルじゃダメなんだ！」という方の参考にはならない。\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"手っ取り早く1つのファイルのリンクだけ取得する\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E6%89%8B%E3%81%A3%E5%8F%96%E3%82%8A%E6%97%A9%E3%81%8F1%E3%81%A4%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%A0%E3%81%91%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e手っ取り早く1つのファイルのリンクだけ取得する\u003c/h2\u003e\n\n\u003cp\u003e1つだけ分かれば良いという人は、ここ(\u003ca href=\"https://developers.google.com/apps-script/reference/drive/file\" rel=\"nofollow noopener\" target=\"_blank\"\u003eFiles: get\u003c/a\u003e)に行って、fields に thumbnailLink と入れて実行すれば良い。\u003c/p\u003e\n\n\u003cp\u003e\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F245908%2Ffad93a1b-f737-fea9-2751-fcb2a74fdf13.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=f76316c974d072b4349c3e737daae214\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F245908%2Ffad93a1b-f737-fea9-2751-fcb2a74fdf13.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=f76316c974d072b4349c3e737daae214\" width=\"400\" alt=\"Try this API\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245908/fad93a1b-f737-fea9-2751-fcb2a74fdf13.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F245908%2Ffad93a1b-f737-fea9-2751-fcb2a74fdf13.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=50537f359dccc4ffd96a0cfd0492cb06 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003eその他の値は、ここ（\u003ca href=\"https://developers.google.com/drive/api/v3/reference/files\" rel=\"nofollow noopener\" target=\"_blank\"\u003eFiles\u003c/a\u003e）に、どんなものが返ってくるか書いてあるので、それを参考に。\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"google-drive-api\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#google-drive-api\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eGoogle Drive API\u003c/h2\u003e\n\n\u003cp\u003eまずは、Google Drive API を使えるようにする。\u003cbr\u003e\n最初に、Google Apps Script の Editor のメニューで、Resources \u0026gt; Advanced Google Serviceにて、Drive API を On にする。\u003cbr\u003e\n次に、Token を取得する。\u003c/p\u003e\n\n\u003cblockquote\u003e\n\u003cp\u003e\u003ca href=\"https://qiita.com/iwaseasahi/items/2363dc1d246bc06baeae\" id=\"reference-354acf416b7a599cc0af\"\u003eGoogle API OAuth2.0のアクセストークン\u0026amp;リフレッシュトークン取得手順 2017年2月版\u003c/a\u003e\u003c/p\u003e\n\u003c/blockquote\u003e\n\n\u003cp\u003e3年前の記事で、画面が色々と変わっていたが、だいたいこの手順でできた。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"json\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"w\"\u003e\n  \u003c/span\u003e\u003cspan class=\"nl\"\u003e\"access_token\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"s2\"\u003e\"ya29.A0A...\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"w\"\u003e\n  \u003c/span\u003e\u003cspan class=\"nl\"\u003e\"expires_in\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"mi\"\u003e3599\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"w\"\u003e\n  \u003c/span\u003e\u003cspan class=\"nl\"\u003e\"refresh_token\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"s2\"\u003e\"1//0e5...\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"w\"\u003e\n  \u003c/span\u003e\u003cspan class=\"nl\"\u003e\"scope\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"s2\"\u003e\"https://www.googleapis.com/auth/drive\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\u003cspan class=\"w\"\u003e\n  \u003c/span\u003e\u003cspan class=\"nl\"\u003e\"token_type\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"s2\"\u003e\"Bearer\"\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"p\"\u003e}\u003c/span\u003e\u003cspan class=\"err\"\u003e%\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003eこんなようなものが返ってくる。割とすぐ Expire しちゃうので、アプリケーション内で使う場合は、リフレッシュする仕組みも実装しておかないといけない。\u003cbr\u003e\nrefresh_token はどれくらいで Expire するのか分からないが、6ヶ月くらいらしい。\u003c/p\u003e\n\n\u003cblockquote\u003e\n\u003cp\u003e\u003ca href=\"https://qiita.com/yosshi4486/items/7ec5fdd53577c8663603\" id=\"reference-a22442f3ac31a2b1af71\"\u003eアプリで「ログインしっぱなし」はどのように実現されているか？\u003c/a\u003e\u003c/p\u003e\n\u003c/blockquote\u003e\n\n\u003cp\u003eここにあるように、refresh_token も毎回取り替えるのが良いようだ。Google Apps Script だと…と悩ましいところではあるが、まぁ美しくなくてもなんとかなるだろう。今回は省略。\u003c/p\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"google-apps-script\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#google-apps-script\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003eGoogle Apps Script\u003c/h2\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"javascript\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"kd\"\u003efunction\u003c/span\u003e \u003cspan class=\"nx\"\u003egetDriveImageUrlById\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003eid\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"nx\"\u003eaccesstoken\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eya29.A0A...\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n  \u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"nx\"\u003efetchUrl\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003ehttps://www.googleapis.com/drive/v3/files/\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e \u003cspan class=\"o\"\u003e+\u003c/span\u003e \u003cspan class=\"nx\"\u003eid\u003c/span\u003e \u003cspan class=\"o\"\u003e+\u003c/span\u003e \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003e?fields=thumbnailLink\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e;\u003c/span\u003e\n  \u003cspan class=\"kd\"\u003econst\u003c/span\u003e \u003cspan class=\"nx\"\u003eoption\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003emethod\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eGET\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n    \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eheaders\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n      \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eAuthorization\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eBearer \u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e \u003cspan class=\"o\"\u003e+\u003c/span\u003e \u003cspan class=\"nx\"\u003eaccesstoken\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n      \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eAccept\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eapplication/json\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n    \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n  \u003cspan class=\"kd\"\u003evar\u003c/span\u003e \u003cspan class=\"nx\"\u003eresponse\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003eUrlFetchApp\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003efetch\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003efetchUrl\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"nx\"\u003eoption\u003c/span\u003e\u003cspan class=\"p\"\u003e);\u003c/span\u003e\n  \u003cspan class=\"kd\"\u003evar\u003c/span\u003e \u003cspan class=\"nx\"\u003eresult\u003c/span\u003e \u003cspan class=\"o\"\u003e=\u003c/span\u003e \u003cspan class=\"nx\"\u003eJSON\u003c/span\u003e\u003cspan class=\"p\"\u003e.\u003c/span\u003e\u003cspan class=\"nx\"\u003eparse\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003eresponse\u003c/span\u003e\u003cspan class=\"p\"\u003e);\u003c/span\u003e\n  \u003cspan class=\"k\"\u003ereturn\u003c/span\u003e \u003cspan class=\"nx\"\u003eresult\u003c/span\u003e\u003cspan class=\"p\"\u003e[\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003ethumbnailLink\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e];\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003eToken の取り替えは一旦忘れると、こんな感じにすればサムネイルの URL が取れる。\u003cbr\u003e\nOption は、前述の Try this API を実行すると出てくる curl コマンドの例で、API key を無視したものになっている。他の言語でも同様のことをすれば良い。\u003c/p\u003e\n\n\u003cp\u003eGoogle Drive API の戻り値は、\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"json\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"p\"\u003e{\u003c/span\u003e\u003cspan class=\"w\"\u003e\n  \u003c/span\u003e\u003cspan class=\"nl\"\u003e\"thumbnailLink\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e\u003cspan class=\"w\"\u003e \u003c/span\u003e\u003cspan class=\"s2\"\u003e\"https://...\"\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003cspan class=\"p\"\u003e}\u003c/span\u003e\u003cspan class=\"w\"\u003e\n\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003cp\u003eという感じで、Object で返ってくるので、そのままプロパティにアクセスできるかと思ったが、parse しないとアクセスできなかった。なんか、このあたりの扱いはいまいち良く分かっていない。\u003c/p\u003e\n\n\u003cp\u003eともあれ、サムネイルの URL が取得できたので、Cards のフォーマットに整形する。\u003c/p\u003e\n\n\u003cblockquote\u003e\n\u003cp\u003e\u003ca href=\"https://developers.google.com/hangouts/chat/reference/message-formats/cards\" rel=\"nofollow noopener\" target=\"_blank\"\u003eCard Formatting Messages\u003c/a\u003e\u003c/p\u003e\n\u003c/blockquote\u003e\n\n\u003cp\u003eフォーマットはここを見ながら。\u003c/p\u003e\n\n\u003cdiv class=\"code-frame\" data-lang=\"javascript\"\u003e\u003cdiv class=\"highlight\"\u003e\u003cpre\u003e\u003cspan class=\"kd\"\u003efunction\u003c/span\u003e \u003cspan class=\"nx\"\u003egetCard\u003c/span\u003e\u003cspan class=\"p\"\u003e(\u003c/span\u003e\u003cspan class=\"nx\"\u003etitle\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"nx\"\u003eimage\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e \u003cspan class=\"nx\"\u003etext\u003c/span\u003e\u003cspan class=\"p\"\u003e)\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n  \u003cspan class=\"k\"\u003ereturn\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n    \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003ecards\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\n      \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n        \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eheader\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n          \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003etitle\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"nx\"\u003etitle\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n          \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003esubtitle\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eHoliday Knowledge Sharing\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n          \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eimageUrl\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003ehttps://....\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e,\u003c/span\u003e\n          \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eimageStyle\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eIMAGE\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\n        \u003cspan class=\"p\"\u003e},\u003c/span\u003e\n        \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003esections\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\n          \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n            \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003ewidgets\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\n              \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n                \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eimage\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n                  \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003eimageUrl\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"nx\"\u003eimage\u003c/span\u003e\n                \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n              \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n            \u003cspan class=\"p\"\u003e]\u003c/span\u003e\n          \u003cspan class=\"p\"\u003e},\u003c/span\u003e\n          \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n            \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003ewidgets\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e[\u003c/span\u003e\n              \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n                \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003etextParagraph\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"p\"\u003e{\u003c/span\u003e\n                  \u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"s2\"\u003etext\u003c/span\u003e\u003cspan class=\"dl\"\u003e\"\u003c/span\u003e\u003cspan class=\"p\"\u003e:\u003c/span\u003e \u003cspan class=\"nx\"\u003etext\u003c/span\u003e\n                \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n              \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n            \u003cspan class=\"p\"\u003e]\u003c/span\u003e\n          \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n        \u003cspan class=\"p\"\u003e]\u003c/span\u003e\n      \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n    \u003cspan class=\"p\"\u003e]\u003c/span\u003e\n  \u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003cspan class=\"p\"\u003e}\u003c/span\u003e\n\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n\n\u003ch2\u003e\n\u003cspan id=\"結果と余談\" class=\"fragment\"\u003e\u003c/span\u003e\u003ca href=\"#%E7%B5%90%E6%9E%9C%E3%81%A8%E4%BD%99%E8%AB%87\"\u003e\u003ci class=\"fa fa-link\"\u003e\u003c/i\u003e\u003c/a\u003e結果と余談\u003c/h2\u003e\n\n\u003cp\u003e上記の実行結果ではないが、結果として、こんなようなものが Google Chat にポストされる。\u003cbr\u003e\n\u003ca href=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F245908%2F041f8942-c825-ba5d-1bc8-7f914cf4abfd.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=eb9add7d6e31f54b0d471456c74937d1\" target=\"_blank\" rel=\"nofollow noopener\"\u003e\u003cimg src=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F245908%2F041f8942-c825-ba5d-1bc8-7f914cf4abfd.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;s=eb9add7d6e31f54b0d471456c74937d1\" width=\"400\" alt=\"Card\" data-canonical-src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245908/041f8942-c825-ba5d-1bc8-7f914cf4abfd.png\" srcset=\"https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F245908%2F041f8942-c825-ba5d-1bc8-7f914cf4abfd.png?ixlib=rb-1.2.2\u0026amp;auto=format\u0026amp;gif-q=60\u0026amp;q=75\u0026amp;w=1400\u0026amp;fit=max\u0026amp;s=4c716f90f6012ae07df18033b2877f60 1x\" loading=\"lazy\"\u003e\u003c/a\u003e\u003cbr\u003e\n今回の内容は、私の会社は、日本とベトナムにオフィスがあり、お互いの国の祝日の情報をシェアしようという企画で作った。\u003c/p\u003e\n\n\u003cp\u003eGlobalization の流れの中、大事だと思うのは言葉、ではなく、やはりカルチャーの相互理解である。言葉が理解出来ても、コンテキストおよびそのコンテキストが成立し得る背景が分からないと、全然何いってるのか分からないということは、しょっちゅうある。なので、こういうのは割と効く。\u003c/p\u003e\n\n\u003cp\u003eおしまい。\u003c/p\u003e\n",
  "body": "## Google Driveの画像をどうしてもGoogle Chatに投稿したかった\n\nGoogle Apps Script で、SpreadSheet を読み込んで、そこに書かれたテキストや Google Drive に格納された画像ファイルをいい感じにまとめて Google Chat にポストしたかった。\n全部 Google だし、楽勝だろうと思っていたが、Google Drive の画像がなかなか表示できなかった。\n\nググると、Share URL にパラメータをつければ見れる！みたいなことがそこらじゅうに書いてあったが、どれもうまく行かなかった。たぶん、かつてはうまく行っていたんだろうと思う。\nそこで、まずは素直に DriveApp を使ってみた。\n\n\u003e [Class File](https://developers.google.com/apps-script/reference/drive/file)\n\nが、DriveApp で取得できる URL は、そのままでは Chat ではうまく表示できない URL（getUrl メソッド）か、ダウンロードが始まる URL（getDownloadUrl メソッド）だけで、欲しいものではなかった。\n\n最終的に、Google Drive API v3 を利用して、サムネイル画像をなんとか引っ張ってきて表示することができた。サムネイルだけなのは、AWS S3 みたいに画像ストレージとしては使えないよってことなんだろうと理解した。\n\nこの記事は「サムネイルじゃダメなんだ！」という方の参考にはならない。\n\n## 手っ取り早く1つのファイルのリンクだけ取得する\n\n1つだけ分かれば良いという人は、ここ([Files: get](https://developers.google.com/apps-script/reference/drive/file))に行って、fields に thumbnailLink と入れて実行すれば良い。\n\n\u003cimg src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245908/fad93a1b-f737-fea9-2751-fcb2a74fdf13.png\" width=\"400\" alt=\"Try this API\"\u003e\n\nその他の値は、ここ（[Files](https://developers.google.com/drive/api/v3/reference/files)）に、どんなものが返ってくるか書いてあるので、それを参考に。\n\n\n\n## Google Drive API\n\nまずは、Google Drive API を使えるようにする。\n最初に、Google Apps Script の Editor のメニューで、Resources \u003e Advanced Google Serviceにて、Drive API を On にする。\n次に、Token を取得する。\n\n\u003e [Google API OAuth2.0のアクセストークン\u0026リフレッシュトークン取得手順 2017年2月版](https://qiita.com/iwaseasahi/items/2363dc1d246bc06baeae)\n\n3年前の記事で、画面が色々と変わっていたが、だいたいこの手順でできた。\n\n```json\n{\n  \"access_token\": \"ya29.A0A...\",\n  \"expires_in\": 3599,\n  \"refresh_token\": \"1//0e5...\",\n  \"scope\": \"https://www.googleapis.com/auth/drive\",\n  \"token_type\": \"Bearer\"\n}%\n```\n\nこんなようなものが返ってくる。割とすぐ Expire しちゃうので、アプリケーション内で使う場合は、リフレッシュする仕組みも実装しておかないといけない。\nrefresh_token はどれくらいで Expire するのか分からないが、6ヶ月くらいらしい。\n\n\u003e [アプリで「ログインしっぱなし」はどのように実現されているか？](https://qiita.com/yosshi4486/items/7ec5fdd53577c8663603)\n\nここにあるように、refresh_token も毎回取り替えるのが良いようだ。Google Apps Script だと…と悩ましいところではあるが、まぁ美しくなくてもなんとかなるだろう。今回は省略。\n\n\n## Google Apps Script\n\n```javascript\nfunction getDriveImageUrlById(id) {\n  const accesstoken = \"ya29.A0A...\";\n  const fetchUrl = \"https://www.googleapis.com/drive/v3/files/\" + id + \"?fields=thumbnailLink\";\n  const option = {\n    \"method\": \"GET\",\n    \"headers\": {\n      \"Authorization\": \"Bearer \" + accesstoken,\n      \"Accept\": \"application/json\",\n    }\n  }\n  var response = UrlFetchApp.fetch(fetchUrl, option);\n  var result = JSON.parse(response);\n  return result[\"thumbnailLink\"];\n}\n```\n\nToken の取り替えは一旦忘れると、こんな感じにすればサムネイルの URL が取れる。\nOption は、前述の Try this API を実行すると出てくる curl コマンドの例で、API key を無視したものになっている。他の言語でも同様のことをすれば良い。\n\nGoogle Drive API の戻り値は、\n\n```json\n{\n  \"thumbnailLink\": \"https://...\"\n}\n```\n\nという感じで、Object で返ってくるので、そのままプロパティにアクセスできるかと思ったが、parse しないとアクセスできなかった。なんか、このあたりの扱いはいまいち良く分かっていない。\n\nともあれ、サムネイルの URL が取得できたので、Cards のフォーマットに整形する。\n\n\u003e [Card Formatting Messages](https://developers.google.com/hangouts/chat/reference/message-formats/cards)\n\nフォーマットはここを見ながら。\n\n```javascript\nfunction getCard(title, image, text) {\n  return {\n    \"cards\": [\n      {\n        \"header\": {\n          \"title\": title,\n          \"subtitle\": \"Holiday Knowledge Sharing\",\n          \"imageUrl\": \"https://....\",\n          \"imageStyle\": \"IMAGE\"\n        },\n        \"sections\": [\n          {\n            \"widgets\": [\n              {\n                \"image\": {\n                  \"imageUrl\": image\n                }\n              }\n            ]\n          },\n          {\n            \"widgets\": [\n              {\n                \"textParagraph\": {\n                  \"text\": text\n                }\n              }\n            ]\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\n## 結果と余談\n\n上記の実行結果ではないが、結果として、こんなようなものが Google Chat にポストされる。\n\u003cimg src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245908/041f8942-c825-ba5d-1bc8-7f914cf4abfd.png\" width=\"400\" alt=\"Card\"\u003e\n今回の内容は、私の会社は、日本とベトナムにオフィスがあり、お互いの国の祝日の情報をシェアしようという企画で作った。\n\nGlobalization の流れの中、大事だと思うのは言葉、ではなく、やはりカルチャーの相互理解である。言葉が理解出来ても、コンテキストおよびそのコンテキストが成立し得る背景が分からないと、全然何いってるのか分からないということは、しょっちゅうある。なので、こういうのは割と効く。\n\nおしまい。\n",
  "coediting": false,
  "comments_count": 0,
  "created_at": "2020-11-17T21:42:14+09:00",
  "group": null,
  "id": "9c692e26d689bee3e093",
  "likes_count": 0,
  "private": false,
  "reactions_count": 0,
  "tags": [{
    "name": "GoogleAppsScript",
    "versions": []
  }, {
    "name": "GoogleDriveAPI",
    "versions": []
  }, {
    "name": "HangoutsChat",
    "versions": []
  }, {
    "name": "GoogleChat",
    "versions": []
  }],
  "title": "Google Drive上の画像（のサムネイル）URLを取得する方法",
  "updated_at": "2020-11-17T21:42:14+09:00",
  "url": "https://qiita.com/kurab/items/9c692e26d689bee3e093",
  "user": {
    "description": "最近はコードはあんまり書きません。",
    "facebook_id": "",
    "followees_count": 1,
    "followers_count": 4,
    "github_login_name": "kurab",
    "id": "kurab",
    "items_count": 28,
    "linkedin_id": "hiroshi-kurabayashi-b0359924/",
    "location": "Tokyo",
    "name": "倉林 寛至",
    "organization": "",
    "permanent_id": 245908,
    "profile_image_url": "https://avatars2.githubusercontent.com/u/9692738?v=4",
    "team_only": false,
    "twitter_screen_name": null,
    "website_url": ""
  },
  "page_views_count": null
}];
},{}],"node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel/src/builtins/bundle-url.js"}],"node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      // prevent record.options._Ctor from being overwritten accidentally
      newCtor.options._Ctor = record.options._Ctor
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"components/App.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _markdown = require("markdown");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const qitems = require("./list.json");

function fetch() {
  return new Promise(ok => setTimeout(() => ok({
    json: () => qitems
  }), 2000));
}

var _default = {
  beforeMount() {
    this.fetchList();
  },

  data() {
    return {
      loading: false,
      list: []
    };
  },

  methods: {
    async fetchList() {
      this.loading = true;
      const response = await fetch("http://qiita.com/api/v2/items?page=1&per_page=20");
      const items = await response.json();
      this.loading = false;
      this.list = items.map(it => (console.log(it.name), {
        title: it.title,
        abstract: extractText(_markdown.markdown.parse(it.body)).slice(0, 200),
        body: it.rendered_body,
        userName: it.user.name || it.user.id || it.user.github_login_name
      }));
    }

  }
};
exports.default = _default;

function extractText(parsed) {
  if (typeof parsed === "string") {
    return parsed;
  }

  switch (parsed[0]) {
    case "header":
    case "link":
      return parsed.slice(2).map(it => extractText(it)).join("");

    case "link_ref":
      return "<LinkRef>";

    case "img":
      return "<Image>";

    case "markdown":
      return parsed.slice(1).map(it => extractText(it)).join(" ");

    default:
      return parsed.slice(1).map(it => extractText(it)).join("");
  }
}
        var $3e55c1 = exports.default || module.exports;
      
      if (typeof $3e55c1 === 'function') {
        $3e55c1 = $3e55c1.options;
      }
    
        /* template */
        Object.assign($3e55c1, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm._m(0),
    _vm._v(" "),
    _c("main", { staticStyle: { overflow: "scroll" } }, [
      _c(
        "div",
        { staticStyle: { display: "flex", "justify-content": "center" } },
        [
          _vm.loading
            ? _c("img", {
                staticStyle: { width: "120px" },
                attrs: {
                  src:
                    "http://www.lettersmarket.com/uploads/lettersmarket/blog/loaders/common_orange/ajax_loader_orange_128.gif"
                }
              })
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      !_vm.loading
        ? _c(
            "section",
            _vm._l(_vm.list, function(item) {
              return _c("aside", { key: item.id }, [
                _c("h3", [_vm._v(_vm._s(item.title))]),
                _vm._v(" "),
                _c("sup", [_vm._v(_vm._s(item.userName))]),
                _vm._v(" "),
                _c(
                  "p",
                  {
                    staticStyle: {
                      display: "-webkit-box",
                      "-webkit-line-clamp": "4",
                      "-webkit-box-orient": "vertical",
                      overflow: "hidden",
                      "word-break": "break-all"
                    }
                  },
                  [_vm._v(_vm._s(item.abstract))]
                )
              ])
            }),
            0
          )
        : _vm._e()
    ]),
    _vm._v(" "),
    _vm._m(1)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("header", [_c("h1", [_vm._v("Qiita list")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("footer", [
      _c("p", [
        _vm._v("Powered by "),
        _c("a", { attrs: { href: "https://qiita.com/" } }, [_vm._v("Qiita")])
      ])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$3e55c1', $3e55c1);
          } else {
            api.reload('$3e55c1', $3e55c1);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"markdown":"node_modules/markdown/lib/index.js","./list.json":"components/list.json","_css_loader":"node_modules/parcel/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppElement extends HTMLElement {
  constructor() {
    super();
    this.div = document.createElement("div");
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.innerHTML = "\n    <style>\n    @import 'https://unpkg.com/mvp.css';\n    * {\n      --border-radius: 5px;\n      --box-shadow: 2px 2px 10px;\n      --color: #118bee;\n      --color-accent: #118bee0b;\n      --color-bg: #fff;\n      --color-bg-secondary: #e9e9e9;\n      --color-secondary: #920de9;\n      --color-secondary-accent: #920de90b;\n      --color-shadow: #f4f4f4;\n      --color-text: #000;\n      --color-text-secondary: #999;\n      --font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;\n      --hover-brightness: 1.2;\n      --justify-important: center;\n      --justify-normal: left;\n      --line-height: 150%;\n      --width-card: 285px;\n      --width-card-medium: 460px;\n      --width-card-wide: 800px;\n      --width-content: 1080px;\n    }\n    </style>";
    this.shadowRoot.append(this.div);
  }

  connectedCallback() {
    new _vue.default(_App.default).$mount(this.div);
  }

}

customElements.define("qiita-list", AppElement);
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js","./components/App":"components/App.vue"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59269" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/qiita.e31bb0bc.js.map