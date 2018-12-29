console.log("(=ﾟωﾟ)ﾉ");
console.log("话说Edge对H5的支持不怎么样哇~");
/*处理粘贴时的富文本污染*/
document.onpaste = function(event){
	event.preventDefault();
	var text = (event.originalEvent || event).clipboardData.getData('text/plain') || prompt('在这里输入文本');
	text = text.replace(/[\r\n]/g, "");
	document.execCommand("insertText", false, text);
};

/*关闭浏览器右键默认事件*/
window.oncontextmenu = function(){
	event.returnValue = false;
};
 /*关闭浏览器默认回车事件*/
window.onkeydown = function (event) {
var e = event || window.event;
	if (e && e.keyCode == 13) { //回车键的键值为13
		event.preventDefault();
	}
}; 
/*--------------------------------------------------------------拖动排序组件----------------------------------------------------*/
var dragged = null;

/* 当用户开始拖动一个元素或者一个选择文本的时候 dragstart 事件就会触发 */
document.addEventListener("dragstart", function( event ) {
	dragged = event.target;																					// 保存拖动元素的引用(ref.)

	event.target.style.opacity = .5;																		// 使其半透明
}, false);
/* 拖放事件在拖放操作结束时触发(通过释放鼠标按钮或单击escape键)。 */
document.addEventListener("dragend", function( event ) {
	event.target.style.opacity = "";																		// 重置透明度
}, false);

/* 放下目标节点时触发事件 */
/* 当元素或者选择的文本被拖拽到一个有效的放置目标上时，触发 dragover 事件(每几百毫秒触发一次) */
document.addEventListener("dragover", function( event ) {
	if (event.target.getAttribute("draggable") == "true") {													// 注意:这里需要判断是否是同类元素,防止被插入到奇怪的地方
		event.preventDefault(); 																			// 默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。
	}
	event.dataTransfer.dropEffect = 'move';
}, false);
/* 当拖动的元素或被选择的文本进入有效的放置目标时， dragenter 事件被触发。 */
document.addEventListener("dragenter", function( event ) {
	if (event.target.getAttribute("draggable") == "true") {
		event.target.style.backgroundColor = "#f5f5f5";														// 当可拖动的元素进入可放置的目标高亮目标节点
	}

}, false);
/* 当一个被拖动的元素或者被选择的文本离开一个有效的拖放目标时，将会触发 事件。 */
document.addEventListener("dragleave", function( event ) {
	if (event.target.getAttribute("draggable") == "true") {
		event.target.style.background = "";																	// 当拖动元素离开可放置目标节点，重置其背景
	}

}, false);
/* 当一个元素或是选中的文字被拖拽释放到一个有效的位置释放目标时，drop 事件被抛出 */
document.addEventListener("drop", function( event ) {
		event.stopPropagation(); 																			// 阻止默认事件

	//if ( event.target.className == "dropzone" ) {
	if ( event.target != dragged ) {																		// 移动拖动的元素到所选择的放置目标节点
		dragged.parentNode.removeChild( dragged );															// 删除拖动的节点
		event.target.parentNode.insertBefore( dragged ,event.target);										// 向目标元素前面插入拖动的节点
	}
	event.target.style.background = "";																		// 重置背景
}, false);




/*--------------------------------------------------------------右键菜单事件组件----------------------------------------------------*/


/*生成菜单*/
window.onload = function(){
	//change_Background();																// 创建切换背景的菜单
	add_Menu_Card();																	// 创建卡片编辑菜单
	
	add_Menu_literals();																// 创建文本编辑菜单
	add_Menu_title2();																	// 创建标题编辑菜单
	add_Menu_Central_content();															// 创建中心内容编辑菜单
	add_Menu_image();																	// 创建图片编辑菜单
	add_Clod_media();																	// 创建代码编辑菜单
	add_Menu_media();																	// 创建媒体编辑菜单
	
}


/*事件绑定方法__参数说明:第一个为被绑定对象,后面追加需要绑定的方法*/
function right_Menu_Event(object){

	object.addEventListener("contextmenu", function() {									// 为指定的标签绑定事件
		// 回调方法并传递参数
		open_Menu(event,this);															// 绑定右键菜单事件
		//var x = document.activeElement.tagName;
		//document.getElementById("demo").innerHTML = arguments.length;
		for(let i = 1; i < arguments.length; i++){										// 处理不定数量的参数
			eval(arguments[i]);															// 执行传入的方法
		}
		event.stopPropagation();														// 阻止事件冒泡
	});
	
}

/*阻止右键菜单的左键事件冒泡/
document.getElementById("dropdown").addEventListener("click", function() {				// 为指定的标签绑定事件
	event.stopPropagation();															// 阻止事件冒泡
});*/


document.onclick = function(){
	close_Menu(false);
}



/*事件对象传递的中间变量_貌似木有啥好办法*/
var Menu_Event_object = null;


/*开启右键菜单*/
function open_Menu(event,object){
	event.preventDefault();																// 取消默认的浏览器右键事件
	Menu_Event_object = object;															// 将右击对象储存到中间变量中
	
	var menu = object.getAttribute("data-menu-name");									// 根据对象携带的data-menuName参数决定菜单
	menu = document.getElementById(menu);
	
	
	menu.style.left = (event.clientX+10) + 'px';										// 根据事件对象中鼠标点击的位置，定位菜单出现的位置
	menu.style.top = (event.clientY+10) + 'px';
	
	close_Menu(false);																	// 将已打开发右键菜单关闭一遍?
	menu.style.display = "block";
	
	
	//menu = eval(menu+"("+event.clientX+","+event.clientY+")");
	
}

/*关闭右键菜单*/
function close_Menu(kin){																// kin,清空数据
	var children = document.getElementById("dropdown").childNodes;
	for(let i = 0; i < children.length; i++){
		children[i].style.display = "none";
	}
	if(kin == true)
		Menu_Event_object = null;														// 将中间变量清空
}



/*--------------------------------------------------------------元素生成组----------------------------------------------------*/


/*为背景图的切换生成编辑菜单/
function change_Background(){
	right_Menu_Event(document.body);																// 绑定菜单事件:因为背景是body元素,所以在生成菜单时就可以绑定了
	var menu = document.createElement("div");
	menu.id = "change_Background";
	menu.className = "menu";

	menu.innerHTML += "<button class='button' title='上传图片' onclick='trigger_Control();'><img src='image/icon/右键菜单/上传.svg' /></button>";
	
	document.getElementById("dropdown").appendChild(menu);								// 插入生成的菜单
}
*/















/*生成卡片*/
function add_Card(){
	var Card = document.createElement("div");
	Card.className = "Card";
	Card.setAttribute("data-menu-name", "add_Menu_Card");
	Card.innerHTML = "<div class='Content'><div class='Title'><h1 contenteditable='true'>标题 <small>副标签</small></h1></div><!--内容--></div><div class='Toolbars'>"+ add_Tool_Button() +"</div>";
	document.getElementById("Card_set").appendChild(Card);								// 插入卡片
	right_Menu_Event(Card);																// 绑定菜单事件
	
	var elements = Card.getElementsByClassName("Tool_button");							// 获取dom元素内所有按钮
	for(var i = 0;i < elements.length;i++){												// 循环遍历所有按钮
		elements[i].addEventListener("click", function() {								// 为指定的标签绑定事件
			Tool_Button(this);															// 回调方法并传递参数
			//event.stopPropagation();													// 阻止事件冒泡
		});
	}
}
/*生成编辑菜单*/
function add_Menu_Card(){
	
	var menu = document.createElement("div");
	menu.id = "add_Menu_Card";
	menu.className = "menu";															// 固定属性,用于指定样式

	menu.innerHTML += "<button class='button' title='移除' onclick='literals_Delete()'><img src='image/icon/右键菜单/移除.svg' /></button>";
	
	document.getElementById("dropdown").appendChild(menu);								// 插入生成的菜单
}



/*这里将事件对象,查找本级内容区,并以data属性对应的方法名继续传递*/
function Tool_Button(object){
	var animalType = object.getAttribute("data-Method");								// 获取data-Method提供的方法名
	eval(animalType+="(object.parentNode.previousSibling)");							// 拼接成方法名调用
}

/*>>>>>>>在这里注册添加按钮<<<<<<<*/
function add_Tool_Button(){
	var but = "";
	but += "<button class='Tool_button' data-Method='add_literals' title='文本' ><img src='image/icon/添加栏/文本.svg' /></button>";					// 添加文本按钮
	but += "<button class='Tool_button' data-Method='add_title2' title='标题' ><img src='image/icon/添加栏/标题.svg' /></button>";					// 添加文本按钮
	but += "<button class='Tool_button' data-Method='add_Central_content' title='中心内容' ><img src='image/icon/添加栏/中心内容.svg' /></button>";			// 添加文本按钮
	but += "<button class='Tool_button' data-Method='add_image' title='图片' ><img src='image/icon/添加栏/图片.svg' /></button>";					// 添加文本按钮
	but += "<button class='Tool_button' data-Method='add_clod' title='代码' ><img src='image/icon/添加栏/代码.svg' /></button>";
	but += "<button class='Tool_button' data-Method='add_media' title='媒体文件' ><img src='image/icon/添加栏/媒体文件.svg' /></button>";			// 添加文本按钮
	
	return but;
}

/*----------------------------------------------->>>>>>>所有按钮对应方法都集中在这里<<<<<<<----------------------------------------*/

/*>>>>>>生成卡片<<<<<<*/






/*>>>>>>添加文本<<<<<<*/
function add_literals(object){
	var Card = document.createElement("div");
	Card.className = "text";
	Card.setAttribute("draggable", "true");												// 设置可被拖动
	Card.setAttribute("contenteditable", "true");										// 设置可被编辑
	Card.setAttribute("data-menu-name", "add_Menu_literals");
	Card.innerHTML = "在这里输入文本";
	
	object.appendChild(Card);															// 插入文本编辑块
	right_Menu_Event(Card);																// 绑定菜单事件
	
	//注释:如果可以,需要将元素生成器与事件绑定器集成在一起
	
}

/**
*	12_3:使用execCommand提供的缩进方法在Edge浏览器下会出现问题.
*	menu.innerHTML += "<button class='button' title='缩进' data-command='Indent' onclick='changeStyle(this.dataset);'><img src='image/icon/右键菜单/缩进.svg' /></button>";
*	menu.innerHTML += "<button class='button' title='反缩进' data-command='Outdent' onclick='changeStyle(this.dataset)'><img src='image/icon/右键菜单/反缩进.svg' /></button>";
*/




/*生成编辑菜单*/
function add_Menu_literals(){
	
	var menu = document.createElement("div");
	menu.id = "add_Menu_literals";
	menu.className = "menu";
	
	menu.innerHTML += "<button class='button' title='清除样式' onclick='Reset_Styles(this.dataset);'><img src='image/icon/右键菜单/样式.svg' /></button>";
	menu.innerHTML += "<button class='button' data-command='CreateLink' data-value='http://www.baidu.com' title='超链接' onclick='changeStyle(this.dataset)'><img src='image/icon/右键菜单/超链接.svg' /></button>";
	menu.innerHTML += "<button class='button' data-command='Unlink' title='打断超链接' onclick='changeStyle(this.dataset)'><img src='image/icon/右键菜单/打断超链接.svg' /></button>";
	menu.innerHTML += "<button class='button' data-command='Bold' title='粗体' onclick='changeStyle(this.dataset)'><img src='image/icon/右键菜单/粗体.svg' /></button>";
	menu.innerHTML += "<button class='button' data-command='italic' title='斜体' onclick='changeStyle(this.dataset)'><img src='image/icon/右键菜单/斜体.svg' /></button>";
	menu.innerHTML += "<button class='button' data-command='Underline' title='下划线' onclick='changeStyle(this.dataset)'><img src='image/icon/右键菜单/下划线.svg' /></button>";
	menu.innerHTML += "<button class='button' data-command='strikeThrough' title='删除线' onclick='changeStyle(this.dataset)'><img src='image/icon/右键菜单/删除线.svg' /></button>";
	menu.innerHTML += "<button class='button' data-command='foreColor' data-value='red' title='颜色' onclick='changeStyle(this.dataset)'><img src='image/icon/右键菜单/颜色.svg' /></button>";
	menu.innerHTML += "<button class='button' title='表情' onclick='void(0);'><img src='image/icon/右键菜单/表情.svg' /></button>";
	menu.innerHTML += "<button class='button' title='缩进' onclick='literals_Indent();'><img src='image/icon/右键菜单/缩进.svg' /></button>";
	menu.innerHTML += "<button class='button' title='反缩进' onclick='literals_Outdent()'><img src='image/icon/右键菜单/反缩进.svg' /></button>";
	menu.innerHTML += "<button class='button' title='居左' onclick='literals_JustifyLeft()'><img src='image/icon/右键菜单/居左.svg' /></button>";
	menu.innerHTML += "<button class='button' title='居中' onclick='literals_JustifyCenter()'><img src='image/icon/右键菜单/居中.svg' /></button>";
	menu.innerHTML += "<button class='button' title='居右' onclick='literals_JustifyRight()'><img src='image/icon/右键菜单/居右.svg' /></button>";
	menu.innerHTML += "<button class='button' title='移除' onclick='literals_Delete()'><img src='image/icon/右键菜单/移除.svg' /></button>";
	
	document.getElementById("dropdown").appendChild(menu);								// 插入生成的菜单
	
}

/*重置样式*/
function Reset_Styles(object){
	object = document.execCommand('RemoveFormat', 'false', '<p>');						// 重置样式FormatBlock
	object = document.execCommand('Unlink', 'false', null);								// 打断超链接
}
/*字符样式*/
const changeStyle = function(data){
	data.value? document.execCommand(data.command, false, data.value):document.execCommand(data.command, false, null);
}
/*缩进____有 BUG!CSS越界!_____更改缩进方法为:添加空字符*/
function literals_Indent(){
	
	var Indentpx = Menu_Event_object.style.textIndent;
	Indentpx =Indentpx.replace("px","");												// 过滤掉后面的px
	if(Indentpx <= 200)
	Indentpx = Number(Indentpx)+25;														// 原基础上+25
	
	Menu_Event_object.style.textIndent = Indentpx +"px";
	//console.log(Indentpx);
}
/*反缩进*/
function literals_Outdent(){
	
	var Indentpx = Menu_Event_object.style.textIndent;
	Indentpx =Indentpx.replace("px","");												// 过滤掉后面的px
	if(Indentpx != 0)
	Indentpx = Number(Indentpx)-25;														// 原基础上-25
	
	Menu_Event_object.style.textIndent = Indentpx +"px";
	//console.log(Indentpx);
}
/*居左*/
function literals_JustifyLeft(){
	Menu_Event_object.style.textAlign = "left";
}
/*居中*/
function literals_JustifyCenter(){
	Menu_Event_object.style.textAlign = "center";
}
/*居右*/
function literals_JustifyRight(){
	Menu_Event_object.style.textAlign = "right";
}
/*删除*/
function literals_Delete(){
	var child = Menu_Event_object;
	//console.log(Menu_Event_object);
	child.parentNode.removeChild(child);

}

/*>>>>>>添加标题<<<<<<*/
function add_title2(object){
														// 插入标题块
	
	var Card = document.createElement("h2");
	Card.setAttribute("draggable", "true");												// 设置可被拖动
	Card.setAttribute("contenteditable", "plaintext-only");								// 设置可被编辑,但只能输入纯文本
	Card.setAttribute("data-menu-name", "add_Menu_title2");
	Card.innerHTML = "这是标题";
	
	object.appendChild(Card);															// 插入文本编辑块
	right_Menu_Event(Card);																// 绑定菜单事件
	
}

/*生成编辑菜单*/
function add_Menu_title2(){
	
	var menu = document.createElement("div");
	menu.id = "add_Menu_title2";
	menu.className = "menu";

	
	menu.innerHTML += "<button class='button' data-command='RemoveFormat' title='清除样式' onclick='Reset_Styles(this.dataset);'><img src='image/icon/右键菜单/样式.svg' /></button>";

	menu.innerHTML += "<button class='button' title='副标签' onclick='deputy_title2(this.dataset);'><img src='image/icon/右键菜单/副标题.svg' /></button>";

	menu.innerHTML += "<button class='button' title='移除' onclick='literals_Delete()'><img src='image/icon/右键菜单/移除.svg' /></button>";
	
	document.getElementById("dropdown").appendChild(menu);								// 插入生成的菜单
}

function deputy_title2(object){
	object = document.execCommand('FormatBlock', 'false', '<small>');					// 副标签
}

/*>>>>>>添加中心内容<<<<<<*/
function add_Central_content(object){
	var Card = document.createElement("p");
	Card.className = "lead";
	Card.setAttribute("draggable", "true");												// 设置可被拖动
	Card.setAttribute("contenteditable", "plaintext-only");								// 设置可被编辑,但只能输入纯文本
	Card.setAttribute("data-menu-name", "add_Menu_Central_content");					// 指定要调用的方法
	Card.innerHTML = "在这里添加中心内容";
	
	object.appendChild(Card);															// 插入中心内容块
	right_Menu_Event(Card);																// 绑定菜单事件
}
/*生成编辑菜单*/
function add_Menu_Central_content(){
	
	var menu = document.createElement("div");
	menu.id = "add_Menu_Central_content";
	menu.className = "menu";
	
	menu.innerHTML += "<button class='button' title='居左' onclick='literals_JustifyLeft()'><img src='image/icon/右键菜单/居左.svg' /></button>";
	menu.innerHTML += "<button class='button' title='居中' onclick='literals_JustifyCenter()'><img src='image/icon/右键菜单/居中.svg' /></button>";
	menu.innerHTML += "<button class='button' title='居右' onclick='literals_JustifyRight()'><img src='image/icon/右键菜单/居右.svg' /></button>";
	menu.innerHTML += "<button class='button' title='移除' onclick='literals_Delete()'><img src='image/icon/右键菜单/移除.svg' /></button>";
	
	document.getElementById("dropdown").appendChild(menu);								// 插入生成的菜单
}




/*>>>>>>添加图片<<<<<<*/
function add_image(object){
	var Card = document.createElement("img");
	Card.setAttribute("draggable", "true");												// 设置可被拖动
	Card.setAttribute("data-menu-name", "add_Menu_image");								// 指定要调用的方法
	Card.className = "image";
	//Card.setAttribute("onclick", "document.getElementById('upload_file').click()");
	Card.src = "data:image/png;base64,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";
	object.appendChild(Card);															// 插入图片块
	right_Menu_Event(Card);																// 绑定菜单事件
	//gen_base64(object);
}
/*生成编辑菜单*/
function add_Menu_image(){
	
	var menu = document.createElement("div");
	menu.id = "add_Menu_image";
	menu.className = "menu";

	menu.innerHTML += "<button class='button' title='上传图片' onclick='trigger_Control();'><img src='image/icon/右键菜单/上传.svg' /></button>";
	menu.innerHTML += "<button class='button' title='移除' onclick='literals_Delete()'><img src='image/icon/右键菜单/移除.svg' /></button>";
	
	document.getElementById("dropdown").appendChild(menu);								// 插入生成的菜单
}
/*触发图片上传控件*/
function trigger_Control(){
	document.getElementById('upload_file').click();
}
/*将图片转换为base64储存到web页面上*/
function gen_base64(file) {
	//console.log(object);
	//var file = document.getElementById('upload_file').files[0];
	var img = new FileReader();  //本地预览
	img.readAsDataURL(file[0]);    //Base64
	img.onload = function(){
		Menu_Event_object.src = img.result;
	}
	
}

/*>>>>>>添加代码<<<<<<*/
function add_clod(object){
	var Card = document.createElement("div");
	Card.className = "code";
	Card.setAttribute("draggable", "true");												// 设置可被拖动
	Card.innerHTML = "<p>添加代码</p>";
	Card.setAttribute("data-menu-name", "add_Clod_media");								// 指定要调用的方法
	
	object.appendChild(Card);															// 插入媒体块
	right_Menu_Event(Card);																// 绑定菜单事件
	
}
/*生成编辑菜单*/
function add_Clod_media(){
	
	var menu = document.createElement("div");
	menu.id = "add_Clod_media";
	menu.className = "menu";
	
	menu.innerHTML += "<button class='button' title='移除' onclick='literals_Delete()'><img src='image/icon/右键菜单/移除.svg' /></button>";
	
	document.getElementById("dropdown").appendChild(menu);								// 插入生成的菜单
}

/*>>>>>>添加媒体<<<<<<*/
function add_media(object){
	var Card = document.createElement("div");
	Card.className = "media";
	Card.setAttribute("draggable", "true");												// 设置可被拖动
	//Card.innerHTML = "<p>在这里可以保存,访问数据</p>";
	Card.setAttribute("data-menu-name", "add_Menu_media");								// 指定要调用的方法
	
	object.appendChild(Card);															// 插入媒体块
	right_Menu_Event(Card);																// 绑定菜单事件
	
}
/*生成编辑菜单*/
function add_Menu_media(){
	
	var menu = document.createElement("div");
	menu.id = "add_Menu_media";
	menu.className = "menu";
	
	menu.innerHTML += "<button class='button' title='移除' onclick='literals_Delete()'><img src='image/icon/右键菜单/移除.svg' /></button>";
	
	document.getElementById("dropdown").appendChild(menu);								// 插入生成的菜单
}

/*--------------------------------------------------------------保存组----------------------------------------------------*/

// 执行保存方法
function Save(){
	var titles = document.getElementById("file_name").innerText;						// 获取标题
	/*获取body内容块*/
	var body = document.getElementById("Card_set").cloneNode(true);						// 克隆Card_set下所有内容块
	var paras = body.getElementsByClassName('Toolbars')									// 获取工具架组
	for(let i=paras.length;i>=0;i--){
		if (paras[i] != null)
		paras[i].parentNode.removeChild( paras[i]);										// 删除所有工具架
	}
	var body = body.innerHTML;															// 将节点转为正常的Dom元素???
	
	/*删除没必要的属性*/
	body = body.replace(/\"/g,"'");														// 将双引号转为单引号
	body = body.replace(/contenteditable='true'/g,"");									// 删除contenteditable属性
	body = body.replace(/contenteditable='plaintext-only'/g,"");
	body = body.replace(/draggable='true'/g,"");										// 删除draggable属性

	
	
	/*拼接页面*/
	var page = "<!DOCTYPE html><html><head><meta charset=' utf-8'><title>"+ titles +"</title><style>body{background-image:"+ document.body.style.backgroundImage +";background-size:cover;position:relative;background-color:#efefef;background-repeat:no-repeat;background-attachment:fixed;background-position:center;height:100%}nav{background-color:#222;border-color:#080808;top:0;border-width:0 0 1px;border-radius:0;position:fixed;right:0;left:0;z-index:1030}.container-fluid{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}.navbar-header{float:left}.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:0;margin-left:0}.navbar-right{float:right!important}.Card{width:86%;max-width:960px;opacity:.95;margin-bottom:20px;background-color:#fff;border:1px solid transparent;border-radius:5px;box-shadow:1px 2px 1px rgba(0,0,0,0.05);box-sizing:border-box;margin:30px auto}.Content{margin:40px}.Title{border-bottom:1px solid #eee;box-sizing:border-box;display:block;outline:0}.Toolbars{min-height:20px;padding:10px 15px;box-shadow:0 1px 1px rgba(0,0,0,0.05);background-color:#f5f5f5;border-top:1px solid #ddd;border-bottom-right-radius:3px;border-bottom-left-radius:3px;user-select:none}h1,h2{font-weight:500;font-family:inherit;margin-top:20px;margin-bottom:10px;text-indent:25px}h1{font-size:36px}h2{font-size:24px}h1>small{font-weight:400;line-height:1;color:#777;font-size:65%}h2>small{font-weight:400;line-height:1;color:#555;font-size:65%}p,.text{font-weight:40;font-size:16px;color:#555;margin:10px auto;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}.lead{font-size:20px;font-weight:10;margin-bottom:20px;font-weight:300;line-height:1.4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}mark{padding:.2em;background-color:#fcf8e3}.blockquote{padding:10px 20px;margin:0 0 20px;border-left:5px solid #eee;display:block;font-size:80%;line--height:1.4285;color:#777}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block;content:'\2014 \00A0'}ol,ul{margin-top:0;margin-bottom:10px}li,dd{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.4285;color:#333;background-color:#fff}@media all and (min-width:768px){dl dt{float:left;width:160px;overflow:hidden;clear:left;text-align:right;text-overflow:ellipsis;white-space:nowrap;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}dl dd{margin-left:180px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}}dd{margin-left:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}dt{font-weight:700;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}.image{max-width:100%;width:auto;height:auto;padding:4px;line-height:1.4285;background-color:#fff;border:1px solid #ddd;border-radius:4px;display:block;margin:20px auto}.img{margin:auto 10px}.media{border-style:solid;border-top-width:5px;border-top-color:#1b809e;border-right-width:1px;border-right-color:#eee;border-bottom-width:5px;border-bottom-color:#1b809e;border-left-width:1px;border-left-color:#eee;border-radius:3px;padding:10px 0 30px 0;margin:10px auto}iframe{width:100%;height:550px}.code{border-style:solid;border-top-width:1px;border-top-color:#eee;border-right-width:1px;border-right-color:#eee;border-bottom-width:1px;border-bottom-color:#eee;border-left-width:5px;border-left-color:#7a378b;border-radius:3px;padding:10px 20px 10px 20px;margin:10px auto}table{width:100%;max-width:100%;margin-bottom:20px}table{background-color:transparent}table{border-spacing:0;border-collapse:collapse}table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #ddd}table>tbody>tr>td,table>tbody>tr>th,table>tfoot>tr>td,table>tfoot>tr>th,table>thead>tr>td,table>thead>tr>th{padding:8px;line-height:1.4285;vertical-align:top;border-top:1px solid rgba(0,0,0,0.05);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}caption{padding-top:8px;padding-bottom:8px;color:#777;text-align:left}</style></head><body><!--顶部导航栏--><nav class='navbar navbar-inverse navbar-fixed-top'style='background-color:#000000; height:50px;'><div class='container-fluid'><!--导航栏左侧--><div class='navbar-header'><p class='navbar-text'style='float: left; margin-top: 15px; margin-bottom: 15px;'>"+ titles +"</p></div><!--导航栏右侧--><div class='navbar-right'><a class='navbar-brand'href='https://space.bilibili.com/25826498'style='color: #555; float: left; padding: 15px 15px;text-decoration:none;'>@不存在的歌手</a></div></div></nav><!--卡组,卡片将在这里生成--><div id='Card_set'style='margin: 80px auto 60px auto;width:86%;max-width:960px;'>"+ body +"</div></body></html>";

	doSave(page, "text/latex", titles + ".html");  										// doSave(值,类型,文件名.后缀名)
	
}

/*保存方法*/
function doSave(value, type, name) {
	var blob;
	if (typeof window.Blob == "function") {
		blob = new Blob([value], {type: type});
	} else {
		var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
		var bb = new BlobBuilder();
		bb.append(value);
		blob = bb.getBlob(type);
	}

	var URL = window.URL || window.webkitURL;
	var bloburl = URL.createObjectURL(blob);
	var anchor = document.createElement("a");
	if ('download' in anchor) {
		anchor.style.visibility = "hidden";
		anchor.href = bloburl;
		anchor.download = name;
		document.body.appendChild(anchor);
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		anchor.dispatchEvent(evt);
		document.body.removeChild(anchor);
	} else if (navigator.msSaveBlob) {
		navigator.msSaveBlob(blob, name);
	} else {
		location.href = bloburl;
	}

}
