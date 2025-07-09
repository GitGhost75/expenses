import CreateGroupForm from "../components/groups/CreateGroupForm";
import AssignToGroupForm from "../components/groups/AssignToGroupForm";


export default function ManageGroupsPage() {

  return (
      <div>
        <div className="user-card">
            <CreateGroupForm  />
        </div>
        <div className="user-card">
            <AssignToGroupForm />
        </div>
      </div>
  );
}