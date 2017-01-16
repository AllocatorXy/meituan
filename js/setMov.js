function setMov(obj, json, fnEnd) 
{
	clearInterval(obj.timer);

	obj.timer = setInterval(function () 
	{
		var flag = true; 

		for(var attr in json)
		{
			var realAttr = 0;
			if (attr == 'opacity') // 透明度需要特别处理
			{
				realAttr = Math.round(parseFloat(getStyle(obj,attr))*100);
			}
			else
			{
				realAttr = parseInt(getStyle(obj,attr));
			}

			var speed = (json[attr]-realAttr)/5;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);

			if (realAttr!=json[attr]) //当还有值没有到达目标点时
			{
				flag = false;
			}
			
			if (attr == 'opacity') 
			{
				obj.style.filter = 'alpha(opacity:'+(realAttr+speed)+')'; //ie
				obj.style.opacity = (realAttr+speed)/100; //webkit etc
			}
			else
			{
				obj.style[attr] = realAttr+speed+'px';
			}
		}
		if (flag) //所有值都到达目标点后
		{
			clearInterval(obj.timer);
			if (fnEnd) 
			{
				fnEnd();
			}
		}
	}, 15);
}
function getStyle(obj,name) 
{
	
	if (obj.currentStyle) 
	{
		//IE低版本
		return obj.currentStyle[name];
	}
	else 
	{
		//FF等浏览器
		return getComputedStyle(obj,null)[name]; 
		//getComputedStyle函数中，第二个参数无用，任意设置
	}
}


window.onload = function () 
{
	
	var oDiv = document.getElementsByClassName('a-topBar')[0].getElementsByTagName('div');

	for (var i = 0; i < oDiv.length; i++) 
	{
		oDiv[i].parentNode.style.position = 'relative';
		oDiv[i].ht = parseInt(getStyle(oDiv[i],'height'));
		oDiv[i].style.top = -oDiv[i].ht-1 + 'px';

		oDiv[i].parentNode.onmouseover = function () 
		{
			this.style.height = '21px';
			this.style.marginTop = '0';
			this.style.paddingTop = '9px';
			this.style.backgroundColor = '#fff';
			setMov(this.firstElementChild,{top:30});
		}
		oDiv[i].parentNode.onmouseout = function () 
		{
			this.style.height = '12px';
			this.style.marginTop = '9px';
			this.style.paddingTop = '0';
			this.style.backgroundColor = '#f5f5f5';
			setMov(this.firstElementChild,{top:-this.firstElementChild.ht-1});
		}

	}

}