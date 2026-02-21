import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ChevronLeft, AlertTriangle, Heart, Activity, Thermometer, Stethoscope, CheckCircle } from 'lucide-react-native';
import { SafeAreaView } from '../components/Shared';

export default function DoctorDetailScreen({ route, navigation }) {
    const { patient } = route.params;
    const [notes, setNotes] = useState('');
    const [isApproved, setIsApproved] = useState(patient.status === 'Approved');

    const handleApprove = () => {
        setIsApproved(true);
        // Normally this would update state in a parent context or backend
    };

    return (
        <SafeAreaView className="bg-white">
            <View className="px-4 py-3 border-b border-slate-100 flex-row items-center gap-3 z-20 mt-2">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2 rounded-full">
                    <ChevronLeft color="#475569" size={24} />
                </TouchableOpacity>
                <View className="flex-1 items-center pr-8">
                    <Text className="font-bold text-slate-900 text-base">{patient.name}</Text>
                    <Text className="text-[10px] text-slate-500">#{patient.id}</Text>
                </View>
            </View>

            <ScrollView className="flex-1 bg-slate-50/50 p-5 space-y-6">
                <View className="flex-row justify-between items-center mb-6">
                    <View className={`px-2 py-1 rounded-full border ${patient.urgency === 'High' ? "bg-red-50 border-red-100" :
                            patient.urgency === 'Moderate' ? "bg-amber-50 border-amber-100" :
                                "bg-green-50 border-green-100"
                        }`}>
                        <Text className={`text-[10px] font-bold uppercase ${patient.urgency === 'High' ? "text-red-700" :
                                patient.urgency === 'Moderate' ? "text-amber-700" :
                                    "text-green-700"
                            }`}>{patient.urgency} Priority</Text>
                    </View>
                    <Text className="text-xs text-slate-400 font-mono">{patient.time}</Text>
                </View>

                {patient.alert && (
                    <View className="bg-red-50 border border-red-100 rounded-2xl p-4 flex-row gap-3 mb-6">
                        <View className="bg-white p-2 rounded-full h-10 w-10 justify-center items-center shadow-sm border border-red-100">
                            <AlertTriangle color="#ef4444" size={20} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-red-800">AI Triage Alert</Text>
                            <Text className="text-xs text-red-700 mt-1 leading-relaxed">{patient.alert}</Text>
                        </View>
                    </View>
                )}

                <View className="mb-6">
                    <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1">Vitals</Text>
                    <View className="flex-row flex-wrap justify-between">
                        <View className="w-[48%] bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex-row items-center gap-3 mb-3">
                            <View className="p-2 bg-pink-50 rounded-lg"><Heart color="#ec4899" size={16} /></View>
                            <View>
                                <Text className="text-[10px] text-slate-400 uppercase font-bold">HR</Text>
                                <Text className="text-base font-bold text-slate-900">{patient.vitals.hr}</Text>
                            </View>
                        </View>
                        <View className="w-[48%] bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex-row items-center gap-3 mb-3">
                            <View className="p-2 bg-blue-50 rounded-lg"><Activity color="#3b82f6" size={16} /></View>
                            <View>
                                <Text className="text-[10px] text-slate-400 uppercase font-bold">BP</Text>
                                <Text className="text-base font-bold text-slate-900">{patient.vitals.bp}</Text>
                            </View>
                        </View>
                        <View className="w-[48%] bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex-row items-center gap-3 mb-3">
                            <View className="p-2 bg-orange-50 rounded-lg"><Thermometer color="#f97316" size={16} /></View>
                            <View>
                                <Text className="text-[10px] text-slate-400 uppercase font-bold">Temp</Text>
                                <Text className="text-base font-bold text-slate-900">{patient.vitals.temp}</Text>
                            </View>
                        </View>
                        <View className="w-[48%] bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex-row items-center gap-3 mb-3">
                            <View className="p-2 bg-purple-50 rounded-lg"><Stethoscope color="#a855f7" size={16} /></View>
                            <View>
                                <Text className="text-[10px] text-slate-400 uppercase font-bold">SpO2</Text>
                                <Text className="text-base font-bold text-slate-900">{patient.vitals.spo2}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1">Clinical History</Text>
                    <View className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-4">
                        <View className="mb-3">
                            <Text className="text-[10px] font-bold text-slate-500 uppercase mb-1">Chief Complaint</Text>
                            <Text className="text-sm font-semibold text-slate-900">{patient.complaint}</Text>
                        </View>
                        <View>
                            <Text className="text-[10px] font-bold text-slate-500 uppercase mb-1">History of Present Illness</Text>
                            <Text className="text-sm text-slate-600 leading-relaxed">{patient.hpi}</Text>
                        </View>
                    </View>
                </View>

                <View className="mb-24">
                    <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1">Assessment</Text>
                    <TextInput
                        className={`w-full h-32 p-4 rounded-xl text-sm ${isApproved ? "bg-slate-50 border border-slate-200 text-slate-500" : "bg-yellow-50 border border-yellow-100 text-slate-800"
                            }`}
                        placeholder="Add diagnosis and prescription..."
                        placeholderTextColor="#9ca3af"
                        multiline
                        textAlignVertical="top"
                        value={isApproved ? "Prescription: Paracetamol 500mg SOS. Rest advised. (Signed)" : notes}
                        onChangeText={setNotes}
                        editable={!isApproved}
                    />
                </View>
            </ScrollView>

            <View className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4 pb-8 z-30 shadow-2xl">
                {isApproved ? (
                    <View className="w-full py-4 rounded-xl bg-green-50 border border-green-200 flex-row justify-center items-center gap-2">
                        <CheckCircle color="#15803d" size={18} />
                        <Text className="text-green-700 font-bold text-sm">Signed & Approved</Text>
                    </View>
                ) : (
                    <View className="flex-row gap-3">
                        <TouchableOpacity className="flex-1 py-4 rounded-xl border border-slate-200 justify-center items-center">
                            <Text className="text-slate-600 font-semibold text-sm">Flag</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleApprove}
                            className="flex-[2] py-4 rounded-xl bg-slate-900 flex-row justify-center items-center gap-2 shadow-lg"
                        >
                            <Text className="text-white font-semibold text-sm">Approve & Sign</Text>
                            <CheckCircle color="white" size={18} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}
