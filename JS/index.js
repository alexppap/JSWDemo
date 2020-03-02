window.onload= function () {
  imgLocation("container","box")
  var imgData = {"data": [{"src": "01.jpg"},{"src": "02.jpg"},{"src": "03.jpg"},{"src": "04.jpg"},{"src": "05.jpg"},{"src": "06.jpg"},{"src": "07.jpg"},{"src": "08.jpg"},{"src": "09.jpg"}]}
  window.onscroll = function () {
    if (checkFlag()) {
      var cparent = document.getElementById("container");
      for (var i=0;i<imgData.data.length;i++) {
        var ccontent = document.createElement("div");
        ccontent.className = "box";
        cparent.appendChild(ccontent);
        var boximg = document.createElement("div");
        boximg.className = "box-img";
        ccontent.appendChild(boximg);
        var img = document.createElement("img");
        img.src="img/" + imgData.data[i].src;
        boximg.appendChild(img);
      }
      imgLocation("container","box")
      
    }
  }
}

function checkFlag() {
  var ctn = document.getElementById("container");
  var ibox = getChildElement(ctn,"box");
  var lastContentHeight = ibox[ibox.length-1].offsetTop;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
  if (lastContentHeight < scrollTop+ pageHeight) {
    return true;
  }
}


function imgLocation (parent,content) {
  var cparent = document.getElementById(parent);
  var ccontent = getChildElement(cparent,content);
  var imgWidth = ccontent[0].offsetWidth;
  var num = Math.floor(document.documentElement.clientWidth /imgWidth);
  cparent.style.cssText = "width:" + imgWidth*num + "px";

  var boxHeightArr = [];
  for (var i = 0;i<ccontent.length;i++) {
    if (i<num) {
      boxHeightArr[i] = ccontent[i].offsetHeight;
    }else {
      var minHeight = Math.min.apply(null,boxHeightArr);
      var minIndex = getMinheightLocation(boxHeightArr,minHeight)
      ccontent[i].style.position="absolute";
      ccontent[i].style.top=minHeight + "px";
      ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
      boxHeightArr[minIndex] = boxHeightArr[minIndex]+ccontent[i].offsetHeight;
    }
  }
}
function getMinheightLocation (boxHeightArr,minHeight) {
  for (var i in boxHeightArr) {
    if (boxHeightArr[i] == minHeight) {
      return i;
    }
  }
}

function getChildElement (parent,content) {
  var res = [];
  var allcontent = parent.getElementsByTagName("*");
  for (var i=0;i<allcontent.length;i++) {
    if(allcontent[i].className== content) {
      res.push(allcontent[i]);
    }
  }
  return res;
}