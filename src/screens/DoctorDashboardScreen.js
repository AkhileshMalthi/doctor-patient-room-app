import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../constants/colors';

const MOCK_REPORTS = [
  {
    id: '1',
    patientName: 'John Smith',
    age: 34,
    gender: 'Male',
    chiefComplaint: 'Chest pain and shortness of breath',
    urgency: 'high',
    status: 'pending',
    timestamp: '2026-01-28 09:30 AM',
    symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
  },
  {
    id: '2',
    patientName: 'Sarah Johnson',
    age: 28,
    gender: 'Female',
    chiefComplaint: 'Headache and fever',
    urgency: 'medium',
    status: 'pending',
    timestamp: '2026-01-28 10:15 AM',
    symptoms: ['Headache', 'Fever', 'Body ache'],
  },
  {
    id: '3',
    patientName: 'Michael Brown',
    age: 45,
    gender: 'Male',
    chiefComplaint: 'Back pain for 3 days',
    urgency: 'low',
    status: 'approved',
    timestamp: '2026-01-28 08:00 AM',
    symptoms: ['Lower back pain', 'Stiffness'],
  },
  {
    id: '4',
    patientName: 'Emily Davis',
    age: 52,
    gender: 'Female',
    chiefComplaint: 'Dizziness and nausea',
    urgency: 'medium',
    status: 'pending',
    timestamp: '2026-01-28 11:00 AM',
    symptoms: ['Dizziness', 'Nausea', 'Lightheadedness'],
  },
];

const DoctorDashboardScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('all');
  const [reports, setReports] = useState(MOCK_REPORTS);

  const filteredReports = reports.filter((report) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return report.status === 'pending';
    if (filter === 'approved') return report.status === 'approved';
    if (filter === 'high') return report.urgency === 'high';
    return true;
  });

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

  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'Unknown';
    }
  };

  const renderReportCard = ({ item }) => (
    <TouchableOpacity
      style={styles.reportCard}
      onPress={() => navigation.navigate('ReportReview', { report: item })}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.patientDetails}>
            {item.age} yrs • {item.gender}
          </Text>
        </View>
        <View
          style={[
            styles.urgencyBadge,
            { backgroundColor: getUrgencyColor(item.urgency) + '20' },
          ]}
        >
          <Text
            style={[
              styles.urgencyText,
              { color: getUrgencyColor(item.urgency) },
            ]}
          >
            {getUrgencyLabel(item.urgency)}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.complaintSection}>
        <Text style={styles.sectionLabel}>Chief Complaint</Text>
        <Text style={styles.complaintText}>{item.chiefComplaint}</Text>
      </View>

      <View style={styles.symptomsContainer}>
        {item.symptoms.map((symptom, index) => (
          <View key={index} style={styles.symptomTag}>
            <Text style={styles.symptomText}>{symptom}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === 'approved'
                  ? COLORS.secondary + '20'
                  : COLORS.warning + '20',
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color:
                  item.status === 'approved'
                    ? COLORS.secondary
                    : COLORS.warning,
              },
            ]}
          >
            {item.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const FilterButton = ({ label, value, count }) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === value && styles.filterButtonActive]}
      onPress={() => setFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === value && styles.filterButtonTextActive,
        ]}
      >
        {label}
      </Text>
      {count > 0 && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const pendingCount = reports.filter((r) => r.status === 'pending').length;
  const highPriorityCount = reports.filter((r) => r.urgency === 'high').length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{reports.length}</Text>
          <Text style={styles.statLabel}>Total Reports</Text>
        </View>
        <View style={[styles.statCard, styles.statCardHighlight]}>
          <Text style={[styles.statNumber, styles.statNumberHighlight]}>
            {pendingCount}
          </Text>
          <Text style={[styles.statLabel, styles.statLabelHighlight]}>
            Pending Review
          </Text>
        </View>
        <View style={[styles.statCard, styles.statCardDanger]}>
          <Text style={[styles.statNumber, styles.statNumberDanger]}>
            {highPriorityCount}
          </Text>
          <Text style={[styles.statLabel, styles.statLabelDanger]}>
            High Priority
          </Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <FilterButton label="All" value="all" count={reports.length} />
        <FilterButton label="Pending" value="pending" count={pendingCount} />
        <FilterButton label="Approved" value="approved" count={0} />
        <FilterButton label="High Priority" value="high" count={highPriorityCount} />
      </View>

      <FlatList
        data={filteredReports}
        renderItem={renderReportCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No reports found</Text>
            <Text style={styles.emptySubtext}>
              Reports will appear here when patients submit them
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardHighlight: {
    backgroundColor: COLORS.primary,
  },
  statCardDanger: {
    backgroundColor: COLORS.danger,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  statNumberHighlight: {
    color: COLORS.white,
  },
  statNumberDanger: {
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 4,
    textAlign: 'center',
  },
  statLabelHighlight: {
    color: 'rgba(255,255,255,0.8)',
  },
  statLabelDanger: {
    color: 'rgba(255,255,255,0.8)',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  countBadge: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  countText: {
    fontSize: 11,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
    paddingTop: 4,
  },
  reportCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  patientDetails: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 2,
  },
  urgencyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 12,
  },
  complaintSection: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 11,
    color: COLORS.gray,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  complaintText: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 20,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  symptomTag: {
    backgroundColor: COLORS.patientBubble,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  symptomText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 11,
    color: COLORS.gray,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default DoctorDashboardScreen;
