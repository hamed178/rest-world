import { reqJson } from './getdata.js';
import { renderCard } from './helper.js';
const list = document.querySelector('.country-list');
class Genral{
    #data =[];
async Render(){
    try {

        list.innerHTML=" ";
        
        const data = await reqJson('https://restcountries.com/v3.1/all?fields=name,flags,currencies,population,capital,region,borders,languages,cca2,cca3')
        renderCard({},'spiner')
        list.innerHTML = "";
        data.forEach(e => {
                renderCard(e,'data');
                this.#data.push(e);
            });

    } catch(error){
        let er =error.message;        
        renderCard(er,'error');
    }
}
Seletion(){
    let option = document.querySelector('#selection');
    option.addEventListener('change',(ev)=>{
    // this.#data.map(e=>console.log(e.region) )
        if(!ev.target.value)return;
        renderCard({},'spiner')
        let selData =this.#data.filter((e=> e.region === ev.target.value));
        list.innerHTML=" ";
        setTimeout(()=>{
            selData.forEach(data =>renderCard(data,'data'))
        },500)
    })
}
Search(){
    let input = document.querySelector('#inupt');
    input.addEventListener('keyup',(e)=>{
        let val = e.target.value.toLowerCase()
        let selData =this.#data.filter((par=> { if(par.name.common.toLowerCase().includes(val) || par.cca2.toLowerCase().includes(val) ||par.cca3.toLowerCase().includes(val) )return true }));
        renderCard({},'spiner')        
        if(selData.length >0){            
            list.innerHTML=" ";
            setTimeout(()=>{
                selData.forEach(data =>renderCard(data,'data'))
            },500)
        }else{
            list.innerHTML=" ";
            renderCard('eneter a valid country name..','error')
        }
    })
}
}
export default new Genral();