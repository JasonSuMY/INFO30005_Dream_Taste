window.onload = function(){
  var sufuStar = function (){
    function gbyId(id){return document.getElementById(id);}
 
    function addEvent(elem,type,func){
      if(elem.addEventListener){
        elem.addEventListener(type,func,false)
      }else if(elem.attachEvent){
        elem.attachEvent('on'+type,func)
      }
    }
    function getIndex(event) { 
      var e = event || window.event;
      var t = e.target || e.srcElement;
      if (t.tagName.toLowerCase() === 'a') {
        return parseInt(t.innerHTML);
      }
    }
    function showInfo(index,msg){
      var info = gbyId('star-info');
      info.style.display = 'block';
      info.style.left = index*21-51+'px';
    }
        
    function appenStar(elem,nums){
      var frag = document.createDocumentFragment();
      for(var i = 0;i<nums;i++){
        var a =document.createElement('a');
        a.innerHTML = i+1;
        a.href = "javascript:;";
        frag.appendChild(a);
      }
      elem.appendChild(frag);
    }
        
        //主体函数
    function star(num){
      var n = num||5;
      var clickStar=curentStar=0;

      var starContainer = gbyId('star-div');
      appenStar(starContainer,n);
      addEvent(starContainer,'mouseover',over);
      addEvent(starContainer,'mouseout',out);
      addEvent(starContainer,'click',click);
      
      function over(event){
        if(getIndex(event)){
          var index = getIndex(event);
          change(index);
          showInfo(index,msg);
        }
      }
          
      function out(event){
        change();
        gbyId('star-info').style.display = 'none'
      }
          
      function click(event) {
        if (getIndex(event)) {
          var index = getIndex(event);
          clickStar = index; 
          gbyId('star-info').style.display = 'none';
        }
      }
          
      function change(index){
        curentStar = index||clickStar;
        for(var i=0;i<n;i++){
          starContainer.children[i].className = i<curentStar ? 'active' : ''
        }
      }
    }
    return {
      star:star
    }
  }(); 
 
  sufuStar.star();
}