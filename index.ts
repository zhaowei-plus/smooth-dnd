import * as constants from './src/constants';
import { ElementX } from './src/interfaces';
import container from './src/container';
import * as dropHandlers from './src/dropHandlers';
import { SmoothDnDCreator, ContainerOptions } from './src/exportTypes';

console.log('constants:', constants)

// 代理 form 属性到to，这样通过 from 的所有属性操作，实际上都是操作 to
function delegateProperty(from: any, to:any, propName: string) {
    Object.defineProperty(from, propName, {
        set: (val?: boolean) => {
            to[propName] = val;
        },
        get: () => to[propName]
    })
}

// depreceted 表示废弃，不推荐使用的
const deprecetedDefaultExport: SmoothDnDCreator = function(element: ElementX, options?: ContainerOptions) {
    console.log('deprecetedDefaultExport:', element, options)
    console.warn('default export is deprecated. please use named export "smoothDnD"');
    return container(element, options);
};

deprecetedDefaultExport.cancelDrag = function () {
    container.cancelDrag();
}

deprecetedDefaultExport.isDragging = function () {
    return container.isDragging();
}

// 监听并同步属性
delegateProperty(deprecetedDefaultExport, container, 'useTransformForGhost');
delegateProperty(deprecetedDefaultExport, container, 'maxScrollSpeed');
delegateProperty(deprecetedDefaultExport, container, 'wrapChild');
delegateProperty(deprecetedDefaultExport, container, 'dropHandler');

export * from './src/exportTypes';

export {
    container as smoothDnD,
    constants,
    dropHandlers,
};

export default deprecetedDefaultExport;
