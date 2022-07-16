import React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Container, Switch, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getAuth } from "../../utils/common";
import { apiUsers } from "../../utils/globals";

const PublisherFormModal = ({ open, record, handleClose }) => {
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (record) {
      setActive(record.isEditor);
    }
  }, [record]);

  const handleSubmit = async () => {
    let url = `${apiUsers}/${record._id}`;
    if (record) {
      await axios.put(url, { isEditor: active }, getAuth()).then((data) => {
        handleClose(data.data);
      });
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {record === null ? "Create Publisher" : "Update Publisher"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Update Publisher Status...
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              component="h1"
              gutterBottom
              sx={{ color: "GrayText", py: 2 }}
            >
              Status (Can Edit News ?)
            </Typography>
            <Switch
              label={"Is Editor ?"}
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

const PublisherTable = () => {
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [publisher, setPublisher] = React.useState(null);

  const handleClickOpen = (record) => {
    setOpen(true);
    setPublisher(record);
  };

  const handleClose = (record) => {
    setOpen(false);
    setPublisher(record);
  };

  React.useEffect(() => {
    const loadUsers = async () => {
      await axios.get(apiUsers, getAuth()).then((res) => {
        setUsers(res.data.users);
      });
    };
    loadUsers();
  }, [publisher]);

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "isEditor",
      headerName: "Is Publisher",
      width: 200,
      renderCell: (renderer) => {
        return renderer.row.isEditor === true ? (
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
          Publishers
        </Typography>
        <div style={{ height: "50vh", width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={users}
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
        <PublisherFormModal
          record={publisher}
          open={open}
          handleClose={handleClose}
        />
      </Box>
    </Container>
  );
};

export const PublisherContainer = () => {
  return <PublisherTable />;
};
