import { useLocation } from "react-router-dom";

function Chat() {
  const { pathname, state } = useLocation();

  return (
    <div>
      <h6>Chat Page</h6>
      <div>
        Name is {state?.name} userId is {state?.userId}
      </div>
    </div>
  );
}

export default Chat;
