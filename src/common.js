import '@font/Pretendard/pretendardvariable.css';
import '@font/Montserrat/montserratvariable.css';
import '@scss/style.scss';

import Header from '@js/Header.js';
import Footer from '@js/footer.js';

let prevMode = null;
const oHeader = new Header();
const oFooter = new Footer();

function checkMobile() {
	let thisMode = window.innerWidth < 768;
	if ( prevMode != thisMode ) {
		prevMode = thisMode;
		document.documentElement.classList.toggle('mobile', (window.innerWidth < 768));

		// Header & Footer
		oHeader.sizeChange();
		oFooter.sizeChange(thisMode);
	}
}

function domReadyEventHandler() {
	oHeader.init();
	oFooter.init();
	checkMobile();
}
function windowResizeEventHandler() {
	checkMobile();
}
window.addEventListener('resize', windowResizeEventHandler);
document.addEventListener('DOMContentLoaded', domReadyEventHandler);

