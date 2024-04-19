"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CiStar } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { formatCurrency } from "@/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  useCreatePurchaseMutation,
  useDeletePurchaseMutation,
} from "@/redux/services/customerApiSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RowData {
  price_per_unit: string;
  size: string;
  pieces: string;
  amount: string;
  harvestId: string;
  status: any;
}

interface TableProps {
  data: {
    data: any[];
    total_amount: string;
    total_size: string;
    total_pieces: string;
  };
}

const HarvestTable: React.FC<any> = ({
  data,
  farmId,
  customerId,
  harvestId,
}) => {
  const [createPurchase] = useCreatePurchaseMutation();
  const [deletePurchase] = useDeletePurchaseMutation();
  const [rows, setRows] = useState<any[]>([]);
  const [status, setStatus] = useState(false);
  const [isSave, setIsSave] = useState(false);

  console.log(data);

  useEffect(() => {
    if (data?.data) {
      // Initialize rows state with data from the server
      setRows(
        data?.data?.map((rowData: any) => ({
          price_per_unit: rowData?.attributes?.price_per_unit || "",
          size: rowData?.attributes?.size || "",
          pieces: rowData?.attributes?.pieces || "",
          amount: rowData?.attributes?.amount || "",
          harvest_customer_id: customerId || "",
          status: rowData?.attributes?.status || "pending", // Default status to "pending" if not provided
          id: rowData?.id || "", // Default status to "pending" if not provided
        }))
      );
    }
  }, [data]);

  const handleInsertRow = () => {
    // Check if any of the fields in the last row are empty
    const lastRow = rows[rows.length - 1];
    if (lastRow && Object.values(lastRow).some((value) => value === "")) {
      // If any field is empty, display a message or toast to the user
      toast.error("Please fill in all fields before adding a new row.");
      return;
    }

    // Add a new row
    const newRow = {
      price_per_unit: "",
      size: "",
      pieces: "",
      amount: "",
      harvest_customer_id: customerId,
      status: "pending",
    };

    // Update both rows and newlyAddedRows state
    setRows((prevRows) => [...prevRows, newRow]);
    setIsSave(true);
  };

  const handleDeletePurchase = async (purchaseId: string, index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    try {
      await deletePurchase({ harvestId, farmId, purchaseId }).unwrap();
    } catch (error) {}
  };

  const handleInputChange = (
    index: number,
    fieldName: string,
    value: string
  ) => {
    // Check if the entered value is a valid number
    const isValidNumber = /^\d*\.?\d*$/.test(value);

    if (!isValidNumber) {
      // If the entered value is not a valid number, don't update the state
      return;
    }

    const newValue = parseFloat(value); // Parse the value to float

    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [fieldName]: newValue };
    setRows(newRows);
  };

  const calculateTotal = (fieldName: any) => {
    return rows.reduce((total, row: any) => {
      return total + parseFloat(row[fieldName] || "0");
    }, 0);
  };

  const handleSubmit = async () => {
    // Check if any of the fields in the last row are empty
    const lastRow = rows[rows.length - 1];
    if (lastRow && Object.values(lastRow).some((value) => value === "")) {
      // If any field is empty, display a message or toast to the user
      toast.error("Please fill in all fields before adding a new row.");
      return;
    }

    // Filter newlyAddedRows to return only objects where price_per_unit is of type number
    const filteredNewlyAddedRows = rows.filter(
      (row) => typeof row.price_per_unit === "number"
    );

    try {
      if (filteredNewlyAddedRows.length > 0) {
        await createPurchase({
          formdata: { data: filteredNewlyAddedRows },
          farmId,
          harvestId,
        }).unwrap();
        toast.success("Purchase created ✔️");
        setIsSave(false);
      } else {
        toast.error("No new rows to submit.");
      }
    } catch (error) {
      // setLoading(false);
      toast.error(
        "Something went wrong please try again or check your network connection"
      );
    }
  };

  const handleUpdate = async () => {
    // Check if any of the fields in the last row are empty
    const lastRow = rows[rows.length - 1];
    if (lastRow && Object.values(lastRow).some((value) => value === "")) {
      // If any field is empty, display a message or toast to the user
      toast.error("Please fill in all fields before adding a new row.");
      return;
    }
    console.log("Hello update");
  };

  return (
    <div className="overflow-hidden">
      {/* <button onClick={handleInsertRow}>Insert new row</button> */}
      <div className="flex items-center justify-center mb-2 lg:space-x-6 space-x-4">
        <div>
          <FaStar className="text-[#F3C531] lg:h-6 lg:w-6 h-5 w-5" />
        </div>

        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger>
              <Button className="flex items-center space-x-3 text-[--primary] font-normal border border-[--primary] ">
                <AiOutlinePlus className="w-5 h-5 text-gray-400" />
                <span className="lg:flex hidden">Insert new row</span>
              </Button>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                // onClick={() => handleOpenModal(customer?.id)}
                onClick={handleInsertRow}
                className="flex items-center font-normal cursor-pointer ">
                <AiOutlinePlus className="text-gray-500 h-4 w-4 mr-2 " />
                Add new purchase
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="flex items-center font-normal cursor-pointer ">
                <CiStar className="text-gray-500 h-6 w-6 mr-2 " />
                Choose beneficiary
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <Table className="w-full overflow-hidden">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="py-4 text-center text-black text-xs font-semibold">
              S/N
            </TableHead>
            <TableHead className="py-4 text-black text-xs font-semibold">
              Price/unit
            </TableHead>
            <TableHead className="py-4 text-black text-xs font-semibold">
              Size (kg)
            </TableHead>
            <TableHead className="py-4 text-black text-xs font-semibold">
              Pieces
            </TableHead>
            <TableHead className="py-4 text-black text-xs font-semibold">
              Amount
            </TableHead>
            <TableHead className="py-4 text-black text-xs font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white pl-8">
          {rows?.map((row, index) => (
            <TableRow key={index} className="mx-auto pl-8">
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="p-0">
                <Input
                  name="price_per_unit"
                  value={row?.price_per_unit}
                  onChange={(e) =>
                    handleInputChange(index, "price_per_unit", e.target.value)
                  }
                  className="w-full rounded-none border-b-0  focus-visible:ring-0"
                />
              </TableCell>
              <TableCell className="p-0">
                <Input
                  name="size"
                  value={row.size}
                  onChange={(e) =>
                    handleInputChange(index, "size", e.target.value)
                  }
                  className="rounded-none border-b-0 w-full focus-visible:ring-0"
                />
              </TableCell>
              <TableCell className="p-0">
                <Input
                  name="pieces"
                  value={row.pieces}
                  onChange={(e) =>
                    handleInputChange(index, "pieces", e.target.value)
                  }
                  className="rounded-none border-b-0 w-full focus-visible:ring-0"
                />
              </TableCell>
              <TableCell className="p-0">
                <Input
                  name="amount"
                  value={row.amount}
                  onChange={(e) =>
                    handleInputChange(index, "amount", e.target.value)
                  }
                  className="rounded-none border-b-0 w-full focus-visible:ring-0"
                />
              </TableCell>
              <TableCell className="pl-8 flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button
                      className={`${
                        row.status == "paid"
                          ? `bg-blue-100 text-blue-700`
                          : `bg-red-100 text-red-700`
                      } text-xs  rounded-md px-4 py-1 flex items-center space-x-4 mr-2`}
                      onClick={() =>
                        setRows((prevRows: any) => {
                          const newRows = [...prevRows];
                          if (newRows[index]) {
                            newRows[index].status = !row.status;
                          }
                          return newRows;
                        })
                      }>
                      <span>{row.status == "paid" ? "Paid" : "Pending"}</span>
                      <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        setRows((prevRows) => {
                          const newRows = [...prevRows];
                          newRows[index].status = "paid";
                          return newRows;
                        })
                      }>
                      Paid
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        setRows((prevRows) => {
                          const newRows = [...prevRows];
                          newRows[index].status = "pending";
                          return newRows;
                        })
                      }>
                      Pending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <MdDelete className="text-xl text-red-400 cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="text-red-500 bg-red-100"
                        onClick={() => handleDeletePurchase(row?.id, index)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{calculateTotal("size")}(kg)</TableCell>
            <TableCell>{calculateTotal("pieces")} (pcs)</TableCell>
            <TableCell>{formatCurrency(data?.total_amount)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {isSave ? (
        <button onClick={handleSubmit}>Save</button>
      ) : (
        <button onClick={handleUpdate}>Save changes</button>
      )}
    </div>
  );
};

export default HarvestTable;
