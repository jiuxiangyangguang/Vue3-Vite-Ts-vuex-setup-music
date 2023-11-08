import server from './request'

function MyServer() {
  // @ts-ignore
  this.server = server
}
MyServer.prototype.parseRouter = function (name: string, urlObj: any) {
  this[name] = {}
  Object.keys(urlObj).forEach((apiName) => {
    this[name][apiName] = this.sendMes.bind(
      this,
      name,
      apiName,
      urlObj[apiName].url,
      urlObj[apiName].type
    )
  })
}

MyServer.prototype.sendMes = function (
  moduleName: string,
  apiName: string,
  url: string,
  type: string,
  config: any
) {
  const configs = config || {} // 用户自定义配置
  const types = type || 'get' // 请求方式
  const reData = configs?.data || {} // 请求数据
  const self = this

  // 数据处理模块
  const defaultFn = function (mes: any) {
    return mes
  }
  // 效果处理
  const before = function (mes: any) {
    return mes
  }

  const success = config?.success || defaultFn

  this.server[type](url, { params: reData }).then(before).then(defaultFn)
}

// @ts-ignore
export default new MyServer()
