/* SEOLITY live demo — sample answers: technical SEO, connections, settings. */
(function ( w ) {
	var A = w.DEMO_API, D = w.DEMO, get = A.get, post = A.post, page = A.page;
	var H = D.H, ago = D.ago, P = D.P;
	var ts = function ( days ) {
		return Math.round( Date.now() / 1000 ) - Math.round( days * 86400 );
	};

	/* ------------------------------------------------------------ index coverage */
	get( 'coverage', function () {
		var chart = D.S.slice( -60 ).map( function ( r, i ) {
			return { date: r.date, indexed: 331 + Math.round( i * 0.62 ) - ( i > 40 && i < 46 ? 9 : 0 ), not_indexed: 96 - Math.round( i * 0.3 ) };
		} );
		return {
			summary: { imported_at: ago( 2 ), chart: chart, reasons: [
				{ key: 'redirect', reason: 'صفحهٔ دارای ریدایرکت', source: 'وب‌سایت', validation: 'شروع نشده', pages: 31 },
				{ key: 'noindex', reason: 'با برچسب noindex مستثنی شده', source: 'وب‌سایت', validation: '', pages: 22 },
				{ key: 'crawled_not_indexed', reason: 'خزیده شده – در حال حاضر ایندکس نشده', source: 'گوگل', validation: '', pages: 14 },
				{ key: 'not_found', reason: 'یافت نشد (۴۰۴)', source: 'وب‌سایت', validation: 'شروع نشده', pages: 9 },
				{ key: 'canonical', reason: 'صفحهٔ جایگزین با برچسب canonical مناسب', source: 'وب‌سایت', validation: '', pages: 12 }
			] },
			drilldowns: { redirect: { reason: 'صفحهٔ دارای ریدایرکت', total: 31 }, not_found: { reason: 'یافت نشد (۴۰۴)', total: 9 }, crawled_not_indexed: { reason: 'خزیده شده – ایندکس نشده', total: 14 } },
			findings: [
				{ severity: 'high', intentional: false, count: 4, title: 'مقاله‌های منتشرشده‌ای که نشانی خودشان ریدایرکت می‌شود', reason: 'صفحهٔ دارای ریدایرکت', detail: 'یک قاعدهٔ ریدایرکت قدیمی نشانی این مقاله‌های زنده را به مقالهٔ دیگری می‌فرستد؛ گوگل نمی‌تواند آن‌ها را ایندکس کند.', urls: [ P[ 9 ].url, P[ 7 ].url ], fix: { type: 'redirect_remove' } },
				{ severity: 'high', intentional: false, count: 3, title: '۴۰۴ با مقصد محتمل', reason: 'یافت نشد (۴۰۴)', detail: 'برای هر سه نشانی، صفحهٔ هم‌موضوع پیدا شده است.', urls: [ H + 'category/drinks/kombucha/' ], fix: { type: 'redirect_create' } },
				{ severity: 'medium', intentional: false, count: 5, title: 'صفحه‌های واقعی در «خزیده شده – ایندکس نشده»', reason: 'خزیده شده – ایندکس نشده', detail: 'محتوای کم یا بدون لینک داخلی. پس از تقویت، دوباره درخواست ایندکس دهید.', urls: [ H + 'product/fermentation-jar/' ], fix: { type: 'route' } },
				{ severity: 'medium', intentional: false, count: 2, title: 'لینک فارسی بریده‌شده (�)', reason: 'یافت نشد (۴۰۴)', detail: 'نشانی فارسی هنگام کپی ناقص شده است.', urls: [ H + 'blog/%D8%AE%D9%88%D8%A7%D8%B5-%D9%83%D8%A7%EF%BF%BD/' ], fix: { type: 'redirect_create' } },
				{ severity: 'info', intentional: true, count: 22, title: 'مستثنی‌شده‌های عمدی: سبد خرید، فید، پارامترهای ردیابی', reason: 'noindex', detail: 'این‌ها نباید ایندکس شوند و مشکلی نیستند.', urls: [ H + 'cart/', H + 'feed/', H + '?add-to-cart=102' ], fix: null }
			],
			ai: { at: ago( 2 ), summary: 'از ۸۸ نشانی ایندکس‌نشده، ۶۷ مورد عمدی و بی‌خطر است. ۱۴ مورد مشکل واقعی است که با ۴ عملیات قابل‌تأیید برطرف می‌شود.', timeline: 'افت ۹ صفحه‌ای ۱۸ روز پیش با تغییر نامک دستهٔ «نوشیدنی‌ها» هم‌زمان است و با ریدایرکت‌های ساخته‌شده جبران شده است.', reasons: [
				{ status: 'problem', reason: 'صفحهٔ دارای ریدایرکت', explanation: '۴ مقالهٔ زنده به‌اشتباه ریدایرکت می‌شوند.', impact: 'این صفحه‌ها ۵۲۰ کلیک ماهانه داشتند.' },
				{ status: 'ok', reason: 'با برچسب noindex مستثنی شده', explanation: 'سبد خرید، حساب کاربری و نتایج جست‌وجو — درست است.', impact: 'بدون اثر' }
			], plan: [ { title: 'حذف قاعدهٔ ریدایرکت اشتباه برای ۴ مقاله', why: 'بیشترین بازگشت ترافیک' }, { title: 'ریدایرکت ۳۰۱ برای ۳ نشانی ۴۰۴', why: 'حفظ اعتبار لینک‌ها' }, { title: 'تقویت ۵ صفحهٔ کم‌محتوا و درخواست ایندکس', why: 'ورود دوباره به ایندکس' } ] },
			messages: [ { severity: 'medium', text: 'New reasons prevent pages in a sitemap from being indexed — «صفحهٔ دارای ریدایرکت»', at: ago( 4 ), ai: { summary: 'گوگل ۴ نشانی از نقشهٔ سایت را پیدا کرده که ریدایرکت می‌شوند. برنامهٔ رفع به مسیر راه اضافه شد.' } } ],
			watch: { daily: 25, checked: 312, states: { 'ارسال‌شده و ایندکس‌شده': 291, 'خزیده شده – ایندکس نشده': 14, 'صفحهٔ دارای ریدایرکت': 4, 'یافت نشد (۴۰۴)': 3 }, problems: [ { url: P[ 9 ].url, state: 'صفحهٔ دارای ریدایرکت' }, { url: H + 'product/fermentation-jar/', state: 'خزیده شده – ایندکس نشده' } ] }
		};
	} );

	/* ------------------------------------------------------------ redirects / 404 */
	var RED = [
		[ '/category/drinks/', '/category/beverages/', 301, 412, 'manual', 'active' ],
		[ '/blog/kombucha-benefits/', '/blog/kombucha/', 301, 268, 'ai', 'active' ],
		[ '/product/kombucha-ginger/', '/product/ginger-kombucha/', 301, 131, 'slug_change', 'active' ],
		[ '/blog/kefir/', '/blog/water-kefir-vs-milk-kefir/', 301, 94, 'consolidation', 'active' ],
		[ '/shop-old/', '/shop/', 301, 57, 'rankmath', 'active' ],
		[ '^/tag/(.*)$', '/blog/', 302, 22, 'manual', 'inactive' ]
	];
	get( 'redirects', function ( m, q ) {
		var o = page( RED.map( function ( r, i ) {
			return { id: i + 1, source: r[ 0 ], target: r[ 1 ], type: r[ 2 ], hits: r[ 3 ], last_hit: ago( i, 2 ), origin: r[ 4 ], status: r[ 5 ], is_regex: i === 5 ? 1 : 0 };
		} ), q );
		o.chains = [];
		return o;
	} );
	get( 'redirects/chains', function () {
		var n = {};
		[ [ '/shop-old/', 'فروشگاه (قدیمی)', 0 ], [ '/store/', 'فروشگاه', 0 ], [ '/shop/', 'فروشگاه', 1 ] ].forEach( function ( x ) {
			n[ x[ 0 ] ] = { label: x[ 0 ], title: x[ 1 ], is_page: !! x[ 2 ], clicks_28d: x[ 2 ] ? 640 : 0, importance: x[ 2 ] ? 'high' : 'low' };
		} );
		return { count: 1, loops: 0, hops: 2, chains: [ { chain: [ '/shop-old/', '/store/', '/shop/' ], loop: false } ], nodes: n };
	} );
	get( '404', function ( m, q ) {
		var list = [
			[ '/category/drinks/kombucha/', 'important', 'از ۳ صفحهٔ داخلی لینک دارد', H + 'blog/kombucha/', 48, '/category/beverages/kombucha/', 94 ],
			[ '/blog/kombucha-benefits-2/', 'important', 'بک‌لینک از salamat-media.ir', 'https://salamat-media.ir/fermented-drinks/', 31, '/blog/kombucha/', 88 ],
			[ '/wp-content/uploads/menu.pdf', 'important', 'از برگهٔ «دربارهٔ ما» لینک دارد', H + 'about/', 12, '', 0 ],
			[ '/wp-login.php.bak', 'noise', 'ربات اسکنر — نیازی به اقدام نیست', '', 96, '', 0 ],
			[ '/.env', 'noise', 'ربات اسکنر — نیازی به اقدام نیست', '', 71, '', 0 ],
			[ '/product/kombucha-lemon/', 'important', 'محصول حذف‌شده با کلیک گوگل', 'https://www.google.com/', 19, '/product/ginger-kombucha/', 81 ]
		].map( function ( x, i ) {
			return { id: i + 1, url: x[ 0 ], verdict: x[ 1 ], verdict_reason: x[ 2 ], referrer: x[ 3 ], hits: x[ 4 ], first_seen: ago( 12 + i ), last_seen: ago( 0, i + 1 ), suggested_target: x[ 5 ], suggestion_score: x[ 6 ], status: 'open' };
		} );
		var o = page( list, q );
		o.stats = { open: 6, important: 4, noise: 2, hits_7d: 277, new_24h: 1, sorting: 0 };
		return o;
	} );

	/* ------------------------------------------------------------ indexability */
	get( 'indexability', function () {
		var st = function ( o ) {
			var s = { status: 200, noindex: false, robots_txt_blocked: false, in_sitemap: true, canonical: '', google: { coverage: 'Submitted and indexed', verdict: 'PASS' } };
			for ( var k in o || {} ) {
				s[ k ] = o[ k ];
			}
			return s;
		};
		return { running: false, last: { at: ago( 1 ), gsc: true, rankmath: true, findings: [
			{ severity: 'high', type: 'noindex_traffic', count: 1, source: 'rankmath', url: H + 'blog/kombucha-flavors/', state: st( { noindex: true, google: { coverage: 'Excluded by noindex tag', verdict: 'NEUTRAL' } } ), issue: 'صفحه‌ای که از گوگل کلیک می‌گیرد noindex است', reason: 'تنظیم پیشرفتهٔ Rank Math برای این نوشته روی noindex مانده است.', solution: 'برچسب noindex برداشته شود؛ با تأیید شما انجام و راستی‌آزمایی می‌شود.', fixable: true, edit: '#' },
			{ severity: 'medium', type: 'sitemap_non_indexable', count: 4, source: 'sitemap', url: P[ 9 ].url, state: st( { status: 301 } ), issue: 'نشانی‌های ریدایرکت‌شده در نقشهٔ سایت', reason: 'نقشهٔ سایت باید فقط نشانی‌های ۲۰۰ و ایندکس‌پذیر داشته باشد.', solution: 'این ۴ نشانی از نقشهٔ سایت حذف شوند.', fixable: true, edit: '#' },
			{ severity: 'low', type: 'crawl_waste', count: 37, source: 'crawl', url: H + '?orderby=price', state: st( { in_sitemap: false, canonical: H + 'shop/' } ), issue: 'نشانی‌های پارامتری که بودجهٔ خزش را هدر می‌دهند', reason: 'مرتب‌سازی و فیلتر فروشگاه نشانی‌های بی‌شمار می‌سازد.', solution: 'قاعدهٔ Disallow پیشنهادی برای robots.txt آماده است.', fixable: true, edit: '' }
		], inventory: [
			{ label: 'نوشته‌ها', note: 'همه ایندکس‌پذیر', source: 'wordpress', count: 96, intended: 'index', state: st(), url: H + 'blog/' },
			{ label: 'محصولات', note: 'همه ایندکس‌پذیر', source: 'wordpress', count: 58, intended: 'index', state: st(), url: H + 'shop/' },
			{ label: 'دسته‌های محصول', note: '', source: 'wordpress', count: 12, intended: 'index', state: st(), url: H + 'category/beverages/' },
			{ label: 'برچسب‌ها', note: 'عمداً noindex', source: 'rankmath', count: 41, intended: 'noindex', state: st( { noindex: true, in_sitemap: false } ), url: H + 'tag/kombucha/' },
			{ label: 'سبد خرید، پرداخت، حساب کاربری', note: 'عمداً noindex', source: 'woocommerce', count: 3, intended: 'noindex', state: st( { noindex: true, in_sitemap: false } ), url: H + 'cart/' },
			{ label: 'قالب‌های المنتور', note: 'بدون پیشنهاد سئو (اهمیت صفحه: بی‌اهمیت)', source: 'elementor', count: 17, intended: 'noindex', state: st( { noindex: true, in_sitemap: false } ), url: H + '?elementor_library=header' }
		] } };
	} );
	get( 'schema', function () {
		return { pages: 412, without: 61, outputs: true, faq_pages: 14, types: { Product: 58, Article: 96, BreadcrumbList: 351, Organization: 1, WebSite: 1, FAQPage: 14, ItemList: 12 }, issues: [ { check_code: 'product_missing_aggregate_rating', c: 31 }, { check_code: 'article_missing_author', c: 8 }, { check_code: 'faq_without_schema', c: 4 } ] };
	} );
	get( 'sitemap/map', function ( m, q ) {
		var stt = [ 'indexable', 'indexable', 'indexable', 'indexable', 'noindex', 'redirect', 'indexable', 'canonicalized', 'indexable', 'error', 'indexable', 'not_crawled' ];
		var fl = [ [ 'traffic', 'in_sitemap' ], [ 'traffic', 'in_sitemap' ], [ 'traffic', 'in_sitemap' ], [ 'traffic', 'in_sitemap', 'thin' ], [ 'sitemap_problem' ], [], [ 'traffic', 'in_sitemap', 'slow' ], [], [ 'orphan', 'thin', 'in_sitemap' ], [], [ 'not_in_sitemap', 'deep' ], [ 'google_only' ] ];
		var urls = P.map( function ( p, i ) {
			return { url: p.url, title: p.title, status: stt[ i ], code: stt[ i ] === 'redirect' ? 301 : stt[ i ] === 'error' ? 404 : 200, clicks: p.clicks, impressions: p.imp, position: p.pos, inlinks: 2 + ( i * 5 ) % 23, depth: 1 + ( i % 4 ), words: p.words, flags: fl[ i ], type: p.type };
		} );
		return { refreshing: false, total: 468, found: urls.length, at: ago( 0, 8 ), last_refresh: { at: ago( 0, 8 ) }, counts: { indexable: 368, noindex: 44, blocked: 6, redirect: 31, error: 9, canonicalized: 12, not_crawled: 8, orphan: 4, not_in_sitemap: 7, sitemap_problem: 4, deep: 11, thin: 23, slow: 9, traffic: 142, google_only: 5, in_sitemap: 359 }, urls: urls, pages: 1, folder: q.folder || '', folders: [ [ 'blog', 168, 9800 ], [ 'product', 58, 5200 ], [ 'category', 12, 900 ], [ 'tag', 41, 30 ], [ '(root)', 14, 1400 ] ].map( function ( f, i ) {
			return { name: f[ 0 ], total: f[ 1 ], clicks: f[ 2 ], counts: { indexable: i === 3 ? 0 : f[ 1 ] - 3, noindex: i === 3 ? 41 : 1, blocked: 0, redirect: 1, error: i === 0 ? 1 : 0, canonicalized: 1, not_crawled: 0 } };
		} ), history: ( function () {
			var hh = {};
			for ( var d = 13; d >= 0; d-- ) {
				hh[ D.dstr( d ) ] = { indexable: 368 - d * 2, noindex: 44, blocked: 6, redirect: 31 - Math.round( d / 3 ), error: 9 + ( d > 6 ? 3 : 0 ), canonicalized: 12, not_crawled: 8 + d };
			}
			return hh;
		} )() };
	} );
	get( 'robots', function () {
		return { override: false, physical_file: false, custom: '', content: 'User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\nDisallow: /cart/\nDisallow: /checkout/\nDisallow: /my-account/\n\nSitemap: ' + H + 'sitemap_index.xml\n', current: 'User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\nDisallow: /cart/\nDisallow: /checkout/\nDisallow: /my-account/\n\nSitemap: ' + H + 'sitemap_index.xml\n', issues: [ { severity: 'medium', message: 'نشانی‌های پارامتری فروشگاه (‎?orderby=‎ و ‎?filter_‎) مسدود نشده‌اند و بودجهٔ خزش را مصرف می‌کنند.' } ], suggestions: [ 'Disallow: /*?orderby=', 'Disallow: /*?filter_', 'Disallow: /*add-to-cart=' ], blocked_important: [] };
	} );

	/* ------------------------------------------------------------ AI engines & connections */
	function eng( id, pkg, ver, model ) {
		return { engine: id, package: pkg, status: 'ready', code: 'ready', message: 'نصب شده، وارد حساب شده و آزمایش اتصال موفق بوده است.', action: '', version: ver, logged_in: true, auth_mode: 'subscription', last_ok: ago( 0, 1 ), last_code: '', route: 'runner', path: '/home/demo/.seolity/bin/' + id, node: '/usr/bin/node', model: model, models: [ model ], install: { status: 'idle' } };
	}
	get( 'cli/doctor', function () {
		return { prefix: '/home/demo/.seolity', engines: { claude: eng( 'claude', '@anthropic-ai/claude-code', '2.1.0', 'sonnet' ), codex: eng( 'codex', '@openai/codex', '0.50.0', 'gpt-5-codex' ) },
			environment: [
				{ label: 'PHP', value: '8.2', state: 'ok', fix: '' },
				{ label: 'اجرای برنامه از PHP (proc_open)', value: 'فعال', state: 'ok', fix: '' },
				{ label: 'حافظهٔ مجازی هر پردازش', value: '4 GB', state: 'ok', fix: '' },
				{ label: 'دسترسی نوشتن در پوشهٔ نصب', value: 'بله', state: 'ok', fix: '' },
				{ label: 'دسترسی شبکه به api.anthropic.com', value: 'مسدود (سرور ایران)', state: 'warn', fix: 'درخواست‌ها خودکار از اجراکنندهٔ GitHub یا رلهٔ Cloudflare می‌روند.' }
			], nodes: [ { path: '/usr/bin/node', version: 'v20.18.0', npm: '10.8.2', ok: true, selected: true } ], node: { path: '/usr/bin/node' } };
	} );
	get( 'cli/status', function () {
		return { engines: { claude: { install: { status: 'idle' } }, codex: { install: { status: 'idle' } } } };
	} );
	var GH = { token: { set: true, account: { login: 'demo-user', name: 'Demo User', type: 'User', scopes: [ 'repo', 'workflow' ], expires: '' }, warnings: [] }, defaults: { runner: 'demo-user/seolity-ai-runner', knowledge: 'demo-user/seolity-ai', storage: 'demo-user/seolity-ai' },
		runner: { exists: true, private: false, repo: 'demo-user/seolity-ai-runner', url: 'https://github.com/', setup: [], files_current: true, claude: true, codex: true },
		knowledge: { exists: true, private: true, mode: 'shared', repo: 'demo-user/seolity-ai', anthropic_key: false, url: 'https://github.com/', docs: { bundled: 49, github: 6, user: 3 }, last_sync: { time: ts( 3 ), ok: true } },
		storage: { exists: true, enabled: true, private: true, repo: 'demo-user/seolity-ai', url: 'https://github.com/', archive: { db_size_mb: 38.4, local_rows: { gsc_page_query: 184320 }, last: { time: ts( 1 ), ok: true, files: 12 } } } };
	get( 'github', GH );
	get( 'subscription', function () {
		return { provider: 'sub_claude', active: 'claude', claude_token: true, codex_auth: true, repo: 'demo-user/seolity-ai-runner', repo_url: 'https://github.com/', branch: 'main', requests_24h: { done: 46, queued: 0, submitted: 1, failed: 1 }, runs: { items: [], error: '' }, method: { claude: 'auto', codex: 'auto' }, missing: [] };
	} );
	get( 'subscription/verify', function () {
		return { deployed: true, exists: true, private: false, repo: 'demo-user/seolity-ai-runner', workflow: 'active', engines: { claude: true, codex: true }, ok: true };
	} );
	get( 'cloudflare', function () {
		return { deployed: true, configured: true, site_public: true, mode: 'auto', token: true, account_id: 'a1b2…', accounts: [ { id: 'a1b2c3d4e5f6', name: 'Demo account' } ], notice: '', url: 'https://seolity-relay.demo.workers.dev', cron: 1, last_heartbeat: ago( 0, 0 ), last_pull: ago( 0, 0 ), version: '1.19.2', outdated: false, cron_error: '', runner_relay: true, wp_api: true };
	} );
	get( 'network', function () {
		return { region: 'iran', region_set: true, guess: 'iran', mode: 'auto', provider: 'sub_claude', route_google: 1, warm_minutes: 10, runner: true, available: { direct: true, cloudflare: true, github: true }, order: [ 'cloudflare', 'github', 'direct' ], probe: { at: ts( 1 ), target: 'api.anthropic.com', routes: {
			direct: { ok: false, setup: false, ms: 0, estimate_ms: 0, detail: 'از این سرور (ایران) در دسترس نیست' },
			cloudflare: { ok: true, ms: 640, estimate_ms: 900, detail: 'ورکر روی حساب خودتان · رمزنگاری‌شده' },
			github: { ok: true, ms: 910, estimate_ms: 42000, detail: 'اجراکنندهٔ GitHub Actions (اشتراک Claude/ChatGPT)' }
		} } };
	} );
	get( 'storage', function () {
		return { ready: true, enabled: true, repo: 'demo-user/seolity-ai', branch: 'seolity-data', keep_days: 90, gsc_days: 480, tables: [ { table: 'seolity_gsc_page_query', mb: 21.6 }, { table: 'seolity_gsc_daily', mb: 4.9 }, { table: 'seolity_urls', mb: 3.8 }, { table: 'seolity_ai_requests', mb: 2.7 }, { table: 'seolity_internal_links', mb: 2.1 }, { table: 'seolity_activity', mb: 1.4 }, { table: 'seolity_changes', mb: 0.9 } ], last: { time: ts( 1 ), ok: true, files: 12 } };
	} );


	/* ------------------------------------------------------------ settings & AI providers */
	var prov = function ( id, label, status, model, active, mono ) {
		return { id: id, label: label, status: status, active: !! active, model: model, mono: mono || id.slice( 0, 2 ).toUpperCase(), configured: status !== 'not_connected', ready: status === 'verified', hint: '', route: 'github', models: model ? [ model ] : [], error: '', checked_at: ago( 0, 1 ) };
	};
	var API_P = [ prov( 'anthropic', 'Anthropic (Claude API)', 'not_connected', '', 0, 'A' ), prov( 'openai', 'OpenAI', 'not_connected', '', 0, 'O' ), prov( 'gemini', 'Google Gemini', 'authenticated', 'gemini-flash', 0, 'G' ), prov( 'openrouter', 'OpenRouter', 'not_connected', '', 0, 'OR' ), prov( 'github_models', 'GitHub Models', 'not_connected', '', 0, 'GH' ), prov( 'ollama', 'Ollama (محلی)', 'not_connected', '', 0, 'OL' ), prov( 'custom', 'API سفارشی (DeepSeek، Groq، Azure…)', 'not_connected', '', 0, 'API' ) ];
	var SUB_P = [ prov( 'sub_claude', 'اشتراک Claude (Pro/Max)', 'verified', 'sonnet', 1, 'C' ), prov( 'sub_codex', 'اشتراک ChatGPT (Plus/Pro)', 'verified', 'gpt-5-codex', 0, 'GPT' ) ];
	get( 'ai/providers', function () {
		return { active: A.AI, api: API_P, subscription: SUB_P };
	} );
	get( 'ai/usage', function () {
		return { month_spend: 0, budget: 0, requests_30d: 1284, by_task: [
			{ task: 'chat', requests: 212, tokens_in: 1840000, tokens_out: 286000, cost: 0 },
			{ task: 'optimize_content', requests: 148, tokens_in: 1320000, tokens_out: 402000, cost: 0 },
			{ task: 'image_alt', requests: 486, tokens_in: 610000, tokens_out: 38000, cost: 0 },
			{ task: 'product_seo', requests: 96, tokens_in: 540000, tokens_out: 171000, cost: 0 },
			{ task: 'roadmap', requests: 31, tokens_in: 980000, tokens_out: 124000, cost: 0 },
			{ task: 'competitor_analysis', requests: 24, tokens_in: 720000, tokens_out: 66000, cost: 0 },
			{ task: 'daily_briefing', requests: 30, tokens_in: 210000, tokens_out: 31000, cost: 0 }
		] };
	} );
	get( 'settings', function () {
		var s = w.DEMO_SETTINGS;
		var sec = {};
		[ 'openai_api_key', 'anthropic_api_key', 'gemini_api_key', 'openrouter_api_key', 'custom_api_key', 'gsc_client_secret', 'gsc_tokens', 'github_token', 'pagespeed_api_key', 'serp_api_key', 'claude_oauth_token', 'codex_auth_json', 'sub_shared_secret', 'cloudflare_api_token', 'github_models_api_key', 'serper_api_key', 'searchapi_api_key', 'dataforseo_password', 'google_cse_key', 'perplexity_api_key' ].forEach( function ( k ) {
			sec[ k ] = /gsc|github_token|claude|codex|sub_|cloudflare|serper|pagespeed|gemini|perplexity/.test( k );
		} );
		return { settings: s.settings, schema: s.schema, secrets: sec, providers: API_P.concat( SUB_P ), gsc_redirect_uri: H + 'wp-json/seolity/v1/gsc/callback', encryption: 'sodium_salts' };
	} );



})( window );
