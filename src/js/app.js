window.addEventListener("DOMContentLoaded", () => {
	const notificationPanel = document.querySelector("#notification-panel");
	const year = document.querySelector(".year");
	const slidingPanel = document.querySelector("#sliding-panel");
	const buttonGotIt = document.querySelector(".button-notif-panel");
	const buttonClose = document.querySelector(".close");
	
	buttonGotIt.addEventListener("click", hideNotificationPanel);
	buttonClose.addEventListener("click", hideNewsletter);

	const getTimeLeft = localStorage.getItem("timeleft");
	const nowYear = new Date();
	let isHide = false;

	year.innerHTML = nowYear.getFullYear();
	
	console.log(getTimeLeft)
	if(getTimeLeft === null) {
		window.addEventListener("scroll", showNewsletter);
	}
	else {
		setTimeout(() => {
			const checkScrollPosition = scrollPosition();
			checkScrollPosition 
			? showNewsletter() 
			: window.addEventListener("scroll", showNewsletter);
			localStorage.clear();
		}, parseInt(getTimeLeft));
	}

	function hideNotificationPanel() {
		notificationPanel.style.maxHeight = "0px";
		notificationPanel.style.paddingTop = "0px";
		notificationPanel.style.paddingBottom = "0px";
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
		let delayTime = 600000;
		isHide = true;
		let countdown = setInterval(timeleft, 1000);
		
		slidingPanel.style.bottom = "-500px";
	
		function timeleft() {
			delayTime = delayTime - 1000;
			console.log(delayTime);
			localStorage.setItem("timeleft", delayTime);
			if(delayTime === 0) {
				clearInterval(countdown)
			}
		}
	
		setTimeout(function() {
			const checkScrollPosition = scrollPosition();
			isHide = false;
			if(checkScrollPosition) {
				slidingPanel.style.bottom = "0";
			}
		}, 600000);
	}

	function scrollPosition() {
		const scrollable = document.documentElement.scrollHeight / 3;
		const scrolled = window.scrollY;

		if(scrolled > scrollable) {
			return true
		}
		else {
			return false;
		}
	}
});