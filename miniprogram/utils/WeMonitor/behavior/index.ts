import { lazyReportCache } from '../tools/report'
import { getPageURL } from '../tools/utils'

/**
 * Behavior Observer class
 */
export class BehaviorObserver {
  constructor() {
    this._initObserver();
  }

  private _initObserver() {
    this._composeBehaviorObserver();
  }

  private _composeBehaviorObserver() {
    lazyReportCache({
      type: 'behavior',
      subType: 'pv',
      startTime: Date.now(),
      pageURL: getPageURL(),
      referrer: '',
      timestamp: new Date().getTime(),
    })
  }
}
