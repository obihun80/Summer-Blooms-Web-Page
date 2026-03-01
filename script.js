document.addEventListener('DOMContentLoaded', function () {
	// Set current year in footer
	var yearSpan = document.getElementById('y');
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}

	var messageField = document.getElementById('cf-message');
	var counter = document.getElementById('cf-counter');
	if (messageField && counter) {
		var maxChars = 2000;

		function updateCharCount() {
			if (messageField.value.length > maxChars) {
				messageField.value = messageField.value.slice(0, maxChars);
			}

			var count = messageField.value.length;
			counter.textContent = count + ' / ' + maxChars;
			counter.classList.toggle('limit-reached', count >= maxChars);
		}

		messageField.setAttribute('maxlength', String(maxChars));
		messageField.addEventListener('input', updateCharCount);
		updateCharCount();
	}

	var menuBtn = document.getElementById('menuBtn');
	var drawer = document.getElementById('mobile-drawer');

	if (menuBtn && drawer) {
		function setOpen(open) {
			menuBtn.setAttribute('aria-expanded', String(!!open));
			drawer.setAttribute('data-open', open ? 'true' : 'false');
			drawer.setAttribute('aria-hidden', String(!open));
		}

		menuBtn.addEventListener('click', function () {
			var isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
			setOpen(!isOpen);
		});

		Array.prototype.forEach.call(drawer.querySelectorAll('a'), function (a) {
			a.addEventListener('click', function () { setOpen(false); });
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') setOpen(false);
		});

		var mq = window.matchMedia('(min-width: 901px)');
		if (mq && mq.addEventListener) {
			mq.addEventListener('change', function (e) { if (e.matches) setOpen(false); });
		} else if (mq && mq.addListener) {
			mq.addListener(function (e) { if (e.matches) setOpen(false); });
		}

		// collapse drawer when clicking outside the header area
		document.addEventListener('click', function (e) {
			if (menuBtn.getAttribute('aria-expanded') === 'true' && !e.target.closest('.site-header')) {
				setOpen(false);
			}
		});
	}

});

