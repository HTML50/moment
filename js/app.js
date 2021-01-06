(function(){	
	var isMute=false,isOnVolume=false,
	bodyId=document.getElementById('list'),
	header=document.getElementById('header'),
	backgroundWord=document.getElementById('background'),
	audio = document.getElementById("myMusic"),
  applicationName = document.getElementById("appName");
  init();

  
  //初始化
  function init(){
    function fadeAway(){
      loading.style.opacity = 0;
      setTimeout(function(){
        loading.parentNode.removeChild(loading);
      },1000);
    }


    if(!localStorage.firstTime){
      localStorage.firstTime="false";

      //初次访问，没有缓存时，设置读取spinner
      setTimeout(function(){
        document.querySelector('.spinner').style.display = 'block';
      },3000)

      //检查大图加载完成情况
      setTimeout(function(){  
        var checkProcess = setInterval(function(){
          if(imgsLoadComplete){
            clearInterval(checkProcess);
            fadeAway();
          }
        },1000);
      },5000)
    }else{
      setTimeout(fadeAway,3000);
    }

  //默认读取第一页内容
  getPage(1);
   //背景音乐
   audio.src = _config.backgroundMusic;

   audio.addEventListener("canplaythrough", function(){

    document.addEventListener('click',function(){
      audio.play();
      document.removeEventListener('click',arguments.callee);
    });

    document.addEventListener('DOMMouseScroll',function(){
      audio.play();
      document.removeEventListener('DOMMouseScroll',arguments.callee);
    });

    document.addEventListener('mousewheel',function(){
      audio.play();
      document.removeEventListener('mousewheel',arguments.callee);
    });

    document.addEventListener('touchstart',function(){
      audio.play();
      document.removeEventListener('touchstart',arguments.callee);
    });
  });


   document.getElementById('music').onclick=mute;
   applicationName.innerText = _config.appName;
   loading.firstChild.firstChild.innerText = _config.appName;
   document.title='首页 | '+_config.appName;
   more.addEventListener('click',showMore)

  //页面地址变化监听
  window.onpopstate = function(event) {

    if( location.hash.indexOf('#post/') != -1){
      var id= parseInt(location.hash.slice(6));
      openArticle(id);
      switchMusic(id);
      if(mod!='page') recordScroll();
      mod='page'
    }else{
      mod='index'
      document.title='首页 | '+_config.appName;
      bodyId.classList.add('outTransition')
      backgroundWord.style.display = 'block';
      setTimeout(function(){
        backgroundWord.style.opacity = 1;
      },100)
      header.style.opacity = 0;
      footer.style.opacity = 0;
      more.style.opacity = 0;
      setTimeout(function(){
        header.style.display = 'block';
        backgroundWord.style.opacity = 0;
        setTimeout(function(){
          header.style.display = 'none';
          backgroundWord.style.display = 'none';
          getPage(1)
          bodyId.classList.remove('outTransition')
          footer.style.opacity = 1;
          more.classList.remove('hidden');
          more.style.opacity = null;
          restoreScroll()
        },500)
      },1000)
      switchMusic(-1);
    }
  };
}

	//打开文章，页面切换的CSS属性增删
	function openArticle(id){
    document.title=articleArr[id].title+' | '+_config.appName;
    header.style.opacity = 0;	
    footer.style.opacity = 0;
    bodyId.classList.add('outTransition')
    backgroundWord.style.display = 'block';
    setTimeout(function(){
      backgroundWord.style.opacity = 1;
    },100)
    more.style.opacity = 0;
    setTimeout(function(){
      more.classList.add('hidden');
      header.style.backgroundImage = 'url('+articleArr[id].img+')'
      header.style.display = 'block';
      backgroundWord.style.opacity = 0;
      setTimeout(function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        bodyId.classList.remove('outTransition')

        setTimeout(function(){
          header.style.opacity = 1;
          footer.style.opacity = 1;
          backgroundWord.style.opacity = 0;
        },300)
        setTimeout(function(){
          backgroundWord.style.display = 'none';
        },1000)
        bodyId.innerHTML =generateBlogHTML(id); 	
      },500)
    },1000)
    
  }
  
  //负责将数组内的文章markdown转义，生成innerHTML所需的整块内容
  function generateBlogHTML(id){
    var nextTitle,nextURL,preTitle,preURL,
    title=articleArr[id].title,
    content=marked(articleArr[id].content);
    
    if(articleArr[id+1]===undefined){
      nextURL='javascript:void(0)';
      nextTitle='&ensp;没有文章了';
    }else{
      nextURL='#post/'+(id+1);
      nextTitle='《'+articleArr[id+1].title+'》';
    }
    
    if(articleArr[id-1]===undefined){
      preURL='javascript:void(0)';
      preTitle='没有文章了&ensp;';
    }else{
      preURL='#post/'+(id-1);
      preTitle='《'+articleArr[id-1].title+'》';
    }
    
    var html="<article id='article'>\
    <section id='article-content'>\
    "+content+"\
    </section>\
    </article>\
    <section class='pre-next-article'>\
    <div class='left-bar'><a href='"+preURL+"' class='no-underline link opacity'><< "+preTitle+"</a></div>\
    <div class='right-bar'><a href='"+nextURL+"' class='no-underline link opacity'>"+nextTitle+" >></a></div>\
    <div class='clear'></div>\
    </section>"
    return html;
  }
  
  //静音
  function mute(){
    if(isMute && !isOnVolume){
     this.style.backgroundImage = 'url(img/music.svg)'
     //audio.play();
     volume(1);
     isMute = false;
   }else if(!isMute && !isOnVolume){
     this.style.backgroundImage = 'url(img/mute.svg)'
     volume(0);
     isMute = true;
   }
 }

  //音量渐变
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
       if(n==1) {
         audio.play();
       }
       isOnVolume=false;
     }
   },100)
  }

  function switchMusic(id){
    volume(0)
    setTimeout(function(){
      if(id==-1) audio.src = _config.backgroundMusic
       else audio.src = articleArr[id].music
      if(!isMute) volume(1);
    },1000)
    
  }

  function recordScroll(){
    nowPosition = document.documentElement.scrollTop
  }  

  function restoreScroll(){
    document.documentElement.scrollTop = nowPosition
  }

  function showMore(){
    var _this = this;
    _this.classList.add('fade')
    _this.firstChild.innerHTML = '加载中'
    setTimeout(function(){
      _this.classList.remove('fade')
        if(getMore()){
        setTimeout(function(){
            
            _this.firstChild.innerHTML = '更多文章'
        },1000)      
      }else{
        _this.firstChild.innerHTML = '没有文章了'
      }
    },1000)
  }

})();

