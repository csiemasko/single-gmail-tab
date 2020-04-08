var observeObject = (() => {
    let _obs = window.MutationObserver || window.WebKitMutationObserver
    return (o, cb) => {
        if (!o || !o.nodeType === 1) return
        if (_obs) {
            let _observer = new MutationObserver((mutations, observer) => {
                cb(mutations)
            })
            _observer.observe(o, {
                childList: true,
                subtree: true
            })
        } else if (window.addEventListener) {
            o.addEventListener('DOMNodeInserted', cb, false)
            o.addEventListener('DOMNodeRemoved', cb, false)
        }
    }
})()
setTimeout(() => {
    let rt = document.querySelector('#gb').children[1].children[3].children[1].children[1]
    rt.childNodes.forEach(a => a.removeAttribute('target'))
    observeObject(rt, muts => {
        muts.forEach(m => {
            console.log(m)
            if (m.addedNodes && m.addedNodes.length > 0) {
                m.target.children.forEach(c => {
                    if (c.tagName === 'A' && c.getAttribute('target') === '_blank')
                        c.removeAttribute('target')
                })
            }
        })
    })
}, 3000)