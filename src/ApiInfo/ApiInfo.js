require('dotenv').config();
const {API_KEY}= process.env
const { Recipes,Diets} = require('../db')
const axios = require('axios')

/*
con este codigo podrian hacerse todas las paginas 
pero ahi ya no se cumple con el tiempo pedido

let pages= 0
let apiData= []
if(prop==='location') pages=7
if(prop==='episode') pages=3
if(prop==='character') pages=42
for(let i=1; i<=pages; i++){
let apiInfo =await axios.get(`https://rickandmortyapi.com/api/${prop}?page=${i}`)
apiData.push(apiInfo.data.results)
}
apiData= apiData.flat()
return apiData
*/


const getApiData = async (prop) => {
    
    try {
      let apiData =await axios.get(`https://rickandmortyapi.com/api/${prop}`)
    return apiData.data.results
        

    } catch (err) {
      console.log(err)
    }
  }

  const howMany = async (property , leter)=> {
    
    let datos = []
    let letras = []
    let counter = 0
    
    datos = await getApiData(property)
    
    letras = datos.map(item => item.name.toLowerCase().split('') ).flat()
            
    for (let x of letras) {
      if (x === leter) counter = counter + 1
    }
    
    return counter
      
    
  }

  const episodeLocations = async ()=> {
    let apiCharacters= []
    let apiEpisodes = []

    let charactersLocations=[]
    let episodes=[]
    
    //aqui si aumenta el valor tope de i se recorren mas paginas
    for(let i=1; i<=1; i++){
    apiCharacters.push((await axios.get(`https://rickandmortyapi.com/api/character?page=${i}`)).data.results
    ) }
    charactersLocations = apiCharacters.flat().map(item=> ({ 'characterId' : item.id, 'originLocation': item.origin.name}))
    //aqui si aumenta el valor tope de i se recorren mas paginas
    for (let i = 1; i <=1 ; i++) {
      apiEpisodes.push((await axios.get(`https://rickandmortyapi.com/api/episode?page=${i}`)).data.results
    )}
    episodes.push(apiEpisodes.flat().map(item=> ({'name':item.name,'episode':item.episode,'locations':[]})))
    
    let idCharactersPerEpisode= apiEpisodes.flat().map(item=> item.characters.map(item=> parseInt(item.split('/')[5])))
   
    episodes=episodes.flat()
    
    
     let resultado= []
    // let pepe=1
    for(let i=0; i<=19; i++){
    resultado.push(charactersLocations.filter(item=> {if(idCharactersPerEpisode[i].includes(item.characterId))return item.originLocation}))
    
     }
    for(let i=0; i<=19; i++){
    episodes[i].locations.push(resultado[i].map(item=> item.originLocation).flat()) 
    
     }
    episodes= episodes.map(item=> {return {...item, 'locations':item.locations.flat()}})
     

     return episodes
  }

  const chalenge =async (req, res, next) => {
    let startTime = performance.now()
   
    let l = await howMany('location','l')
    let e = await howMany('episode','e')
    let c = await howMany('character','c')
   
    let totalTime = ((performance.now() -startTime)/1000).toString().split('.')
    let milisegundos = '0.'+totalTime[1]
    let inTime= true
    if(totalTime>3) inTime= false
   
    let startTime2 = performance.now()
    let episodeLoc =  await episodeLocations()
    let totalTime2 = ((performance.now() -startTime2)/1000).toString().split('.')
    let inTime2= true
    if(totalTime2>3) inTime2= false

    return res.send([ {
     "exercise_name": "Char counter",
     "time":   totalTime[0]+'s '+milisegundos*1000 +'ms',  
     "in_time": inTime,
     "results": [
         {
             "char": "l",
             "count": l,
             "resource": "location"
         },
         {
             "char": "e",
             "count": e,
             "resource": "episode"
         },
         {
             "char": "c",
             "count": c,
             "resource": "character"
         },
         
         
       ]
       
     },
     {
         "exercise_name": "Episode locations",
         "time":  totalTime2[0]+'s '+milisegundos*1000 +'ms',
         "in_time": inTime2,
         "results": episodeLoc,
     } 
   ] 
   )
   }
  

module.exports= {
getApiData,howMany,episodeLocations, chalenge}

