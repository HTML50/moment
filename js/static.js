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
	if(location.hash == '#post/1'){
		document.title='我为什么写这个 | 此刻'
		header.style.opacity = 0;	
		header.style.backgroundImage = 'url(1.jpg)'
		bodyId.classList.add('outTransition')
		backgroundWord.style.display = 'block';
		backgroundWord.style.opacity = 1;	
		setTimeout(function(){
		getSource('blog.html');
		},1000)

		//var content = getArticle(1);
		//go(content)




		
	}
	else if(location.hash == '#post/2'){
		header.style.opacity = 0;
		header.style.backgroundImage = 'url(2.jpg)'
		bodyId.classList.add('outTransition')
		backgroundWord.style.display = 'block';
		backgroundWord.style.opacity = 1;	
		setTimeout(function(){
		getSource('blog2.html');
		},1000)

		//var content = getArticle(1);
		//go(content)
	}
	else{
		
		var content ="<ul>\
	<li class='item'><img src='1.jpg' class='image'><a href='#post/1'><h1 class='title'>我为什么写这个</h1></a></li>\
<li class='item'><img src='2.jpg' class='image'><a href='#post/2'><h1 class='title'>人间美味牛肉汤</h1></a></li>\
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
				comment();
				},300)
				bodyId.innerHTML =xmlhttp.responseText; 	
			},500)
		} 
		}
		xmlhttp.open("GET", f, true); 
		xmlhttp.send(); 
	}
	
	function getArticle(n){
	var str = multiToStr(function(){/*
		我与父亲不相见已二年余了，我最不能忘记的是他的背影。那年冬天，祖母死了，父亲的差使也交卸了，正是祸不单行的日子，我从北京到徐州，打算跟着父亲奔丧回家。到徐州见着父亲，看见满院狼藉的东西，又想起祖母，不禁簌簌地流下眼泪。父亲说，“事已如此，不必难过，好在天无绝人之路！”
	回家变卖典质，父亲还了亏空；又借钱办了丧事。这些日子，家中光景很是惨淡，一半为了丧事，一半为了父亲赋闲。丧事完毕，父亲要到南京谋事，我也要回北京念书，我们便同行。
	到南京时，有朋友约去游逛，勾留了一日；第二日上午便须渡江到浦口，下午上车北去。父亲因为事忙，本已说定不送我，叫旅馆里一个熟识的茶房陪我同去。他再三嘱咐茶房，甚是仔细。但他终于不放心，怕茶房不妥帖；颇踌躇了一会。其实我那年已二十岁，北京已来往过两三次，是没有甚么要紧的了。他踌躇了一会，终于决定还是自己送我去。我两三回劝他不必去；他只说，“不要紧，他们去不好！”
	我们过了江，进了车站。我买票，他忙着照看行李。行李太多了，得向脚夫行些小费，才可过去。他便又忙着和他们讲价钱。我那时真是聪明过分，总觉他说话不大漂亮，非自己插嘴不可。但他终于讲定了价钱；就送我上车。他给我拣定了靠车门的一张椅子；我将他给我做的紫毛大衣铺好坐位。他嘱我路上小心，夜里警醒些，不要受凉。又嘱托茶房好好照应我。我心里暗笑他的迂；他们只认得钱，托他们直是白托！而且我这样大年纪的人，难道还不能料理自己么？唉，我现在想想，那时真是太聪明了！
	我说道，“爸爸，你走吧。”他望车外看了看，说，“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。父亲是一个胖子，走过去自然要费事些。我本来要去的，他不肯，只好让他去。我看见他戴着黑布小帽，穿着黑布大马褂，深青布棉袍，蹒跚地走到铁道边，慢慢探身下去，尚不大难。可是他穿过铁道，要爬上那边月台，就不容易了。他用两手攀着上面，两脚再向上缩；他肥胖的身子向左微倾，显出努力的样子。这时我看见他的背影，我的泪很快地流下来了。我赶紧拭干了泪，怕他看见，也怕别人看见。我再向外看时，他已抱了朱红的橘子望回走了。过铁道时，他先将橘子散放在地上，自己慢慢爬下，再抱起橘子走。到这边时，我赶紧去搀他。他和我走到车上，将橘子一股脑儿放在我的皮大衣上。于是扑扑衣上的泥土，心里很轻松似的，过一会说，“我走了；到那边来信！”我望着他走出去。他走了几步，回过头看见我，说，“进去吧，里边没人。”等他的背影混入来来往往的人里，再找不着了，我便进来坐下，我的眼泪又来了。
	近几年来，父亲和我都是东奔西走，家中光景是一日不如一日。他少年出外谋生，独力支持，做了许多大事。那知老境却如此颓唐！他触目伤怀，自然情不能自已。情郁于中，自然要发之于外；家庭琐屑便往往触他之怒。他待我渐渐不同往日。但最近两年的不见，他终于忘却我的不好，只是惦记着我，惦记着我的儿子。我北来后，他写了一信给我，信中说道，“我身体平安，惟膀子疼痛利害，举箸提笔，诸多不便，大约大去之期不远矣。”我读到此处，在晶莹的泪光中，又看见那肥胖的，青布棉袍，黑布马褂的背影。唉！我不知何时再能与他相见！
	
	1925年10月在北京。
	 */});
	 console.log(str)
	return str;
	}
	
	function go(content){
		bodyId.innerHTML =content;
	}
	
		function comment(){
		duoshuoQuery = {short_name:"3bt"};
		var ds = document.createElement('script');
		ds.type = 'text/javascript';ds.async = true;
		ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
		ds.charset = 'UTF-8';
		(document.getElementsByTagName('head')[0] 
		 || document.getElementsByTagName('body')[0]).appendChild(ds);
	};
	

	function multiToStr(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
	}

	
})();

	function toggleDuoshuoComments(container){
    var el = document.createElement('div');//该div不需要设置class="ds-thread"
    el.setAttribute('data-thread-key', '文章的本地ID');//必选参数
    el.setAttribute('data-url', '你网页的网址');//必选参数
    el.setAttribute('data-author-key', '作者的本地用户ID');//可选参数
    DUOSHUO.EmbedThread(el);
	document.getElementById(container).appendChild(el);
}
	