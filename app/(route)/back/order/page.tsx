"use client";
import { getOrderByStoreId } from "@/util/client/api";
import { OrderByStoreId } from "@/util/client/api/back";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const Page = () => {
  const [order, setOrder] = useState<OrderByStoreId[]>([]);
  const [focusOrder, setFocusOrder] = useState<number | null>(null);

  useEffect(() => {
    let fetch = false;
    const fetchOrder = async () => {
      const res = await getOrderByStoreId(1);
      if (res.data.status === "success") {
        setOrder(res.data.data);
      }
    };
    fetchOrder();
    return () => {
      fetch = true;
    };
  }, []);

  return (
    <Box>
      {focusOrder !== null ? (
        <div>
          <Button variant="outlined" onClick={() => setFocusOrder(null)}>
            返回
          </Button>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>品項名</TableCell>
                  <TableCell>數量</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order[focusOrder].items.map((i) => (
                  <TableRow key={`focusOrderRow_${i.id}`}>
                    <TableCell>{i.product.name}</TableCell>
                    <TableCell>{i.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>分店名</TableCell>
                <TableCell>訂單id</TableCell>
                <TableCell>建立日期</TableCell>
                <TableCell>動作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.map((o, i) => (
                <TableRow key={`orderRow_${o.id}`}>
                  <TableCell>{o.store.name}</TableCell>
                  <TableCell>{o.id}</TableCell>
                  <TableCell>
                    {dayjs(o.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => setFocusOrder(i)}>
                      查看
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Page;
