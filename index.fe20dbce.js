var calcScrollValue=function(){var e=document.querySelector(".progress"),c=document.documentElement.scrollTop,n=document.documentElement.scrollHeight-document.documentElement.clientHeight,l=Math.round(100*c/n);e.style.display=c>100?"grid":"none",e.addEventListener("click",(function(){document.documentElement.scrollTop=0})),e.style.background="conic-gradient(var(--blue-cl) ".concat(l,"%, #d7d7d7 ").concat(l,"%)")};window.addEventListener("scroll",calcScrollValue),window.addEventListener("load",calcScrollValue);
//# sourceMappingURL=index.fe20dbce.js.map