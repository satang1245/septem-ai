import '@scss/main.scss';

import { debounce } from '@js/utils.js';

const OurPorjects = (() => {
	let $area = null;
	let $wrap = null;
	let $items = null;
	let $container = null;	
	
	let touched = false;
	let translateX = 0;
	let point = {x: 0, t: 0};
	let itemSize = 0;
	let pArr = [];
	
	// function onMouseEnterEventHandler() {
	// 	$items.forEach($item => $item.classList.toggle('blur', $item !== this));
	// }
	// function onMouseLeaveEventHandler() {
	// 	$items.forEach($item => $item.classList.remove('blur'));
	// }

	function getCssPropertValue($elem, prop) {
		$elem = typeof $elem == 'string' ? document.querySelector($elem) : $elem;
		return window.getComputedStyle($elem).getPropertyValue(prop);
	}
	
	function getTransformValue($elem) {
		const v = getCssPropertValue($elem, 'transform');
		const arr = v.match(/matrix.*\((.+)\)/)[1].split(', ');
		return v.includes('3d') ? {
				x: parseInt(arr[12]),
				y: parseInt(arr[13]),
				z: parseInt(arr[14])
			} : { 
				x: parseInt(arr[4]), 
				y: parseInt(arr[5]) 
			};
	}

	function onMouseDownEventHandler(e) {
		const pageX = e.type.includes('touch') ? e.targetTouches[0].pageX : e.pageX;
		if ( touched === false ) {
			touched = true;
			translateX = getTransformValue($wrap).x;
			$wrap.style.transitionDuration = '';
			point = {x : pageX, t: +new Date };
			$wrap.classList.add('touched');
		}
		e.preventDefault();
	}
	function onMouseMoveEventHandler(e) {
		if ( touched === true ) {
			const pageX = e.type.includes('touch') ? e.targetTouches[0].pageX : e.pageX;
			let delta = translateX + (pageX - point.x);
			$wrap.style.transform = `translateX(${delta}px)`;
		}
	}
	function onMouseUpEventHandler(e) {
		if ( touched === true ) {
			moveCurItemPosition();
			touched = false;
			$wrap.classList.remove('touched');
		}
		e.preventDefault();
	}

	function moveCurItemPosition(flag) {
		let currentIndex = Math.max(Array.from($items).findIndex($item => $item.classList.contains('active')), 0);
		let maxX = $container.scrollWidth - $container.clientWidth;
		if ( !flag ) {
			let translateX = Math.min(getTransformValue($wrap).x, 0) * -1;
			currentIndex = Math.max(pArr.findIndex(x => ((x-itemSize/2) >= translateX)) - 1, -1);
			$items.forEach(($item ,i) => $item.classList.toggle('active', i == currentIndex));
		}
		let moveSetX = Math.min(pArr.at(currentIndex), maxX);
		$wrap.style.transitionDuration = '.5s';
		$wrap.style.transform = `translateX(-${moveSetX}px)`;
	}

	function setItemPosition() {
		let margin = parseInt(getCssPropertValue($area, 'gap')) / 2;
		itemSize = $items[0].clientWidth + margin;
		pArr = [];

		for(let i=0;i<$items.length; i+=1) {
			let result = (i * itemSize) + Math.max(i-1, 0) * margin;
			pArr[i] = Math.max(result,0);
		}
		return pArr;
	}

	const init = function () {
		$container = document.querySelector('.our-projects-body');
		$wrap = $container.querySelector('.our-projects-wrap');
		$area = $wrap.querySelector('.our-projects-area');
		$items = $area.querySelectorAll('.our-projects-item');
		$wrap.style.transform = `translateX(0px)`;
		
		setItemPosition();
		this.addEvent();
		return this;
	};
	const addEvent = () => {
		// 터치
		$area.addEventListener('touchstart', onMouseDownEventHandler, false)
		document.addEventListener('touchmove', onMouseMoveEventHandler)
		document.addEventListener('touchend', onMouseUpEventHandler, false)
		// 마우스
		$area.addEventListener('mousedown', onMouseDownEventHandler, false)
		document.addEventListener('mousemove', onMouseMoveEventHandler)
		document.addEventListener('mouseup', onMouseUpEventHandler, false)

		window.addEventListener('resize', debounce(()=> {
			setItemPosition();
			moveCurItemPosition(true);
		}, 500));
		// $items.forEach($item => {
		// 	$item.addEventListener('mouseenter', onMouseEnterEventHandler);
		// 	$item.addEventListener('mouseleave', onMouseLeaveEventHandler);
		// 	$item.addEventListener('focus', onMouseEnterEventHandler);
		// 	$item.addEventListener('blur', onMouseLeaveEventHandler);
		// })
	}
	
	
	return {
		init,
		addEvent
	}
})();

function wrapInner(element, wrapperClass, wrapperTag = 'div') {
	const wrapper = document.createElement(wrapperTag);
	if (wrapperClass) {
	  wrapper.classList.add(wrapperClass);
	}
	while (element.firstChild) {
	  wrapper.appendChild(element.firstChild);
	}
	element.appendChild(wrapper);
	return wrapper;
  }

class MarqueeBrands {
	constructor(elem) {
		this.$elem = typeof elem == 'string' ? document.querySelector(elem) : elem;
		this.$lists = wrapInner(this.$elem, 'brands-list-in');
		this.$elem.appendChild( this.$lists.cloneNode(true) );

		const total = this.$lists.children.length;
		const duration = 9; // second

		// Setup Duration
		this.$elem.style.setProperty('--brands-duration', (total * duration) + 's');
		this.$elem.classList.add('ani-marquee');
	}
}

const Creative = (function() {
	const init = function() {
		const $wrap = document.querySelector('.creative');
		const $path = $wrap.querySelector('#creative-line > path');
		const $title = $wrap.querySelector('h2.title');
		const $items = $wrap.querySelectorAll('.item:not(.line)');
		const $firstElem = $items[0];
		const $lastElem = $items[2];
		const pathLength = $path.getTotalLength();
		$path.style.strokeDasharray = pathLength;
		$path.style.strokeDashoffset = pathLength;

		window.addEventListener('scroll', ()=> {
			const checkFirstOffset = (window.innerHeight/2 - $firstElem.getBoundingClientRect().height/3 - $firstElem.getBoundingClientRect().top) > 0;
			const checkLastOffset = ((window.innerHeight - $lastElem.getBoundingClientRect().height)/2 - $lastElem.getBoundingClientRect().top) < 0;
			$title.classList.toggle('visible', checkFirstOffset&&checkLastOffset);
			
			const pathScrollValue = window.innerHeight/2 - $path.parentNode.getBoundingClientRect().top;
			const scrollMoveHeight = $path.parentNode.getBoundingClientRect().height * 0.8;
			const percentage = Math.min(1, Math.max(0, pathScrollValue/scrollMoveHeight));
			const setVarValue = 100 - (percentage*100 + 50) + '%';
			
			$wrap.style.setProperty('--scroll-per', setVarValue);
			const drawLength = percentage * pathLength;
			$path.style.strokeDashoffset = pathLength - drawLength;
		});
	}
	return {
		init
	}
})()

function onDomReady() {
	OurPorjects.init();
	new MarqueeBrands('.brands-list-one');
	new MarqueeBrands('.brands-list-two');
	Creative.init()
}

document.addEventListener('DOMContentLoaded', onDomReady);
