import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { HomeIcon, MenuIcon } from "../../utils/icons";
export default function Layout({ children }) {
  const router = useRouter();
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <ProSidebar
        toggled={toggled}
        onToggle={handleToggleSidebar}
        breakPoint="md"
        className="col-auto side-bar top-0"
      >
        <SidebarHeader>
          <h1 className="text-xl px-4 py-3">Logo</h1>{" "}
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              title="Home"
              icon={<HomeIcon height="20" width="20" />}
              onClick={() => router.push("/")}
            >
              Home
            </MenuItem>

            <SubMenu title="Statement's" icon="ST">
              <MenuItem icon="" onClick={() => router.push("/statementLines")}>
                View
              </MenuItem>
              <MenuItem
                icon=""
                onClick={() => router.push("/statementLines/create")}
              >
                Create
              </MenuItem>
              <MenuItem
                icon="M"
                onClick={() => router.push("/statementLines/manage")}
              >
                Manage
              </MenuItem>
            </SubMenu>

            <SubMenu title="Financial Statements" icon="FS">
              <MenuItem
                icon=""
                onClick={() => router.push("/financial-statements")}
              >
                View
              </MenuItem>
              <MenuItem
                icon=""
                onClick={() => router.push("/financial-statements/create")}
              >
                Create
              </MenuItem>
            </SubMenu>

            <MenuItem
              title="Home"
              icon={"Bal"}
              onClick={() =>
                router.push({
                  pathname: "/balancesheet",
                })
              }
            >
              Balance Sheet
            </MenuItem>
            <MenuItem
              title="Home"
              icon={"P&L"}
              onClick={() =>
                router.push({
                  pathname: "/",
                })
              }
            >
              Profit And Loss
            </MenuItem>

            <MenuItem
              title="Home"
              icon={"XLSX"}
              onClick={() =>
                router.push({
                  pathname: "/uploadFromExcel",
                })
              }
            >
              Upload From Excel
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>

      <div className="flex-grow">
        <div className="flex justify-end px-3 py-2 md:hidden bg-gray-800 w-100">
          <div
            className="cursor-pointer"
            onClick={() => handleToggleSidebar(true)}
          >
            <MenuIcon height="30" width="30" color="#fff" />
          </div>
        </div>

        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
