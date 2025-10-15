export const setTimer = function(s){
    return new Promise(function(_,reject){
      setTimeout(() => {
        reject(new Error(`Request took too long... timed out after ${s} seconds`))
      }, s*1000);
    })
}
let border = function(borders){
  if(!borders) return  `<p>No neighbour country</p>`
  if(borders.length ===0) return  `<p>No neighbour country</p>`
 return borders.map(br => `<p>${br}</p>`).join(' ');
}
function getLanguagesString(languagesObj) {
  const languages = Object.values(languagesObj);
  return languages.length > 0 ? languages.join(', ') : 'No languages';
}
function getCurrencyNames(currencyData) {
  return Object.values(currencyData).map(currency => currency.name);
}
export function renderCard(data ,type){
  let mark;
  let load = document.querySelector('.load-message');
  let message = document.querySelector('.load-error');
  let spiner = document.querySelector('.load');
  
  const list = document.querySelector('.country-list');  
  if(type ==='data'){
     mark =`<div class="card">
                      <div class="card-side card-side-front">                        
                              <img class="card-img" src="${data.flags.png}" alt="${data.flags.alt}">
                              <div class="card-data">
                                  <h1>${data.name.common}</h1>
                                  <p>Population: ${data.population}</p>
                                  <p>Region: ${data.region}</p>
                                  <p>capital: ${data.capital}</p>
                              </div>
                              
                          </div>
                          <div class="card-side card-side-back">                            
                              <h1 class="country-name">${data.name.common}</h1>
                              <div class="country-data">                                
                                  <p>language:  ${getLanguagesString(data.languages)}</p>
                                  <p>Nativename: ${data.name.official}</p>
                                  <p>Currency:  ${getCurrencyNames(data.currencies)}</p>                                
                              </div>
                              <div class="country-border">
                                  <p>Border countries:</p>
                                  ${border(data.borders)}                        
                                  
                              </div>
                      </div>
                  
              </div>` 
    list.insertAdjacentHTML('beforeend',mark);  
    spiner.style.display='none';
  }
  else if(type == 'spiner'){
    load.style.display ='block';
    message.style.display ='none'
    if(spiner.style.display==='none'){      
      spiner.style.display='block';
    }else{
      spiner.style.display='none';
    }     
  }else{
    load.style.display='none';   
    message.style.display ='block'
    spiner.style.display='block';
    message.innerText= data;
  }
}
