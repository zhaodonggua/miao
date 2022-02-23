// function run() {
//     //正则，匹配，替代三个框的内容
//     let instr = inputStr.value
//     let teststr = testStr.value
//     let restr = replaceStr.value

//     //如果正则部分没有输入,直接返回
//     if (!instr.length) {
//         message.str = ""
//         resulted.innerHTML = ""
//         replaced.innerHTML = ""
//         return
//     }
//     //获取flags标签
//     let flags = ""
//     if (g.checked) {
//         flags += 'g'
//     }
//     if (m.checked) {
//         flags += 'm'
//     }
//     if (i.checked) {
//         flags += 'i'
//     }
//     //创建正则匹配
//     let re
//     try {
//         re = new RegExp(instr, flags)
//         message.innerHTML = ""
//     } catch (e) {
//         message.innerHTML = e.message
//     }

//     let displayResult = ""
//     let lastIndex = 0
//     let match
//     //如果g被勾上
//     if (re.global) {
//         while (match = re.exec(teststr)) {
//             displayResult += teststr.slice(lastIndex, match.index)
//             displayResult += "<strong>" + match[0] + "</strong>"
//             lastIndex = re.lastIndex
//             //如果match不存在
//             if (!match[0].length) {
//                 re.lastIndex++;
//             }
//         }

//         displayResult += teststr.slice(lastIndex)
//     }
//     else {
//         match = re.exec(teststr)
//         if (match) {
//             displayResult += teststr.slice(lastIndex, match.index)
//             displayResult += "<strong>" + match[0] + "</strong>"
//             displayResult += teststr.slice(match.index + match[0].length)
//         }
//     }

//     resulted.innerHTML = displayResult;
//     let replaceResult = teststr.replace(re, replaceStr.value)
//     replaced.innerHTML = replaceResult


// }
// function setScroll() {
//     let scrollVal = testStr.scrollTop;
//     result.style.transform = `translateY(-${scrollVal}px)`;
// }
function run() {
    let input = inputStr.value
    let teststr = testStr.value
    // let restr = replaceStr.value
    //用于match information
    //如果啥都没输
    if (input.length == 0) {
        resultShow.innerHTML = ""
        replace.innerHTML = "";
        return
    }
    let info = ''

    let flags = ''
    if (g.checked) {
        flags += 'g'
    }
    if (m.checked) {
        flags += 'm'
    }
    if (i.checked) {
        flags += 'i'
    }
    let reg
    flags += 'd'
    try {
        reg = new RegExp(input, flags)
        message.innerHTML = ""
    } catch (e) {
        message.innerHTML = e.message
    }

    let match
    let lastIdx = 0
    let displayResult = ""
    let matchCount = 0

    let macthed_re = []
    let macthed_pos = []
    if (reg.global) {
        while (match = reg.exec(teststr)) {
            matchCount++
            displayResult += teststr.slice(lastIdx, match.index)
            // displayResult += "<strong>" + match[0] + "</strong>"
            // displayResult += `<strong title="Match ${matchCount}">` + highlightGroups(match, matchCount) + "</strong>"
            displayResult += `<strong title="Match ${matchCount}\nPos:${match.index}-${match.index + match[0].length}">` + highlightGroups(match, matchCount) + "</strong>"

            lastIdx = reg.lastIndex
            if (!match) {
                re.lastIndex++;
            }
            //用于右边栏
            macthed_re.push(match)
        }
        displayResult += teststr.slice(lastIdx)
    } else {
        match = reg.exec(teststr)
        if (match) {
            displayResult += teststr.slice(lastIdx, match.index)
            displayResult += `<strong title="Match ${matchCount}\nPos:${match.index}-${match.index + match[0].length}">` + match[0] + "</strong>"
            displayResult += teststr.slice(match.index + match[0].length)
            //displayResult += teststr.slice(reg.lastIndex)
        }

    }
    resulted.innerHTML = displayResult
    replacement()
    // let repalcedResult = teststr.replace(reg, restr)
    // replaced.innerHTML = repalcedResult

    //把每次match的匹配结果导入
    matchedInfo(macthed_re)

}

function scrollSync() {
    let scrollVal = testStr.scrollTop;
    resulted.scrollTop = scrollVal
}

function highlightGroups(match, matchIndex) {
    let result = ''
    let matchString = match[0]
    //let indices = match.indices 每个捕获的下标范围

    var groupRanges = match.indices.map(range => {
        var start = range[0]
        var end = range[1]
        return [start - match.index, end - match.index]
    })//每次捕获在match中的范围

    //删除第一项
    groupRanges.shift();

    let startIdx = 0
    let count = 1
    for (let range of groupRanges) {
        result += matchString.slice(startIdx, range[0])
        result += `<em title="Match ${matchIndex}\nGroup ${count++}\nPos:${range[0]}-${range[1]}">` + matchString.slice(range[0], range[1]) + '</em>'
        startIdx = range[1]
    }
    result += matchString.slice(startIdx)
    return result
}

function replacement() {
    //替换的内容
    let replace_str = replaceStr.value
    //正则的内容
    let re = inputStr.value
    //输入的文本
    let test_str = testStr.value

    let flags = ''
    if (g.checked) {
        flags += 'g'
    }
    if (m.checked) {
        flags += 'm'
    }
    if (i.checked) {
        flags += 'i'
    }
    let rep_reg = ''
    try {
        rep_reg = new RegExp(re, flags)
    } catch (e) {
        console.log(e.message)
    }
    let rep_result = test_str.replace(rep_reg, replace_str)
    replaced.innerHTML = rep_result

}

function matchedInfo(matched_re) {
    matched.innerHTML = ""
    //1.拿到match ,以及位置 ，match的内容
    for (let i = 0; i < matched_re.length; i++) {
        matched.innerHTML += `<table><tr>`
        matched.innerHTML += `<td>Match${i + 1}: ${matched_re[i][0]} </td> `
        matched.innerHTML += `<td>POS:${matched_re[i].index} - ${matched_re[i].index + matched_re[i][0].length}</td></br>`
        matched.innerHTML += caculateGroups(matched_re[i])
    }
    //2.拿到GROUP,以及位置，group的内容
}
function caculateGroups(match) {
    let result = ''
    let matchString = match[0]
    //let indices = match.indices 每个捕获的下标范围

    var groupRanges = match.indices.map(range => {
        var start = range[0]
        var end = range[1]
        return [start - match.index, end - match.index]
    })//每次捕获在match中的范围

    //删除第一项
    groupRanges.shift();

    let startIdx = 0
    let count = 1
    for (let range of groupRanges) {
        result += "<td>Group:" + (count++) + ` Pos:${match.index + range[0]} - ${match.index + range[1]}` + ` content:${matchString.slice(range[0], range[1])}` + "</td> <br>"
    }
    return result
}
