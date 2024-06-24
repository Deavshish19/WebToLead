import { LightningElement } from 'lwc';
import getWheatherDetails from '@salesforce/apex/WheatherDetailsAPICall.getWheatherDetails';

export default class WheatherComponentParent extends LightningElement {
    inputCityName ;
    showWeatherDetails  = false;
    weatherDetails = [];

    handleInputChange(event){

        this.inputCityName = event.target.value;
    }

    handleButtonClick(){
        getWheatherDetails({cityName : this.inputCityName})
        .then((result)=>{
            console.log('result>>', result);
            this.weatherDetails = result;
            this.showWeatherDetails = true;
        })
        .catch((error)=>{
            console.log(error);
            this.showWeatherDetails = false;

        });
    }
}