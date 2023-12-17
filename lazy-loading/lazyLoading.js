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

const imgLazyLoad = function () {
  let deleteIndexList = [];
  imgList.forEach((img, index) => {
    let rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      img.src = img.dataset.src;
      deleteIndexList.push(index);
    }
  });
  imgList = imgList.filter((img, index) => !deleteIndexList.includes(index));
  //滚动到底部后，移除滚动监听
  if (imgList.length === 0) {
    document.removeEventListener("scroll", imgLazyLoad);
  }
};

document.addEventListener("scroll", imgLazyLoad);
