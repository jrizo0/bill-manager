(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 559:
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
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(639);
// EXTERNAL MODULE: external "aws-amplify"
var external_aws_amplify_ = __webpack_require__(581);
// EXTERNAL MODULE: ../../node_modules/.pnpm/bootstrap@5.2.3_@popperjs+core@2.11.7/node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min = __webpack_require__(95);
;// CONCATENATED MODULE: ./config.tsx
const config = {
    MAX_ATTACHMENT_SIZE: 5000000,
    apiGateway: {
        URL: "{{ NEXT_PUBLIC_API_URL }}",
        REGION: "us-east-1"
    }
};
/* harmony default export */ const config_0 = (config);

// EXTERNAL MODULE: ./styles/Home.css
var Home = __webpack_require__(730);
;// CONCATENATED MODULE: external "@mui/material/AppBar"
const AppBar_namespaceObject = require("@mui/material/AppBar");
var AppBar_default = /*#__PURE__*/__webpack_require__.n(AppBar_namespaceObject);
// EXTERNAL MODULE: external "@mui/material/Box"
var Box_ = __webpack_require__(19);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);
// EXTERNAL MODULE: external "@mui/material/Link"
var Link_ = __webpack_require__(246);
var Link_default = /*#__PURE__*/__webpack_require__.n(Link_);
;// CONCATENATED MODULE: external "@mui/material/Toolbar"
const Toolbar_namespaceObject = require("@mui/material/Toolbar");
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar_namespaceObject);
;// CONCATENATED MODULE: ./components/AppBar.tsx





function ButtonAppBar() {
    return /*#__PURE__*/ jsx_runtime.jsx((Box_default()), {
        sx: {
            flexGrow: 1
        },
        children: /*#__PURE__*/ jsx_runtime.jsx((AppBar_default()), {
            position: "static",
            color: "transparent",
            children: /*#__PURE__*/ jsx_runtime.jsx((Toolbar_default()), {
                children: /*#__PURE__*/ jsx_runtime.jsx((Link_default()), {
                    href: "/",
                    className: "fw-bold text-muted",
                    style: {
                        textDecoration: "none"
                    },
                    children: "Bill-Manager"
                })
            })
        })
    });
    {
    // <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
    //   <Link href="/" className="fw-bold text-muted" style={{ textDecoration: 'none' }}>Bill-Manager</Link>
    //   <Navbar.Toggle />
    // <Navbar.Collapse className="justify-content-end">
    //   <>
    //     <Button className="fw-bold text-muted" variant="link" href="/settings">Settings</Button>
    //     <Button className="fw-bold text-muted" variant="link" onClick={handleLogout}>Logout</Button>
    //   </>
    // </Navbar.Collapse>
    // </Navbar>
    }
}

// EXTERNAL MODULE: ../../node_modules/.pnpm/@fontsource+roboto@4.5.8/node_modules/@fontsource/roboto/300.css
var _300 = __webpack_require__(422);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@fontsource+roboto@4.5.8/node_modules/@fontsource/roboto/400.css
var _400 = __webpack_require__(667);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@fontsource+roboto@4.5.8/node_modules/@fontsource/roboto/500.css
var _500 = __webpack_require__(955);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@fontsource+roboto@4.5.8/node_modules/@fontsource/roboto/700.css
var _700 = __webpack_require__(198);
;// CONCATENATED MODULE: ./pages/_app.tsx











function App({ Component , pageProps  }) {
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
    /* EJEMPLO NOTES CON AUTH
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
  onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    nav("/login");
  }
  <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
    <Routes />
  </AppContext.Provider>

  */ return(// <Layout>
    //   <Component {...pageProps} />
    // </Layout>
    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "App container py-3",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(ButtonAppBar, {}),
            /*#__PURE__*/ jsx_runtime.jsx(Component, {
                ...pageProps
            })
        ]
    }));
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

/***/ 95:
/***/ (() => {



/***/ }),

/***/ 730:
/***/ (() => {



/***/ }),

/***/ 639:
/***/ (() => {



/***/ }),

/***/ 19:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Box");

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
var __webpack_exports__ = __webpack_require__.X(0, [458], () => (__webpack_exec__(559)));
module.exports = __webpack_exports__;

})();