import { ErrorObserver } from '../error/index'
import { BehaviorObserver } from '../behavior/index'
import { isSupportMonitor } from '../tools/consts';
import { PerformanceObserver } from '../performance/index'
import requestProxy from '../tools/request'
import { pageProxy, componentProxy } from '../tools/proxy'
import type { MonitorLogOptions } from './options'

let monitorInstance: Monitor | undefined

class Monitor {
  public version: string = /*__VERSION__*/'1.0.0';
  public isInited: boolean = false;
  public option: MonitorLogOptions = {};

  constructor() {
    if (!isSupportMonitor()) return

    if (!!Monitor.instance && Monitor.instance instanceof Monitor) {
      console.debug('[Monitor] Monitor is already exists.');
      return Monitor.instance;
    }
    Monitor.instance = this;

    this.isInited = false;
    this.option = {
      defaultObserver: ['error', 'behavior', 'performance'],
      log: {},
    };
    this._initMonitor()
  }

  private _initMonitor() {
    this.isInited = true;
    this._addBuiltInObserver();
    console.info(
      '%c Monitor %c v'.concat(this.version, ' '),
      'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #c52928; font-weight: bold;',
      'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #1f4f9a; font-weight: bold;',
    )
  }

  private _addBuiltInObserver() {
    pageProxy()
    componentProxy()
    requestProxy()
    new ErrorObserver();
    // new BehaviorObserver();
    new PerformanceObserver();
  }

  /**
   * Get singleton instance.
   **/
  public static get instance() {
    return monitorInstance;
  }

  /**
   * Set singleton instance.
   **/
  public static set instance(value: Monitor | undefined) {
    if (value !== undefined && !(value instanceof Monitor)) {
      console.debug('[Monitor] Cannot set `Monitor.instance` because the value is not the instance of Monitor.');
      return;
    }
    monitorInstance = value;
  }
}

export default Monitor