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
 * 113-----201行代码-------------------------
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

 
