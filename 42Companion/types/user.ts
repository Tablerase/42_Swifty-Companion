// Users : https://api.intra.42.fr/apidoc/2.0/users/show.html
export interface User42 {
  id: number;
  login: string;
  email: string;
  first_name: string;
  last_name: string;
  kind: string;
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
  correction_point?: number;
  wallet?: number;
  projects_users?: ProjectUser42[];
  cursus_users?: CursusUser42[];
  // ... add more infos if needed
}

export interface Project42 {
  id: number;
  name: string;
  slug: string;
}

export interface ProjectUser42 {
  id: number;
  occurrence: number;
  final_mark: number | null;
  status: "waiting_for_correction" | "finished" | "in_progress";
  validated?: boolean | null;
  current_team_id: number;
  project: Project42;
  cursus_ids: number[];
  marked_at: string | null;
  marked: boolean;
}

export interface CursusUser42 {
  id: number;
  begin_at: string;
  end_at: string | null;
  grade: string | null;
  level: number;
  skills: Skill42[];
  cursus_id: number;
  has_coalition: boolean;
  blackholed_at: string | null;
  created_at: string;
}

export interface Skill42 {
  id: number;
  name: string;
  level: number;
}
