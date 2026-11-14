/*
 * SEOLITY live demo — a tiny in-browser stand-in for the plugin's REST API (seolity/v1).
 * The real admin app (assets/admin/*.js) runs unchanged; every request it sends with fetch()
 * is answered here from sample data. Nothing is sent to a server and nothing is saved.
 */
(function ( w ) {
	var ROOT = w.SEOLITY.root;
	var D = w.DEMO;
	var H = D.H, ago = D.ago, P = D.P, Q = D.Q, S = D.S;
	var routes = [];
	w.__calls = [];
	function on( method, re, fn ) {
		routes.push( [ method, re, fn ] );
	}
	function get( path, fn ) {
		on( 'GET', new RegExp( '^' + path + '$' ), fn );
	}
	function post( path, fn ) {
		on( 'POST', new RegExp( '^' + path + '$' ), fn );
	}
	var real = w.fetch;
	w.fetch = function ( url, opts ) {
		url = String( url );
		if ( url.indexOf( ROOT ) !== 0 ) {
			return real ? real.apply( w, arguments ) : Promise.reject( new Error( 'offline' ) );
		}
		opts = opts || {};
		var m = ( opts.method || 'GET' ).toUpperCase();
		var p = url.slice( ROOT.length );
		var path = p.split( '?' )[ 0 ].replace( /\/$/, '' );
		var q = {};
		( p.split( '?' )[ 1 ] || '' ).split( '&' ).forEach( function ( kv ) {
			if ( kv ) {
				var a = kv.split( '=' );
				q[ decodeURIComponent( a[ 0 ] ) ] = decodeURIComponent( a[ 1 ] || '' );
			}
		} );
		var body = null;
		try {
			body = typeof opts.body === 'string' ? JSON.parse( opts.body ) : null;
		} catch ( e ) {}
		var out, hit = false;
		for ( var i = 0; i < routes.length; i++ ) {
			var r = routes[ i ];
			if ( r[ 0 ] === '*' || r[ 0 ] === m ) {
				var mm = path.match( r[ 1 ] );
				if ( mm ) {
					out = typeof r[ 2 ] === 'function' ? r[ 2 ]( mm, q, body || {} ) : r[ 2 ];
					hit = true;
					break;
				}
			}
		}
		w.__calls.push( ( hit ? 'OK ' : 'MISS ' ) + m + ' ' + path );
		var status = 200;
		if ( ! hit ) {
			if ( 'GET' === m ) {
				out = { items: [], total: 0, pages: 1 };
			} else {
				// Not part of the demo: answer like the real API does on an error, so the app shows the message.
				status = 403;
				out = { code: 'seolity_demo', message: 'این دکمه در نسخهٔ نمایشی غیرفعال است. در افزونهٔ واقعی، هوش مصنوعی کار را آماده می‌کند، پیش‌نمایش نشان می‌دهد و فقط با تأیید شما روی سایت اعمال می‌شود.' };
			}
		}
		var txt = JSON.stringify( out === undefined ? null : out );
		var delay = 'GET' === m ? 120 : ( /^chat$/.test( path ) ? 900 : 350 );
		return new Promise( function ( resolve ) {
			setTimeout( function () {
				resolve( { ok: status < 400, status: status, statusText: status < 400 ? 'OK' : 'Demo', text: function () {
					return Promise.resolve( txt );
				}, json: function () {
					return Promise.resolve( JSON.parse( txt ) );
				} } );
			}, w.__DEMO_NO_DELAY ? 0 : delay );
		} );
	};
	function page( list, q ) {
		var per = +q.per_page || 20;
		var pg = +q.page || 1;
		return { items: list.slice( ( pg - 1 ) * per, pg * per ), total: list.length, per_page: per, page: pg, pages: Math.ceil( list.length / per ) };
	}
	function sum( days, key ) {
		return S.slice( -days ).reduce( function ( a, r ) {
			return a + r[ key ];
		}, 0 );
	}
	function period( days ) {
		var cur = S.slice( -days ), prev = S.slice( -2 * days, -days );
		var agg = function ( rows ) {
			var c = 0, i = 0, pz = 0;
			rows.forEach( function ( r ) {
				c += r.clicks;
				i += r.impressions;
				pz += r.position;
			} );
			return { clicks: c, impressions: i, ctr: +( 100 * c / i ).toFixed( 2 ), position: +( pz / rows.length ).toFixed( 1 ) };
		};
		var a = agg( cur ), b = agg( prev );
		var pc = function ( x, y ) {
			return y ? +( 100 * ( x - y ) / y ).toFixed( 1 ) : 0;
		};
		return { has_data: true, period: { days: days, start: cur[ 0 ].date, end: cur[ cur.length - 1 ].date }, current: a, previous: b, delta: { clicks: pc( a.clicks, b.clicks ), impressions: pc( a.impressions, b.impressions ), ctr: pc( a.ctr, b.ctr ), position: +( a.position - b.position ).toFixed( 1 ) }, series: S };
	}

	/* ------------------------------------------------------------ shell */
	var AI = { ready: true, status: 'verified', label: 'اشتراک Claude (Pro/Max)', model: 'sonnet', id: 'sub_claude', route: 'github', reason: '' };
	get( 'bootstrap', function () {
		return { version: '1.19.2', brand: { name: 'SEOLITY', logo: '', color: '#1D4ED8' }, caps: { view: true, ai: true, apply: true, manage: true }, user: { id: 1, name: 'مدیر دمو' }, ai_ready: true, ai_label: AI.label, ai_state: AI, gsc_property: 'sc-domain:demo-shop.ir', gsc: true, github: { token: true, login: 'demo-user' }, cloudflare: true, region: 'iran', region_set: true, route: 'github', subscription: true, woo: true, serp: true, engine: 'rankmath', mode: 'manual', unread_alerts: 5, pending_changes: 4, home: H, admin: '#' };
	} );
	post( 'ai/warm', { ok: true } );

	var RECS = [
		{ id: 1, priority: 'critical', title: 'مقالهٔ «پروبیوتیک چیست» در جایگاه ۱۲ مانده؛ عنوان و سرتیترها با جست‌وجوی واقعی هم‌خوان نیست', reason: '۱۴٬۹۰۰ نمایش در ۲۸ روز با CTR فقط ۱٫۷٪. کوئری اصلی «پروبیوتیک چیست» در عنوان نیست.', impact: 9, effort: 2, confidence: 88, url: P[ 6 ].url, category: 'on-page' },
		{ id: 2, priority: 'high', title: 'دو مقاله روی «سرکه سیب» با هم رقابت می‌کنند (هم‌نوع‌خواری)', reason: 'گوگل در ۹ روز از ۲۸ روز، صفحهٔ نمایش‌داده‌شده را بین این دو عوض کرده است.', impact: 8, effort: 4, confidence: 81, url: P[ 11 ].url, category: 'duplicates' },
		{ id: 3, priority: 'high', title: '۳۸ تصویر محصول متن جایگزین (ALT) ندارند', reason: 'تصاویر محصول بدون ALT در جست‌وجوی تصویر گوگل دیده نمی‌شوند.', impact: 6, effort: 1, confidence: 93, url: H + 'product/scoby/', category: 'images' },
		{ id: 4, priority: 'medium', title: 'صفحهٔ محصول «اسکوبی» فقط ۱۸۰ کلمه توضیح دارد', reason: 'رقبای صفحهٔ اول به‌طور میانگین ۶۲۰ کلمه و بخش پرسش‌های متداول دارند.', impact: 6, effort: 3, confidence: 76, url: P[ 8 ].url, category: 'products' },
		{ id: 5, priority: 'medium', title: '۷ صفحهٔ مهم کمتر از ۲ لینک داخلی دارند', reason: 'صفحه‌هایی که از داخل سایت لینک نمی‌گیرند دیرتر خزیده و ضعیف‌تر رتبه می‌گیرند.', impact: 5, effort: 2, confidence: 84, url: P[ 9 ].url, category: 'links' },
		{ id: 6, priority: 'low', title: 'اسکیمای FAQ برای ۴ مقالهٔ پرسش‌محور اضافه شود', reason: 'این صفحه‌ها بخش پرسش‌وپاسخ دارند اما دادهٔ ساختاریافته ندارند.', impact: 3, effort: 1, confidence: 70, url: P[ 0 ].url, category: 'schema' }
	];
	var BRIEF = { period_start: ago( 0 ), data: { briefing: {
		headline: 'هفتهٔ خوبی بود: کلیک‌ها ۱۸٪ بالاتر و «خرید کامبوچا» به جایگاه ۳ رسید',
		summary: 'کلیک ارگانیک نسبت به هفتهٔ قبل رشد کرده و بیشتر آن از صفحهٔ محصول کامبوچای زنجبیلی آمده است. دو مورد نیاز به توجه دارد: افت مقالهٔ پروبیوتیک و هم‌نوع‌خواری مقاله‌های سرکه سیب.',
		highlights: [
			{ type: 'win', title: '«خرید کامبوچا» از جایگاه ۴٫۶ به ۲٫۸ رسید', detail: 'نتیجهٔ بازنویسی عنوان و توضیحات متا در ۱۲ روز پیش.' },
			{ type: 'win', title: 'مقالهٔ راهنمای تخمیر خانگی ۳۱٪ کلیک بیشتر گرفت', detail: 'پس از افزودن ۶ لینک داخلی از مقاله‌های مرتبط.' },
			{ type: 'loss', title: 'مقالهٔ «پروبیوتیک چیست» ۲٫۳ پله افت کرد', detail: 'یک رقیب مقالهٔ تازه‌ای با جدول مقایسه منتشر کرده است.' },
			{ type: 'risk', title: '۳ نشانی ۴۰۴ تازه از لینک‌های داخلی', detail: 'هر سه پس از تغییر نامک دستهٔ «نوشیدنی‌ها» ایجاد شده‌اند.' },
			{ type: 'info', title: 'گوگل ۴ مقالهٔ تازه را ایندکس کرد', detail: 'میانگین زمان ایندکس: ۲ روز.' }
		],
		actions: [
			{ priority: 'critical', title: 'عنوان و H1 مقالهٔ پروبیوتیک را اصلاح کنید', reason: 'بیشترین نمایش با کمترین نرخ کلیک.' },
			{ priority: 'high', title: 'دو مقالهٔ سرکه سیب را ادغام کنید', reason: 'پیش‌نمایش ادغام در «مقالات تکراری» آماده است.' },
			{ priority: 'medium', title: 'برای ۳ نشانی ۴۰۴ ریدایرکت ۳۰۱ بسازید', reason: 'مقصد پیشنهادی برای هر سه پیدا شده است.' }
		]
	} } };
	get( 'dashboard', function () {
		var g = period( 28 );
		return {
			health: { score: 78 }, audit: { id: 12, status: 'done', finished_at: ago( 1, 3 ), urls_done: 412 },
			indexed: { crawled: 412, indexable: 368 },
			gsc: g,
			action: { counts: { critical: 2, high: 7, medium: 14, low: 9 }, today: RECS },
			briefing: BRIEF,
			errors: [ { severity: 'critical', c: 2 }, { severity: 'high', c: 11 }, { severity: 'medium', c: 34 }, { severity: 'low', c: 52 } ],
			experiments: { running: 6, positive: 14, negative: 2, neutral: 5 },
			ai_actions: { applied_30d: 47, pending: 4 },
			alerts: [
				{ severity: 'high', title: 'افت ۲٫۳ پله‌ای مقالهٔ «پروبیوتیک چیست»' },
				{ severity: 'medium', title: '۳ نشانی ۴۰۴ تازه از لینک داخلی' },
				{ severity: 'low', title: 'نتیجهٔ ۲۸ روزهٔ تغییر عنوان «خرید کامبوچا»: مثبت (+۴۲٪ کلیک)' },
				{ severity: 'low', title: 'رقیب kombucha-land.ir هفت صفحهٔ تازه منتشر کرد' }
			],
			competitors: [
				{ name: 'کامبوچالند', pages: 214, new_pages: 7, last: ago( 2 ) },
				{ name: 'تخمیرکده', pages: 131, new_pages: 2, last: ago( 2 ) },
				{ name: 'ارگانیک‌مارکت', pages: 486, new_pages: 12, last: ago( 5 ) }
			]
		};
	} );
	get( 'recommendations/\\d+/why', function () {
		return { explanation: 'این پیشنهاد از ترکیب سه منبع ساخته شده است: دادهٔ ۲۸ روز اخیر سرچ کنسول (نمایش زیاد، نرخ کلیک پایین)، آخرین خزش سایت (عنوان و H1 فعلی) و مقایسه با سه نتیجهٔ اول گوگل برای همین جست‌وجو.', evidence: [ 'نمایش ۲۸ روز: ۱۴٬۹۰۰ — نرخ کلیک ۱٫۷٪ (میانگین مورد انتظار در این جایگاه: ۳٫۱٪)', 'کوئری اصلی در عنوان صفحه وجود ندارد', 'دو رقیب بالاتر، جدول مقایسه و بخش پرسش‌های متداول دارند' ], data: {}, steps: [ 'عنوان را با کوئری اصلی شروع کنید', 'یک جدول مقایسه اضافه کنید', 'سه پرسش پرتکرار را در انتهای مقاله پاسخ دهید' ] };
	} );

	/* ------------------------------------------------------------ activity */
	var ACT = [
		{ id: 9, kind: 'chat', status: 'done', title: 'پاسخ چت: «چرا مقالهٔ پروبیوتیک افت کرده؟»', route: 'github', detail: 'اشتراک Claude · ۴ ابزار داده', user: 'مدیر دمو', user_id: 1, ms: 41200, created: ago( 0, 1 ), started: ago( 0, 1 ) },
		{ id: 8, kind: 'agent', status: 'waiting', title: 'لینک‌سازی داخلی برای «ماست پروبیوتیک خانگی» — منتظر تأیید شما', route: 'github', detail: '۵ لینک پیشنهادی از مقاله‌های مرتبط', user: 'مدیر دمو', user_id: 1, ms: 58300, created: ago( 0, 2 ), started: ago( 0, 2 ) },
		{ id: 7, kind: 'ai', status: 'done', title: 'تولید ALT برای ۱۲ تصویر محصول', route: 'github', detail: 'task image_alt@1.2', user: '', user_id: 0, ms: 36900, created: ago( 0, 3 ), started: ago( 0, 3 ) },
		{ id: 6, kind: 'job', status: 'done', title: 'همگام‌سازی روزانهٔ سرچ کنسول', route: 'cloudflare', detail: '۲٬۸۴۰ ردیف صفحه × کوئری', user: '', user_id: 0, ms: 8400, created: ago( 0, 6 ), started: ago( 0, 6 ) },
		{ id: 5, kind: 'job', status: 'done', title: 'خزش شبانه و ممیزی سایت', route: 'direct', detail: '۴۱۲ نشانی · ۹۹ مشکل باز', user: '', user_id: 0, ms: 214000, created: ago( 0, 8 ), started: ago( 0, 8 ) },
		{ id: 4, kind: 'edit', status: 'done', title: 'بهینه‌سازی عنوان و توضیحات متا: «خرید کامبوچای طبیعی»', route: 'github', detail: 'امتیاز ۶۴ ← ۷۸ · اعمال و راستی‌آزمایی شد', user: 'مدیر دمو', user_id: 1, ms: 47100, created: ago( 1, 2 ), started: ago( 1, 2 ) },
		{ id: 3, kind: 'change', status: 'done', title: 'ریدایرکت ۳۰۱ ساخته شد: /category/drinks/ ← /category/beverages/', route: 'direct', detail: 'راستی‌آزمایی زنده: ۳۰۱ → ۲۰۰', user: 'مدیر دمو', user_id: 1, ms: 900, created: ago( 1, 5 ), started: ago( 1, 5 ) },
		{ id: 2, kind: 'ai', status: 'failed', title: 'تحلیل رقیب organic-market.ir', route: 'github', detail: 'مهلت پاسخ تمام شد؛ دوباره در صف قرار گرفت', user: '', user_id: 0, ms: 180000, created: ago( 2, 1 ), started: ago( 2, 1 ) },
		{ id: 1, kind: 'event', status: 'info', title: 'پایگاه دانش سئو به‌روز شد (۴۹ سند)', route: 'direct', detail: 'بازار: ایران', user: '', user_id: 0, ms: 0, created: ago( 3 ), started: ago( 3 ) }
	];
	get( 'activity/live', function () {
		return { counts: { running: 0, waiting: 1, queued: 0, failed: 0 }, queue: { pending: 0 }, items: ACT.slice( 0, 6 ) };
	} );
	get( 'activity', function ( m, q ) {
		return page( ACT, q );
	} );

	/* ------------------------------------------------------------ alerts */
	var ALERTS = [
		{ id: 21, kind: 'warning', severity: 'high', status: 'new', title: 'افت جایگاه: «پروبیوتیک چیست» از ۱۰٫۱ به ۱۲٫۴', message: 'در ۷ روز اخیر این صفحه ۲٫۳ پله پایین آمده و ۲۱٪ کلیک کمتر گرفته است. یک رقیب مقالهٔ تازه‌ای با جدول مقایسه منتشر کرده است.', created_at: ago( 0, 2 ), notified: 1, data: { url: P[ 6 ].url, links: [ { title: 'برنامهٔ رسیدن به رتبه ۱', url: '#/rank1' } ] } },
		{ id: 20, kind: 'warning', severity: 'medium', status: 'new', title: '۳ نشانی ۴۰۴ تازه که از داخل سایت لینک دارند', message: 'پس از تغییر نامک دستهٔ «نوشیدنی‌ها» سه نشانی قدیمی خطای ۴۰۴ می‌دهند. برای هر سه مقصد پیشنهادی آماده است.', created_at: ago( 0, 7 ), notified: 1, data: { links: [ { title: 'پایشگر ۴۰۴', url: '#/404' } ] } },
		{ id: 19, kind: 'result', severity: 'low', status: 'new', title: 'نتیجهٔ ۲۸ روزه: تغییر عنوان «خرید کامبوچا» مثبت بود', message: 'بازهٔ برابر قبل و بعد از تغییر، با اصلاح روند کل سایت: کلیک +۴۲٪، نرخ کلیک از ۶٫۱٪ به ۸٫۴٪، جایگاه ۴٫۶ ← ۲٫۸. اطمینان: بالا.', created_at: ago( 1, 3 ), notified: 1, data: { url: P[ 1 ].url, links: [ { title: 'آزمایش‌ها', url: '#/experiments' } ] } },
		{ id: 18, kind: 'success', severity: 'low', status: 'new', title: 'خبر خوب: «طرز تهیه کامبوچا» وارد ۳ نتیجهٔ اول شد', message: 'این جست‌وجو اکنون در جایگاه ۳٫۶ است (۲۸ روز پیش: ۵٫۹).', created_at: ago( 1, 9 ), notified: 1, data: { url: P[ 0 ].url } },
		{ id: 17, kind: 'ai', severity: 'low', status: 'new', title: 'پیام هوش مصنوعی: یادآوری پیگیری رپورتاژ ماه قبل', message: 'یک ماه از انتشار رپورتاژ «خواص کامبوچا» گذشته است. دو کوئری هدف به‌طور میانگین ۱٫۸ پله بهتر شده‌اند؛ جزئیات در پیگیری‌ها.', created_at: ago( 2, 4 ), notified: 0, data: {} },
		{ id: 16, kind: 'warning', severity: 'medium', status: 'read', title: 'دلیل تازه در گزارش ایندکس: «صفحهٔ دارای ریدایرکت»', message: 'پایش روزانهٔ ایندکس، ۴ نشانی از نقشهٔ سایت را پیدا کرد که ریدایرکت می‌شوند — معمولاً پیش از ایمیل خود سرچ کنسول.', created_at: ago( 4, 2 ), notified: 1, data: { links: [ { title: 'پوشش ایندکس', url: '#/coverage' } ] } },
		{ id: 15, kind: 'info', severity: 'low', status: 'read', title: 'رقیب کامبوچالند ۷ صفحهٔ تازه منتشر کرد', message: 'سه مورد دربارهٔ موضوع‌هایی است که شما هنوز محتوایی برایشان ندارید.', created_at: ago( 5, 1 ), notified: 0, data: { links: [ { title: 'رقبا', url: '#/competitors' } ] } },
		{ id: 14, kind: 'info', severity: 'low', status: 'read', title: 'گزارش هفتگی سئو آماده است', message: 'خلاصهٔ هفته به ایمیل دو گیرنده فرستاده شد.', created_at: ago( 6, 0 ), notified: 1, data: { links: [ { title: 'گزارش‌ها', url: '#/reports' } ] } }
	];
	get( 'alerts', function ( m, q ) {
		var list = ALERTS.filter( function ( a ) {
			return ( ! q.kind || a.kind === q.kind ) && ( ! q.status || a.status === q.status );
		} );
		var out = page( list, q );
		out.unread_by_kind = { warning: 2, result: 1, success: 1, ai: 1, info: 0 };
		out.unread = 5;
		out.email = { mode: 'digest', to: [ 'owner@demo-shop.ir', 'seo@demo-shop.ir' ], kinds: [ 'warning', 'result', 'success', 'ai' ], last: { ok: true, at: ago( 0, 6 ), error: '' } };
		return out;
	} );

	get( 'alerts/mail', function () {
		return { enabled: true, recipients: [ 'owner@demo-shop.ir', 'seo@demo-shop.ir' ], mode: 'digest', kinds: [ 'warning', 'result', 'success', 'ai' ], last: { ok: true, time: ago( 0, 6 ), error: '' } };
	} );

	/* ------------------------------------------------------------ changes / operations / experiments */
	var CH = [
		{ id: 41, object_type: 'post', object_id: 107, label: P[ 6 ].title, field: 'title', before_value: 'پروبیوتیک؛ هر آنچه باید بدانید', after_value: 'پروبیوتیک چیست؟ فواید، منابع غذایی و بهترین زمان مصرف', risk: 'low', status: 'pending', source: 'ai_optimizer', score_before: 62, score_after: 79, applied_at: null, created_at: ago( 0, 2 ), reason: 'کوئری اصلی «پروبیوتیک چیست» با ۱۴٬۹۰۰ نمایش در عنوان فعلی نیست.', batch_id: '' },
		{ id: 40, object_type: 'post', object_id: 107, label: P[ 6 ].title, field: 'meta_description', before_value: '', after_value: 'پروبیوتیک چیست و در چه غذاهایی پیدا می‌شود؟ فهرست ۱۲ منبع طبیعی، بهترین زمان مصرف و نکات ایمنی به زبان ساده.', risk: 'low', status: 'pending', source: 'ai_optimizer', score_before: 62, score_after: 79, applied_at: null, created_at: ago( 0, 2 ), reason: 'این صفحه توضیحات متا ندارد.', batch_id: '' },
		{ id: 39, object_type: 'product', object_id: 109, label: P[ 8 ].title, field: 'image_alt', before_value: 'IMG_2231', after_value: 'اسکوبی زندهٔ کامبوچا در شیشهٔ یک‌لیتری', risk: 'low', status: 'pending', source: 'bulk', score_before: 49, score_after: 55, applied_at: null, created_at: ago( 0, 3 ), reason: 'نام فایل به‌جای متن جایگزین استفاده شده است.', batch_id: 'b-204' },
		{ id: 38, object_type: 'post', object_id: 110, label: P[ 9 ].title, field: 'internal_links', before_value: '۱ لینک داخلی ورودی', after_value: '۶ لینک داخلی ورودی (۵ لینک تازه از مقاله‌های مرتبط)', risk: 'medium', status: 'pending', source: 'agent', score_before: 55, score_after: 63, applied_at: null, created_at: ago( 0, 2 ), reason: 'صفحه تقریباً یتیم است.', batch_id: '' },
		{ id: 37, object_type: 'product', object_id: 102, label: P[ 1 ].title, field: 'title', before_value: 'کامبوچا زنجبیلی', after_value: 'خرید کامبوچای طبیعی با طعم زنجبیل | ارسال یخچالی', risk: 'low', status: 'applied', source: 'ai_optimizer', score_before: 64, score_after: 78, applied_at: ago( 12 ), created_at: ago( 12 ), reason: '', batch_id: '' },
		{ id: 36, object_type: 'post', object_id: 105, label: P[ 4 ].title, field: 'internal_links', before_value: '۳ لینک داخلی ورودی', after_value: '۹ لینک داخلی ورودی', risk: 'medium', status: 'applied', source: 'agent', score_before: 74, score_after: 81, applied_at: ago( 16 ), created_at: ago( 16 ), reason: '', batch_id: '' },
		{ id: 35, object_type: 'post', object_id: 103, label: P[ 2 ].title, field: 'post_content', before_value: '۱٬۲۱۰ کلمه', after_value: '۱٬۶۸۰ کلمه + جدول مقایسه + ۴ پرسش متداول', risk: 'high', status: 'applied', source: 'ai_optimizer', score_before: 58, score_after: 71, applied_at: ago( 19 ), created_at: ago( 19 ), reason: '', batch_id: '' },
		{ id: 34, object_type: 'post', object_id: 112, label: P[ 11 ].title, field: 'title', before_value: 'سرکه سیب و لاغری', after_value: 'سرکه سیب برای لاغری: معجزه یا دروغ؟', risk: 'low', status: 'rolled_back', source: 'ai_optimizer', score_before: 57, score_after: 60, applied_at: ago( 40 ), created_at: ago( 40 ), reason: '', batch_id: '' }
	];
	get( 'changes', function ( m, q ) {
		return page( CH.filter( function ( c ) {
			return ! q.status || c.status === q.status;
		} ), q );
	} );
	get( 'changes/\\d+', function ( m ) {
		return CH[ 0 ];
	} );
	var EXP = [
		{ id: 9, name: 'بازنویسی عنوان و متا — خرید کامبوچا', change_type: 'title', url: P[ 1 ].url, status: 'completed', outcome: 'positive', confidence: 91, reason: 'کلیک +۴۲٪ پس از اصلاح روند کل سایت؛ نرخ کلیک ۶٫۱٪ ← ۸٫۴٪.', started_at: ago( 40 ), metrics_before: { page: { position: 4.6 } }, metrics_after: { page: { position: 2.8 }, deltas: { ctr: 37.7, clicks: 42.1, impressions: 6.2 }, queries: [ { query: 'خرید کامبوچا', position_before: 4.6, position_after: 2.8, change: 1.8 }, { query: 'قیمت کامبوچا', position_before: 5.1, position_after: 3.3, change: 1.8 } ] } },
		{ id: 8, name: 'افزودن ۶ لینک داخلی — راهنمای تخمیر خانگی', change_type: 'internal_links', url: P[ 4 ].url, status: 'completed', outcome: 'positive', confidence: 78, reason: 'جایگاه ۹٫۲ ← ۷٫۳ و ۳۱٪ کلیک بیشتر.', started_at: ago( 44 ), metrics_before: { page: { position: 9.2 } }, metrics_after: { page: { position: 7.3 }, deltas: { ctr: 9.4, clicks: 31.0, impressions: 18.3 }, queries: [ { query: 'تخمیر خانگی', position_before: 9.4, position_after: 7.1, change: 2.3 } ] } },
		{ id: 7, name: 'گسترش محتوا و جدول مقایسه — کفیر آب یا شیر', change_type: 'content', url: P[ 2 ].url, status: 'running', outcome: '', confidence: 0, reason: 'نتیجهٔ روز ۱۴: مثبتِ زودهنگام؛ نتیجهٔ اصلی روز ۲۸ اعلام می‌شود.', started_at: ago( 19 ), metrics_before: { page: { position: 8.1 } }, metrics_after: { page: { position: 6.8 }, deltas: { ctr: 4.1, clicks: 14.6, impressions: 9.9 }, queries: [ { query: 'کفیر آب', position_before: 7.9, position_after: 6.3, change: 1.6 } ] } },
		{ id: 6, name: 'تغییر عنوان — سرکه سیب برای لاغری', change_type: 'title', url: P[ 11 ].url, status: 'completed', outcome: 'negative', confidence: 72, reason: 'نرخ کلیک ۱۸٪ کم شد؛ تغییر برگردانده شد و در سابقهٔ سایت ثبت شد: «عنوان‌های پرسشیِ اغراق‌آمیز در این سایت جواب نمی‌دهد».', started_at: ago( 68 ), metrics_before: { page: { position: 13.8 } }, metrics_after: { page: { position: 14.2 }, deltas: { ctr: -18.2, clicks: -15.4, impressions: 2.1 }, queries: [ { query: 'سرکه سیب برای لاغری', position_before: 13.9, position_after: 14.6, change: -0.7 } ] } },
		{ id: 5, name: 'افزودن اسکیمای FAQ — کامبوچا چیست', change_type: 'schema', url: P[ 0 ].url, status: 'completed', outcome: 'neutral', confidence: 64, reason: 'تغییر معناداری نسبت به روند کل سایت دیده نشد.', started_at: ago( 75 ), metrics_before: { page: { position: 4.4 } }, metrics_after: { page: { position: 4.2 }, deltas: { ctr: 1.2, clicks: 2.8, impressions: 1.9 }, queries: [] } }
	];
	get( 'experiments', function ( m, q ) {
		var o = page( EXP, q );
		o.stats = { running: 6, positive: 14, negative: 2, neutral: 5, inconclusive: 3 };
		return o;
	} );
	get( 'brain', function () {
		return {
			thought_at: ago( 1 ),
			observations: [
				{ kind: 'good', text: 'عنوان‌هایی که با «خرید + نام محصول» شروع می‌شوند در این سایت به‌طور میانگین ۳۴٪ نرخ کلیک بیشتری گرفته‌اند (۵ آزمایش).', confidence: 86 },
				{ kind: 'good', text: 'افزودن ۵ لینک داخلی یا بیشتر به مقاله‌های جایگاه ۷ تا ۱۲، در ۴ مورد از ۵ مورد جایگاه را بهتر کرده است.', confidence: 78 },
				{ kind: 'bad', text: 'عنوان‌های پرسشیِ اغراق‌آمیز («معجزه یا دروغ؟») نرخ کلیک را کم کرده‌اند (۲ آزمایش).', confidence: 71 },
				{ kind: 'info', text: 'اسکیمای FAQ روی جایگاه اثر معناداری نداشته است؛ فقط برای پوشش پرسش‌ها ارزش دارد.', confidence: 60 }
			],
			ai: {
				summary: 'این سایت بیشتر از بهبود صفحه‌های محصول و لینک‌سازی داخلی نتیجه می‌گیرد تا از تولید مقالهٔ تازه. مخاطبان با عنوان‌های شفاف و خریدمحور بهتر ارتباط می‌گیرند.',
				wins: [ 'عنوان‌های خریدمحور برای محصول‌ها', 'لینک داخلی از مقاله به محصول', 'جدول مقایسه در مقاله‌های «الف یا ب»' ],
				beliefs: [
					{ belief: 'صفحه‌های محصول کوتاه (زیر ۳۰۰ کلمه) سقف جایگاه ۵ دارند.', confidence: 74, evidence: '۶ محصول زیر ۳۰۰ کلمه؛ هیچ‌کدام بالاتر از ۵ نیست.', implication: 'توضیحات ۴ محصول پرفروش تا ۶۰۰ کلمه گسترش یابد.' },
					{ belief: 'مقاله‌های آموزشی بدون لینک به محصول، فروش نمی‌سازند.', confidence: 68, evidence: 'مقاله‌های دارای لینک محصول ۲٫۴ برابر کلیک به فروشگاه فرستاده‌اند.', implication: 'در هر مقالهٔ آموزشی دست‌کم ۲ لینک به محصول مرتبط.' }
				],
				experiments: [
					{ idea: 'افزودن بخش «مقایسه با نمونهٔ صنعتی» به صفحهٔ سرکه سیب', why: 'رقیب اول همین بخش را دارد.', measure: 'جایگاه «سرکه سیب ارگانیک» پس از ۲۸ روز' },
					{ idea: 'ویدئوی کوتاه طرز تهیه در مقالهٔ کامبوچا', why: 'نتیجه‌های ۱ و ۲ گوگل هر دو ویدئو دارند.', measure: 'زمان ماندگاری و جایگاه «طرز تهیه کامبوچا»' }
				],
				open_questions: [ 'آیا قیمت در عنوان محصول نرخ کلیک را بالا می‌برد؟', 'آیا مقاله‌های بلندتر از ۳٬۰۰۰ کلمه واقعاً بهتر رتبه می‌گیرند؟' ],
				strategy: 'اولویت سه‌ماههٔ آینده: تقویت ۴ صفحهٔ محصول اصلی، ادغام محتوای هم‌پوشان و ساخت خوشهٔ موضوعی «پروبیوتیک».'
			}
		};
	} );
	get( 'reports', function () {
		return [
			{ id: 31, title: 'گزارش هفتگی سئو', type: 'weekly', period_start: D.dstr( 7 ), period_end: D.dstr( 1 ), archive_ref: '' },
			{ id: 30, title: 'خلاصهٔ روزانه', type: 'daily_briefing', period_start: D.dstr( 1 ), period_end: D.dstr( 1 ), archive_ref: '' },
			{ id: 29, title: 'گزارش ماهانهٔ سئو', type: 'monthly', period_start: D.dstr( 37 ), period_end: D.dstr( 7 ), archive_ref: 'reports/2026-10.json' },
			{ id: 28, title: 'گزارش هفتگی سئو', type: 'weekly', period_start: D.dstr( 14 ), period_end: D.dstr( 8 ), archive_ref: '' }
		];
	} );
	get( 'reports/\\d+', function () {
		return { id: 31, title: 'گزارش هفتگی سئو', type: 'weekly', period_start: D.dstr( 7 ), period_end: D.dstr( 1 ), data: BRIEF.data };
	} );

	w.DEMO_API = { get: get, post: post, on: on, page: page, period: period, sum: sum, RECS: RECS, AI: AI };
})( window );
