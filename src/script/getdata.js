import {setTimer} from './helper.js'


export const reqJson = async function(url) {
    try {
      const res = await Promise.race([fetch(url), setTimer(7)])
      
      if(!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`)
      }
      
      const data = await res.json();
      return data
    } catch(err) {
      throw new Error('Request failed:', err.message)
      
    }
}

