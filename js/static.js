(function(){	
	var isMute=false,isOnVolume=false,
	bodyId=document.getElementById('list'),
	header=document.getElementById('header'),
	backgroundWord=document.getElementById('background'),
	audio = document.getElementById("myMusic");
	init();
	
	
	
	
	function init(){
		
	audio.src = 'http://p2.music.126.net/OENgE7Bvrn9Xh6fkeTY1cQ==/1363394418456225.mp3'
	audio.addEventListener("canplaythrough", function(){ audio.play()});

		
	document.getElementById('music').onclick=mute;
	
	window.onpopstate = function(event) {
		
		isOpen=0;
		
	if(location.hash == '#post/1'){
		document.title='我为什么写这个 | 此刻'
		header.style.opacity = 0;	
		bodyId.classList.add('outTransition')
		backgroundWord.style.display = 'block';
		backgroundWord.style.opacity = 1;	
		setTimeout(function(){
		header.style.backgroundImage = 'url(1.jpg)'
		getSource('blog.html');
		},1000)

		//var content = getArticle(1);
		//go(content)




		
	}
	else if(location.hash == '#post/2'){
		header.style.opacity = 0;
		bodyId.classList.add('outTransition')
		backgroundWord.style.display = 'block';
		backgroundWord.style.opacity = 1;	
		setTimeout(function(){
		header.style.backgroundImage = 'url(2.jpg)'
		getSource('blog2.html');
		},1000)

		//var content = getArticle(1);
		//go(content)
	}
	else{
		
		var content ="<ul>\
	<li class='item'><img src='1.jpg' class='image'><a href='#post/1'><h1 class='title'>我为什么写这个</h1></a></li>\
<li class='item'><img src='2.jpg' class='image'><a href='#post/2'><h1 class='title'>好喝不过牛肉汤</h1></a></li>\
		</ul>\
		<section class='center more opacity''>更多文章</section>"
		
		bodyId.classList.add('outTransition')
		backgroundWord.style.display = 'block';
		backgroundWord.style.opacity = 1;
		header.style.opacity = 0;
		setTimeout(function(){	
		header.style.display = 'block';
		backgroundWord.style.opacity = 0;	
		setTimeout(function(){
			header.style.display = 'none';
			go(content)
			bodyId.classList.remove('outTransition')
		},500)
		},1000)
		
	}
	};
	
	
	}
	
	function mute(){
		if(isMute && !isOnVolume){
			this.style.backgroundImage = 'url(music.svg)'
			audio.play();
			volume(1);
			isMute = false;
		}else if(!isMute && !isOnVolume){
			this.style.backgroundImage = 'url(mute.svg)'
			volume(0);
			isMute = true;
		}
		
	}
	
	function volume(n){
		isOnVolume=true
		var number=n>audio.volume?0.1:-0.1,
		musicIntervalId = setInterval(function(){
			if(audio.volume!=n){
			audio.volume=(audio.volume+number).toFixed(1);
			}else{
			clearInterval(musicIntervalId);
			if(n==0) {
			audio.pause();
			}
			isOnVolume=false;
			}
		},100)
	}
	
	function getSource(f){
		var xmlhttp= new XMLHttpRequest(); 
		xmlhttp.onreadystatechange = function() { 
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			header.style.display = 'block';
			backgroundWord.style.opacity = 0;
			setTimeout(function(){
				document.body.scrollTop = 0
				bodyId.classList.remove('outTransition')
				backgroundWord.style.display = 'hidden';
				setTimeout(function(){
				header.style.opacity = 1;
				backgroundWord.style.opacity = 0;
				},300)
				bodyId.innerHTML =xmlhttp.responseText; 	
			},500)
		} 
		}
		xmlhttp.open("GET", f, true); 
		xmlhttp.send(); 
	}
		
	function go(content){
		bodyId.innerHTML =content;
	}
	

})();