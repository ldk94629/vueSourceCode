(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Vue = factory());
  }(this, function () { 'use strict';

}))

/*如下*/
/**
 * 匿名传参
 * (function(a){ console.log(a)}(this))
 */
if(typeof exports==="object"&&typeof module!=="undefined" ){
    // 检查commonJs
    module.exports=factory();

}else{
    if(typeof define==="function"&&define.amd){
        //AMD 异步模块 检查javascript 以来管理库require.js的存在
        define(factory)
    }else{
        (global =global || self ,global.Vue=factory())
    }
}
//等价于
window.Vuw=factory();

  /*11-111判断类型的方法;  */-

  var emptyObject = Object.freeze({});//冻结的对象;无法修改

  // These helpers produce better VM code in JS engines due to their
  // explicitness and function inlining.
  /**
   * 判断是否为未定义
   * @param {any} v 
   * @returns false/true (boolean)
   */
  function isUndef (v) {
    return v === undefined || v === null
  }
/**
 * 判断已定义
 * @param {any} v 
 * @returns boolean 
 */
  function isDef (v) {
    return v !== undefined && v !== null
  }

  function isTrue (v) {
    return v === true
  }

  function isFalse (v) {
    return v === false
  }

  /**
   * Check if value is primitive(原始类型).
   */
  function isPrimitive (value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      // $flow-disable-line
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
  }

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }

  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString = Object.prototype.toString;
// 判断基本类型
  function toRawType (value) {
    return _toString.call(value).slice(8, -1)
  }

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
//   盘代码纯粹的对象;
  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }
// 是否是正则对象
  function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
  }

  /**
   * Check if val is a valid array index.
   */
//   是否是正无穷大的负整数;
  function isValidArrayIndex (val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val)
  }
//   判断是promise
  function isPromise (val) {
    return (
      isDef(val) &&
      typeof val.then === 'function' &&
      typeof val.catch === 'function'
    )
  }

  /**
   * Convert a value to a string that is actually rendered.
   */
/**
 * 
 * @param {any} val 
 * @returns String
 * Array->JSON.stringify(val,null,2)->前后补两个空格;具体不知道为啥.....
 */
  function toString (val) {
    return val == null
      ? ''
      : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val)
  }

  /**
   * Convert an input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  //转换为number 
/**
 * 
 * @param {any} val 
 * @returns Number
 * parseFloat();讲字符串转为小数数值;
 */
  function toNumber (val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
  }

/**
 * 113-----195行代码-------------------------
 */

/**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  /**
   * 讲String类型切割放在map中;用于校验其中的某个字符串是否存在于map中(区分大小写)
   * @param {String} str 
   * @param {boolean} expectsLowerCase //小写 是否区分大小写;默认(false)区分;
   * @returns 用于校验其中的某个字符串是否存在于map中(区分大小写)的function; 
   */
 function makeMap (
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;//有为true;否则为undefined;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }
  //调用makeMap的实例
 var  str= makeMap ('1,2,3,4,s,f,g',true)
 str(1)//--------true

  /**
   * Check if a tag is a built-in tag.
   */
 /**
  * 判断是否为内置标签;
  * 不区分大小写
  */
  var isBuiltInTag = makeMap('slot,component', true);
       isBuiltInTag('slot')//-----true;
       isBuiltInTag('slot1')//------undefined;
  /**
   * Check if an attribute is a reserved attribute.
   */
  /**
   * 判断是否为保留属性
   * 区分大小写
   */
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
  

  /**
   * Remove an item from an array.
   */
  /**
   * 数组移除元素的方法;
   * @param {Array} arr 
   * @param {any} item 
   * @returns 移除的元素
   */
  function remove (arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }

  /**
   * Check whether an object has the property.
   */

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * 判断对象是否含有某个属性;
   * @param {Object} obj 
   * @param {String} key 
   * @returns  boolean;
   */
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }

  /**
   * Create a cached version of a pure function.
   */
  /**
   * 创建一个cache对象用于缓存运行fn的运行结果
   * @param {Function} fn 
   * @returns 一个function;运行可以获得fn的运行结果;有就取没有就调用fn;
   */
  function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
    })
  }
  /**
   * cached的实例;
   */
  function arr(a) {
      return a
  }
  var s = cached(arr)
  s(1)

  /**
   * Camelize a hyphen-delimited string.
   * 将连字符分隔的字符串驼峰化
   * function (_, c);_为匹配到的字符; c就是要变为大写的字母;
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
  });
//   其中的 _ 为匹配到的字符;c匹配到字符中的非特殊符号的字符;会把其中的非特殊符号的字符陆续放在后边位置;结束后下一为为每次匹配到的开始位置,下一位为str本身;
  str. replace(camelizeRE, function (_, c,d,e){
    onsole.log(_,c,d,e,)
  })
  /**
   * Capitalize a string.
   */
  /**
   * 首字符大写
   */
  var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  });

  /**
   * Hyphenate a camelCase string.
   * 用连字符连接驼峰写法
   * \B非单词边界
   * $1就是正则中匹配到的内容
   */
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
  });

/********195-329 */ 

  /**
   * Simple bind polyfill for environments that do not support it,
   * e.g., PhantomJS 1.x. Technically, we don't need this anymore
   * since native bind is now performant enough in most browsers.
   * But removing it would mean breaking code that was able to run in
   * PhantomJS 1.x, so this must be kept for backward compatibility.
   */

  /* istanbul ignore next */
  function polyfillBind (fn, ctx) {
    function boundFn (a) {
      var l = arguments.length;
      return l
        ? l > 1
          ? fn.apply(ctx, arguments)
        : fn.call(ctx)
          : fn.call(ctx, a)
    }

    boundFn._length = fn.length;
    return boundFn
  }
  /**原生的bind */
  function nativeBind (fn, ctx) {
    return fn.bind(ctx)
  }

  var bind = Function.prototype.bind
    ? nativeBind
    : polyfillBind;

  /**
   * Convert an Array-like object to a real Array.
   * 将像数组的转化为真数组;
   * @params {Array-like} list;
   * @params {String,Number} start开始转换的位置;
   */
  function toArray (list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret
  }

  /**
   * Mix properties into target object.
   * 将多个属性插入目标对象;
   * from->to;
   */
  function extend (to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to
  }

  /**
   * Merge an Array of Objects into a single Object.
   * 将对象数组转换位单个对象
   * @params {Array} arr   var arr=['111111111']其中[1,1,1,1,1,1,1,1,1]和['111111111']不生效;
   * return {Object}
   */
  function toObject (arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res
  }
  

  /* eslint-disable no-unused-vars */

  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
  function noop (a, b, c) {}

  /**
   * Always return false.
   * 为假
   */
  var no = function (a, b, c) { return false; };

  /* eslint-enable no-unused-vars */

  /**
   * Return the same value.
   * 返回自身
   */
  var identity = function (_) { return _; };

  /**
   * Generate a string containing static keys from compiler modules.
   * 从编译器模块生成包含静态键的字符串
   */
  function genStaticKeys (modules) {
    return modules.reduce(function (keys, m) {
      return keys.concat(m.staticKeys || [])
    }, []).join(',')
  }

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   * 判断对象的浅相等;
   * 
   */
  function looseEqual (a, b) {
    if (a === b) { return true }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function (e, i) {
            return looseEqual(e, b[i])
          })
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime()
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function (key) {
            return looseEqual(a[key], b[key])
          })
        } else {
          /* istanbul ignore next */
          return false
        }
      } catch (e) {
        /* istanbul ignore next */
        return false
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
  }

  //cached polyfillBind looseEqual 闭包 类型判断 函数之间的互相调用 
  /************330-----612 */
  
  /**
   * Return the first index at which a loosely equal value can be
   * found in the array
   * 返回index
   *  (if value is a plain object, the array must
   * contain an object of the same shape),
   * 如果是对象;则需要在arr中有形状相同的对象
   *  or -1 if it is not present.
   * 返回索引;否则执行looseEaual
   */

   function looseIndexOf (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) { return i }
    }
    return -1
  }

  /**
   * Ensure a function is called only once.
   * 保证一个方法只执行一次
   */
  function once (fn) {
    var called = false;
    return function () {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    }
  }

  var SSR_ATTR = 'data-server-rendered';//服务端渲染

  var ASSET_TYPES = [
    'component',//组件
    'directive',//指令
    'filter'//过滤函数
  ];
//声明周期
  var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
  ];

  /*  */


//全局配置;
  var config = ({
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line   自定义合并策略选项
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     * 是否制止警告 默认为false;设置为true 将不会有各种报错
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     * 开发模式下是否显示生产提示信息
     */
    productionTip: "development" !== 'production',

    /**
     * Whether to enable devtools
     * 是否允许vue-devtools 检查代码;浏览器环境默认为true;
     */
    devtools: "development" !== 'production',

    /**
     * Whether to record perf
     * 是否开启性能追踪;只能在开发模式下才支持;
     */
    performance: false,

    /**
     * Error handler for watcher errors
     * 指定组件的渲染和观察期间未捕获错误的处理函数,可获取错误信息和Vue实例
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     * 警告处理函数;可以获取错误信息和vue实例
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     * 忽略某些自定义元素;
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     * 给v-on自定义的键位别名;
     */
    // $flow-disable-line
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     * 检测标签是否被保留;如果是不能被注册为组件;
     */
    isReservedTag: no,

    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * 检查一个属性是否被保留，以便它不能被用作组件  
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,

    /**
     * Check if a tag is an unknown element.
     * 未知元素
     * Platform-dependent.
     */
    isUnknownElement: no,

    /**
     * Get the namespace of an element
     * 命名空间
     */
    getTagNamespace: noop,

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,

    /**
     * Check if an attribute must be bound using property, 
     * 检查是否必须绑定属性
     * e.g. value
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
  });

  /*  */

  /**
   * unicode letters used for parsing html tags, component names and property paths.
   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
   * 用于解析html标记、组件名称和属性pat的unicode字母
   */
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

  /**
   * Check if a string starts with $ or _
   * 检查变量的开头是否是$或者_
   */
  function isReserved (str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
  }

  /**
   * Define a property.
   * 在一个对象上定义一个属性的构造函数
   * @params {Boolean} enumerable
   */
  function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }
  
  /**
   * Parse simple path.
   * 解析简单的路径
   */
   var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
   function parsePath (path) {
     if (bailRE.test(path)) {
       return
     }
     var segments = path.split('.');
     return function (obj) {
       for (var i = 0; i < segments.length; i++) {
         if (!obj) { return }
         obj = obj[segments[i]];
       }
       return obj
     }
   }
 
   /*  */
 
   // can we use __proto__?
   是否利用隐式原型
   var hasProto = '__proto__' in {};
 
   // Browser environment sniffing
   //判断运行环境;
   var inBrowser = typeof window !== 'undefined';
   var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
   var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
   var UA = inBrowser && window.navigator.userAgent.toLowerCase();
   var isIE = UA && /msie|trident/.test(UA);
   var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
   var isEdge = UA && UA.indexOf('edge/') > 0;
   var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
   var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
   var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
   var isPhantomJS = UA && /phantomjs/.test(UA);
   var isFF = UA && UA.match(/firefox\/(\d+)/);
 
   // Firefox has a "watch" function on Object.prototype...
   //火狐的对象属性上拥有一个watch;
   var nativeWatch = ({}).watch;
 
   var supportsPassive = false;
   if (inBrowser) {
     try {
       var opts = {};
       Object.defineProperty(opts, 'passive', ({
         get: function get () {
           /* istanbul ignore next */
           supportsPassive = true;
         }
       })); // https://github.com/facebook/flow/issues/285
       window.addEventListener('test-passive', null, opts);
     } catch (e) {}
   }
 
   // this needs to be lazy-evaled because vue may be required before
   //是否为服务端渲染;
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
     return _isServer
   };
 
   // detect devtools
   var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
 
   /**
    * 
    *  istanbul ignore next
    * 判断是否为系统函数;
    * native;土生土长的;天然的
    *  */
   function isNative (Ctor) {
     return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
   }
 
   var hasSymbol =
     typeof Symbol !== 'undefined' && isNative(Symbol) &&
     typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
 
   var _Set;
   /* istanbul ignore if */ // $flow-disable-line
   if (typeof Set !== 'undefined' && isNative(Set)) {
     // use native Set when available.
     _Set = Set;
   } else {
     // a non-standard Set polyfill that only works with primitive keys.
     //设置一个set;



    //  Set {constructor: ƒ, has: ƒ, add: ƒ, delete: ƒ, clear: ƒ, …}add: ƒ add()clear: ƒ clear()constructor: ƒ Set()delete: ƒ delete()entries: ƒ entries()arguments: (...)caller: (...)length: 0name: "entries"[[Prototype]]: ƒ ()[[Scopes]]: Scopes[0]forEach: ƒ forEach()has: ƒ has()keys: ƒ values()size: (...)values: ƒ values()Symbol(Symbol.iterator): ƒ values()Symbol(Symbol.toStringTag): "Set"get size: ƒ size()[[Prototype]]: Object
     _Set = /*@__PURE__*/(function () {
       function Set () {
         this.set = Object.create(null);
       }
       Set.prototype.has = function has (key) {
         return this.set[key] === true
       };
       Set.prototype.add = function add (key) {
         this.set[key] = true;
       };
       Set.prototype.clear = function clear () {
         this.set = Object.create(null);
       };
 
       return Set;
     }());
   }
   


