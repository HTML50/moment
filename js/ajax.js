//全局变量，记录文章内容，页码的数组
var pageArr=[],
    articleArr=[],
    nowPage,
    nowPosition,
    mod='index',
    imgsLoadComplete=false;

  //获取内容
	function getPage(n){
    nowPage=n;
    if(pageArr[n]===undefined){
      ajax(n);
    }
    else{
      showPageList(n);
    }
	}
  
	//组织文章列表的innerHTML
  function showPageList(n){
    
    var html='',i=0;
    
    for(;i<pageArr[n].length;i++){
      html+="<li id='post"+pageArr[n][i]+"'><a href='#post/"+pageArr[n][i]+"'><h1>"+articleArr[pageArr[n][i]].title+"</h1></a><img src='"+articleArr[pageArr[n][i]].img+"'></li>"
    }

    //区分加载更多文章与返回主页
    if(n!=1){
      list.firstChild.innerHTML += html;
    }else{
      list.innerHTML = "<ul>"+html+"</ul>";
    }
    
    if(typeof(loading)!== 'undefined'){
      document.getElementById('post'+pageArr[n][0]).lastChild.onload = function(){
        imgsLoadComplete=true;
      }
    }
  }
  
  //将第一次读取的远程数据存入数组
  function dataToArr(data,pageNum){
    var id,img,music,title,time,content,pageArrTemp=[];  

     console.log(pageNum,data)
    for(i=0;i<data.length;i++){
      
			title=data[i].title;
			time=data[i].created_at;
      id=i;
      content = data[i].body
      img = content.match(/\((.*)\)/)[1];

      var musicReg = content.match(/<!--(.*)-->/)
      if(musicReg) music = content.match(/<!--(.*)-->/)[1];
      else music = _config.backgroundMusic

      var pos = content.indexOf('#');
      content = content.slice(pos);

      articleArr[id] = {
      "title":title,
      "time":time,
      "img":img,
      "music":music,
      "content":content
      }
      
      pageArrTemp.push(id)
		}
    
    pageArr[pageNum]=pageArrTemp;    
    showPageList(pageNum);
	}
	
	
	function ajax(pageNum){
		var xhr = new XMLHttpRequest();
	 
		xhr.open('get', 'https://api.github.com/repos/'+_config.githubId+'/'+_config.repo+'/issues?page='+pageNum+'&per_page='+_config.perPage, true);
		xhr.setRequestHeader("Content-type","text/plain");
		xhr.onreadystatechange = function(){
		
		if (xhr.readyState == 4) {
      if(xhr.status == 200)	{
        if(nowPage==1) loaded();
        return dataToArr(JSON.parse(xhr.responseText),pageNum);
      }
      else{
        alert('oops,404');
        history.go(0);
      }
		}
		};
    
		xhr.send();
	}
  
  function loaded(){
    more.classList.remove('hidden');
    footer.classList.remove('hidden');
  }