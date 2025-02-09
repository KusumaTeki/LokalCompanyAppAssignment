// // app/(tabs)/bookmarks/index.tsx
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import { getAllBookmarks, createBookmarksTable } from "../../utils/db";
// import { useRouter } from "expo-router";

// export default function BookmarksScreen() {
//   const navigation = useNavigation();
//   const [bookmarks, setBookmarks] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const router = useRouter();

//   const loadBookmarks = async () => {
//     try {
//       const data = await getAllBookmarks();
//       console.log("Bookmarks loaded:", data);
//       setBookmarks(data);
//     } catch (error) {
//       console.error("Error loading bookmarks:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create table on mount (if not created) and load bookmarks.
//   useEffect(() => {
//     (async () => {
//       await createBookmarksTable();
//       await loadBookmarks();
//     })();
//   }, []);

//   // Reload bookmarks when screen is focused.
//   useFocusEffect(
//     useCallback(() => {
//       loadBookmarks();
//     }, [])
//   );

//   const renderItem = ({ item }: { item: any }) => {
//     let job;
//     try {
//       job = JSON.parse(item.jobData);
//     } catch (e) {
//       console.error("Error parsing bookmark jobData:", e);
//       return null;
//     }
//     return (
//       //   <TouchableOpacity
//       //     style={styles.card}
//       //     onPress={() =>
//       //       navigation.navigate("jobs", {
//       //         screen: "details",
//       //         params: { jobId: job.id, job: encodeURIComponent(JSON.stringify(job)) },
//       //       })
//       //     }
//       //   >
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() =>
//           router.push(
//             `/jobs/details/${job.id}?job=${encodeURIComponent(
//               JSON.stringify(job)
//             )}`
//           )
//         }
//       >
//         <Text style={styles.title}>{job.title}</Text>
//         <Text style={styles.company}>{job.company_name}</Text>
//         <Text style={styles.details}>
//           {job.primary_details?.Place || "N/A"}
//         </Text>
//         <Text style={styles.salary}>
//           {job.primary_details?.Salary || "N/A"}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#e91e63" />
//       </View>
//     );
//   }

//   if (bookmarks.length === 0) {
//     return (
//       <View style={styles.centered}>
//         <Text>No bookmarks found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={bookmarks}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.listContent}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#fff" },
//   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
//   listContent: { paddingBottom: 16 },
//   card: {
//     backgroundColor: "#f9f9f9",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   title: { fontSize: 16, fontWeight: "bold" },
//   company: { fontSize: 14, color: "#555" },
//   details: { fontSize: 12, color: "#777" },
//   salary: { fontSize: 14, color: "#e91e63", fontWeight: "bold" },
// });


// app/(tabs)/bookmarks/index.tsx
import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { getAllBookmarks, createBookmarksTable } from "../../utils/db";

export default function BookmarksScreen() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadBookmarks = async () => {
    try {
      const data = await getAllBookmarks();
      console.log("Bookmarks loaded:", data);
      setBookmarks(data);
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize database table and load bookmarks on mount.
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await createBookmarksTable();
        await loadBookmarks();
      })();
    }, [])
  );

  const renderItem = ({ item }: { item: any }) => {
    let job;
    try {
      job = JSON.parse(item.jobData);
    } catch (e) {
      console.error("Error parsing bookmark jobData:", e);
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push(`/jobs/${job.id}?job=${encodeURIComponent(JSON.stringify(job))}`)
        }
      >
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company_name}</Text>
        <Text style={styles.details}>{job.primary_details?.Place || "N/A"}</Text>
        <Text style={styles.salary}>{job.primary_details?.Salary || "N/A"}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No bookmarks found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContent: { paddingBottom: 16 },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  company: { fontSize: 14, color: "#555" },
  details: { fontSize: 12, color: "#777" },
  salary: { fontSize: 14, color: "#e91e63", fontWeight: "bold" },
});
