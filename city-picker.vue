<template>
<div class="vue-city-picker" @mouseout="endChoice" @mouseover="startMouseOver">
	<input v-show="!noInput" type="text" autocomplete="off" disableautocomplete :name="field" :id="field" :value="currCityName" :placeholder="placeholder" @focus="startChoice" @keypress="startChoice" @blur="endChoice" v-el:input>
	<!--城市选择-->
	<div class="vcp-panel" v-show="cityPanelIsShow">
		<h5>城市选择</h5>
		<ul class="vcp-tags">
			<li :class="{'z-on': item==tagKey}" v-for="item in tagsArr" @click="choiceTag(item)">{{ item }}</li>
		</ul>
		<div class="vcp-list">
			<div v-for="(initial, citys) in cityList" v-show="currTagIncludes(initial)">
				<h6 v-if="initial != 'hot'">{{ initial }}</h6>
				<ul>
					<li v-for="v in citys" @click="choiceCity(v.id)" :title="v.name">{{ v.name }}</li>
				</ul>
			</div>
		</div>
	</div>
</div>

</template>

<script>
'use strict';

export default {
	props: {
		field: {
			type: String,
			default: ''
		},
		value: {
			default: '',
			twoWay: true
		},
		placeholder: {
			type: String,
			default: ''
		},
		noInput: {
			type: Boolean,
			default: false
		},
		// 城市列表
		cityList: {
			type: Object,
			default: window.CITY_PICKER_LIST || {}
		},
		// 没有热门城市
		noHot: {
			type: Boolean,
			default: false
		}
	},
	data() {
		let tagsArr = ['热门', 'ABCDE', 'FGHJ', 'KLMN', 'PQRST', 'WXYZ'],
			tagKey = '热门',
			tags = {};
		if(this.noHot){
			tagsArr = ['ABCD', 'EFGH', 'JKL', 'MNPQ', 'RSTW', 'XYZ'];
			tagKey = 'ABCD';
		}
		tagsArr.forEach((item) => {
			if (item == '热门') {
				tags[item] = ['hot'];
			} else {
				tags[item] = item.split('');
			}
		});
		return {
			cityPanelIsShow: false,
			isMouseOver: false,
			tagsArr,
			tags,
			tagKey
		};
	},
	computed: {
		// 当前城市名字
		currCityName() {
			let {
				value,
				cityList
			} = this,
			cityName = '';
			Object.keys(cityList).forEach((item) => {
				cityList[item].forEach((item) => {
					if (value == item.id) {
						cityName = item.name;
					}
				})
			});
			return cityName;
		},
		currTag() {
			let {
				tagKey,
				tags
			} = this;
			return tags[tagKey];
		}
	},
	methods: {
		// 列表是否属于当前标签
		currTagIncludes(ini) {
			let {
				currTag
			} = this;
			return currTag.includes(ini);
		},
		// 选择标签
		choiceTag(key) {
			this.tagKey = key;
		},
		// 开始城市选择
		startChoice(e) {
			if (e && e.type == 'keypress') {
				e.returnValue = false;
			}
			this.cityPanelIsShow = true;
		},
		choiceCity(id) {
			this.value = id;
			this.immEndChoice();
		},
		// 鼠标离开城市选择区域时超过一定时间，关闭城市面板
		endChoice(e) {
			let that = this,
				inputEle = that.$els.input;
			if (e.type == 'mouseout') {
				that.isMouseOver = false;
			}
			setTimeout(function() {
				if (!that.isMouseOver && inputEle != document.activeElement) {
					that.cityPanelIsShow = false;
				}
			}, 300);
		},
		startMouseOver() {
			this.isMouseOver = true;
		},
		// 立即关闭城市面板
		immEndChoice() {
			this.isMouseOver = true;
			this.cityPanelIsShow = false;
		}
	}
}

</script>

<style lang="sass" scoped>@import "./scss/city-picker.scss"</style>
