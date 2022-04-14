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
import { getPosts, getPostsCount } from "../../utils/api";
import useEffect from "react";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    whiteSpace: "normal",
    wordWrap: "break-word",
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

export default function CustomizedTables(message: any[]) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
      text: "pdmiGgotsweGHIeiuMKzpmoEcapOTRXssOGOXsKgKfDsnSecJOLOyCDpkjjnrnfDHBjbrebWxXhZpuXzQzqMHOQhrIMnQxrrIVOa",
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
  // const [tableData, settableData] = React.useState([]);

  const [postCount, setPostCount] = React.useState(0);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage((prev) => newPage);
    setPostCount(await getPostsCount());
    settableData(await getPosts(rowsPerPage, newPage * rowsPerPage, "id"));
    // console.log(`getPosts(${rowsPerPage}, ${newPage * rowsPerPage}, "id")`);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage((prev) => parseInt(event.target.value, 10));
    setPage(0);
    settableData(await getPosts(parseInt(event.target.value, 10), 0, "id"));
  };

  if (tableData.length == 0) return <div></div>;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ minWidth: 500 }}>
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
          {tableData
            // {(rowsPerPage > 0
            //   ? message.slice(
            //       page * rowsPerPage,
            //       page * rowsPerPage + rowsPerPage
            //     )
            //   : message
            .map((row: any) => (
              <StyledTableRow
                key={row.id}

                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 160 }}>
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 160 }}>
                  {row.text}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 160 }}>
                  {row.user_id}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 160 }}>
                  {row.create_date}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          {/* {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </StyledTableRow>
          )} */}
        </TableBody>
        <TableFooter>
          <TableRow>
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
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
