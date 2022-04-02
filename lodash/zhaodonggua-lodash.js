var nj_uzi = {
    //*************************************************************** */
    chunk: function chunk(array, size) {
        let leng = array.length
        var res = []
        var temp = Math.ceil(leng / size)
        var x = 0
        var y = size
        for (var i = 0; i < temp; i++) {
            res[i] = new Array()
            for (var j = x; j < y && j < leng; j++) {
                res[i].push(array[j])
            }
            x += size
            y += size
        }
        return res
    },

    compact: function compact(array) {
        var res = []
        for (let i = 0; i < array.length; i++) {
            if (array[i]) {
                res.push(array[i])
            }
        }
        return res
    },

    //把第一个数组里的元素和后续数组中的元素对比，没有出现过的元素放进新数组
    difference: function difference(ary, ...values) {
        var result = []
        var valuesAry = flattenDeep(values) //把后续的数组放在一个大数组values里 然后在数组里展开，变成一个一维数组
        for (let i = 0; i < ary.length; i++) {
            if (!valuesAry.includes(ary[i])) {//如果后续数组的元素没有被目标数组包含，则记录
                result.push(ary[i])
            }
        }
    },

    differenceBy: function differenceBy(ary, ...values) {


    },

    differenceWith: function differenceWith() {

    },

    drop: function drop(array, n = 1) {
        var res = []
        if (!n) {
            return array
        }
        for (let i = n; i < array.length; i++) {
            res.push(array[i])
        }
        return res
    },

    dropRight: function dropRight(array, num) {
        var res = []
        var leng = array.length
        if (!num) {
            num = num == 0 ? 0 : 1
        }
        for (let i = 0; i < leng - num; i++) {
            res.push(array[i])
        }
        return res
    },

    dropRightWhile: function dropRightWhile() {

    },

    dropWhile: function dropWhile() {

    },

    fill: function fill(array, value, start = 0, end = array.length) {
        for (let i = start; i < end; i++) {
            array[i] = value
        }
        return array
    },

    findIndex: function findIndex() {

    },

    indLastIndex: function indLastIndex() {

    },

    findLastIndex: function findLastIndex() {

    },

    flatten: function flatten(ary) {
        var res = []
        for (var i = 0; i < ary.length; i++) {
            var item = ary[i]
            if (Array.isArray(item)) { //直接判断是否是数组
                for (var j = 0; j < item.length; j++) {
                    res.push(item[j])
                }
            } else {
                res.push(item)
            }
        }
        return res
    },

    flattenDeep: function flattenDeep(array) {
        var result = []
        for (var i = 0; i < array.length; i++) {
            var item = array[i]
            if (Array.isArray(array[i])) {
                item = flattenDeep(array[i])
                for (var j = 0; j < item.length; j++) {
                    result.push(item[j])
                }
            } else {
                result.push(item)
            }
        }
        return result
    },

    //根据depth递归减少ary的层级
    flattenDepth: function flattenDepth(ary, depth = 1) {
        if (depth == 0) {
            return ary.slice()
        }

        let res = []
        for (let i = 0; i < ary.length; i++) {
            if (Array.isArray(ary[i])) {
                let item = flattenDepth(ary[i], depth - 1)
                for (let j = 0; j < item.length; j++) {
                    res.push(item[j])
                }
            } else {
                res.push(ary[i])
            }
        }
        return res
    },

    head: function head(array) {
        if (!array) {
            return undefined
        }
        return array[0]
    },

    indexOf: function indexOf(array, value, fromIndex = 0) {
        for (let i = fromIndex; i < array.length; i++) {
            if (array[i] === value) {
                return i
            }
        }
        return -1
    },

    initial: function initial(array) {
        var res = []
        for (let i = 0; i < array.length - 1; i++) {
            res.push(array[i])
        }
        return res
    },

    intersection: function (...arrays) {
        var res = []
        for (let num of arguments[0]) {
            for (let i = 1; i < arguments.length; i++) {
                if (arguments[i].includes(num))
                    res.push(num)
            }
        }
        return res
    },

    intersectionBy: function () {

    },

    intersectionWith: function () {

    },

    join: function join(array, separator = ',') {
        var str = ''
        for (let i = 0; i < array.length; i++) {
            if (i == array.length - 1) {
                str += array[i]
            } else {
                str += array[i] + '' + separator
            }
        }
        return str
    },

    last: function last(array) {
        if (!array) {
            return undefined
        }
        return array[array.length - 1]
    },

    lastIndexOf: function lastIndexOf(array, value, fromIndex = array.length - 1) {
        for (let i = fromIndex; i >= 0; i--) {
            if (value === array[i]) {
                return i
            }
        }
        return -1
    },

    nth: function (array, n = 0) {
        if (n >= 0) {
            return array[n]
        } else {
            return array[array.length + n]
        }
    },

    pull: function () {

    },

    pullAll: function () {

    },

    pullAllBy: function () {

    },

    pullAllWith: function () {

    },

    remove: function () {

    },

    reverse: function reverse(array) {
        var leng = array.length
        var right = leng - 1
        var mid = 0
        for (let left = 0; left < right; left++) {
            mid = array[left]
            array[left] = array[right]
            array[right] = mid
            right--
        }
        return array
    },

    slice: function () {

    },

    //把val 插入有序数组 返回下标
    sortedIndex: function (ary, val) {
        if (!Array.isArray(ary) && typeof ary !== 'string') {
            return NaN
        }

        let start = 0
        let end = ary.length
        while (start < end) {
            let mid = (start + end) >> 1
            if (val < ary[mid]) {
                mid = end
            } else if (val > ary[mid]) {
                start = mid + 1
            } else if (val == ary[mid]) {
                if (ary[mid - 1] !== val) {
                    return mid
                } else {
                    end = mid
                }
            }
        }
        return start
    },

    sortedIndexBy: function () {

    },

    sortedIndexOf: function () {

    },

    sortedLastIndex: function () {

    },

    sortedLastIndexBy: function () {

    },

    sortedLastIndexOf: function () {

    },

    sortedUniq: function () {

    },

    sortedUniqBy: function () {

    },

    tail: function () {

    },

    take: function () {

    },

    takeRight: function () {

    },

    takeRightWhile: function () {

    },

    takeWhile: function () {

    },

    //多个数组去重，返回新数组
    union: function (...args) {
        let res = []
        args.forEach(ary => {
            ary.forEach(val => {
                if (!res.includes(val)) {
                    res.push(val)
                }
            })
        })
        return res
    },

    unionBy: function () {

    },

    unionWith: function () {

    },

    uniqWith: function () {

    },

    uniq: function uniq(array) {
        var res = []
        var map = {}
        for (let i = 0; i < array.length; i++) {
            if (array[i] in map) {  //利用对象的key来判断元素是否出现过，出现过的跳过，没出现过的push进res
                continue
            } else {
                map[array[i]] = 1
                res.push(array[i])
            }
        }
        return res
    },

    uniqBy: function (ary, predicate = identity) {

    },
    unzip: function () {

    },
    unzipWith: function () {

    },

    without: function without(array, values) {
        var res = []
        for (let i = 0; i < array.length; i++) {
            if (!(array[i] == values)) {
                res.push(array[i])
            }
        }
        return res
    },

    xor: function () {

    },
    xorBy: function () {

    },
    xorWith: function () {

    },
    zipObject: function () {

    },
    zipObjectDeep: function () {

    },
    zipWith: function () {

    },

    zip: function zip(...array) {
        var res = []
        for (let i = 0; i < array[0].length; i++) {
            var ary = []
            for (let j = 0; j < array.length; j++) {
                ary.push(array[j][i])
            }
            res.push(ary)
        }
        return res
    },

    countBy: function () {

    },
    every: function () {

    },
    filter: function () {

    },
    find: function () {

    },
    findLast: function () {

    },
    flatMap: function () {

    },
    flatMapDeep: function () {

    },
    flatMapDepth: function () {

    },
    forEach: function () {

    },
    forEachRight: function () {

    },
    groupBy: function () {

    },
    includes: function () {

    },
    invokeMap: function () {

    },
    keyBy: function () {

    },
    map: function () {

    },
    orderBy: function () {

    },
    partition: function () {

    },
    reduce: function () {

    },
    reduceRight: function () {

    },
    reject: function () {

    },
    sample: function () {

    },
    sampleSize: function () {

    },
    shuffle: function () {

    },

    size: function size(collection) {
        var leng = 0
        for (var key in collection) {
            leng++
        }
        return leng
    },

    some: function () {

    },
    sortBy: function () {

    },
    defer: function () {

    },
    delay: function () {

    },
    castArray: function () {

    },
    conformsTo: function () {

    },
    eq: function () {

    },
    gt: function () {

    },
    gte: function () {

    },
    isArguments: function () {

    },
    isArray: function () {

    },
    isArrayBuffer: function () {

    },

    isArrayLike: function () {

    },
    isArrayLikeObject: function () {

    },

    isBoolean: function isBoolean(value) {
        value === false || value === true ? true : false
    },

    isDate: function () {

    },
    isElement: function () {

    },

    isEmpty: function isEmpty(value) {
        for (var key in value) {
            return false
        }
        return true
    },

    isEqual: function isEqual(a, b) {
        if (a === b) {
            return true
        }
        if (a !== a && b !== b) {
            return true
        }
        // 两个都是数组
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) {
                return false
            } else {
                for (var i = 0; i < a.length; i++) {
                    if (!deepEqual(a[i], b[i])) {
                        return false
                    }
                }
                return true
            }
        }
        // 两个都是对象
        if (!Array.isArray(a) && !Array.isArray(b) && typeof a === 'object' && typeof b === 'object') {
            for (var key in a) {
                // a的每个属性都要在b里
                // 一旦不在，就返回false
                if (!(key in b)) {
                    return false
                }
            }
            for (var key in b) {
                // b的每个属性都要在a里
                // 一旦不在，就返回false
                if (!(key in a)) {
                    return false
                }
            }
            for (var key in a) {
                if (!deepEqual(a[key], b[key])) {
                    return false
                }
            }
            return true
        }
        return false
    },

    isEqualWith: function () {

    },
    isError: function () {

    },
    isFunction: function () {

    },
    isInteger: function () {

    },
    isLength: function () {

    },
    isMap: function () {

    },
    //判断obj是否全包含src，src的每个属性及值都在obj上找到并相等.支持深层
    //测试用例 isMatch({a:1,b:2,c:3,d:{x:1,y:2}}, {b:2,d:{x:1}})
    isMatch: function isMatch(obj, src) {
        if (obj === src) {
            return true
        }
        if ((typeof obj == 'object') + (typeof src == 'object') == 1) { //不是都为对象
            return false
            //lodash规则奇怪，src可以不是对象，也返回true
        }
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                if (typeof src[key] !== 'object') {
                    if (!obj.hasOwnProperty(key) || obj[key] !== src[key]) {
                        return false
                    }
                } else { //src[key]是Object，深层判断
                    if (src[key] === null && obj[key] !== null) {
                        return false
                    } else if (!isMatch(obj[key], src[key])) {
                        return false
                    }
                }
            }
        }
        return true
    },

    isMatchWith: function isMatchWith(obj, src, customizer = function () { }) {
        if (customizer(obj, src) || obj === src) {
            return true
        }
        if ((typeof obj == 'object') + (typeof src == 'object') == 1) {
            return false
        }
        for (let key in src) {
            if (src.hasOwnProperty(key)) {
                if (!obj.hasOwnProperty(key)) {
                    return false
                } else {
                    if (customizer(obj[key], src[key], key, obj, src)) {
                        continue
                    }
                    if (typeof src[key] != 'object') {
                        return src[key] === obj[key]
                    } else {
                        if ((src[key] === null) + (obj[key] === null) === 1) {
                            return false
                        } else
                            if (!isMatchWith(obj[key], src[key], customizer)) {
                                return false
                            }
                    }
                }
            }
        }
        return true
    },

    isNaN: function () {

    },

    isNil: function () {

    },
    isNative: function () {

    },

    isNull: function isNull(value) {
        return value === null
    },

    isNumber: function isNumber(value) {
        return typeof (value) === typeof (0)
    },

    isObject: function () {

    },
    isObjectLike: function () {

    },
    isPlainObject: function () {

    },

    isRegExp: function () {

    },
    isSafeInteger: function () {

    },
    isSet: function () {

    },
    isString: function () {

    },
    isSymbol: function () {

    },
    isTypedArray: function () {

    },
    isUndefined: function () {

    },
    isWeakMap: function () {

    },
    isWeakSet: function () {

    },
    lt: function () {

    },
    lte: function () {

    },

    toArray: function toArray(value) {
        if (typeof (value) === 'number' || !value) {
            return []
        }

        var res = []
        if (typeof (value) === 'string' || Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                res.push(array[i])
            }
            return res
        }

        for (let key of value) {
            res.push(value[key])
        }
        return res
    },

    toFinite: function () {

    },

    toInteger: function () {

    },
    toLength: function () {

    },
    toNumber: function () {

    },
    assign: function () {

    },
    toSafeInteger: function () {

    },

    add: function add(augend, addend) {
        return augend + addend
    },

    ceil: function () {

    },
    divide: function () {

    },
    floor: function () {

    },

    max: function max(array) {
        if (!array.length) {
            return undefined
        }
        var M = -Infinity
        for (let key of array) {
            key > M ? M = key : M
        }
        return M
    },

    maxBy: function () {

    },
    mean: function () {

    },
    meanBy: function () {

    },

    min: function min(array) {
        if (!array.length) {
            return undefined
        }
        var M = Infinity
        for (let key of array) {
            key < M ? M = key : M
        }
        return M
    },

    minBy: function () {

    },
    multiply: function () {

    },
    round: function () {

    },
    subtract: function () {

    },


    sum: function sum(array) {
        // var res = 0
        // for (let key of array) {
        //   res += key
        // }
        // return res
        return array.reduce((a, b) => a + b)
    },

    sumBy: function () {

    },
    clamp: function () {

    },
    inRange: function () {

    },
    random: function () {

    },
    assignIn: function () {

    },
    at: function () {

    },
    defaults: function () {

    },
    defaultsDeep: function () {

    },
    findKey: function () {

    },
    findLastKey: function () {

    },
    forIn: function () {

    },
    forInRight: function () {

    },
    forOwn: function () {

    },
    forOwnRight: function () {

    },
    functions: function () {

    },
    functionsIn: function () {

    },
    get: function () {

    },
    has: function () {

    },
    hasIn: function () {

    },
    invert: function () {

    },
    invertBy: function () {

    },
    keys: function () {

    },
    keysIn: function () {

    },
    mapKeys: function () {

    },
    mapValues: function () {

    },
    merge: function () {

    },

    mergeWith: function () {

    },
    omit: function () {

    },
    omitBy: function () {

    },

    pick: function () {

    },
    pickBy: function () {

    },
    result: function () {

    },
    set: function () {

    },
    setWith: function () {

    },
    toPairs: function () {

    },
    toPairsIn: function () {

    },
    transform: function () {

    },
    unset: function () {

    },
    update: function () {

    },
    updateWith: function () {

    },
    values: function () {

    },
    valuesIn: function () {

    },
    camelCase: function () {

    },

    capitalize: function () {

    },
    deburr: function () {

    },
    endsWith: function () {

    },
    deburr: function () {

    },
    escape: function () {

    },
    escapeRegExp: function () {

    },
    kebabCase: function () {

    },
    lowerCase: function () {

    },
    pad: function () {

    },
    padEnd: function () {

    },
    padStart: function () {

    },

    repeat: function repeat(string = '', n = 1) {
        if (!n) {
            return ''
        }

        var res = ''
        for (let i = 0; i < n; i++) {
            res += string
        }
        return res
    },

    replace: function () {

    },
    snakeCase: function () {

    },
    split: function () {

    },
    startCase: function () {

    },
    startsWith: function () {

    },
    toLower: function () {

    },
    toUpper: function () {

    },
    trim: function () {

    },
    trimEnd: function () {

    },
    trimStart: function () {

    },
    truncate: function () {

    },
    unescape: function () {

    },
    upperCase: function () {

    },
    upperFirst: function () {

    },
    words: function () {

    },

    //可跳跃绑定的bind  

    bind: function bind(f, thisArg, ...fixedArgs) { //bind(f, {}, 1, 2, _, 3, _, 4)
        return function (...args) { // 5,8, 9,10
            var parameters = fixedArgs.slice()
            var j = 0
            for (var i = 0; i < parameters.length; i++) {
                if (Object.is(parameters[i], bind.placeholder)) { //Object.is()能够做到NaN===NaN
                    if (j < args.length) {
                        parameters[i] = args[j++]
                    } else {
                        parameters[i] = undefined
                    }
                }
            }
            while (j < args.length) {
                parameters.push(args[j++])
            }
            return f.apply(thisArg, parameters)
        }
    },

    bindAll: function () {

    },
    defaultTo: function () {

    },
    /*-----------------------------------
     *              Util
     *------------------------------------
     */

    //根据不同类型生成不同的断言函数
    iteratee: function iteratee(predicate) {
        if (typeof predicate === 'function') {
            return predicate
        } else if (typeof predicate === 'string') {
            predicate = property(predicate) //输入属性，返回属性值
        } else if (Array.isArray(predicate)) {
            predicate = matchesProperty(...predicate) // 输入...[key,val]，返回断言是否其超集
        } else if (typeof predicate === 'object') {
            predicate = matches(predicate) //输入对象，返回断言是否其超集
        }
        return predicate
    },


    //传入什么属性名，它返回的函数就用来获取对象的属性值
    property: function property(prop) {
        // return bind(get,null, _, prop) //当一个函数调用另一个函数，传入的参数不变的情况下，永远可以被优化为bind写法
        return function (obj) {
            // return obj[prop]
            return get(obj, prop) //get(obj, path)得到深层路径下的属性值
        }
    },

    //_.map(['a[2]', 'c[0]'], _.propertyOf(object));
    // => [2, 0]
    propertyOf: function propertyOf(obj) {
        return function (...args) {
            let valPath = args[0]
            return get(obj, valPath)
        }
    },



    //将String的路径转为数组 
    //假设路径合法， 'a[0].b.c[0][3][4].foo.bar[2]'  ---> ['a','0','b','c','0','3','4','foo','bar']  右括号必须遇到左括号或者.，单独的左括号和单独的.
    toPath: function toPath(val) {
        if (Array.isArray(val)) {
            return val
        } else {
            var res = val.split(/\]\[|\]\.|\.|\[|\]/)
            if (res[0] === '') {
                res.shift()
            }
            if (res[res.length - 1] === '') {
                res.pop()
            }
            return res
        }
    },

    toPath2: function toPath2(val) {
        if (Array.isArray(val)) {
            return val
        } else {
            var result = val.split('][')
                .reduce((res, it) => res.concat(it.split('].')), [])
                .reduce((res, it) => res.concat(it.split('[')), [])
                .reduce((res, it) => res.concat(it.split('.')), [])
            var item = result[result.length - 1]
            if (item[item.length - 1] === ']') { //val最后属性为[2]时，该项为2]，需要把]去掉
                result[result.length - 1] = item.slice(0, item.length - 1)
            }
            return result
        }
    },


    //src为filter接收的对象，判断src是否是obj的子集.没有考虑深层次嵌套
    //函数构造器matches，返回的函数传入的参数应是传入matches里的超集。不支持深层
    matches2: function matches2(src) {
        return function (obj) {
            if (obj === src) {
                return true
            }
            for (var key in src) {
                if (!obj.hasOwnProperty(key) || obj[key] !== src[key]) {
                    return false
                }
            }
            return true
        }
    },
    //对matches的优化改进，支持了深层比较
    matches: function matches(src) {
        // return bind(isMatch, null, window, src)
        return function (obj) {
            return isMatch(obj, src)
        }
    },


    //判断obj在path路径下的属性值与val是否深度相等
    matchesProperty: function matchesProperty(path, val) {
        return function (obj) {
            return isEqual(get(obj, path), val)
        }
    },

    //返回它自己
    identity: function identity(val) {
        return val
    },

    //常量函数，创建一个返回val的函数
    constant: function constant(val) {
        return function () {
            return val
        }
    },

    range: function range(start = 0, end, step = 1) {
        var res = []
        if (arguments.length == 1) {
            end = start
            start = 0
        }
        while (start < end) {
            res.push(start)
            start += step
        }
        while (start > end) {
            res.push(start)
            start += -step
        }
        return res
    },

    rangeRight: function () {

    },
    mixin: function () {

    },
    times: function () {

    },

    uniqueId: function () {

    },
    cloneDeep: function () {

    },
    uniqueId: function () {

    },


    concat: function () {

    },
    pullAt: function () {

    },


    ary: function () {

    },
    unary: function () {

    },
    negate: function () {

    },
    once: function () {

    },
    spread: function () {

    },
    curry: function () {

    },
    memoize: function () {

    },
    flip: function () {

    },
    conforms: function () {

    },

    flow: function () {

    },
    method: function () {

    },
    methodOf: function () {

    },
    nthArg: function () {

    },

    parseJson: function () {

    },
    stringifyJson: function () {

    },

};
