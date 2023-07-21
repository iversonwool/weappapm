export interface MonitorLogOptions {
  maxLogNumber?: number;
  showTimestamps?: boolean;
}

export interface MonitorLogOptions {
  target?: string ;
  defaultObserver?: ('error' | 'behavior' | 'performance')[];
  pluginOrder?: string[];
  onReady?: () => void;

  log?: MonitorLogOptions,

  /**
   * @deprecated Since v3.12.0, use `log.maxLogNumber`.
   */
  maxLogNumber?: number;
  /**
   * @deprecated Since v3.12.0, use `network.maxNetworkNumber`.
   */
  maxNetworkNumber?: number;
  /**
   * @deprecated Since v3.12.0.
   */
  onClearLog?: () => void;
}
