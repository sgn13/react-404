import React, { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppState } from "src/store/reducer";
import UserForm from "./Form";

import { createUser, fetchUser, fetchUsers, setUser, updateUser } from "src/store/user/actions";

const CreateUpdateAccount: React.FC<PropsFromRedux> = ({
  fetchUsers,
  isSubmitting,
  isLoading,
  users,
  user,
  setUser,
  fetchUser,
  createUser,
  updateUser,
  setActive,
}) => {
  const { id } = useParams();
  const pageId = id;
  const navigate = useNavigate();

  const [pageData, setPageData] = useState(null);

  //   useEffect(() => {
  //     setActive("User Management");
  //   }, []);

  // reset user when component unmounts
  useEffect(() => {
    return () => {
      setUser(null);
    };
  }, []);

  useEffect(() => {
    if (pageId) fetchUser({ userId: pageId });
  }, [pageId]);

  useEffect(() => {
    setPageData(user);
  }, [user, pageId]);

  return (
    <UserForm
      pageName="User"
      formData={pageData}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      onCreate={async (values, { resetForm }) => {
        if (await createUser({ values })) {
          resetForm();
          navigate(-1);
          // window.location.href = app.desk.user.root(); // this will disturb notification system due to whole app reload
        }
      }}
      onEdit={async (values, { resetForm }) => {
        if (
          await updateUser({
            userId: pageData.id,
            values,
          })
        ) {
          resetForm();
          navigate(-1);
        }
      }}
    />
  );
};

const mapStateToProps = ({ userState: { users, user, isLoading, isSubmitting } }: AppState) => ({
  users,
  user,
  isSubmitting,
  isLoading,
});

const mapDispatchToProps = {
  createUser,
  updateUser,
  fetchUser,
  fetchUsers,
  setUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateUpdateAccount);
