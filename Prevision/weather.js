// Verifier Verifier City 
function verifierCity() {
    let go = document.getElementById("go")
    let result = document.getElementById("msg")
    if ((go.value != "montreal") && (go.value != "Montreal") && (go.value != "MONTREAL")) {
        result.innerHTML = "Attention! il faut saisir Montreal"
        result.style.color = "red"
    } else {
        var button = document.getElementById("goTo")
        let lien = window.location.href = "Prevision/tempCurrent.html"
        button.setAttribute("onclick", lien)
    }

}
const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const countryE1 = document.getElementById('country');
const weatherForecastE1 = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
const ville = 'Montréal ' + ', ' + 'QC'
const pays = 'Québec, Canada'

/* Traitement Affichage Date Time Pays */
setInterval(() => {
    const time = new Date();
    var month = time.getMonth();
    var date = time.getDate();
    if (date < 10) { date = " 0" + date }
    var day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    var minutes = time.getMinutes();
    if (minutes < 10) { minutes = "0" + minutes }
    const ampm = hour >= 12 ? 'PM' : 'AM'
    timeE1.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`

    dateE1.innerHTML = days[day] + '' + date + ', ' + months[month] + ' ' + time.getFullYear();
    timeZone.innerHTML = pays
    countryE1.innerHTML = ville
}, 1000);



function afficherprevisionJour(jourPrevision) {
    //recuperation donnes de json
    fetch('temperatures_2022.json')
        .then(result => { return result.json() })
        .then(data /*objet JSON en mémoire*/ => {
            //traitement
            let date = new Date();
            let day = date.getDate()
            if (day < 10)
                day = '0' + day
            //trouver le mois en 2 digits
            let month = date.getMonth() + 1
            if (month < 10)
                month = '0' + month

            let today = date.getFullYear() + '-' + month + '-' + day //2022-08
            //chercher la temperature d'aujourd'hui
            for (let index = 0; index < data.temperatures.length; index++) {
                if (data.temperatures[index].DateDuJour == today) {

                    let tempToday = data.temperatures[index].Temp

                    document.getElementById('Temp').innerHTML = tempToday + " °C"
                    document.getElementById('minTemp').innerHTML = "MIN - " + data.temperatures[index].MinTemp + " °C "
                    document.getElementById('maxTemp').innerHTML = "MAX - " + data.temperatures[index].MaxTemp + " °C"

                    let imgDay = document.getElementById("iconDay")
                    if (tempToday <= 0) {
                        imgDay.setAttribute('src', '../src/img/icon-weather/neige.svg')
                    }
                    else if (tempToday >= 30) {
                        imgDay.setAttribute('src', '../src/img/icon-weather/soleil.svg')
                    }
                    else if (tempToday >= 20) {
                        imgDay.setAttribute('src', '../src/img/icon-weather/nuage-soleil.svg')
                    }
                    else if (tempToday > 0 && tempToday <= 10) {
                        imgDay.setAttribute('src', '../src/img/icon-weather/pluie.svg')
                    }
                    else if (tempToday > 10 && tempToday < 20) {
                        imgDay.setAttribute('src', '../src/img/icon-weather/nuage.svg')
                    }



                    break
                }
            }
        })
}
// afficherprevision par nombres jours
function afficherprevision(jourPrevision) {

    fetch('temperatures_2022.json')
        .then(result => { return result.json() })
        .then(data /*objet JSON en mémoire*/ => {


            // trouve date d'aujourd'hui
            let date = new Date()
            //trouver nom de jour 
            let nomJour = date.toString().split(' ')[0];
            //trouver le jour en 2 digits
            let day = date.getDate()
            if (day < 10)
                day = '0' + day
            //trouver le mois en 2 digits
            let month = date.getMonth() + 1
            if (month < 10)
                month = '0' + month
            let today = date.getFullYear() + '-' + month + '-' + day


            // trouver data pour today
            for (let index = 0; index < data.temperatures.length; index++) {
                if (data.temperatures[index].DateDuJour == today) {
                    //insérer dynamiquement Elementes pour  prévisions
                    let previsions = document.getElementById('previsionsjours')
                    //jourPrevision =Nombre de jours de prevision
                    for (let i = 0; i < jourPrevision; i++) {
                        //créer une div
                        let div = document.createElement('div') //nom de la balise à créer
                        //creer un paragraphe
                        let parag1 = document.createElement('p')
                        parag1.setAttribute('class', 'fw-bold')
                        //trouver  nom de jour 
                        let date = new Date();
                        let dayPrevision = date;
                        dayPrevision.setDate(date.getDate() + i);

                        parag1.innerHTML = dayPrevision.toString().split(' ')[0] + "  " + data.temperatures[index + i].DateDuJour

                        let parag2 = document.createElement('p')
                        let img = document.createElement('img')

                        let temp = data.temperatures[index + i].Temp


                        if (temp <= 0) {
                            img.setAttribute('src', '../src/img/icon-weather/neige.svg')
                        }
                        else if (temp >= 30) {
                            img.setAttribute('src', '../src/img/icon-weather/soleil.svg')
                        }
                        else if (temp >= 20) {
                            img.setAttribute('src', '../src/img/icon-weather/nuage-soleil.svg')
                        }
                        else if (temp > 0 && temp <= 10) {
                            img.setAttribute('src', '../src/img/icon-weather/pluie.svg')
                        }
                        else if (temp > 10 && temp < 20) {
                            img.setAttribute('src', '../src/img/icon-weather/nuage.svg')
                        }


                        parag2.innerHTML = temp

                        let parag3 = document.createElement('p')
                        parag3.innerHTML = "MIN -  " + data.temperatures[index + i].MinTemp + " °C "
                        let parag4 = document.createElement('p')
                        parag4.innerHTML = "MAX -  " + data.temperatures[index + i].MaxTemp + " °C "


                        div.appendChild(parag1)
                        div.appendChild(parag2)
                        parag2.appendChild(img)
                        div.appendChild(parag3)
                        div.appendChild(parag4)
                        previsions.appendChild(div)

                    }


                    break
                }
            }

        })

}
// afficherPrevision Statistique de tous les mois
function afficherPrevisionStatistiqueMois(mois) {
    fetch('temperatures_2022.json')
        .then(result => { return result.json() })
        .then(data /*objet JSON en mémoire*/ => {

            var somme = 0
            var jourMois = 0
            for (let index = 0; index < data.temperatures.length; index++) {

                if (data.temperatures[index].DateDuJour.substr(5, 2) == mois) {
                    somme += (data.temperatures[index].Temp)

                    let previsions = document.getElementById('previsionsjours')
                    //jourPrevision =Nombre de jours de prevision
                    for (let i = 0; i < 31; i++) {
                        if (data.temperatures[index + i].DateDuJour.substr(5, 2) == mois) {
                            jourMois += 1
                            //console.log(jourMois)
                            //créer une div
                            let div = document.createElement('div') //nom de la balise à créer
                            //creer un paragraphe
                            let parag1 = document.createElement('p')
                            parag1.setAttribute('class', 'fw-bold')
                            parag1.style.fontSize = "12px";
                            parag1.innerHTML = data.temperatures[index + i].DateDuJour

                            let parag2 = document.createElement('p')
                            let img = document.createElement('img')

                            let temp = data.temperatures[index + i].Temp


                            if (temp <= 0) {
                                img.setAttribute('src', '../src/img/icon-weather/neige.svg')
                            }
                            else if (temp >= 30) {
                                img.setAttribute('src', '../src/img/icon-weather/soleil.svg')
                            }
                            else if (temp >= 20) {
                                img.setAttribute('src', '../src/img/icon-weather/nuage-soleil.svg')
                            }
                            else if (temp > 0 && temp <= 10) {
                                img.setAttribute('src', '../src/img/icon-weather/pluie.svg')
                            }
                            else if (temp > 10 && temp < 20) {
                                img.setAttribute('src', '../src/img/icon-weather/nuage.svg')
                            }


                            parag2.innerHTML = temp + " °C"
                            parag2.style.fontSize = "20px";
                            parag2.style.fontWeight = "bold";
                            div.appendChild(parag1)
                            div.appendChild(parag2)
                            parag2.appendChild(img)
                            previsions.appendChild(div)

                        }
                    }


                    break

                }
            }

            //Calculer Moyenne,le jour de mintemp,le jour de maxtemp 
            var somme = 0
            let tabTempMois = []
            let tabTempSJour = []
            for (let index = 0; index < data.temperatures.length; index++) {

                if (data.temperatures[index].DateDuJour.substr(5, 2) == mois) {
                    somme += (data.temperatures[index].Temp)
                    tabTempMois.push(data.temperatures[index].Temp)
                    tabTempSJour.push(data.temperatures[index].DateDuJour)
                }
            }

            let Moyenne = document.getElementById('ST_Moyenne')
            Moyenne.innerHTML = "Moyenne " + "<br/>" + Math.round(somme / jourMois)

            // le jour de maxtemp
            let tempMax = Math.max.apply(null, tabTempMois)
            let indexMax = tabTempMois.indexOf(tempMax)
            let jourMax = tabTempSJour[indexMax]
            document.getElementById('ST_DayMax').innerHTML = jourMax + "<br/>" + "TempMax " + "<br/>" + tempMax + " °C "

            // le jour de maxtemp
            let tempMin = Math.min.apply(null, tabTempMois)
            let indexMin = tabTempMois.indexOf(tempMin)
            let jourMin = tabTempSJour[indexMin]
            document.getElementById('ST_DayMin').innerHTML = jourMin + "<br/>" + "TempMin " + "<br/>" + tempMin + " °C"


        })
}

//Afficher Statistique Mois courrant
function afficherStatistiqueMoisCourrant() {
    fetch('temperatures_2022.json')
        .then(result => { return result.json() })
        .then(data /*objet JSON en mémoire*/ => {

            var somme = 0
            var jourMois = 0
            // trouve date d'aujourd'hui
            let date = new Date()
            //trouver nom de jour 
            let nomJour = date.toString().split(' ')[0];
            //trouver le jour en 2 digits
            let day = date.getDate()
            if (day < 10)
                day = '0' + day
            //trouver le mois en 2 digits
            let month = date.getMonth() + 1
            if (month < 10)
                month = '0' + month


            for (let index = 0; index < data.temperatures.length; index++) {

                if (data.temperatures[index].DateDuJour.substr(5, 2) == month) {
                    somme += (data.temperatures[index].Temp)

                    let previsions = document.getElementById('previsionsjours')

                    //jourPrevision =Nombre de jours de prevision


                    for (let i = 0; i < 31; i++) {
                        if (data.temperatures[index + i].DateDuJour.substr(5, 2) == month) {
                            jourMois += 1
                            //créer une div
                            let div = document.createElement('div') //nom de la balise à créer
                            //creer un paragraphe
                            let parag1 = document.createElement('p')
                            parag1.setAttribute('class', 'fw-bold')
                            parag1.style.fontSize = "12px";
                            parag1.innerHTML = data.temperatures[index + i].DateDuJour

                            let parag2 = document.createElement('p')
                            let img = document.createElement('img')

                            let temp = data.temperatures[index + i].Temp


                            if (temp <= 0) {
                                img.setAttribute('src', '../src/img/icon-weather/neige.svg')
                            }
                            else if (temp >= 30) {
                                img.setAttribute('src', '../src/img/icon-weather/soleil.svg')
                            }
                            else if (temp >= 20) {
                                img.setAttribute('src', '../src/img/icon-weather/nuage-soleil.svg')
                            }
                            else if (temp > 0 && temp <= 10) {
                                img.setAttribute('src', '../src/img/icon-weather/pluie.svg')
                            }
                            else if (temp > 10 && temp < 20) {
                                img.setAttribute('src', '../src/img/icon-weather/nuage.svg')
                            }


                            parag2.innerHTML = temp + " °C"
                            parag2.style.fontSize = "20px";
                            parag2.style.fontWeight = "bold";
                            div.appendChild(parag1)
                            div.appendChild(parag2)
                            parag2.appendChild(img)
                            previsions.appendChild(div)

                        }
                    }

                    break

                }
            }

            //Calculer Moyenne,le jour de mintemp,le jour de maxtemp 
            var somme = 0
            let tabTempMois = []
            let tabTempSJour = []
            for (let index = 0; index < data.temperatures.length; index++) {

                if (data.temperatures[index].DateDuJour.substr(5, 2) == month) {
                    somme += (data.temperatures[index].Temp)
                    tabTempMois.push(data.temperatures[index].Temp)
                    tabTempSJour.push(data.temperatures[index].DateDuJour)
                }
            }

            let Moyenne = document.getElementById('ST_Moyenne')
            Moyenne.innerHTML = "Moyenne " + "<br/>" + Math.round(somme / jourMois)
            console.log(jourMois)

            // le jour de maxtemp
            let tempMax = Math.max.apply(null, tabTempMois)
            let indexMax = tabTempMois.indexOf(tempMax)
            let jourMax = tabTempSJour[indexMax]
            document.getElementById('ST_DayMax').innerHTML = jourMax + "<br/>" + "TempMax " + "<br/>" + tempMax + " °C "

            // le jour de maxtemp
            let tempMin = Math.min.apply(null, tabTempMois)
            let indexMin = tabTempMois.indexOf(tempMin)
            let jourMin = tabTempSJour[indexMin]
            document.getElementById('ST_DayMin').innerHTML = jourMin + "<br/>" + "TempMin " + "<br/>" + tempMin + " °C"


        })
}
