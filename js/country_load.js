document.getElementById("select_header").childNodes[3].innerHTML=chrome.i18n.getMessage("search");
document.getElementById("search_container").childNodes[1].placeholder=chrome.i18n.getMessage("searchplaceholder");
document.getElementById("search_container").childNodes[4].innerHTML=chrome.i18n.getMessage("err");
document.getElementById("search_container").childNodes[6].innerHTML=chrome.i18n.getMessage("loading");


var uuid="779fa0bc039e5840";
var email="artembogomaz@gmail.com";
let headers=new Headers();
headers.append('Content-Type','application/x-www-form-urlencoded')
headers.append('email',email);
headers.append('deviceId', uuid);
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
var bkg = chrome.extension.getBackgroundPage();
fetch(bkg.apiHost + "socks",
{
    method:"GET",
    headers:headers
})
.then(resp=>resp.json())
.then(response=> {
    let decision = response.error; 
    if (!decision) {
        var empTab = document.getElementById('country_tbl');
        var tr,td1,i,txt,td2,td3;
        document.getElementById("loading").style.display='none';
        response.data.forEach(element => {
            tr = empTab.insertRow();      // TABLE ROW.
            tr.setAttribute('class','clickable-row');
            td1 = tr.insertCell(0);
            td1.setAttribute('class','first_column');
            i = document.createElement('img');
            i.setAttribute('src', '../img/i/' + element.country_code + '-icon.png');
            i.setAttribute('class', 'country_flag');
            i.setAttribute('alt','flags');
            td1.appendChild(i);
            txt=document.createElement('span');
            txt.setAttribute('id','cntryname');
            txt.innerHTML=element.name;
            td1.appendChild(txt);

            td2 = tr.insertCell(1);
            td2.setAttribute('class','scnd_column');
            td2.innerHTML="&#9900; Connected";

            td3 = tr.insertCell(2);
            td3.setAttribute('class','third_column');
            td3.style.display="none";
            td3.innerHTML=element.country_code;

            td4 = tr.insertCell(3);
            td4.setAttribute('class','ip');
            td4.style.display="none";
            td4.innerHTML=element.ip;

            td5 = tr.insertCell(4);
            td5.setAttribute('class','port');
            td5.style.display="none";
            td5.innerHTML=element.port; 
        });
    }
    else {
        document.getElementById("err").style.display='block';
        document.getElementById("loading").style.display='none';
    }
})
.catch(err => {
    document.getElementById("err").style.display='block';
    document.getElementById("loading").style.display='none';
});

var myTextBox = document.getElementById('search');
myTextBox.addEventListener('keyup', function(){
    var input,tr,td,i,txtvalue;
    input=myTextBox.value.toUpperCase();
    tr=document.getElementById("country_tbl").getElementsByTagName("tr");
    for (i=0; i<tr.length; i++) {
        td=tr[i].getElementsByTagName("td")[0].childNodes[1];
        if(td) {
            txtvalue=td.txtvalue||td.textContent;
            if(txtvalue.toUpperCase().indexOf(input)>-1) {
                tr[i].style.display="";
            }
            else {
                tr[i].style.display="none";
            }
        }
    }
});

$(window).ready(function() {
    $('.tbl').on('click', '.clickable-row', function(event) {
        $(this).addClass('active').siblings().removeClass('active');
        $('.tbl').not(this).find('.scnd_column').hide();
        $(this).find('.scnd_column').show();
        let cc=$(this).find('.third_column').text();
        let ip=$(this).find(".ip").text();
        let port=$(this).find(".port").text();
        port=parseInt(port);
        let cn=$(this).find('#cntryname').text();
        var rerr=0;

        var config = {
            mode: "fixed_servers",
            rules: {
                singleProxy: {
                scheme:"socks5",
                host: ip,
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
        chrome.proxy.settings.set({value: config, scope: 'regular'},function() {  
            if (chrome.runtime.lastError) {
                console.log(`Error occur on apply proxy, ${chrome.runtime.lastError}`);
                reject(chrome.runtime.lastError);
            } 
            if (!rerr) {
                chrome.browserAction.setIcon({path: "../img/ic_launcher_round.png"}, function(){
                    chrome.storage.local.set({"country_code":cc},function() {
                    });  
                    chrome.storage.local.set({"country_name":cn},function() {
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
            showNofitication({ title: 'Proxy error', message: details.error });
            rerr=1;
            });
        };   
    });

    $("#goback").bind("click",function() {
        chrome.storage.local.get(['choose_loc'], function(result) {
            if(result.choose_loc==="end") {
                chrome.storage.local.set({"choose_loc":""},function() {
                }); 
                window.location.href="../Html/last_screen.html";
            }
            else {
                window.location.href="../Html/fourth.html";
            }
        });
    });
});