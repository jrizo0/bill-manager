"use strict";
exports.id = 671;
exports.ids = [671];
exports.modules = {

/***/ 227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ TokenProvider),
/* harmony export */   "M": () => (/* binding */ TokenContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(458);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const TokenContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    token: null,
    setToken: ()=>{}
});
function TokenProvider({ children  }) {
    const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TokenContext.Provider, {
        value: {
            token: token,
            setToken: setToken
        },
        children: children
    });
}


/***/ }),

/***/ 42:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ headerAuthToken)
/* harmony export */ });
/* unused harmony export s3Upload */
/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(581);
/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_amplify__WEBPACK_IMPORTED_MODULE_0__);

async function s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`;
    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type
    });
    return stored.key;
}
const headerAuthToken = (token)=>{
    return {
        headers: {
            authorization: `Bearer ${token}`
        }
    };
};


/***/ }),

/***/ 580:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ onError)
/* harmony export */ });
function onError(error) {
    let message = error.toString();
    // Auth errors
    if (!(error instanceof Error) && error.message) {
        message = error.message;
    }
    console.error("ONERROR: -->", error);
    alert(message);
}


/***/ })

};
;