var zhaodonggua = function () {

    // 辅助型函数

    function identity(...values) {
        return values[0]
    }

    function isEqualWith(value, other, customizer = undefined) {
        /**
         * This method supports comparing:
         *
         * arrays, array buffers, booleans,
         * date objects, error objects, maps,
         * numbers, Object objects, regexes,
         * sets, strings, symbols, and typed arrays.
         *
         * 仅实现了:
         * arrays, booleans, objects. strings, numbers
         */
        let typeValue = Object.prototype.toString.call(value)
        let typeOther = Object.prototype.toString.call(other)
        if (typeValue !== typeOther) {
            return false
        }
        let type = /\b\w+(?=\]$)/.exec(typeValue)[0]
        if (type == 'Object') {
            return isEqualObject(value, other, customizer)
        }
        if (type == 'Array') {
            return isEqualArray(value, other, customizer)
        }
        return isEqualBase(value, other, customizer)
    }

    function isEqual(value, other) {
        return isEqualWith(value, other)
    }

    function isEqualBase(value, other, customizer) {
        if (customizer) {
            let res = customizer(value, other)
            if (res === undefined) {
                res = value === other
            }
            return res
        }
        return value === other
    }

    function isEqualObject(value, other, customizer) {
        if (Object.keys(value).length !== Object.keys(other).length) {
            return false
        }
        for (let key in value) {
            let res
            if (customizer) {
                res = customizer(value[key], other[key], key, value, other)
            }
            if (res === undefined) {
                res = isEqual(value[key], other[key])
            }
            if (!res) {
                return false
            }
        }
        return true
    }

    function isEqualArray(value, other, customizer) {
        if (value.length != other.length) {
            return false
        }

        for (let i in value) {
            let res
            if (customizer) {
                res = customizer(value[i], other[i], i, value, other)
            }
            if (res === undefined) {
                res = isEqual(value[i], other[i])
            }
            if (!res) {
                return false
            }
        }
        return true
    }

    function isMatch(object, source) {
        return isMatchWith(object, source)
    }

    function isMatchWith(object, source, customizer = undefined) {
        if (typeof (source) !== 'object') {
            return false
        }
        let len = 0
        for (let key in source) {
            let res
            if (customizer) {
                res = customizer(object[key], source[key])
            }
            if (res === undefined) {
                res = isEqual(object[key], source[key])
            }
            if (!res) {
                return false
            }
        }
        return true
    }

    function matches(source) {
        return function (obj) {
            return isMatch(obj, source)
        }
    }

    function matchesProperty(path, srcValue) {
        path = toPath(path)

        return function (obj) {
            for (let prop of path) {
                obj = obj[prop]
            }
            return obj === srcValue
        }
    }

    function property(path) {
        path = toPath(path)
        return function (obj) {
            for (let prop of path) {
                obj = obj[prop]
            }
            return obj
        }
    }

    function propertyOf(object) {
        return function (path) {
            let val = cloneDeep(object)
            paths = toPath(path)
            for (let path of paths) {
                val = val[path]
            }
            return val
        }
    }

    function toPath(value) {
        if (isArray(value)) {
            return value
        }
        let path = []
        if (typeof value == 'string') {
            parsePart()
            return path
        }

        function parsePart() {
            let str = ''
            for (let i = 0; i < value.length; i++) {
                if (value[i] == '.' || value[i] == '[') {
                    if (str != '') path.push(str)
                    str = ''
                } else if (value[i] == ']') {
                    if (str != '') path.push(str)
                    str = ''
                } else {
                    str += value[i]
                }
            }
            if (str != '') path.push(str)
        }
    }


    function split(string = '', separator, limit = Infinity) {
        let reg = new RegExp(separator, 'g')
        let match
        let sepIdx = []
        while (match = reg.exec(string)) {
            sepIdx.push(match.index)
        }

        let res = []
        let str = ''
        for (let i = 0; i < string.length; i++) {
            if (includes(sepIdx, i)) {
                res.push(str)
                str = ''
            } else {
                str += string[i]
            }
            if (res.length == limit) {
                break
            }
        }

        if (res.length < limit && str !== '') {
            res.push(str)
        }
        return res
    }

    function Iteratee(func = identity) {
        let funcType = Object.prototype.toString.call(func)
        if (funcType == '[object Function]') {
            return func
        } else if (funcType == '[object String]') {
            return func = property(func)
        } else if (funcType == '[object Array]') {
            return func = matchesProperty(func[0], func[1])
        } else if (funcType == '[object Object]') {
            return func = matches(func)
        }
        return identity(func)
    }

    function get(object, path, defaultValue = 'default') {
        let value = object
        path = toPath(path)
        try {
            for (let prop of path) {
                value = value[prop]
            }
        } catch (e) {
            if (e instanceof TypeError) {
                return defaultValue
            } else {
                throw e
            }
        }
        return value
    }


    //实用型函数

    function swap(array, i, j) {
        let t = array[i]
        array[i] = array[j]
        array[j] = t
        return array
    }

    function chunk(array, size = 1) {
        let result = []
        for (let i = 0; i < array.length;) {
            let group = []
            for (let j = 0; j < size; j++) {
                group.push(array[i])
                i++
                if (i == array.length) {
                    break
                }
            }
            result.push(group)
        }
        return result
    }

    function compact(array) {
        let result = []
        for (let i = 0; i < array.length; i++) {
            if (array[i]) {
                result.push(array[i])
            }
        }
        return result
    }

    function drop(array, n = 1) {
        let result = []
        if (n < array.length) {
            for (let i = n; i < array.length; i++) {
                if (array[i]) {
                    result.push(array[i])
                }
            }
        }
        return result
    }

    function dropRight(array, n = 1) {
        let result = []
        let len = array.length
        if (n < len) {
            for (let i = 0; i < len - n; i++) {
                if (array[i]) {
                    result.push(array[i])
                }
            }
        }
        return result
    }

    function fill(array, value, start = 0, end = array.length) {
        for (let i = start; i < end; i++) {
            array[i] = value
        }
        return array
    }

    function flatten(array) {
        return flattenDepth(array, 1)
    }

    function flattenDeep(array) {
        return flattenDepth(array, Infinity)
    }

    function flattenDepth(array, depth = 1) {
        let res = array
        let temp = []
        while (true) {
            let hasArray = false
            for (let i of res) {
                if (isArray(i)) {
                    temp.push(...i)
                    hasArray = true
                } else {
                    temp.push(i)
                }
            }
            res = temp
            temp = []
            depth--
            if (depth == 0 || hasArray == false) {
                break
            }
        }
        return res
    }

    function flatMap(collection, iteratee = identity) {
        return flatMapDepth(collection, iteratee)
    }

    function flatMapDeep(collection, iteratee = identity) {
        return flatMapDepth(collection, iteratee, Infinity)
    }

    function flatMapDepth(collection, iteratee = identity, depth = 1) {
        iteratee = Iteratee(iteratee)
        let res = []
        for (let key in collection) {
            res.push(iteratee(collection[key]))
        }
        return flattenDepth(res, depth)
    }

    function fromPairs(pairs) {
        let result = {}
        for (let i = 0; i < pairs.length; i++) {
            result[pairs[i][0]] = pairs[i][1]
        }
        return result
    }

    function head(array) {
        return array[0]
    }

    function indexOf(array, value, fromIndex = 0) {
        if (fromIndex < 0) {
            fromIndex += array.length
        }
        for (let i = fromIndex; i < array.length; i++) {
            if (array[i] == value) {
                return i
            }
        }
        return -1
    }

    function initial(array) {
        let res = []
        for (let i = 0; i < array.length - 1; i++) {
            res[i] = array[i]
        }
        return res
    }

    function take(array, n = 1) {
        if (n < 1) {
            return []
        }
        let len = n < array.length ? n : array.length
        let res = Array(len)
        for (let i = 0; i < len; i++) {
            res[i] = array[i]
        }
        return res
    }

    function takeRight(array, n = 1) {
        if (n < 1) {
            return []
        }
        let len = array.length
        let start = len > n ? len - n : 0
        let res = []
        for (let i = start; i < len; i++) {
            res.push(array[i])
        }
        return res
    }

    function takeRightWhile(array, predicate = identity) {
        predicate = Iteratee(predicate)
        for (let i = array.length - 1; i >= 0; i--) {
            if (!predicate(array[i])) {
                return slice(array, i + 1)
            }
        }
    }

    function takeWhile(array, predicate = identity) {
        predicate = Iteratee(predicate)
        for (let i = 0; i < array.length; i++) {
            if (!predicate(array[i])) {
                return slice(array, 0, i)
            }
        }
    }

    function tail(array) {
        let res = []
        for (let i = 1; i < array.length; i++) {
            res.push(array[i])
        }
        return res
    }

    function join(array, separator = ',') {
        let result = ""
        for (let i = 0; i < array.length; i++) {
            if (i == array.length - 1) {
                result += array[i]
            } else {
                result += "" + array[i] + separator
            }
        }
        return result
    }

    function last(array) {
        return array[array.length - 1]
    }

    function lastIndexOf(array, value, fromIndex = array.length - 1) {
        for (let i = fromIndex; i >= 0; i--) {
            if (array[i] == value) {
                return i
            }
        }
        return -1
    }

    function reverse(array) {
        let n = array.length
        let result = Array(n)
        for (let i = 0; i < n; i++) {
            result[n - i - 1] = array[i]
        }
        return result
    }

    function uniq(array) {
        let result = []
        let map = {}
        for (let i of array) {
            if (map[i] === undefined) {
                result.push(i)
                map[i] = true
            }
        }
        return result
    }

    function uniqBy(array, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let result = []
        let map = {}
        for (let i in array) {
            let item = iteratee(array[i], i, array)
            if (map[item] == undefined) {
                map[item] = true
                result.push(array[i])
            }
        }
        return result
    }

    function uniqWith(array, comparator) {
        let res = []
        for (let a of array) {
            let hasA = false
            if (res.length > 0) {
                for (let b of res) {
                    if (comparator(a, b)) {
                        hasA = true
                        break
                    }
                }
                if (!hasA) {
                    res.push(a)
                }
            } else {
                res.push(a)
            }
        }
        return res
    }

    function without(array, ...values) {
        let result = []
        for (let i = 0; i < array.length; i++) {
            let p = array[i]
            if (!includes(values, p)) {
                result.push(p)
            }
        }
        return result
    }

    function zip(...arrays) {
        let res = []
        for (let i in arrays[0]) {
            inner = []
            for (let j in arrays) {
                inner[j] = arrays[j][i]
            }
            res.push(inner)
        }
        return res
    }

    function zipObject(props = [], values = []) {
        let obj = {}
        for (let key in props) {
            let prop = props[key]
            let val = values[key]
            obj[prop] = val
        }
        return obj
    }

    function zipObjectDeep(props = [], values = []) {
        let obj = {}
        props = map(props, toPath)
        for (let key in props) {
            let prop = props[key]
            let val = values[key]
            if (isArray(prop)) {
                let inside = obj
                let len = prop.length - 1
                for (let i = 0; i < len; i++) {
                    let p = prop[i]
                    if (!inside[p]) {
                        if (prop[i + 1] !== undefined && isNumber(prop[i + 1])) {
                            inside[p] = []
                        } else {
                            inside[p] = {}
                        }
                    }
                    inside = inside[p]
                }
                inside[prop[len]] = val
            } else {
                obj[prop] = val
            }
        }
        return obj
    }

    function zipWith(...args) {
        if (isArray(args[args.length])) {
            iteratee = identity
        } else {
            iteratee = Iteratee(args.pop())
        }
        let res = zip(...args)
        for (let i in res) {
            res[i] = iteratee(...res[i])
        }
        return res
    }

    function unzip(array) {
        let res = []
        for (let i in array[0]) {
            let inner = []
            for (let j in array) {
                inner[j] = array[j][i]
            }
            res.push(inner)
        }
        return res
    }

    function unzipWith(array, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let res = unzip(array)
        for (let i in res) {
            res[i] = iteratee(...res[i])
        }
        return res
    }

    function sample(collection) {
        let random = Infinity
        while (random > collection.length - 1) {
            random = Math.floor(10 * Math.random())
        }
        return collection[random]
    }

    function size(collection) {
        if (collection.length) {
            return collection.length
        }
        if (typeof (collection) == "boolean") {
            return 0
        }
        if (typeof (collection) == "number") {
            return 0
        }
        if (typeof (collection) == "object") {
            let count = 0
            for (let i in collection) {
                count++
            }
            return count
        }
    }

    function isBoolean(value) {
        return value === true || value === false
    }

    function ceil(number, precision = 0) {
        let x = 10 ** (-precision)
        let remain = number % x
        if (!remain) {
            return number
        }
        return (number - remain) + x
    }

    function floor(number, precision = 0) {
        let x = 10 ** (-precision)
        let remain = number % x
        if (!remain) {
            return number
        }
        return number - remain
    }

    function round(number, precision = 0) {
        let x = 10 ** (-precision)
        let remain = number % x
        if (!remain) {
            return number
        } else if (remain / x < 0.5) {
            return number - remain
        } else {
            return (number - remain) + x
        }
    }

    function max(array) {
        return maxBy(array)
    }

    function maxBy(array, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let max = array[0]
        for (let i = 1; i < array.length; i++) {
            if (iteratee(array[i]) > iteratee(max)) {
                max = array[i]
            }
        }
        return max
    }

    function min(array) {
        return minBy(array)
    }

    function minBy(array, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let min = array[0]
        for (let i = 1; i < array.length; i++) {
            if (iteratee(array[i]) < iteratee(min)) {
                min = array[i]
            }
        }
        return min
    }

    function mean(array) {
        return meanBy(array)
    }

    function meanBy(array, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        return reduce(map(array, iteratee), (a, b) => a + b) / array.length
    }

    function sum(array) {
        let sum = array[0]
        for (let i = 1; i < array.length; i++) {
            sum += array[i]
        }
        return sum
    }

    function sumBy(array, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let sum = iteratee(array[0])
        for (let i = 1; i < array.length; i++) {
            let it = iteratee(array[i], i, array)
            sum += it
        }
        return sum
    }

    function add(augend, addend) {
        let res = augend
        for (let i = 0; i < addend; i++) {
            res++
        }
        return res
    }

    function subtract(minuend, subtrahend) {
        let res = minuend
        for (let i = 0; i < subtrahend; i++) {
            res--
        }
        return res
    }

    function divide(dividend, divisor) {
        return dividend / divisor
    }

    function multiply(multiplier, multiplicand) {
        let res = 0
        for (let i = 0; i < multiplicand; i++) {
            res = add(res, multiplier)
        }
        return res
    }

    function repeat(string = '', n = 1) {
        if (!n) {
            return ''
        }
        let result = string
        for (let i = 1; i < n; i++) {
            result += string
        }
        return result
    }

    function range(start = 0, end, step = 1) {
        let result = []
        let len = 0
        if (arguments.length == 1) {
            end = start
            start = 0
            if (end < 0) {
                step = -1
            }
        }
        if (step) {
            len = (end - start) / step
        } else {
            len = end - start
        }

        for (let count = 0, i = start; count < len; count++, i += step) {
            result.push(i)
        }

        return result
    }

    function rangeRight(start = 0, end, step = 1) {
        start = arguments[0]
        if (arguments.length == 1) {
            end = start
            start = 0
            step = start < end ? 1 : -1
        } else {
            step = arguments[2] === undefined ? 1 : arguments[2]
        }

        let res = []
        let len = step ? Math.abs((end - start) / step) : Math.abs(end - start)
        for (let i = start, count = 0; count < len; i += step, count++) {
            res.unshift(i)
        }
        return res
    }

    function difference(array, ...values) {
        let result = []
        values = flatten(values)
        for (let i = 0; i < array.length; i++) {
            if (!includes(values, array[i])) {
                result.push(array[i])
            }
        }
        return result
    }

    function differenceBy(array, ...args) {
        let iteratee
        if (isArray(args[args.length - 1])) {
            iteratee = identity
        } else {
            iteratee = Iteratee(args.pop())
        }
        let values = flatten(args).map(iteratee)
        let result = []
        for (let i = 0; i < array.length; i++) {
            let val = iteratee(array[i])
            if (!includes(values, val)) {
                result.push(array[i])
            }
        }
        return result
    }

    function differenceWith(array, ...args) {
        let comparator = args.pop()
        let values = flatten(args)
        let result = []
        for (let i = 0; i < array.length; i++) {
            let same = false
            for (let j = 0; j < values.length; j++) {
                if (comparator(array[i], values[j])) {
                    same = true
                    break
                }
            }
            if (!same) {
                result.push(array[i])
            }
        }
        return result
    }

    function concat(array, ...values) {
        let res = slice(array)
        values.forEach(it => {
            if (isArray(it)) {
                res.push(...it)
            } else {
                res.push(it)
            }
        })
        return res
    }

    function toArray(value) {
        if (value === null) {
            return []
        }
        if (value.length) {
            var array = Array(value.length)
            for (let i = 0; i < value.length; i++) {
                array[i] = value[i]
            }
            return array
        }
        if (typeof (value) == 'object') {
            var array = []
            for (let item in value) {
                array.push(value[item])
            }
            return array
        }
        return []
    }

    function nth(array, n = 0) {
        if (n < 0) {
            n = array.length + n
        }
        return array[n]
    }

    function intersection(...arrays) {
        let result = []
        let comp = arrays[0]
        for (let i = 0; i < comp.length; i++) {
            let hasItem = true
            for (let j = 1; j < arrays.length; j++) {
                if (!includes(arrays[i], comp[i])) {
                    hasItem = false
                    break
                }
            }
            if (hasItem == true) {
                result.push(comp[i])
            }
        }
        return result
    }

    function intersectionBy(...args) {
        let iteratee = Iteratee(args.pop())
        let result = []
        let comp = args.shift()
        args = args.map(it => it.map(iteratee))
        for (let i = 0; i < comp.length; i++) {
            let hasItem = true
            for (let j = 0; j < args.length; j++) {
                let a = iteratee(comp[i])
                if (!includes(args[j], a)) {
                    hasItem = false
                    break
                }
            }
            if (hasItem == true) {
                result.push(comp[i])
            }
        }
        return result
    }

    function intersectionWith(...args) {
        let comparator = args.pop()
        let result = []
        let comp = args.shift()
        for (let i = 0; i < comp.length; i++) {
            let allHasItem = false
            for (let j = 0; j < args.length; j++) {
                let hasItem = false
                for (let a of args[j]) {
                    if (comparator(comp[i], a)) {
                        hasItem = true
                        break
                    }
                }
                allHasItem = hasItem ? true : false
                if (!hasItem) {
                    break
                }
            }
            if (allHasItem) {
                result.push(comp[i])
            }
        }
        return result
    }


    function pull(array, ...values) {
        let len = array.length
        for (let i = len - 1; i >= 0; i--) {
            if (includes(values, array[i])) {
                swap(array, i, array.length - 1)
                array.pop()
            }
        }
        return array
    }

    function pullAll(array, values) {
        let len = array.length
        for (let i = len - 1; i >= 0; i--) {
            if (includes(values, array[i])) {
                swap(array, i, array.length - 1)
                array.pop()
            }
        }
        return array
    }

    function pullAllBy(array, values, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let len = array.length
        for (let i = len - 1; i >= 0; i--) {
            for (let j = 0; j < values.length; j++) {
                let a = iteratee(array[i])
                let b = iteratee(values[j])
                if (a == b) {
                    swap(array, i, array.length - 1)
                    array.pop()
                    break
                }
            }
        }
        return array
    }

    function pullAllWith(array, values, comparator) {
        let len = array.length
        for (let i = len - 1; i >= 0; i--) {
            for (let j = 0; j < values.length; j++) {
                if (comparator(array[i], values[j])) {
                    swap(array, i, array.length - 1)
                    array.pop()
                    break
                }
            }
        }
        return array
    }

    function pullAt(array, indexes) {
        let res = []
        let count = 0
        for (let i in indexes) {
            let idx = indexes[i]
            res.push(...array.splice(idx - count, 1))
            count++
        }
        return res
    }

    function swap(array, i, j) {
        let t = array[i]
        array[i] = array[j]
        array[j] = t
    }

    function remove(array, predicate = identity) {
        let removed = []
        let len = array.length
        for (let i = len - 1; i >= 0; i--) {
            if (predicate(array[i], i, array)) {
                swap(array, i, array.length - 1)
                removed.unshift(array.pop())
            }
        }
        array = removed
        return array
    }

    function mapValues(obj, mapper) {
        if (arguments.length == 1) {
            return obj
        }
        if (typeof (mapper) != "function") {
            let val = mapper
            mapper = key => key[val]
        }
        let result = {}
        for (let key in obj) {
            result[key] = mapper(obj[key])
        }
        return result
    }

    function mapKeys(object, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let res = {}
        for (let key in object) {
            let resKey = iteratee(object[key], key, object)
            res[resKey] = key
        }
        return res
    }



    function map(collection, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let res = []
        for (let key in collection) {
            res.push(iteratee(collection[key], key, collection))
        }
        return res
    }

    function partition(collection, predicate = identity) {
        predicate = Iteratee(predicate)

        let T = []
        let F = []
        let res = [T, F]

        for (let key in collection) {
            let item = collection[key]
            predicate(item, key, collection) ? T.push(item) : F.push(item)
        }
        return res
    }

    function reduce(collection, iteratee = identity, accumulator) {
        iteratee = Iteratee(iteratee)
        if (arguments.length < 3) {
            accumulator = collection[0]
        } else {
            accumulator = iteratee(accumulator, collection[0], 0, collection)
        }
        for (let i = 1; i < collection.length; i++) {
            accumulator = iteratee(accumulator, collection[i], i, collection)
        }
        return accumulator
    }

    function reduceRight(collection, iteratee = identity, accumulator) {
        // 仅考虑了collection为数组的情况
        if (collection.length) {
            iteratee = Iteratee(iteratee)
            let idx = collection.length - 1
            if (arguments.length < 3) {
                accumulator = collection[idx]
            } else {
                accumulator = iteratee(accumulator, collection[idx], idx, collection)
            }
            for (let i = idx - 1; i >= 0; i--) {
                accumulator = iteratee(accumulator, collection[i], i, collection)
            }
            return accumulator
        }
    }

    function reject(collection, predicate = identity) {
        predicate = Iteratee(predicate)
        let res = []
        for (let key in collection) {
            it = collection[key]
            if (!predicate(it, key, collection)) {
                res.push(it)
            }
        }
        return res
    }

    function some(collection, predicate = identity) {
        predicate = Iteratee(predicate)
        for (let key in collection) {
            it = collection[key]
            if (predicate(it, key, collection)) {
                return true
            }
        }
        return false
    }

    function every(collection, predicate = identity) {
        predicate = Iteratee(predicate)
        for (let key in collection) {
            if (!predicate(collection[key], key, collection)) {
                return false
            }
        }
        return true
    }

    function find(collection, predicate = identity, fromIndex = 0) {
        predicate = Iteratee(predicate)
        if (collection.length) { //数组
            let len = collection.length
            if (fromIndex < 0) {
                fromIndex = len + fromIndex
            }
            for (let i = fromIndex; i < len; i++) {
                let item = collection[i]
                if (predicate(item, i, collection)) {
                    return item
                }
            }
        }
        for (let key in collection) { //对象
            if (predicate(collection[key], key, collection)) {
                return collection[key]
            }
        }
    }

    function findLast(collection, predicate = identity, fromIndex = 0) {
        if (collection.length) { //数组
            let len = collection.length
            if (fromIndex < 0) {
                fromIndex = len + fromIndex
            }
            for (let i = len - 1; i >= fromIndex; i--) {
                let item = collection[i]
                if (predicate(item, i, collection)) {
                    return item
                }
            }
        }
        for (let key in collection) { //对象
            if (predicate(collection[key], key, collection)) {
                return collection[key]
            }
        }
    }


    function findKey(object, predicate = identity) {
        predicate = Iteratee(predicate)
        for (let key in object) { //对象
            if (predicate(object[key], key, object)) {
                return key
            }
        }
    }

    function findLastKey(object, predicate = identity) {
        predicate = Iteratee(predicate)
        let res = {}
        for (let key in object) { //对象
            if (predicate(object[key], key, object)) {
                res = {}
                res[key] = object[key]
            }
        }
        return res
    }

    function findIndex(array, predicate = identity, fromIndex = 0) {
        predicate = Iteratee(predicate)
        let len = array.length
        if (fromIndex < 0) {
            fromIndex = len + fromIndex
        }
        for (let i = fromIndex; i < len; i++) {
            let item = array[i]
            if (predicate(item, i, array)) {
                return i
            }
        }
        return -1
    }

    function findLastIndex(array, predicate = identity, fromIndex = array.length - 1) {
        predicate = Iteratee(predicate)
        let len = array.length
        if (fromIndex < 0) {
            fromIndex = len + fromIndex
        }
        if (fromIndex > len - 1) {
            fromIndex = len - 1
        }
        for (let i = fromIndex; i >= 0; i--) {
            let item = array[i]
            if (predicate(item, i, array)) {
                return i
            }
        }
        return -1
    }

    function forEach(collection, iteratee = identity) {
        for (let key in collection) {
            iteratee(collection[key], key, collection)
        }
        return collection
    }

    function forEachRight(collection, iteratee = identity) {
        for (let i = collection.length; i >= 0; i--) {
            iteratee(collection[i])
        }
        return collection
    }

    function shuffle(collection) {
        // 仅考虑了collection为数组时的情况
        let len = collection.length - 1
        while (len > 1) {
            i = len
            let j = Math.round(Math.random() * len)
            swap(collection, i, j)
            i--
            len--
        }
        return collection
    }

    function countBy(collection, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let result = {}
        for (let key in collection) {
            let it = iteratee(collection[key], key, collection)
            if (result[it] === undefined) {
                result[it] = 0
            }
            result[it]++
        }
        return result
    }

    function groupBy(collection, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let result = {}
        for (let key in collection) {
            let it = iteratee(collection[key], key, collection)
            if (result[it] === undefined) {
                result[it] = []
            }
            result[it].push(collection[key])
        }
        return result
    }

    function keyBy(array, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let result = {}
        for (let i in array) {
            let it = iteratee(array[i], i, array)
            result[it] = array[i]
        }
        return result
    }

    function dropRightWhile(array, predicate = identity) {
        predicate = Iteratee(predicate)
        let len = array.length - 1
        while (len > -1) {
            let it = predicate(array[len], len, array)
            if (!it) {
                return array
            }
            array = initial(array)
            len--
        }
    }

    function dropWhile(array, predicate = identity) {
        predicate = Iteratee(predicate)
        let len = array.length - 1
        while (len > -1) {
            let it = predicate(array[0], 0, array)
            if (!it) {
                return array
            }
            array = tail(array)
            len--
        }
    }



    function xor(...arrays) {
        let res = []
        let ary = flatten(arrays)
        for (let i = 0; i < ary.length; i++) {
            let hasIt = false
            for (let j = i + 1; j < ary.length; j++) {
                if (ary[i] == ary[j]) {
                    hasIt = true
                    ary.splice(j, 1)
                    j--
                }
            }
            if (hasIt) {
                ary.splice(i, 1)
                i--
            } else {
                res.push(ary[i])
            }
        }
        return res
    }

    function xorBy(...args) {
        if (isArray(args[args.length - 1])) {
            iteratee = identity
        } else {
            iteratee = Iteratee(args.pop())
        }
        let res = []
        let ary = flatten(args.map(it => uniqBy(it, iteratee)))
        for (let i = 0; i < ary.length; i++) {
            let hasIt = false
            for (let j = i + 1; j < ary.length; j++) {
                let a = iteratee(ary[i])
                let b = iteratee(ary[j])
                if (a == b) {
                    hasIt = true
                    ary.splice(j, 1)
                    j--
                }
            }
            if (hasIt) {
                ary.splice(i, 1)
                i--
            } else {
                res.push(ary[i])
            }
        }
        return res
    }

    function xorWith(...args) {
        if (isArray(args[args.length - 1])) {
            iteratee = identity
        } else {
            comparator = args.pop()
        }
        let res = []
        let ary = flatten(args.map(it => uniqWith(it, comparator)))
        for (let i = 0; i < ary.length; i++) {
            let hasIt = false
            for (let j = i + 1; j < ary.length; j++) {
                if (comparator(ary[i], ary[j])) {
                    hasIt = true
                    ary.splice(j, 1)
                    j--
                }
            }
            if (hasIt) {
                ary.splice(i, 1)
                i--
            } else {
                res.push(ary[i])
            }
        }
        return res
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

    function isBoolean(value) {
        return Object.prototype.toString.call(value) == '[object Boolean]'
    }

    function isDate(value) {
        return Object.prototype.toString.call(value) == '[object Date]'
    }

    function isEmpty(value) {
        if (value === null || typeof value !== 'object') {
            return true
        }
        if (isArray(value) || isArrayLike(value) || isArrayLikeObject(value)) {
            return value.length == 0
        }
        if (isObject(value) || isObjectLike(value)) {
            return Object.keys(value).length == 0
        }
        if (isMap(value) || isSet(value)) {
            return value.size == 0
        }
    }

    function isElement(value) {
        return value instanceof HTMLElement
    }

    function isError(value) {
        return value instanceof Error
    }

    function isFunction(value) {
        return Object.prototype.toString.call(value) == '[object Function]'
    }

    function isFinite(value) {
        return isNumber(value) && value > -Infinity && value < Infinity
    }

    function toFinite(value) {
        value = toNumber(value)
        if (isFinite(value)) {
            return value
        } else {
            if (value == Infinity) {
                return Number.MAX_VALUE
            }
            if (value == -Infinity) {
                return -Number.MAX_VALUE
            }
        }
    }

    function isInteger(value) {
        if (value == Infinity || value == -Infinity) {
            return false
        }
        if (isNumber(value)) {
            return value == Math.floor(value)
        }
        return false
    }

    function toInteger(value) {
        value = toFinite(value)
        return floor(value)
    }

    function isLength(value) {
        return isInteger(value) && value >= 0 && value < 2 ** 32 - 1
    }

    function toLength(value) {
        value = toInteger(value)
        if (value < 0) {
            return 0
        }
        if (value > 2 ** 32 - 1) {
            return 2 ** 32 - 1
        }
        return value
    }

    function isMap(value) {
        return Object.prototype.toString.call(value) == '[object Map]'
    }

    function isNaN(value) {
        if (isObject(value)) {
            return value.valueOf() !== value.valueOf()
        }
        return isNumber(value) && value !== value
    }

    function isNil(value) {
        return isNull(value) || isUndefined(value)
    }

    function isNull(value) {
        return value === null
    }

    function isNumber(value) {
        return typeof value == 'number' || value instanceof Number
    }

    function toNumber(value) {
        if (typeof value == Number) {
            return value
        }
        return Number(value)
    }

    function isObject(value) {
        if (isNil(value) ||
            isBoolean(value) ||
            isString(value) ||
            isNumber(value) ||
            isSymbol(value)) {
            return false
        } else {
            return true
        }
    }

    function isObjectLike(value) {
        return !isNull(value) && typeof value == 'object'
    }

    function isPlainObject(value) {
        if (Object.getPrototypeOf(value) === null) {
            return true
        }
        if (Object.getPrototypeOf(value).constructor === Object) {
            return true
        }
        return false
    }

    function isRegExp(value) {
        return Object.prototype.toString.call(value) == '[object RegExp]'
    }

    function isSet(value) {
        return Object.prototype.toString.call(value) == '[object Set]'
    }

    function isString(value) {
        return Object.prototype.toString.call(value) == '[object String]'
    }

    function isSymbol(value) {
        return Object.prototype.toString.call(value) == '[object Symbol]'
    }

    function isTypedArray(value) {
        let reg = /^\[object Uint\d+Array\]$/
        let type = Object.prototype.toString.call(value)
        return reg.test(type)
    }

    function isUndefined(value) {
        return value === undefined
    }

    function isWeakMap(value) {
        return Object.prototype.toString.call(value) == '[object WeakMap]'
    }

    function isWeakSet(value) {
        return Object.prototype.toString.call(value) == '[object WeakSet]'
    }

    function filter(collection, predicate = identity) {
        predicate = Iteratee(predicate)
        let res = []
        for (let key in collection) {
            let item = collection[key]
            if (predicate(item, key, collection)) {
                res.push(item)
            }
        }
        return res
    }

    function slice(array, start = 0, end = array.length) {
        if (isArray(array)) {
            let res = []
            if (end < 0) {
                end = array.length + end
            }
            for (let i = start; i < end; i++) {
                res.push(array[i])
            }
            return res
        }
        if (isString(array)) {
            let res = ''
            if (end < 0) {
                end = array.length + end
            }
            for (let i = start; i < end; i++) {
                res += array[i]
            }
            return res
        }
    }

    function eq(value, other) {
        if (typeof value !== typeof other) {
            return false
        }
        if (typeof value == 'number') {
            if (value.toString() == 'NaN' && other.toString() == 'NaN') {
                return true
            }
        }
        return value == other
    }

    function gt(value, other) {
        return value > other
    }

    function gte(value, other) {
        return gt(value, other) || eq(value, other)
    }

    function lt(value, other) {
        return value < other
    }

    function lte(value, other) {
        return lt(value, other) || eq(value, other)
    }

    function sortedIndex(array, value, idx = 0) {
        // 用二分法
        if (array[0] >= value) {
            return 0 + idx
        }
        if (array[array.length - 1] < value) {
            return array.length + idx
        }
        let mid = array.length >> 1
        if (array[mid] >= value) {
            return sortedIndex(array.slice(0, mid), value, idx)
        } else {
            return sortedIndex(array.slice(mid, array.length), value, idx + mid)
        }
    }

    function sortedIndexBy(array, value, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        array = array.map(iteratee)
        value = iteratee(value)
        return sortedIndex(array, value)
    }

    function sortedIndexOf(array, value, idx = 0) {
        if (array[0] > value) {
            return -1
        }
        if (array[array.length - 1] < value) {
            return -1
        }
        return sortedIndex(array, value)
    }

    function sortedLastIndex(array, value, idx = 0) {
        if (array[0] > value) {
            return 0 + idx
        }
        if (array[array.length - 1] <= value) {
            return array.length + idx
        }
        let mid = array.length >> 1
        if (array[mid] > value) {
            return sortedLastIndex(array.slice(0, mid), value, idx)
        } else {
            return sortedLastIndex(array.slice(mid, array.length), value, idx + mid)
        }
    }

    function sortedLastIndexBy(array, value, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        array = array.map(iteratee)
        value = iteratee(value)
        return sortedLastIndex(array, value)
    }

    function sortedLastIndexOf(array, value) {
        if (array[0] > value) {
            return -1
        }
        if (array[array.length - 1] < value) {
            return -1
        }
        return sortedLastIndex(array, value) - 1
    }

    function sortedUniq(array) {
        let res = []
        for (let it of array) {
            let len = res.length - 1
            if (len < 0 || it != res[len]) {
                res.push(it)
            }
        }
        return res
    }

    function sortedUniqBy(array, iteratee) {
        iteratee = Iteratee(iteratee)
        let res = []
        for (let it of array) {
            let len = res.length - 1
            let a = iteratee(it)
            let b = iteratee(res[len])
            if (len < 0 || a != b) {
                res.push(it)
            }
        }
        return res
    }

    function union(...arrays) {
        let res = []
        let map = {}
        for (let array of arrays) {
            for (let it of array) {
                if (map[it] === undefined) {
                    map[it] = true
                    res.push(it)
                }
            }
        }
        return res
    }

    function unionBy(...args) {
        let iteratee = args.pop()
        let arrays = args
        iteratee = Iteratee(iteratee)
        let res = []
        let map = {}
        for (let array of arrays) {
            for (let it of array) {
                let trans = iteratee(it)
                if (map[trans] === undefined) {
                    map[trans] = true
                    res.push(it)
                }
            }
        }
        return res
    }

    function unionWith(...args) {
        let comparator
        if (isArray(args[args.length - 1])) {
            comparator = identity
        } else {
            comparator = Iteratee(args.pop())
        }
        let array = args.shift()
        let others = flatten(args)
        for (let a of others) {
            let hasA = false
            for (let b of array) {
                if (comparator(a, b)) {
                    hasA = true
                    break
                }
            }
            if (!hasA) {
                array.push(a)
            }
        }
        return array
    }

    function assign(object, ...sources) {
        for (let source of sources) {
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    object[key] = source[key]
                }
            }
        }
        return object
    }

    function assignIn(object, ...sources) {
        for (let source of sources) {
            for (let key in source) {
                object[key] = source[key]
            }
        }
        return object
    }

    function merge(object, ...sources) {
        for (let source of sources) {
            for (let key in source) {
                if (typeof source[key] == 'object' && typeof object[key] == 'object') {
                    merge(object[key], source[key])
                } else if (source[key] !== undefined) {
                    object[key] = source[key]
                }
            }
        }
        return object
    }

    function mergeWith(object, ...sources) {
        let customizer = sources.pop()
        for (let source of sources) {
            for (let key in source) {
                let objValue = object[key]
                let srcValue = source[key]
                object[key] = customizer(objValue, srcValue, key, object, source)
                if (object[key] === undefined) {
                    if (typeof objValue == 'object' && typeof srcValue == 'object') {
                        mergeWith(objValue, srcValue, customizer)
                    } else {
                        if (srcValue !== undefined) {
                            object[key] = srcValue
                        }
                    }
                }
            }
        }
        return object
    }

    function defaults(object, ...sources) {
        for (let source of sources) {
            for (let key in source) {
                if (object[key] === undefined) {
                    object[key] = source[key]
                }
            }
        }
        return object
    }

    function defaultsDeep(object, ...sources) {
        for (let source of sources) {
            for (let key in source) {
                if (object[key] === undefined) {
                    object[key] = source[key]
                }
                if (typeof object[key] == 'object') {
                    defaultsDeep(object[key], source[key])
                }
            }
        }
        return object
    }

    function defaultTo(value, defaultValue) {
        if (isNaN(value) || isNil(value)) {
            return defaultValue
        } else {
            return value
        }
    }

    function has(object, path) {
        let props = toPath(path)
        for (let prop of props) {
            if (!object.hasOwnProperty(prop)) {
                return false
            }
            object = object[prop]
        }
        return true
    }

    function hasIn(object, path) {
        let props = toPath(path)
        for (let prop of props) {
            if (object[prop] === undefined) {
                return false
            }
            object = object[prop]
        }
        return true
    }

    function create(prototype, properties) {
        if (properties) {
            for (let key in properties) {
                prototype[key] = properties[key]
            }
        }
        return prototype
    }


    // function bind(func, thisArg, partials) {
    //   return function f(arg) {
    //     func.call(thisArg)
    //     return func(partials,arg)
    //   }
    // }

    // function parseInt(string, radix=10) {
    //   let res = 0
    //   for (let i = string.length - 1, j = 0; i >= 0; i--, j++) {
    //     let digit = string[i]
    //     res+= digit * radix ** j
    //   }
    //   return res
    // }

    function invert(object) {
        let res = {}
        for (let key in object) {
            res[object[key]] = key
        }
        return res
    }

    function invertBy(object, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let res = {}
        for (let key in object) {
            let resKey = iteratee(object[key])
            if (res[resKey] === undefined) {
                res[resKey] = [key]
            } else {
                res[resKey].push(key)
            }
        }
        return res
    }

    function invoke(object, path, ...args) {
        let paths = toPath(path)
        let method = paths.pop()
        for (let path of paths) {
            object = object[path]
        }
        return object[method](...args)
    }

    function invokeMap() {
        let collection = arguments[0]
        let path
        let args
        if (arguments.length > 1) {
            path = arguments[1]
        }
        if (arguments.length > 2) {
            args = slice(arguments, 2)
        }
        if (typeof path !== 'function') {
            path = Array.prototype[path]
        }
        return collection.map(it => {
            if (args !== undefined) {
                return path.apply(it, args)
            } else {
                return path.apply(it)
            }
        })
    }

    function keys(object) {
        let keys = []
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                keys.push(key)
            }
        }
        return keys
    }

    function keysIn(object) {
        let keys = []
        for (let key in object) {
            keys.push(key)
        }
        return keys
    }

    function times(n, iteratee = identity) {
        let res = []
        for (let i = 0; i < n; i++) {
            res.push(iteratee(i))
        }
        return res
    }

    function constant(value) {
        return function () {
            return value
        }
    }

    function values(object) {
        let res = []
        for (let prop in object) {
            if (object.hasOwnProperty(prop)) {
                res.push(object[prop])
            }
        }
        return res
    }

    function valuesIn(object) {
        let res = []
        for (let prop in object) {
            res.push(object[prop])
        }
        return res
    }

    function pad(string = '', length = 0, chars = ' ') {
        let i = 0
        let repeatTimes = length - string.length

        let padStartTimes = 0
        let padEndTimes = 0
        if (repeatTimes % 2) {
            padStartTimes = Math.floor(repeatTimes / 2)
            padEndTimes = repeatTimes - padStartTimes
        } else {
            padStartTimes = padEndTimes = repeatTimes / 2
        }

        let padStartStr = ''
        let padEndStr = ''

        while (padStartTimes > 0) {
            padStartStr += chars[i++]
            if (i == chars.length) {
                i = 0
            }
            padStartTimes--
        }
        while (padEndTimes > 0) {
            padEndStr += chars[i++]
            if (i == chars.length) {
                i = 0
            }
            padEndTimes--
        }
        return padStartStr + string + padEndStr
    }

    function padEnd(string = '', length = 0, chars = ' ') {
        let i = 0
        let repeatTimes = length - string.length
        let str = ''
        while (repeatTimes > 0) {
            str += chars[i++]
            if (i == chars.length) {
                i = 0
            }
            repeatTimes--
        }

        return string + str
    }

    function padStart(string = '', length = 0, chars = ' ') {
        let i = 0
        let repeatTimes = length - string.length
        let str = ''
        while (repeatTimes > 0) {
            str += chars[i++]
            if (i == chars.length) {
                i = 0
            }
            repeatTimes--
        }

        return str + string
    }


    function escape(string = '') {
        let str = ''
        for (let char of string) {
            if (char == "&") {
                str += '&amp;'
            } else if (char == "<") {
                str += '&lt;'
            } else if (char == "&>") {
                str += '&gt;'
            } else if (char == "\"") {
                str += '&quot;'
            } else if (char == "\'") {
                str += '&#39;'
            } else {
                str += char
            }
        }
        return str
    }

    function unescape(string = '') {
        let str = ''
        for (let i = 0; i < string.length; i++) {
            let char = string[i]
            if (char == '&') {
                let escChar = ''
                while (string[i] != ';') {
                    escChar += string[i]
                    i++
                }
                if (escChar == "&amp") {
                    str += '&'
                } else if (escChar == "&lt") {
                    str += '<'
                } else if (escChar == "&gt") {
                    str += '>'
                } else if (escChar == "&quot") {
                    str += '\"'
                } else if (escChar == "&#39") {
                    str += '\''
                }
            } else {
                str += char
            }
        }
        return str
    }

    function escapeRegExp(string = '') {
        let escapes = ["^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", "|"]
        let res = ''
        for (let char of string) {
            if (includes(escapes, char)) {
                res += '\\' + char
            } else {
                res += char
            }
        }
        return res
    }

    function includes(collection, value, fromIndex = 0) {
        let len = collection.length
        let i = 0
        if (fromIndex < 0) {
            fromIndex += len
        }
        for (let key in collection) {
            if (i >= fromIndex) {
                let val = collection[key]
                let j = 0
                if (val == value) {
                    return true
                }
                while (collection[i] && collection[i] == value[j]) {
                    i++
                    j++
                    if (value[j] === undefined) {
                        return true
                    }
                }
            }
            i++
        }
        return false
    }

    function castArray(value) {
        if (arguments.length == 0) {
            return []
        }
        if (!isArray(value)) {
            return [value]
        }
        return value
    }

    function conforms(source) {
        return function (obj) {
            return conformsTo(obj, source)
        }
    }

    function conformsTo(object, source) {
        for (let key in source) {
            let predicate = source[key]
            return predicate(object[key])
        }
    }




    function inRange(number, start, end) {
        if (arguments.length == 2) {
            end = arguments[1]
            start = 0
        }
        if (start > end) {
            let t = start
            start = end
            end = t
        }
        return number > start && number < end
    }

    function at(object, paths) {
        return map(map(paths, toPath), path => {
            let obj = object
            for (let p of path) {
                obj = obj[p]
            }
            return obj
        })
    }

    function forIn(object, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        for (let key in object) {
            iteratee(object[key], key, object)
        }
        return object
    }

    function NodeList(val, next) {
        this.val = val
        this.next = next ?? null
        return this
    }

    function forInRight(object, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let stack = new NodeList()
        for (let key in object) {
            let prop = {}
            prop[key] = object[key]
            let node = new NodeList(prop, stack)
            stack = node
        }

        while (stack.val) {
            for (let key in stack.val) {
                let val = stack.val[key]
                iteratee(val, key, object)
            }
            stack = stack.next
        }

        return object
    }

    function forOwn(object, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                iteratee(object[key], key, object)
            }
        }
        return object
    }

    function forOwnRight(object, iteratee = identity) {
        iteratee = Iteratee(iteratee)
        let stack = new NodeList()
        for (let key in object) {
            let prop = {}
            prop[key] = object[key]
            let node = new NodeList(prop, stack)
            stack = node
        }

        while (stack.val) {
            for (let key in stack.val) {
                if (object.hasOwnProperty(key)) {
                    let val = stack.val[key]
                    iteratee(val, key, object)
                }
            }
            stack = stack.next
        }

        return object
    }

    function functions(object) {
        let res = []
        for (let key in object) {
            if (object.hasOwnProperty(key) && typeof object[key] == 'function') {
                res.push(key)
            }
        }
        return res
    }

    function functionsIn(object) {
        let res = []
        for (let key in object) {
            if (typeof object[key] == 'function') {
                res.push(key)
            }
        }
        return res
    }

    function toPairs(object) {
        if (isArray(object)) {
            return object
        }
        if (isMap(object) || isSet(object)) {
            return array.from(object)
        }
        let res = []
        for (let key in object) {
            let val = object[key]
            if (object.hasOwnProperty(key)) {
                res.push([key, val])
            }
        }
        return res
    }

    function fromPairs(pairs) {
        let obj = {}
        forEach(pairs, pair => {
            let key = pair[0]
            let val = pair[1]
            obj[key] = val
        })
        return obj
    }

    function toPairsIn(object) {
        if (isArray(object)) {
            return object
        }
        if (isMap(object) || isSet(object)) {
            return array.from(object)
        }
        let res = []
        for (let key in object) {
            let val = object[key]
            res.push([key, val])
        }
        return res
    }

    // function transform(object, iteratee=identity, accumulator) {
    //     let collection = toPairs(object)
    //     return reduce(collection, iteratee, accumulator)
    // }

    function setWith(object, path, value, customizer = undefined) {
        let paths = toPath(path)
        let len = paths.length
        let obj = object
        for (let i = 0; i < len; i++) {
            let path = paths[i]
            if (i == len - 1) {
                obj[path] = value
                return object
            }
            if (obj[path] === undefined) {
                if (customizer) {
                    obj[path] = new customizer
                } else {
                    if (path >= 0 && path <= 9) {
                        obj[path] = []
                    } else {
                        obj[path] = {}
                    }
                }
            }
            obj = obj[path]
        }
    }

    function set(object, path, value) {
        return setWith(object, path, value)
    }

    function unset(object, path) {
        let paths = toPath(path)
        let len = paths.length
        let obj = object
        for (let i = 0; i < len; i++) {
            let path = paths[i]
            if (i == len - 1) {
                return delete obj[path]
            }
            obj = obj[path]
        }
        return false
    }

    function updateWith(object, path, updater, customizer = undefined) {
        let paths = toPath(path)
        let len = paths.length
        let obj = object
        for (let i = 0; i < len; i++) {
            let path = paths[i]
            if (i == len - 1) {
                obj[path] = updater(obj[path])
                return object
            }
            if (obj[path] === undefined) {
                if (customizer) {
                    obj[path] = new customizer
                } else {
                    if (path >= 0 && path <= 9) {
                        obj[path] = []
                    } else {
                        obj[path] = {}
                    }
                }
            }
            obj = obj[path]
        }
    }

    function update(object, path, updater) {
        return updateWith(object, path, updater)
    }

    function camelCase(string = '') {
        let arr = lowerCase(string).split(' ')
        let res = toLower(arr[0])
        for (let i = 1; i < arr.length; i++) {
            let word = arr[i]
            res += capitalize(word)
        }
        return res
    }

    function kebabCase(string = '') {
        return replace(lowerCase(string), ' ', '-')
    }

    function snakeCase(string = '') {
        return replace(lowerCase(string), ' ', '_')
    }

    function startCase(string = '') {
        string = parseName(string)
        return map(split(string, ' '), word => {
            if (/[a-z]/.test(word)) {
                return capitalize(word)
            } else {
                return word
            }
        }).join(' ')
    }

    function capitalize(string = '') {
        let res = ''
        res += toUpper(string[0])
        for (let i = 1; i < string.length; i++) {
            res += toLower(string[i])
        }
        return res
    }

    function lowerFirst(string = '') {
        return toLower(string[0]) + string.slice(1)
    }

    function upperFirst(string = '') {
        return toUpper(string[0]) + string.slice(1)
    }

    function endsWith(string = '', target, position = string.length) {
        return string[position - 1] == target
    }

    function startsWith(string = '', target, position = 0) {
        return string[position] == target
    }

    function toLower(string = '') {
        let res = ''
        for (let char of string) {
            let code = char.charCodeAt()
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(code + 32)
            }
            res += char
        }
        return res
    }

    function toUpper(string = '') {
        let res = ''
        for (let char of string) {
            let code = char.charCodeAt()
            if (code >= 97 && code <= 122) {
                char = String.fromCharCode(code - 32)
            }
            res += char
        }
        return res
    }

    function lowerCase(string = '') {
        return toLower(words(string).join(' '))
    }

    function upperCase(string = '') {
        return toUpper(words(string).join(' '))
    }

    function words(string = '', pattern) {
        if (!pattern) {
            let str = trim(string, /[^a-zA-Z0-9]/)
            let i = 0
            let res = []
            while (i < str.length) {
                if (isLowerCase(str[i])) {
                    let tmp = ''
                    while (isLowerCase(str[i])) {
                        tmp += str[i]
                        i++
                    }
                    res.push(tmp)
                }
                if (isNumStr(str[i])) {
                    let tmp = ''
                    while (isNumStr(str[i])) {
                        tmp += str[i]
                        i++
                    }
                    res.push(tmp)
                }
                if (isUpperCase(str[i])) {
                    let tmp = str[i]
                    let tmpIdx = i
                    let hasLowerCase = false
                    i++
                    while (isLowerCase(str[i])) {
                        tmp += str[i]
                        i++
                        hasLowerCase = true
                    }
                    while (!hasLowerCase && isUpperCase(str[i])) {
                        tmp += str[i]
                        i++
                    }
                    if (hasLowerCase) {
                        res.push(tmp)
                    } else {
                        if (isLowerCase(str[i])) {
                            i = tmpIdx
                            res.push(str[i])
                        } else {
                            res.push(tmp)
                        }
                    }
                }
                i++
            }
            return res
        } else {
            pattern = new RegExp(pattern)
            if (pattern.global) {
                let res = []
                let tmp = ''
                for (let char of string) {
                    pattern.lastIndex = 0
                    if (pattern.test(char)) {
                        tmp += char
                    } else {
                        if (tmp !== '') {
                            res.push(tmp)
                            tmp = ''
                        }
                    }
                }
                if (tmp !== '') {
                    res.push(tmp)
                }
                return res
            } else {
                return pattern.exec(string)
            }
        }
    }


    function isLowerCase(string = '') {
        return string >= 'a' && string <= 'z'
    }

    function isUpperCase(string = '') {
        return string >= 'A' && string <= 'Z'
    }

    function isNumStr(string = '') {
        return string >= '0' && string <= '9'
    }

    function trim() {
        let string = arguments[0]
        let chars = arguments.length == 2 ? arguments[1] : ' '
        return trimEnd(trimStart(string, chars), chars)
    }

    function trimStart() {
        let string = arguments[0]
        let chars = arguments.length == 2 ? arguments[1] : ' '
        chars = string.match(new RegExp(chars, 'g'))
        let res = ''
        let len = string.length
        let hasChar = true
        for (let i = 0; i < len; i++) {
            let char = string[i]
            if (!hasChar || !includes(chars, char)) {
                res += char
                hasChar = false
            }
        }
        return res
    }

    function trimEnd() {
        let string = arguments[0]
        let chars = arguments.length == 2 ? arguments[1] : ' '
        chars = string.match(new RegExp(chars, 'g'))
        let res = ''
        let len = string.length
        let hasChar = true
        for (let i = len - 1; i >= 0; i--) {
            let char = string[i]
            if (!hasChar || !includes(chars, char)) {
                res = char + res
                hasChar = false
            }
        }
        return res
    }

    function parseInt() {
        let len = arguments.length
        let string = arguments[0]
        let radix = len == 2 ? arguments[1] : 10
        let numStr = ''
        for (let char of string) {
            if (char >= '0' && char < radix) {
                numStr += char
            } else {
                break
            }
        }
        let len2 = numStr.length
        let res = len2 == 0 ? NaN : 0
        for (let i = 0, j = len2 - 1; i < len2; i++, j--) {
            let digit = numStr[j] * radix ** i
            res += digit
        }
        return res
    }


    function replace(string = '', pattern, replacement) {
        if (isRegExp(pattern)) {
            pattern = pattern.exec(string)[0]
        }
        let res = ''
        let matched = false
        for (let i = 0; i < string.length; i++) {
            if (!matched && string[i] == pattern[0]) {
                matched = true
                let j
                for (j = 1; j < pattern.length; j++) {
                    if (string[i + j] !== pattern[j]) {
                        matched = false
                        break
                    }
                }
                if (matched) {
                    res += replacement
                    i += j - 1
                } else {
                    res += string[i]
                }
            } else {
                res += string[i]
            }
        }
        return res
    }

    function clone(value) {
        if (!isCloneable(value)) {
            return {}
        } else if (isObject(value)) {
            if (value === null) {
                return value
            }
            let res = {}
            for (let key in value) {
                let val = value[key]
                res[key] = val
            }
            return res
        } else if (isArrayLike(value)) {
            let res = []
            for (let val of value) {
                res.push(val)
            }
            return res
        } else {
            return value
        }
    }

    function cloneDeep(value) {
        if (!isCloneable(value)) {
            return {}
        } else if (isObject(value)) {
            if (value === null) {
                return value
            }
            let res = {}
            for (let key in value) {
                let val = value[key]
                res[key] = cloneDeep(val)
            }
            return res
        } else if (isArrayLike(value)) {
            let res = []
            for (let val of value) {
                res.push(cloneDeep(val))
            }
            return res
        } else {
            return value
        }
    }

    function isCloneable(value) {
        if (isError(value) || isFunction(value) || isWeakMap(value)) {
            return false
        } else {
            return true
        }
    }

    function ary(func, n = func.length) {
        return function () {
            arguments.length = n
            return func.apply(this, arguments)
        }
    }

    function unary(func) {
        return ary(func, 1)
    }

    function negate(predicate) {
        return function () {
            return !predicate.apply(this, arguments)
        }
    }

    function once(func) {
        let invoked = false
        let res
        return function () {
            if (!invoked) {
                res = func.apply(this, arguments)
                invoked = true
            }
            return res
        }
    }

    // function memoize(func, resolver) {
    //     let val
    //     let key
    //     let data = {}
    //     return function(key) {
    //         val = func.apply(this, arguments)
    //         key = resolver === undefined ? arguments[0] : resolver(arguments[0])
    //         Object.defineProperty(this, 'cache', Fn)
    //         function Fn(val, key) {
    //             this.data = data
    //             this.data[key] = val
    //             this.set = function(key, val) {
    //                 this.data[obj] = val
    //             }
    //         }
    //         return data[key]
    //     }
    // }

    function flip(func) {
        return function () {
            return func.apply(this, reverse(arguments))
        }
    }

    function flow(funcs) {
        let res
        return function () {
            res = arguments
            for (let func of funcs) {
                if (isArrayLike(res)) {
                    res = func.apply(this, res)
                } else {
                    res = func.call(this, res)
                }
            }
            return res
        }
    }

    function flowRight(funcs) {
        return flow(reverse(funcs))
    }

    function method(path, args) {
        let paths = toPath(path)
        return function (object) {
            let res = object
            for (let path of paths) {
                res = res[path]
            }
            return res.apply(this, args)
        }
    }

    function methodOf(object, args) {
        return function (path) {
            let paths = toPath(path)
            let res = object
            for (let path of paths) {
                res = res[path]
            }
            return res.apply(this, args)
        }
    }

    function nthArg(n = 0) {
        return function () {
            args = toArray(arguments)
            return args.at(n)
        }
    }

    function parseJson(string = '') {
        let i = 0
        if (string[0] == '[') {
            return parseJsonArray()
        }
        if (string[0] == '{') {
            return parseJsonObject()
        }
        return parseJsonCharacter()

        function parsePart() {
            if (string[i] == '[') {
                return parseJsonArray()
            }
            if (string[i] == '{') {
                return parseJsonObject()
            }
            return parseJsonCharacter()
        }


        function parseJsonCharacter() {
            if (string[i] == '\"') {
                return parseJsonString()
            }
            if (isNumStr(string[i])) {
                return parseJsonNumber()
            }
            if (string[i] == 't') {
                i += 4
                return true
            }
            if (string[i] == 'f') {
                i += 5
                return false
            }
            if (string[i] == 'u') {
                i += 9
                return undefined
            }
            if (string[i] == 'N') {
                i += 3
                return NaN
            }
            if (string[i] == 'n') {
                i += 4
                return null
            }
        }

        function parseJsonString() {
            i++
            let res = ''
            while (string[i] && string[i] !== '\"') {
                res += string[i]
                i++
            }
            i++
            return res
        }

        function parseJsonNumber() {
            let res = ''
            while (string[i] && string[i] !== ',' || string[i] !== ']' || string[i] !== '}') {
                res += string[i]
                i++
            }
            return toNumber(res)
        }

        function parseJsonArray() {
            i++
            let res = []
            while (string[i] && string[i] !== ']') {
                if (string[i] !== ',') {
                    res.push(parsePart())
                }
                if (string[i] == ',') {
                    i++
                }
            }
            i++
            return res
        }

        function parseJsonObject() {
            i++
            let res = {}
            let key, val
            while (string[i] && string[i] !== '}') {
                if (string[i] !== ',') {
                    if (string[i] !== ':') {
                        key = parsePart()
                    }
                    i++
                    val = parsePart()
                }
                if (string[i] == ',') {
                    i++
                }
                res[key] = val
            }
            i++
            return res
        }
    }


    function stringifyJson(value) {
        let res = ''
        stringifyPart(value)
        return res

        function stringifyPart(value) {
            if (isArray(value)) {
                stringifyArray(value)
            } else if (isObject(value)) {
                stringifyObject(value)
            } else {
                stringifyCharacter(value)
            }
        }

        function stringifyCharacter(value) {
            if (isString(value)) {
                res += '"' + value + '"'
            } else {
                res += value.toString()
            }
        }

        function stringifyArray(value) {
            res += '['
            for (let val of value) {
                stringifyPart(val)
                res += ','
            }
            res = slice(res, 0, -1) + ']'
        }

        function stringifyObject(value) {
            res += '{'
            for (let key in value) {
                let val = value[key]
                stringifyCharacter(key)
                res += ':'
                stringifyPart(val)
                res += ','
            }
            res = slice(res, 0, -1) + '}'
        }
    }



    return {
        identity,
        isEqual,
        isMatch,
        property,
        property,
        matches,
        matchesProperty,
        toPath,
        get,
        split,
        Iteratee,
        filter,
        xor,
        xorBy,
        xorWith,
        add,
        dropRightWhile,
        dropWhile,
        countBy,
        groupBy,
        keyBy,
        forEach,
        forEachRight,
        shuffle,
        every,
        find,
        findLast,
        findKey,
        findLastKey,
        findIndex,
        findLastIndex,
        map,
        partition,
        reduce,
        reduceRight,
        reject,
        some,
        chunk,
        compact,
        drop,
        dropRight,
        fill,
        flatten,
        flattenDeep,
        flattenDepth,
        flatMap,
        flatMapDeep,
        flatMapDepth,
        fromPairs,
        head,
        indexOf,
        initial,
        join,
        last,
        lastIndexOf,
        reverse,
        uniq,
        uniqBy,
        uniqWith,
        without,
        zip,
        zipObject,
        zipObjectDeep,
        zipWith,
        unzip,
        unzipWith,
        size,
        isBoolean,
        ceil,
        floor,
        min,
        minBy,
        max,
        maxBy,
        sum,
        sumBy,
        subtract,
        divide,
        multiply,
        mean,
        meanBy,
        repeat,
        range,
        rangeRight,
        difference,
        differenceBy,
        differenceWith,
        concat,
        toArray,
        nth,
        intersection,
        intersectionBy,
        intersectionWith,
        pull,
        pullAll,
        pullAllBy,
        pullAllWith,
        remove,
        tail,
        take,
        takeRight,
        takeRightWhile,
        takeWhile,
        mapValues,
        slice,
        eq,
        gt,
        gte,
        lt,
        lte,
        sortedIndex,
        sortedIndexBy,
        sortedIndexOf,
        sortedLastIndex,
        sortedLastIndexBy,
        sortedLastIndexOf,
        sortedUniq,
        sortedUniqBy,
        union,
        unionBy,
        unionWith,
        sample,
        round,
        assign,
        assignIn,
        merge,
        mergeWith,
        defaults,
        defaultsDeep,
        defaultTo,
        has,
        hasIn,
        create,
        invert,
        includes,
        inRange,
        at,
        invertBy,
        invoke,
        invokeMap,
        keys,
        keysIn,
        mapKeys,
        values,
        valuesIn,
        escape,
        unescape,
        escapeRegExp,
        pad,
        padEnd,
        padStart,
        times,
        constant,
        castArray,
        conforms,
        conformsTo,
        isEqual,
        forIn,
        forInRight,
        forOwn,
        forOwnRight,
        functions,
        functionsIn,
        isArguments,
        isArray,
        isArrayLike,
        isArrayLikeObject,
        isBoolean,
        isDate,
        isElement,
        isEmpty,
        isEqual,
        isEqualWith,
        isFunction,
        isInteger,
        isNumber,
        isObject,
        isObjectLike,
        isString,
        isError,
        isFinite,
        isLength,
        isMap,
        isMatch,
        isMatchWith,
        isNaN,
        isNil,
        isNull,
        isNumber,
        isObject,
        isObjectLike,
        isPlainObject,
        isRegExp,
        isSet,
        isString,
        isSymbol,
        isTypedArray,
        isUndefined,
        isWeakMap,
        isWeakSet,
        toFinite,
        toInteger,
        toLength,
        toNumber,
        camelCase,
        capitalize,
        endsWith,
        lowerFirst,
        kebabCase,
        lowerCase,
        parseInt,
        replace,
        snakeCase,
        startCase,
        startsWith,
        toLower,
        toUpper,
        trim,
        trimEnd,
        trimStart,
        // truncate,
        upperCase,
        upperFirst,
        words,
        defaultTo,
        clone,
        cloneDeep,
        pullAt,
        ary,
        unary,
        negate,
        once,
        flip,
        flow,
        flowRight,
        method,
        methodOf,
        nthArg,
        parseJson,
        stringifyJson,


        // bind : bind,
        // bindAll,
        // spread,
        // curry,
        // memoize,
        // mixin,
        // uniqueId,
        // deburr,
        // isSafeInteger,
        // isNative,
        // clamp,
        // orderBy,
        // _
        // before: before,
        // after: after,
        // shuffle用递归试试看
        // chain: chain,
        // wrap,
        // sortBy,
        // defer,
        // delay,
        // random,
        // result,
        // omit,
        // omitBy,
        // pick,
        // pickBy,
        // result,
        // transform,,
        // isArrayBuffer,

    }
}()
