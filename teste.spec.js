import { Builder, By } from "selenium-webdriver";
import { equal } from "assert";

describe("Site de compras", function () {
  this.timeout(20000);

  let driver;
  before(async function () {
    // driver = await new Builder().forBrowser("firefox").build();
    // driver = await new Builder().forBrowser("MicrosoftEdge").build();
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Fazer compra", async function () {
    await driver.get("https://www.saucedemo.com/");

    let title = await driver.getTitle();
    equal("Swag Labs", title);

    await driver.manage().setTimeouts({ implicit: 500 });

    let nome = await driver.findElement(By.id("user-name"));
    let senha = await driver.findElement(By.id("password"));
    let btnLogin = await driver.findElement(By.id("login-button"));

    await nome.sendKeys("standard_user");
    await senha.sendKeys("secret_sauce");
    await btnLogin.click();

    await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
    await driver
      .findElement(By.xpath("//a[@class='shopping_cart_link']"))
      .click();
    await driver.findElement(By.id("checkout")).click();

    await driver.findElement(By.id("first-name")).sendKeys("first-name");
    await driver.findElement(By.id("last-name")).sendKeys("slast-name");
    await driver.findElement(By.id("postal-code")).sendKeys("postal-code");

    await driver.findElement(By.id("continue")).click();
    await driver.findElement(By.id("finish")).click();

    let mensagem = await driver
      .findElement(By.css("h2.complete-header"))
      .getText();
    equal("Thank you for your order!", mensagem);
  });

  after(async () => await driver.quit());
});
