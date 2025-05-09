export class Footer {
	constructor() {
		this.$element = null
		this.$elemInner = null;
		this.$elemNav = null;
		this.$elemCopyright = null;
		this.$elemToggleButton = null;
		this.mobile = false;
	}

	init() {
		this.setElement();
		this.setEvent();
	}

	setEvent() {
		this.$elemToggleButton.addEventListener('click', () => {
			console.log(this.mobile)
			this.mobile && this.$element.classList.toggle('open');	
		})
	}
	
	setElement() {
		this.$element = document.getElementById('footer');
		this.$elemInner = this.$element.querySelector('.footer-inner')
		this.$elemNav = this.$element.querySelector('.footer-nav')
		this.$elemCopyright = this.$element.querySelector('.footer-copyright')
		this.$elemToggleButton = this.$element.querySelector('.footer-logo > a')
	}

	sizeChange(isMobile) {
		this.mobile = isMobile;
		const $target = !isMobile ? this.$elemInner.firstChild : this.$elemCopyright;
		this.$elemInner.insertBefore(this.$elemNav, $target);
		this.$element.classList.remove('open')
	}
}
export default Footer;