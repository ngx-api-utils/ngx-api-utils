declare module '@pollyjs/core' {
  export const Polly: any;
}

declare module '@pollyjs/adapter-xhr' {
  const XHRAdapter: any;
  export default XHRAdapter;
}

declare module '@pollyjs/adapter-fetch' {
  const FetchAdapter: any;
  export default FetchAdapter;
}
