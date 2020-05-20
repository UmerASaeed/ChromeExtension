document.getElementById("connect").childNodes[5].innerText=chrome.i18n.getMessage("notconnected");
document.getElementById("connect").childNodes[9].innerText=chrome.i18n.getMessage("onmessage");
document.getElementById("connect").childNodes[13].innerText=chrome.i18n.getMessage("err");
document.getElementById("connect").childNodes[17].value=chrome.i18n.getMessage("connect");
document.getElementById("connect").childNodes[20].innerHTML+=chrome.i18n.getMessage("location");

chrome.browserAction.setIcon({path: "../img/bw_ic_launcher_round.png"},function(){
});

let username;
let pass;
chrome.storage.local.get(['username'], function(result) {
    username=result.username;
});
chrome.storage.local.get(['pass'], function(result) {
    pass=result.pass;
});
chrome.webRequest.onAuthRequired.addListener(
    function(details, callbackFn) {
        callbackFn({
            authCredentials: {username: username, password: pass}
        });
    },
    {urls: ["<all_urls>"]},
    ['asyncBlocking']
);

$(window).ready(function() {
    chrome.storage.local.set({"val":"set"},function() {});
    $("#auto_btn").bind("click",function() {  
        document.getElementById("auto_btn").value="Connecting";
        var rerr=0;
        var uuid="779fa0bc039e5840";
        var email="artembogomaz@gmail.com";
        let headers=new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded')
        headers.append('email',email);
        headers.append('deviceId', uuid);
        var bkg = chrome.extension.getBackgroundPage();

        fetch(bkg.apiHost + "socksBest",
        {
            method:"GET",
            headers:headers
        })
        .then(resp=>resp.json())
        .then(response=> {
            let decision = response.error; 
            if (!decision) {
                let host=response.data.ip;
                let port=response.data.port;
                var config = {
                    mode: "fixed_servers",
                    rules: {
                        singleProxy: {
                        scheme:"socks5",
                        host: host,
                        port:port
                        },
                    bypassList: [
                        '0.*.*.*', /* 0.0.0.0/8 */ 
                        '10.*.*.*', /* 10.0.0.0/8 */ 
                        '127.*.*.*', /* 127.0.0.0/8 */ 
                        '169.254.*.*', /* 169.254.0.0/16 */ 
                        '172.1[6-9].*.*', /* 172.16.0.0/12 */ 
                        '172.2[0-9].*.*', /* 172.16.0.0/12 */ 
                        '172.3[0-1].*.*', /* 172.16.0.0/12 */ 
                        '192.0.0.*', /* 192.0.0.0/24 */ 
                        '192.0.2.*', /* 192.0.2.0/24 */ 
                        '192.168.*.*', /* 192.168.0.0/16 */ 
                        '198.1[8-9].*.*', /* 198.18.0.0/15 */ 
                        '198.51.100.*', /* 198.51.100.0/24 */ 
                        '203.0.113.*', /* 203.0.113.0/24 */ 
                        '22[4-9].*.*.*', /* 224.0.0.0/4 */ 
                        '23[0-9].*.*.*', /* 224.0.0.0/4 */ 
                       ]
                    }
                };
                chrome.proxy.settings.set({value: config, scope: 'regular'},() => {
                    if (chrome.runtime.lastError) {
                        console.log(`Error occur on apply proxy, ${chrome.runtime.lastError}`);
                        reject(chrome.runtime.lastError);
                    }
                    if (!rerr) {
                        chrome.browserAction.setIcon({path: "../img/ic_launcher_round.png"},function() {
                            chrome.storage.local.set({"country_code":response.data.country_code},function() {
                            });    
                            chrome.storage.local.set({"country_name":response.data.name},function() {
                            }); 
                            chrome.storage.local.set({"val":"last"},function() {
                            });  
                            window.location.href="last_screen.html";
                        }); 
                    }        
                });
                const setProxyErrorHandler = () => {
                    chrome.proxy.onProxyError.addListener(details => {
                    console.log('Error with proxy  , ', details);
                    //showNofitication({ title: 'Proxy error', message: details.error });
                    rerr=1;
                    });
                };
            } 
            else {
                document.getElementById("err").style.display='block';
            }           
        })
        .catch(err => {
            document.getElementById("err").style.display='block';
        })
        .finally(()=> {
            document.getElementById("auto_btn").value="Auto Connect";
        })
    })
});

