import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { RadarChart } from "react-native-gifted-charts";
import { CursusUser42 } from "@/types/user";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ui/ThemedText";
import { theme } from "@/constants/theme";

const { width: screenWidth } = Dimensions.get("window");

/**
 * Gifted charts Radar:
 *   https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/blob/master/docs/RadarChart/RadarChartProps.md
 */

export const UserSkills = ({
  cursus,
}: {
  cursus: CursusUser42 | undefined;
}) => {
  if (!cursus?.skills || cursus.skills.length === 0) {
    return (
      <View style={[styles.container]}>
        <ThemedText style={styles.noDataText}>
          No skills data available
        </ThemedText>
      </View>
    );
  }

  // Transform skills data for the radar chart
  const radarData = cursus.skills.map(
    (skill) => Math.round(skill.level * 10) / 10
  );
  const skillLabels = cursus.skills.map((skill) =>
    skill.name.length > 10 ? skill.name.substring(0, 10) + ".." : skill.name
  );

  // Debug logging
  // const dataLabels = cursus.skills.map((skill) => `${skill.level.toFixed(1)}`);
  // console.log("Skills data:", {
  //   skillsCount: cursus.skills.length,
  //   skillNames: skillLabels,
  //   skillLevels: radarData,
  //   dataLabels: dataLabels,
  // });

  // Calculate max value for better scaling
  const maxSkillLevel = Math.max(...cursus.skills.map((skill) => skill.level));
  const chartMaxValue = Math.max(maxSkillLevel * 1.25, 10); // Add 25% padding or minimum 10

  // Calculate responsive chart size - increase to accommodate labels
  const chartSize = Math.max(screenWidth - 50, 280);

  return (
    <View style={[styles.container]}>
      <View style={styles.chartContainer}>
        <RadarChart
          data={radarData}
          labels={skillLabels}
          maxValue={chartMaxValue}
          noOfSections={4}
          chartSize={chartSize}
          isAnimated={true}
          animationDuration={1200}
          // Ensure labels are visible
          hideLabels={false}
          hideGrid={false}
          hideAsterLines={false}
          // Polygon styling with theme colors
          polygonConfig={{
            stroke: theme.colors.primary.light,
            strokeWidth: 1.5,
            fill: theme.colors.primary.main,
            gradientColor: theme.colors.secondary.main,
            showGradient: true,
            opacity: 0.9,
            gradientOpacity: 0.8,
            isAnimated: true,
            animationDuration: 1200,
            showDataValuesAsLabels: true,
          }}
          // Grid styling
          gridConfig={{
            stroke: theme.colors.secondary.light,
            strokeWidth: 0.3,
            opacity: 0.3,
          }}
          // Axes lines styling
          asterLinesConfig={{
            stroke: theme.colors.ternary.main,
            strokeWidth: 0.3,
          }}
          // Labels styling - make them more visible
          labelConfig={{
            stroke: theme.colors.secondary.dark,
            fontSize: 12,
            fontWeight: "bold",
            fontFamily: "SpaceMono",
          }}
          // Data labels styling
          dataLabelsConfig={{
            stroke: theme.colors.primary.dark,
          }}
          labelsPositionOffset={-0.3}
          dataLabelsPositionOffset={-0.1}
        />
      </View>
      <View style={styles.legend}>
        <ThemedText style={styles.legendText}>
          Each axis represents a different skill, with values from 0 to{" "}
          {chartMaxValue.toFixed(0)}
        </ThemedText>
      </View>
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
    backgroundColor: theme.colors.ternary.light + "aa",
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   marginBottom: 8,
  //   textAlign: "center",
  // },
  // subtitle: {
  //   fontSize: 14,
  //   marginBottom: 20,
  //   textAlign: "center",
  //   opacity: 0.7,
  // },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 360,
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  legend: {
    paddingHorizontal: 20,
  },
  legendText: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.6,
    fontStyle: "italic",
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 50,
  },
});
