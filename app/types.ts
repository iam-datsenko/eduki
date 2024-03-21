export type ParamList = {
  Home: undefined;
  Single: {
    item: Material;
  };
};

export type ApiResponse = {
  materials: Material[];
  total: number;
};

export type Material = {
  id: number;
  firstPreviewImage: {
    plain: string;
    watermarked: string;
  };
  title: string;
  author: {
    details: {
      publicName: string;
    };
  };
  price: number;
  description: string;
};

export type ApiQuery = {
  limit: string;
  p: string;
  q: string;
  world: string;
};
