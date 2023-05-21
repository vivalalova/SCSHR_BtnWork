const loginAndPressSelector = require('./index')

//登入然後打卡
loginAndPressSelector('#BtnWork')
	.then(console.log)
	.catch(console.error)
