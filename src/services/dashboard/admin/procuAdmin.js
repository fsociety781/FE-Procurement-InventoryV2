import { baseApi } from "@/plugins/axios";

const api = '/admin/procurement';

const list = (params) => baseApi.get(`${api}`, {params});
const add = (body) => baseApi.post(`${api}`, body)
const del = (id) => baseApi.delete(`${api}/${id}`);
const getById = (id) => baseApi.get(`${api}/${id}`)
const update = (id, body) => baseApi.patch(`${api}/${id}`, body);


export { add, list, getById, del, update };