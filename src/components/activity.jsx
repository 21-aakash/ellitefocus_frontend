import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css"; // Import the default styles

function Activity({ todos }) {
  console.log(todos);
  // Process to-do data to get activity counts by date
  const getActivityData = (todos) => {
    const activityCounts = {};

    todos.forEach((todo) => {
      const date = new Date(todo.createdAt).toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      activityCounts[date] = (activityCounts[date] || 0) + 1;
    });

    return Object.keys(activityCounts).map((date) => ({
      date: new Date(date),
      count: activityCounts[date],
    }));
  };

  const formattedData = getActivityData(todos);

  return (
    <div className="mt-8 max-w-4xl mx-auto p-4 bg-gray-800  shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Your Todo streak:{" "}
      </h2>

      <CalendarHeatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date()}
        values={formattedData}
        classForValue={(value) => {
            if (!value) {
              return "color-empty"; // No data
            }
            const count = value.count;
            if (count > 5) {
              return "color-scale-high"; // High activity
            } else if (count >= 3) {
              return "color-scale-mid"; // Medium activity
            } else if (count <= 2) {
              return "color-scale-low"; // Low activity
            }
            return "color-empty"; // Default case (though this may not be needed)
          }}
          
      />
    </div>
  );
}

export default Activity;
