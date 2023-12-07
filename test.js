const { Builder, By, Key, until } = require('selenium-webdriver');



describe('Prueba de Login', function () {
    this.timeout(10000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('Iniciar sesión', async function () {
    try {
      await driver.get('https://www.saucedemo.com/');  
      await driver.findElement(By.id('user-name')).sendKeys('standard_user');
      await driver.findElement(By.css('#password')).sendKeys('secret_sauce');
      await driver.findElement(By.css('[data-test="login-button"]')).click();
      await driver.wait(until.titleIs('Swag Labs'), 5000);
    } catch (error) {

      // Capturar y tomar captura de pantalla
      await takeScreenshot('success_screenshot.png');
      throw error;
    }
  });

  after(async function () {
    await driver.quit();
  });

  async function takeScreenshot(filename) {
    const screenshot = await driver.takeScreenshot();
    require('fs').writeFileSync(filename, screenshot, 'base64');
  }
});

describe('Prueba de Login', function () {  
    after(async function () {
      await driver.quit();
      logger.addContext({ title: 'Capturas de pantallas', value: 'success_screenshot.png' });
      logger.attachScreenshot('success_screenshot.png');
      logger.generateReport();
    });
  
  });