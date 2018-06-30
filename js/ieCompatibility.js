/**
 * @description 添加事件监听（兼容IE6-8）
 * @param {Element} element 触发事件的元素
 * @param {String} event 触发的事件
 * @param {Function} func 自定义方法
 */
function addEvent(element, event, func) {
    if (document.attachEvent) {
        element.attachEvent('on' + event, func);
    } else {
        element.addEventListener(event, func);
    }
}