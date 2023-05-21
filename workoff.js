const press = require('./src/press')

//登入然後打下班下班
press('#BtnOffWork')
	.then(console.log)
	.catch(console.error)
