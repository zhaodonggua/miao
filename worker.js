// addEventListener('message', function (e) {
//     this.postMessage(e.data * e.data)
// })

function deaploop(time) {
    var start = Date.now()

    while (Date.now() - start < time) {

    }
}

for (var i = 0; i < 100; i++) {
    deaploop(1000)
    console.log('worker from worker')
}
