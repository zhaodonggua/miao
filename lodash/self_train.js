// 将传入的参数转化成一个回调函数,用于其他高阶函数的调用
function iteratee(param) {
    // 参数本身就是函数
    if (typeof param === 'function') {
        return param
    }
    // 参数为字符串
    //如果参数为属性名，则返回属性值
    if (typeof param === 'string') {
        return property(param)
    }
    // 参数为数组
    // 包含属性和参数则return true,否则为false
    if (isArray(param)) {
        return matchesProperty(param)
    }
    // 参数为对象
    //包含这个对象则return true,否则return false
    if (isObject(param)) {
        return matches(param)
    }
    // 啥都不是的时候,返回自身
    return param => param

}
function isArguments(value) {
    return Object.prototype.toString.call(value) == '[object Arguments]'
}

function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]'
}

function isArrayLike(value) {
    return value.length ? true : false
}

function isArrayLikeObject(value) {
    if (typeof (value) == 'object' && value.length) {
        return true
    }
    return false
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

function matchesProperty(path, value) {
    return function (obj) {
        return obj[path] === value
    }
}

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

function filter(collection, predicate = identity) {
    predicate = iteratee(predicate)
    let res = []
    for (let key in collection) {
        if (predicate(collection[key])) {
            res.push(collection[key])
        }
    }
    return res

}

//_.every, _.filter, _.map, _.mapValues, _.reject, and _.some.
//iteratee函数训练
function map(collection, identity) {
    identity = iteratee(identity)
    let res = []
    for (let key in collection) {
        res.push(identity(collection[key]))
    }
    return res
}

function filter(collection, predicate = identity) {
    predicate = iteratee(predicate)
    let res = []
    for (let key in collection) {
        if (predicate(collection[key], key, collection)) {
            res.push(collection[key])
        }
    }
}

function every(collection, predicate = identity) {
    predicate = iteratee(predicate)
    for (let key in collection) {
        if (!predicate(collection[key], key, collection)) {
            return false
        }
    }
    return true
}
function mapValues(object, iteratee2 = identity) {
    predicate = iteratee(iteratee2)
    let res = {}
    for (let key in object) {
        res[key] = predicate(object[key], key, object)
    }
    return res
}
// 将传入的参数转化成一个回调函数,用于其他高阶函数的调用
function iteratee(param) {
    // 参数本身就是函数
    if (typeof param === 'function') {
        return param
    }
    // 参数为字符串
    //如果参数为属性名，则返回属性值
    if (typeof param === 'string') {
        return property(param)
    }
    // 参数为数组
    // 包含参数则return true,否则为false
    if (isArray(param)) {
        return matchesProperty(param)
    }
    // 参数为对象
    //包含这个对象则return true,否则return false
    if (isObject(param)) {
        return matches(param)
    }
    // 啥都不是的时候,返回自身
    return param => param
}
function property(path) {
    return function (obj) {
        for (let item of toPath(path)) {
            obj = obj[item]
            if (!obj) return obj    // 错误处理: 当访问的对象不存在时直接返回
        }
        return obj;
    }
}
function reject(collection, predicate = identity) {
    let res = []
    func = iteratee(predicate)
    for (let key in collection) {
        if (!func(collection[key])) {
            res.push(collection[key])
        }
    }
    return res
}
function some(collection, predicate = identity) {
    func = iteratee(predicate)
    for (let key in collection) {
        if (func(collection[key])) {
            return true
        }
    }
    return false
}

function sortedIndex(array, value) {
    var left = 0
    var right = array.length - 1
    while (right - left > 1) {
        var mid = Math.ceil((right + left) / 2)
        if (array[mid] < value) {
            left = mid
        } else {
            right = mid
        }
    }
    return right
}
function union(...arrays) {
    let res = arrays.reduce((a, b) => {
        return a.concat(b)
    }, [])
    return Array.from(new Set(res))
}

function unionBy(...arrays) {
    let args = Array.from(arrays)
    let res = []
    let map = {}
    predicate = iteratee(args.pop())
    args.reduce((a, b) => a.concat(b)).forEach(it => {
        if (!map[predicate(it)]) {
            map[predicate(it)] = 1
            res.push(it)
        }
    })
    return res
}

function uniq(arys) {
    let res = []
    let map = {}
    arys.forEach((it, idx) => {
        if (!map[it]) {
            map[it] = 1
            res.push(it)
        }
    })
    return res

}

function uniqBy(array, iteratee2) {
    predicate = iteratee(iteratee2)
    let res = []
    let map = {}
    array.forEach((it, idx) => {
        if (!(iteratee(it) in map)) {
            map[iteratee(it)] = idx
            res.push(it)
        }
    })
}
function unzip(array) {
    var res = []
    for (var i = 0; i < array[0].length; i++) {
        var temp = []
        for (var j = 0; j < array.length; j++) {
            temp.push(array[j][i])
        }
        res.push(temp)
    }
    return res
}

function zip() {
    var res = []
    for (var i = 0; i < arguments[0].length; i++) {
        res[i] = []
        for (var j = 0; j < arguments.length; j++) {
            res[i][j] = arguments[j][i]
        }
    }
    return res
}

function without(array) {
    var map = {}
    var res = []
    for (var i = 1; i < arguments.length; i++) {
        map[arguments[i]] = 1
    }
    for (var i = 0; i < array.length; i++) {
        if (array[i] in map) continue
        res.push(array[i])
    }
    return res
}

function findLast(collection, predicate = identity, fromIndex = collection.length - 1) {
    let func = iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
        if (func(collection[i])) {
            return collection[i]
        }
    }
}
function findIndex(array, predicate = identity, fromIndex = array.length - 1) {
    predicate = iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
        if (predicate(array[i])) {
            return i
        }
    }
}

function flatMap(collection, identity) {
    let res = []
    let func = iteratee(identity)
    for (let key in collection) {
        res.push(...func(collection[key], key, collection))
    }
    return res
}
function flattenDeep(array) {
    let res = []
    function deep(array) {
        for (let key of array) {
            if (Array.isArray(key)) deep(key);
            else res.push(key)
        }
    }
    deep(array)
    return res
}

function flatMapDeep(collection, identity) {
    let res = []
    let func = iteratee(identity)
    for (let key in collection) {
        res.push(flattenDeep(func(collection[key], key, collection)))
    }
    return res
}

function dropWhile(array, identity) {
    let res = []
    let func = iteratee(identity)
    array.forEach((item, idx) => {
        if (!func(array[idx], idx, array)) res.push(item);
    })
    return res
}

function unionBy(...arys) {
    let func = iteratee(arys.pop())
    let arrays = Array.from(arys).flat()
    let res = []
    let map = {}
    for (let key in arrays) {
        if (!map[func(arrays[key])]) {
            res.push(arrays[key])
            map[func(arrays[key])] = 1
        }
    }
    console.log(map)
    return res
}
