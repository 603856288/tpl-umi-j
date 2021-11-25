declare namespace process {
  const env: {
    DEPLOY_ENV: string;
  };
}

// 互斥类型
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
