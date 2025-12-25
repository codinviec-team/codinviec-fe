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
import HeaderUserAdmin, {
  UserEditFormValues,
} from "./components/HeaderUserAdmin";
import SearchComponentUser from "./components/SearchComponentsUser";
import TableUser from "./components/TablesUser";
import { alert } from "@/utils/notification";
import CompanyServices from "@/services/home/companies/CompanyServices";
import { CompanyType } from "@/types/home/company/CompanyType";
import dayjs from "dayjs";

const PageSizeDefault = 9;

export type GeneralUserType = {
  total: number;
  candidates: number;
  hired: number;
  blocked: number;
  admin: number;
};

export default function AdminUsersPage() {
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
  const [openEditUser, setopenEditUser] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState<
    (UserEditFormValues & { id: string }) | null
  >(null);

  const [debouncedKeyword] = useDebounce(searchKeyword, 500);

  console.log("selectedRowKeys", selectedRowKeys);

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
      setSelectedRowKeys([]);
    }
  }, [dataUser]);

  // Xóa nhiều người dùng
  const handleDeleteUsers = async () => {
    const oke = await alert.confirm(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa người dùng này?"
    );
    if (!oke) return;

    // Xử lý xóa người dùng với id
    if (selectedRowKeys && selectedRowKeys?.length > 0) {
      for (let index = 0; index < selectedRowKeys.length; index++) {
        const userId = selectedRowKeys[index];
        await UserService.deleteUser({ userId: userId as string });
      }
      alert.success("Đã xóa nhiều người dùng thành công!");
    } else {
      alert.warning("Không có người dùng nào được chọn!");
    }
    setSelectedRowKeys([]);
    refetchUserData();
  };

  // Khóa nhiều người dùng
  const handleBlockUsers = async () => {
    const oke = await alert.confirm(
      "Xác nhận khóa",
      "Bạn có chắc chắn muốn khóa người dùng này?"
    );
    if (!oke) return;

    // Xử lý xóa người dùng với id
    if (selectedRowKeys && selectedRowKeys?.length > 0) {
      for (let index = 0; index < selectedRowKeys.length; index++) {
        const userId = selectedRowKeys[index];
        await UserService.blockUser({ userId: userId as string });
      }
      alert.success("Đã khóa nhiều người dùng thành công!");
    } else {
      alert.warning("Không có người dùng nào được chọn!");
    }
    setSelectedRowKeys([]);
    refetchUserData();
  };

  // Mở Khóa nhiều người dùng
  const handleUnblockUsers = async () => {
    const oke = await alert.confirm(
      "Xác nhận mở khóa",
      "Bạn có chắc chắn muốn mở  khóa người dùng này?"
    );
    if (!oke) return;

    // Xử lý xóa người dùng với id
    if (selectedRowKeys && selectedRowKeys?.length > 0) {
      for (let index = 0; index < selectedRowKeys.length; index++) {
        const userId = selectedRowKeys[index];
        await UserService.unblockUser({ userId: userId as string });
      }
      alert.success("Đã mở khóa nhiều người dùng thành công!");
    } else {
      alert.warning("Không có người dùng nào được chọn!");
    }
    setSelectedRowKeys([]);
    refetchUserData();
  };

  // Handle open edit user modal
  const handleOpenEditUser = (open: boolean) => {
    setopenEditUser(open);
  };

  // HANDLE SEARCH CHANGE
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // HANDLE ROLE CHANGE
  const handleRoleChange: SelectProps<string | null>["onChange"] = (value) => {
    setFilterRole(value);
  };

  // HANDLE SET SELECTED ROW KEYS
  const handleSetSelectedRowKeys = (keys: React.Key[]) => {
    setSelectedRowKeys(keys);
  };

  // HANDLE STATUS CHANGE
  const handleStatusChange: SelectProps<string | null>["onChange"] = (
    value
  ) => {
    setFilterStatus(value);
  };

  //  HANDLE PAGE CHANGE
  const onChangePageNumber = (page: number, pageSize?: number) => {
    setPageNumber(page);
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

  // open modal Edit user info
  const handleOpenEdditUserInfor = async (user: IUser) => {
    if (user) {
      setEditUserInfo({
        id: user?.id || "",
        email: user?.email || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        phone: user?.phone || "",
        gender: user?.gender || "",
        birthDate: dayjs(user?.birthDate) || "",
        education: user?.education || "",
        address: user?.address || "",
        websiteLink: user?.websiteLink || "",
        companyId: user?.companyId || "",
        roleId: user?.role?.id || "",
      });
      setopenEditUser(true);
    }
  };

  const handleChangeEditUserInfo = (
    userInfo: (UserEditFormValues & { id: string }) | null
  ) => {
    setEditUserInfo(userInfo);
  };

  // XÓA USER
  const handleDeleteUser = async (user: IUser) => {
    if (user) {
      const ok = await alert.warning("Xác nhận", "Bạn có chắc muốn xóa?");
      if (!ok) return;
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

  const HeaderUserProps = {
    generalUserInfo,
    dataCompany: dataCompany || [],
    dataRoles: dataRoles || [],
    loadingPage,
    refetchUserData,
    handleOpenEditUser,
    openEditUser,
    handleOpenEdditUserInfor,
    editUserInfo,
    handleChangeEditUserInfo,
  };

  const TableProps = {
    dataUser: dataUser?.content || [],
    loadingPage,
    handleToggleBlock,
    handleDeleteUser,
    pageSize: PageSizeDefault || 9,
    onChangePageNumber,
    pageNumber: pageNumber || 1,
    handleOpenEdditUserInfor,
    selectedRowKeys,
    handleSetSelectedRowKeys,
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
    selectedRowKeys,
    handleSetSelectedRowKeys,
    handleDeleteUsers,
    handleBlockUsers,
    handleUnblockUsers,
  };

  return (
    <div className="space-y-6">
      <HeaderUserAdmin {...HeaderUserProps} />

      {/* Filters */}
      <SearchComponentUser {...SearchUserProps} />

      <TableUser {...TableProps} />
    </div>
  );
}
