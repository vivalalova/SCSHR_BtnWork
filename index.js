require('dotenv').config()

const puppeteer = require('puppeteer');


/**
 *  登入然後在home頁按指定的selector
 *   */
module.exports = async function (selector, options) {
	const { DOMAIN, USERNAME, PASSWD, DEBUG } = options ?? process.env
	const browser = await puppeteer.launch({ headless: "new" })
	const page = await browser.newPage()

	await page.goto(DOMAIN)
	await page.type('#FormLayout_edtUserID_I', USERNAME)
	await page.type('#FormLayout_edtPassword_I', PASSWD)

	if (DEBUG) {
		console.log('截圖')
		await page.screenshot({ path: 'screenshot/1.png' })
	}

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

	if (DEBUG) {
		console.log('截圖')
		await page.screenshot({ path: 'screenshot/2.png' })
	}

	await browser.close()
}
