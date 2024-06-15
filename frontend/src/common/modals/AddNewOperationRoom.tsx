import { Autocomplete, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import Button from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import LabelInputContainer from "../components/LabelInputContainer";
import Loader from "../components/Loader";
import { useProceduresForAutocomplete } from "../hooks/queryHooks/useProceduresForAutocomplete";
import { ICreateNewOperationRoomFormValues } from "../utils/form-values/createNewOperationRoom";

interface IAddNewOperationRoomModalProps {
  onSubmit: (values: ICreateNewOperationRoomFormValues) => void;
  defaultValues?: ICreateNewOperationRoomFormValues;
  error?: string;
  closeModal: () => void;
}

export const AddNewOperationRoom: React.FC<IAddNewOperationRoomModalProps> = ({
  onSubmit,
  defaultValues,
  closeModal,
  error,
}) => {
  const { register, handleSubmit, setValue, control, getValues } =
    useForm<ICreateNewOperationRoomFormValues>({
      defaultValues,
    });

  const {
    data: proceduresForAutocomplete,
    isLoading,
    isError,
  } = useProceduresForAutocomplete();

  return (
    <div className="flex w-full flex-col items-center gap-32 align-top">
      <Loader isLoading={isLoading} isError={isError} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start rounded-lg !bg-white text-center shadow-xl"
      >
        <div className="flex w-full flex-col gap-5 p-10 pb-20">
          <h1 className="text-3xl font-bold text-primary">
            Vytvořit nový operační sál
          </h1>
          <div className="space-y-4 text-start md:space-y-6">
            <LabelInputContainer className="mb-8">
              <Label htmlFor="twitterpassword">Název sálu</Label>
              <Input {...register("name")} />
              {error !== "" && (
                <p className="mt-2 text-xl italic text-red-500">{error}</p>
              )}
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="twitterpassword">Procedůry</Label>
              <Controller
                name="procedures"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={proceduresForAutocomplete}
                    getOptionLabel={(option) => option.name}
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue.map((option) => option.name));
                      setValue(
                        "procedures",
                        newValue.map((option) => option.name),
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Vyberte procedůry"
                      />
                    )}
                  />
                )}
              />
            </LabelInputContainer>
          </div>

          <div className="flex w-full items-center justify-center gap-6">
            <div className="flex gap-5 text-end">
              <div className="flex gap-4 text-end">
                <Button
                  type="submit"
                  size="lg"
                  className="w-20 bg-blue-800 hover:bg-blue-900"
                >
                  Vytvořit
                </Button>
                <Button
                  onClick={() => {
                    closeModal();
                  }}
                  size="lg"
                  className="w-20"
                  type="button"
                >
                  Zrušit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewOperationRoom;
