const fetchRecordList = function (id) {
    fetch(`http://localhost:3000/api/replay?id=${id}`, {
        method: 'GET',
        keepalive: true,
    }).then(async (res) => {
        const events = await res.json()
        if (!Array.isArray(events) || events.length < 2) {
            document.querySelector('#player').innerHTML = '数据少于2条无法回放～'
            return
        }
        const replayer = new rrwebPlayer({
            target: document.getElementById('player'), // customizable root element
            props: {
                events,
                // unpackFn: rrweb.unpack, 默认解码
            },
        })
    })
}

const getUrlQuery = (url) => {
    const queryStr = url.replace(/.*\?/, '')
    const queryList = queryStr.split('&')

    if (!Array.isArray(queryList) || !queryList.length) return {}
    const query = {}

    queryList.forEach((item) => {
        const list = item.split('=')
        query[list[0]] = list[1]
    })

    return query
}

fetchRecordList(getUrlQuery(location.href).id)
