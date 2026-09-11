import { getDb, nextId, wait } from "@/data/db";
import type { Invoice, InvoiceStatus } from "@/types";

export type InvoiceInput = Omit<Invoice, "id" | "number">;

export const invoicesService = {
  async list(): Promise<Invoice[]> {
    await wait();
    return getDb().invoices;
  },
  async get(id: string): Promise<Invoice | undefined> {
    await wait(120);
    return getDb().invoices.find((invoice) => invoice.id === id);
  },
  async create(input: InvoiceInput): Promise<Invoice> {
    await wait(180);
    const seq = 1043 + getDb().invoices.length;
    const invoice: Invoice = {
      ...input,
      id: nextId("inv"),
      number: `NL-${seq}`,
    };
    getDb().invoices.unshift(invoice);
    return invoice;
  },
  async updateStatus(id: string, status: InvoiceStatus): Promise<Invoice> {
    await wait(120);
    const invoices = getDb().invoices;
    const index = invoices.findIndex((invoice) => invoice.id === id);
    if (index === -1) throw new Error("Invoice not found");
    invoices[index] = { ...invoices[index], status };
    return invoices[index];
  },
};

export function invoiceTotals(invoice: Invoice): { subtotal: number; tax: number; total: number } {
  const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const tax = subtotal * invoice.taxRate;
  return { subtotal, tax, total: subtotal + tax };
}
