export interface Product {
  title: string
  price: number
  imageCover: string
  category: {name: string}
  ratingsAverage: number
  _id?:string
}
