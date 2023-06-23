const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function runTest() {
  //new instance of the WebDriver
  const chromedriverPath =
    "C:/Users/Ruxandra/Downloads/chromedriver/chromedriver.exe";

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeService(new chrome.ServiceBuilder(chromedriverPath))
    .build();

  try {
    // navigate to login page
    await driver.get("http://localhost:3000/login");

    //find the username input field and enter the email
    const usernameInput = await driver.findElement(
      By.css('input[type="email"]')
    );
    await usernameInput.sendKeys("ruxandra@mail.com");

    //find the password input field and enter the password
    const passwordInput = await driver.findElement(
      By.css('input[type="password"]')
    );
    await passwordInput.sendKeys("Abc*123");

    const loginButton = await driver.findElement(By.id("login-button"));
    await loginButton.click();

    //wait for the page to navigate or display error message
    await driver.wait(until.urlIs("http://localhost:3000/"), 5000);

    const url = await driver.getCurrentUrl();
    //verify the login was successful by checking the URL or other elements on the page
    if (url === "http://localhost:3000/") {
      console.log("Login test passed!");
    } else {
      console.log("Login test failed!");
    }
  } catch (error) {
    console.error("An error ocured during test: ", error);
  } finally {
    await driver.quit();
  }
}

runTest();
