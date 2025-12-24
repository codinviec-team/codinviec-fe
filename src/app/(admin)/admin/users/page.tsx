"use client";

import RoleService from "@/services/auth/RoleService";
import UserService from "@/services/auth/UserServices";
import { RoleType } from "@/types/auth/Role";
import { IUser } from "@/types/auth/User";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { useQuery } from "@tanstack/react-query";
import { SelectProps } from "antd";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import HeaderUserAdmin from "./components/HeaderUserAdmin";
import SearchComponentUser from "./components/SearchComponentsUser";
import TableUser from "./components/TablesUser";
import { alert } from "@/utils/notification";
import CompanyServices from "@/services/home/companies/CompanyServices";
import { CompanyType } from "@/types/home/company/CompanyType";

const PageSizeDefault = 9;

export type GeneralUserType = {
  total: number;
  candidates: number;
  hired: number;
  blocked: number;
  admin: number;
};

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [generalUserInfo, setGeneralUserInfo] = useState<GeneralUserType>({
    total: 0,
    candidates: 0,
    hired: 0,
    blocked: 0,
    admin: 0,
  });
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);

  const {
    data: dataUser,
    isLoading: isLoadingUser,
    refetch: refetchUserData,
  } = useQuery<BasePageResponse<IUser>, Error>({
    queryKey: ["userAll", filterRole, filterStatus, debouncedKeyword],
    queryFn: () =>
      UserService.getAllUserHavePage({
        pageNumber: pageNumber,
        pageSize: PageSizeDefault,
        keyword: debouncedKeyword,
        block: filterStatus ? filterStatus === "block" : null,
        roleId: filterRole ? filterRole : null,
      }),
  });

  const { data: dataRoles, isLoading: isLoadingRoles } = useQuery<
    RoleType[],
    Error
  >({
    queryKey: ["roleAll"],
    queryFn: () => RoleService.getAllRole(),
  });

  const { data: dataCompany, isLoading: isLoadingCompany } = useQuery<
    CompanyType[],
    Error
  >({
    queryKey: ["companyAll"],
    queryFn: () => CompanyServices.getAllCompany(),
  });

  useEffect(() => {
    if (dataUser) {
      setGeneralUserInfo((general) => {
        return {
          total: dataUser?.content?.length || 0,
          candidates: dataUser?.content?.filter(
            (item) => item?.role?.roleName?.toLocaleLowerCase() === "user"
          ).length,
          hired: dataUser?.content?.filter(
            (item) => item?.role?.roleName?.toLocaleLowerCase() === "hr"
          ).length,
          admin: dataUser?.content?.filter(
            (item) => item?.role?.roleName?.toLocaleLowerCase() === "admin"
          ).length,
          blocked: dataUser?.content?.filter((item) => item?.block === true)
            .length,
        };
      });
    }
  }, [dataUser]);

  // const handleDelete = (id: string) => {
  //   Modal.confirm({
  //     title: "Xác nhận xóa",
  //     icon: <ExclamationCircleOutlined className="text-red-500" />,
  //     content: "Bạn có chắc chắn muốn xóa người dùng này?",
  //     okText: "Xóa",
  //     okType: "danger",
  //     cancelText: "Hủy",
  //     onOk: () => {
  //       setUsers(users.filter((user) => user.id !== id));
  //       message.success("Đã xóa người dùng!");
  //     },
  //   });
  // };

  // const handleBulkDelete = () => {
  //   if (selectedRowKeys.length === 0) {
  //     message.warning("Vui lòng chọn ít nhất một người dùng!");
  //     return;
  //   }

  //   Modal.confirm({
  //     title: "Xác nhận xóa",
  //     icon: <ExclamationCircleOutlined className="text-red-500" />,
  //     content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} người dùng đã chọn?`,
  //     okText: "Xóa",
  //     okType: "danger",
  //     cancelText: "Hủy",
  //     onOk: () => {
  //       setUsers(users.filter((user) => !selectedRowKeys.includes(user.id)));
  //       setSelectedRowKeys([]);
  //       message.success(`Đã xóa ${selectedRowKeys.length} người dùng!`);
  //     },
  //   });
  // };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleRoleChange: SelectProps<string | null>["onChange"] = (value) => {
    setFilterRole(value);
  };

  const handleStatusChange: SelectProps<string | null>["onChange"] = (
    value
  ) => {
    setFilterStatus(value);
  };

  // RESET FILTER
  const handleResetFilter = () => {
    setSearchKeyword("");
    setFilterRole(null);
    setFilterStatus(null);
  };

  // Block or Unblock User
  const handleToggleBlock = async (user: IUser) => {
    if (user) {
      if (user?.block === true) {
        await UserService.unblockUser({ userId: user?.id });
        alert.success("Mở khóa người dùng thành công!");
      } else {
        await UserService.blockUser({ userId: user?.id });
        alert.success("Khóa người dùng thành công!");
      }
      refetchUserData();
    }
  };

  // XÓA USER
  const handleDeleteUser = async (user: IUser) => {
    if (user) {
      const userDelete = await UserService.deleteUser({ userId: user?.id });
      if (userDelete?.id) {
        alert.success("Xóa người dùng thành công!");
      } else {
        alert.success("Xóa người dùng thất bại!");
      }
      refetchUserData();
    }
  };
  const loadingPage = isLoadingUser && isLoadingRoles && isLoadingCompany;

  const StatusCardProps = {
    generalUserInfo,
    dataCompany: dataCompany || [],
    dataRoles: dataRoles || [],
    loadingPage,
    refetchUserData,
  };

  const TableProps = {
    dataUser: dataUser?.content || [],
    selectedRowKeys,
    setSelectedRowKeys,
    loadingPage,
    handleToggleBlock,
    handleDeleteUser,
  };

  const SearchUserProps = {
    dataRoles: dataRoles || [],
    searchKeyword: searchKeyword || "",
    handleSearchChange,
    filterRole: filterRole || null,
    handleRoleChange,
    filterStatus: filterStatus || null,
    handleStatusChange,
    handleResetFilter,
  };

  return (
    <div className="space-y-6">
      <HeaderUserAdmin {...StatusCardProps} />

      {/* Filters */}
      <SearchComponentUser {...SearchUserProps} />

      <TableUser {...TableProps} />
    </div>
  );
}
