"use client";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@prisma/client";
import { getProduct, postOrder } from "@/util/client/api";

const Page = ({ params }: { params: { id: number } }) => {
  const storeId = Number(params.id);
  const [products, setProducts] = useState<Product[]>([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const items = products
      .map((p) => ({
        productId: p.id,
        quantity: parseInt(data[`quantity_${p.id}`]) || 0,
      }))
      .filter((item) => item.quantity > 0);
    const res = await postOrder(storeId, { items });
    if (res.data.status === "success") {
      window.alert("訂購成功");
    }
  };

  useEffect(() => {
    let fetched = false;
    const fetchProdcuts = async () => {
      const res = await getProduct();
      if (res.data.status === "success") {
        setProducts(res.data.data);
      }
    };

    fetchProdcuts();
    return () => {
      fetched = true;
    };
  }, []);

  return (
    <Box width={600} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Button type="submit">訂購</Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>產品名</TableCell>
              <TableCell>價格/單位</TableCell>
              <TableCell>數量</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={`tableRow_${p.id}`}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.price}/份</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    defaultValue={0}
                    {...register(`quantity_${p.id}`)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Page;
