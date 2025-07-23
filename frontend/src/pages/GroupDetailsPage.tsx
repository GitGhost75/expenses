import "../App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useParams } from 'react-router-dom';
import { useRef, useEffect, useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { GroupDto } from '../types/GroupDto'
import { UserDto } from '../types/UserDto';
import { fetchGroupByCode } from '../service/GroupService';
import { RefreshContext } from '../RefreshContext';
import Placeholder from 'react-bootstrap/Placeholder';
import ButtonGroup from "../components/groups/ButtonGroup";
import { useGroup } from "../context/GroupContext";
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

export default function GroupDetailsPage() {

    const navigate = useNavigate();
    const [group, setGroup] = useState<GroupDto>();
    const [loading, setLoading] = useState<boolean>(true);
    const { groupCode } = useParams();
    const { t } = useTranslation();
    const context = useContext(RefreshContext);
    const refreshTrigger = context?.refreshTrigger;
    const blockRefresh = useRef(false);
    const { setGroupName } = useGroup();

    useEffect(() => {
        async function loadGroup() {
            if (blockRefresh.current) {
                blockRefresh.current = false;
                setLoading(false);
                return;
            }

            setLoading(true);

            if (groupCode) {
                console.log(`Load group: ${groupCode}`);
                const result = await fetchGroupByCode(groupCode);
                if ('error' in result) {
                    setLoading(false);
                    return;
                }
                setGroup(result);
                setGroupName(result.name);
            }
            setLoading(false);
        }
        loadGroup();
    }, [groupCode, refreshTrigger]);

    const editUser = (user: UserDto) => {
    }

    return (
        <div className="card p-4 shadow-sm max-w-2xl mx-auto">
            {loading ? (
                <>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <Placeholder as="div" animation="wave">
                                <Placeholder xs={3} style={{ height: 32, width: 32, borderRadius: "50%", marginRight: 12 }} />
                            </Placeholder>
                            <Placeholder as="div" animation="wave" style={{ flex: 1 }}>
                                <Placeholder xs={8} style={{ height: 24, borderRadius: 6 }} />
                            </Placeholder>
                            <Placeholder as="div" animation="wave">
                                <Placeholder xs={1} style={{ height: 24, width: 24, borderRadius: "50%" }} />
                            </Placeholder>
                        </div>
                    ))}
                </>
            ) : (
                group && group.members.length > 0 ? (
                    group.members
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((user: UserDto) => (
                            <div
                                key={user.id}
                                className="d-flex justify-content-between align-items-center w-100 p-2 border rounded mb-2"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate('/users/edit', { state: { user } })}
                            >
                                <div className="d-flex justify-content-between w-100">
                                    <span className="flex-grow-1 text-start">{user.name}</span>
                                    <span className="text-end">
                                        <strong>
                                            <NumericFormat
                                                value={user.balance}
                                                displayType={'text'}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                decimalScale={2}
                                                fixedDecimalScale
                                            /> €
                                        </strong>
                                    </span>
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="d-flex flex-column gap-2">{t('no_users_in_group')}</div>
                )
            )}

            <div className="button-container" style={{ marginTop: 24 }}>
                {group ? (
                    <>
                        <ButtonGroup group={group} />
                    </>
                ) : null}
            </div>
        </div>
    );
}