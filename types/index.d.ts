declare type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

declare type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

declare type SearchParams = {
   searchParams: {
    query: string;
    searchedQuery?: string;
   }
}

declare type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  imageDetails:  {
    imageUrl: string;
    imageDescription: string;
    downloads: {
      total: string;
    };
    views: {
      total: string;
    };
    likes: {
      total: string;
    };
  };
}

declare  type ImageType = {
  alt_description: string;
  id: string;
  urls: {
    regular: string; full: string;
  }
  width: number;
  height: number;
}

declare type ImagesProps = {
  images: ImageType[];
  searchText: string; 
}

