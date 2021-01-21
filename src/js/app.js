window.addEventListener("DOMContentLoaded", () => {
	const notificationPanel = document.querySelector(".wrap-notif");
	const year = document.querySelector(".year");
	const slidingPanel = document.querySelector("#sliding-panel");
	const buttonGotIt = document.querySelector(".button-notif-panel");
	const buttonClose = document.querySelector(".close");
	
	buttonGotIt.addEventListener("click", hideNotificationPanel);
	buttonClose.addEventListener("click", hideNewsletter);

	let isHide = false;
	const getTimeLeft = localStorage.getItem("timeleft");
	
	const nowYear = new Date();
	year.innerHTML = nowYear.getFullYear();
	
	if(getTimeLeft === null) {
		window.addEventListener("scroll", showNewsletter);
	}
	else {
		countdown(parseInt(getTimeLeft));

		setTimeout(() => {
			const checkScrollPosition = scrollPosition();
			checkScrollPosition ? showNewsletter() : window.addEventListener("scroll", showNewsletter);
			localStorage.clear();
		}, parseInt(getTimeLeft));
	}

	function hideNotificationPanel() {
		notificationPanel.style.maxHeight = "0px";
	}
	
	function showNewsletter() {
		const checkScrollPosition = scrollPosition();
		
		if(checkScrollPosition) {
			if(!isHide) {
				slidingPanel.style.bottom = "0";
			}
		}
	}
	
	function hideNewsletter() {
		let delayTime = 600_000; //* Convert minutes to miliseconds
		isHide = true;
		slidingPanel.style.bottom = "-500px";
		
		countdown(delayTime);
	
		setTimeout(function() {
			const checkScrollPosition = scrollPosition();
			isHide = false;
			if(checkScrollPosition) {
				slidingPanel.style.bottom = "0";
			}
		}, 600_000);
	}

	function scrollPosition() {
		const scrollable = Math.ceil(document.documentElement.clientHeight / 3);
		const docElement = document.documentElement.scrollTop;
		const body = document.body.scrollTop;

		if(docElement > scrollable || body > scrollable) {
			return true
		}
		else {
			return false;
		}
	}

	function countdown(delayTime) {
		let countdown = setInterval(timeleft, 1000);

		function timeleft() {
			delayTime = delayTime - 1000;
			localStorage.setItem("timeleft", delayTime);
			if(delayTime === 0) {
				clearInterval(countdown);
			}
		}
	}
});