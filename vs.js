$(document).ready(function(){
  // Activate Carousel
  $("#myCarousel").carousel();
  let ind=0;

    
  // Enable Carousel Controls
  // $(".left").click(function(){
  //   $("#myCarousel").carousel("prev");
  // });
  
    var txt1=`<a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
     </a>
       `

  $(".btn2").click(function(){
    $('.carousel').on('slid.bs.carousel',function(e){
    var index = $(this).find('.active').index();
    if (index===2)
    {
      $('.carousel-inner').append(txt1);
      ind=1;
    }
    else
    {
      ind=0;
    }
    });
    if (ind!==1)
    {
    $("#myCarousel").carousel("next");
    }
    else
    {
        window.location.href="Second.html";
    }
  });

  $(".btn1").click(function(){
    window.location.href="Second.html";
  });

});

