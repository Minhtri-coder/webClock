import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Chip,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../libs/axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [listOrder, setListOrder] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const navigate = useNavigate();

  const fetch = async () => {
    try {
      const res = await api.get("/order");
      setListOrder(res.data.listorder);
      console.log("hiện thị danh sách hoá đơn thành công", res.data.listorder);
    } catch (error) {
      console.log("bị lỗi hoá đơn");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  // 🎯 Filter logic
  const filteredOrders = (listOrder || []).filter((order) => {
    const keyword = (search || "").toLowerCase();
    const fullname = `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`;
    return (
      fullname.toLowerCase().includes(keyword) &&
      (status === "all" || order.status === status)
    );
  });

  const updateStatus = async (id, newstatus) => {
    try {
      await api.put(`/order/${id}/status`, {
        status: newstatus,
      });
    } catch (error) {
      console.log("lỗi cập nhập trạng thái");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* 🔍 HEADER */}
      <Typography variant="h5" mb={3}>
        Order Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search customer..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          size="small"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ width: 150 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="done">Done</MenuItem>
          <MenuItem value="cancel">Cancel</MenuItem>
        </TextField>
      </Box>

      {/* 📊 TABLE */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>View Details</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Không có đơn hàng
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>{order.shippingAddress?.firstName}</TableCell>
                  <TableCell>
                    {order.orderItems
                      .reduce((total, item) => total + item.price * item.qty, 0)
                      .toLocaleString("vi-VN")}
                    {""}đ
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={order.status}
                      color={
                        order.status === "pending"
                          ? "warning"
                          : order.status === "done"
                            ? "success"
                            : "error"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(order.createdAt).toString().split(" GMT")[0]}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      sx={{
                        borderRadius: "10px",
                        textTransform: "none",
                        px: 2,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                      }}
                      onClick={() =>
                        navigate(`/admin/products/details?id=${order._id}`)
                      }
                    >
                      Details
                    </Button>
                  </TableCell>

                  <TableCell align="right" sx={{ pr: 8 }}>
                    <IconButton size="small" sx={{ color: "#3f51b5", mr: 1 }}>
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton size="small" sx={{ color: "#d32f2f" }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
