declare type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

declare type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

// home page search params
declare type SearchParams = {
   searchParams: {
    query: string;
    searchedQuery?: string;
   }
}

declare type CarDetailsProps = {
  isOpen: boolean;
  closeModal: () => void;
  imageDetails: any;
}


declare type SearchProps = {
  placeholder: string;
}

declare type ImagesProps = {
  images: any;
  searchText: string; 
}