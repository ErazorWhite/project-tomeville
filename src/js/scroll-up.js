let calcScrollValue = () => {
    let scrollProgress = document.querySelector(".progress");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    
    if (pos > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }
    
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    
    scrollProgress.style.background = `conic-gradient(var(--blue-cl) ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  };
  
  window.addEventListener("scroll", calcScrollValue);
  window.addEventListener("load", calcScrollValue);
  