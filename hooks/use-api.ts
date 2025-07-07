import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

type UseApiOptions<TData, TError, TVariables> = {
  url: string;
  queryKey: QueryKey;
  method?: Method;
  data?: TVariables;
  queryOptions?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">;
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables>,
    "mutationFn"
  >;
  axiosConfig?: AxiosRequestConfig;
};

type UseApiResult<TData, TError, TVariables> = {
  queryResult: UseQueryResult<TData, TError> | null;
  mutationResult: UseMutationResult<TData, TError, TVariables> | null;
  mutate: (variables: TVariables) => void;
};

const apiRequest = async <TData, TVariables>(
  url: string,
  method: Method = "GET",
  data?: TVariables,
  axiosConfig?: AxiosRequestConfig,
): Promise<TData> => {
  const response: AxiosResponse<TData> = await axios({
    url,
    method,
    data,
    ...axiosConfig,
  });
  return response.data;
};

export const useApi = <TData = unknown, TError = unknown, TVariables = unknown>(
  options: UseApiOptions<TData, TError, TVariables>,
): UseApiResult<TData, TError, TVariables> => {
  const {
    url,
    queryKey,
    method = "GET",
    queryOptions,
    mutationOptions,
    axiosConfig,
  } = options;

  const queryClient = useQueryClient();

  const queryResult = useQuery<TData, TError>({
    queryKey,
    queryFn: () =>
      apiRequest<TData, TVariables>(url, "GET", undefined, axiosConfig),
    ...queryOptions,
    enabled: method.toUpperCase() === "GET" && queryOptions?.enabled !== false,
  });

  const mutationResult = useMutation<TData, TError, TVariables>({
    mutationFn: (variables: TVariables) =>
      apiRequest<TData, TVariables>(url, method, variables, axiosConfig),
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(data, variables, context);
      }
    },
  });

  return {
    queryResult: method.toUpperCase() === "GET" ? queryResult : null,
    mutationResult: method.toUpperCase() !== "GET" ? mutationResult : null,
    mutate: mutationResult.mutate,
  };
};
