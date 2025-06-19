// Users : https://api.intra.42.fr/apidoc/2.0/users/show.html
export interface User42 {
  id: number;
  login: string;
  email: string;
  first_name: string;
  last_name: string;
  image?: {
    link: string;
    versions: {
      large: string;
      medium: string;
      small: string;
      micro: string;
    };
  };
}

export interface User42Details extends User42 {
  level?: number;
  correction_point: number;
  wallet: number;
  // ... add more infos if needed
}
