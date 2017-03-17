//全局变量，记录文章内容，页码的数组
var pageArr=[],
    articleArr=[],
    nowPage,
    nowPosition;

  //获取内容
	function getPage(n){
    nowPage=n;
    if(pageArr[n]===undefined){
      ajax('get','https://api.github.com/repos/'+_config.githubId+'/'+_config.repo+'/issues?page='+n+'&per_page='+_config.perPage,n);
    }
    else{
      showPageList(n);
    }
	}
  
	//组织文章列表的innerHTML
  function showPageList(n){
    
    var html='';
    for(i=0;i<pageArr[n].length;i++){
      html+="<li class='item'><img src='"+articleArr[pageArr[n][i]].img+"' class='image'><a href='#post/"+pageArr[n][i]+"'><h1 class='title'>"+articleArr[pageArr[n][i]].title+"</h1></a></li>"
    }
      //区分加载更多文章与返回主页
      if(location.hash.indexOf('#index') != -1){
        list.innerHTML = "<ul>"+html+"</ul>";
      }else{
        list.innerHTML += "<ul>"+html+"</ul>";
      }
  }
  
  //将第一次读取的远程数据存入数组
  function dataToArr(data,pageNum){
    var id,img,title,time,content,pageArrTemp=[];  

    for(i=0;i<data.length;i++){
      
			title=data[i].title;
			time=data[i].created_at;
      id=data[i].number;
      content = data[i].body
      img = content.match(/\((.*)\)/)[1];

      var pos = content.indexOf('#');
      content = content.slice(pos);

      
      articleArr[id] = {
      "title" : title,
      "time":time,
      "img":img,
      "content":content
      }
      
      pageArrTemp.push(id)
		}
    
    pageArr[pageNum]=pageArrTemp;    
    showPageList(pageNum);
	}
	
	
	function ajax(method,url,pageNum,postData){
		var xhr = new XMLHttpRequest();
	 
		xhr.open(method, url, true);
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
    
		if(method=='get') postData=null;
    //get方法的参数在url中包含，postData是post方法的参数
    
		xhr.send(postData);
	}
  
  function loaded(){
    more.classList.remove('hidden');
    footer.classList.remove('hidden');
  }