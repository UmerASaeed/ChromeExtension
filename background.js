var apiHost = 'https://vocal-camera-257707.appspot.com/';

chrome.runtime.onInstalled.addListener(function() {
    chrome.browserAction.setPopup({
        popup:"./Html/vs.html"
    });
});

chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.get(['val'], function(result) {
        if (result.val===undefined) {
            console.log("adf")
            chrome.browserAction.setPopup({
                popup:"./Html/vs.html"
            });
        }   
        if (result.val==="set") {
            console.log("set")   
            chrome.browserAction.setPopup({popup: "../Html/fourth.html"}); 
        }
        else if (result.val==="last") { 
            console.log("last")
            chrome.storage.local.get(['close'], function(status) {
                if (status.close==="unset") {
                    chrome.proxy.settings.clear({scope : 'regular'});
                    chrome.browserAction.setIcon({path: "../img/bw_ic_launcher_round.png"});
                    chrome.browserAction.setPopup({popup: "../Html/fourth.html"});        
                }
                else {
                    console.log("first")
                    chrome.browserAction.setPopup( {
                        popup:"./Html/last_screen.html"
                    });
                }
            });
        }
        else
        {  
            chrome.browserAction.setPopup({
            popup:"./Html/vs.html"
            });         
        }    
})
})
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.local.get(['val'], function(result) {    
        if (result.val===undefined) {
            chrome.browserAction.setPopup({
                popup:"./Html/vs.html"
            });
        }   
        if (result.val==="set") {
            chrome.browserAction.setPopup({popup: "../Html/fourth.html"}); 
        }
        else if (result.val==="last") {
            console.log("last btn click")
            chrome.storage.local.get(['close'], function(status) {
                if (status.close==="unset") {
                    chrome.proxy.settings.clear({scope : 'regular'});
                    chrome.browserAction.setIcon({path: "../img/bw_ic_launcher_round.png"});
                    chrome.browserAction.setPopup({popup: "../Html/fourth.html"});        
                }
                else {
                    console.log("first")
                    chrome.browserAction.setPopup( {
                        popup:"./Html/last_screen.html"
                    });
                }
            });
        }
        else {  
            chrome.browserAction.setPopup({
              popup:"./Html/vs.html"
            });    
        }    
    })
 });