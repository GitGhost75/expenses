import { useState } from "react";
import { } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GroupDto } from "../types";
import { Users, Calendar, Trash2, ChevronRight, Check, Share2, Edit2, X, UserPlus, ArrowLeft, Plus } from 'lucide-react';
import { formatGroupCode } from "../utils/GroupCodeFormatter";

interface GroupManagerProps {
    groups: GroupDto[];
    onAddGroup: (name: string) => void;
    onLeaveGroup: (code: string) => void;
    onSelectGroup: (code: string) => void;
    onEnterGroup: (code: string) => void;
    onShareCode: (code: string) => void;
    onRenameGroup: (code: string, newName: string) => void;
}

function GroupManager({ groups, onAddGroup, onLeaveGroup, onSelectGroup, onEnterGroup, onShareCode, onRenameGroup }: GroupManagerProps) {

    const { t } = useTranslation();
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupCode, setNewGroupCode] = useState('');
    const [copiedGroupCode, setCopiedGroupCode] = useState<string | null>(null);
    const [editingCode, setEditingCode] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [createNewGroup, setCreateNewGroup] = useState(false);
    const [enterGroup, setEnterGroup] = useState(false);

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
            setCreateNewGroup(false);
            onAddGroup(newGroupName.trim());
            setNewGroupName('');
        }
    };

    const handleEnterGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (newGroupCode.trim()) {
            setEnterGroup(false);
            onEnterGroup(newGroupCode.trim());
            setNewGroupCode('');
        }
    }

    const startEditing = (group: GroupDto) => {
        setEditingCode(group.code);
        setEditingName(group.name);
    };

    const handleEditKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEditing();
        }
    };

    const cancelEditing = () => {
        setEditingCode(null);
        setEditingName('');
    };

    const saveEdit = () => {
        if (editingName.trim() && editingCode) {
            onRenameGroup(editingCode, editingName.trim());
            setEditingCode(null);
            setEditingName('');
        }
    };

    if (createNewGroup) {
        return (
            <div className="max-w-4xl mx-auto">

                <header className="">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                setCreateNewGroup(false);
                            }}
                            className="flex items-center gap-2 px-0 py-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200 mb-6"
                        >
                            <ArrowLeft size={20} />
                            Zurück zur Übersicht
                        </button>
                    </div>
                </header>

                <div className="bg-white rounded-lg shadow-md p-6 ">
                    <form onSubmit={handleCreateGroup} className="">

                        <div className="w-100  sm:flex-row gap-2 w-full max-w-full">
                            <h2 className="font-semibold text-gray-800 mb-6 text-sm lg:text-xl">Gruppe erstellen</h2>
                            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-full">
                                <input
                                    type="text"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    placeholder="Name eingeben (z.B. Urlaub 2024, WG Kosten, etc.)"
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
                        </div>
                    </form>
                </div >
            </div >
        );
    }

    if (enterGroup) {
        return (
            <div className="max-w-4xl mx-auto">

                <header className="">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                setEnterGroup(false);
                            }}
                            className="flex items-center gap-2 px-0 py-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200 mb-6"
                        >
                            <ArrowLeft size={20} />
                            Zurück zur Übersicht
                        </button>
                    </div>
                </header>

                <div className="bg-white rounded-lg shadow-md p-6 ">
                    <form onSubmit={handleEnterGroup} className="">

                        <div className="w-100  sm:flex-row gap-2 w-full max-w-full">
                            <h2 className="font-semibold text-gray-800 mb-6 text-sm lg:text-xl">Gruppe beitreten</h2>
                            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-full">
                                <input
                                    type="text"
                                    value={formatGroupCode(newGroupCode)}
                                    onChange={(e) => setNewGroupCode(e.target.value.trim)}
                                    placeholder="Code eingeben (z.B.ABC 123 DEF, etc.)"
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
                        </div>
                    </form>
                </div >
            </div >
        );
    }

    return (

        <div className="max-w-4xl mx-auto">

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="font-semibold text-gray-800 mb-6 text-sm lg:text-xl">Meine Gruppen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groups.sort((a, b) => a.name.localeCompare(b.name)).map((group) => (
                        <div
                            key={group.code}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group bg-gray-50 hover:bg-gray-75 rounded-lg"
                            onClick={() => {
                                if (editingCode === null) {
                                    onSelectGroup(group.code);
                                }
                            }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                {editingCode !== null && editingCode === group.code ? (
                                    <div className='flex flex-col gap-2'>
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            onKeyDown={handleEditKeyPress}
                                            className="flex-1 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            autoFocus
                                        />
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    saveEdit();
                                                }}
                                                disabled={!editingName.trim()}
                                                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
                                            >
                                                <Check size={16} />
                                                Speichern
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    cancelEditing();
                                                }}
                                                className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center gap-1"
                                            >
                                                <X size={16} />
                                                Abbrechen
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-200" >
                                            {group.name}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    startEditing(group);
                                                }}
                                                className="text-gray-400 hover:text-blue-600 transition-colors duration-200 ml-2 mr-1"
                                            >
                                                <Edit2 size={16} />
                                            </button>
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
                                    </>)
                                }


                            </div>

                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-2">
                                    <Users size={16} />
                                    <span>{group.memberCount} Personen</span>
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
                                        setCopiedGroupCode(group.code);
                                        onShareCode(group.code);
                                        setTimeout(() => setCopiedGroupCode(null), 2000);
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Share2 size={16} className="text-blue-600" />
                                            <span className="text-center text-sm font-medium text-blue-800">
                                                {formatGroupCode(group.code)}
                                            </span>
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
                    <div
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group bg-gray-50 hover:bg-gray-75 rounded-lg"
                        onClick={() => {
                            setCreateNewGroup(true);
                        }}
                    >
                        <div className="text-center py-12">
                            <Users size={48} className="mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500 text-lg mb-2">Gruppe erstellen</p>
                            <p className="text-gray-400">Erstellen Sie eine Gruppe, um mit der Ausgaben-Aufteilung zu beginnen</p>
                        </div>
                    </div>
                    <div
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group bg-gray-50 hover:bg-gray-75 rounded-lg"
                        onClick={() => {
                            setEnterGroup(true);
                        }}
                    >
                        <div className="text-center py-12">
                            <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500 text-lg mb-2">Gruppe beitreten</p>
                            <p className="text-gray-400">Treten Sie einer Gruppe bei, um mit der Ausgaben-Aufteilung zu beginnen</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default GroupManager;
