var request = require("request"),
    code2040Url = 'http://challenge.code2040.org/api/',
    code2040Token = '435537725d12267f4efa19879e506442',
    githubUrl = 'https://github.com/fidelsalgado/code2040Application/';

function postOptions(url, data) {
  var options = { url: url, method: 'POST', json: data }
  options.json.token = code2040Token
  return options;
}

function step1() {
  var url = code2040Url + 'register';
  var data = {github: githubUrl};
  request(postOptions(url, data), function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
}

function step2() {
  /* Get the string to reverse */
  var url = code2040Url + 'reverse';
  request(postOptions(url, {}), function (error, response, body) {
    if (error) throw new Error(error);
    
    var url = code2040Url + 'reverse/validate';
    var data = {string: body.split("").reverse().join("")}
    request(postOptions(url, data), function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  });
}

function step3() {
  var url = code2040Url + 'haystack';
  request(postOptions(url, {}), function (error, response, body) {
    if (error) throw new Error(error);
    
    var url = code2040Url + 'haystack/validate';
    var data = {needle: body.haystack.indexOf(body.needle)};
    request(postOptions(url, data), function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  });
}

function step4() {
  var url = code2040Url + 'prefix';
  request(postOptions(url, {}), function (error, response, body) {
    if (error) throw new Error(error);
    
    var url = code2040Url + 'prefix/validate';
    var data = {
      array: body.array.filter(function(str) {
        return str.indexOf(body.prefix) != 0;
      })
    };
    request(postOptions(url, data), function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  });
}

function step5() {
  var url = code2040Url + 'dating';
  request(postOptions(url, {}), function (error, response, body) {
    if (error) throw new Error(error);

    var intervalInMs = body.interval * 1000;
    var newDate = new Date((new Date(body.datestamp)).getTime() + intervalInMs);
    var url = code2040Url + 'dating/validate';
    var data = {datestamp: newDate.toISOString().split(".")[0] + "Z"};
    request(postOptions(url, data), function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  });

}

step5();
