'use strict';

exports.__esModule = true;
exports.createRefTreeTableModal = exports.createRefTreeTable = exports.RefTreeTableWithInput = exports.RefTreeTable = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _RefTreeTableBaseUI = require('./components/RefTreeTableBaseUI');

var _RefTreeTableBaseUI2 = _interopRequireDefault(_RefTreeTableBaseUI);

var _RefCoreWithInput = require('ref-core/lib/refs/RefCoreWithInput');

var _RefCoreWithInput2 = _interopRequireDefault(_RefCoreWithInput);

var _createApi = require('ref-core/lib/utils/createApi.js');

var _createApi2 = _interopRequireDefault(_createApi);

var _RefCoreGlobal = require('ref-core/lib/refs/RefCoreGlobal');

var _RefCoreGlobal2 = _interopRequireDefault(_RefCoreGlobal);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('ref-core/css/refcore.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function () {
    var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
    enterModule && enterModule(module);
})();

//import './index.less'; //webpack打包放开

function RefTreeTable(props) {
    return _react2["default"].createElement(
        _RefCoreGlobal2["default"],
        props,
        _react2["default"].createElement(_RefTreeTableBaseUI2["default"], null)
    );
}

function createRefTreeTable(selector, props, callback) {
    return createRefInput(selector, _react2["default"].createElement(RefTreeTableWithInput, null), props, function (param) {
        if (typeof callback === 'function') {
            callback(param);
        }
    });
}
function createRefTreeTableModal(props, callback) {
    return createRefModal(_extends({
        component: _react2["default"].createElement(RefTreeTable, null)
    }, props), function (param) {
        if (typeof callback === 'function') {
            callback(param);
        }
    });
}

function RefTreeTableWithInput(props) {

    return _react2["default"].createElement(
        _RefCoreWithInput2["default"],
        props,
        _react2["default"].createElement(RefTreeTable, null)
    );
}

var _default = _RefTreeTableBaseUI2["default"];
exports["default"] = _default;
exports.RefTreeTable = RefTreeTable;
exports.RefTreeTableWithInput = RefTreeTableWithInput;
exports.createRefTreeTable = createRefTreeTable;
exports.createRefTreeTableModal = createRefTreeTableModal;
;

(function () {
    var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')["default"];

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(RefTreeTable, 'RefTreeTable', '/Users/yaoxin/Downloads/workspace/aacanzhao/tinper-acs/ref-tree-table/src/index.js');
    reactHotLoader.register(createRefTreeTable, 'createRefTreeTable', '/Users/yaoxin/Downloads/workspace/aacanzhao/tinper-acs/ref-tree-table/src/index.js');
    reactHotLoader.register(createRefTreeTableModal, 'createRefTreeTableModal', '/Users/yaoxin/Downloads/workspace/aacanzhao/tinper-acs/ref-tree-table/src/index.js');
    reactHotLoader.register(RefTreeTableWithInput, 'RefTreeTableWithInput', '/Users/yaoxin/Downloads/workspace/aacanzhao/tinper-acs/ref-tree-table/src/index.js');
    reactHotLoader.register(_default, 'default', '/Users/yaoxin/Downloads/workspace/aacanzhao/tinper-acs/ref-tree-table/src/index.js');
})();

;

(function () {
    var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
    leaveModule && leaveModule(module);
})();