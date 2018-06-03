/*
 * © 2018 Tal Globus. All Rights Reserved.
 */

const noNaughtyWords = require('no-naughty-words')

module.exports = text => noNaughtyWords.filter(text) !== text;