import React, { useEffect, useState } from "react";
import { } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { fetchGroups } from '../service/GroupService';
import Button from 'react-bootstrap/Button';
import CreateGroup from "../components/groups/CreateGroup";
import AssignToGroup from "../components/groups/AssignToGroup";
import { Modal, Nav } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import { useGroup } from "../context/GroupContext";
import { GroupDto, ExpenseDto, UserDto } from "../types";
import { InputGroup } from "react-bootstrap";
import { leaveGroup } from "../service/GroupService";
import { Plus, Users, Calendar, Trash2, ChevronRight } from 'lucide-react';
import { getExpensesForGroup } from "../service/ExpensesService";

function HomePage() {

    const { t } = useTranslation();
    const [groups, setGroups] = useState<any[]>([]);
    const navigate = useNavigate();
    const { setGroup } = useGroup();
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function loadGroups() {
            const groups = await fetchGroups();
            setGroups(groups);
        }
        loadGroups();
        setGroup(null);
    }, [refresh]);

    async function onLeaveGroup(group: GroupDto) {
        leaveGroup(group.code);
        setRefresh(prev => prev + 1);
    }

    const onSelectGroup = (group: GroupDto) => {
        setGroup(group);
        navigate('/groups/' + group.code, { state: { group } });
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(date));
    };

    return (

        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Meine Gruppen</h2>

                {groups.length === 0 ? (
                    <div className="text-center py-12">
                        <Users size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg mb-2">Noch keine Gruppen erstellt</p>
                        <p className="text-gray-400">Erstellen Sie Ihre erste Gruppe, um mit der Ausgaben-Aufteilung zu beginnen</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groups.map((group) => (
                            <div
                                key={group.id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                                onClick={() => onSelectGroup(group)}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-200">
                                        {group.name}
                                    </h3>
                                    <div className="flex items-center gap-1 mt-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onLeaveGroup(group);
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

                                <div className="border-t pt-3">
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
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Aufgaben</h2>
                <div>{t('start_info')}</div>
                <div className="d-flex flex-column gap-2 mt-3">
                    <CreateGroup />
                    <AssignToGroup />
                </div>
            </div>
        </div>

    );
}

export default HomePage;
