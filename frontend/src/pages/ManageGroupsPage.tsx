import CreateGroupForm from "../components/groups/CreateGroupForm";
import EnterGroupForm from "../components/groups/EnterGroupForm";


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
      </div>
  );
}