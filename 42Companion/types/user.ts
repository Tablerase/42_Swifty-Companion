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

// TODO: Fill this informations
export interface User42Details extends User42 {
  level?: number;
  level_percentage?: number;
  correction_point?: number;
  wallet?: number;
  projects?: string; // with status success or failed
  // ... add more infos if needed
}
