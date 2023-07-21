export type ENV = 'dev' | 'sit' | 'uat' | 'iov' | 'pro'

export type EnvPropsType = {
  [key in ENV]: {
    report_url: string
    report_api: string
  }
}

export const isSupportMonitor = () => {
  // 这里先返回true

  return true
}

const EnvProps: EnvPropsType = {
  dev: {
    report_url: 'http://172.26.239.136:8578/iov/upload/public/sendBehavior',
    report_api: 'ly.iov.h5.monitor.user.behavior.upload',
  },
  sit: {
    report_url: 'http://172.26.239.136:8578/iov/upload/public/sendBehavior',
    report_api: 'ly.iov.h5.monitor.user.behavior.upload',
  },
  uat: {
    report_url: 'http://172.26.239.136:8578/iov/upload/public/sendBehavior',
    report_api: 'ly.iov.h5.monitor.user.behavior.upload',
  },
  iov: {
    report_url: 'http://172.26.239.136:8578/iov/upload/public/sendBehavior',
    report_api: 'ly.iov.h5.monitor.user.behavior.upload',
  },
  pro: {
    report_url: 'http://172.26.239.136:8578/iov/upload/public/sendBehavior',
    report_api: 'ly.iov.h5.monitor.user.behavior.upload',
  },
}

const config: {
  [x: string]: any
  code: string,
  env: string,
  version: string,
  platform: string,
} = {
  code: '',
  env: 'pro', // sit uat pro
  version: '',
  platform: '', // h5-app h5-pc h5-mobile
  ...EnvProps.pro,
}

export default config

/**
 * 
 * @param {*} options 
 */
export function setConfig(options: any) {
  for (const key in config) {
    if (options[key]) {
      config[key] = options[key]
    }
  }
}