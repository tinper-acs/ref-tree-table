'use strict';

exports.__esModule = true;

(function () {
    var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
    enterModule && enterModule(module);
})();

var refValParse = function refValParse(value) {
    if (!value) return { refname: '', refpk: '' };

    try {
        var valueMap = JSON.parse(value);
        if (!valueMap.hasOwnProperty('refname') || !valueMap.hasOwnProperty('refpk')) {
            return { refname: '', refpk: '' };
        } else {
            return JSON.parse(value);
        }
    } catch (e) {
        return { refname: '', refpk: '' };
    }
};

exports.refValParse = refValParse;
;

(function () {
    var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')["default"];

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(refValParse, 'refValParse', '/Users/yaoxin/Downloads/workspace/aacanzhao/tinper-acs/ref-tree-table/src/utils.js');
})();

;

(function () {
    var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
    leaveModule && leaveModule(module);
})();