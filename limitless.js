// iframe 样式
const iframeStyle = `
  position: fixed;
  right: 0;
  top: 0;
  width: 160px;
  height: 200px;
  z-index: 999999;
  border-left: 2px solid #ccc;
  background: transparent;
`;

// 按钮样式
const buttonStyle = `
  width: 120px;
  height: 50px;
  font-size: 16px;
`;

// 创建 iframe
const f = document.createElement('iframe');
f.style = iframeStyle;
f.srcdoc = `
  <body style="
    margin:0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:20px;
    height:100%;
    background:transparent;
  ">
    <button id="buyBtn" style="${buttonStyle}">涨1</button>
    <button id="sellBtn" style="${buttonStyle}">跌1</button>
    <button id="exitBtn" style="${buttonStyle}">卖出</button>
  </body>
`;

document.body.appendChild(f);

f.onload = () => {
  const doc = f.contentDocument;

  // 极速点击函数，微延时保证事件队列处理
  async function clickBtnFast(selector) {
    const btn = document.querySelector(selector);
    if (!btn) return;
    btn.click();
    await new Promise(r => setTimeout(r, 2)); // 微延时，让浏览器处理事件队列
  }

  // 顺序连续点击
  async function clickSequentially(selectors) {
    for (const sel of selectors) {
      await clickBtnFast(sel);
    }
  }

  // buy1 异步函数
  async function buy1() {
    await clickSequentially([
      '.chakra-button.css-gw5zph',
      '.chakra-button.css-118b3za',
      '.chakra-button.css-1ggc78d'
    ]);
  }

  // sell1 异步函数
  async function sell1() {
    await clickSequentially([
      '.chakra-button.css-175qj44',
      '.chakra-button.css-118b3za',
      '.chakra-button.css-1ggc78d'
    ]);
  }

  // exit 异步函数
  async function exit() {
    await clickSequentially([
      '.chakra-button.css-1609o6z',
      '.chakra-button.css-15hv7xy',
      '.chakra-button.css-1ggc78d'
    ]);
  }

  // 绑定 iframe 按钮事件
  doc.getElementById('buyBtn').onclick = () => buy1();
  doc.getElementById('sellBtn').onclick = () => sell1();
  doc.getElementById('exitBtn').onclick = () => exit();
};
