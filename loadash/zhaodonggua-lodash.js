var zhaodonggua = {
    chunk: function (array, size) {
        let arr = []
        let length = Math.ceil(array.length / size)
        //外围数组个数
        for (let i = 0; i < length; i++) {
            arr[i] = new Array()
            //内部数组个数
            for (let j = 0; j < size; j++) {
                let num = i * size + j
                if (array[num] == undefined) break;
                arr[i].push(array[num])
            }
        }
        console.log(arr[0], arr[1], arr[2])
    }

}
