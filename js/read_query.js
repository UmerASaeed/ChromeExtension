document.getElementById("country_connect").childNodes[5].innerHTML=chrome.i18n.getMessage("connected") + 
'<span id="cntry_name"></span>';
document.getElementById("country_connect").childNodes[9].innerText=chrome.i18n.getMessage("connectionmessage");
document.getElementById("country_connect").childNodes[14].childNodes[1].value=chrome.i18n.getMessage("Disconnect");
document.getElementById("country_connect").childNodes[16].innerHTML+=chrome.i18n.getMessage("location");

chrome.storage.local.get(['country_code'], function(result) {
    document.getElementById("big_flag").setAttribute('src','../img/i/' + result.country_code + '-icon.png');
});
chrome.storage.local.get(['country_name'], function(result) {
    document.getElementById("cntry_name").innerHTML=result.country_name;
});

chrome.browserAction.setPopup({popup: "../Html/last_screen.html"});
chrome.storage.local.set({"close":"unset"},function() {});

    $("#disconnect").bind("click",function() {
        chrome.storage.local.set({"close":""},function() {});
        chrome.proxy.settings.clear({scope : 'regular'});
        chrome.browserAction.setPopup({popup: "../Html/fourth.html"}); 

    });
    $("#loc").bind("click",function() {
        chrome.storage.local.set({"choose_loc":"end"},function() {
        })  
       window.location.href="../Html/fifth.html"
    });