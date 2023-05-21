require('dotenv').config()

const puppeteer = require('puppeteer');

(async () => {
	const { DOMAIN, USERNAME, PASSWD } = process.env
	const browser = await puppeteer.launch({ headless: "new" })
	const page = await browser.newPage()

	await page.goto(DOMAIN)
	await page.type('#FormLayout_edtUserID_I', USERNAME)
	await page.type('#FormLayout_edtPassword_I', PASSWD)
	await page.click('#FormLayout_btnLogin_CD')

	await page.screenshot({ path: 'screenshot/1.png' })

	await page.waitForNavigation()

	await page.screenshot({ path: 'screenshot/2.png' })

	const url = await page.url()


	if (url === 'https://scsrwd.azurewebsites.net/Default.aspx') {
		console.log('登录成功')
	} else {
		console.log('登录失败')
	}

	await page.waitForTimeout(3000)

	// const element = await page.waitForSelector('button > .cardstart')
	// element.click()
	await page.click('#BtnWork.cardstart')
	// await page.click('#BtnOffWork')

	await page.screenshot({ path: 'screenshot/3.png' })

	await browser.close()
})()
