const express = require ('express')
const https = require('https')
const app = express()

const city = "lat=-23,6577&lon=-46,5684" //mas pode ser o city name
const key = "4fcca30e049797fd0982dcec942fd71a" //minha chave pessoal
const sistem = "metric" //sistema de medidas

const urlTempo = `https://api.openweathermap.org/data/2.5/weather?${city}&appid=${key}&units=${sistem}`


app.get('/',(require, response)=>{
    response.sendFile(__dirname+"/index.html")
})

app.post('/',(require, response)=>{
    response.send(console.log("Deu certo"))
})

app.get('/response',(req,res)=>{
    https.get(urlTempo,(resApi)=>{
        console.log("statusCode: ", resApi.statusCode)
        console.log('Headers:',resApi.headers.connection)
        
        resApi.on('data', (d)=>{
            let dataObject = JSON.parse(d)
            let tempInfos = dataObject.main
            let weatherInf = dataObject.weather[0]
            let urlImage = `https://openweathermap.org/img/wn/${weatherInf.icon}@2x.png`

            //Eu iria usar um re.send mas ele não permite mais de um envio
            res.write(`<h1><img src=${urlImage} ></img> A temperatura em Rudge Ramos é ${tempInfos.temp} graus </h1>`)
            res.write(`
            <div>
                <h2>Podemos considerar o tempo "${weatherInf.description}" por hoje</h2>
                <h3>Temos o minimo de${tempInfos.temp_min} e máximo de ${tempInfos.temp_max}</h3>
            <div>
            `)            
        })  
    })

})

app.listen(3000,()=>{
    console.log ("App rodando na porta 3000")
})


//https://openweathermap.org/img/wn/10d@2x.png