import React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Container, Switch, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getAuth } from "../../utils/common";
import { apiCategories } from "../../utils/globals";

const CategoryFormModal = ({ open, record, handleClose }) => {
  const [name, setName] = React.useState("");
  const [active, setActive] = React.useState(true);

  React.useEffect(() => {
    setName("");
    if (record) {
      setName(record.name);
      setActive(record.status);
    }
  }, [record]);

  const handleSubmit = async () => {
    let url = apiCategories;
    if (record) {
      url += `/${record._id}`;
      await axios.put(url, { name, status: active }, getAuth()).then((data) => {
        handleClose(data.data);
      });
    } else {
      await axios
        .post(url, { name, status: active }, getAuth())
        .then((data) => {
          handleClose(data.data);
        });
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {record === null ? "Create Category" : "Update Category"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter a Category Details...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              component="h1"
              gutterBottom
              sx={{ color: "GrayText", py: 2 }}
            >
              Status (Is Active ?)
            </Typography>
            <Switch
              label={"Is Active ?"}
              checked={active}
              onChange={() => setActive(!active)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {record === null ? "Save" : "Done"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const CategoryTable = () => {
  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState(null);

  const handleClickOpen = (record) => {
    setOpen(true);
    setCategory(record);
  };

  const handleClose = (record) => {
    setOpen(false);
    setCategory(record);
  };

  React.useEffect(() => {
    const loadCategories = async () => {
      await axios.get(apiCategories).then((res) => {
        setCategories(res.data.categories);
      });
    };
    loadCategories();
  }, [category]);

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (renderer) => {
        return renderer.row.status === true ? (
          <CheckCircleIcon color="success" />
        ) : (
          <CheckCircleIcon color="disabled" />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (renderer) => {
        return (
          <Button
            variant="outlined"
            onClick={() => handleClickOpen(renderer.row)}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        backgroundColor: "HighlightText",
        minHeight: "70vh",
        color: "ActiveCaption",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ color: "black", py: 2 }}
        >
          Categories
        </Typography>
        <div style={{ height: "50vh", width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={categories}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Button onClick={() => handleClickOpen(null)}>Add</Button>
        <CategoryFormModal
          record={category}
          open={open}
          handleClose={handleClose}
        />
      </Box>
    </Container>
  );
};

export const CategoryContainer = () => {
  return <CategoryTable />;
};
