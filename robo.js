const puppeteer = require('puppeteer');


module.exports = 
    async function robo() {
    
        const browser = await puppeteer.launch(
            {
                headless: true
            }
        );
    
        const page = await browser.newPage();
    
        const URL = `https://www.google.com/search?q=bolsa+de+valores&rlz=1C1GCEA_enBR1016BR1016&sxsrf=ALiCzsanqEru55t1wwSNsMaD2dtHi_4V4g:1662307638939&source=lnms&tbm=nws&sa=X&ved=2ahUKEwjy7M3Cwvv5AhWIqZUCHaJeDN4Q_AUoAXoECAIQAw&biw=1366&bih=649&dpr=1`;
    
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
    
        // console.log(resultado);
    
        await browser.close();

        return resultado;
    } 