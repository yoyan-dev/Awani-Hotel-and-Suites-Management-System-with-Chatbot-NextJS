import {
  addStaff,
  deleteStaff,
  fetchAllStaff,
  fetchStaff,
  updateStaff,
} from "@/features/staff/staff-thunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Staff } from "@/types/staff";

export function useStaff() {
  const dispatch = useAppDispatch();
  const { lists, list, isLoading, error } = useAppSelector(
    (state) => state.staff
  );
  return {
    lists,
    list,
    isLoading,
    error,
    fetchAllStaff: () => dispatch(fetchAllStaff()),
    fetchStaff: (id: string) => dispatch(fetchStaff(id)),
    addStaff: (payload: FormData) => dispatch(addStaff(payload)),
    updateStaff: (payload: Staff) => dispatch(updateStaff(payload)),
    deleteStaff: (id: string) => dispatch(deleteStaff(id)),
  };
}
