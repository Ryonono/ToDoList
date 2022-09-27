export interface List {
  id: number,
  name: string,
  category_id: number,
  explanation: string,
  // Date型にすることで、pipeでdateが使用できる
  expiration_day: Date,
  priority: string
}