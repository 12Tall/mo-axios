# mo-axios
personal axios package  

## Install  

```bash
$ npm i mo-axios -S
```  

## Usage  

main.js  
```js
import moAxios from 'mo-axios'

Vue.prototype.$get = moAxios.get;
Vue.prototype.$post = moAxios.post;
Vue.prototype.$setMoAxios = moAxios.setMethod;
```

App.vue  
```js
this.$setMoAxios({
  LogFailed: () => {
    // statements
  },
  LogSuccess: () => {
    // statements
  },
});

this.$post("url",{}).then(rsp=>{
  //  statements
}).catch(err={
  //  statements
});

this.$get("url",{}).then(rsp=>{
  //  statements
}).catch(err={
  //  statements
});
```
