import { theme } from "@/constants/theme";
import { useUser } from "@/hooks/useUser";
import { CursusUser42, ProjectUser42 } from "@/types/user";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ui/ThemedText";

const getProjectColor = (project: ProjectUser42) => {
  const itemColors = {
    exam: theme.colors.accent.success,
    c_piscine: theme.colors.accent.info,
    transcendence: theme.colors.accent.error,
    embedded: theme.colors.neutral.dark + "aa",
  };

  switch (project.project.slug) {
    case project.project.slug.includes("transcendence")
      ? project.project.slug
      : "":
      return itemColors.transcendence;
    case project.project.slug.includes("exam") ? project.project.slug : "":
      return itemColors.exam;
    case project.project.slug.includes("embedded") ? project.project.slug : "":
      return itemColors.embedded;
    case project.project.slug.includes("c-piscine") ? project.project.slug : "":
      return itemColors.c_piscine;
    default:
      return null;
  }
};

export const ProjectItem = ({ project }: { project: ProjectUser42 }) => {
  const customColor: any = getProjectColor(project);
  const styleBgColor: any = customColor ? { backgroundColor: customColor } : {};
  const scoreColor: any =
    project.final_mark === 0
      ? { backgroundColor: theme.colors.accent.warning }
      : {};

  return (
    <>
      <View style={styles.projectItem}>
        <ThemedText type="caption" style={[styles.title, styleBgColor]}>
          {project.project.name}
        </ThemedText>
        <ThemedText type="caption" style={[styles.score, scoreColor]}>
          {project.final_mark}
        </ThemedText>
      </View>
    </>
  );
};

export const UserProjects = ({
  cursus,
}: {
  cursus: CursusUser42 | undefined;
}) => {
  const { user } = useUser();
  const projects = user?.projects_users?.filter(
    (project) =>
      project.status === "finished" &&
      project.project.id &&
      project.project.name &&
      project.project.slug
  );
  if (!projects || projects.length === 0) {
    return (
      <View style={[styles.container]}>
        <ThemedText style={styles.noDataText}>
          No skills data available
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.legendText}>Completed Projects</ThemedText>
      <FlatList
        data={projects}
        renderItem={({ item }) => <ProjectItem project={item} />}
        keyExtractor={(item, index) => `${item.project.id}-${index}`}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: theme.spacing.medium,
    margin: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.secondary.light + "aa",
  },
  projectItem: {
    flexDirection: "row",
    flex: 1,
    gap: theme.spacing.xlarge,
    width: "100%",
    justifyContent: "space-between",
    borderRadius: theme.borderRadius.medium,
    borderBottomColor: theme.colors.neutral.main,
    borderBottomWidth: 1,
    padding: theme.spacing.small,
  },
  legendText: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.6,
    fontStyle: "italic",
  },
  title: {
    backgroundColor: theme.colors.secondary.main,
    color: theme.colors.text.secondary,
    flex: 3,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
  },
  score: {
    flex: 1,
    backgroundColor: theme.colors.primary.light,
    color: theme.colors.primary.dark,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    textAlign: "center",
    alignSelf: "center",
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 50,
  },
});
