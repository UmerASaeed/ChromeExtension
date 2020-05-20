document.getElementById("desc1").innerText = chrome.i18n.getMessage("desc1");
document.getElementById("desc2").innerText = chrome.i18n.getMessage("desc2");
document.getElementById("desc3").innerText = chrome.i18n.getMessage("desc3");
document.getElementById("skip").value = chrome.i18n.getMessage("skip");
document.getElementById("continue").value = chrome.i18n.getMessage("continue");


$(document).ready(function(){
  // Activate Carousel
  $("#myCarousel").carousel();
  let ind=0;
  let cmp=0;

  $(".item1").click(function(){
    ind=0;
    $("#myCarousel").carousel(0);
  });
  $(".item2").click(function(){
    ind=1;
    $("#myCarousel").carousel(1);
  });
  $(".item3").click(function(){
    ind=2;
    $("#myCarousel").carousel(2);
  });


  $("#myCarousel").on('slid.bs.carousel', function (e) {
    
    console.log(ind=$(".active", e.target).index())
    // ind=ind-1;

  });

  $(".btn2_vs").click(function(){
    $("#myCarousel").on('slid.bs.carousel', function (e) {
      cmp=$(".active", e.target).index();    
    });
    if(cmp===2)
    {
      window.location.href="Third.html";
    }
    if (ind===0)
    {
      console.log('comin-ind=0',ind);
      $("#myCarousel").carousel("next");
      ind=1;
      console.log('going-ind=0',ind);
    }
    else if (ind===1)
    {
      
      console.log('comin-ind=1',ind);
      $("#myCarousel").carousel("next");
      ind=2;
      console.log('going-ind=1',ind);
    }
  });

  $(".btn1_vs").click(function(){
    window.location.href="Third.html";
  });
});

