"use client";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import { useSearchParams } from "next/navigation";

const JobsList = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";
  const pageNumber = Number(searchParams.get("page")) || 1;

  const { data } = useQuery({
    queryKey: ["jobs", search ?? "", jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });

  console.log(data);

  const jobs = data?.jobs || [];

  if (jobs.length < 1) return <h2 className="text-xl">No Jobs Found...</h2>;

  return (
    <>
      {/*button container  */}
      <div className="grid md:grid-cols-2  gap-8">
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>
    </>
  );
};

export default JobsList;
