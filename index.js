const puppeteer = require('puppeteer');


async function robo() {

    const browser = await puppeteer.launch(
        {
            headless: true
        }
    );

    const page = await browser.newPage();

    const URL = `https://www.google.com/search?q=noticias+bolsa+de+valores&rlz=1C1GCEA_enBR1016BR1016&tbm=nws&sxsrf=ALiCzsb1e0lxQ5suipi5uRkcs5E8mGGb5g:1662178703465&source=lnt&tbs=qdr:d&sa=X&ved=2ahUKEwj7gbGZ4vf5AhUYr5UCHZBJAPUQpwV6BAgBEBs&biw=1280&bih=951&dpr=1`;

    await page.goto(URL, { waitUntil: 'load', timeout: 120000 });
    // await page.screenshot({ path: 'example.png' });
    
    const resultado = await page.evaluate(() => {
        let titles = document.getElementsByClassName('mCBkyc');
        let noticias = [];

        for (let index = 0; index < titles.length; index++) {
            const element = titles[index];
            noticias.push({'titulo': element.innerText, 'link': element.parentElement.parentElement.parentElement.href});
        }
        return noticias
    });

    console.log(resultado);

    await browser.close();
}

robo();