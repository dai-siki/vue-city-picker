import 'babel-polyfill';
import Vue from 'vue';
import cityList from 'china-city-data';
import myCityPicker from '../city-picker.vue';

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
