import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Activity, LogOut, CheckCircle, FileText, Users, Clock, User } from 'lucide-react-native';
import { SafeAreaView } from '../components/Shared';

const INITIAL_PATIENTS = [
  {
    id: '101', name: 'Rajesh Kumar', age: 45, gender: 'M', time: '10:42 AM', avatar: 'RK',
    complaint: 'Chest Pain & Sweating', hpi: 'Sudden onset central chest pressure ("heavy elephant"). Radiates to left jaw. Nausea present.',
    vitals: { hr: '110', bp: '150/95', temp: '98.6°F', spo2: '97%' },
    urgency: 'High', alert: 'Potential Acute Coronary Syndrome (ACS).', status: 'Draft'
  },
  {
    id: '102', name: 'Priya Sharma', age: 29, gender: 'F', time: '10:30 AM', avatar: 'PS',
    complaint: 'Severe Migraine', hpi: 'Unilateral pulsating headache (Right). Photophobia. No vomiting. Duration 2 days.',
    vitals: { hr: '82', bp: '110/70', temp: '98.4°F', spo2: '99%' },
    urgency: 'Moderate', alert: null, status: 'Draft'
  },
  {
    id: '103', name: 'Arjun Singh', age: 8, gender: 'M', time: '09:15 AM', avatar: 'AS',
    complaint: 'Viral Fever Followup', hpi: 'Fever subsiding. Temp normal for 24h. Appetite improving.',
    vitals: { hr: '98', bp: '--', temp: '98.1°F', spo2: '99%' },
    urgency: 'Low', alert: null, status: 'Approved'
  }
];

export default function DoctorDashboardScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Queue');
  const patients = INITIAL_PATIENTS;
  const pendingCount = patients.filter(p => p.status === 'Draft').length;

  return (
    <SafeAreaView className="bg-white">
      <View className="flex-1">
        {activeTab === 'Queue' ? (
          <>
            <View className="bg-white px-5 py-4 border-b border-slate-100 z-10">
              <View className="flex-row justify-between items-center mb-4 mt-2">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-indigo-600 rounded-xl items-center justify-center shadow-md">
                    <Activity color="white" size={20} />
                  </View>
                  <View>
                    <Text className="font-bold text-slate-900 text-lg leading-tight">Doctor Patient Room</Text>
                    <Text className="text-xs text-slate-500 font-medium tracking-wide">Surampalem</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Landing')} className="p-2 bg-slate-50 rounded-full">
                  <LogOut color="#475569" size={20} />
                </TouchableOpacity>
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity className="bg-slate-900 px-4 py-1.5 rounded-full shadow-md">
                  <Text className="text-white text-xs font-semibold">Queue ({pendingCount})</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white border border-slate-200 px-4 py-1.5 rounded-full">
                  <Text className="text-slate-600 text-xs font-semibold">Urgent</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="px-4 py-4" showsVerticalScrollIndicator={false}>
              {patients.map((patient) => (
                <TouchableOpacity
                  key={patient.id}
                  onPress={() => navigation.navigate('DoctorDetail', { patient })}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-3"
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-row items-center gap-3">
                      <View className="relative">
                        <View className={`w-10 h-10 rounded-full items-center justify-center ${patient.urgency === 'High' ? 'bg-red-100' : 'bg-slate-100'
                          }`}>
                          <Text className={`text-xs font-bold ${patient.urgency === 'High' ? 'text-red-700' : 'text-slate-600'
                            }`}>{patient.avatar}</Text>
                        </View>
                        {patient.urgency === 'High' && (
                          <View className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
                        )}
                      </View>
                      <View>
                        <Text className="font-bold text-slate-900">{patient.name}</Text>
                        <Text className="text-[10px] text-slate-400">{patient.id} • {patient.gender}, {patient.age}y</Text>
                      </View>
                    </View>
                    <Text className="text-xs text-slate-400">{patient.time}</Text>
                  </View>

                  <View className="pl-[52px]">
                    <Text className="text-sm text-slate-600 mb-3 font-medium" numberOfLines={1}>{patient.complaint}</Text>
                    <View className="flex-row items-center justify-between">
                      <View className={`px-2 py-1 rounded-full border ${patient.urgency === 'High' ? "bg-red-50 border-red-100" :
                          patient.urgency === 'Moderate' ? "bg-amber-50 border-amber-100" :
                            "bg-green-50 border-green-100"
                        }`}>
                        <Text className={`text-[10px] font-bold uppercase ${patient.urgency === 'High' ? "text-red-700" :
                            patient.urgency === 'Moderate' ? "text-amber-700" :
                              "text-green-700"
                          }`}>{patient.urgency}</Text>
                      </View>

                      {patient.status === 'Approved' ? (
                        <View className="flex-row items-center gap-1">
                          <CheckCircle color="#16a34a" size={12} />
                          <Text className="text-[10px] text-green-600 font-bold">Approved</Text>
                        </View>
                      ) : (
                        <View className="flex-row items-center gap-1">
                          <FileText color="#94a3b8" size={12} />
                          <Text className="text-[10px] text-slate-400 font-medium">Draft</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              <View className="h-20" />
            </ScrollView>
          </>
        ) : (
          <View className="flex-1 items-center justify-center p-8">
            <User color="#cbd5e1" size={48} className="mb-4" />
            <Text className="text-slate-400 text-center">Module Locked (Phase 2)</Text>
          </View>
        )}
      </View>

      {/* Bottom Tabs */}
      <View className="flex-row h-[70px] border-t border-slate-100 bg-white items-center justify-around pb-2">
        <TouchableOpacity onPress={() => setActiveTab('Queue')} className="items-center gap-1 p-2">
          <Users color={activeTab === 'Queue' ? "#4f46e5" : "#94a3b8"} size={20} />
          <Text className={`text-[10px] ${activeTab === 'Queue' ? 'text-indigo-600 font-bold' : 'text-slate-400 font-medium'}`}>Queue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('History')} className="items-center gap-1 p-2">
          <Clock color={activeTab === 'History' ? "#4f46e5" : "#94a3b8"} size={20} />
          <Text className={`text-[10px] ${activeTab === 'History' ? 'text-indigo-600 font-bold' : 'text-slate-400 font-medium'}`}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Profile')} className="items-center gap-1 p-2">
          <User color={activeTab === 'Profile' ? "#4f46e5" : "#94a3b8"} size={20} />
          <Text className={`text-[10px] ${activeTab === 'Profile' ? 'text-indigo-600 font-bold' : 'text-slate-400 font-medium'}`}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
