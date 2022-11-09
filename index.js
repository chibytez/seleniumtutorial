import { Builder, By, Key, until, Browser } from 'selenium-webdriver';
import { expect, assert} from 'chai';
import LoginPage from './Pages/LoginPage'

// const chrome = require('selenium-webdriver/chrome');
// const chromedriver = require('chromedriver')
require('dotenv').config()


describe('End to End Test Suite', () => {
    const login = new LoginPage()

    beforeEach('should launch',async () =>{
      try {
        await  login.launcher()
        await driver.getTitle().then(value => {
          console.log('your title is:', value);
        });
      } catch (error) {
        console.log(error);
      }    
    }) 

    it('login a user', async()=>{
      try {
        login.getUsername('username')
         await driver.findElement(By.id('username')).getAttribute('id').then(ids => {
    
        console.log('your attribute is',ids );   
        assert.deepEqual(ids,'username')     
        })
        await login.inputPassword('password')
            await driver.findElement(By.name('password'))  .getAttribute('name').then(name=>{
                console.log('yoursecond attribute is', name);
                assert.deepEqual(name, 'password')
            })
         await driver.findElement(By.xpath(`//button[@class='radius']`)).click()
      } catch (error) {
        console.log(error);
      }
      
    })



    // it('it should sign up a user with inputs', async ()=>{
    //   try {
    //     await driver.findElement(By.xpath(`//button[@title='Account']`)).click();
    //     await driver.findElement(By.xpath(`(//a[@class='pz-btn-group__btn'])[2]`)).click();
    //     // await driver.wait(until.elementLocated(By.className('font-weight-semi-bold'),4000)).getText().then(value =>{
    //     //   console.log('your value is:',value);
    //     //   assert.deepEqual(value,'Login')
    //     // })
    //     await driver.wait(until.elementLocated(By.xpath(`//input[@name='email']`)),2000).sendKeys("chibuiky@gmail.com");
    //     await driver.findElement(By.xpath(`//input[@name='password']`)).sendKeys("password");
    //     await driver.wait(until.elementLocated(By.xpath(`//button[@class='pz-btn pz-btn--lg position-relative pz-btn--primary pz-btn--wide']`)),2000).click();
        
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })
})