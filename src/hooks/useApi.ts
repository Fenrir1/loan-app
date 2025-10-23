import { useQuery, useMutation } from "@tanstack/react-query";
import { ApiService } from "../services/api";
import { ApiResponse } from "../types";

export const queryKeys = {
  productCategories: ["productCategories"] as const,
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: queryKeys.productCategories,
    queryFn: ApiService.getProductCategories,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useSubmitLoanApplication = () => {
  return useMutation<ApiResponse, Error, string>({
    mutationFn: (title: string) => ApiService.submitLoanApplication(title),
    onSuccess: (data) => {
      console.log("Заявка успешно отправлена:", data);
    },
    onError: (error) => {
      console.error("Ошибка при отправке заявки:", error);
    },
  });
};
