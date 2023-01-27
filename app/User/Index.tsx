import configuration from "configuration";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "store/reducer";
import styled from "theme/styled";
import Button from "components/Button";
import { setMe } from "store/app/actions";
import { useNavigate } from "react-router-dom";
import app from "constants/app";

import { fetchUsers } from "store/user/actions";
import deleteIcon from "assets/icons/delete.svg";
import { RiEyeLine } from "react-icons/ri";
import { defaultQuery } from "constants/query";
import Pagination from "components/PageNumbers/Pagination";
import { Buffering } from "components/Spinner/Spinner";
import { DeleteModal } from "components/Modal/Index";
import { deleteUser } from "store/user/actions";
import { SiAuth0 } from "react-icons/si";
import { FaRegEdit } from "react-icons/fa";
import { ViewModal } from "components/Modal/Index";
import View from "app/User/View";
import { primary } from "theme";

const ClientItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-top: 5px;
  border: 2.29606px solid #ededed;
  border-radius: 22.9606px;
`;

const PrimaryInfo = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 0.25rem;
`;

const Email = styled.div`
  font-family: "Poppins400";
  font-weight: 400;
  line-height: 24px;
  color: #343434;
  width: 26ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Department = styled.div`
  font-family: "Poppins400";
  font-weight: 400;
  line-height: 24px;
  color: #343434;
  width: 18ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Name = styled.div`
  font-family: "Poppins500";
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  width: 15ch;
  color: #100db1;
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const AvatarWithLetter = styled.div<{ color }>`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: "Poppins300";
  font-size: 1.4rem;

  ::before {
    content: "";
    position: absolute;
    /* z-index: -1; */
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #d9d9d3ad;
  }
`;

const Designation = styled.div`
  font-family: "Poppins300";
  font-size: 0.85rem;
`;

const GuideActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Action = styled.div`
  padding: 8px;
  border-radius: 50%;
  :hover {
    background-color: #80808024;
  }
`;

const PageNumbers = styled(Pagination)`
  .page-number {
    color: red;
    font-weight: normal;
  }
`;

type clientType = {
  appId: string;
  email: string;
  name?: string;
  branch?: string;
  sid?: string;
  acType?: string;
  status: "waiting" | "connected";
  joinTime: string;
  isMobile?: boolean;
};

function openInNewTab(url) {
  window.open(url, "_blank").focus();
}

function LiveClients({
  me,
  fetchUsers,
  isLoading,
  isSubmitting,
  deleteUser,
  users,
  metadata,
}: PropsFromRedux) {
  const navigate = useNavigate();
  const [page, setPage] = useState(metadata?.page || defaultQuery.page);
  const [perPage, setPerPage] = useState<any>(metadata?.perPage || defaultQuery.perPage);
  const [showModal, setShowModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchUsers({});
  }, []);

  const handleModalClose = () => setShowModal(null);

  if (isLoading)
    return (
      <Buffering color="red">
        {new Array(12).fill(0).map((item) => (
          <div />
        ))}
      </Buffering>
    );

  const clientsList = users.length
    ? users.map((item) => (
        <ClientItem key={item.email}>
          <PrimaryInfo>
            <Group>
              {item?.profile_pic ? (
                <div
                  style={{
                    position: "relative",
                    border: "1px solid white",
                    borderRadius: "50%",
                    padding: 2,
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img width={"48px"} height="48px" id="avatar" src={item?.profilePic} />
                </div>
              ) : (
                <AvatarWithLetter color={"rgb(130,183,77)"}>
                  <span>{item?.fullName?.trim()[0]?.toUpperCase()}</span>
                </AvatarWithLetter>
              )}
              <div>
                <Name>{item?.fullName}</Name>
                <Designation>{item?.functionalTitle}</Designation>
              </div>
            </Group>
            <Email>{item?.email}</Email>
            <Department>{item?.department}</Department>
            <GuideActions>
              <Action>
                <SiAuth0
                  title="Permission"
                  style={{ cursor: "pointer" }}
                  size={24}
                  fill={primary}
                  onClick={() => {
                    navigate(`${app.desk.user.update(item.id)}/permission`);
                  }}
                />
              </Action>
              <Action>
                <RiEyeLine
                  style={{ cursor: "pointer" }}
                  title="View"
                  size={28}
                  fill={primary}
                  onClick={() => {
                    setSelectedItem(item);
                    setShowModal("view");
                  }}
                />
              </Action>
              <Action>
                <FaRegEdit
                  title="Edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(app.desk.user.update(item.id))}
                  size={24}
                  fill={primary}
                />
              </Action>

              <Action>
                <img
                  onClick={() => {
                    setSelectedItem(item);
                    setShowModal("delete");
                  }}
                  title="delete"
                  style={{ cursor: "pointer" }}
                  src={deleteIcon}
                  alt="delete"
                  width={20}
                />
              </Action>
            </GuideActions>
          </PrimaryInfo>
        </ClientItem>
      ))
    : null;

  const deleteModal = (
    <DeleteModal
      name="User"
      show={showModal === "delete"}
      onClose={handleModalClose}
      isSubmitting={isSubmitting}
      onClick={async () => {
        if (!selectedItem) return;

        if (
          await deleteUser({
            userId: selectedItem?.id,
          })
        ) {
          handleModalClose();
          fetchUsers({ query: { page, perPage } });
        }
      }}
    />
  );

  return (
    <div>
      {selectedItem && (
        <ViewModal
          body={<View item={selectedItem} />}
          show={showModal === "view"}
          minHeight="40vh"
          name="User"
          onClose={handleModalClose}
        />
      )}

      {deleteModal}
      <div style={{ position: "relative" }}>
        <Button
          size="md"
          style={{
            textShadow: "none",
            position: "absolute",
            right: "1em",
            top: -30,
            borderRadius: "2em",
          }}
          onClick={() => navigate(app.desk.user.create())}
        >
          Add
        </Button>
        <ul>{clientsList}</ul>
      </div>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <PageNumbers
          totalCount={metadata?.totalCount || 0}
          currentPage={page}
          perPage={perPage}
          onPageChange={(page) => {
            let pageNumber = Number(page);
            setPage(pageNumber);
            // setPageno(page);
            fetchUsers({
              query: {
                page,
                perPage,
              },
            });
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = ({
  appState: { me },
  userState: { users, metadata, isLoading, isSubmitting },
}: AppState) => ({
  me,
  users,
  metadata,
  isLoading,
  isSubmitting,
});

const mapDispatchToProps = {
  setMe,
  fetchUsers,
  deleteUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LiveClients);
