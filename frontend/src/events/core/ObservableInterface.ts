export default interface ObservableInterface {
  emit<Event> (eventName: string, param?: any)
  on (eventName: string, callback: (param?: any) => any)
}
