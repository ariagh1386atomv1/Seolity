/* Demo configuration: what Admin::js_config() sends from PHP inside WordPress. */
(function () {
	var L = {
		dashboard: 'Dashboard', actions: 'SEO roadmap', ai: 'AI SEO Chat', activity: 'Activity', audit: 'Site Audit', gsc: 'Search Console',
		rank1: 'Road to #1', keywords: 'Keywords', rankmath: 'Rank Math & focus keywords', content: 'Content', products: 'Products', images: 'Images',
		links: 'Internal Links', competitors: 'Competitors', experiments: 'Experiments', changes: 'AI Changes', duplicates: 'Duplicate & similar articles',
		redirects: 'Redirects', '404': '404 Monitor', coverage: 'Index coverage', indexability: 'Indexability & crawl budget', schema: 'Schema',
		sitemap: 'Sitemap', robots: 'Robots.txt', reports: 'Reports', alerts: 'Notifications', automation: 'Automation', knowledge: 'Knowledge Base',
		engines: 'AI Engines — Installation & Diagnostics', network: 'Server & speed', subscription: 'Subscription AI', github: 'GitHub & data',
		cloudflare: 'Cloudflare relay', guide: 'Connection guide', settings: 'General settings', 'settings-ai': 'AI settings',
		'settings-crawler': 'Crawler & audits', 'settings-reports': 'Alerts & reports', 'settings-technical': 'Technical settings',
		'settings-schema': 'Schema & entity', 'settings-privacy': 'Privacy & data'
	};
	var nav = [
		[ 'main', '', [ 'ai', 'actions' ] ],
		[ 'overview', 'Overview', [ 'dashboard', 'alerts', 'activity', 'changes', 'experiments', 'reports' ] ],
		[ 'data', 'Data collection', [ 'audit', 'gsc', 'competitors', 'knowledge' ] ],
		[ 'content', 'Content', [ 'content', 'duplicates', 'products', 'images' ] ],
		[ 'keywords', 'Keywords & links', [ 'rank1', 'keywords', 'rankmath', 'links' ] ],
		[ 'technical', 'Technical SEO', [ 'coverage', 'redirects', '404', 'indexability', 'schema', 'sitemap', 'robots' ] ],
		[ 'connections', 'Connections', [ 'engines', 'subscription', 'github', 'cloudflare', 'network', 'guide' ] ],
		[ 'settings', 'Settings', [ 'settings', 'settings-ai', 'settings-crawler', 'settings-reports', 'settings-technical', 'settings-schema', 'settings-privacy', 'automation' ] ]
	];
	var I = window.SEOLITY_I18N || {};
	var tr = function ( s ) { return I[ s ] || s; };
	var order = [ 'dashboard' ];
	nav.forEach( function ( g ) { g[ 2 ].forEach( function ( s ) { if ( order.indexOf( s ) < 0 ) { order.push( s ); } } ); } );
	window.SEOLITY = {
		root: '/__seolity_demo_api__/',
		nonce: 'demo',
		exportUrl: '#',
		route: 'dashboard',
		routes: order.map( function ( s ) { return { slug: s, label: tr( L[ s ] ) }; } ),
		nav: nav.map( function ( g ) { return { id: g[ 0 ], label: tr( g[ 1 ] ), items: g[ 2 ] }; } ),
		rtl: true,
		locale: 'fa_IR',
		brand: { name: 'SEOLITY', logo: '', color: '' },
		adminUrl: '#',
		homeUrl: 'https://demo-shop.ir/',
		pluginUrl: './',
		woo: true,
		version: '1.19.2',
		user: { id: 1 },
		i18n: I
	};
})();
