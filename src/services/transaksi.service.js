import api from "./api";

export const getAllTransactions = async (params) => {
  const res = await api.get("/admin/transactions", { params });
  return res.data;
};

export const getTransactionById = async (transactionId) => {
  const res = await api.get(`/admin/transactions/${transactionId}`);
  return res.data;
};
