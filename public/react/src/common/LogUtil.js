import moment from 'moment'
const log = require('loglevel');
log.enableAll();

// 获取后可以改变日志级别
window.getLog = () => {
    return log;
}
window._logWithTimeStamp = true;

const timeStamp = () => {
    if (window._logWithTimeStamp) {
        return `[${moment().format('hh:mm:ss')}] `
    }
    return ''
}
/*
    带trace的、默认折叠起来的控制台输出
    第一个参数最好传入string类型的标识，接着可以跟任意类型任意个数的参数，各个参数都会打印到控制台
*/ 
export function trace_collapse(content) {
    if (console.groupCollapsed) {
        console.groupCollapsed(typeof content == 'string' ? content : 'trace_collapse');
        log.trace(arguments);
        console.groupEnd();
    } else {
        trace(content)
    }
}

export function trace(content) {
    log.trace(content);
}
export function debug(content) {
    log.debug(content);
}
export function info(content) {
    log.info(content);
}
export function warn(content) {
    log.warn(content);
}
export function error(content) {
    log.error(content);
}

export function trace_c(content) {
    log.trace(`${timeStamp()}%c${content}`, 'color:magenta;');
}
export function debug_c(content) {
    log.debug(`${timeStamp()}%c${content}`, 'color:cyan;');
}
export function info_c(content) {
    log.info(`${timeStamp()}%c${content}`, 'color:blue;');
}
export function warn_c(content) {
    log.warn(`${timeStamp()}%c${content}`, 'color:crimson;');
}
export function error_c(content) {
    log.error(`${timeStamp()}%c${content}`, 'color:red;');
}
