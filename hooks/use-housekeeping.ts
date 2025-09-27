import {
  addHousekeepingTask,
  deleteHousekeepingTask,
  fetchHousekeepingTask,
  fetchHousekeepingTasks,
  updateHousekeepingTask,
} from "@/features/housekeeping/housekeeping-thunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  FetchHousekeepingParams,
  HousekeepingTask,
} from "@/types/housekeeping";

export function useHousekeeping() {
  const dispatch = useAppDispatch();
  const { tasks, task, pagination, isLoading, error } = useAppSelector(
    (state) => state.housekeeping
  );
  return {
    task,
    tasks,
    pagination,
    isLoading,
    error,
    fetchHousekeepingTasks: (payload: FetchHousekeepingParams | null) =>
      dispatch(fetchHousekeepingTasks(payload || {})),
    fetchHousekeepingTask: (id: string) => dispatch(fetchHousekeepingTask(id)),
    addHousekeepingTask: (payload: HousekeepingTask) =>
      dispatch(addHousekeepingTask(payload)),
    updateHousekeepingTask: (payload: HousekeepingTask) =>
      dispatch(updateHousekeepingTask(payload)),
    deleteHousekeepingTask: (id: string) =>
      dispatch(deleteHousekeepingTask(id)),
  };
}
