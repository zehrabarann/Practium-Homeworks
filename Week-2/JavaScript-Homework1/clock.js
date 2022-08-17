//Get Username 
let userName = prompt("Lütfen adınızı giriniz:")
let myName = document.querySelector("#myName")
myName.innerHTML = `${userName}`

//Get Date
function DateAndTime() {
	let dt = new Date();
    const weekday = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];

	let Hours = dt.getHours();
	let Min = dt.getMinutes();
	let Sec = dt.getSeconds();
    let day = weekday[dt.getDay()];

	if (Min < 10) {
		Min = "0" + Min.toString();
	} 

	if (Sec < 10) {
		Sec = "0" + Sec.toString();
	} 
   
    let myDate = document.querySelector("#myClock")
	myDate.innerHTML = `${Hours}:${Min}:${Sec} ${day}`
}

new DateAndTime();
setInterval("DateAndTime()", 1000);