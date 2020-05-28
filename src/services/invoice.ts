import axios from "axios"
import Invoice from "../modules/invoice"

async function createInvoice(invoice: Types.Invoice): Promise<Types.Invoice> {
  const { data } = await axios.post("/api/invoices", invoice)
  return Invoice.parse(data)
}

async function readInvoice(invoiceId: number): Promise<Types.Invoice> {
  const { data } = await axios.get(`/api/invoices/${invoiceId}`)
  return Invoice.parse(data)
}

async function updateInvoice(
  invoiceId: number,
  updatedInvoice: Types.Invoice
): Promise<Types.Invoice> {
  const { data } = await axios.put(`/api/invoices/${invoiceId}`, updatedInvoice)
  return Invoice.parse(data)
}

async function deleteInvoice(invoiceId: number) {
  await axios.delete(`/api/invoices/${invoiceId}`)
}

async function listInvoices(): Promise<Types.Invoice[]> {
  const { data } = await axios.get("/api/invoices")
  return Array.isArray(data) ? data.map(Invoice.parse) : []
}

export default {
  createInvoice,
  readInvoice,
  updateInvoice,
  deleteInvoice,
  listInvoices,
}
