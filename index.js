const Axios = require('axios');
const ElementUI = require('element-ui')


const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const msgCode = {
    "-1": "获取数据出错",
    0: "获取数据成功",
    1: "身份验证失败",
    2: "用户无权访问该模块",
    3: "身份验证通过"
};

// 登录状态的验证
var onLogFailed = function () {
    ElementUI.Message.error(msgCode[1]);
}
var onLogSuccess = function () {
    ElementUI.Message.success(3);
}

// 默认延时
Axios.defaults.timeout = 10000;  //
//
Axios.defaults.baseURL = '';  //
Axios.defaults.withCredentials = true;

// 请求拦截
Axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log("error when request");
        return Promise.reject(error);
    }
);

// 响应拦截
Axios.interceptors.response.use(
    response => {
        const data = response.data;
        const code = data.code;
        if (code === 0) {
            // 正常
            return data.data;
        } else if (code === -1) {
            // 异常
            ElementUI.Message.error(msgCode[code]);
            return null;
        } else if (code === 1) {
            // 用户身份验证失败
            onLogFailed();
            return Promise.reject(response.data)
        } else if (code === 3) {
            // 登录成功
            onLogSuccess();
            return data.data;
        } else {
            // 其他
            ElementUI.Message.warning(msgCode[code]);
            return Promise.reject(response.data)
        }
    },
    error => {
        const status = error.response.status;
        console.log(status + ':' + codeMessage[status]);
        return Promise.reject(error);
    }
);

export default {
    get: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            Axios.get(url, params)
                .then(rsp => resolve(rsp))
                .catch(err => reject(err));
        })
    },
    post: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            Axios.post(url, params)
                .then(rsp => resolve(rsp))
                .catch(err => reject(err));
        })
    },
    setMethod: ({LogFailed, LogSuccess} = {
        LogFailed: onLogFailed,
        LogSuccess: onLogSuccess
    }) => {
        onLogSuccess = LogSuccess;
        onLogFailed = LogFailed;
    },
    setBaseURL: function (baseUrl = '') {
        Axios.defaults.baseURL = baseUrl;
    }
}
