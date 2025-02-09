// app/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="jobs/index" options={{ title: "Jobs" }} />
      <Tabs.Screen name="bookmarks/index" options={{ title: "Bookmarks" }} />
    </Tabs>
  );
}
