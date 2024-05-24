// 本地存储 token、状态、有效时间、刷新命令
export const handleLocalStorage = data => {
  localStorage.setItem("GF_TOKEN", data.access_token); // 本地存储 token
  localStorage.setItem("GF_TOKEN_TYPE", data.token_type); // 本地存储 token_type
  localStorage.setItem("GF_REFRESH_TOKEN", data.refresh_token); // 本地存储 refresh_token 刷新命令
};

// 清除token、清除token_type、有效时间、刷新命令
export const removeToken = () => {
  localStorage.removeItem("GF_TOKEN");
  localStorage.removeItem("GF_TOKEN_TYPE");
  localStorage.removeItem("GF_EXPIRES_IN");
  localStorage.removeItem("GF_REFRESH_TOKEN");
};

// 获取token
export const getToken = () => {
  return localStorage.getItem("GF_TOKEN");
};

// 获取token_type
export const getTokenType = () => {
  return localStorage.getItem("GF_TOKEN_TYPE");
};

// 获取expires_in
export const getExpiresIn = () => {
  return localStorage.getItem("GF_EXPIRES_IN");
};

// 获取refresh_token
export const getRefreshToken = () => {
  return localStorage.getItem("GF_REFRESH_TOKEN");
};

// 判断是否距离过期2个小时
export function isRefreshTokenExpired(isLogin = false) {
  // 判断token的有效时间;
  let expiresIn = getExpiresIn(); //有效时间
  let new_time = parseInt(String(new Date().getTime() / 1000)); //获取当前时间
  const stamp = expiresIn - new_time; // 距离到期时间
  // alert("计算有效时间中：" + stamp + '-----' + expiresIn + '------' + new_time)
  //是否进行判断在不在有效期内
  if (!isLogin) {
    return stamp <= 60 && stamp > 10; // 1分钟
  }
  return stamp <= 5;
}

// 计算token的有效时间(token有效时间 + 现在时间=有效时间)
export function calculateValidTime(date) {
  // alert("获取到本地存储的有效时间:" + JSON.stringify(date))
  const time = parseInt(String(new Date().getTime() / 1000)); //调用方法时的时间(取当前时间的秒级时间戳)
  const validTime = parseInt(date); //token有效期时间(7200)
  const timeValue = time + validTime; //当前时间+token的有效时间
  // alert("计算出的有效时间:" + timeValue.toString())
  localStorage.setItem("GF_EXPIRES_IN", timeValue.toString()); // 本地存储 token有效期时间
}
