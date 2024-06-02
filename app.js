const password = require ('./password')
const express = require ('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({extended:true}))





app.get('/',(require, response)=>{
    response.sendFile(__dirname+"/index.html")
})

app.post('/',(require, response)=>{
    console.log(require.body.cityName)
    const city = require.body.cityName
    const key =  password // minha chave pessoal
    const sistemMesures = "metric"

    const urlTempo = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${sistemMesures}`

    https.get(urlTempo,(resApi)=>{
        console.log("statusCode: ", resApi.statusCode)
        console.log('Headers:',resApi.headers.connection)
        
        resApi.on('data', (d)=>{
            let dataObject = JSON.parse(d)
            let tempInfos = dataObject.main
            let weatherInf = dataObject.weather[0]
            let urlImage = `https://openweathermap.org/img/wn/${weatherInf.icon}@2x.png`
            
            response.write(`<h1><img src=${urlImage} ></img> A temperatura em ${city}: ${tempInfos.temp} graus </h1>`)
            response.write(`
            <div>
                <h2>Podemos considerar o tempo "${weatherInf.description}" por hoje</h2>
                <h3>Temperatura min. de ${tempInfos.temp_min} e max. de ${tempInfos.temp_max}</h3>
            <div>
            `)   
            response.send()        
        })  
    })
})



app.listen(3000,()=>{
    console.log ("App rodando na porta 3000")
})


//https://openweathermap.org/img/wn/10d@2x.png