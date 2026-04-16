import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/config";
import { deleteUserProfile } from "@/services/userService";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const { user } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to log out.";
      Alert.alert("Error", message);
    }
  }

  function confirmLogout() {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: handleLogout },
    ]);
  }

  async function handleDeleteAccount() {
    if (!user || !user.email) return;

    if (!deletePassword.trim()) {
      setDeleteError("Please enter your current password.");
      return;
    }

    setDeleteError("");
    setDeleting(true);

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        deletePassword,
      );
      await reauthenticateWithCredential(user, credential);

      await deleteUserProfile(user.uid);

      await deleteUser(user);

      setShowDeleteModal(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete account.";
      setDeleteError(message);
    } finally {
      setDeleting(false);
    }
  }

  function openDeleteModal() {
    setDeletePassword("");
    setDeleteError("");
    setShowDeleteModal(true);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      {/* User Info Card */}
      <View style={styles.card}>
        <View style={styles.userRow}>
          <View style={styles.avatarSmall}>
            <Text style={styles.avatarText}>
              {user?.email ? user.email.charAt(0).toUpperCase() : "?"}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Signed in as</Text>
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Actions</Text>

        <CustomButton
          title="Log Out"
          onPress={confirmLogout}
          variant="outline"
        />

        <View style={styles.dangerZone}>
          <View style={styles.divider} />
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          <Text style={styles.dangerDescription}>
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </Text>
          <CustomButton
            title="Delete Account"
            onPress={openDeleteModal}
            variant="danger"
          />
        </View>
      </View>

      {/* Delete Account Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalDescription}>
              This will permanently delete your account. Enter your password to
              confirm.
            </Text>

            <CustomInput
              label="Current Password"
              value={deletePassword}
              onChangeText={setDeletePassword}
              placeholder="Enter your password"
              secureTextEntry
            />

            {deleteError ? (
              <Text style={styles.modalError}>{deleteError}</Text>
            ) : null}

            <CustomButton
              title="Permanently Delete"
              onPress={handleDeleteAccount}
              variant="danger"
              loading={deleting}
            />

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowDeleteModal(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#111827",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#1A2332",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarSmall: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  userInfo: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  emailText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  dangerZone: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#374151",
    marginVertical: 16,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EF4444",
    marginBottom: 8,
  },
  dangerDescription: {
    fontSize: 13,
    color: "#9CA3AF",
    lineHeight: 19,
    marginBottom: 16,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#1F2937",
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#EF4444",
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: "#D1D5DB",
    marginBottom: 20,
    lineHeight: 20,
  },
  modalError: {
    color: "#EF4444",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  cancelButton: {
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 10,
  },
  cancelText: {
    color: "#9CA3AF",
    fontSize: 15,
    fontWeight: "600",
  },
});
