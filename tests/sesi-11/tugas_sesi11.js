const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const fs = require("fs");

const LoginPage = require("../../pages/login.page");
const InventoryPage = require("../../pages/inventory.page");

describe("Sesi 11 - POM & Visual Testing", function () {
  this.timeout(60000);
  let driver;
  let loginPage;
  let inventoryPage;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.waitUntilLoaded();
  });

  it("Berhasil login menggunakan POM", async function () {
    const inventory = await driver.findElement(
      By.className("inventory_list")
    );
    assert.ok(await inventory.isDisplayed());
  });

  it("Visual Testing - Screenshot halaman inventory", async function () {
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(
      "inventory-visual-test.png",
      screenshot,
      "base64"
    );

    assert.ok(fs.existsSync("inventory-visual-test.png"));
  });

  after(async function () {
    await driver.quit();
  });
});