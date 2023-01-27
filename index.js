
import { Builder, By, Key, until, Browser } from 'selenium-webdriver';
const { expect, assert} = require('chai');

// const chrome = require('selenium-webdriver/chrome');
// const chromedriver = require('chromedriver')
import { config}  from 'dotenv'
import { alertIsPresent, elementIsVisible } from 'selenium-webdriver/lib/until';


const driver = new Builder().forBrowser('firefox').build();

describe('End to End Test Suite', () => {
   

    beforeEach('should launch',async () =>{
      try {
        await  driver.get('https://demoblaze.com')
      } catch (error) {
        console.log(error);
      }    
    }) 

    it('should be able to order using AMEX credit card', async() => {
        try {
            await driver.findElement(By.xpath("(//a[@id='itemc'])[2]")).click()
            await driver.wait(until.elementLocated(By.linkText("MacBook Pro")),11000).click();
            await driver.wait(until.elementLocated(By.xpath(`//a[@class='btn btn-success btn-lg']`)),11000).click();
            await driver.wait(alertIsPresent(),4000)
            const alert = driver.switchTo().alert()
            await alert.dismiss()
            await driver.wait(until.elementLocated(By.linkText("Cart")),11000).click();
            await driver.sleep(6000)
            const totalPrice = await driver.wait(until.elementLocated(By.xpath(`//h3[@class='panel-title']`))).getText()
            await driver.findElement(By.xpath("(//button[@class='btn btn-success'])")).click()
            await driver.findElement(By.id('name')).sendKeys('John Doe')
            await driver.findElement(By.id('country')).sendKeys('Portugal')
            await driver.findElement(By.id('city')).sendKeys('Lisbon')
            await driver.findElement(By.id('card')).sendKeys('375567668884617')
            await driver.findElement(By.id('month')).sendKeys('02')
            await driver.findElement(By.id('year')).sendKeys('2030')
            await driver.findElement(By.xpath("(//button[@class='btn btn-primary'])[3]")).click()
            await driver.wait(until.elementLocated(By.xpath(`//p[@class='lead text-muted ']`)),11000).getText()
            .then(value => {
              const idValue = value.split('\n')[0]
              const idDivider = idValue.split(' ')
              const realId = idDivider[1]
              expect(Number.parseInt(realId)).to.be.a('number')

              const amountValue = value.split('\n')[1]
              const amountDivider = amountValue.split(' ')
              const realAmount = amountDivider[1]
              expect(realAmount).to.equal(totalPrice)

              const nameValue = value.split('\n')[3]
              const realName = nameValue.split(' ').slice(-2).join(' ')
              expect(realName).to.equal('John Doe')
            })
            
        } catch (error) {
            console.log(error);
        }
    })

    it('should Place order using VISA credit card', async () => {
        try {
            await driver.findElement(By.xpath("(//a[@id='itemc'])[2]")).click()
            await driver.wait(until.elementLocated(By.linkText("MacBook Pro")),11000).click();
            await driver.wait(until.elementLocated(By.xpath(`//a[@class='btn btn-success btn-lg']`)),11000).click();
            await driver.wait(alertIsPresent(),4000)
            const alert = driver.switchTo().alert()
            await alert.dismiss()
            await driver.wait(until.elementLocated(By.linkText("Cart")),11000).click();
            await driver.sleep(6000)
            const totalPrice = await driver.wait(until.elementLocated(By.xpath(`//h3[@class='panel-title']`))).getText()
            await driver.findElement(By.xpath("(//button[@class='btn btn-success'])")).click()
            await driver.findElement(By.id('name')).sendKeys('Percy Clayton')
            await driver.findElement(By.id('country')).sendKeys('United States')
            await driver.findElement(By.id('city')).sendKeys('Jacksonville')
            await driver.findElement(By.id('card')).sendKeys('4411732769254916')
            await driver.findElement(By.id('month')).sendKeys('44')
            await driver.findElement(By.id('year')).sendKeys('2029')
            await driver.findElement(By.xpath("(//button[@class='btn btn-primary'])[3]")).click()
            await driver.wait(until.elementLocated(By.xpath(`//p[@class='lead text-muted ']`)),11000).getText()
            .then(value => {
              const idValue = value.split('\n')[0]
              const idDivider = idValue.split(' ')
              const realId = idDivider[1]
              expect(Number.parseInt(realId)).to.be.a('number')

              const amountValue = value.split('\n')[1]
              const amountDivider = amountValue.split(' ')
              const realAmount = amountDivider[1]
              expect(realAmount).to.equal(totalPrice)

              const nameValue = value.split('\n')[3]
              const realName = nameValue.split(' ').slice(-2).join(' ')
              expect(realName).to.equal('Percy Clayton')
            })
        } catch (error) {
          console.log(error);
        }
    })

    it('should not place an order without a credit card', async () => {
        try {
          await driver.findElement(By.xpath("(//a[@id='itemc'])[2]")).click()
            await driver.wait(until.elementLocated(By.linkText("MacBook Pro")),11000).click();
            await driver.wait(until.elementLocated(By.xpath(`//a[@class='btn btn-success btn-lg']`)),11000).click();
            await driver.wait(alertIsPresent(),4000)
            const alert = driver.switchTo().alert()
            await alert.dismiss()
            await driver.wait(until.elementLocated(By.linkText("Cart")),11000).click();
            await driver.sleep(4000)
            await driver.findElement(By.xpath("(//button[@class='btn btn-success'])")).click()
            await driver.findElement(By.xpath("(//button[@class='btn btn-primary'])[3]")).click()
            const newAlert = driver.switchTo().alert()
            const alertValue = await newAlert.getText()
            console.log('am here:', alertValue);
            assert.deepEqual(alertValue,'Please fill out Name and Creditcard.')
        } catch (error) {
          console.log(error);
        }
    })

})
