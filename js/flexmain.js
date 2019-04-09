var getBox = function(className){
    return document.querySelector("." + className)
}


var fistBoxController = (function(){
    var firstBox = getBox("firstBox");
    var liList = document.querySelectorAll(".menuBox li");
    console.log(liList.length);
    var ul = document.querySelector(".contentBox ul");
    var controller = {
        muneController : function(){

            for(var i = 0; i < liList.length; i++){

                liList[i].addEventListener("touchstart",function(event,n){
                    return function(){
                        console.log(n);
                        for(var j = 0; j < liList.length; j++){
                            liList[j].classList.remove("liactive");

                        }
                        this.classList.add("liactive");
                        ul.style.left = "-" + n * 100 + "%";
                    }

                }(event,i))
            }
        }(),
        contentCtroller : function(){
            var contentBox = document.querySelector(".contentBox");

            ul.style.left = "0%";
            //console.log(ul);
            //console.log(contentBox);
            var startX,disX;
            contentBox.addEventListener("touchstart",function(event){
                //console.log(event.touches[0]);
                console.log(event);
                var touche = event.touches[0];
                startX = touche.clientX;

            })
            contentBox.addEventListener("touchend",function(event){
                //console.log(event.changedTouches[0]);
                var touche = event.changedTouches[0];
                disX = touche.clientX - startX;
                var leftNum = parseInt(ul.style.left);
                if(disX > 0 && disX > 100){
                    //console.log(leftNum)
                        if(leftNum <= -100){
                            ul.style.left = leftNum + 100 + "%";
                            var left = (~ parseInt(ul.style.left) + 1) / 100;
                            //console.log(left)
                            // menuController(left);
                        }
                }else if(disX < 0 && disX < -100){
                    //console.log(leftNum);
                        if(leftNum >= -100){
                            ul.style.left = leftNum - 100 + "%";
                            var left = (~ parseInt(ul.style.left) + 1) / 100;
                            //console.log(left);
                            // menuController(left);
                        }
                }
            })
            contentBox.addEventListener("touchmove",function(event){
                event.stopPropagation()
            });

            function menuController(order){
                for(var i = 0; i < liList.length; i++){
                    liList[i].classList.remove("liactive");
                }
                liList[order].classList.add("liactive");
            }
        }()
    }


}())
