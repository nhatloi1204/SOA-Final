/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/public/javascript/admin.js":
/*!****************************************!*\
  !*** ./src/public/javascript/admin.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"adminLoginFetch\": () => (/* binding */ adminLoginFetch)\n/* harmony export */ });\nconst adminLoginFetch = async (name, password) => {\r\n    await fetch(`http://localhost:3000/admin/login`, {\r\n        method: 'POST',\r\n        headers: { 'Content-Type': 'application/json' },\r\n        body: JSON.stringify({ name, password }),\r\n        redirect: 'follow'\r\n    }).then((response) => {\r\n        if (response.redirected) {\r\n            window.location.href = response.url;\r\n        }\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://soa-final/./src/public/javascript/admin.js?");

/***/ }),

/***/ "./src/public/javascript/script.js":
/*!*****************************************!*\
  !*** ./src/public/javascript/script.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.js */ \"./src/public/javascript/user.js\");\n/* harmony import */ var _admin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin.js */ \"./src/public/javascript/admin.js\");\n\r\n\r\n\r\n$(document).ready(() => {\r\n    // * handle login functionality\r\n    $(\"form[id='login']\").submit((e) => {\r\n        e.preventDefault();\r\n        const form = new FormData(e.target);\r\n        const email = form.get('email');\r\n        const password = form.get('password');\r\n        (0,_user_js__WEBPACK_IMPORTED_MODULE_0__.loginFetch)(email, password);\r\n    });\r\n\r\n    // * handle register functionality\r\n    $(\"form[id='register']\").submit((e) => {\r\n        e.preventDefault();\r\n        const form = new FormData(e.target);\r\n        const name = form.get('name');\r\n        const email = form.get('email');\r\n        const password = form.get('password');\r\n        const confirmPass = form.get('confirm-password');\r\n\r\n        if (password !== confirmPass) {\r\n            $('.error-container').html(`<strong> ⚠ please make sure your confirm password match </strong>`);\r\n            return;\r\n        }\r\n        (0,_user_js__WEBPACK_IMPORTED_MODULE_0__.registerFetch)(name, email, password);\r\n    });\r\n\r\n    //* handle admin login functionality\r\n    $(\"form[id='adminLogin']\").submit((e) => {\r\n        e.preventDefault();\r\n        const form = new FormData(e.target);\r\n        const name = form.get('adminName');\r\n        const password = form.get('adminPassword');\r\n        (0,_admin_js__WEBPACK_IMPORTED_MODULE_1__.adminLoginFetch)(name, password);\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://soa-final/./src/public/javascript/script.js?");

/***/ }),

/***/ "./src/public/javascript/user.js":
/*!***************************************!*\
  !*** ./src/public/javascript/user.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loginFetch\": () => (/* binding */ loginFetch),\n/* harmony export */   \"logout\": () => (/* binding */ logout),\n/* harmony export */   \"registerFetch\": () => (/* binding */ registerFetch)\n/* harmony export */ });\nconst loginFetch = async (email, password) => {\r\n    const response = await fetch(`http://localhost:3000/login`, {\r\n        method: 'POST',\r\n        headers: { 'Content-Type': 'application/json' },\r\n        body: JSON.stringify({ email, password }),\r\n    });\r\n\r\n    const json = await response.json();\r\n    if (!response.ok) {\r\n        $('.error-container').html(`<strong>⚠ ${json} </strong>`);\r\n        return;\r\n    }\r\n\r\n    // * save user and token to session storage in order to\r\n    // * send the token along with request which require authenticated\r\n    sessionStorage.setItem('token', JSON.stringify(json.token));\r\n    sessionStorage.setItem('user', JSON.stringify(json.user));\r\n\r\n    // * redirect user to home page after login\r\n    location.href = 'http://localhost:3000/';\r\n};\r\n\r\nconst registerFetch = async (name, email, password) => {\r\n    const response = await fetch(`http://localhost:3000/register`, {\r\n        method: 'POST',\r\n        headers: { 'Content-type': 'application/json' },\r\n        body: JSON.stringify({ name, email, password }),\r\n    });\r\n\r\n    const json = await response.json();\r\n\r\n    if (!response.ok) {\r\n        $('.error-container').html(`<strong> ⚠ ${json} </strong>`);\r\n        return;\r\n    }\r\n\r\n    // * save user and token to session storage in order to\r\n    // * send the token along with request which require authenticated\r\n    sessionStorage.setItem('token', JSON.stringify(json.token));\r\n    sessionStorage.setItem('user', JSON.stringify(json.user));\r\n\r\n    // * redirect user to home page after login\r\n    location.href = 'http://localhost:3000/';\r\n};\r\n\r\nconst logout = async () => {\r\n    sessionStorage.removeItem('user');\r\n    sessionStorage.removeItem('token');\r\n};\r\n\r\n\n\n//# sourceURL=webpack://soa-final/./src/public/javascript/user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/public/javascript/script.js");
/******/ 	
/******/ })()
;