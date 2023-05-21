const press = require('./src/press')

//登入然後打卡
press('#BtnWork')
	.then(console.log)
	.catch(console.error)
