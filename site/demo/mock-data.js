/*
 * Sample data for the SEOLITY live demo (fictional shop «demo-shop.ir»).
 * Nothing here comes from a real site.
 */
(function ( w ) {
	var H = 'https://demo-shop.ir/';
	var day = 86400000;
	var now = Date.now();
	function ago( days, hours ) {
		var x = new Date( now - days * day - ( hours || 0 ) * 3600000 );
		return x.toISOString().slice( 0, 19 ).replace( 'T', ' ' );
	}
	function dstr( days ) {
		return new Date( now - days * day ).toISOString().slice( 0, 10 );
	}
	var seed = 7;
	function rnd() {
		seed = ( seed * 9301 + 49297 ) % 233280;
		return seed / 233280;
	}
	function series( n ) {
		var out = [];
		for ( var i = n; i >= 1; i-- ) {
			var k = ( n - i ) / n;
			var weekly = 1 + 0.12 * Math.sin( i / 7 * 2 * Math.PI );
			var clicks = Math.round( ( 300 + 240 * k + rnd() * 60 ) * weekly );
			var imp = Math.round( ( 9800 + 5200 * k + rnd() * 900 ) * weekly );
			out.push( { date: dstr( i ), clicks: clicks, impressions: imp, ctr: +( 100 * clicks / imp ).toFixed( 2 ), position: +( 14.8 - 4.9 * k + rnd() * 0.6 ).toFixed( 1 ) } );
		}
		return out;
	}
	var S = series( 90 );
	var P = [
		{ id: 101, title: 'کامبوچا چیست؟ خواص، طرز تهیه و عوارض', url: H + 'blog/kombucha/', type: 'post', words: 2140, clicks: 2890, imp: 61200, pos: 4.2, score: 86, kw: [ 'کامبوچا', 'خواص کامبوچا', 'طرز تهیه کامبوچا' ] },
		{ id: 102, title: 'خرید کامبوچای طبیعی با طعم زنجبیل', url: H + 'product/ginger-kombucha/', type: 'product', words: 410, clicks: 1640, imp: 22800, pos: 3.1, score: 78, kw: [ 'خرید کامبوچا', 'قیمت کامبوچا' ] },
		{ id: 103, title: 'کفیر آب یا کفیر شیر؟ مقایسهٔ کامل', url: H + 'blog/water-kefir-vs-milk-kefir/', type: 'post', words: 1680, clicks: 1210, imp: 30400, pos: 6.8, score: 71, kw: [ 'کفیر', 'کفیر آب', 'تفاوت کفیر آب و شیر' ] },
		{ id: 104, title: 'سرکه سیب خانگی ارگانیک با مادر سرکه', url: H + 'product/apple-cider-vinegar/', type: 'product', words: 290, clicks: 980, imp: 27100, pos: 8.4, score: 58, kw: [ 'سرکه سیب ارگانیک' ] },
		{ id: 105, title: 'راهنمای کامل تخمیر خانگی برای مبتدی‌ها', url: H + 'blog/home-fermentation-guide/', type: 'post', words: 3260, clicks: 870, imp: 19900, pos: 7.3, score: 81, kw: [ 'تخمیر خانگی', 'آموزش تخمیر' ] },
		{ id: 106, title: 'ترشی کیمچی کره‌ای اصل', url: H + 'product/kimchi/', type: 'product', words: 350, clicks: 760, imp: 14300, pos: 5.6, score: 66, kw: [ 'خرید کیمچی', 'کیمچی' ] },
		{ id: 107, title: 'پروبیوتیک چیست و چه غذاهایی پروبیوتیک دارند؟', url: H + 'blog/probiotics/', type: 'post', words: 1920, clicks: 640, imp: 28700, pos: 11.9, score: 62, kw: [ 'پروبیوتیک', 'غذاهای پروبیوتیک' ] },
		{ id: 108, title: 'خمیر ترش چیست؟ آموزش ساخت استارتر', url: H + 'blog/sourdough-starter/', type: 'post', words: 1540, clicks: 520, imp: 17600, pos: 9.7, score: 69, kw: [ 'خمیر ترش', 'استارتر خمیر ترش' ] },
		{ id: 109, title: 'اسکوبی کامبوچا (قارچ کامبوچا) زنده', url: H + 'product/scoby/', type: 'product', words: 180, clicks: 470, imp: 9800, pos: 6.2, score: 49, kw: [ 'خرید اسکوبی' ] },
		{ id: 110, title: 'طرز تهیه ماست پروبیوتیک خانگی', url: H + 'blog/homemade-probiotic-yogurt/', type: 'post', words: 1130, clicks: 390, imp: 12100, pos: 12.6, score: 55, kw: [ 'ماست پروبیوتیک' ] },
		{ id: 111, title: 'دانه کفیر آب زنده و فعال', url: H + 'product/water-kefir-grains/', type: 'product', words: 220, clicks: 350, imp: 7400, pos: 5.9, score: 52, kw: [ 'خرید دانه کفیر' ] },
		{ id: 112, title: 'خواص سرکه سیب برای لاغری؛ واقعیت یا شایعه؟', url: H + 'blog/apple-cider-vinegar-weight-loss/', type: 'post', words: 1410, clicks: 310, imp: 21500, pos: 14.2, score: 60, kw: [ 'سرکه سیب برای لاغری' ] }
	];
	var Q = [
		[ 'کامبوچا', 4.1, 1320, 24800 ], [ 'خرید کامبوچا', 2.8, 910, 9700 ], [ 'خواص کامبوچا', 5.4, 640, 15200 ], [ 'کفیر آب', 6.3, 480, 11300 ],
		[ 'سرکه سیب ارگانیک', 8.9, 350, 12800 ], [ 'تخمیر خانگی', 7.1, 330, 6900 ], [ 'خرید کیمچی', 4.7, 310, 5200 ], [ 'پروبیوتیک چیست', 12.4, 260, 14900 ],
		[ 'خمیر ترش', 9.8, 240, 9100 ], [ 'خرید اسکوبی', 5.2, 210, 3400 ], [ 'طرز تهیه کامبوچا', 3.6, 590, 8800 ], [ 'قیمت کامبوچا', 3.3, 280, 3900 ],
		[ 'ماست پروبیوتیک خانگی', 13.1, 150, 6200 ], [ 'دانه کفیر', 6.6, 190, 4100 ], [ 'سرکه سیب برای لاغری', 14.6, 170, 15700 ], [ 'عوارض کامبوچا', 7.7, 220, 7300 ]
	];

	w.DEMO = { H: H, ago: ago, dstr: dstr, S: S, P: P, Q: Q, rnd: rnd };
})( window );
