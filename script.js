import {update, hide, get, restart} from './func.js';
const In = document.getElementById('In')
let messagenum = 0
const url = "https://api.github.com/repos/J9133/messageData/contents/data.json";
const url2 = "https://api.github.com/repos/J9133/messageData/contents/datanum.json";
const token = "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";

async function sand() {
  if (In.value) {
    try {
      const datanum = await get(url2, token);
      const dnum = await datanum.content
      const ddnum = await JSON.parse(atob(dnum))
      console.log(ddnum)
      let num = await ddnum.num;
      console.log(datanum);
      let key = "message" + num;
      
      await update(url, token, { [key]: In.value });
      await update(url2, token, { num: num + 1 });
      await main();
      console.log(key);
      In.value = '';
    } catch (error) {
      console.log("خطأ في إرسال الرسالة:", error);
    }
  }
}

async function reset() {
  try {
    await restart(url, token, {}); 
    await restart(url2, token, { num: 0 }); 
    document.querySelectorAll('#message').forEach(element => element.remove());
    messagenum = 0;
    await main()
  } catch (error) {
    console.error("خطأ في إعادة التعيين:", error);
  }
}

async function main() {
  try {
    const datanum = await get(url2, token);
    let num = datanum.num;
    messagenum = num;
    
    const messages = document.querySelectorAll('#message');
    const d = await get(url, token);
    const decodedContent = atob(d.content);
    const jsondata = JSON.parse(decodedContent);
    console.log(d)
    const data = Object.values(jsondata);
    console.log(data);
    
    messages.forEach(element => element.remove());
    
    for (let i = 0; i < data.length; i++) {
      hide(data[i]);
    }
  } catch (error) {
    console.log(error);
  }
}

main()

window.sand = sand;
window.reset = reset;