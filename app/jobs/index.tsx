// // app/(tabs)/jobs/index.tsx
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { useRouter } from "expo-router";

// const API_URL = "https://testapi.getlokalapp.com/common/jobs?page=1";

// export default function JobsScreen() {
//   const router = useRouter();
//   const [jobs, setJobs] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
//   const [page, setPage] = useState<number>(1);
//   const [hasMore, setHasMore] = useState<boolean>(true);

//   // Fetch jobs from API
//   const fetchJobs = async (pageToFetch: number) => {
//     try {
//       if (pageToFetch === 1) setLoading(true);
//       const response = await fetch(`${API_URL}${pageToFetch}`);
//       const json = await response.json();
//       console.log("API Response:", json);
//       // Adjust the parsing here if your API returns a different structure.
//       const newJobs = json.data && Array.isArray(json.data) ? json.data : [];
//       if (pageToFetch === 1) {
//         setJobs(newJobs);
//       } else {
//         setJobs(prev => [...prev, ...newJobs]);
//       }
//       if (newJobs.length === 0) {
//         setHasMore(false);
//       }
//     } catch (err: any) {
//       console.error("Error fetching jobs:", err);
//       setError("Error fetching jobs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs(page);
//   }, [page]);

//   const loadMore = () => {
//     if (!loading && hasMore) {
//       setPage(prev => prev + 1);
//     }
//   };

//   const renderJobCard = ({ item }: { item: any }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() =>
//         router.push(`/jobs/${item.id}?job=${encodeURIComponent(JSON.stringify(item))}`)
//       }
//     >
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.location}>{item.primary_details?.Place || "N/A"}</Text>
//       <Text style={styles.salary}>{item.primary_details?.Salary || "N/A"}</Text>
//       <Text style={styles.phone}>{item.custom_link || "No phone"}</Text>
//     </TouchableOpacity>
//   );

//   if (loading && jobs.length === 0) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#e91e63" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   if (jobs.length === 0) {
//     console.log("No jobs found. Jobs array:", jobs);
//     return (
//       <View style={styles.centered}>
//         <Text>No jobs found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={jobs}
//         renderItem={renderJobCard}
//         keyExtractor={(item) => item.id.toString()}
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.5}
//         ListFooterComponent={loading ? <ActivityIndicator size="small" color="#e91e63" /> : null}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#fff" },
//   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
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
//   title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
//   location: { fontSize: 14, color: "#555", marginBottom: 2 },
//   salary: { fontSize: 14, color: "#e91e63", marginBottom: 2 },
//   phone: { fontSize: 14, color: "#333" },
// });


// app/(tabs)/jobs/index.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

const API_URL = "https://testapi.getlokalapp.com/common/jobs?page=";

export default function JobsScreen() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fetch jobs from API
  const fetchJobs = async (pageToFetch: number) => {
    try {
      if (pageToFetch === 1) setLoading(true);
      const response = await fetch(`${API_URL}${pageToFetch}`);
      const json = await response.json();
      console.log("API Response:", json);
      // Now use "results" instead of "data"
      const newJobs = json.results && Array.isArray(json.results) ? json.results : [];
      if (pageToFetch === 1) {
        setJobs(newJobs);
      } else {
        setJobs((prev) => [...prev, ...newJobs]);
      }
      if (newJobs.length === 0) {
        setHasMore(false);
      }
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const renderJobCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        // Using router.push with a URL path. The details screen file is at: app/(tabs)/jobs/[jobId].tsx.
        router.push(`/jobs/${item.id}?job=${encodeURIComponent(JSON.stringify(item))}`)
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.primary_details?.Place || "N/A"}</Text>
      <Text style={styles.salary}>{item.primary_details?.Salary || "N/A"}</Text>
      <Text style={styles.phone}>{item.custom_link || "No phone"}</Text>
    </TouchableOpacity>
  );

  if (loading && jobs.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (jobs.length === 0) {
    console.log("No jobs found. Jobs array:", jobs);
    return (
      <View style={styles.centered}>
        <Text>No jobs found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJobCard}
        keyExtractor={(item,index) => item.id? item.id.toString() : index.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="#e91e63" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  location: { fontSize: 14, color: "#555", marginBottom: 2 },
  salary: { fontSize: 14, color: "#e91e63", marginBottom: 2 },
  phone: { fontSize: 14, color: "#333" },
});
