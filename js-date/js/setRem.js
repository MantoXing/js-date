var cssEl = document.createElement('style');
document.documentElement.firstElementChild.appendChild(cssEl);
function setPxPerRem(){
	var dpr = 1;
	var pxPerRem = document.documentElement.clientWidth*dpr/10;
	cssEl.innerHTML = 'html{font-size:'+ pxPerRem +'px!important;}';
}
setPxPerRem();
