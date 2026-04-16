import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile, saveUserProfile } from "@/services/userService";
import type { UserProfile } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setName(profile.name);
          setAge(profile.age ? String(profile.age) : "");
          setCity(profile.city);
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load profile.";
        Alert.alert("Error", message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  async function handleSave() {
    if (!user) return;

    const ageNum = parseInt(age, 10);
    if (age.trim() && isNaN(ageNum)) {
      Alert.alert("Validation Error", "Age must be a valid number.");
      return;
    }

    setSaving(true);

    try {
      const profile: UserProfile = {
        name: name.trim(),
        age: ageNum || 0,
        city: city.trim(),
      };

      await saveUserProfile(user.uid, profile);
      Alert.alert("Success", "Profile saved successfully!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save profile.";
      Alert.alert("Error", message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {name ? name.charAt(0).toUpperCase() : "?"}
              </Text>
            </View>
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Personal Information</Text>

          <CustomInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            autoCapitalize="words"
          />
          <CustomInput
            label="Age"
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
          <CustomInput
            label="City"
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city"
            autoCapitalize="words"
          />

          <CustomButton
            title="Save Changes"
            onPress={handleSave}
            loading={saving}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#111827",
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#1A2332",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  emailText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  divider: {
    height: 1,
    backgroundColor: "#374151",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 16,
    letterSpacing: 0.3,
  },
});
