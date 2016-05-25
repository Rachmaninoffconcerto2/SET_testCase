var webDriver = require('selenium-webdriver'),
	By = webDriver.By,
	until = webDriver.until,
	command = webDriver.command;

var driver = new webDriver.Builder()
	.forBrowser('firefox')
	.build();

/*Test case 1 & before step*/
driver.get('https://www.kkbox.com/play/');
driver.findElement(By.id('uid')).sendKeys('findmetest01@gmail.com');
driver.findElement(By.id('pwd')).sendKeys('');
driver.findElement(By.id('login-btn')).click();
driver.wait(function() {
	return driver.isElementPresent(By.css('.sidebar-nav'));
}, 2000)
.then(function() {
	driver.findElement(By.css('.sidebar-nav > ul > li:nth-child(1) > a > span'))
	.getText()
	.then(function(text) {
    	console.log(text === '我的音樂庫');
	});

	driver.findElement(By.css('.sidebar-nav > ul > li:nth-child(2) > a > span'))
	.getText()
	.then(function(text) {
    	console.log(text === '線上精選');
	});

	driver.findElement(By.css('.sidebar-nav > ul > li:nth-child(3) > a > span'))
	.getText()
	.then(function(text) {
    	console.log(text === '電台');
	});

	driver.findElement(By.css('.sidebar-nav > ul > li:nth-child(4) > a > span'))
	.getText()
	.then(function(text) {
    	console.log(text === '一起聽');
	});
});

/*Test case 2*/
driver.wait(function() {
	driver.findElement(By.css('#search_form > input')).sendKeys('清平調');
	driver.findElement(By.id('search_btn_cnt')).click();
	return driver.isElementPresent(By.css('.normal > table > tbody > tr:nth-child(2) > td:nth-child(3) > a'));
}, 3000)
.then(function() {
	driver.findElement(By.css('.normal > table > tbody > tr:nth-child(2) > td:nth-child(3) > a'))
	.getText()
	.then(function(text) {
    	console.log(text === '王菲&鄧麗君 (Faye Wong & Teresa Teng)');
	});
});

/*Test case 3*/
driver.wait(function() {
	driver.findElement(By.css('.sidebar-nav > ul > li:nth-child(3)')).click();
	return driver.isElementPresent(By.css('.carousel-inner > ul > li:nth-child(1) > div > .img-wrap'));
}, 5000)
.then(function() {
	driver.findElement(By.css('.carousel-inner > ul > li:nth-child(1) > div > .img-wrap'))
	.then(function(element) {
		driver.actions().mouseMove(element).perform();
		driver.findElement(By.css('.carousel-inner > ul > li:nth-child(1) > div > div > div > a')).click();
	});
});

var tempCheckSong;

driver.wait(function() {
	return driver.isElementPresent(By.css('.fix-switch > .media > .media-body > .pull-right > a:nth-child(1)'));
}, 5000)
.then(function() {
	//To save the prior song's name
	driver.findElement(By.css('#player > .title > h3 > a'))
	.getText()
	.then(function(text) {
		tempCheckSong = text;
	});
	driver.sleep(10000);
	//wait for playing music for seconds
	driver.findElement(By.css('.fix-switch > .media > .media-body > .pull-right > a:nth-child(1)')).click();
});

/*check if the next song is playing*/

driver.wait(function() {
	return driver.isElementPresent(By.css('#player > .title > h3 > a'));
}, 5000)
.then(function() {
	driver.findElement(By.css('#player > .title > h3 > a'))
	.getText()
	.then(function(text) {
		if (text !== tempCheckSong)
			console.log('Success!');
	});
});

/**/

/*Wait some seconds so we can see the result.*/
driver.sleep(10000);
driver.quit();
