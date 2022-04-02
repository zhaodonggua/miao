//iteratee训练
function map(collection, identity) {
    let res = []
    let func = iteratee(identity)
    for (let key in collection) {
        res.push(func(collection[key]))
    }
    return res
}


/* 
通过 predicate（断言函数） 检查 collection（集合）中的 所有 元素是否都返回真值。
一旦 predicate（断言函数） 返回假值，迭代就马上停止。
predicate（断言函数）调用三个参数： (value, index|key, collection)。
  对于空集合返回 true，因为空集合的任何元素都是 true 。
*/
function every(collection, identity) {
    if (isElement(collection)) {
        return true
    }
    let func = iteratee(identity)
    for (let key in collection) {
        if (!func(collection[key])) {
            return false
        }
    }
    return true
}






/* 
  遍历 collection（集合）元素，返回 predicate（断言函数）返回真值 的所有元素的数组。 
  predicate（断言函数）调用三个参数：(value, index|key, collection)。
*/
function filter(collection, identity) {
    let res = []
    let func = iteratee(identity)
    for (let key in collection) {
        if (func(collection[key])) {
            res.push(collection[key])
        }
    }
    return res
}


// 找到满足identity函数条件第一个元素并返回,从fromIndex的位置开始找
function find(collection, identity, fromIndex = 0) {
    let func = iteratee(identity)
    let count = 0
    for (let key in collection) {
        if (count >= fromIndex && func(collection[key])) {
            return collection[key]
        }
        count++
    }
}


// find的反向版本
function findLast(collection, identity, fromIndex = collection.length - 1) {
    let func = iteratee(identity)
    // 此处偷懒只考虑collection为数组,对象的反向遍历不好处理
    for (let i = fromIndex; i >= 0; i--) {
        if (func(collection[i])) {
            return collection[i]
        }
    }
}

// 该方法类似_.find，区别是该方法返回第一个通过 predicate 
// 判断为真值的元素的索引值（index），而不是元素本身。
function findIndex(array, identity, fromIndex = 0) {
    let func = iteratee(identity)
    for (let i = fromIndex; i < array.length; i++) {
        if (func(array[i])) {
            return i
        }
    }
}


function findLastIndex(array, identity, fromIndex = array.length - 1) {
    let func = iteratee(identity)
    for (let i = fromIndex; i >= 0; i--) {
        if (func(array[i])) {
            return i
        }
    }
}


function flatMap(collection, identity) {
    // 参数通过iteratee转发处理下
    let func = iteratee(identity)
    let res = []
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
    let func = iteratee(identity)
    let res = []
    for (let key in collection) {
        let item = collection[key]
        res.push(func(item))
    }
    return flattenDeep(res)
}



function flatMapDepth(collection, identity, depth = 1) {
    let func = iteratee(identity)
    let res = []
    for (let key in collection) {
        res.push(func(collection[key]))
    }
    return flattenDepth(res, depth)
}


function dropWhile(array, identity) {
    let func = iteratee(identity)
    let idx = array.findIndex(func)
    return array.slice(idx)
}



function dropRightWhile(array, identity) {
    // 反转传入的数组再传入dropWhile()处理
    return dropWhile(array.reverse(), identity)
}



function unionBy(...args) {
    // 接受参数,并扁平化为一维数组
    let arr = args.flat()
    // 接受迭代函数参数
    let func = iteratee(arr.pop())
    let map = new Map()
    let set = new Set()
    for (let item of arr) {
        map.set(item, func(item))
        set.add(func(item))
    }
    let res = []
    for (let key of map.keys()) {
        if (set.has(map.get(key))) {
            set.delete(map.get(key))
            res.push(key)
        }
        if (!set.size) {
            return res
        }
    }
}
function invertBy(object, identity) {
    let res = {}
    // iteratee 函数中需要对传入空参数处理
    let func = iteratee(identity)
    for (let key in object) {
        let resKey = func(object[key])
        resKey in res ? res[resKey].push(key) : res[resKey] = [key]
        // res中如果有key则push新的值到其数组中,没有将当前的值设为数组
    }
    return res
}



function mapKeys(object, identity) {
    let res = {}
    let func = iteratee(identity)
    for (let key in object) {
        res[func(object[key], key, object)] = object[key]
    }
    return res
}


function mapValues(object, identity) {
    let res = {}
    let func = iteratee(identity)
    for (let key in object) {
        let item = object[key]
        res[key] = func(item, key, object)
    }
    return res
}


function omit(object, props) {
    let res = {}
    for (let key in object) {
        if (!props.includes(key)) {
            res[key] = object[key]
        }
    }
    return res
}

function omitBy(object, identity) {
    let res = {}
    let func = iteratee(identity)
    for (let key in object) {
        if (!func(object[key])) {
            res[key] = object[key]
        }
    }
    return res
}


function pickBy(object, identity) {
    let res = {}
    let func = iteratee(identity)
    for (let key in object) {
        if (func(object[key])) {
            res[key] = object[key]
        }
    }
    return res
}

function sortedIndexBy(array, value, identity) {
    let func = iteratee(identity)
    for (let key in array) {
        if (func(array[key]) >= value) {
            return key
        }
    }
    return array.length - 1
}




function forEach(collection, identity) {
    let func = iteratee(identity)
    for (let key in collection) {
        if (Object.prototype.hasOwnProperty(collection[key])) {
            func(collection[key], key, collection)
        }
    }
    return collection
}



function forEachRight(collection, identity) {
    let func = iteratee(identity)
    let arr = Object.entries(collection).reverse()
    for (let [key, val] of arr) {
        func(val, key, collection)
    }
    return collection
}


function groupBy(collection, identity) {
    let func = iteratee(identity)
    let res = {}
    for (let key in collection) {
        let item = collection[key]
        let objKey = func(item)
        res[objKey] ? res[objKey].push(item) : res[objKey] = [item]
    }
    return res
}
