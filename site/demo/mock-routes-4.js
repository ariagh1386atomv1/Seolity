/* SEOLITY live demo — sample answers for the tabs inside pages. */
(function ( w ) {
	var A = w.DEMO_API, D = w.DEMO, get = A.get, page = A.page;
	var H = D.H, ago = D.ago, P = D.P, Q = D.Q;

	get( 'health', function () {
		var f = function ( l, v, i ) {
			return { label: l, value: v, impact: i };
		};
		return { score: 78, grade: 'B', note: 'امتیاز از دادهٔ واقعی خزش و سرچ کنسول محاسبه می‌شود، نه از فهرست‌های عمومی.', history: [ 61, 63, 66, 65, 69, 71, 72, 74, 75, 77, 78 ].map( function ( s, i ) {
			return { date: D.dstr( ( 10 - i ) * 7 ), score: s };
		} ), categories: {
			technical: { score: 91, weight: 25, about: 'ایندکس‌پذیری، ریدایرکت‌ها، نقشهٔ سایت و خطاها', factors: [ f( 'صفحه‌های ایندکس‌پذیر', '۳۶۸ از ۴۱۲', 'good' ), f( 'زنجیرهٔ ریدایرکت', '۱', 'warn' ), f( 'خطای ۴xx/۵xx', '۹', 'warn' ) ] },
			content: { score: 72, weight: 25, about: 'عمق محتوا، تکرار و تازگی', factors: [ f( 'صفحه‌های کم‌محتوا', '۲۳', 'bad' ), f( 'هم‌نوع‌خواری', '۲ جفت', 'warn' ), f( 'میانگین کلمه در مقاله', '۱٬۲۴۰', 'good' ) ] },
			onpage: { score: 68, weight: 20, about: 'عنوان، متا، سرتیتر و تصویر', factors: [ f( 'بدون توضیحات متا', '۶', 'bad' ), f( 'تصویر بدون ALT', '۳۸', 'bad' ), f( 'عنوان یکتا', '۹۸٪', 'good' ) ] },
			links: { score: 74, weight: 15, about: 'لینک‌سازی داخلی و صفحه‌های یتیم', factors: [ f( 'صفحهٔ یتیم', '۴', 'warn' ), f( 'میانگین لینک ورودی', '۵٫۸', 'good' ) ] },
			performance: { score: 83, weight: 15, about: 'Core Web Vitals از دادهٔ واقعی کاربران', factors: [ f( 'LCP', '۲٫۱ ثانیه', 'good' ), f( 'INP', '۱۸۰ میلی‌ثانیه', 'good' ), f( 'CLS', '۰٫۱۲', 'warn' ) ] }
		}, excluded: [ 'قالب‌های المنتور (۱۷)', 'برگه‌های سبد خرید و پرداخت' ] };
	} );
	get( 'urls', function ( m, q ) {
		return page( P.map( function ( p, i ) {
			return { id: p.id, url: p.url, title: p.title, status_code: 200, indexable: 1, word_count: p.words, inlinks: 2 + ( i * 5 ) % 23, depth: 1 + ( i % 4 ), response_ms: 380 + ( i * 97 ) % 900, in_sitemap: i === 10 ? 0 : 1 };
		} ), q );
	} );
	get( 'pagespeed', function () {
		return P.slice( 0, 5 ).map( function ( p, i ) {
			return { url: p.url, score: 92 - i * 7, strategy: 'mobile', field: { lcp: 1900 + i * 260, inp: 150 + i * 30, cls: +( 0.04 + i * 0.03 ).toFixed( 2 ) }, opportunities: [ { title: 'تصاویر را در قالب نسل جدید (WebP/AVIF) ارائه کنید', savings_ms: 420 + i * 90 }, { title: 'جاوااسکریپت استفاده‌نشده را کم کنید', savings_ms: 260 } ], tested_at: ago( 1 ) };
		} );
	} );

	/* Search Console tabs */
	var qrow = function ( x, i ) {
		return { query: x[ 0 ], clicks: x[ 2 ], delta_clicks: Math.round( x[ 2 ] * ( i % 4 === 3 ? -0.12 : 0.18 ) ), impressions: x[ 3 ], ctr: +( 100 * x[ 2 ] / x[ 3 ] ).toFixed( 1 ), position: x[ 1 ], prev_position: +( x[ 1 ] + ( i % 4 === 3 ? -0.5 : 0.9 ) ).toFixed( 1 ), related: 2 + ( i % 4 ) };
	};
	var prow = function ( p, i ) {
		return { page: p.url, clicks: p.clicks, delta_clicks: Math.round( p.clicks * ( i % 5 === 4 ? -0.15 : 0.14 ) ), impressions: p.imp, ctr: +( 100 * p.clicks / p.imp ).toFixed( 1 ), position: p.pos, prev_position: +( p.pos + 0.7 ).toFixed( 1 ), related: 6 + i };
	};
	get( 'gsc/table', function ( m, q ) {
		return 'page' === q.dimension || 'page' === q.kind || 'pages' === q.type ? P.map( prow ) : Q.map( qrow );
	} );
	get( 'gsc/breakdown', function ( m, q ) {
		var d = { country: [ [ 'irn', 13240, 3.4 ], [ 'deu', 310, 2.1 ], [ 'tur', 190, 1.8 ], [ 'are', 160, 2.6 ], [ 'can', 120, 1.9 ] ], device: [ [ 'MOBILE', 10980, 3.5 ], [ 'DESKTOP', 2740, 2.8 ], [ 'TABLET', 300, 2.2 ] ], searchAppearance: [ [ 'PRODUCT_SNIPPETS', 2130, 5.2 ], [ 'REVIEW_SNIPPET', 640, 6.1 ], [ 'FAQ_RICH_RESULTS', 410, 3.9 ] ] };
		return ( d[ q.dimension ] || d.device ).map( function ( x ) {
			return { value: x[ 0 ], clicks: x[ 1 ], impressions: Math.round( 100 * x[ 1 ] / x[ 2 ] ), ctr: x[ 2 ], position: 7.4 };
		} );
	} );
	get( 'gsc/insights', function () {
		var pw = P.slice( 0, 6 ).map( prow ), pl = P.slice( 6, 9 ).map( function ( p, i ) {
			var r = prow( p, i );
			r.delta_clicks = -Math.round( p.clicks * 0.2 );
			return r;
		} );
		var qw = Q.slice( 0, 6 ).map( qrow ), ql = Q.slice( 12, 15 ).map( function ( x, i ) {
			var r = qrow( x, i );
			r.delta_clicks = -Math.round( x[ 2 ] * 0.2 );
			return r;
		} );
		var nw = [ [ 'کامبوچا زنجبیلی', 3.9, 84, 1900 ], [ 'هتل اسکوبی چیست', 8.2, 31, 760 ], [ 'تفاوت کفیر و ماست', 11.4, 22, 1240 ], [ 'کیمچی بدون ماهی', 6.7, 41, 690 ] ].map( qrow );
		return {
			ctr_opportunities: P.slice( 3, 9 ).map( function ( p ) {
				return { page: p.url, impressions: p.imp, ctr: +( 100 * p.clicks / p.imp ).toFixed( 1 ), expected_ctr: +( 100 * p.clicks / p.imp * 1.9 ).toFixed( 1 ), position: p.pos, estimated_gain: Math.round( p.clicks * 0.8 ) };
			} ),
			position_opportunities: P.slice( 2, 10 ).map( function ( p ) {
				return { page: p.url, queries: p.kw.length + 6, impressions: p.imp, position: p.pos };
			} ),
			pages: { winners: pw, losers: pl }, queries: { winners: qw, losers: ql },
			keywords: { new_count: 37, new: nw, lost_count: 5, lost: [ [ 'کامبوچا لیمویی', 18.2, 4, 310 ], [ 'خرید ترشی سیر', 22.5, 2, 180 ] ].map( qrow ) },
			trending: { rising: P.slice( 0, 5 ).map( function ( p ) {
				return { page: p.url, prev_clicks: Math.round( p.clicks * 0.7 ), clicks: p.clicks, change: 43 };
			} ), declining: P.slice( 6, 9 ).map( function ( p ) {
				return { page: p.url, prev_clicks: Math.round( p.clicks * 1.25 ), clicks: p.clicks, change: -20 };
			} ) },
			new_pages: [ { page: H + 'blog/kombucha-flavors/', clicks: 86, delta_clicks: 86, impressions: 2400 }, { page: H + 'blog/fermentation-mistakes/', clicks: 41, delta_clicks: 41, impressions: 1300 } ],
			distribution: { '1-3': 24, '4-10': 71, '11-20': 118, '21-50': 164, '51+': 92 }
		};
	} );

	/* Content tabs */
	get( 'planner', function () {
		var mk = function ( days, title, kw, intent, prio, status ) {
			return { id: days, scheduled_date: D.dstr( -days ), title: title, h1: title, keyword: kw, intent: intent, priority: prio, status: status, post_id: 0, edit_link: '', brief: { reason: 'از شکاف محتوایی رقبا و کوئری‌های بدون صفحه در سرچ کنسول.', outline: [ { heading: 'پاسخ کوتاه' }, { heading: 'توضیح کامل با مثال' }, { heading: 'اشتباه‌های رایج' }, { heading: 'پرسش‌های متداول' } ], supporting_keywords: [ kw + ' چیست', 'بهترین ' + kw ] } };
		};
		return [ mk( 3, 'مصرف کامبوچا در بارداری و شیردهی؛ بایدها و نبایدها', 'کامبوچا در بارداری', 'informational', 'high', 'planned' ), mk( 10, 'هتل اسکوبی چیست و چطور اسکوبی را نگه داریم؟', 'نگهداری اسکوبی', 'informational', 'medium', 'planned' ), mk( 17, 'تفاوت کفیر و ماست: کدام پروبیوتیک بیشتری دارد؟', 'تفاوت کفیر و ماست', 'comparison', 'medium', 'planned' ), mk( 24, '۷ اشتباه رایج در تخمیر خانگی', 'اشتباهات تخمیر', 'informational', 'low', 'idea' ) ];
	} );
	get( 'clusters', function () {
		return [ { id: 1, name: 'کامبوچا', coverage: 82, pillar_url: P[ 0 ].url, unlinked_members: [ P[ 8 ].url ], members: [ P[ 0 ], P[ 1 ], P[ 8 ] ].map( function ( p ) {
			return { url: p.url, title: p.title };
		} ), gaps: [ { topic: 'کامبوچا در بارداری', keyword: 'کامبوچا در بارداری', intent: 'informational' }, { topic: 'طعم‌دهی کامبوچا', keyword: 'تخمیر دوم کامبوچا', intent: 'informational' } ] }, { id: 2, name: 'کفیر', coverage: 64, pillar_url: P[ 2 ].url, unlinked_members: [ P[ 10 ].url ], members: [ P[ 2 ], P[ 10 ] ].map( function ( p ) {
			return { url: p.url, title: p.title };
		} ), gaps: [ { topic: 'تفاوت کفیر و ماست', keyword: 'تفاوت کفیر و ماست', intent: 'comparison' } ] }, { id: 3, name: 'پروبیوتیک', coverage: 38, pillar_url: P[ 6 ].url, unlinked_members: [], members: [ P[ 6 ], P[ 9 ] ].map( function ( p ) {
			return { url: p.url, title: p.title };
		} ), gaps: [ { topic: 'پروبیوتیک برای کودکان', keyword: 'پروبیوتیک کودکان', intent: 'informational' }, { topic: 'بهترین زمان مصرف پروبیوتیک', keyword: 'زمان مصرف پروبیوتیک', intent: 'informational' }, { topic: 'پری‌بیوتیک چیست', keyword: 'پری بیوتیک', intent: 'informational' } ] } ];
	} );

	/* Keyword tabs */
	get( 'keywords/cannibalization', function () {
		return [ { query: 'سرکه سیب برای لاغری', impressions: 15700, pages: [ { page: P[ 11 ].url, share: 61, position: 14.2 }, { page: H + 'blog/apple-cider-vinegar-benefits/', share: 39, position: 17.8 } ] }, { query: 'کفیر آب', impressions: 11300, pages: [ { page: P[ 2 ].url, share: 74, position: 6.3 }, { page: H + 'blog/how-to-make-water-kefir/', share: 26, position: 12.9 } ] } ];
	} );
	get( 'keywords/mapping', function () {
		return { by_url: P.slice( 0, 8 ).map( function ( p ) {
			return { target_url: p.url, keywords: p.kw };
		} ), unmapped: [ { keyword: 'کامبوچا در بارداری', intent: 'informational', opportunity: 81 }, { keyword: 'تفاوت کفیر و ماست', intent: 'comparison', opportunity: 74 }, { keyword: 'خرید ست تخمیر', intent: 'transactional', opportunity: 69 } ] };
	} );

	/* Sitemap tabs */
	var base = w.DEMO_API;
	get( 'sitemap/map/pixels', function () {
		var st = [ 'indexable', 'indexable', 'indexable', 'indexable', 'indexable', 'indexable', 'indexable', 'noindex', 'redirect', 'indexable', 'canonicalized', 'indexable', 'error', 'indexable', 'not_crawled', 'indexable', 'blocked' ];
		var folders = [ 'blog', 'product', 'category', 'tag', 'page' ];
		var items = [];
		for ( var i = 0; i < 468; i++ ) {
			var s = st[ ( i * 7 + ( i % 13 ) ) % st.length ];
			items.push( [ H + folders[ i % 5 ] + '/page-' + ( i + 1 ) + '/', s, i < 140 ? 1 : 0 ] );
		}
		return { items: items };
	} );
	get( 'sitemap', function () {
		return { total_urls: 359, gsc: true, recommendations: [ '۴ نشانی ریدایرکت‌شده از نقشهٔ سایت حذف شود.', '۷ صفحهٔ ایندکس‌پذیر در نقشهٔ سایت نیستند.' ], sitemaps: [
			{ url: H + 'post-sitemap.xml', type: 'urlset', status: 200, count: 96, with_lastmod: 96, error: '' },
			{ url: H + 'product-sitemap.xml', type: 'urlset', status: 200, count: 58, with_lastmod: 58, error: '' },
			{ url: H + 'page-sitemap.xml', type: 'urlset', status: 200, count: 14, with_lastmod: 14, error: '' },
			{ url: H + 'product_cat-sitemap.xml', type: 'urlset', status: 200, count: 12, with_lastmod: 0, error: '' }
		], problem_urls: [ { url: P[ 9 ].url, reason: 'redirect' }, { url: H + 'blog/kombucha-flavors/', reason: 'noindex' } ], missing_urls: [ { url: H + 'product/fermentation-jar/', inlinks: 3 }, { url: H + 'blog/fermentation-mistakes/', inlinks: 5 } ] };
	} );

	/* Automation tabs */
	get( 'rules', function () {
		return { presets: [], rules: [
			{ id: 1, name: 'ALT خودکار برای تصاویر تازه', enabled: 1, trigger_event: 'image_uploaded', mode: 'suggest', run_count: 86, last_run: ago( 0, 3 ), conditions: [ { field: 'alt', op: 'empty', value: '' } ], actions: [ { type: 'generate_alt' } ] },
			{ id: 2, name: 'پیشنهاد توضیحات متا پس از انتشار', enabled: 1, trigger_event: 'post_published', mode: 'suggest', run_count: 24, last_run: ago( 2 ), conditions: [ { field: 'meta_description', op: 'empty', value: '' } ], actions: [ { type: 'suggest_meta' } ] },
			{ id: 3, name: 'هشدار افت کلیک بیش از ۲۵٪', enabled: 1, trigger_event: 'gsc_synced', mode: 'notify', run_count: 7, last_run: ago( 0, 6 ), conditions: [ { field: 'clicks_delta', op: 'lt', value: '-25' } ], actions: [ { type: 'alert' } ] }
		] };
	} );
	get( 'queue', function () {
		return { pending: 0, running: 0, done: 1842, failed: 1, next_cron: ago( 0, 0 ), recent: [ [ 'gsc_sync', 'done' ], [ 'daily_pipeline', 'done' ], [ 'follow_ups_check', 'done' ], [ 'alerts_digest', 'done' ], [ 'competitor_analyze', 'failed' ] ].map( function ( x, i ) {
			return { id: 900 - i, hook: x[ 0 ], status: x[ 1 ], attempts: x[ 1 ] === 'failed' ? 3 : 1, last_error: x[ 1 ] === 'failed' ? 'مهلت پاسخ تمام شد' : '', created_at: ago( 0, 6 + i ) };
		} ) };
	} );
	get( 'audit-log', function () {
		return [ [ 'change_applied', 'product', 102, 'عنوان و متا' ], [ 'redirect_created', 'redirect', 1, '/category/drinks/ → /category/beverages/' ], [ 'settings_saved', 'settings', 0, 'approval_mode = manual' ], [ 'change_rolled_back', 'post', 112, 'عنوان' ] ].map( function ( x, i ) {
			return { id: i + 1, created_at: ago( i * 3 + 1 ), display_name: 'مدیر دمو', action: x[ 0 ], object_type: x[ 1 ], object_id: x[ 2 ], details: x[ 3 ] };
		} );
	} );
	get( 'follow-ups', function () {
		var v = function ( verdict, cb, ca, ce, lift, ib, ia, il, pb, pa, conf ) {
			return { verdict: verdict, confidence: conf, clicks: { before: cb, after: ca, expected: ce, lift: lift }, impressions: { before: ib, after: ia, lift: il }, position: { before: pb, after: pa, gain: +( pb - pa ).toFixed( 1 ) }, site_trend: { clicks: 8, impressions: 6 } };
		};
		var cp = function ( day, verdict ) {
			return { day: day, at: D.dstr( 0 ), verdict: verdict };
		};
		return { data_until: D.dstr( 3 ), learnings: [ { kind: 'عنوان و متا', measured: 9, success_rate: 78, avg_lift: 31, avg_pos_gain: 1.4 }, { kind: 'لینک داخلی', measured: 6, success_rate: 83, avg_lift: 24, avg_pos_gain: 1.9 }, { kind: 'گسترش محتوا', measured: 5, success_rate: 60, avg_lift: 15, avg_pos_gain: 1.1 }, { kind: 'ادغام مقاله', measured: 2, success_rate: 100, avg_lift: 38, avg_pos_gain: 2.6 } ], items: [
			{ id: 'f1', title: 'تغییر عنوان و متا — «خرید کامبوچای طبیعی»', status: 'done', created_at: ago( 40 ), change_date: '', goal: 'رسیدن به ۳ نتیجهٔ اول', check_at: '', checkpoints_due: [ 7, 14, 28 ], urls: [ P[ 1 ].url ], queries: [ 'خرید کامبوچا', 'قیمت کامبوچا' ], checkpoints: [ cp( 7, v( 'neutral', 310, 334, 328, 2, 5100, 5400, 0, 4.6, 4.1, 'low' ) ), cp( 14, v( 'positive', 620, 790, 668, 18, 10300, 11200, 3, 4.6, 3.4, 'medium' ) ), cp( 28, v( 'positive', 1150, 1640, 1242, 32, 20900, 22800, 3, 4.6, 2.8, 'high' ) ) ], ai: { summary: 'عنوان خریدمحور نرخ کلیک را از ۶٫۱٪ به ۸٫۴٪ رساند. همین الگو برای سه محصول دیگر پیشنهاد می‌شود.', next_actions: [ { title: 'همین الگوی عنوان برای «اسکوبی» و «دانهٔ کفیر»' }, { title: 'افزودن نظرات خریداران برای رسیدن به رتبهٔ ۱' } ], revert: false } },
			{ id: 'f2', title: 'ادغام دو مقالهٔ «کفیر» (سنجش گروهی صفحه‌ها + کوئری‌ها)', status: 'waiting', created_at: ago( 19 ), goal: '', check_at: D.dstr( -9 ), checkpoints_due: [ 7, 14, 28 ], urls: [ P[ 2 ].url, H + 'blog/kefir/' ], queries: [ 'کفیر آب', 'کفیر' ], checkpoints: [ cp( 7, v( 'neutral', 260, 281, 276, 2, 7200, 7500, 1, 8.1, 7.6, 'low' ) ), cp( 14, v( 'positive', 540, 668, 583, 15, 14600, 15900, 3, 8.1, 6.8, 'medium' ) ) ] },
			{ id: 'f3', title: 'رپورتاژ «خواص کامبوچا» در رسانهٔ سلامت', status: 'waiting', created_at: ago( 7 ), goal: 'پیگیری ثبت‌شده از چت', check_at: D.dstr( -23 ), checkpoints_due: [ 30 ], urls: [ P[ 0 ].url ], queries: [ 'خواص کامبوچا' ], checkpoints: [] }
		], total: 3 };
	} );

	w.DEMO_API.on( 'POST', /^alerts\/\d+$/, { ok: true } );
})( window );
