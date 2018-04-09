# account-system-sdk
电商网站账号体系SDK

业务模块
统一 登陆、注册、找回、账户设置、安全设置 功能</br>
对下游开放文字与样式的控制</br>

## how to start

$npm install html-bundler -g                 </br>
$cd projet && npm install                    </br>
$hb dev -p 8080                              </br>
$hb dest                                     </br>

### 账号注册流程：</br>
##### 1.设置账号名
![](https://github.com/Month7/previewImages/blob/master/account/step1.png)
![](https://github.com/Month7/previewImages/blob/master/account/step1.1.png)
##### 2.填写账号信息
![](https://github.com/Month7/previewImages/blob/master/account/step2.png)
##### 3.设置支付方式
![](https://github.com/Month7/previewImages/blob/master/account/step3.png)
##### 4.注册成功
![](https://github.com/Month7/previewImages/blob/master/account/step4.png)
### 如何在单页页面中使用sdk
###### 以register-onepage.html为例
1.引入sdk资源</br>
` <script type="text/javascript" src="../lib/vendors.js"></script> `</br>
` <script type="text/javascript" src="../js/register/init.js"></script>`</br>
2. 添加如下代码 
```javascript
pass.regMobile({
     container: '',    //根元素
     success: function() {
     //提交手机号成功后的事件
     }
});
```
