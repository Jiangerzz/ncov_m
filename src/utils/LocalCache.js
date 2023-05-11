class LocalCache {
    // constructor () {
    //     this.prefix = 'your-prefix' // 设置前缀
    // }

    set (key, value, expire) { // 设置 localStorage
        let item = {
            data: value,
            time: Date.now(),
            expire: typeof expire === 'undefined' ? 24 * 60 * 60 * 1000 : expire
        }
        localStorage.setItem(key, JSON.stringify(item))
    }

    get (key) { // 获取 localStorage
        let val = localStorage.getItem(key)
        if (!val) return null
        let item = JSON.parse(val)
        if (Date.now() - item.time > item.expire) { // 检查是否过期
            this.remove(key)
            return null
        }
        return item.data
    }

    remove (key) { // 移除 localStorage
        localStorage.removeItem(key)
    }

    removeAll () { // 移除全部 localStorage（需要慎用）
        localStorage.clear()
    }
}

export default new LocalCache()
