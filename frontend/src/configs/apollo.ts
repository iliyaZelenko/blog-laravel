const { FULL_API_GRAPHQL_URL } = global.appEnv

export default {
  tokenName: 'auth__token',
  // optional
  errorHandler (error) {
    console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
  },
  // required
  clientConfigs: {
    default: {
      // required
      httpEndpoint: FULL_API_GRAPHQL_URL,
      // You can use `wss` for secure connection (recommended in production)
      // Use `null` to disable subscriptions
      wsEndpoint: null // 'ws://localhost:4000', // optional
    }
  }
}
