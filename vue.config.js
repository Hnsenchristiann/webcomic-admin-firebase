/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
	publicPath: process.env.DEPLOY_ENV === 'GH_PAGES'
		? '/admin-one-vue-tailwind/'
		: '/',

	// Remove moment.js from chart.js
  //eslint-disable-next-line no-unused-vars
	configureWebpack: config => {
		return {
			externals: {
				moment: 'moment'
			}
		}
	}
}
