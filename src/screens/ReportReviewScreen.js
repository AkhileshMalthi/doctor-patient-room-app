import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../constants/colors';

const ReportReviewScreen = ({ route, navigation }) => {
  const { report } = route.params || {
    report: {
      patientName: 'Unknown Patient',
      age: 0,
      gender: 'Unknown',
      chiefComplaint: 'No complaint recorded',
      urgency: 'low',
      status: 'pending',
      timestamp: '',
      symptoms: [],
    },
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedComplaint, setEditedComplaint] = useState(report.chiefComplaint);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = () => {
    Alert.alert(
      'Approve Report',
      'Are you sure you want to approve this preliminary report? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            setIsApproved(true);
            Alert.alert(
              '✅ Report Approved',
              'The report has been approved and finalized.',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          },
        },
      ]
    );
  };

  const handleSaveEdits = () => {
    setIsEditing(false);
    Alert.alert('✅ Changes Saved', 'Your edits have been saved to the report.');
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return COLORS.danger;
      case 'medium':
        return COLORS.warning;
      case 'low':
        return COLORS.secondary;
      default:
        return COLORS.gray;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Patient Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.patientHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {report.gender === 'Male' ? '👨' : '👩'}
              </Text>
            </View>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{report.patientName}</Text>
              <Text style={styles.patientDetails}>
                {report.age} years • {report.gender}
              </Text>
              <Text style={styles.timestamp}>Submitted: {report.timestamp}</Text>
            </View>
          </View>
          <View
            style={[
              styles.urgencyBadge,
              { backgroundColor: getUrgencyColor(report.urgency) },
            ]}
          >
            <Text style={styles.urgencyText}>
              {report.urgency.toUpperCase()} PRIORITY
            </Text>
          </View>
        </View>

        {/* AI Generated Report Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🤖</Text>
            <Text style={styles.sectionTitle}>AI-Generated Preliminary Report</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Chief Complaint</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedComplaint}
                onChangeText={setEditedComplaint}
                multiline
                numberOfLines={3}
              />
            ) : (
              <Text style={styles.fieldValue}>{editedComplaint}</Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Reported Symptoms</Text>
            <View style={styles.symptomsList}>
              {report.symptoms.map((symptom, index) => (
                <View key={index} style={styles.symptomItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.symptomText}>{symptom}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>AI Confidence Level</Text>
            <View style={styles.confidenceBar}>
              <View style={[styles.confidenceFill, { width: '75%' }]} />
            </View>
            <Text style={styles.confidenceText}>75% - Moderate Confidence</Text>
          </View>

          <View style={styles.warningBox}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningText}>
              This is an AI-generated draft report. Please review carefully and
              make necessary corrections before approval.
            </Text>
          </View>
        </View>

        {/* Doctor Notes Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📝</Text>
            <Text style={styles.sectionTitle}>Doctor Notes & Corrections</Text>
          </View>

          <TextInput
            style={styles.notesInput}
            value={doctorNotes}
            onChangeText={setDoctorNotes}
            placeholder="Add your observations, corrections, or additional notes here..."
            placeholderTextColor={COLORS.gray}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* Audit Trail Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📋</Text>
            <Text style={styles.sectionTitle}>Audit Trail</Text>
          </View>

          <View style={styles.auditItem}>
            <Text style={styles.auditTime}>{report.timestamp}</Text>
            <Text style={styles.auditAction}>
              Patient submitted preliminary report via AI Triage Assistant
            </Text>
          </View>

          {isApproved && (
            <View style={styles.auditItem}>
              <Text style={styles.auditTime}>Just now</Text>
              <Text style={styles.auditAction}>
                Report approved and finalized by doctor
              </Text>
            </View>
          )}
        </View>

        {/* Spacer for bottom buttons */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        {isEditing ? (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSaveEdits}
            >
              <Text style={styles.saveButtonText}>💾 Save Changes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => setIsEditing(true)}
              disabled={isApproved}
            >
              <Text style={styles.editButtonText}>
                {isApproved ? '🔒 Locked' : '✏️ Edit'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.approveButton,
                isApproved && styles.approvedButton,
              ]}
              onPress={handleApprove}
              disabled={isApproved}
            >
              <Text style={styles.approveButtonText}>
                {isApproved ? '✅ Approved' : '✓ Approve Report'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.patientBubble,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  patientDetails: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  urgencyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  urgencyText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: 15,
    color: COLORS.black,
    lineHeight: 22,
  },
  textInput: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.primary,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  symptomsList: {
    marginTop: 4,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 16,
    color: COLORS.primary,
    marginRight: 8,
  },
  symptomText: {
    fontSize: 15,
    color: COLORS.black,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 6,
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  warningIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },
  notesInput: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: COLORS.black,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  auditItem: {
    marginBottom: 12,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.primary,
  },
  auditTime: {
    fontSize: 11,
    color: COLORS.gray,
    marginBottom: 2,
  },
  auditAction: {
    fontSize: 13,
    color: COLORS.black,
  },
  bottomSpacer: {
    height: 100,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.black,
  },
  approveButton: {
    backgroundColor: COLORS.secondary,
  },
  approvedButton: {
    backgroundColor: COLORS.secondary + '80',
  },
  approveButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  cancelButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default ReportReviewScreen;
