"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import {
  JobType,
  CreateAndEditJobType,
  createAndEditJobSchema,
  JobStatus,
} from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

const authenticateAndRedirect = (): string => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
};

export const createJobAction = async (
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface GetAllJobsRequest {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
}

export interface GetAllJobsResponse {
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}

export const getAllJobsAction = async ({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsRequest): Promise<GetAllJobsResponse> => {
  const userId = authenticateAndRedirect();
  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }
    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }
    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      // take: limit,
      // skip: page * limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const count: number = await prisma.job.count({
      where: whereClause,
    });
    const totalPages: number = Math.ceil(count / limit);
    return { jobs, count, page, totalPages };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 0, totalPages: 0 };
  }
};

export const deleteJobAction = async (id: string): Promise<JobType | null> => {
  try {
    const job = await prisma.job.delete({
      where: {
        id,
        clerkId: authenticateAndRedirect(),
      },
    });
    return job;
  } catch (error) {
    return null;
  }
};

export const getSingleJobAction = async (
  id: string
): Promise<JobType | null> => {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: authenticateAndRedirect(),
      },
    });
    return job;
  } catch (error) {
    return null;
  }
};

export const updateJobAction = async (
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: authenticateAndRedirect(),
      },
      data: values,
    });
    return job;
  } catch (error) {
    return null;
  }
};
