const { By, until } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
  }

  inventoryList = By.className("inventory_list");

  async waitUntilLoaded() {
    await this.driver.wait(
      until.elementLocated(this.inventoryList),
      10000
    );
  }
}

module.exports = InventoryPage;