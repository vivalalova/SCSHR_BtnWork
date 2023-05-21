require('dotenv').config()

const puppeteer = require('puppeteer');



module.exports = async function (selector) {
	const { DOMAIN, USERNAME, PASSWD } = process.env
	const browser = await puppeteer.launch({ headless: "new" })
	const page = await browser.newPage()

	await page.goto(DOMAIN)
	await page.type('#FormLayout_edtUserID_I', USERNAME)
	await page.type('#FormLayout_edtPassword_I', PASSWD)

	// await page.screenshot({ path: 'screenshot/1.png' })

	await page.click('#FormLayout_btnLogin_CD')

	await page.waitForNavigation()

	const url = await page.url()
	if (url === 'https://scsrwd.azurewebsites.net/Default.aspx') {
		console.log('登入成功')
	} else {
		console.log('登入失敗')
	}

	await page.goto('https://scsrwd.azurewebsites.net/home.aspx')

	try {
		await page.click(selector)
		console.log(`success on selector ${selector}!!!`)
	} catch (error) {
		console.log(`fail on selector ${selector}`)
	}

	// await page.screenshot({ path: 'screenshot/2.png' })

	await browser.close()
}
