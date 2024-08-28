"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import InputField from "./form/InputField";
import SelectField from "./form/SelectField";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJobAction,
  getSingleJobAction,
  updateJobAction,
} from "@/utils/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function EditJobForm({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: "there was an error" });
        return;
      }
      toast({ description: "job updated" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      router.push("/jobs");
    },
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <InputField name="position" control={form.control} />
          <InputField name="company" control={form.control} />
          <InputField name="location" control={form.control} />
          <SelectField
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          <SelectField
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />

          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            edit job
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default EditJobForm;
