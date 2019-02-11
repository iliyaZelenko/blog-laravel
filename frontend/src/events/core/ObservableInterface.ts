export default interface ObservableInterface  {
  emit<Event> (eventName: string, param: any)
}
