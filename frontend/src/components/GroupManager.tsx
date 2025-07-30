import { useState } from "react";
import { } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GroupDto } from "../types";
import { Users, Calendar, Trash2, ChevronRight, Plus, Calculator, Check, Copy, Share2 } from 'lucide-react';

interface GroupManagerProps {
    groups: GroupDto[];
    onAddGroup: (name: string) => void;
    onLeaveGroup: (code: string) => void;
    onSelectGroup: (code: string) => void;
    onEnterGroup: (code: string) => void;
    onShareCode: (code: string) => void;
}

function GroupManager({ groups, onAddGroup, onLeaveGroup, onSelectGroup, onEnterGroup, onShareCode }: GroupManagerProps) {

    const { t } = useTranslation();
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupCode, setNewGroupCode] = useState('');
    const [copiedGroupCode, setCopiedGroupCode] = useState<string | null>(null);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(date));
    };

    const handleCreateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (newGroupName.trim()) {
            onAddGroup(newGroupName.trim());
            setNewGroupName('');
        }
    };

    const handleEnterGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (newGroupCode.trim()) {
            onEnterGroup(newGroupCode.trim());
            setNewGroupCode('');
        }
    }

    // const shareCode = async (groupCode: string) => {
    //     try {
    //         await navigator.clipboard.writeText(groupCode);
    //         setCopiedGroupCode(groupCode);
    //         setTimeout(() => setCopiedGroupCode(null), 2000);

    //         const url = 'https://expenses.alexander-kiemle.de?code='
    //         const whatsappUrl = `https://wa.me/?text=${url}${encodeURIComponent(groupCode)}`;
    //         window.open(whatsappUrl, "_blank");

    //     } catch (err) {
    //         console.error('Failed to copy share ID:', err);
    //     }
    // };

    return (

        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Aufgaben</h2>
                <form onSubmit={handleCreateGroup} className="mb-4">
                    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-full">
                        <input
                            type="text"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            placeholder="Gruppenname eingeben (z.B. Urlaub 2024, WG Kosten, etc.)"
                            className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <Plus size={18} />
                            <span className="">Erstellen</span>
                        </button>
                    </div>
                </form>
                <form onSubmit={handleEnterGroup} className="mb-4">
                    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-full">
                        <input
                            type="text"
                            value={newGroupCode}
                            onChange={(e) => setNewGroupCode(e.target.value)}
                            placeholder="Gruppencode eingeben (z.B.ABC 123 DEF, etc.)"
                            className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <Plus size={18} />
                            <span className="">Beitreten</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Meine Gruppen</h2>

                {groups.length === 0 ? (
                    <div className="text-center py-12">
                        <Users size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg mb-2">Noch keine Gruppen erstellt</p>
                        <p className="text-gray-400">Erstellen Sie Ihre erste Gruppe, um mit der Ausgaben-Aufteilung zu beginnen</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groups.sort((a,b) => a.name.localeCompare(b.name)).map((group) => (
                            <div
                                key={group.code}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                                onClick={() => onSelectGroup(group.code)}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-200">
                                        {group.name}
                                    </h3>
                                    <div className="flex items-center gap-1 mt-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onLeaveGroup(group.code);
                                            }}
                                            className="text-red-400 hover:text-red-600 transition-colors duration-200"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Users size={16} />
                                        <span>{group.members.length} Personen</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>Erstellt am {formatDate(group.createdAt)}</span>
                                    </div>
                                </div>

                                <div className="border-t pt-3 pb-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Gesamtausgaben:</span>
                                        <span className="font-semibold text-green-600">
                                            {group.totalExpenses.toFixed(2)}€
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-sm text-gray-600">Ausgaben:</span>
                                        <span className="text-sm text-gray-500">
                                            {group.countExpenses} Einträge
                                        </span>
                                    </div>
                                </div>
                                <div className="border-t pt-3">
                                    <div
                                        className="-mb-2 p-2 bg-blue-50 rounded-md border border-blue-200"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // console.log("copy code", group.code);
                                            setCopiedGroupCode(group.code);
                                            onShareCode(group.code);
                                            setTimeout(() => setCopiedGroupCode(null), 2000);
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Share2 size={16} className="text-blue-600" />
                                                <span className="text-center text-sm font-medium text-blue-800">{group.code}</span>
                                            </div>
                                            {copiedGroupCode === group.code && (
                                                <>
                                                    <span className="text-green-600">Kopiert!</span>
                                                    <Check size={14} className="text-green-600 -ml-5" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
}

export default GroupManager;
