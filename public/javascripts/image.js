var top = document.getElementById("top");
var pic = document.getElementById("picture");
var dots = document.getElementById("bottom").getElementsByTagName("img");

var index = 0;

function showCurrentDot(){
	for (var i=0; i<dots.length; i++){
		dots[i].className ="";
	}
	dots[index].className ="on";
}

showCurrentDot();

for (var i=0; i<dots.length; i++){
	(function(i){
		dots[i].onclick = function(){
			if(i==0){
				pic.src ="uploads/cola1.png";
			}

			if(i==1){
				pic.src ="uploads/cola2.jpg";
			}

			if(i==2){
				pic.src ="uploads/cola3.jpg";
			}

			index = i;
			showCurrentDot();
		}
	})(i);
}



        