export interface Item {
  id: number;
  title: string;
  image_url: string;
}

export interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

export interface Params {
  uf: string;
  city: string;
}
