

class Theme{
    #theme;
    #prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)"); 
    #btn = document.querySelector('.header-mode');
setTheme(){  
  const root = document.documentElement;  
  const icon =document.getElementById('icon')
  if(this.#theme==="dark"){
    root.style.setProperty('--primaary-Bg','#182936')
    root.style.setProperty('--secondary-Bg',' #233441')
    root.style.setProperty('--mode-Bg','rgba(255, 255, 255, 0.332)')
    root.style.setProperty('--sh-Bg','rgba(39, 71, 90, 0.79)')
    root.style.setProperty('--lin-light','rgba(255, 234, 0, 0.407)')
    root.style.setProperty('--text-color',' #ffffff')
    root.style.setProperty('--head-bg',"linear-gradient(270deg,var(--sh-Bg) 38%, transparent 91%), url('/src/assets/Bg-img.jpg')")    
    root.style.setProperty('--light',"linear-gradient(var(--Lg-Deg),var(--lin-light) 48%, var(--mode-Bg) 98%)")
    root.style.setProperty('--search-icon','url("/src/assets/search-wh.svg")')
    icon.setAttribute('href','src/assets/symbols.svg#icon-sun')
    
    this.#btn.setAttribute('Goto','light');
    
  }else{
    root.style.setProperty('--primaary-Bg','#f9fcffff')
    root.style.setProperty('--secondary-Bg',' #fff')
    root.style.setProperty('--mode-Bg','rgba(255, 255, 255, 0.332)')
    root.style.setProperty('--sh-Bg','rgba(81, 81, 81, 0.79)')
    root.style.setProperty('--lin-light','rgba(109, 241, 248, 0.407)')
    root.style.setProperty('--text-color',' #000')
    root.style.setProperty('--head-bg',"linear-gradient(270deg,var(--sh-Bg) 38%, transparent 91%), url('/src/assets/Bg-img.jpg'")    
    root.style.setProperty('--light',"linear-gradient(var(--Lg-Deg),var(--lin-light) 48%, var(--mode-Bg) 98%)")
    root.style.setProperty('--search-icon','url("/src/assets/search-bl.svg")')
    icon.setAttribute('href','src/assets/symbols.svg#icon-moon')

    this.#btn.setAttribute('Goto','dark');
    
  }
}
handleThemePreference() {
    if (this.#prefersDarkScheme.matches) {
        // User prefers dark theme: hide dark toggle button, show light toggle
        this.#theme='dark'      
        this.setTheme(this.#theme);
    } else {
      // User prefers light theme: hide light toggle button, show dark toggle     
    this.#theme="light"
    this.setTheme(this.#theme);  
    }
}
toggleTheme(){
  // Set initial theme preference
 
this.handleThemePreference();
  // Listen for changes in the system theme preference

  this.#prefersDarkScheme.addEventListener("change", (event) => {
    if (event.matches) {
      // Switched to dark: hide dark toggle, show light toggle
        
      this.#theme="dark"      
      icon.setAttribute('href','src/assets/symbols.svg#icon-sun')
      this.setTheme();
      // Apply dark theme styles if needed  
    } else {
      // Switched to light: hide light toggle, show dark toggle
    this.#theme="light"     
      // Apply light theme styles if needed
      icon.setAttribute('href','src/assets/symbols.svg#icon-moon')
      this.setTheme();
    }
  });
  this.handelClick()
}

handelClick(){
  const IC = document.querySelector('#toggle-icon');
  const root = document.documentElement;
  this.#btn.addEventListener('click',()=>{    
    let th = this.#btn.getAttribute('Goto');    
    this.#theme=th;
    this.setTheme()
    if(IC.className.baseVal ===''){
      IC.classList.add('tg-Lf')
      root.style.setProperty('--Lg-Deg','90deg')
    }else if(IC.className.baseVal==='tg-Lf'){
      IC.classList.remove('tg-Lf');
      IC.classList.add('tg-Rg');
      root.style.setProperty('--Lg-Deg','270deg')
    }else if(IC.className.baseVal==='tg-Rg'){
      IC.classList.remove('tg-Rg');
      IC.classList.add('tg-Lf');
      root.style.setProperty('--Lg-Deg','90deg')
    }
  })
}



}
export default new Theme();