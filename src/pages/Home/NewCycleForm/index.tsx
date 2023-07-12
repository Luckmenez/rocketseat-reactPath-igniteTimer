import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";

import { useContext } from "react";
import { CycleContext } from "../../../contexts/CycleContexts";

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task suggestions"
        placeholder="Deu um nome para o seu ciclo"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="New Project" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        step={5}
        min={5}
        max={60}
        type="number"
        id="minutesAmount"
        placeholder="00"
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
