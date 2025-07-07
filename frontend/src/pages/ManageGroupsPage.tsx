import CreateGroupForm from "../components/groups/CreateGroupForm";
import EnterGroupForm from "../components/groups/EnterGroupForm";
import GroupsOverviewForm from "../components/groups/GroupsOverviewForm";


export default function ManageGroupsPage() {

  return (
      <div>
        <div className="add-border ">
            <div className="user-card">
                <CreateGroupForm  />
            </div>
        </div>
        <div className="add-border ">
            <div className="user-card">
                <EnterGroupForm />
            </div>
        </div>
        <div className="add-border ">
            <div className="user-card">
                <GroupsOverviewForm />
            </div>
        </div>
      </div>
  );
}