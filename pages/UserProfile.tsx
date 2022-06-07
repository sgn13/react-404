import { useNavigate, useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div>User is {id}</div>
      <button
        type="button"
        onClick={() =>
          navigate("/support/chat", {
            replace: false,
            state: {
              name: "firoj",
              userId: id,
            },
          })
        }
      >
        Go to Chat
      </button>
    </>
  );
}

export default UserProfile;
