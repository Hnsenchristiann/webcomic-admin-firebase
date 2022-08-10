import {
	mdiAccountCircle,
	mdiDesktopMac,
	// mdiGithub,
	mdiLock,
	// mdiAlertCircle,
	// mdiMonitorShimmer,
	mdiSquareEditOutline,
	mdiTable,
	// mdiViewList,
	mdiTelevisionGuide
	// mdiResponsive
	// mdiPalette
} from '@mdi/js'

export default [
	'General',
	[
		{
			to: '/dashboard',
			icon: mdiDesktopMac,
			label: 'Dashboard'
		}
	],
	'webcomic',
	[
		// {
		//   to: '/tables',
		//   label: 'Tables',
		//   icon: mdiTable
		// },
		{
			label: 'Comic',
			icon: mdiTable,
			menu: [
				{
					label: 'Comic List',
					icon: mdiTable,
					to: '/comic'
				},
				{
					label: 'Add new comic',
					icon: mdiTable,
					to: '/comic/add'
				}
			]
		},
		// {
		//   label: 'Chapter',
		//   icon: mdiTable,
		//   menu: [
		//     // {
		//     //   label: 'Chapter List',
		//     //   icon: mdiTable,
		//     //   to: '/comic/:comicId/chapter'
		//     // },
		//     {
		//       label: 'Add new chapter',
		//       icon: mdiTable,
		//       to: '/chapter/add'
		//     }
		//   ]
		// },
		// {
		//   label: 'Page',
		//   icon: mdiTable,
		//   menu: [
		//     // {
		//     //   label: 'Page List',
		//     //   icon: mdiTable,
		//     //   to: '/comic/:comicId/chapter/:chapterId/page'
		//     // },
		//     {
		//       label: 'Add new page',
		//       icon: mdiTable,
		//       to: '/page/add'
		//     }
		//   ]
		// },
		// {
		//   to: '/forms',
		//   label: 'Forms',
		//   icon: mdiSquareEditOutline
		// },
		{
			label: 'Author',
			icon: mdiSquareEditOutline,
			menu: [
				{
					label: 'Author List',
					icon: mdiSquareEditOutline,
					to: '/author'
				},
				{
					label: 'Add new author',
					icon: mdiSquareEditOutline,
					to: '/author/add'
				}
			]
		},
		// {
		//   to: '/ui',
		//   label: 'UI',
		//   icon: mdiTelevisionGuide
		// },
		{
			to: '/comment',
			label: 'Comment',
			icon: mdiTelevisionGuide
		},
		{
			label: 'Genre',
			icon: mdiTelevisionGuide,
			menu: [
				{
					label: 'Genre List',
					icon: mdiTelevisionGuide,
					to: '/genre'
				},
				{
					label: 'Add new genre',
					icon: mdiTelevisionGuide,
					to: '/genre/add'
				}
			]
		},
		{
			label: 'Tag',
			icon: mdiTelevisionGuide,
			menu: [
				{
					label: 'Tag List',
					icon: mdiTelevisionGuide,
					to: '/tag'
				},
				{
					label: 'Add new tag',
					icon: mdiTelevisionGuide,
					to: '/tag/add'
				}
			]
		},
		// {
		//   to: '/responsive',
		//   label: 'Responsive',
		//   icon: mdiResponsive
		// },
		// {
		//   to: '/',
		//   label: 'Styles',
		//   icon: mdiPalette
		// },
		// {
		//   to: '/profile',
		//   label: 'Profile',
		//   icon: mdiAccountCircle
		// },
		{
			label: 'User',
			icon: mdiAccountCircle,
			menu: [
				{
					label: 'User List',
					icon: mdiAccountCircle,
					to: '/user'
				},
				{
					label: 'User Profile',
					icon: mdiAccountCircle,
					to: '/user/profile'
				}
			]
		},
		{
			to: '/settings',
			label: 'Settings',
			icon: mdiLock
		}
		// {
		//   to: '/login',
		//   label: 'Login',
		//   icon: mdiLock
		// }
		// {
		//   to: '/error',
		//   label: 'Error',
		//   icon: mdiAlertCircle
		// },
		// {
		//   label: 'Submenus',
		//   subLabel: 'Submenus Example',
		//   icon: mdiViewList,
		//   menu: [
		//     {
		//       label: 'Sub-item One'
		//     },
		//     {
		//       label: 'Sub-item Two'
		//     }
		//   ]
		// }
	]
	// 'About',
	// [
	//   {
	//     href: 'https://justboil.me/tailwind-admin-templates/vue-dashboard/',
	//     label: 'Premium version',
	//     icon: mdiMonitorShimmer,
	//     target: '_blank'
	//   },
	//   {
	//     href: 'https://github.com/justboil/admin-one-vue-tailwind',
	//     label: 'GitHub',
	//     icon: mdiGithub,
	//     target: '_blank'
	//   }
	// ]
]
