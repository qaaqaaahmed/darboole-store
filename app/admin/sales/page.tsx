import SectionTitle from "@/components/global/SectionTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAdminOrders } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";

async function SalesPage() {
  const adminOrders = await fetchAdminOrders();

  return (
    <>
      <SectionTitle text="Total Orders" />
      <Table>
        <TableCaption>Total orders: {adminOrders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>email</TableHead>
            <TableHead>products</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {adminOrders.map((order) => {
            const {
              id,
              email,
              tax,
              shipping,
              orderTotal,
              createdAt,
              products,
            } = order;
            return (
              <TableRow key={id}>
                <TableCell>{email}</TableCell>
                <TableCell>{products}</TableCell>
                <TableCell>{formatCurrency(tax)}</TableCell>
                <TableCell>{formatCurrency(shipping)}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default SalesPage;
