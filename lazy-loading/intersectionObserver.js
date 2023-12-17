const createObserver = () => {
  const options = {
    // 默认root为null或者不设置，默认为视口
    root: null,
    // 可增加根元素参考边距
    rootMargin: "0px",
    // 阈值（目标元素出现内容相对与根元素的百分比）(0-1.0)
    // 1.0意味着元素完全出现在根元素中，才会执行回调函数
    threshold: 0,
  };

  const observer = new IntersectionObserver(loadImg, options);
  const imgs = document.querySelectorAll("img");
  // 可添加多个观察对象，我们把所有图片元素添加进去
  for (const img of imgs) {
    observer.observe(img);
  }
};

const loadImg = (entries, observe) => {
  entries.forEach((entry) => {
    const ele = entry.target;
    // 目标元素进入根元素
    if (entry.isIntersecting && !ele.src) {
      ele.src = ele.dataset.src;
    }
  });
};
// 开启交叉观察
createObserver();
