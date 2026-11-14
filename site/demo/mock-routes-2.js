/* SEOLITY live demo — sample answers: roadmap, chat, data collection, content, keywords. */
(function ( w ) {
	var A = w.DEMO_API, D = w.DEMO, get = A.get, post = A.post, page = A.page;
	var H = D.H, ago = D.ago, P = D.P, Q = D.Q;

	/* ------------------------------------------------------------ roadmap */
	get( 'issues/board', function () {
		return { analysis: { status: 'done', finished_at: ago( 0, 8 ), stages: {} }, categories: [
			{ id: 'indexability', label: 'ایندکس‌پذیری', open: 0, reason: 'گوگل باید بتواند صفحه‌ها را بخزد و ایندکس کند؛ بدون آن هیچ کار دیگری نتیجه نمی‌دهد.', route: '#/indexability' },
			{ id: 'technical', label: 'سئوی فنی', open: 0, reason: 'ریدایرکت‌ها، نقشهٔ سایت، اسکیما و سرعت.', route: '#/audit' },
			{ id: '404', label: 'خطاهای ۴۰۴', open: 3, reason: 'نشانی‌های خرابی که از داخل یا بیرون سایت لینک دارند.', route: '#/404' },
			{ id: 'duplicates', label: 'محتوای تکراری و هم‌نوع‌خواری', open: 2, reason: 'دو صفحه برای یک جست‌وجو، هر دو را ضعیف می‌کند.', route: '#/duplicates' },
			{ id: 'onpage', label: 'سئوی داخل صفحه', open: 9, reason: 'عنوان، توضیحات متا، سرتیترها، تصاویر و نرخ کلیک.', route: '#/content' },
			{ id: 'links', label: 'لینک‌سازی داخلی', open: 7, reason: 'صفحه‌های مهم باید از صفحه‌های مرتبط لینک بگیرند.', route: '#/links' },
			{ id: 'content', label: 'محتوا و استراتژی', open: 4, reason: 'شکاف‌های محتوایی و خوشه‌های موضوعی.', route: '#/content' },
			{ id: 'products', label: 'محصولات', open: 5, reason: 'صفحه‌های محصول، جایی که بازدید به فروش تبدیل می‌شود.', route: '#/products' },
			{ id: 'offpage', label: 'بک‌لینک و بیرون از سایت', open: 1, reason: 'رپورتاژ و کمپین‌های لینک، با پیگیری نتیجه.', route: '#/ai' },
			{ id: 'competitors', label: 'رقبا', open: 2, reason: 'چه کسی بالاتر از شماست و چرا.', route: '#/competitors' }
		] };
	} );
	var guide = [
		{ title: 'صفحه را در ویرایشگر باز کنید', detail: 'از فهرست «محتوا» روی «ویرایش» بزنید؛ در المنتور، گوتنبرگ و ویرایشگر کلاسیک یکسان است.', where: 'سئولیتی ← محتوا', link: '#/content' },
		{ title: 'دکمهٔ «بهینه‌سازی با هوش مصنوعی سئولیتی» را بزنید', detail: 'پیشنهاد در سه نمای «اصلی / پیشنهادی / مقایسه» با امتیاز قبل و بعد نمایش داده می‌شود.', where: 'نوار کناری ویرایشگر' },
		{ title: 'پیش‌نمایش را بررسی و تأیید کنید', detail: 'تا «بررسی و اعمال» را نزنید هیچ چیزی روی سایت تغییر نمی‌کند. بعد از اعمال، سئولیتی نتیجه را روی سایت زنده راستی‌آزمایی می‌کند.', where: 'پنجرهٔ شناور' }
	];
	function task( key, category, priority, status, title, why, extra ) {
		var it = { key: key, id: key, category: category, priority: priority, status: status, title: title, why: why, analysis: '', impact: 7, effort: 2, expected_result: '', done_when: '', targets: [], plan: [], guide: guide, change_reason: '' };
		for ( var k in extra || {} ) {
			it[ k ] = extra[ k ];
		}
		return it;
	}
	var RM = { id: 14, version: 14, created_at: ago( 0, 8 ), meta: {}, summary: {
		mission: { goal: 'مأموریت: رتبهٔ ۱ گوگل برای «کامبوچا»، «خرید کامبوچا» و «کفیر آب» تا پایان فصل', target_queries: [
			{ query: 'خرید کامبوچا', position: 2.8, leader: 'kombucha-land.ir', gap: 'رقیب ۱۴ نظر تأییدشدهٔ خریدار و اسکیمای Product کامل دارد.', next_move: 'نمایش نظرات خریداران و تکمیل اسکیمای محصول' },
			{ query: 'کامبوچا', position: 4.1, leader: 'takhmirkade.ir', gap: 'مقالهٔ رقیب ویدئو و جدول ارزش غذایی دارد.', next_move: 'افزودن ویدئو و جدول ارزش غذایی' },
			{ query: 'کفیر آب', position: 6.3, leader: 'organic-market.ir', gap: 'لینک داخلی کمتر (۳ در برابر ۱۱).', next_move: 'ساخت خوشهٔ موضوعی کفیر و ۸ لینک داخلی' },
			{ query: 'پروبیوتیک چیست', position: 12.4, leader: 'salamat-media.ir', gap: 'عنوان و سرتیترها با قصد جست‌وجو هم‌خوان نیست.', next_move: 'بازنویسی عنوان، H1 و افزودن بخش منابع غذایی' }
		] },
		wins: [ 'همهٔ صفحه‌های مهم ایندکس شده‌اند', '«خرید کامبوچا» در جایگاه ۳', '۴۷ اصلاح تأییدشده در ۳۰ روز' ],
		diagnosis: 'سایت از نظر **فنی و ایندکس** سالم است و مسیر تا اینجا خوب طی شده. بیشترین فاصله تا رتبهٔ ۱ در سه چیز است:\n\n- **سئوی داخل صفحه:** ۹ صفحهٔ پرنمایش، عنوان یا توضیحات متای ضعیف دارند.\n- **هم‌نوع‌خواری:** دو جفت مقاله برای یک جست‌وجو رقابت می‌کنند.\n- **صفحه‌های محصول:** توضیحات کوتاه و تصاویر بدون ALT.\n\nطبق سابقهٔ همین سایت، عنوان‌های شفاف و خریدمحور و لینک‌سازی داخلی بیشترین اثر را داشته‌اند؛ برنامه بر همین اساس چیده شده است.',
		focus: [ 'اصلاح عنوان و H1 مقالهٔ «پروبیوتیک چیست» (۱۴٬۹۰۰ نمایش در ماه)', 'ادغام دو مقالهٔ سرکه سیب و ساخت ریدایرکت ۳۰۱', 'تولید ALT برای ۳۸ تصویر محصول با یک کلیک' ],
		risks: [ 'رقیب کامبوچالند هر هفته محتوای تازه منتشر می‌کند.', 'سه نشانی ۴۰۴ تازه هنوز ریدایرکت نشده‌اند.' ],
		changes_note: 'نسبت به تحلیل قبلی: ۶ کار انجام و راستی‌آزمایی شد، ۲ کار تازه اضافه شد، اولویت «لینک‌سازی داخلی» بالاتر رفت.'
	}, items: [
		task( 't1', 'on-page', 'critical', 'todo', 'بازنویسی عنوان و H1 مقالهٔ «پروبیوتیک چیست»', 'این صفحه ۱۴٬۹۰۰ بار در ماه دیده می‌شود ولی فقط ۱٫۷٪ کلیک می‌گیرد؛ کوئری اصلی در عنوان نیست.', { impact: 9, effort: 2, analysis: 'سه نتیجهٔ اول گوگل همگی عنوان را با خودِ پرسش شروع کرده‌اند و بخش «منابع غذایی» دارند.', expected_result: 'نرخ کلیک از ۱٫۷٪ به حدود ۳٪ و ورود به صفحهٔ اول در ۴ تا ۶ هفته.', done_when: 'عنوان تازه روی سایت زنده دیده شود و گوگل آن را در نتایج نشان دهد.', targets: [ { label: P[ 6 ].title, url: P[ 6 ].url, object_id: 107, object_type: 'post', metric: 'جایگاه ۱۲٫۴ · ۱۴٬۹۰۰ نمایش · CTR ۱٫۷٪', problems: [ 'کوئری اصلی در عنوان نیست', 'بدون توضیحات متا' ], edit: '#' } ], plan: [ { title: 'عنوان تازه: «پروبیوتیک چیست؟ فواید، منابع غذایی و بهترین زمان مصرف»', detail: 'پرسش اصلی در ابتدا، سه وعدهٔ مشخص در ادامه.' }, { title: 'افزودن بخش «۱۲ غذای پروبیوتیک» با جدول', detail: 'پوشش کوئری «غذاهای پروبیوتیک» با ۳٬۲۰۰ نمایش.' }, { title: 'لینک به ۳ محصول مرتبط', detail: 'کامبوچا، کفیر آب و کیمچی.' } ] } ),
		task( 't2', 'images', 'high', 'todo', 'تولید متن جایگزین (ALT) برای ۳۸ تصویر محصول', 'تصاویر بدون ALT در جست‌وجوی تصویر دیده نمی‌شوند و برای کاربران صفحه‌خوان قابل‌فهم نیستند.', { impact: 6, effort: 1, expected_result: 'ورودی از جست‌وجوی تصویر گوگل.', done_when: 'هیچ تصویر محصولی بدون ALT نماند.', targets: [ { label: P[ 8 ].title, url: P[ 8 ].url, object_id: 109, object_type: 'product', metric: '۶ تصویر بدون ALT', problems: [ 'ALT خالی' ], edit: '#' }, { label: P[ 10 ].title, url: P[ 10 ].url, object_id: 111, object_type: 'product', metric: '۴ تصویر بدون ALT', problems: [ 'ALT = نام فایل' ], edit: '#' } ] } ),
		task( 't3', 'cannibalization', 'high', 'doing', 'ادغام دو مقالهٔ «سرکه سیب» در یک صفحهٔ قوی', 'گوگل بین این دو صفحه مردد است و هیچ‌کدام به صفحهٔ اول نمی‌رسد.', { impact: 8, effort: 4, expected_result: 'یک صفحه با مجموع اعتبار هر دو؛ هدف جایگاه ۶ تا ۸.', done_when: 'مقالهٔ ضعیف‌تر ۳۰۱ شود، پیش‌نویس شود و از نقشهٔ سایت بیرون برود.' } ),
		task( 't4', 'links', 'medium', 'todo', 'لینک‌سازی داخلی برای ۷ صفحهٔ کم‌لینک', 'صفحه‌هایی که از داخل سایت لینک نمی‌گیرند دیرتر خزیده می‌شوند.', { impact: 6, effort: 2 } ),
		task( 't5', 'products', 'medium', 'todo', 'گسترش توضیحات ۴ محصول پرفروش تا ۶۰۰ کلمه', 'محصول‌های زیر ۳۰۰ کلمه در این سایت بالاتر از جایگاه ۵ نرفته‌اند.', { impact: 7, effort: 3 } ),
		task( 't6', 'content', 'medium', 'todo', 'ساخت خوشهٔ موضوعی «پروبیوتیک» با ۵ مقالهٔ پشتیبان', 'رقبا برای این موضوع ۱۱ صفحه دارند و شما ۲ صفحه.', { impact: 7, effort: 6 } ),
		task( 't7', 'backlinks', 'medium', 'todo', 'رپورتاژ برای صفحهٔ «خرید کامبوچا» + پیگیری ۳۰ روزه', 'فاصله تا رتبهٔ ۱ بیشتر از جنس اعتبار دامنه است.', { impact: 6, effort: 5 } ),
		task( 't8', 'competitors', 'low', 'todo', 'پوشش ۳ موضوعی که فقط رقیب دارد', 'کامبوچالند برای «کامبوچا در بارداری» رتبهٔ ۲ دارد.', { impact: 5, effort: 4 } ),
		task( 't9', 'indexing', 'high', 'done', 'درخواست ایندکس برای ۴ مقالهٔ تازه', 'مقاله‌های تازه هنوز در گوگل نبودند.', { verified_at: ago( 3 ) } ),
		task( 't10', 'technical', 'high', 'done', 'رفع ۲ زنجیرهٔ ریدایرکت', 'هر پرش اضافه بخشی از اعتبار لینک را هدر می‌دهد.', { verified_at: ago( 6 ) } )
	] };
	get( 'roadmap', function () {
		return { roadmap: RM, running: null, history: [] };
	} );
	var ISS = {
		'404': [
			[ 'high', 'نشانی ۴۰۴ با ۳ لینک داخلی: ‎/category/drinks/kombucha/', H + 'category/drinks/kombucha/', 'مقصد پیشنهادی: ‎/category/beverages/kombucha/‎ (شباهت ۹۴٪). ریدایرکت ۳۰۱ بسازید.' ],
			[ 'medium', 'نشانی ۴۰۴ با بک‌لینک خارجی: ‎/blog/kombucha-benefits/', H + 'blog/kombucha-benefits/', 'این نشانی از دو سایت دیگر لینک دارد؛ به مقالهٔ «کامبوچا چیست» ریدایرکت شود.' ],
			[ 'low', 'فایل حذف‌شده که هنوز لینک دارد: ‎/wp-content/uploads/menu.pdf', H + 'wp-content/uploads/menu.pdf', 'لینک را از برگهٔ «دربارهٔ ما» بردارید.' ]
		],
		duplicates: [
			[ 'high', 'هم‌نوع‌خواری: دو مقاله برای «سرکه سیب»', P[ 11 ].url, 'ادغام در مقالهٔ قوی‌تر، ریدایرکت ۳۰۱ و پیش‌نویس‌کردن مقالهٔ ضعیف‌تر.' ],
			[ 'medium', 'محتوای بسیار مشابه: دو راهنمای «تهیهٔ کفیر»', P[ 2 ].url, 'شباهت متن ۷۱٪؛ یکی را به راهنمای اصلی تبدیل کنید.' ]
		],
		onpage: [
			[ 'critical', 'عنوان با جست‌وجوی واقعی هم‌خوان نیست: «پروبیوتیک چیست»', P[ 6 ].url, 'عنوان را با کوئری اصلی شروع کنید؛ پیشنهاد آماده است.' ],
			[ 'high', 'بدون توضیحات متا (۶ صفحه)', P[ 6 ].url, 'برای هر صفحه توضیحی ۱۲۰ تا ۱۵۵ نویسه‌ای بر اساس کوئری‌های همان صفحه.' ],
			[ 'high', 'تصاویر بدون ALT (۳۸ تصویر)', P[ 8 ].url, 'تولید گروهی ALT با نگاه به خودِ تصویر و نام محصول.' ],
			[ 'medium', 'دو H1 در یک صفحه', P[ 3 ].url, 'عنوان دوم را به H2 تبدیل کنید.' ],
			[ 'medium', 'عنوان بلندتر از ۶۰ نویسه (۵ صفحه)', P[ 4 ].url, 'گوگل انتهای عنوان را می‌بُرد.' ]
		],
		links: [
			[ 'medium', 'صفحهٔ یتیم: «طرز تهیه ماست پروبیوتیک خانگی»', P[ 9 ].url, '۵ لینک از مقاله‌های مرتبط پیشنهاد شده است.' ],
			[ 'medium', 'محصول پرفروش با فقط ۱ لینک داخلی', P[ 10 ].url, 'از مقالهٔ «کفیر آب یا کفیر شیر» به این محصول لینک دهید.' ]
		],
		content: [
			[ 'medium', 'محتوای کم‌عمق: صفحهٔ دستهٔ «نوشیدنی‌های تخمیری»', H + 'category/beverages/', 'یک مقدمهٔ ۱۵۰ کلمه‌ای و پرسش‌های متداول اضافه کنید.' ]
		],
		products: [
			[ 'high', 'توضیحات کوتاه: «اسکوبی کامبوچا» (۱۸۰ کلمه)', P[ 8 ].url, 'گسترش تا ۶۰۰ کلمه فقط بر اساس دادهٔ واقعی محصول.' ],
			[ 'medium', 'بدون توضیح کوتاه و کلمهٔ کلیدی کانونی', P[ 10 ].url, 'کلمهٔ کانونی از کوئری‌های واقعی سرچ کنسول انتخاب می‌شود.' ]
		],
		offpage: [ [ 'medium', 'پیگیری رپورتاژ ماه قبل', P[ 0 ].url, 'نتیجهٔ ۳۰ روزه آماده است.' ] ],
		competitors: [ [ 'low', 'شکاف محتوایی: «کامبوچا در بارداری»', H, 'رقیب رتبهٔ ۲ دارد؛ شما صفحه‌ای ندارید.' ] ]
	};
	get( 'issues/canonical', function ( m, q ) {
		var list = [];
		Object.keys( ISS ).forEach( function ( c ) {
			if ( q.category && q.category !== c ) {
				return;
			}
			ISS[ c ].forEach( function ( x, i ) {
				list.push( { id: c + '-' + i, category: c, status: i === 1 && c === 'onpage' ? 'in_progress' : 'open', priority: x[ 0 ], title: x[ 1 ], url: x[ 2 ], reason: x[ 3 ], auto_fixable: true, action: { type: 'agent', route: '#/' + ( c === 'onpage' ? 'content' : c ) }, edit: '#', verification: null, operation: null } );
			} );
		} );
		if ( 'done' === q.status || 'resolved' === q.status ) {
			list = [ { id: 'd1', category: 'technical', status: 'done', priority: 'high', title: 'زنجیرهٔ ریدایرکت سه‌مرحله‌ای کوتاه شد', url: H + 'shop/', reason: '', auto_fixable: false, action: {}, verified_at: ago( 6 ), verification: { lines: [ 'درخواست زنده: ۳۰۱ → ۲۰۰ در یک پرش', 'نقشهٔ سایت نشانی نهایی را دارد' ] }, operation: null } ];
		}
		return page( list, q );
	} );

	/* ------------------------------------------------------------ chat */
	var convs = [
		{ conversation_id: 'c-demo-1', first_question: 'چرا مقالهٔ پروبیوتیک افت کرده و چه کار کنم؟', title: 'افت مقالهٔ پروبیوتیک', updated: ago( 0, 1 ), messages: 2 },
		{ conversation_id: 'c-demo-2', first_question: 'برای رپورتاژ ماه بعد کدام صفحه را انتخاب کنم؟', title: 'انتخاب صفحه برای رپورتاژ', updated: ago( 2, 3 ), messages: 4 }
	];
	var answer1 = 'بر اساس دادهٔ **۲۸ روز اخیر سرچ کنسول** و آخرین خزش سایت:\n\n**چه اتفاقی افتاده؟**\n\n- جایگاه میانگین صفحه از ۱۰٫۱ به **۱۲٫۴** رسیده و کلیک ۲۱٪ کم شده است.\n- بیشترین افت روی کوئری «پروبیوتیک چیست» است (۱۴٬۹۰۰ نمایش، CTR فقط ۱٫۷٪).\n- رقیب salamat-media.ir ده روز پیش مقاله‌ای با جدول مقایسه و بخش «منابع غذایی» منتشر کرده است.\n\n**چرا؟**\n\n1. کوئری اصلی در عنوان و H1 شما نیست.\n2. صفحه توضیحات متا ندارد و گوگل متن تصادفی نشان می‌دهد.\n3. فقط ۲ لینک داخلی به این صفحه می‌رسد.\n\n**پیشنهاد من** — سه کار را آماده کرده‌ام؛ تغییرها در پنجرهٔ شناور منتظر «بررسی و اعمال» شما هستند و تا تأیید نکنید چیزی روی سایت عوض نمی‌شود.';
	var DEF = { role: 'assistant', id: 2, content: answer1, meta: { status: 'done', route: 'github', ms: 41200, meta: { model: 'Claude (اشتراک)' }, data_used: [ 'سرچ کنسول: ۲۸ روز، صفحه × کوئری (gsc_opportunities)', 'آخرین خزش سایت: عنوان، H1، لینک‌های داخلی', 'اهمیت صفحه: منتشرشده، در نقشهٔ سایت، ۶۴۰ کلیک', 'پایگاه دانش سئو: on-page، ctr، intent (بازار ایران)', 'سابقهٔ سایت: عنوان‌های شفاف +۳۴٪ نرخ کلیک' ], created: [
		{ kind: 'change', ok: true, title: 'عنوان و توضیحات متای تازه برای «پروبیوتیک چیست»', note: 'منتظر بررسی و اعمال', route: '#/changes' },
		{ kind: 'task', ok: true, title: 'افزودن بخش «۱۲ غذای پروبیوتیک» — اولویت بالا', note: 'به مسیر راه اضافه شد', route: '#/actions' },
		{ kind: 'follow_up', ok: true, title: 'سنجش نتیجه در ۲۸ روز آینده', note: 'عددهای امروز سرچ کنسول ثبت شد', route: '#/alerts' }
	], actions: [ { title: 'برنامهٔ رسیدن به رتبه ۱', route: '#/rank1' }, { title: 'لینک‌های داخلی پیشنهادی', route: '#/links' } ] } };
	var store = { 'c-demo-1': [ { role: 'user', id: 1, content: convs[ 0 ].first_question, meta: {} }, DEF ], 'c-demo-2': [ { role: 'user', id: 1, content: convs[ 1 ].first_question, meta: {} }, { role: 'assistant', id: 2, content: 'بهترین گزینه صفحهٔ **«خرید کامبوچای طبیعی»** است:\n\n- همین حالا در جایگاه **۲٫۸** است و با کمی اعتبار بیشتر به رتبهٔ ۱ می‌رسد.\n- صفحهٔ فروش است، پس هر پله بهبود مستقیماً به درآمد تبدیل می‌شود.\n- انکر پیشنهادی: «خرید کامبوچا» (یک بار) و نام برند (یک بار).\n\nبرای سنجش نتیجه یک **پیگیری ۳۰ روزه** ثبت کردم.', meta: { status: 'done', route: 'github', ms: 38700, meta: { model: 'Claude (اشتراک)' }, data_used: [ 'سرچ کنسول: فرصت‌های جایگاه ۴ تا ۲۰', 'دانش سئو: iran-link-building' ], created: [ { kind: 'follow_up', ok: true, title: 'پیگیری رپورتاژ «خرید کامبوچا» — ۳۰ روز دیگر', note: '', route: '#/alerts' }, { kind: 'task', ok: true, title: 'رپورتاژ برای صفحهٔ «خرید کامبوچا»', note: 'دستهٔ بک‌لینک و بیرون از سایت', route: '#/actions' } ] } } ] };
	get( 'chat/conversations', function () {
		return convs;
	} );
	get( 'chat/([\\w-]+)', function ( m ) {
		return { conversation_id: m[ 1 ], messages: store[ m[ 1 ] ] || [] };
	} );
	function reply( text ) {
		var x = text || '';
		var out = { content: '', created: [], data: [ 'سرچ کنسول: ۲۸ روز اخیر', 'آخرین خزش و ممیزی سایت', 'پایگاه دانش سئو (بازار ایران)' ] };
		if ( /تصویر|عکس|alt/i.test( x ) ) {
			out.content = '**وضعیت تصاویر سایت:**\n\n- ۳۸ تصویر محصول بدون ALT\n- ۱۴ تصویر با ALT عمومی (مثل «image» یا نام فایل)\n- ۶ ALT تکراری\n\nمی‌توانم برای همه با نگاه به خودِ تصویر، نام محصول و کلمهٔ کانونی صفحه ALT بنویسم. فهرست پیشنهادها برای بررسی شما آماده شد.';
			out.created = [ { kind: 'change', ok: true, title: 'ALT برای ۳۸ تصویر محصول', note: 'منتظر بررسی و اعمال', route: '#/images' } ];
		} else if ( /محصول|فروش|ووکامرس/.test( x ) ) {
			out.content = '**سه محصول با بیشترین فرصت:**\n\n1. **اسکوبی کامبوچا** — جایگاه ۶٫۲، فقط ۱۸۰ کلمه توضیح و ۶ تصویر بدون ALT.\n2. **دانه کفیر آب** — جایگاه ۵٫۹، بدون توضیح کوتاه و کلمهٔ کانونی.\n3. **سرکه سیب ارگانیک** — جایگاه ۸٫۴ با ۲۷٬۱۰۰ نمایش؛ بیشترین ظرفیت رشد.\n\nبرای هر سه، عنوان، توضیحات، متا، پرسش‌های متداول و ALT فقط بر اساس **دادهٔ واقعی محصول** پیشنهاد می‌دهم (هیچ ویژگی ساختگی اضافه نمی‌شود).';
			out.created = [ { kind: 'task', ok: true, title: 'بهینه‌سازی ۳ محصول پرفرصت', note: 'به مسیر راه اضافه شد', route: '#/actions' } ];
		} else if ( /رقیب|رقبا/.test( x ) ) {
			out.content = '**کامبوچالند** قوی‌ترین رقیب شماست: برای ۹ کوئری از ۱۶ کوئری اصلی بالاتر از شماست.\n\n- **نقطهٔ قوت آن‌ها:** نظرات خریداران و اسکیمای Product کامل.\n- **فرصت شما:** برای «کفیر آب» و «خمیر ترش» محتوای عمیق ندارند.\n- **تهدید:** هفته‌ای ۲ مقالهٔ تازه منتشر می‌کنند.\n\nسه شکاف محتوایی را به برنامه اضافه کردم.';
			out.created = [ { kind: 'task', ok: true, title: 'پوشش ۳ شکاف محتوایی رقبا', note: 'به مسیر راه اضافه شد', route: '#/actions' } ];
		} else {
			out.content = '**امروز این سه کار بیشترین اثر را دارد:**\n\n1. **عنوان و H1 مقالهٔ «پروبیوتیک چیست»** — ۱۴٬۹۰۰ نمایش با CTR ۱٫۷٪. پیشنهاد آماده است.\n2. **ادغام دو مقالهٔ سرکه سیب** — هم‌نوع‌خواری جلوی هر دو را گرفته است.\n3. **ALT برای ۳۸ تصویر محصول** — با یک کلیک.\n\nهر سه در «مسیر راه» با راهنمای قدم‌به‌قدم ثبت شده‌اند. *(این پاسخِ نمونه در نسخهٔ نمایشی است؛ در افزونهٔ واقعی هوش مصنوعی با دادهٔ سایت خودتان پاسخ می‌دهد.)*';
			out.created = [ { kind: 'task', ok: true, title: '۳ کار اولویت‌دار امروز', note: 'در مسیر راه', route: '#/actions' } ];
		}
		return out;
	}
	post( 'chat', function ( m, q, b ) {
		var cid = b.conversation_id || 'c-' + Date.now();
		var list = store[ cid ] = store[ cid ] || [];
		if ( ! b.conversation_id ) {
			convs.unshift( { conversation_id: cid, first_question: b.message, title: b.message, updated: ago( 0 ), messages: 2 } );
		}
		var r = reply( b.message );
		list.push( { role: 'user', id: list.length + 1, content: b.message, meta: {} } );
		list.push( { role: 'assistant', id: list.length + 1, content: r.content, meta: { status: 'done', route: 'github', ms: 39000 + Math.round( Math.random() * 9000 ), meta: { model: 'Claude (اشتراک)' }, data_used: r.data, created: r.created } } );
		return { conversation_id: cid, messages: list };
	} );
	get( 'search', function () {
		return P.slice( 0, 6 ).map( function ( p ) {
			return { id: p.id, title: p.title, url: p.url, type: p.type, object_type: p.type, object_id: p.id };
		} );
	} );

	/* ------------------------------------------------------------ audit */
	get( 'audit', function () {
		return { audit: { id: 12, status: 'done', started_at: ago( 0, 9 ), finished_at: ago( 0, 8 ), urls_done: 412, urls_total: 412 }, running: false, history: [] };
	} );
	get( 'doctor', function () {
		var dx = function ( priority, title, why, impact, fix, route, auto ) {
			return { code: title, priority: priority, title: title, why: why, impact: impact, fix: fix, sample_urls: [ P[ 6 ].url, P[ 3 ].url, P[ 8 ].url ], route: route, auto_fixable: auto, count: 6 };
		};
		return { counts: { critical: 2, high: 11, medium: 34, low: 52 }, diagnoses: [
			dx( 'critical', 'عنوان ۲ صفحهٔ پرنمایش با جست‌وجوی کاربران هم‌خوان نیست', 'کاربر چیزی را جست‌وجو می‌کند که در عنوان شما نمی‌بیند و روی نتیجهٔ دیگری کلیک می‌کند.', 'حدود ۳۸۰ کلیک ازدست‌رفته در ماه', 'عنوان را با کوئری اصلی همان صفحه شروع کنید.', '#/content', true ),
			dx( 'high', '۶ صفحه توضیحات متا ندارند', 'گوگل خودش تکه‌ای از متن را نشان می‌دهد که معمولاً قانع‌کننده نیست.', 'نرخ کلیک پایین‌تر', 'توضیح ۱۲۰ تا ۱۵۵ نویسه‌ای با دعوت به اقدام بنویسید.', '#/content', true ),
			dx( 'high', '۳۸ تصویر بدون متن جایگزین', 'گوگل محتوای تصویر را از ALT می‌فهمد.', 'بدون ورودی از جست‌وجوی تصویر', 'تولید گروهی ALT با هوش مصنوعی.', '#/images', true ),
			dx( 'medium', '۷ صفحهٔ مهم کمتر از ۲ لینک داخلی دارند', 'لینک داخلی به گوگل می‌گوید کدام صفحه مهم‌تر است.', 'خزش دیرتر، جایگاه ضعیف‌تر', 'از مقاله‌های مرتبط لینک بدهید.', '#/links', true ),
			dx( 'medium', '۲ زنجیرهٔ ریدایرکت', 'هر پرش اضافه سرعت و اعتبار را کم می‌کند.', 'هدررفت بودجهٔ خزش', 'مبدأ را مستقیم به مقصد نهایی وصل کنید.', '#/redirects', true ),
			dx( 'low', '۵ عنوان بلندتر از ۶۰ نویسه', 'انتهای عنوان در نتایج بریده می‌شود.', 'پیام ناقص', 'عنوان را کوتاه کنید.', '#/content', true )
		] };
	} );

	get( 'issues', function ( m, q ) {
		var codes = [ [ 'missing_meta_description', 'بدون توضیحات متا', 'high' ], [ 'image_missing_alt', 'تصویر بدون ALT', 'high' ], [ 'title_too_long', 'عنوان بلند', 'low' ], [ 'multiple_h1', 'چند H1', 'medium' ], [ 'thin_content', 'محتوای کم', 'medium' ], [ 'low_inlinks', 'لینک داخلی کم', 'medium' ] ];
		var list = [];
		P.forEach( function ( p, i ) {
			var c = codes[ i % codes.length ];
			list.push( { id: i + 1, url: p.url, title: p.title, check_code: c[ 0 ], label: c[ 1 ], message: c[ 1 ], severity: c[ 2 ], status: 'open', category: 'on-page', first_seen: ago( 9 ), last_seen: ago( 0, 8 ) } );
		} );
		return page( list, q );
	} );

	/* ------------------------------------------------------------ Search Console */
	get( 'gsc/status', function () {
		return { connected: true, configured: true, property: 'sc-domain:demo-shop.ir', properties: [ 'sc-domain:demo-shop.ir' ], last_sync: ago( 0, 6 ), rows: 184320, days: 480 };
	} );
	get( 'gsc/overview', function ( m, q ) {
		return A.period( +q.days || 28 );
	} );

	function rows( kind ) {
		return ( kind === 'query' ? Q.map( function ( x ) {
			return { key: x[ 0 ], query: x[ 0 ], clicks: x[ 2 ], impressions: x[ 3 ], ctr: +( 100 * x[ 2 ] / x[ 3 ] ).toFixed( 1 ), position: x[ 1 ], delta_clicks: Math.round( x[ 2 ] * 0.12 ), delta_position: -0.6 };
		} ) : P.map( function ( p ) {
			return { key: p.url, page: p.url, title: p.title, clicks: p.clicks, impressions: p.imp, ctr: +( 100 * p.clicks / p.imp ).toFixed( 1 ), position: p.pos, delta_clicks: Math.round( p.clicks * 0.1 ), delta_position: -0.4 };
		} ) );
	}
	get( 'gsc/queries', function ( m, q ) {
		return page( rows( 'query' ), q );
	} );
	get( 'gsc/pages', function ( m, q ) {
		return page( rows( 'page' ), q );
	} );

	/* ------------------------------------------------------------ competitors & SERP */
	function comp( id, name, domain, pages, nw ) {
		return { id: id, name: name, domain: domain, crawled: pages, known: pages + 40, last_analyzed: ago( id + 1 ), summary: {
			new_pages: nw,
			stats: { avg_words: 1380 + id * 120, pages_with_faq: 18 + id * 7, sections: { 'blog': Math.round( pages * 0.6 ), 'product': Math.round( pages * 0.3 ), 'category': Math.round( pages * 0.1 ) } },
			ai: {
				summary: name + ' روی مقاله‌های آموزشی بلند و نظرات خریداران سرمایه‌گذاری کرده و برای بیشتر جست‌وجوهای اطلاعاتی حوزهٔ نوشیدنی‌های تخمیری در صفحهٔ اول است.',
				strengths: [ { area: 'محتوا', insight: 'مقاله‌های بلند با جدول و ویدئو', evidence: 'میانگین ' + ( 1380 + id * 120 ) + ' کلمه در برابر ۱٬۲۴۰ کلمهٔ شما' }, { area: 'اعتماد', insight: 'نظرات تأییدشدهٔ خریدار در صفحهٔ محصول', evidence: 'اسکیمای Review در ۸۱٪ محصول‌ها' } ],
				opportunities: [ 'برای «کفیر آب» محتوای عمیقی ندارد.', 'صفحه‌های دستهٔ آن‌ها متن ندارد.', 'به پرسش‌های «عوارض» پاسخ نداده است.' ],
				threats: [ 'هفته‌ای ۲ مقالهٔ تازه منتشر می‌کند.', 'برای «خرید کامبوچا» یک پله بالاتر از شماست.' ],
				actions: [ { priority: 'high', title: 'افزودن نظرات خریداران به ۴ محصول اصلی', reason: 'بزرگ‌ترین تفاوت صفحه‌های محصول شما با رقیب.' }, { priority: 'medium', title: 'نوشتن راهنمای جامع «کفیر آب»', reason: 'رقیب در این موضوع ضعیف است.' } ]
			},
			gap: { summary: 'سه موضوع که رقیب برایشان رتبه دارد و شما صفحه‌ای ندارید.', opportunities: [
				{ keyword: 'کامبوچا در بارداری', type: 'new_article', intent: 'informational', suggested_title: 'مصرف کامبوچا در بارداری و شیردهی؛ بایدها و نبایدها', suggested_url: '/blog/kombucha-pregnancy/', suggested_h1: 'آیا کامبوچا در بارداری ضرر دارد؟', recommended_word_count: 1400, priority: 'high', outline: [ 'پاسخ کوتاه', 'نظر متخصصان', 'مقدار مجاز', 'چه زمانی نباید مصرف کرد', 'پرسش‌های متداول' ], supporting_keywords: [ 'کامبوچا برای زنان باردار', 'عوارض کامبوچا در بارداری' ], reason: 'رقیب رتبهٔ ۲ دارد؛ ۲٬۹۰۰ جست‌وجو در ماه.' },
				{ keyword: 'نگهداری اسکوبی', type: 'new_article', intent: 'informational', suggested_title: 'نگهداری اسکوبی کامبوچا: هتل اسکوبی چیست؟', suggested_url: '/blog/scoby-hotel/', suggested_h1: 'روش درست نگهداری اسکوبی', recommended_word_count: 1100, priority: 'medium', outline: [ 'هتل اسکوبی', 'دمای مناسب', 'نشانه‌های خرابی' ], supporting_keywords: [ 'هتل اسکوبی' ], reason: 'پشتیبان مستقیم صفحهٔ محصول اسکوبی.' }
			] }
		} };
	}
	get( 'competitors', function () {
		return [ comp( 1, 'کامبوچالند', 'kombucha-land.ir', 214, 7 ), comp( 2, 'تخمیرکده', 'takhmirkade.ir', 131, 2 ), comp( 3, 'ارگانیک‌مارکت', 'organic-market.ir', 486, 12 ) ];
	} );
	get( 'serp/tracking', function () {
		return { budget: { available: true, used: 84, limit: 250 }, queries: Q.slice( 0, 8 ).map( function ( x ) {
			return x[ 0 ];
		} ), last_track: { at: ago( 1 ), errors: [] }, own: 'demo-shop.ir', suggestions: [ { domain: 'salamat-media.ir', queries: 6, of: 8, avg_position: 3.4 }, { domain: 'digi-organic.ir', queries: 4, of: 8, avg_position: 5.1 } ] };
	} );
	get( 'serp/sources', function () {
		return { source: 'serper', available: true, sources: { serper: { label: 'Serper', has_key: true }, serpapi: { label: 'SerpApi', has_key: false }, searchapi: { label: 'SearchApi', has_key: false }, dataforseo: { label: 'DataForSEO', has_key: false }, google_cse: { label: 'Google CSE', has_key: false } }, ai_enabled: true, ai_engines: { perplexity: { label: 'Perplexity', has_key: true, cost: '~$0.005' }, gemini: { label: 'Gemini (Google AI)', has_key: true, cost: 'رایگان' } } };
	} );
	get( 'serp/ai-visibility', function () {
		return { running: false, last: { at: ago( 2 ), errors: {} }, items: Q.slice( 0, 5 ).map( function ( x, i ) {
			return { query: x[ 0 ], engines: { perplexity: { cited_at: i % 2 ? 0 : i + 1, answer: 'پاسخ هوش مصنوعی به این جست‌وجو از ۵ منبع ساخته شده است.', competitors: [ { domain: 'kombucha-land.ir', position: 1 }, { domain: 'salamat-media.ir', position: 2 } ] }, gemini: { cited_at: i === 0 ? 2 : 0, answer: '', competitors: [ { domain: 'takhmirkade.ir', position: 1 } ] } } };
		} ) };
	} );

	/* ------------------------------------------------------------ knowledge */
	var KB = [ [ 'on-page', 'سئوی داخل صفحه' ], [ 'meta', 'عنوان و توضیحات متا' ], [ 'ctr', 'بهبود نرخ کلیک' ], [ 'intent', 'قصد جست‌وجو' ], [ 'keywords', 'تحقیق کلمات کلیدی' ], [ 'cannibalization', 'هم‌نوع‌خواری کلمات کلیدی' ], [ 'internal-linking', 'لینک‌سازی داخلی' ], [ 'topic-clusters', 'خوشه‌های موضوعی' ], [ 'content-strategy', 'استراتژی محتوا' ], [ 'eeat', 'تخصص، تجربه، اعتبار و اعتماد (E-E-A-T)' ], [ 'images', 'سئوی تصاویر و متن جایگزین' ], [ 'product', 'سئوی صفحهٔ محصول' ], [ 'ecommerce', 'سئوی فروشگاهی' ], [ 'schema', 'دادهٔ ساختاریافته (اسکیما)' ], [ 'redirects', 'ریدایرکت‌ها' ], [ 'site-migration-redirects', 'مهاجرت نشانی‌ها' ], [ 'gsc-page-indexing', 'گزارش ایندکس صفحات سرچ کنسول' ], [ 'gsc-messages', 'پیام‌های سرچ کنسول' ], [ 'change-impact', 'سنجش اثر تغییرات' ], [ 'experiments', 'آزمایش‌های سئو' ], [ 'serp', 'تحلیل نتایج گوگل' ], [ 'competitors', 'تحلیل رقبا' ], [ 'ymyl-health-food', 'محتوای سلامت و غذا (YMYL)' ], [ 'persian-seo', 'سئوی فارسی' ], [ 'iran/iran-market-overview', 'نمای کلی بازار ایران' ], [ 'iran/iran-hosting-technical', 'هاست، CDN و دسترسی Googlebot در ایران' ], [ 'iran/persian-language-seo', 'زبان فارسی و قواعد نشانی' ], [ 'iran/iran-ecommerce', 'ترب، دیجی‌کالا، باسلام، اینماد و اسکیمای ریالی' ], [ 'iran/iran-link-building', 'رپورتاژ و لینک‌سازی در ایران' ], [ 'iran/iran-seasonality', 'تقویم فصلی (نوروز، یلدا، رمضان)' ], [ 'iran/iran-keyword-research', 'تحقیق کلمه بدون ابزارهای تحریمی' ], [ 'iran/iran-local-seo', 'سئوی محلی با نشان و بلد' ] ];
	get( 'knowledge', function ( m, q ) {
		var list = KB.map( function ( k, i ) {
			return { id: i + 1, topic: k[ 0 ], title: k[ 1 ], lang: 'fa', source: i > 27 ? 'github' : 'bundled', words: 420 + i * 37, updated_at: ago( 3 ) };
		} );
		list.push( { id: 90, topic: 'site-playbook', title: 'پلی‌بوک اختصاصی این سایت (ساختهٔ هوش مصنوعی)', lang: 'fa', source: 'user', words: 2100, updated_at: ago( 1 ) } );
		return { repo: 'demo-user/seolity-ai', path: 'knowledge', synced: { time: Math.round( Date.now() / 1000 ) - 3 * 86400, ok: true, count: list.length }, items: list, total: list.length, market: 'iran' };
	} );
	get( 'knowledge/\\d+', function () {
		return { id: 1, topic: 'images', title: 'سئوی تصاویر و متن جایگزین', lang: 'fa', content: '## متن جایگزین (ALT)\n\n- ALT باید **خودِ تصویر** را توصیف کند، نه اینکه فهرستی از کلمات کلیدی باشد.\n- ۸ تا ۱۲۵ نویسه؛ بدون «تصویرِ…» یا «عکسِ…» در ابتدا.\n- برای تصویر محصول: نام محصول + ویژگی دیده‌شدنی (رنگ، اندازه، بسته‌بندی).\n- تصویر تزئینی ALT خالی می‌گیرد.' };
	} );

	/* ------------------------------------------------------------ content / products / images */
	get( 'content', function ( m, q ) {
		var list = P.map( function ( p, i ) {
			return { id: p.id, object_id: p.id, object_type: p.type === 'product' ? 'product' : 'post', subtype: p.type, title: p.title, url: p.url, edit_link: '#', status: 'publish', focus_keywords: p.kw, rank_math_score: Math.min( 96, p.score + 6 ), score: p.score, words: p.words, meta_title: p.title, meta_description: i % 4 === 2 ? '' : 'توضیحات متای نمونه برای ' + p.title, issues: i % 3 ? [ 'meta_description', 'internal_links' ].slice( 0, i % 3 ) : [], pending: i === 6 ? 2 : 0, clicks: p.clicks, impressions: p.imp, position: p.pos };
		} );
		var o = page( list, q );
		o.post_types = [ { name: 'post', label: 'نوشته‌ها' }, { name: 'page', label: 'برگه‌ها' }, { name: 'product', label: 'محصولات' } ];
		return o;
	} );
	get( 'products', function ( m, q ) {
		var list = P.filter( function ( p ) {
			return p.type === 'product';
		} ).concat( [ { id: 120, title: 'ماست‌بند کفیر شیر', url: H + 'product/milk-kefir-kit/', words: 340, score: 61, kw: [ 'کفیر شیر' ] }, { id: 121, title: 'شیشهٔ تخمیر ۲ لیتری با درپوش هوابند', url: H + 'product/fermentation-jar/', words: 150, score: 44, kw: [] }, { id: 122, title: 'چای سبز ارگانیک مخصوص کامبوچا', url: H + 'product/green-tea/', words: 260, score: 57, kw: [ 'چای کامبوچا' ] } ] ).map( function ( p, i ) {
			return { id: p.id, name: p.title, url: p.url, thumb: '', focus_keyword: p.kw[ 0 ] || '', stock: i === 4 ? 'outofstock' : 'instock', score: p.score, has_short: i % 3 !== 1, desc_words: p.words, has_meta: i % 4 !== 2, images: 4 + ( i % 3 ), images_no_alt: [ 0, 2, 6, 4, 1, 3, 0, 2 ][ i % 8 ], pending_changes: i === 2 ? 1 : 0, price: '', edit_link: '#' };
		} );
		var o = page( list, q );
		o.woocommerce = true;
		return o;
	} );
	function svgThumb( i ) {
		var c = [ '#1D4ED8', '#7c3aed', '#059669', '#d97706', '#db2777', '#0891b2' ][ i % 6 ];
		return 'data:image/svg+xml;utf8,' + encodeURIComponent( '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" rx="10" fill="' + c + '" opacity=".14"/><path d="M18 58l14-18 10 12 8-9 12 15z" fill="' + c + '"/><circle cx="54" cy="26" r="7" fill="' + c + '"/></svg>' );
	}
	get( 'images', function ( m, q ) {
		var iss = [ 'missing_alt', 'filename_alt', 'generic_alt', 'missing_alt', 'duplicate_alt', 'bad_filename', 'missing_alt', 'long_alt', 'stuffed_alt', 'redundant_prefix' ];
		var alts = [ '', 'IMG_2231', 'image', '', 'کامبوچا', 'کامبوچای زنجبیلی', '', 'تصویر یک شیشهٔ بزرگ کامبوچای خانگی طبیعی و ارگانیک با طعم زنجبیل تازه و لیمو روی میز چوبی کنار پنجرهٔ آشپزخانه در نور صبح', 'کامبوچا خرید کامبوچا قیمت کامبوچا', 'عکس دانه کفیر' ];
		var files = [ 'DSC_0412.jpg', 'IMG_2231.jpg', 'scoby-1.webp', 'photo-33.jpg', 'kombucha.jpg', 'Untitled-2.png', 'kefir-grains.webp', 'ginger-kombucha.jpg', 'kombucha-buy.jpg', 'water-kefir.webp' ];
		var list = iss.map( function ( x, i ) {
			return { id: 500 + i, attachment_id: 500 + i, thumb: svgThumb( i ), alt: alts[ i ], filename: files[ i ], parent_title: P[ ( i * 2 + 1 ) % P.length ].title, parent_id: P[ ( i * 2 + 1 ) % P.length ].id, issues: x, url: H + 'wp-content/uploads/' + files[ i ] };
		} );
		var o = page( list, q );
		o.total = 71;
		o.scanned = Math.round( Date.now() / 1000 ) - 86400;
		o.stats = { total: 486, missing_alt: 38, generic_alt: 14, duplicate_alt: 6, stuffed_alt: 2, filename_alt: 7, long_alt: 1, bad_filename: 9, redundant_prefix: 3 };
		return o;
	} );
	get( 'duplicates', function () {
		var post = function ( p, intent, inl ) {
			return { id: p.id, url: p.url, title: p.title, clicks: p.clicks, words: p.words, inlinks: inl, intent: intent, edit: '#' };
		};
		var b = { id: 130, url: H + 'blog/apple-cider-vinegar-benefits/', title: 'خواص سرکه سیب؛ ۱۲ فایدهٔ اثبات‌شده', clicks: 190, words: 980, type: 'post' };
		var c = { id: 131, url: H + 'blog/how-to-make-water-kefir/', title: 'طرز تهیه کفیر آب در خانه', clicks: 140, words: 860, type: 'post' };
		return { running: false, instructions: '', last: { at: ago( 1 ), checked: 96, gsc: true, clusters: [
			{ key: 'k1', kind: 'cannibalization', severity: 'high', clicks: 500, primary: P[ 11 ].id, posts: [ post( P[ 11 ], 'informational', 6 ), post( b, 'informational', 2 ) ], pairs: [ { content: 38, title: 64, h1: 61, topic: 88, queries: [ 'سرکه سیب برای لاغری', 'خواص سرکه سیب', 'فواید سرکه سیب' ], flips: 9, same_intent: true } ], strategy: { best: 'merge', why: 'هر دو مقاله یک قصد جست‌وجو را پاسخ می‌دهند و گوگل در ۹ روز از ۲۸ روز صفحهٔ نمایش‌داده‌شده را عوض کرده است. ادغام در مقالهٔ قوی‌تر، ریدایرکت ۳۰۱ و پیش‌نویس‌کردن مقالهٔ ضعیف‌تر.', alternatives: [ { id: 'differentiate', why: 'اگر بخواهید هر دو بمانند: یکی فقط «لاغری»، دیگری «خواص عمومی» و لینک متقابل.' }, { id: 'canonical', why: 'فقط وقتی متن‌ها تقریباً یکی باشند.' } ] }, why: 'هم‌پوشانی ۸۸٪ موضوع و ۳ کوئری مشترک.', issue: { status: 'open', instructions: '', operation_id: 0 } },
			{ key: 'k2', kind: 'near_duplicate', severity: 'medium', clicks: 1350, primary: P[ 2 ].id, posts: [ post( P[ 2 ], 'comparison', 5 ), post( c, 'how-to', 1 ) ], pairs: [ { content: 71, title: 42, h1: 40, topic: 76, queries: [ 'کفیر آب', 'طرز تهیه کفیر آب' ], flips: 3, same_intent: false } ], strategy: { best: 'differentiate', why: 'قصد جست‌وجو متفاوت است (مقایسه در برابر آموزش). بخش آموزش را از مقالهٔ مقایسه کوتاه کنید و به راهنمای تهیه لینک بدهید.', alternatives: [ { id: 'merge', why: 'اگر راهنمای تهیه بازدید نگیرد.' } ] }, why: 'شباهت متن ۷۱٪.', issue: { status: 'in_progress', instructions: '', operation_id: 0 } }
		] } };
	} );

	/* ------------------------------------------------------------ keywords */
	get( 'rank1', function () {
		var ser = D.S.slice( -28 ).map( function ( r, i ) {
			return { date: r.date, position: +( 4.6 - 1.8 * i / 27 + ( i % 3 ) * 0.1 ).toFixed( 1 ), clicks: 20 + i };
		} );
		return { connected: true, period: [ D.dstr( 28 ), D.dstr( 1 ) ], stats: { won: 3, top3: 5, climbed: 9, best_climb: { query: 'طرز تهیه کامبوچا', from: 5.9, to: 3.6 } }, serp: { automatic: true },
			focus: { query: 'خرید کامبوچا', page: P[ 1 ].url, google: 'https://www.google.com/search?q=' + encodeURIComponent( 'خرید کامبوچا' ), start: { position: 4.6 }, last7: { position: 2.8 }, news: { kind: 'good', text: 'در ۲۸ روز ۱٫۸ پله بالا آمدید؛ فقط دو نتیجه بالاتر از شماست.' }, series: ser,
				serp: { fetched: ago( 1 ), ours: { position: 3 }, leader: { domain: 'kombucha-land.ir', title: 'خرید کامبوچا | کامبوچالند' } },
				plan: { at: ago( 1 ), serp_used: true, data: { verdict: 'close', weeks_min: 3, weeks_max: 6, honest_assessment: 'فاصلهٔ شما تا رتبهٔ ۱ کم است. دو نتیجهٔ بالاتر، نظرات خریداران و اسکیمای کامل‌تری دارند؛ از نظر محتوا و سرعت عقب نیستید.', encouragement: 'از جایگاه ۴٫۶ به ۲٫۸ رسیده‌اید — همین مسیر را ادامه دهید.', what_it_takes: 'نمایش نظرات خریداران، تکمیل اسکیمای Product و ۴ لینک داخلی از مقاله‌های پربازدید.', leader: { who: 'kombucha-land.ir', why_they_rank: '۱۴ نظر تأییدشده، اسکیمای Product + Review، و لینک از صفحهٔ اصلی.' }, gaps: [ 'نظرات خریداران نمایش داده نمی‌شود', 'اسکیمای AggregateRating ندارید', 'فقط ۳ لینک داخلی به صفحه' ], steps: [
					{ title: 'نمایش نظرات خریداران و امتیاز ستاره‌ای', impact: 'high', detail: 'نظرات ووکامرس را فعال و ۵ نظر واقعی اخیر را نمایش دهید.', why_it_moves_this_query: 'هر دو نتیجهٔ بالاتر ستاره در نتایج گوگل دارند.' },
					{ title: 'تکمیل اسکیمای Product (قیمت ریالی، موجودی، امتیاز)', impact: 'high', detail: 'سئولیتی اسکیما را می‌سازد؛ فقط تأیید کنید.', why_it_moves_this_query: 'نتیجهٔ غنی، نرخ کلیک را بالا می‌برد.' },
					{ title: '۴ لینک داخلی از مقاله‌های کامبوچا', impact: 'medium', detail: 'از «کامبوچا چیست» و «طرز تهیه کامبوچا».', why_it_moves_this_query: 'این مقاله‌ها ۳٬۵۰۰ بازدید ماهانه دارند.' }
				], ignore: [ 'افزودن متن بیشتر به صفحه (همین حالا از رقبا بلندتر است)', 'تغییر دوبارهٔ عنوان (آزمایش قبلی مثبت بود)' ], measure: 'جایگاه «خرید کامبوچا» هر هفته؛ هدف: میانگین زیر ۱٫۵ در ۶ هفته.' } },
				steps: [ { route: '#/products' }, { route: '#/schema' }, { route: '#/links' } ] },
			items: Q.map( function ( x, i ) {
				return { query: x[ 0 ], page: P[ i % P.length ].url, brand: false, competing: i === 4 ? 2 : 0, done: x[ 1 ] <= 1.5, prev_position: +( x[ 1 ] + ( i % 4 === 3 ? -0.4 : 1.1 ) ).toFixed( 1 ), position: x[ 1 ], impressions: x[ 3 ], clicks: x[ 2 ], gain: Math.round( x[ 3 ] * 0.2 - x[ 2 ] ), chance: x[ 1 ] <= 1.5 ? 'won' : x[ 1 ] < 4 ? 'close' : x[ 1 ] < 8 ? 'realistic' : x[ 1 ] < 12 ? 'hard' : 'long_shot', intent: /خرید|قیمت/.test( x[ 0 ] ) ? 'buy' : / یا |تفاوت/.test( x[ 0 ] ) ? 'compare' : 'learn' };
			} ) };
	} );
	get( 'rank1/.*', function () {
		return { ok: true };
	} );
	get( 'keywords', function ( m, q ) {
		var list = Q.map( function ( x, i ) {
			return { id: i + 1, keyword: x[ 0 ], intent: /خرید|قیمت/.test( x[ 0 ] ) ? 'transactional' : 'informational', kw_type: i % 5 === 0 ? 'head' : i % 5 === 1 ? 'money' : 'long_tail', opportunity: Math.max( 20, Math.round( 96 - x[ 1 ] * 4 ) ), difficulty: 25 + ( i * 7 ) % 50, data: { position: x[ 1 ], impressions: x[ 3 ], clicks: x[ 2 ] }, target_url: P[ i % P.length ].url, tracked: i < 8 };
		} );
		return page( list, q );
	} );
	get( 'rankmath', function () {
		return { active: true, version: '1.0.230', pro: false, engine: 'rankmath', pillars: 5, redirections: true, scores: { avg: 71, scored: 96, low: 18 }, coverage: { total: 108, with_keyword: 84, without: 24, has_gsc: true, demand_no_kw: P.slice( 6, 11 ).map( function ( p ) {
			return { object_id: p.id, title: p.title, impressions: p.imp, clicks: p.clicks, position: p.pos };
		} ) }, low_pages: P.slice( 7, 12 ).map( function ( p ) {
			return { object_id: p.id, title: p.title, keywords: p.kw, score: p.score - 12, impressions: p.imp, position: p.pos };
		} ) };
	} );
	get( 'links', function ( m, q ) {
		var anchors = [ 'دانهٔ کفیر آب', 'ماست پروبیوتیک خانگی', 'خرید اسکوبی زنده', 'خمیر ترش', 'سرکه سیب با مادر سرکه', 'کیمچی کره‌ای', 'غذاهای پروبیوتیک' ];
		var tg = [ 10, 9, 8, 7, 3, 5, 6 ];
		var list = anchors.map( function ( a, i ) {
			var s = P[ i % 5 ], t2 = P[ tg[ i ] ];
			return { id: i + 1, source_url: s.url, source_title: s.title, target_url: t2.url, target_title: t2.title, target_inlinks: 1 + ( i % 3 ), anchor: a, relevance: 92 - i * 4, reason: 'هر دو صفحه دربارهٔ یک موضوع‌اند و عبارت «' + a + '» همین حالا در متن مبدأ آمده است.', status: 'suggested' };
		} );
		var o = page( list, q );
		o.stats = { orphans: 4, avg_inlinks: 5.8, edges: 1264, top_linked: P.slice( 0, 5 ).map( function ( p, i ) {
			return { title: p.title, url: p.url, inlinks: 41 - i * 6 };
		} ) };
		return o;
	} );
})( window );
