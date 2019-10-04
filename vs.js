$(document).ready(function(){
  // Activate Carousel
  $("#myCarousel").carousel();
  let ind=0;

  function slided()
  {
    
    return true;
  }
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
  
  $("#myCarousel").on('slid.bs.carousel', function () {
    alert('The carousel has finished sliding from one item to another!');
  });
  
  $(".btn2").click(function(){
    if(ind==2)
    {
      window.location.href="Second.html";
    }
    if (ind===0)
    {
      $("#myCarousel").carousel("next");
      ind=1;
    }
    else if (ind===1)
    {
      if ($("#myCarousel").carousel("next"))
      {
      ind=2;
      }
    }
  });

  $(".btn1").click(function(){
    window.location.href="Second.html";
  });

});

