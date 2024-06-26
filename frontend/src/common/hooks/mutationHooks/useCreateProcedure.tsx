// useCreateProcedure.ts
import axios from "axios";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { toast } from "react-toastify";

import { IAddNewProcedureFormValues } from "../../utils/form-values/createNewProcedure";

const createProcedure = async (newProcedure: IAddNewProcedureFormValues) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/procedure`,
    newProcedure,
  );
  return data;
};

export const useCreateProcedure = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    IAddNewProcedureFormValues,
    unknown
  >,
): UseMutationResult<unknown, unknown, IAddNewProcedureFormValues, unknown> => {
  return useMutation(createProcedure, {
    ...options,
    onSuccess(data) {
      toast.success(`Procedůra ${data.name} byla úspěšně vytvořena!`);
    },
  });
};
