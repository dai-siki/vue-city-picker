import 'babel-polyfill';
import Vue from 'vue';
import cityList from 'china-city-data';
import myCityPicker from '../city-picker.vue';

window.CITY_PICKER_LIST = cityList; //注册一个全局变量，为了数据公用（cityList可能会比较大）

new Vue({
	el: '#app',
	data: {
		cityId: ''
	},
	components: {
		'city-picker': myCityPicker
	}
});
