$.getJSON('/public/rev-manifest.json', function (manifest) {
	var s = document.getElementsByTagName('script')[0];

	var assetPath = function (src) {
		src = 'js/' + src + '.js'
		return ['/assets', manifest[src]].join('/');
	};

	['lib', 'app'].forEach(function (src) {
		var el = document.createElement('script');
		el.async = true;
		el.src = assetPath(src);
		s.parentNode.insertBefore(el, s);
	});
})
