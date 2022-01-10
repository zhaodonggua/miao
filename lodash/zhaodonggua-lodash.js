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




}

