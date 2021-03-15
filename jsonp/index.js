const random = Math.random();

window[random] = (data) => {
  console.log(data);
};

const script = document.createElement("script");
script.src = `http://qq.com:8888/friends.js?callback=${ramdom}`;
script.onload = () => {
  script.remove();
};

document.body.appendChild(script);

// 封装
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    window[random] = (data) => {
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = `${url}?callback=${random}`;
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
}

jsonp("http://qq.com:8888/friends.js").then((data) => console.log(data));
