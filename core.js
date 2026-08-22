;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RepoTool = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
function placeholder(key,value){if(/(?:secret|token|password|pass|api_?key|private)/i.test(key))return 'replace_me';if(/url|uri|host/i.test(key))return value.replace(/:\/\/[^@/]+@/,'://user:password@').replace(/[?&](?:token|key|secret)=[^&]*/gi,'');if(/^(?:true|false)$/i.test(value))return value.toLowerCase();if(/^\d+$/.test(value))return value;return '';}
function clean(input){var map=new Map(),comments=[];String(input||'').replace(/\r\n/g,'\n').split('\n').forEach(function(line,index){var t=line.trim();if(!t)return;if(t.startsWith('#')){comments.push(t);return;}var m=/^(?:export\s+)?([^=\s]+)\s*=\s*(.*)$/.exec(t);if(!m)throw new Error('Invalid assignment on line '+(index+1));var key=m[1].toUpperCase().replace(/[^A-Z0-9_]/g,'_').replace(/^([^A-Z_])/,'_$1');var value=m[2].replace(/^(['"])([\s\S]*)\1$/,'$2');map.set(key,placeholder(key,value));});return Array.from(map).sort(function(a,b){return a[0].localeCompare(b[0]);}).map(function(pair){return pair[0]+'='+pair[1];}).join('\n')+'\n';}
async function process(input){var output=clean(input);return{output:output,summary:output.trim().split('\n').filter(Boolean).length+' variables'};}
  return { process: process, clean: clean, placeholder: placeholder };
});
