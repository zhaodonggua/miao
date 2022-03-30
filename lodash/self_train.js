// 将传入的参数转化成一个回调函数,用于其他高阶函数的调用
function iteratee(param) {
    // 参数本身就是函数
    if (typeof param === 'function') {
        return param
    }
    // 参数为字符串
    if (typeof param === 'string') {
        return property(param)
    }
    // 参数为数组
    if (isArray(param)) {
        return matchesProperty(param)
    }
    // 参数为对象
    if (isObject(param)) {
        return matches(param)
    }
    // 啥都不是的时候,返回自身
    return param => param
}

/**
 * 创建一个返回给定对象的 path 的值的函数。
 *
 * @category Util
 * @param {Array|string} path 要得到值的属性路径
 * @returns {Function} 返回新的函数
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
//返回对象路径的属性值
function property(path) {
    return function (obj) {
        for (let item of toPath(path)) {
            obj = obj[item]
            if (!obj) return obj    // 错误处理: 当访问的对象不存在时直接返回
        }
        return obj;
    }
}
//一种写法
function get(obj, path) {
    var names = path.split('.')
    for (let name of names) {
        obj = obj[name]
        if (obj == null) return obj;
    }
    return obj
}

function get(obj, path) {
    var names = path.split('.')
    return names.reduce((obj, name) => {
        return obj ?? obj[name]
        //undefined 或者null走左边
    }, obj)

}


//简单版本
function property(path) {
    return function (obj) {
        return obj[path]
    }
}

/**
 * 转化 value 为属性路径的数组 。
 *
 * @category Util
 * @param {*} value 要转换的值
 * @returns {Array} 返回包含属性路径的数组。
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
function toPath(value) {
    // 直接使用正则表达式对字符串进行分词
    if (typeof value === 'string') {
        return value.match(/\w+/g)
    } else {
        // 针对value本身就是数组的情况
        return value
    }
}


// 创建一个深比较的方法来比较给定对象的 path 的值是否是 srcValue 。 
// 如果是返回 true ，否则返回 false 。
function matchesProperty(array) {
    return function (obj) {
        return isEqual(obj[array[0]], array[1])
    }
}






//判断对象是否满足source特性
function matches(source) {
    return function (obj) {
        return Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key])
    }
}

function matches(source) {
    return function (obj) {
        return isMatch(obj, source)
    }
}



function matches(sources) {
    return function (obj) {
        for (let attr in sources) {
            if (obj[attr] !== sources[attr]) {
                return false;
            }
        }
        return true;
    }


}








// src: 要遍历的目标,他的所有值要完全被包含在obj中
function isMatch(obj, src) {
    for (let key in src) {
        if (src[key] && typeof src[key] === 'object') {
            // 如果遍历到的键的值是对象,将此时对象的值再去做对比匹配
            if (!isMatch(obj[key], src[key])) {
                return false
            }
        } else {
            if (obj[key] !== src[key]) {
                return false
            }
        }
    }
    return true
}

//obj完全包含src的属性
//如果为object
function isMatch(obj, src) {
    for (let key in src) {
        if (src[key] && typeof src[key] == 'object') {
            if (!isMatch(obj[key], src[key])) {
                return false;
            }
        } else {
            if (obj[key] !== src[key]) {
                return false;
            }
        }
    }
    return true
}






// 执行深比较来确定两者的值是否相等。
/* 
  浅比较: 也称为引用相等, === 只是用来做 "浅比较" 检查左右两边是否是对同一个对象的引用
  深比较: 检查两个对象的所有属性是否都相等,需要递归的检测,深比较不管这两个对象是不是同一对象的应用.
          只要两个对象结构组织图完全一样就相等.
*/
function isEqual(value, other) {
    // 判断是不是两个对象是不是引用数据类型,不是的话直接比较值
    if (!isObject(value) || !isObject(other)) {
        return value === other
    }

    // 比较是否为同一个内存地址
    if (value === other) {
        return true
    }

    // 比较 key 的数量
    let obj1KeysLen = Object.keys(value).length
    let obj2KeysLen = Object.keys(other).length
    if (obj1KeysLen !== obj2KeysLen) return false

    // 递归的比较 value 
    for (let key in value) {
        let res = isEqual(value[key], other[key]);
        if (!res) return false      // 递归遍历的时候如果遇到不等,直接返回false
    }
    return true
}
