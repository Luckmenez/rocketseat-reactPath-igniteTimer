import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./CountDown";
import { CycleContext } from "../../contexts/CycleContexts";

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CycleContext);
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
      .number()
      .min(5, "O ciclo deverá ser de no mínimo 5 minutos")
      .max(60, "O ciclo deverá ser de no máximo 60 minutos"),
  });

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(inputValues: NewCycleFormData) {
    createNewCycle(inputValues);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Começar
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
