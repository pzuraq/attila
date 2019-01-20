import '../sass/style.scss';

var body = document.querySelector('body');
var html = document.querySelector('html');
var viewport = window;

/* ==========================================================================
	 Menu
	 ========================================================================== */

function menu() {
	var menuElements = document.querySelectorAll('#menu, .menu-button, .hidden-close');
	menuElements.forEach(function(menuElement) {
		menuElement.addEventListener('click', function() {
			html.toggleClass('menu-active');
		})
	});
}
menu();

/* ==========================================================================
	 Parallax cover
	 ========================================================================== */

var cover = document.querySelector('.cover');
var coverPosition = 0;

function prlx() {
	if(cover.length >= 1) {
		var windowPosition = html.scrollTop;
		coverPosition = windowPosition > 0 ? Math.floor(windowPosition * 0.25) : 0;

		cover.style['-webkit-transform'] = 'translate3d(0, ' + coverPosition + 'px, 0)';
		cover.style['transform'] = 'translate3d(0, ' + coverPosition + 'px, 0)'

		if (html.scrollTop < cover.offsetHeight) {
			html.classList.add('cover-active');
		} else {
			html.classList.remove('cover-active');
		}
	}
}
prlx();

window.addEventListener('scroll', prlx);
window.addEventListener('resize', prlx);
window.addEventListener('orientationChange', prlx);

/* ==========================================================================
		Reading Progress
		========================================================================== */

var post = document.querySelector('.post-content');
var progressBar = document.querySelector('.progress-bar');
var progressContainer = document.querySelector('.progress-container');

function readingProgress() {
	if (post) {
		var postBottom = post.getBoundingClientRect().bottom;
		var windowBottom = html.scrollTop + html.offsetHeight;
		var progress = 100 - ((postBottom - windowBottom) / (postBottom - html.offsetHeight) * 100);

		progressBar.style['width'] = progress + '%';

		if (progress > 100) {
			progressContainer.classList.add('ready');
		} else {
			progressContainer.classList.remove('ready');
		}
	}
}
readingProgress();

window.addEventListener('scroll', readingProgress);
window.addEventListener('resize', readingProgress);
window.addEventListener('orientationChange', readingProgress);

/* ==========================================================================
		Gallery
		========================================================================== */

function gallery() {
	var images = document.querySelectorAll('.kg-gallery-image img');
	images.forEach(function (image) {
		var container = image.closest('.kg-gallery-image');
		var width = image.attributes.width.value;
		var height = image.attributes.height.value;
		var ratio = width / height;
		container.style.flex = ratio + ' 1 0%';
	});
}
gallery();

/* ==========================================================================
		Style code blocks with highlight and numbered lines
		========================================================================== */

function codestyling() {
	document.querySelectorAll('pre code').forEach(function(code) {
		hljs.highlightBlock(code);

		if (!code.classList.contains('language-text')) {
			var lines = code.innerHTML.split(/\n/).length;
			var numbers = [];

			for (i = 1; i < lines; i++) {
				numbers += '<span class="line">' + i + '</span>';
			}

			code.parentElement.innerHTML = '<div class="lines">' + numbers + '</div>';
		}
	});
}
codestyling();

/* ==========================================================================
		Responsive Videos with Fitvids
		========================================================================== */

function video() {
	reframe('iframe')
}
video();

/* ==========================================================================
	 Initialize and load Disqus
	 ========================================================================== */

disqus = 'pzuraq';

if (typeof disqus === 'undefined') {
	document.querySelector('.post-comments').style['display'] = 'none';
} else {
	document.querySelector('#show-disqus').addEventListener('click', function() {
		var script = document.createElement('script');
		script.async = true;
		script.src = '//' + disqus + '.disqus.com/embed.js';
		document.body.appendChild(script);
	});
}
