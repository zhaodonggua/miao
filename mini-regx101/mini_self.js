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

    try {
        reg = new RegExp(input, flags)
        message.innerHTML = ""
    } catch (e) {
        message.innerHTML = e.message
    }
    let match
    let lastIdx = 0
    let displayResult = ""
    if (reg.global) {
        while (match = reg.exec(teststr)) {
            displayResult += teststr.slice(lastIdx, match.index)
            displayResult += "<strong>" + match[0] + "</strong>"
            lastIdx = reg.lastIndex
            if (!match) {
                re.lastIndex++;
            }

        }
        displayResult += teststr.slice(lastIdx)
    } else {
        match = reg.exec(teststr)
        if (match) {
            displayResult += teststr.slice(lastIdx, match.index)
            displayResult += "<strong>" + match[0] + "</strong>"
            displayResult += teststr.slice(match.index + match[0].length)
            //displayResult += teststr.slice(reg.lastIndex)
        }

    }
    resulted.innerHTML = displayResult
    replacement()
    // let repalcedResult = teststr.replace(reg, restr)
    // replaced.innerHTML = repalcedResult


}

function scrollSync() {
    let scrollVal = testStr.scrollTop;
    resulted.scrollTop = scrollVal
}

// function highlightGroups(match) {
//     let result = ''
//     let indices = match.indices.map(range => {
//         let start = range[0]
//         let end = range[1]
//         return [start - match.index, end - match.index]
//     })


//     let startIdx = 0
//     for (let range of groupRanges) {
//         result += matchString.slice()
//     }

// }

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
