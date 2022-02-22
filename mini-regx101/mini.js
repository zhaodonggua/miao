//可以用元素id变量名访问到这个元素
function run() {
    var reStr = reInput.value
    var flags = getFlags()
    var testString = testStringInput.value
    let replace = replaceStr.value;

    //如果啥都没输
    if (reStr.length == 0) {
        resultShow.innerHTML = ""
        replace.innerHTML = "";
        return
    }

    //如果构造函数报错,直接显示
    try {
        var re = new RegExp(reStr, flags + 'd')
    } catch (e) {
        if (e instanceof SyntaxError) {
            resultShow.innerHTML = testString
            return
        }
    }



    var resultHTML = ''
    var sub_resultHTML = ''
    var starIdx = 0
    var match
    var matchCount = 0

    //为什么可以自动跳到下一个位置？
    //re.exec根据lastindex进行匹配
    while (match = re.exec(testString)) {
        matchCount++
        resultHTML += testString.slice(starIdx, match.index)



        resultHTML += `<strong title="Match ${matchCount}\nPos:${match.index}-${match.index + match[0].length}">` + heighlightGroups(match, matchCount) + '</strong>'

        //什么是lastIndex?
        //语法就是这样，获取match字符后的第一个位置
        starIdx = re.lastIndex

        if (match[0] == '') { //如果匹配到空白内容，则主动增加lastindex值，否则陷入死循环
            //为什么++可以跳出去？
            re.lastIndex++
        }
        //如果g没有打勾，就跳出去
        if (!re.global) {
            //解决不打勾重复问题，正则不带g，那么lastindex不会更新一直是0
            startIdx = match.index + match[0].length
            break
        }
    }

    resultHTML += testString.slice(starIdx)
    resultShow.innerHTML = resultHTML + '\n'

}
run()
function heighlightGroups(match, matchIndex) {
    var result = ''
    var matchString = match[0]
    // 每个捕获的下标范围
    var groupRanges = match.indices.map(range => {
        var start = range[0]
        var end = range[1]
        return [start - match.index, end - match.index]
    })
    //删掉第一个
    groupRanges.shift()

    var startIdx = 0
    var count = 1
    for (var range of groupRanges) {
        result += matchString.slice(startIdx, range[0])
        result += `<em title="Match ${matchIndex}\nGroup ${count++}\n Pos:${range[0]}-${range[1]}">` + matchString.slice(startIdx, range[1]) + '</em>'
        startIdx = range[1]
    }
    result += matchString.slice(startIdx)

    return result

}
//滚动条同步
function scrollSync() {
    resultShow.scrollTop = testStringInput.scrollTop
}

function getFlags() {
    var flag = ''
    if (reFlagGlobal.checked) {
        flag += 'g'
    }
    if (reFlagMultiline.checked) {
        flag += 'm'
    }
    if (reFlagIgnorecase.checked) {
        flag += 'i'
    }
    return flag
}

function substitute() {

}
function substitute_display(result) {
    var sub_str = reInput_sub.value
    resultShow_sub.innerHTML = result
}

