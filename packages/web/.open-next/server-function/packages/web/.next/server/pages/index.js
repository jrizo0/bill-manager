"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

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


/***/ }),

/***/ 927:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(458);
// EXTERNAL MODULE: external "@mui/lab/LoadingButton"
var LoadingButton_ = __webpack_require__(829);
var LoadingButton_default = /*#__PURE__*/__webpack_require__.n(LoadingButton_);
// EXTERNAL MODULE: external "@mui/material/Box"
var Box_ = __webpack_require__(19);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);
;// CONCATENATED MODULE: external "@mui/material/Button"
const Button_namespaceObject = require("@mui/material/Button");
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_namespaceObject);
;// CONCATENATED MODULE: external "@mui/material/CircularProgress"
const CircularProgress_namespaceObject = require("@mui/material/CircularProgress");
var CircularProgress_default = /*#__PURE__*/__webpack_require__.n(CircularProgress_namespaceObject);
// EXTERNAL MODULE: external "@mui/material/Link"
var Link_ = __webpack_require__(246);
var Link_default = /*#__PURE__*/__webpack_require__.n(Link_);
;// CONCATENATED MODULE: external "@mui/material/ListItem"
const ListItem_namespaceObject = require("@mui/material/ListItem");
var ListItem_default = /*#__PURE__*/__webpack_require__.n(ListItem_namespaceObject);
;// CONCATENATED MODULE: external "@mui/material/Tooltip"
const Tooltip_namespaceObject = require("@mui/material/Tooltip");
var Tooltip_default = /*#__PURE__*/__webpack_require__.n(Tooltip_namespaceObject);
;// CONCATENATED MODULE: external "@mui/material/Typography"
const Typography_namespaceObject = require("@mui/material/Typography");
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography_namespaceObject);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "@mui/material/Dialog"
const Dialog_namespaceObject = require("@mui/material/Dialog");
var Dialog_default = /*#__PURE__*/__webpack_require__.n(Dialog_namespaceObject);
;// CONCATENATED MODULE: external "@mui/material/DialogActions"
const DialogActions_namespaceObject = require("@mui/material/DialogActions");
var DialogActions_default = /*#__PURE__*/__webpack_require__.n(DialogActions_namespaceObject);
;// CONCATENATED MODULE: external "@mui/material/DialogContent"
const DialogContent_namespaceObject = require("@mui/material/DialogContent");
var DialogContent_default = /*#__PURE__*/__webpack_require__.n(DialogContent_namespaceObject);
;// CONCATENATED MODULE: external "@mui/material/DialogContentText"
const DialogContentText_namespaceObject = require("@mui/material/DialogContentText");
var DialogContentText_default = /*#__PURE__*/__webpack_require__.n(DialogContentText_namespaceObject);
;// CONCATENATED MODULE: external "@mui/material/DialogTitle"
const DialogTitle_namespaceObject = require("@mui/material/DialogTitle");
var DialogTitle_default = /*#__PURE__*/__webpack_require__.n(DialogTitle_namespaceObject);
;// CONCATENATED MODULE: external "@mui/material/IconButton"
const IconButton_namespaceObject = require("@mui/material/IconButton");
var IconButton_default = /*#__PURE__*/__webpack_require__.n(IconButton_namespaceObject);
;// CONCATENATED MODULE: external "@mui/icons-material/Delete"
const Delete_namespaceObject = require("@mui/icons-material/Delete");
var Delete_default = /*#__PURE__*/__webpack_require__.n(Delete_namespaceObject);
;// CONCATENATED MODULE: ./components/DeleteButton.tsx










function DeleteButton({ onConfirm  }) {
    const [open, setOpen] = external_react_.useState(false);
    const handleClickOpen = ()=>{
        setOpen(true);
    };
    const handleClose = ()=>{
        setOpen(false);
    };
    const handleConfirm = ()=>{
        setOpen(false);
        onConfirm();
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx((IconButton_default()), {
                color: "error",
                "aria-label": "upload picture",
                component: "label",
                onClick: handleClickOpen,
                children: /*#__PURE__*/ jsx_runtime.jsx((Delete_default()), {})
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((Dialog_default()), {
                open: open,
                onClose: handleClose,
                "aria-labelledby": "alert-dialog-title",
                "aria-describedby": "alert-dialog-description",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx((DialogTitle_default()), {
                        id: "alert-dialog-title",
                        children: "Confirmation"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx((DialogContent_default()), {
                        children: /*#__PURE__*/ jsx_runtime.jsx((DialogContentText_default()), {
                            id: "alert-dialog-description",
                            children: "Are you sure you wnat to delete the bill?"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)((DialogActions_default()), {
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx((Button_default()), {
                                onClick: handleClose,
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx((Button_default()), {
                                onClick: handleConfirm,
                                children: "Confirm"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/Bill.tsx










const Bill = ({ bill , onPayBill , onDeleteBill , isLoading  })=>{
    const renderLoaderButton = ()=>{
        return bill.paid ? /*#__PURE__*/ jsx_runtime.jsx("span", {
            className: "billPaid",
            children: "Pagada"
        }) : /*#__PURE__*/ jsx_runtime.jsx((LoadingButton_default()), {
            loading: isLoading,
            variant: "contained",
            disabled: isLoading,
            onClick: ()=>onPayBill(bill.billID),
            children: "Pay bill"
        });
    };
    function renderExpiration() {
        const daysLeft = bill.expirationDay - new Date().getDate();
        return bill.paid ? /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {}) : daysLeft > 0 ? /*#__PURE__*/ (0,jsx_runtime.jsxs)((Typography_default()), {
            variant: "body1",
            sx: {
                fontWeight: "regular",
                mx: 2
            },
            children: [
                "Expires in ",
                daysLeft,
                " days"
            ]
        }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)((Typography_default()), {
            variant: "body1",
            sx: {
                fontWeight: "bold",
                mx: 2,
                color: "#FF0000"
            },
            children: [
                "Expired ",
                -daysLeft,
                " days ago"
            ]
        });
    }
    return /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)((ListItem_default()), {
            sx: {
                py: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            },
            divider: true,
            secondaryAction: isLoading ? /*#__PURE__*/ jsx_runtime.jsx((CircularProgress_default()), {
                size: 20
            }) : /*#__PURE__*/ jsx_runtime.jsx(DeleteButton, {
                onConfirm: ()=>{
                    onDeleteBill(bill.billID);
                }
            }),
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)((Box_default()), {
                    sx: {
                        display: "flex",
                        flexDirection: "column"
                    },
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)((Box_default()), {
                            sx: {
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                alignItems: "baseline"
                            },
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)((Typography_default()), {
                                    variant: "body1",
                                    sx: {
                                        fontWeight: "bold",
                                        ml: 2
                                    },
                                    children: [
                                        bill.tag.trim().split("\n").slice(0, 3),
                                        ":"
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx((Tooltip_default()), {
                                    title: "Copy",
                                    children: /*#__PURE__*/ jsx_runtime.jsx((Button_default()), {
                                        variant: "text",
                                        onClick: ()=>{
                                            navigator.clipboard.writeText(bill.reference);
                                        },
                                        size: "large",
                                        sx: {
                                            color: "#000000",
                                            textTransform: "none"
                                        },
                                        children: bill.reference
                                    })
                                }),
                                renderExpiration()
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx((Link_default()), {
                            href: bill.paymentWeb,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            sx: {
                                mx: 2,
                                my: 1,
                                fontWeight: "regular"
                            },
                            children: new URL(bill.paymentWeb).host
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime.jsx((Box_default()), {
                    sx: {
                        mx: 2
                    },
                    children: renderLoaderButton()
                })
            ]
        })
    });
};
/* harmony default export */ const components_Bill = (Bill);

;// CONCATENATED MODULE: external "@mui/material/List"
const List_namespaceObject = require("@mui/material/List");
var List_default = /*#__PURE__*/__webpack_require__.n(List_namespaceObject);
;// CONCATENATED MODULE: external "@mui/material/ListItemButton"
const ListItemButton_namespaceObject = require("@mui/material/ListItemButton");
var ListItemButton_default = /*#__PURE__*/__webpack_require__.n(ListItemButton_namespaceObject);
// EXTERNAL MODULE: external "aws-amplify"
var external_aws_amplify_ = __webpack_require__(581);
;// CONCATENATED MODULE: external "react-bootstrap/ListGroup"
const ListGroup_namespaceObject = require("react-bootstrap/ListGroup");
var ListGroup_default = /*#__PURE__*/__webpack_require__.n(ListGroup_namespaceObject);
;// CONCATENATED MODULE: external "react-icons/bs"
const bs_namespaceObject = require("react-icons/bs");
// EXTERNAL MODULE: ./lib/errorLib.tsx
var errorLib = __webpack_require__(580);
;// CONCATENATED MODULE: ./pages/index.tsx










const Home = ({ data  })=>{
    const [bills, setBills] = (0,external_react_.useState)(data);
    const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
    async function handlePayBill(_id) {
        setIsLoading(true);
        try {
            await external_aws_amplify_.API.post("bills", `/payments/${_id}`, {});
            const newBills = bills.map((bill)=>{
                if (bill.billID == _id) {
                    bill.paid = true;
                }
                return bill;
            });
            setBills(newBills);
        } catch (e) {
            (0,errorLib/* onError */.q)(e);
        }
        setIsLoading(false);
    }
    async function handleDeleteBill(_id) {
        setIsLoading(true);
        try {
            await external_aws_amplify_.API.del("bills", `/bills/${_id}`, {});
            setBills((prev)=>[
                    ...prev.filter((bill)=>bill.billID != _id)
                ]);
        } catch (e) {
            (0,errorLib/* onError */.q)(e);
        }
        setIsLoading(false);
    }
    function renderBillsList(bills) {
        return /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)((List_default()), {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)((ListItemButton_default()), {
                        divider: true,
                        href: "/bills/new",
                        sx: {
                            py: 3,
                            borderRadius: "10px"
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx(bs_namespaceObject.BsPencilSquare, {
                                size: 17
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                className: "ms-2 fw-bold",
                                children: "Create a new bill"
                            })
                        ]
                    }),
                    bills.map((bill)=>/*#__PURE__*/ jsx_runtime.jsx(components_Bill, {
                            bill: bill,
                            isLoading: isLoading,
                            onPayBill: handlePayBill,
                            onDeleteBill: handleDeleteBill
                        }, bill.billID))
                ]
            })
        });
    }
    function renderLander() {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "lander",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("h1", {
                    children: "Scratch"
                }),
                /*#__PURE__*/ jsx_runtime.jsx("p", {
                    className: "text-muted",
                    children: "A simple bill manager app"
                })
            ]
        });
    }
    function renderNotes() {
        return(// <ListGroup>{!isLoading && renderBillsList(bills)}</ListGroup>
        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "notes",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx((Typography_default()), {
                    variant: "h5",
                    component: "div",
                    sx: {
                        mt: 4,
                        mx: 2
                    },
                    children: "Your bills"
                }),
                /*#__PURE__*/ jsx_runtime.jsx((ListGroup_default()), {
                    children: renderBillsList(bills)
                })
            ]
        }));
    }
    return /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
            className: "Home",
            children: renderNotes()
        })
    });
};
const getServerSideProps = async ()=>{
    try {
        const data = await external_aws_amplify_.API.get("bills", "/bills", {});
        return {
            props: {
                data
            }
        };
    } catch (e) {
        (0,errorLib/* onError */.q)(e);
        return {
            props: []
        };
    }
};
/* harmony default export */ const pages = (Home); /*
useEffect(() => {
  async function onLoad() {
    try {
      const notes = await loadBills();
      setBills(notes);
      console.log(notes)
    } catch (e) {
      onError(e);
    }
    setIsLoading(false);
  }

  onLoad();
});

function loadBills() {
  return API.get("bills", "/bills", {});
}
*/ 


/***/ }),

/***/ 829:
/***/ ((module) => {

module.exports = require("@mui/lab/LoadingButton");

/***/ }),

/***/ 19:
/***/ ((module) => {

module.exports = require("@mui/material/Box");

/***/ }),

/***/ 246:
/***/ ((module) => {

module.exports = require("@mui/material/Link");

/***/ }),

/***/ 581:
/***/ ((module) => {

module.exports = require("aws-amplify");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [458], () => (__webpack_exec__(927)));
module.exports = __webpack_exports__;

})();