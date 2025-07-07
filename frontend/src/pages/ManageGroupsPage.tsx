import CreateGroupForm from "../components/groups/CreateGroupForm";
import AssignToGroupForm from "../components/groups/AssignToGroupForm";


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
                <AssignToGroupForm />
            </div>
        </div>
      </div>
  );
}