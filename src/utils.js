var utils = {};

utils.qs = function(selector, context) {
	context = context || document;
	return context.querySelector(selector);
};

utils.qsa = function(selector, context) {
	context = context || document;
	return context.querySelectorAll(selector);
};

utils.wait = function(ms, cb) {
	return window.setTimeout(cb, (ms || 500));
};

utils.isDevMode = function() {
	return window && window.location.hostname === 'localhost';
};

module.exports = utils;