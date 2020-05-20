document.getElementById("signup").innerText= chrome.i18n.getMessage("signup");
document.getElementById("email_signup").placeholder = chrome.i18n.getMessage("emailPlaceholder");
document.getElementById("pass_signup").placeholder = chrome.i18n.getMessage("passwordPlaceholder");
document.getElementById("confirmPass_signup").placeholder = chrome.i18n.getMessage("confirmpassword");
document.getElementById("btn_signup").value= chrome.i18n.getMessage("signme");
document.getElementById("btn2_signup").value= chrome.i18n.getMessage("back");
document.getElementById("invalid").childNodes[0].innerText+=chrome.i18n.getMessage("fields");


(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const queryString = require('query-string');

function events()
{
	document.getElementById("email_signup").style.borderColor="rgb(235,235,235)"
    document.getElementById("pass_signup").style.borderColor="rgb(235,235,235)"
    document.getElementById("confirmPass_signup").style.borderColor="rgb(235,235,235)"
    document.getElementById("invalid").style.color="white";
    const email_signupp=document.getElementById("email_signup");
    const pass_signupp=document.getElementById("pass_signup");
	const confirmPasss=document.getElementById("confirmPass_signup");
	debugger;
    if (email_signupp.value===""||pass_signupp.value===""||confirmPasss.value==="")
    {
        document.getElementById("invalid").innerHTML="<b>All fields are required</b>";
        document.getElementById("invalid").style.width="282px";
        document.getElementById("invalid").style.color="red";
        if (email_signupp.value==="")
        {
            document.getElementById("email_signup").style.borderColor="rgb(230, 93, 93)";
        }
        if (pass_signupp.value==="")
        {
            document.getElementById("pass_signup").style.borderColor="rgb(230, 93, 93)";
        
        }
        if (confirmPasss.value==="")
        {    
            document.getElementById("confirmPass_signup").style.borderColor="rgb(230, 93, 93)";
        }

	}
	else if(pass_signupp.value.length<8||confirmPasss.value.length<8)
	{
		document.getElementById("invalid").innerHTML="<b>Password must have at least 8 characters</b>";
		document.getElementById("invalid").style.width="282px";
		document.getElementById("invalid").style.color="red";
		if (pass_signupp.value.length<8)
		{
			document.getElementById("pass_signup").style.borderColor="rgb(230, 93, 93)";
		}
		if (confirmPasss.value.length<8)
		{
			document.getElementById("confirmPass_signup").style.borderColor="rgb(230, 93, 93)";
		}
	}
    else if(pass_signupp.value===confirmPasss.value)
      { 
		 
		document.getElementById("btn_signup").value="SIGN ME UP";
		let today = new Date();
		const todayEpoch=Math.floor(Date.now()/1000)
	
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		

        today = mm + dd + yyyy;
        yyyy= yyyy + 1;
		const nextyear= new Date(yyyy,mm-1,dd).getTime()/1000
		console.log(nextyear);
        var uuid=new DeviceUUID().get();
        var du = new DeviceUUID().parse();
		let deviceinfo=
		{
			os: du.os,
			broswer:du.browser,
			version:du.version,
			platform:du.platform,
			language:du.language
		}	
		let devinfo=JSON.stringify(deviceinfo)

        var payload=
        {
            email:email_signupp.value,
            name:email_signupp.value,
            deviceId:uuid,
            deviceInfo:devinfo,
            purchaseData:"Free",
            paymentDate:todayEpoch,
            subExpire:nextyear,
            password:pass_signupp.value
        }
        
        let headers=new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded')
		document.getElementById("btn_signup").value="Signing up";
		var bkg = chrome.extension.getBackgroundPage();
        fetch(bkg.apiHost + "register-user",
        {
            method:"POST",
            headers:headers,
            body:queryString.stringify(payload)
        })
        .then(resp=>resp.json())
		.then(data=>{
			let decision = data.error; 
			if (!decision) 
			{
				chrome.browserAction.setPopup({
					popup:"./Html/fourth.html"
				});
				window.location.href="fourth.html";
			}
			else
			{
				if (data.message==="Email not valid")
				{
					document.getElementById("email_signup").style.borderColor="rgb(230, 93, 93)";
					document.getElementById("invalid").innerHTML="<b>Email not valid</b>"
				}
				else 
				{
					document.getElementById("invalid").innerHTML="<b>Looks like you already registered, try to login or restore account</b>"
				}
				document.getElementById("invalid").style.width="282px";
				document.getElementById("invalid").style.color="red";
			}
		})
		.catch(err=>
			{
				document.getElementById("invalid").innerHTML="<b>Oops could not Sign you up at the moment</b>";
				document.getElementById("invalid").style.width="282px";
				document.getElementById("btn_signin").value="SIGN ME UP";
			})
		.finally(()=>
		{
			document.getElementById("btn_signup").value="SIGN ME UP";
		})
        
    }
    else 
    {
        document.getElementById("invalid").style.width="282px";
        document.getElementById("invalid").innerHTML="<b>Passwords don't match</b>";
        document.getElementById("invalid").style.color="red";
        document.getElementById('pass_signup').style.borderColor="rgb(230, 93, 93)"
        document.getElementById('confirmPass_signup').style.borderColor="rgb(230, 93, 93)"
    }
}

document.getElementById('btn2_signup').addEventListener('click',function(event){
	window.location.href="Third.html"
});

document.getElementById("confirmPass_signup").addEventListener("keypress",function(event)
	{	
		if(event.keyCode===13)
		{
			events();
	    }
	})

document.getElementById('btn_signup').addEventListener('click',function(event){
    events();
});
},{"query-string":3}],2:[function(require,module,exports){
'use strict';
var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};

},{}],3:[function(require,module,exports){
'use strict';
const strictUriEncode = require('strict-uri-encode');
const decodeComponent = require('decode-uri-component');
const splitOnFirst = require('split-on-first');

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;
				if (value === undefined) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (value === undefined) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'comma':
			return key => (result, value, index) => {
				if (value === null || value === undefined || value.length === 0) {
					return result;
				}

				if (index === 0) {
					return [[encode(key, options), '=', encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(',')];
			};

		default:
			return key => (result, value) => {
				if (value === undefined) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.split('').indexOf(',') > -1;
				const newValue = isArray ? value.split(',') : value;
				accumulator[key] = newValue;
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(input, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof input !== 'string') {
		return ret;
	}

	input = input.trim().replace(/^[?#&]/, '');

	if (!input) {
		return ret;
	}

	for (const param of input.split('&')) {
		let [key, value] = splitOnFirst(param.replace(/\+/g, ' '), '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none'
	}, options);

	const formatter = encoderForArrayFormat(options);
	const keys = Object.keys(object);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (input, options) => {
	return {
		url: removeHash(input).split('?')[0] || '',
		query: parse(extract(input), options)
	};
};

},{"decode-uri-component":2,"split-on-first":4,"strict-uri-encode":5}],4:[function(require,module,exports){
'use strict';

module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};

},{}],5:[function(require,module,exports){
'use strict';
module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

},{}]},{},[1]);
