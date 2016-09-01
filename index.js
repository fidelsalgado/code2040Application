var request = require("request"),
    code2040Url = 'http://challenge.code2040.org/api/',
    code2040Token = '435537725d12267f4efa19879e506442',
    githubUrl = 'https://github.com/fidelsalgado/code2040Application/';

var defaultOptions = { 
  method: 'POST',
  headers: { 'content-type': 'multipart/form-data;' },
  formData: { token: code2040Token, github: githubUrl }
};

function step1() {
  defaultOptions.url = code2040Url + 'register';
  request(defaultOptions, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
}

function step2() {
  /* Get the string to reverse */
  defaultOptions.url = code2040Url + 'reverse';
  request(defaultOptions, function (error, response, body) {
    if (error) throw new Error(error);
    
    /* Reverse string and send it */
    defaultOptions.url = code2040Url + 'reverse/validate';
    defaultOptions.formData.string = body.split("").reverse().join("");
    request(defaultOptions, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  });
}

function step3() {
  defaultOptions.url = code2040Url + 'haystack';
  request(defaultOptions, function (error, response, body) {
    if (error) throw new Error(error);
    
    /* Find needle index and send it*/
    defaultOptions.url = code2040Url + 'haystack/validate';
    body = JSON.parse(body);
    defaultOptions.formData.needle = body.haystack.indexOf(body.needle);
    request(defaultOptions, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  });
}

function step4() {
  defaultOptions.url = code2040Url + 'prefix';
  request(defaultOptions, function (error, response, body) {
    if (error) throw new Error(error);
    
    /* Find all the non-prefixes and send it*/
    defaultOptions.url = code2040Url + 'prefix/validate';
    body = JSON.parse(body);
    console.log(body.prefix);
    console.log(body.array);
    defaultOptions.formData.array = body.array.filter(function(str) {
      return !str.startsWith(body.prefix);
    });
    console.log(defaultOptions.formData);
    request(defaultOptions, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  });
}

step4();
