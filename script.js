$(document).ready(function(){

	var long;
	var lat;
	var farTemp;
	var celTemp;

	$.getJSON("http://ip-api.com/json", function(data2){
		long = data2.lon;
		lat = data2.lat;

	//getting the geo-location
	var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=70551d08bee698de3d8adde0347620ea';
	$.getJSON(api, function(data){

		var tempSwitch = true;
		var weatherType = data.weather[0].description;
		var kelvin = data.main.temp;
		var windSpeed =  (3.6 * data.wind.speed).toFixed(1) ; // meter/s converted to km/h
		var city = data.name;
		farTemp = (1.8*(kelvin - 273) + 32).toFixed(1);
		celTemp = (kelvin - 273).toFixed(1);

		$('.location').html(city + ", "+data.sys.country);
		$('.weather').text(weatherType);
		var weatherMain = data.weather[0].main;
		//weather icon changer
		switch(weatherMain){
			case 'Thunderstorm': $('.weather').html('<img src="http://openweathermap.org/img/w/11d.png" />' +  weatherType); break;
			case 'Drizzle': $('.weather').html('<img src="http://openweathermap.org/img/w/09d.png" />' +  weatherType); break;
			case 'Rain': $('.weather').html('<img src="http://openweathermap.org/img/w/10d.png" />' +  weatherType); break;
			case 'Snow': $('.weather').html('<img src="http://openweathermap.org/img/w/13d.png" />' +  weatherType); break;
			case 'Atmosphere': $('.weather').html('<img src="http://openweathermap.org/img/w/50d.png" />' +  weatherType); break;
			case 'Clear': $('.weather').html('<img src="http://openweathermap.org/img/w/01d.png" />' +  weatherType); break;
			case 'Clouds': 
				var cloudType = data.weather[0].description;
				if(cloudType === 'few clouds'){
					$('.weather').html('<img src="http://openweathermap.org/img/w/02d.png" />' +  weatherType);
				}else if(cloudType === 'scattered clouds'){
					$('.weather').html('<img src="http://openweathermap.org/img/w/03d.png" />' +  weatherType);
				}else if(cloudType === 'broken clouds' || cloudType === 'overcast clouds'){
					$('.weather').html('<img src="http://openweathermap.org/img/w/04d.png" />' +  weatherType);
				}break;
			case '': $('.weather').html('<img src="http://openweathermap.org/img/w/.png" />' +  weatherType); break;
			case '': $('.weather').html('<img src="http://openweathermap.org/img/w/.png" />' +  weatherType); break;
			default:
		}

		$('.windspeed').html('<img src="https://cdn4.iconfinder.com/data/icons/vectory-weather-2/40/wind_5-512.png"/> '+ windSpeed + " km/h");
		$('.cel-temperature').html(celTemp + ' &#x2103;');
		$('.cel-temperature').click(function(){
			if(tempSwitch === false){
				$('.cel-temperature').html(celTemp + ' &#x2103;');
				tempSwitch =true;
			}else{
				
				$('.cel-temperature').html(farTemp + ' &#8457;');
				tempSwitch = false;
			}

		});

		

	});		
	});
});
