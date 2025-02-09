// // app/(tabs)/jobs/[jobId].tsx
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { createBookmarksTable, addBookmark, removeBookmark, getBookmark } from "../../utils/db";

// export default function JobDetails() {
//   const params = useLocalSearchParams() as { job?: string };
//   const [job, setJob] = useState<any>(null);
//   const [bookmarked, setBookmarked] = useState<boolean>(false);

//   useEffect(() => {
//     (async () => {
//       await createBookmarksTable();
//       if (params.job) {
//         try {
//           const parsedJob = JSON.parse(decodeURIComponent(params.job));
//           setJob(parsedJob);
//           console.log("Job details loaded:", parsedJob);
//           // Check if this job is bookmarked
//           const result = await getBookmark(parsedJob.id);
//           if (result && result.length > 0) {
//             setBookmarked(true);
//           }
//         } catch (error) {
//           console.error("Error parsing job data:", error);
//         }
//       }
//     })();
//   }, [params.job]);

//   const toggleBookmark = async () => {
//     if (!job) return;
//     if (bookmarked) {
//       try {
//         await removeBookmark(job.id);
//         setBookmarked(false);
//         Alert.alert("Bookmark removed");
//       } catch (error) {
//         Alert.alert("Error removing bookmark");
//       }
//     } else {
//       try {
//         await addBookmark(job);
//         setBookmarked(true);
//         Alert.alert("Job bookmarked");
//       } catch (error) {
//         Alert.alert("Error bookmarking job");
//       }
//     }
//   };

//   if (!job) {
//     return (
//       <View style={styles.centered}>
//         <Text>Loading job details...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {job.creatives && job.creatives.length > 0 && (
//         <Image source={{ uri: job.creatives[0].file }} style={styles.image} />
//       )}
//       <TouchableOpacity style={styles.bookmarkIcon} onPress={toggleBookmark}>
//         <Ionicons
//           name={bookmarked ? "bookmark" : "bookmark-outline"}
//           size={28}
//           color="#e91e63"
//         />
//       </TouchableOpacity>
//       <View style={styles.content}>
//         <Text style={styles.title}>{job.title}</Text>
//         <Text style={styles.company}>{job.company_name}</Text>
//         <Text style={styles.location}>{job.primary_details?.Place || "N/A"}</Text>
//         <Text style={styles.phone}>{job.custom_link || "No contact"}</Text>
//         <Text style={styles.stipend}>{job.primary_details?.Salary || "N/A"}</Text>
//         <Text style={styles.sectionHeader}>Job Description</Text>
//         <Text style={styles.description}>{job.other_details || "No description provided."}</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   image: { width: "100%", height: 200 },
//   content: { padding: 16 },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
//   company: { fontSize: 18, marginBottom: 4 },
//   location: { fontSize: 16, color: "#555", marginBottom: 4 },
//   phone: { fontSize: 16, marginBottom: 4 },
//   stipend: { fontSize: 16, marginBottom: 4, color: "#e91e63", fontWeight: "bold" },
//   sectionHeader: { fontSize: 20, fontWeight: "bold", marginTop: 16, marginBottom: 8 },
//   description: { fontSize: 16, color: "#333", marginBottom: 12 },
//   centered: { flex: 1, justifyContent: "center", alignItems: "center" },
//   bookmarkIcon: {
//     position: "absolute",
//     top: 16,
//     right: 16,
//     zIndex: 10,
//   },
// });


// app/(tabs)/jobs/[jobId].tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createBookmarksTable, addBookmark, removeBookmark, getBookmark } from "../../utils/db";

export default function JobDetails() {
  const params = useLocalSearchParams() as { job?: string };
  const [job, setJob] = useState<any>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await createBookmarksTable();
      if (params.job) {
        try {
          const parsedJob = JSON.parse(decodeURIComponent(params.job));
          setJob(parsedJob);
          console.log("Job details loaded:", parsedJob);
          // Check if this job is bookmarked.
          const result = await getBookmark(parsedJob.id);
          if (result && result.length > 0) {
            setBookmarked(true);
          }
        } catch (error) {
          console.error("Error parsing job data:", error);
        }
      }
    })();
  }, [params.job]);

  const toggleBookmark = async () => {
    if (!job) return;
    if (bookmarked) {
      try {
        await removeBookmark(job.id);
        setBookmarked(false);
        Alert.alert("Bookmark removed");
      } catch (error) {
        Alert.alert("Error removing bookmark");
      }
    } else {
      try {
        await addBookmark(job);
        setBookmarked(true);
        Alert.alert("Job bookmarked");
      } catch (error) {
        Alert.alert("Error bookmarking job");
      }
    }
  };

  if (!job) {
    return (
      <View style={styles.centered}>
        <Text>Loading job details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {job.creatives && job.creatives.length > 0 && (
        <Image source={{ uri: job.creatives[0].file }} style={styles.image} />
      )}
      <TouchableOpacity style={styles.bookmarkIcon} onPress={toggleBookmark}>
        <Ionicons
          name={bookmarked ? "bookmark" : "bookmark-outline"}
          size={28}
          color="#e91e63"
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company_name}</Text>
        <Text style={styles.location}>{job.primary_details?.Place || "N/A"}</Text>
        <Text style={styles.phone}>{job.custom_link || "No contact"}</Text>
        <Text style={styles.stipend}>{job.primary_details?.Salary || "N/A"}</Text>
        <Text style={styles.sectionHeader}>Job Description</Text>
        <Text style={styles.description}>{job.other_details || "No description provided."}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 200 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  company: { fontSize: 18, marginBottom: 4 },
  location: { fontSize: 16, color: "#555", marginBottom: 4 },
  phone: { fontSize: 16, marginBottom: 4 },
  stipend: { fontSize: 16, marginBottom: 4, color: "#e91e63", fontWeight: "bold" },
  sectionHeader: { fontSize: 20, fontWeight: "bold", marginTop: 16, marginBottom: 8 },
  description: { fontSize: 16, color: "#333", marginBottom: 12 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  bookmarkIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
});
