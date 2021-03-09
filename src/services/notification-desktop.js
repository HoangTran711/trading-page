export const onRequestPermission = () => {
	if (Notification.permission === 'granted') {
		console.log('Successful permission notification')
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission().then((permission) => {
			console.log(permission)
		})
	}
}
export function notifyMe(
	title = 'TITLE OF NOTIFICATION',
	body = 'Hey! You are on notice!'
) {
	if (!('Notification' in window)) {
		alert('This browser does not support system notifications')
	} else if (Notification.permission === 'granted') {
		notify()
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
			if (permission === 'granted') {
				notify()
			}
		})
	}

	function notify() {
		var notification = new Notification(title, {
			icon: '../assets/logo.png',
			body: body,
		})

		notification.onclick = function () {
			redirect_blank('https://pswap.app/')
		}
		setTimeout(notification.close.bind(notification), 7000)
	}
}
export function redirect_blank(url) {
	var a = document.createElement('a')
	a.target = '_blank'
	a.href = url
	a.click()
}
