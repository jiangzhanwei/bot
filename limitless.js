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

  // 极速点击函数，支持选择索引
  async function clickBtnFastByIndex(selector, index = 0) {
    const btns = document.querySelectorAll(selector);
    const btn = btns[index]; // index 从 0 开始
    if (!btn) return;
    btn.click();
    await new Promise(r => setTimeout(r, 2)); // 微延时，保证事件队列处理
  }

  // 顺序点击函数，支持 [selector, index] 数组
  async function clickSequentially(selectorsWithIndex) {
    for (const [sel, idx] of selectorsWithIndex) {
      await clickBtnFastByIndex(sel, idx);
    }
  }

  // buy1 异步函数
  async function buy1() {
    await clickSequentially([
      ['.chakra-button.css-gw5zph', 0],
      ['.chakra-button.css-118b3za', 0],
      ['.chakra-button.css-1ggc78d', 0]
    ]);
  }

  // sell1 异步函数
  async function sell1() {
    await clickSequentially([
      ['.chakra-button.css-175qj44', 0],
      ['.chakra-button.css-118b3za', 0],
      ['.chakra-button.css-1ggc78d', 0]
    ]);
  }

  // exit 异步函数（第二个按钮点击第四个）
  async function exit() {
    await clickSequentially([
      ['.chakra-button.css-1609o6z', 0],   // 第一个匹配
      ['.chakra-button.css-15hv7xy', 3],   // 第四个匹配
      ['.chakra-button.css-1ggc78d', 0]    // 第一个匹配
    ]);
  }

  // 绑定 iframe 按钮事件
  doc.getElementById('buyBtn').onclick = () => buy1();
  doc.getElementById('sellBtn').onclick = () => sell1();
  doc.getElementById('exitBtn').onclick = () => exit();
};
