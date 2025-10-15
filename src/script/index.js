import Genral from './handelEvnt.js'
import  Theme from './themeHandel.js';
function init(){
  Theme.toggleTheme();
  Genral.Render();  
  Genral.Seletion();  
  Genral.Search();  
}
init()