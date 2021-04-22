new Vue({
    el: '#app',
    data: {
        errorInfo: {},
    },
    created() {
        const query = this.getUrlQuery(location.href)
        this.fetchErrorInfo(query.id)
    },
    methods: {
        // 获取数据
        fetchErrorInfo(id) {
            fetch(`http://localhost:3000/api/error/${id}`, {
                method: 'GET',
                keepalive: true,
            }).then(async (res) => {
                this.errorInfo = await res.json()
            })
        },
        // 获取url query
        getUrlQuery(url) {
            const queryStr = url.replace(/.*\?/, '')

            const query = {}
            queryStr.split('&').forEach(item => {
                const list = item.split('=')
                query[list[0]] = list[1]
            })

            return query
        }
    },
})
