import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Typography,
  TablePagination,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import api from "../../libs/axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function Product() {
  const [product, setproduct] = useState([]);
  const nagative = useNavigate();
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState("");
  const [search, setSearch] = useState("");

  const fetchDel = async () => {
    try {
      const res = await api.delete(`/products/${openId}`);
      setproduct(product.filter((item) => item._id !== openId));
      setOpen(false);
    } catch (error) {
      console.log("bị lỗi");
    }
  };

  const openDel = (id) => {
    console.log("Chuẩn bị xóa ID:", id);
    setOpenId(id);
    setOpen(true);
  };

  const closeDel = () => setOpen(false);

  const handle = () => {
    console.log("delete");
    closeDel();
  };

  const data = async () => {
    try {
      const res = await api.get("/products");
      setproduct(res.data);
      console.log("hiện thị sản phẩm thành công");
    } catch (error) {
      console.log("bị lỗi");
    }
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          p: 2,
          borderRadius: "4px",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          sx={{ mb: 4, mt: 1, color: "#333", fontWeight: 500 }}
        >
          Products List
        </Typography>

        {/* Toolbar: Search & Add Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <TextField
            label="Search Products"
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            onChange={(e) => setSearch(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={() => nagative("/admin/products/create")}
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#1976d2",
              textTransform: "uppercase",
              fontWeight: "bold",
              px: 3,
            }}
          >
            ADD
          </Button>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", borderBottom: "2px solid #eee" }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", borderBottom: "2px solid #eee" }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", borderBottom: "2px solid #eee" }}
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", borderBottom: "2px solid #eee" }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    borderBottom: "2px solid #eee",
                    pr: 4,
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product
                .filter((row) =>
                  row.name?.toLowerCase().includes(search.toLowerCase()),
                )
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {row.price.toLocaleString("vi-VN") + " đ"}
                    </TableCell>
                    <TableCell>{row.category.name}</TableCell>
                    <TableCell sx={{ color: "#666", fontSize: "0.85rem" }}>
                      {new Date(row.createdAt).toString().split(" GMT")[0]}
                    </TableCell>
                    <TableCell align="right" sx={{ pr: 2 }}>
                      <IconButton
                        size="small"
                        sx={{ color: "#3f51b5", mr: 1 }}
                        onClick={() => {
                          nagative(`/admin/products/update?id=${row._id}`);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        sx={{ color: "#d32f2f" }}
                        onClick={() => openDel(row._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>

                      <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        className="relative z-50"
                      >
                        {/* Lớp nền mờ - Tự động có hiệu ứng transition khi thêm thuộc tính transition */}
                        <DialogBackdrop
                          transition
                          className="fixed inset-0 bg-black/25 transition-opacity data-[closed]:opacity-0 duration-300 ease-out"
                        />

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-center justify-center p-4">
                            {/* Nội dung Modal - Tự động hiệu ứng Scale và Opacity */}
                            <DialogPanel
                              transition
                              className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-xl duration-300 ease-out data-[closed]:transform data-[closed]:opacity-0 data-[closed]:scale-95"
                            >
                              <DialogTitle
                                as="h3"
                                className="text-3xl font-semibold text-gray-600 mb-4"
                              >
                                Are you sure?
                              </DialogTitle>

                              <p className="mt-2 text-lg text-gray-500">
                                You won't be able to revert this!
                              </p>

                              <div className="mt-8 flex justify-center space-x-3">
                                <button
                                  className="rounded-md bg-[#3085d6] px-6 py-2.5 text-white font-medium hover:bg-blue-600 transition"
                                  onClick={fetchDel}
                                >
                                  Yes, delete it!
                                </button>
                                <button
                                  className="rounded-md bg-[#d33] px-6 py-2.5 text-white font-medium hover:bg-red-700 transition"
                                  onClick={() => setOpen(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </DialogPanel>
                          </div>
                        </div>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={6}
            rowsPerPage={5}
            page={0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
            sx={{ border: "none" }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
