export interface GalleryImage {
  id?: number;
  img: any; // This will be the binary data
}

export interface Gallery {
  id: number;
  title: string;
  subtitle: string;
  postDate: string;
  thumbnailImage?: any;
  images: GalleryImage[];
}
