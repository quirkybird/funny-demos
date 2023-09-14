// 前端自动读取二进制文件

// fetch("./image/child-8228075_640.jpg")
//   .then((res) => {
//     return res.blob();
//   })
//   .then((data) => {
//     const imgElement = document.createElement("img");
//     imgElement.src = URL.createObjectURL(data);
//     document.body.appendChild(imgElement);
//   });

let imgList = [...document.querySelectorAll("img")];
let length = imgList.length;

const imgLazyLoad = (function () {
  let count = 0;

  return function () {
    let deleteIndexList = [];
    imgList.forEach((img, index) => {
      let rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        img.src = img.dataset.src;
        deleteIndexList.push(index);
        count++;
        //滚动到底部后，移除滚动监听
        if (count === length) {
          document.removeEventListener("scroll", imgLazyLoad);
        }
      }
    });
    imgList = imgList.filter((img, index) => !deleteIndexList.includes(index));
  };
})();

document.addEventListener("scroll", imgLazyLoad);
