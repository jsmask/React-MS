
/**
 * 图像加载
 * @param images   : 图像地址集合
 * @param fn       : 完成后回调函数
 * @param progress : 加载进度
 */
export const preload = (images, fn, progress) => {
    const len = images.length
    let load = 0

    images.forEach((image, key) => {
        const img = new Image()
        img.src = image
        img.onload = () => {
            load += 1
            progress({
                size: len,
                load: load,
                per: load / len
            })

            if (load >= len) fn()
        }
    })
}


/**
 * 查询对象数组
 * @param arr    : 对象数组
 * @param key    : 匹配的键值
 * @param obj    : 匹配的对象
 */
export const queryOArr = (arr, key, value) => {
    let _arr = [];
    arr.forEach((item, index) => {
        if (item[key] === value[key]) _arr.push({ obj: item, index });
    });
    return _arr;
}


/**
 * 转换0 1值
 * @param num  : 数值
 */
export const change0To1 = num => {
    return ~~num === 1 ? 0 : 1
}