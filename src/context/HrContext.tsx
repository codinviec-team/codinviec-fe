"use client";

import { useAppSelector } from "@/hooks/hooks";
import UserService from "@/services/UserServices";
import JobServices from "@/services/JobServices";
import { RootState } from "@/store";
import { IUser, JobApplyUserType } from "@/types/User";
import { JobType } from "@/types/home/job/JobType";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";

interface HrContextType {
  jobsCompany: JobType[] | undefined;
  dataUserApply: JobApplyUserType | undefined;
  loadingContextHr: boolean;
}

const HrContext = createContext<HrContextType | undefined>(undefined);

export function HrProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  const { data: dataJobs, isLoading: isLoadingJobs } = useQuery<
    JobType[],
    Error
  >({
    queryKey: ["jobs", user?.company?.id],
    enabled: !!user?.company?.id,
    queryFn: () => JobServices.getJobByIdCompany(user!.company!.id),
  });

  const { data: dataUserApply, isLoading: isLoadingUserApply } = useQuery<
    JobApplyUserType,
    Error
  >({
    queryKey: ["UserApply", user?.company?.id],
    enabled: !!user?.company?.id,
    queryFn: () => UserService.getUserApplyByCompanyId(user!.company!.id),
  });

  const loadingContextHr = loading || isLoadingJobs || isLoadingUserApply;

  return (
    <HrContext.Provider
      value={{
        jobsCompany: dataJobs || [],
        loadingContextHr,
        dataUserApply,
      }}
    >
      {children}
    </HrContext.Provider>
  );
}

export function useHrContext() {
  const context = useContext(HrContext);

  if (!context) {
    throw new Error("useHrContext phải sử dụng trong HrProvider");
  }

  return context;
}
