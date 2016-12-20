(function(){
	getPage(1);
	
	
	
	
	
	function getPage(n){
		var rs=ajax('get','https://api.github.com/repositories/1207821/issues?filter=created&page='+n+'&per_page=5'),
		title,time,content;
		
		console.log(rs)
		
		for(i=0;i<rs.length;i++){
			title=rs[i].title;
			time=rs[i].created_at;
			content=rs[i].body;
		}
		
		document.write(title)
	}
	
	
	
	
	
	function ajax(method,url,postData){
		var xhr = new XMLHttpRequest();
	 
		xhr.open(method, url, true);
		xhr.setRequestHeader("Content-type","text/plain");
		xhr.onreadystatechange = function(){
		var rs = xhr.responseText;
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				return rs;
			}
		}
		else{
		console.log(rs);
		}
		};
		if(method=='get') postData=null;
		xhr.send(postData);
	}
})();