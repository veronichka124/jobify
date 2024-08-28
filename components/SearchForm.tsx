"use client";
import { useForm } from "react-hook-form";
import InputField from "./form/InputField";
import SelectField from "./form/SelectField";
import { Button } from "./ui/button";
import { JobStatus } from "@/utils/types";
import { Form } from "./ui/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchRequest = {
  search: string;
  position: string;
};

const SearchForm = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<SearchRequest>({
    defaultValues: {
      search: search,
      position: jobStatus,
    },
  });
  const { handleSubmit, control } = form;

  const onSubmit = (values: SearchRequest) => {
    const { search, position } = values;
    let params = new URLSearchParams();
    params.set("search", search);
    params.set("jobStatus", position);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg"
      >
        <InputField name="search" control={control} />
        <SelectField
          name="position"
          control={control}
          items={["all", ...Object.values(JobStatus)]}
        />
        <Button type="submit" className="self-end capitalize">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;
