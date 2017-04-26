import 'babel-polyfill';
import Vue from 'vue';
import cityList from 'china-city-data';
import myCityPicker from '../city-picker.vue';

window.CITY_PICKER_LIST = cityList;

new Vue({
	el: '#app',
	data: {
		cityId: '',
		cityList
	},
	components: {
		'city-picker': myCityPicker
	}
});
