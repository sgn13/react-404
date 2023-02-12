import { ComponentType, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setSidebar } from "store/app/actions";
import { IndexSidebar } from "constants/sidebar";
import checkPermission from "utils/checkPermission";

type PropsForNewComponent = {
  allowAccessTo?: "everyone" | string | string[];
  sidebarType: "index" | "admin" | "active";
};

function withProtectedSidebar(WrappedComponent: ComponentType<any>) {
  // eslint-disable-next-line no-shadow
  // eslint-disable-next-line @typescript-eslint/no-shadow
  function newComponent({
    sidebarType,
    setSidebar,
    me,
    ...rest
  }: PropsFromRedux & PropsForNewComponent) {
    useEffect(() => {
      if (!me || !me?.permissions || !sidebarType) return;

      const switchingTo =
        sidebarType === "active"
          ? String(window.sessionStorage.getItem("sidebarType"))
          : sidebarType;

      switch (switchingTo) {
        case "index":
          window.sessionStorage.setItem("sidebarType", "index");
          const sidebars = IndexSidebar();
          const permittedSidebars = sidebars.filter((item) =>
            item?.permission ? checkPermission(item.permission, me.permissions) : item,
          );
          setSidebar(permittedSidebars);
          break;

        case "admin":
          window.sessionStorage.setItem("sidebarType", "admin");
          console.log("setting admin sidebar");

        default:
          setSidebar([]);
      }
    }, [sidebarType, me]);

    return <WrappedComponent {...rest} />;
  }

  const mapStateToProps = ({ appState: { me } }) => ({ me });

  const mapDispatchToProps = {
    setSidebar,
  };
  const connector = connect(mapStateToProps, mapDispatchToProps);
  type PropsFromRedux = ConnectedProps<typeof connector>;

  return connector(newComponent);
}

export default withProtectedSidebar;
