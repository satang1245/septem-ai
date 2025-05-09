export class Header {
	constructor() {
		this.$element = null
		this.$elemHamberger = null
	}

	init() {
		this.setElement();
		this.setEvent();
	}

	setEvent() {
		this.$elemHamberger.addEventListener('click', () => {
			this.$element.classList.toggle('open')
		})
	}
	
	setElement() {
		this.$element = document.getElementById('header')
		this.$elemHamberger = this.$element.querySelector('#hamburger > button')
	}

	sizeChange() {
		this.$element.classList.remove('open')
	}
}
export default Header;