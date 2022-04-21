import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { getPosts, getPostsCount } from "../../../utils/api/post";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../config/theme";
import Content from "./ModalWindow";
import ReactDOM from "react-dom";
import { Modal } from "@material-ui/core";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    whiteSpace: "normal",
    wordWrap: "break-word",
    padding: "normal",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomizedTables() {
  const [page, setPage] = React.useState(0);
  const [selectedRow, setSelectedRow] = React.useState<any>();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // TODO: Изначальная зарузка данных в таблицу
  const [tableData, settableData] = React.useState([
    {
      id: 1,
      user_id: 1,
      text: "ImayoMjzBDkOjFsejEMHnqCORrREkGXeFXgryqWGLoHejAzOxHlsZkZsdBJUrCDcBTbaKNzgsPHbBXwSHCBYBViMKXXFBKLLadBP",
      create_date: null,
      title: "boNXYzlgdI",
    },
    {
      id: 2,
      user_id: 1,
      text: "pdmiGgotsweGHIeiuMKzpmoEcapOTR XssOGOXsKgKfDsnSecJOLOyCDpkjj nrnfDHBjbrebWxXhZpu  nrnfDHBjbrebWxXhZpu  nrnfDHBjbrebWxXhZpu  nrnfDHBjbrebWxXhZpu  nrnfDHBjbrebWxXhZpu  nrnfDHBjbrebWxXhZpu  nrnfDHBjbrebWxXhZpu  nrnfDHBjbrebWxXhZpu XzQzqMHOQhrIMnQxrrIVOa",
      create_date: null,
      title: "DBPybhlEJG",
    },
    {
      id: 3,
      user_id: 1,
      text: "dhyQOReBtWMhekXfxSHMGhYUqHphZFIRjPUBHadXfjVJEOGmFgaajWwtfVZGxyiaEiGyZTULOYpbyGYKmVHndKNCvBEqxcmLEPRt",
      create_date: null,
      title: "UlIBpKvkiK",
    },
    {
      id: 4,
      user_id: 1,
      text: "ArgvWaqGTxXiezOGEzCROmZILGGgqybtZWIRplSlMSDRWFcwYiLQevxktBlHqlGIksHYFcdnTwsbQzJZAOgOhSQvjAunhBDirviO",
      create_date: null,
      title: "iTfgERXbZo",
    },
    {
      id: 5,
      user_id: 1,
      text: "XWINyTdlTDQrrRWTeOaDTDJzLdUmrPArPrZUaibVxCQMcudatVIQSgcFzqFqkCrYzsOZixFPOeuvZODduIvpECyQrPsPmyPDrdPI",
      create_date: null,
      title: "lmmFUgzIfe",
    },
  ]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [postCount, setPostCount] = React.useState(0);

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage((prev) => newPage);
    setPostCount(await getPostsCount());
    settableData(await getPosts(rowsPerPage, newPage * rowsPerPage, "id"));
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage((prev) => parseInt(event.target.value, 10));
    setPage(0);
    settableData(await getPosts(parseInt(event.target.value, 10), 0, "id"));
  };

  function setSelectedRow1(id) {
    // console.log(event.target.textContent);
    let a = tableData.find((x) => x.id == id);
    setSelectedRow((selectedRow) => a);
    handleOpen();
  }

  if (tableData.length === 0) return <div></div>;
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          sx={{
            minWidth: 500,
            width: "100%",
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
            "& .MuiTableRow-root:hover": {
              backgroundColor: "primary.light",
            },
          }}
        >
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">id</StyledTableCell>
              <StyledTableCell align="center">Title&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="center">Text&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="center">User id</StyledTableCell>
              <StyledTableCell align="center">
                Create dates&nbsp;(g)
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: any) => (
              <StyledTableRow
                onClick={(event) => setSelectedRow1(row.id)}
                key={row.id}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                <StyledTableCell align="center">{row.text}</StyledTableCell>
                <StyledTableCell align="center">{row.user_id}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.create_date}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={postCount}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* TODO:: возможно следует по другому обновлять таблицу */}
        <Content
          row={selectedRow}
          SetOpen={setOpen}
          getPosts={getPosts}
          rowsPerPage={rowsPerPage}
          page={page}
          column={"id"}
          settableData={settableData}
        />
      </Modal>
    </ThemeProvider>
  );
}
