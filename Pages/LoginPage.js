import { Builder, By, Key, until, Browser } from 'selenium-webdriver';
const { expect, assert} = require('chai');

// const chrome = require('selenium-webdriver/chrome');
// const chromedriver = require('chromedriver')
import { config}  from 'dotenv'

const driver = new Builder().forBrowser('firefox').build();


class LoginPage {

constructor(){
    global.driver = driver;
}
async launcher() {
     
     await  driver.get('http://the-internet.herokuapp.com/secure')
 }

 async getUsername(user) {
    let usernameAttributes = await driver.findElement(By.id(user))
    usernameAttributes.sendKeys(process.env.username);
    return this
    
 }

 async inputPassword(password){
    let passwordAttributes = await driver.findElement(By.name(password))   
    passwordAttributes.sendKeys(process.env.password);
    return this
}
}

export default LoginPage