var zhaodonggua = {
    chunk: function chunk(array, size) {
        let arr = []
        let length = Math.ceil(array.length / size)
        //外围数组个数
        for (let i = 0; i < length; i++) {
            arr[i] = new Array()
            //内部数组个数
            for (let j = 0; j < size; j++) {
                if (array.length) arr[i].push(array.shift());
                else break;
            }
        }
        return arr
    },


    compact: function compact(array) {
        let length = array.length
        let res = []
        for (let i = 0; i < length; i++) {
            if (array[i]) res.push(array[i]);
        }
        return res
    },
    drop: function drop(array, n = 1) {
        let length = array.length
        let res = []
        if (n > length) return res;
        for (let i = n; i < length; i++) {
            res.push(array[i])
        }
        return res

    },
    dropRight: function dropRight(array, n = 1) {
        let length = array.length
        let res = []
        if (n > length) return res;
        for (let i = 0; i < length - n; i++) {
            res.push(array[i])
        }
        return res
    },

    difference: function difference(array1, ...array2) {
        let res = []
        for (let i = 0; i < array1.length; i++) {
            let flag = false
            for (let j = 0; j < array2.length; j++) {
                for (let q = 0; q < array2[j].length; q++) {
                    if (array1[i] == array2[j][q]) flag = true;
                }
            }
            if (!flag) res.push(array1[i])
        }
        return res

    },
    fill: function fill(array, value, start = 0, end = array.length) {
        for (let i = start; i < end; i++) {
            array[i] = value;
        }
        return array
    },
    flatten: function flatten(array) {
        let res = []
        for (let i = 0; i < array.length; i++) {
            //如果不是数组
            if (!Array.isArray(array[i])) res.push(array[i]);
            //result.push(...item)
            else {
                for (let j = 0; j < array[i].length; j++) {
                    res.push(array[i][j])
                }
            }
        }
        console.log(res[2])
        return res
    },
    flattenDeep: function flattenDeep(array) {
        let res = []
        function deep(array) {
            for (let key of array) {
                if (Array.isArray(key)) deep(key);
                else res.push(key)
            }
        }
        deep(array)
        return res
    },
    flattenDepth: function flattenDepth(array, depth = 1, res = []) {
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                //当depth为0时，直接将数组导入res
                if (depth <= 0) {
                    res.push(array[i])
                    continue
                }
                //当depth大于0时，递归
                flattenDepth(array[i], depth - 1, res)

                //当走到最后一个数时,depth--
                if (i == array.length - 1) {
                    depth--
                }
            }
            else {
                res.push(array[i]);
            }
        }
        return res;

    },
    fromPairs: function fromPairs(pairs) {
        let obj = new Object();
        for (let pair of pairs) {
            obj[pair[0]] = pair[1]
        }
        return obj
    },

    head: function head(array, size = 1) {
        return array[0];
    },

    indexOf: function indexOf(array, value, fromindex = 0) {
        if (fromindex < 0) {
            fromindex = array.length + fromindex;
        }
        for (let i = fromindex; i < array.length; i++) {
            if (array[i] == value) {
                return i;
            }
        }
        return -1
    },
    initial: function initial(array) {
        array.pop()
        return array;

    },
    intersection: function intersection(...arrays) {
        let result = []
        let comp = arrays[0]
        for (let i = 0; i < comp.length; i++) {
            let flag = true
            for (let j = 1; j < arrays.length; j++) {
                //存在不包含的数组，就是false
                if (!(arrays[j].includes(comp[i]))) {
                    flag = false;
                    break
                }
            }
            if (flag === true) result.push(comp[i]);
        }
        return result
    },
    join: function join(array, separator = ',') {
        let res = ''
        for (let i = 0; i < array.length; i++) {
            if (i < array.length - 1) res += '' + array[i] + separator;
            else res += array[i];
        }

        return res
    },

    last: function last(array) {
        return array[array.length - 1]
    },
    lastIndexOf: function lastIndexOf(array, value, fromIndex = array.length - 1) {
        for (let i = fromIndex; i >= 0; i--) {
            if (array[i] == value) return i;
        }
        return -1;
    },
    pull: function pull(array, ...values) {
        for (let i = 0; i < array.length; i++) {
            if (values.includes(array[i])) {
                array.splice(i, 1)
                i--
            } else {
                continue;
            }
        }
        return array
    },
    reverse: function reverse(array) {
        for (let i = 0, j = array.length - 1; i <= j; i++, j--) {
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    },
    uniq: function uniq(array) {
        let res = []
        for (let i = 0; i < array.length; i++) {
            if (!res.includes(array[i])) res.push(array[i]);
            else continue;
        }
        return res;
    },
    without: function without(array, ...values) {
        let res = []
        for (let i = 0; i < array.length; i++) {
            if (values.includes(array[i])) {
                continue;
            } else {
                res.push(array[i])
            }
        }
        return res

    },
    zip: function zip(...arrays) {
        let res = []
        //设置二维数组
        for (let i = 0; i < arrays[0].length; i++) {
            res[i] = new Array()
        }
        //将数字放入新的数组
        for (let k = 0; k < arrays.length; k++) {
            for (let j = 0; j < arrays[k].length; j++) {
                res[j].push(arrays[k][j])
            }
        }
        return res

    },
    size: function size(collection) {
        let count = 0
        //key of collection 无法通过
        for (let key in collection) {
            count++
        }
        return count
    },
    isBoolean: function isBoolean(value) {
        let val = typeof (value)
        if (value == null) return false;
        return val == 'boolean' || val == 'object';
    },
    // matches: function matches(target) {
    //     return function (obj) {
    //         for (let key in target) {
    //             if (target[key] !== obj[key]) {
    //                 return false
    //             }
    //         }
    //         return true
    //     }
    // },
    isMatch: function isMatch(obj, src) {
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
    },
    property: function property(path) {
        return function (obj) {
            var items = toPath(path)
            for (let item of items) {
                obj = obj[item]
                if (!obj) return obj;
            }
            return obj
        }
    },
    toPath: function toPath(value) {
        if (typeof value == 'string') {
            return value.match(/\w+/g)
        } else {
            return value
        }
    },
    matches: function matches(source) {
        return function (obj) {
            return isMatch(obj, source)
        }

    },
    matchesProperty: function matchesProperty(array) {
        return function (obj) {
            return isEqual(obj[array[0]], array[1])
        }
    },
    isEqual: function isEqual(value, other) {
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
    },
    filter: function filter(collection, identity) {
        predicate = this.iteratee(identity)
        let res = []
        for (let key in collection) {
            if (predicate(collection[key])) {
                res.push(collection[key])
            }
        }
        return res

    },
    iteratee: function iteratee(param) {
        // 参数本身就是函数
        if (typeof param === 'function') {
            return param
        }
        // 参数为字符串
        //如果参数为属性名，则返回属性值
        if (typeof param === 'string') {
            return this.property(param)
        }
        // 参数为数组
        // 包含参数则return true,否则为false
        if (this.isArray(param)) {
            return this.matchesProperty(param)
        }
        // 参数为对象
        //包含这个对象则return true,否则return false
        if (this.isObject(param)) {
            return this.matches(param)
        }
        // 啥都不是的时候,返回自身
        return param => param
    },
    isObject: function isObject(value) {
        if (isNil(value) ||
            isBoolean(value) ||
            isString(value) ||
            isNumber(value) ||
            isSymbol(value)) {
            return false
        } else {
            return true
        }
    },
    isArray: function isArray(value) {
        return Object.prototype.toString.call(value) == '[object Array]'
    },
    map: function map(collection, identity) {
        identity = this.iteratee(identity)
        let res = []
        for (let key in collection) {
            res.push(identity(collection[key]))
        }
        return res
    },
    every: function every(collection, identity) {
        predicate = this.iteratee(identity)
        for (let key in collection) {
            if (!predicate(collection[key], key, collection)) {
                return false
            }
        }
        return true
    },
    mapValues: function mapValues(object, identity) {
        predicate = this.iteratee(identity)
        let res = {}
        for (let key in object) {
            res[key] = predicate(object[key], key, object)
        }
        return res
    },
    reject: function reject(collection, identity) {
        let res = []
        func = iteratee(identity)
        for (let key in collection) {
            if (!func(collection[key])) {
                res.push(collection[key])
            }
        }
        return res
    },
    some: function some(collection, identity) {
        func = iteratee(identity)
        for (let key in collection) {
            if (func(collection[key])) {
                return true
            }
        }
        return false
    },
    sortedIndex: function sortedIndex(array, value) {
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
    },
    union: function union(...arrays) {
        let res = arrays.reduce((a, b) => {
            return a.concat(b)
        }, [])
        return Array.from(new Set(res))
    },

    unionBy: function unionBy(...arrays) {
        let args = Array.from(arrays)
        let res = []
        let map = {}
        predicate = this.iteratee(args.pop())
        args.reduce((a, b) => a.concat(b)).forEach(it => {
            if (!map[predicate(it)]) {
                map[predicate(it)] = 1
                res.push(it)
            }
        })
        return res
    },

    uniq: function uniq(arys) {
        let res = []
        let map = {}
        arys.forEach((it, idx) => {
            if (!map[it]) {
                map[it] = 1
                res.push(it)
            }
        })
        return res

    },

    uniqBy: function uniqBy(array, iteratee2) {
        predicate = iteratee(iteratee2)
        let res = []
        let map = {}
        array.forEach((it, idx) => {
            if (!(iteratee(it) in map)) {
                map[iteratee(it)] = idx
                res.push(it)
            }
        })
    },
    unzip: function unzip(array) {
        var res = []
        for (var i = 0; i < array[0].length; i++) {
            var temp = []
            for (var j = 0; j < array.length; j++) {
                temp.push(array[j][i])
            }
            res.push(temp)
        }
        return res
    },

    zip: function zip() {
        var res = []
        for (var i = 0; i < arguments[0].length; i++) {
            res[i] = []
            for (var j = 0; j < arguments.length; j++) {
                res[i][j] = arguments[j][i]
            }
        }
        return res
    },

    without: function without(array) {
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
    },
    findLast: function findLast(collection, predicate = identity, fromIndex = collection.length - 1) {
        let func = this.iteratee(predicate)
        for (let i = fromIndex; i >= 0; i--) {
            if (func(collection[i])) {
                return collection[i]
            }
        }
    },
    findIndex: function findIndex(array, predicate = identity, fromIndex = array.length - 1) {
        predicate = this.iteratee(predicate)
        for (let i = fromIndex; i >= 0; i--) {
            if (predicate(array[i])) {
                return i
            }
        }
    },
    flatMap: function flatMap(collection, identity) {
        let res = []
        let func = this.iteratee(identity)
        for (let key in collection) {
            res.push(...func(collection[key], key, collection))
        }
        return res
    },
    flatMapDeep: function flatMapDeep(collection, identity) {
        let res = []
        let func = this.iteratee(identity)
        for (let key in collection) {
            res.push(flattenDeep(func(collection[key], key, collection)))
        }
        return res
    },
    dropWhile: function dropWhile(array, identity) {
        let res = []
        let func = this.iteratee(identity)
        array.forEach((item, idx) => {
            if (!func(array[idx], idx, array)) res.push(item);
        })
        return res
    },








}








