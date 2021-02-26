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
			icon: 'https://picsum.photos/200',
			body: body,
		})

		notification.onclick = function () {
			window.location.href = 'https://picsum.photos/'
		}
		setTimeout(notification.close.bind(notification), 7000)
	}
}
