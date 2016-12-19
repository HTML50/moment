var httpRequest,id,flag=0,previousHeight;
//flag:
//0: first time on site
//1: open blog page
//2: normal visit


makeRequest('list.html')
//open index.html and load list.html, with flag=0, means no auto scroll roll

FSS("header", "dynamic-background");
//generate the header animation

function makeRequest(url,num) {
httpRequest = new XMLHttpRequest();
if (!httpRequest) {
  console.debug('Giving up :( Cannot create an XMLHTTP instance');
  return false;
}

//blog flag
if(num == 1){flag=1;}
document.getElementById('list').style.height = '10000px';
document.getElementById('spinner').style.display='block';
document.getElementById('list').classList.add ('animation','fadeOutDown');
httpRequest.onreadystatechange = alertContents;

//for transition animation
setTimeout(function(){
	httpRequest.open('GET', url);
	httpRequest.send();
	//pushState will change the broswer's file path. 
	//if do this before ajax get. You will get wrong
	//eg. request: blog/index.html
	//you get: blog/blog/index.html
	if(url != location.pathname){
	history.pushState(null, null, url);
	}
},250)
}

function alertContents() {
if (httpRequest.readyState === XMLHttpRequest.DONE) {
  if (httpRequest.status === 200) {
	var ajaxSource = httpRequest.responseText;
	
		if(flag==1){
			ajaxSource = ajaxSource.replace(/<!doctype html>[\s\S|\.]*<body>/, '');
			flag=null;
		}
	document.getElementById('list').innerHTML = ajaxSource;
	document.getElementById('list').classList.remove ('fadeOutDown');
	document.getElementById('list').classList.add ('fadeInUp');
	document.getElementById('spinner').style.display='none';
			setTimeout(function(){
			document.getElementById('list').style.height = '';
		},1000)
	if(flag == 0){flag=null;}
	else{
		smoothMove(520);
		}
  } else {
	console.debug('There was a problem with the request.');
  }
}
}


window.onpopstate = function(event) {
	if(location.pathname == '/'){
		makeRequest('list.html');	
	}
	else{
		makeRequest(location.pathname);	
	}
};

document.addEventListener("mousewheel", MouseWheelHandler, false);
// Firefox
document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
function MouseWheelHandler(e) {
	clearInterval(id)
	return false;
}

document.addEventListener("scroll", function(){
	if(window.pageYOffset > 600){
		if(document.getElementById('nav').style.opacity==0) document.getElementById('nav').style.opacity=1;
	}
	else{
		if(document.getElementById('nav').style.opacity==1) document.getElementById('nav').style.opacity=0;
	}
});

window.addEventListener("keydown", function(e){
	if(e.keyCode == 0x74){
		e.preventDefault();
		makeRequest(location.href);
	}
});



function smoothMove(y){
	var	height = window.pageYOffset;
	if(height < y){
	id = setInterval(function(){
		window.scrollTo(0, height);
		if(height<y-110){
		height+=80;
		}
		else if(height<y-20){
			height+=3;
		}
		else if(height<y){
			height+=1;
		}
		else{
		clearInterval(id)
		}
	},16)
	}
	else {
		id = setInterval(function(){
		window.scrollTo(0, height);
		if(height > y+1000){
		height-=500;
		}
		if(height > y+110){
		height-=80;
		}
		else if(height>y+20){
			height-=3;
		}
		else if(height>y){
			height-=1;
		}
		else{
		clearInterval(id)
		}
	},16)
	}
}


if ('scrollRestoration' in history) {
  // Back off, browser, I got this...
  history.scrollRestoration = 'manual';
}