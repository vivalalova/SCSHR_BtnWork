require('dotenv').config()

const puppeteer = require('puppeteer')

/**
 *  登入然後在home頁按指定的selector
 *   */
module.exports = async function (selector, options) {
	const { DOMAIN, USERNAME, PASSWD, DEBUG } = options ?? process.env
	const browser = await puppeteer.launch({ headless: "new" })
	const page = await browser.newPage()

	page.on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()}: ${message.text()}`))

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

	try {
		let frames = (await page.frames())
		const frame = frames.find(frame => frame.url() === 'https://scsrwd.azurewebsites.net/Home.aspx')
		await frame.waitForSelector(selector)
		await frame.click(selector)
		await frame.waitForTimeout(5000)
		console.log(`success on selector ${selector}!!!`)
	} catch (error) {
		console.log(`fail on selector ${selector}`, error)
	}

	if (DEBUG) {
		console.log('截圖')
		await page.screenshot({ path: 'screenshot/2.png' })
	}

	await browser.close()
}
