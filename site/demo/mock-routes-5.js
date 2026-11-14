/* SEOLITY live demo — actions (buttons). The most important flows answer with sample results;
 * everything else gets a clear "demo" message from the fallback in mock-api.js. */
(function ( w ) {
	var A = w.DEMO_API, D = w.DEMO, get = A.get, post = A.post;
	var H = D.H, ago = D.ago, P = D.P;
	var OK = { ok: true };
	var store = {};
	var next = 9000;
	function change( o ) {
		o.id = ++next;
		o.status = 'pending';
		o.risk = o.risk || 'low';
		o.source = 'ai_optimizer';
		o.created_at = ago( 0 );
		store[ o.id ] = o;
		return o.id;
	}
	w.DEMO_API.on( 'GET', /^changes\/(9\d{3})$/, function ( m ) {
		return store[ m[ 1 ] ];
	} );

	/* Simple state changes that just succeed. */
	[ 'recommendations/\\d+/status', 'changes/\\d+/(apply|reject|revert|restore|editor-applied)', 'changes/batch/[\\w-]+/(apply|reject)', 'links/\\d+/(apply|dismiss)', 'issues/[\\w-]+/(state|status)', 'roadmap/task', 'alerts/\\d+', 'alerts/read', 'alerts/email', 'activity/\\d+/(dismiss|note)', 'follow-ups/[\\w-]+/check', 'keywords/\\d+', 'settings', 'network', 'rules/\\d+' ].forEach( function ( p ) {
		post( p, function () {
			if ( w.SL && w.SL.toast ) {
				setTimeout( function () {
					w.SL.toast( 'نسخهٔ نمایشی: در افزونهٔ واقعی این کار روی سایت اعمال، راستی‌آزمایی و قابل برگشت است.', 'info' );
				}, 50 );
			}
			return OK;
		} );
	} );
	post( 'briefing/generate', OK );

	/* «Do it» popup: where to do it by hand + the AI plan. */
	get( 'recommendations/[\\w-]+/guide', function () {
		return { id: 1, title: 'بازنویسی عنوان و H1 مقالهٔ «پروبیوتیک چیست»', priority: 'critical', url: P[ 6 ].url, edit: '', module: '#/content', reason: 'این صفحه ۱۴٬۹۰۰ بار در ماه در گوگل دیده می‌شود اما فقط ۱٫۷٪ کلیک می‌گیرد. کوئری اصلی «پروبیوتیک چیست» در عنوان و H1 نیست و صفحه توضیحات متا ندارد.', ai_ready: true, can_run: true, instructions: '', done_when: 'عنوان تازه روی سایت زنده دیده شود (سئولیتی خودش بررسی می‌کند).', guide: [
			{ title: 'نوشته را در ویرایشگر باز کنید', detail: 'نوشته‌ها ← «پروبیوتیک؛ هر آنچه باید بدانید» ← ویرایش', where: 'پیشخوان وردپرس ← نوشته‌ها' },
			{ title: 'عنوان سئو را در Rank Math عوض کنید', detail: 'در کادر Rank Math روی «ویرایش اسنیپت» بزنید و عنوان را با «پروبیوتیک چیست؟» شروع کنید.', where: 'ویرایشگر ← کادر Rank Math' },
			{ title: 'توضیحات متا بنویسید', detail: '۱۲۰ تا ۱۵۵ نویسه، با وعدهٔ مشخص (مثلاً «فهرست ۱۲ منبع طبیعی»).', where: 'ویرایشگر ← کادر Rank Math' },
			{ title: 'به‌روزرسانی را بزنید', detail: 'سئولیتی پس از ذخیره، صفحهٔ زنده را بررسی و کار را تیک می‌زند.', where: '' }
		], plan: [
			{ title: 'عنوان سئو: «پروبیوتیک چیست؟ فواید، منابع غذایی و بهترین زمان مصرف»', detail: 'کوئری اصلی در ابتدا؛ ۵۴ نویسه.' },
			{ title: 'H1 هم‌خوان با عنوان', detail: '«پروبیوتیک چیست و در چه غذاهایی پیدا می‌شود؟»' },
			{ title: 'توضیحات متای ۱۴۲ نویسه‌ای', detail: 'بر اساس سه کوئری پرنمایش همین صفحه.' },
			{ title: 'پیش‌نمایش ← تأیید شما ← اعمال در Rank Math ← راستی‌آزمایی زنده ← پیگیری ۲۸ روزه', detail: 'هر مرحله را زنده می‌بینید و هر تغییر قابل برگشت است.' }
		] };
	} );

	/* Image ALT generation. */
	post( 'images/generate', function ( m, q, b ) {
		var texts = [ [ 'شیشهٔ یک‌لیتری کامبوچای زنجبیلی روی میز چوبی', 'کامبوچای طبیعی با طعم زنجبیل' ], [ 'اسکوبی زندهٔ کامبوچا درون شیشهٔ دهان‌گشاد', 'اسکوبی (قارچ کامبوچا)' ], [ 'دانه‌های شفاف کفیر آب در قاشق چوبی', 'دانهٔ کفیر آب زنده' ], [ 'کاسهٔ کیمچی کره‌ای با کلم و فلفل قرمز', 'کیمچی کره‌ای' ], [ 'بطری سرکه سیب ارگانیک با مادر سرکه', 'سرکه سیب خانگی' ] ];
		var ch = {};
		( b.ids || [] ).forEach( function ( id, i ) {
			ch[ id ] = { alt: texts[ i % texts.length ][ 0 ], caption: texts[ i % texts.length ][ 1 ], title: texts[ i % texts.length ][ 1 ] };
		} );
		return { batch_id: 'b-demo', changes: ch };
	} );
	post( 'images/scan', { ok: true, scanned: 486 } );

	/* Product optimizer. */
	post( 'products/(\\d+)/optimize', function ( m ) {
		var p = P.filter( function ( x ) {
			return String( x.id ) === m[ 1 ];
		} )[ 0 ] || { id: +m[ 1 ], title: 'محصول نمونه', url: H + 'product/demo/', score: 52 };
		var mk = function ( field, before, after, reason, risk ) {
			return change( { object_type: 'product', object_id: p.id, label: p.title, url: p.url, field: field, before_value: before, after_value: after, reason: reason, risk: risk } );
		};
		return { product: { id: p.id, name: p.title }, before: { score: p.score }, after: { score: Math.min( 94, p.score + 27 ) }, warnings: [ 'وزن خالص در دادهٔ محصول ثبت نشده است؛ هوش مصنوعی آن را حدس نزد و در متن نیاورد.' ], batch_id: 'b-demo-p', changes: {
			post_title: mk( 'post_title', p.title, p.title.replace( /^خرید /, '' ) + ' | تازه، زنده و ارسال یخچالی', 'نام محصول در ابتدا و دو مزیت واقعی ثبت‌شده در دادهٔ محصول.' ),
			meta_title: mk( 'meta_title', '', 'خرید ' + p.title.replace( /^خرید /, '' ) + ' | قیمت و ارسال سریع', 'کوئری‌های «خرید …» و «قیمت …» بیشترین نمایش این صفحه را دارند.' ),
			meta_description: mk( 'meta_description', '', p.title + ' با مواد اولیهٔ ارگانیک و بدون مواد نگهدارنده. قیمت روز، ارسال یخچالی به سراسر کشور و راهنمای نگهداری.', '۱۴۸ نویسه با دعوت به اقدام.' ),
			post_excerpt: mk( 'post_excerpt', '', 'تهیه‌شده به روش سنتی، بدون مواد نگهدارنده و با تخمیر طبیعی. مناسب مصرف روزانه.', 'این محصول توضیح کوتاه نداشت.' ),
			post_content: mk( 'post_content', '<p>توضیح کوتاه فعلی محصول (۱۸۰ کلمه).</p>', '<h2>معرفی محصول</h2><p>توضیح کامل بر اساس ویژگی‌های ثبت‌شدهٔ محصول…</p><h2>ویژگی‌ها</h2><ul><li>تخمیر طبیعی</li><li>بدون مواد نگهدارنده</li><li>ارسال یخچالی</li></ul><h2>روش نگهداری و مصرف</h2><p>…</p><h2>پرسش‌های متداول</h2><p><strong>تاریخ مصرف چقدر است؟</strong> …</p>', 'گسترش از ۱۸۰ به حدود ۶۲۰ کلمه؛ فقط از دادهٔ واقعی محصول.', 'high' ),
			focus_keyword: mk( 'focus_keyword', '', 'خرید ' + p.title.split( ' ' ).slice( 0, 2 ).join( ' ' ), 'انتخاب از کوئری‌های واقعی سرچ کنسول برای همین صفحه؛ با هیچ صفحهٔ دیگری مشترک نیست.' ),
			faq_schema: mk( 'faq_schema', '', '۱) تاریخ مصرف چقدر است؟\n۲) چطور نگهداری کنم؟\n۳) ارسال چند روز طول می‌کشد؟', 'سه پرسش پرتکرار از کوئری‌های پرسشی سرچ کنسول.' ),
			alt_501: mk( 'alt', 'IMG_2231', p.title + ' در بسته‌بندی شیشه‌ای', 'ALT قبلی نام فایل بود.' )
		}, ai: {
			focus_keyword: 'خرید ' + p.title.split( ' ' ).slice( 0, 2 ).join( ' ' ), secondary_keywords: [ 'قیمت', 'ارگانیک', 'خانگی' ], long_tail_keywords: [ 'خرید اینترنتی با ارسال یخچالی', 'بهترین برند' ], semantic_keywords: [ 'تخمیر طبیعی', 'پروبیوتیک', 'بدون مواد نگهدارنده' ],
			benefits: [ 'تخمیر طبیعی به روش سنتی', 'بدون مواد نگهدارنده و رنگ مصنوعی', 'ارسال یخچالی' ], content_weaknesses: [ 'توضیحات فقط ۱۸۰ کلمه است', 'روش نگهداری و مصرف نیامده', 'پرسش‌های متداول ندارد' ],
			missing_attributes: [ 'وزن خالص', 'تاریخ تولید', 'کشور سازنده' ], suggested_categories: [ 'نوشیدنی‌های تخمیری' ], suggested_tags: [ 'پروبیوتیک', 'ارگانیک' ],
			cta_suggestions: [ 'همین امروز سفارش دهید، فردا تحویل بگیرید', 'ارسال رایگان برای خرید بالای ۵۰۰ هزار تومان' ], schema_issues: [ 'اسکیمای Product بدون AggregateRating', 'قیمت باید با واحد IRR ثبت شود' ], competitor_gaps: [ 'رقیب اول نظرات خریداران را نمایش می‌دهد', 'رقیب دوم جدول ارزش غذایی دارد' ],
			internal_links: [ { anchor: 'کامبوچا چیست', target_url: P[ 0 ].url, reason: 'مقالهٔ مادر همین موضوع' }, { anchor: 'راهنمای تخمیر خانگی', target_url: P[ 4 ].url, reason: 'خوانندهٔ این راهنما مشتری بالقوه است' } ]
		} };
	} );
})( window );
