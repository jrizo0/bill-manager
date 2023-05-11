(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ SessionContext),
/* harmony export */   "e": () => (/* binding */ SessionProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(458);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const SessionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    session: null,
    setSession: ()=>{}
});
function SessionProvider({ children  }) {
    const [session, setSession] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SessionContext.Provider, {
        value: {
            session,
            setSession
        },
        children: children
    });
}


/***/ }),

/***/ 669:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ App)
});

// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(458);
;// CONCATENATED MODULE: ./config.tsx
const config = {
    MAX_ATTACHMENT_SIZE: 5000000,
    apiGateway: {
        URL: "{{ NEXT_PUBLIC_API_URL }}",
        REGION: "us-east-1"
    }
};
/* harmony default export */ const config_0 = (config);

// EXTERNAL MODULE: ./context/session.tsx
var context_session = __webpack_require__(227);
;// CONCATENATED MODULE: external "@mui/material/AppBar"
const AppBar_namespaceObject = require("@mui/material/AppBar");
var AppBar_default = /*#__PURE__*/__webpack_require__.n(AppBar_namespaceObject);
// EXTERNAL MODULE: external "@mui/material/Box"
var Box_ = __webpack_require__(19);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);
// EXTERNAL MODULE: external "@mui/material/Button"
var Button_ = __webpack_require__(819);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);
// EXTERNAL MODULE: external "@mui/material/Link"
var Link_ = __webpack_require__(246);
var Link_default = /*#__PURE__*/__webpack_require__.n(Link_);
;// CONCATENATED MODULE: external "@mui/material/Toolbar"
const Toolbar_namespaceObject = require("@mui/material/Toolbar");
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar_namespaceObject);
// EXTERNAL MODULE: external "aws-amplify"
var external_aws_amplify_ = __webpack_require__(581);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: ./components/AppBar.tsx










function ButtonAppBar() {
    const { session , setSession  } = (0,external_react_.useContext)(context_session/* SessionContext */.B);
    (0,external_react_.useEffect)(()=>{
        console.log(`${config_0.apiGateway.URL}/auth/google/authorize`);
        const getSession = async ()=>{
            const token = localStorage.getItem("session");
            if (token) {
                const user = await getUserInfo(token);
                if (user) setSession(user);
            }
        };
        getSession();
    }, [
        setSession
    ]);
    (0,external_react_.useEffect)(()=>{
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("session", token);
            window.location.replace(window.location.origin);
        }
    }, []);
    const getUserInfo = async (session)=>{
        try {
            const response = await external_aws_amplify_.API.get("bills", "/session", {
                headers: {
                    Authorization: `Bearer ${session}`
                }
            });
            return response;
        } catch (error) {
            // alert(error)
            console.error(error);
        }
    };
    const signOut = async ()=>{
        localStorage.removeItem("session");
        setSession(null);
    };
    return /*#__PURE__*/ jsx_runtime.jsx((Box_default()), {
        sx: {
            flexGrow: 1
        },
        children: /*#__PURE__*/ jsx_runtime.jsx((AppBar_default()), {
            position: "static",
            color: "transparent",
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)((Toolbar_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx((Link_default()), {
                        href: "/",
                        className: "fw-bold text-muted",
                        style: {
                            textDecoration: "none"
                        },
                        sx: {
                            flexGrow: 1,
                            fontWeight: "bold",
                            color: "inherit"
                        },
                        children: "Bill-Manager"
                    }),
                    session ? /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
                        children: /*#__PURE__*/ jsx_runtime.jsx((Button_default()), {
                            color: "inherit",
                            onClick: signOut,
                            children: "Logout"
                        })
                    }) : /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
                        children: /*#__PURE__*/ jsx_runtime.jsx((Button_default()), {
                            color: "inherit",
                            href: `${config_0.apiGateway.URL}/auth/google/authorize`,
                            children: "Login"
                        })
                    })
                ]
            })
        })
    });
}

// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(692);
;// CONCATENATED MODULE: ./components/Layout.tsx



function Layout({ children  }) {
    return /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ jsx_runtime.jsx(material_.Box, {
            sx: {
                py: 3,
                maxWidth: "80%",
                margin: "auto"
            },
            children: children
        })
    });
}
/* harmony default export */ const components_Layout = (Layout);

// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(639);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@fontsource+roboto@4.5.8/node_modules/@fontsource/roboto/300.css
var _300 = __webpack_require__(422);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@fontsource+roboto@4.5.8/node_modules/@fontsource/roboto/400.css
var _400 = __webpack_require__(667);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@fontsource+roboto@4.5.8/node_modules/@fontsource/roboto/500.css
var _500 = __webpack_require__(955);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@fontsource+roboto@4.5.8/node_modules/@fontsource/roboto/700.css
var _700 = __webpack_require__(198);
// EXTERNAL MODULE: ./styles/Home.css
var Home = __webpack_require__(730);
;// CONCATENATED MODULE: ./pages/_app.tsx












function App({ Component , pageProps  }) {
    // AMPLIFY CONFIGURE
    external_aws_amplify_.Amplify.configure({
        API: {
            endpoints: [
                {
                    name: "bills",
                    endpoint: config_0.apiGateway.URL,
                    region: config_0.apiGateway.REGION
                }
            ]
        }
    });
    // RETURN COMPONENT
    return /*#__PURE__*/ jsx_runtime.jsx(context_session/* SessionProvider */.e, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(components_Layout, {
            children: [
                /*#__PURE__*/ jsx_runtime.jsx(ButtonAppBar, {}),
                /*#__PURE__*/ jsx_runtime.jsx(Component, {
                    ...pageProps
                })
            ]
        })
    });
}


/***/ }),

/***/ 422:
/***/ (() => {



/***/ }),

/***/ 667:
/***/ (() => {



/***/ }),

/***/ 955:
/***/ (() => {



/***/ }),

/***/ 198:
/***/ (() => {



/***/ }),

/***/ 730:
/***/ (() => {



/***/ }),

/***/ 639:
/***/ (() => {



/***/ }),

/***/ 692:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material");

/***/ }),

/***/ 19:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Box");

/***/ }),

/***/ 819:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Button");

/***/ }),

/***/ 246:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Link");

/***/ }),

/***/ 581:
/***/ ((module) => {

"use strict";
module.exports = require("aws-amplify");

/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [458], () => (__webpack_exec__(669)));
module.exports = __webpack_exports__;

})();