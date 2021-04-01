(function() {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 421:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(291);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const store = new src_store__WEBPACK_IMPORTED_MODULE_1__/* .BlockchainStore */ ._c();

const MyApp = ({
  Component,
  pageProps
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(src_store__WEBPACK_IMPORTED_MODULE_1__/* .StoreProvider */ .g3, {
    store: store,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, _objectSpread({}, pageProps))
  });
};

/* harmony default export */ __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ 291:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "_c": function() { return /* binding */ BlockchainStore; },
  "g3": function() { return /* binding */ StoreProvider; },
  "oR": function() { return /* binding */ useStore; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(282);
;// CONCATENATED MODULE: external "mobx"
var external_mobx_namespaceObject = require("mobx");;
// EXTERNAL MODULE: external "crypto-js/sha256"
var sha256_ = __webpack_require__(902);
var sha256_default = /*#__PURE__*/__webpack_require__.n(sha256_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(297);
;// CONCATENATED MODULE: ./src/store.tsx


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const getBlockHash = (prevBlock, block) => {
  return sha256_default()(`${prevBlock.hash}${JSON.stringify(block.transactions)}`).toString();
};

class BlockchainStore {
  constructor() {
    _defineProperty(this, "blocks", []);

    _defineProperty(this, "transactions", []);

    (0,external_mobx_namespaceObject.makeAutoObservable)(this);
  }

  get numberBlocks() {
    return this.blocks.length;
  }

  get valid() {
    return this.blocks.every((block, index) => {
      var _this$blocks;

      const prevBlock = (_this$blocks = this.blocks[index - 1]) !== null && _this$blocks !== void 0 ? _this$blocks : {
        hash: ''
      };
      const hash = getBlockHash(prevBlock, block);
      return hash === block.hash;
    });
  }

  addTransaction(message) {
    this.transactions.push(message);
  }

  writeBlock() {
    var _this$blocks2;

    if (this.transactions.length === 0) {
      return;
    }

    const transactions = [...this.transactions];
    this.transactions = [];
    const prevBlock = (_this$blocks2 = this.blocks[this.blocks.length - 1]) !== null && _this$blocks2 !== void 0 ? _this$blocks2 : {
      hash: ''
    };
    const block = {
      hash: '',
      transactions
    };
    const hash = getBlockHash(prevBlock, block);
    this.blocks.push({
      hash,
      transactions
    });
  }

}

const StoreContext = /*#__PURE__*/(0,external_react_.createContext)(new BlockchainStore());

const StoreProvider = ({
  store,
  children,
  transactionsPendingInterval = 5000
}) => {
  (0,external_react_.useEffect)(() => {
    const interval = setInterval(() => {
      store.writeBlock();
    }, transactionsPendingInterval);
    return () => clearInterval(interval);
  }, [store]);
  return /*#__PURE__*/(0,jsx_runtime_.jsx)(StoreContext.Provider, {
    value: store,
    children: children
  });
};

const useStore = () => (0,external_react_.useContext)(StoreContext);



/***/ }),

/***/ 902:
/***/ (function(module) {

"use strict";
module.exports = require("crypto-js/sha256");;

/***/ }),

/***/ 297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(421));
module.exports = __webpack_exports__;

})();