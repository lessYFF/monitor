new Vue({
    el: '#app',
    data: {
        errorInfo: {},
        sourceInfo: {},
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
        // 上传sourceMap获取异常源码具体行列号
        uploadSourceMap() {
            const { info } = this.errorInfo
            const formData = new FormData()
            formData.append('file', document.querySelector('input').files[0])

            fetch(`http://localhost:3000/api/resolve/upload?error=${JSON.stringify(info)}`, {
                method: 'POST',
                body: formData,
                keepalive: true,
            }).then(async (res) => {
                this.sourceInfo = await res.json()
                console.log('this.sourceInfo', this.sourceInfo)
            })
        },
        // 获取url query
        getUrlQuery(url) {
            const queryStr = url.replace(/.*\?/, '')

            const query = {}
            queryStr.split('&').forEach((item) => {
                const list = item.split('=')
                query[list[0]] = list[1]
            })

            return query
        },
    },
})
