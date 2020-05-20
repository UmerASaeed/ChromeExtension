document.getElementById("login-to").innerText = chrome.i18n.getMessage("loginto");
document.getElementById("no_account").innerHTML = chrome.i18n.getMessage("no_account") + 
    '<a class="sign_up_third" href="Third_sign.html" id="signup">&nbsp</a>';
document.getElementById("signup").innerText+= chrome.i18n.getMessage("signup");
document.getElementById("invalid").childNodes[0].innerText+=chrome.i18n.getMessage("invalid");
document.getElementById("email_signin").placeholder = chrome.i18n.getMessage("emailPlaceholder");
document.getElementById("pass_signin").placeholder = chrome.i18n.getMessage("passwordPlaceholder");
document.getElementById("btn_signin").value = chrome.i18n.getMessage("login");
document.getElementById("forgot-pass").innerText = chrome.i18n.getMessage("forgotpassword");

function events()
{   
    document.getElementById("email_signin").style.borderColor="rgb(235,235,235)"
    document.getElementById("pass_signin").style.borderColor="rgb(235,235,235)"
    document.getElementById("invalid").style.color="white";
    const email_signin=document.getElementById("email_signin").value;
    const pass_signin=document.getElementById("pass_signin").value;
    if (email_signin===""||pass_signin==="")
    {  
        
        document.getElementById("invalid").style.width="282px"
        document.getElementById("invalid").style.color="red";
        if (email_signin==="")
        {
        document.getElementById("email_signin").style.borderColor="rgb(230, 93, 93)"
        document.getElementById("invalid").innerHTML="<b>Email or username is required</b>";
        }
        if (pass_signin==="")
        {
        document.getElementById("invalid").innerHTML="<b>Password is required</b>";    
        document.getElementById("pass_signin").style.borderColor="rgb(230, 93, 93)"
        }
        if (email_signin===""&&pass_signin==="")  
        {
            document.getElementById("invalid").innerHTML="<b>All fields are required</b>";
            document.getElementById("email_signin").style.borderColor="rgb(230, 93, 93)";
            document.getElementById("pass_signin").style.borderColor="rgb(230, 93, 93)";
        }     
    }
     else
     {
        var bkg = chrome.extension.getBackgroundPage();
        document.getElementById("btn_signin").value="Logging in"
        let headers=new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded')
        headers.append('email',email_signin);
        headers.append('password',pass_signin);

        fetch(bkg.apiHost + "validate-user",
        {
            method:"GET",
            headers:headers
        })
        .then(resp=>resp.json())
        .then(data=> {
            let decision = data.error; 
            if (!decision) {
                fetch(bkg.apiHost + "login",
                {
                    method:"GET",
                    headers:headers
                })
                .then(resp=>resp.json())
                .then(()=> {
                    chrome.browserAction.setPopup({
                        popup:"./Html/fourth.html"
                    });
                    chrome.storage.local.set({"username":email_signin},function()
                    {
                        console.log("user added")
                    })  
                    chrome.storage.local.set({"pass":pass_signin},function()
                    {
                        console.log("password added")
                    })  
                    var url="fourth.html";
                    window.location.href=url;
                })
                .catch(err => {
                    console.log(err);
                }).finally(()=>
                {
                    document.getElementById("btn_signin").value="Log in";        
                })
            }
            else 
            {
                document.getElementById("invalid").innerHTML="<b>Invalid Username or Password</b>"
                document.getElementById("invalid").style.width="282px"
                document.getElementById("email_signin").style.borderColor="rgb(230, 93, 93)"
                document.getElementById("pass_signin").style.borderColor="rgb(230, 93, 93)"
                document.getElementById("invalid").style.color="red";
               
            }
            document.getElementById("btn_signin").value="Log in";
        })
        .catch(err => {
            document.getElementById("invalid").innerHTML="<b>Oops could not log in at the moment</b>";
            document.getElementById("invalid").style.width="282px";
            document.getElementById("btn_signin").value="Log in";
          })

     }
}

document.getElementById("pass_signin").addEventListener("keypress",function(event)
	{	
		if(event.keyCode===13) {
			events();
	    }
	})
document.getElementById('btn_signin').addEventListener('click',function(event){
        events();
  });

  document.getElementById('forgot-pass').addEventListener('click',function(event){
        window.open('https://belkavpn.com/',"",'width=100px')
  });