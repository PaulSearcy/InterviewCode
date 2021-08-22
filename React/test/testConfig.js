require('@babel/register')();
require('global-jsdom')();

/* eslint-disable */
window.URL.createObjectURL = () => '';
global.requestAnimationFrame = (cb) => {
    setTimeout(cb, 0);
};
