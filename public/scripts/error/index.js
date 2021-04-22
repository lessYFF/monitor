new Vue({
    el: '#app',
    data: {
        errorList: [],
    },
    created() {
        this.fetchErrorList()
    },
    methods: {
        // 获取数据
        fetchErrorList() {
            fetch('http://localhost:3000/api/error', {
                method: 'GET',
                keepalive: true,
            }).then(async (res) => {
                const list = await res.json()
                this.errorList = list
            })
        },
        // 跳转回放页
        routeToReplayPage(id) {
            window.location.href = `/replayPage?id=${id}`
        },
        // 跳转定位错误页
        routeToResolvePage(id) {
            window.location.href = `/resolvePage?id=${id}`
        },
    },
})
