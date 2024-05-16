"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
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
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { formatCurrency } from "@/utils";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  useAddBeneficiaryMutation,
  useCreatePurchaseMutation,
  useDeletePurchaseMutation,
  useEditPurchaseMutation,
  useEditCustomerMutation,
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
import { FaRegStar, FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoIosArrowUp } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetHarvestQuery } from "@/redux/services/harvestApiSlice";
import EditCustomerModal from "@/components/EditCustomerModal";

interface RowData {
  price_per_unit: string;
  size: string;
  pieces: string;
  amount: string;
  harvestId: string;
  status: any;
}

const HarvestTable: React.FC<any> = ({
  data,
  customer,
  farmId,
  customerId,
  harvestId,
  selectAll,
  toggleSelectAll,
  handleCheckboxChange,
  selectedItems,
}) => {
  const { refetch } = useGetHarvestQuery({
    farmId,
    harvestId,
  });
  const [AddBeneficiary] = useAddBeneficiaryMutation();
  const [editPurchase] = useEditPurchaseMutation();
  const [createPurchase] = useCreatePurchaseMutation();
  const [deletePurchase] = useDeletePurchaseMutation();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [purchaseID, setPurchaseID] = useState<any>({});
  const [benefied, setBenefied] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState();

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
          id: rowData?.id || "",
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
      refetch();
      toast.success("Deleted ✔️");
    } catch (error) {}
  };

  const handleInputChange = (
    index: number,
    fieldName: keyof RowData,
    value: string
  ) => {
    // Check if the entered value is a valid number
    const isValidNumber = /^\d*\.?\d*$/.test(value);

    // console.log(index);

    // If the entered value is not a valid number and not empty, don't update the state
    if (!isValidNumber && value !== "") {
      return;
    }

    const newValue = Number(value); // Parse the value to float

    // console.log(newValue);

    // console.log(newValue);

    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [fieldName]: newValue };

    // Calculate the amount based on price_per_unit and size
    const amount = newRows[index].price_per_unit * newRows[index].size;
    newRows[index] = { ...newRows[index], amount: amount.toString() };

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
    const filteredNewlyAddedRows = rows.filter((row) => !row.id);

    const rowsWithAmountAsNumber = filteredNewlyAddedRows.map((row) => ({
      ...row,
      amount: parseFloat(row.amount),
    }));

    setLoading(true);

    try {
      if (filteredNewlyAddedRows.length > 0) {
        await createPurchase({
          formdata: { data: rowsWithAmountAsNumber },
          farmId,
          harvestId,
        }).unwrap();
        refetch();
        toast.success("Purchase created ✔️");
        setIsSave(false);
        setLoading(false);
      } else {
        setLoading(false);
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

    const rowsWithAmountAsNumber = rows.map((row) => ({
      ...row,
      amount: parseFloat(row.amount),
      pieces: parseFloat(row.pieces),
      size: parseFloat(row.size),
      price_per_unit: parseFloat(row.price_per_unit),
    }));

    setSaving(true);

    try {
      await editPurchase({
        formdata: { data: rowsWithAmountAsNumber },
        farmId,
        harvestId,
      }).unwrap();
      refetch();
      toast.success("Purchase Saved ✔️");
      setIsSave(false);
      setSaving(false);
    } catch (error) {
      setSaving(false);
    }
  };

  const handleSaveBeneficairy = async () => {
    try {
      setBenefied(!benefied);
      await AddBeneficiary({
        formdata: { harvest_customer_id: customerId },
        farmId,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (value: any) => {
    setEditData(value);
    setOpenEdit(true);
  };

  // console.log(customer?.attributes?.name);

  return (
    <div>
      <>
        {editData && (
          <EditCustomerModal
            farmId={farmId}
            harvestId={harvestId}
            open={openEdit}
            setOpen={setOpenEdit}
            editdata={editData}
          />
        )}
        <Accordion type="single" collapsible className="w-full mx-auto ">
          <AccordionItem value={customer?.id} className="w-full relative">
            <div className="flex items-center pr-4 relative">
              <div className="sec-header grid grid-cols-3 px-6 w-full relative">
                <div className="flex items-center lg:space-x-4 space-x-1">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(customer.id)}
                    onChange={() => handleCheckboxChange(customer.id)}
                    className="mr-1 w-5 h-5"
                  />

                  <h2 className="lg:text-sm text-xs font-semibold ">
                    {customer?.attributes?.name?.split(" ")[0]}
                  </h2>
                </div>
                <div className="flex items-center justify-start">
                  <p
                    className={`text-xs flex items-center ${
                      data?.payment_status == "incomplete" ||
                      data?.payment_status == ""
                        ? `bg-red-100 text-red-400`
                        : `bg-[#18F4B4] text-[#05805C]`
                    }  rounded-lg  lg:px-4 lg:py-2 py-1 px-2`}>
                    <span className="">
                      {data?.payment_status == "incomplete" ||
                      data?.payment_status == ""
                        ? data?.payment_status || "pending"
                        : data?.payment_status}
                    </span>
                  </p>
                </div>
                <div className="flex items-center lg:space-x-6 space-x-4 ml-3">
                  <div>
                    {benefied || customer?.relationships?.is_beneficiary ? (
                      <FaStar
                        onClick={handleSaveBeneficairy}
                        className="text-[#F3C531] lg:h-6 lg:w-6 h-5 w-5"
                      />
                    ) : (
                      <FaRegStar
                        onClick={handleSaveBeneficairy}
                        className="text-gray-400 lg:h-6 lg:w-6 h-5 w-5"
                      />
                    )}
                  </div>

                  <Menubar className="border-none">
                    <MenubarMenu>
                      <MenubarTrigger>
                        <Button className="lg:flex hidden items-center justify-center space-x-3 text-[--primary] font-normal border border-[--primary] ">
                          <AiOutlinePlus className="w-4 h-4 text-gray-400" />
                          <span>Insert new row</span>
                        </Button>

                        <button className="w-8 h-6 rounded-md flex lg:hidden items-center justify-center space-x-3 text-[--primary] font-normal border border-[--primary] ">
                          <AiOutlinePlus className="w-4 h-4 text-[--primary]" />
                        </button>
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem
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
              </div>
              <div className="flex items-center">
                <MdOutlineEdit
                  onClick={() => handleEdit(customer)}
                  className="cursor-pointer lg:h-6 lg:w-6 h-5 w-5 text-[--primary] mr-2 "
                />
                <AccordionTrigger className="w-full mx-auto transition-all [&[data-state=open]>svg]:rotate-180">
                  <IoIosArrowUp
                    className={`h-6 w-6 shrink-0 text-gray-800 cursor-pointer transition-transform duration-200 ${
                      rotate && `transition-all rotate-180`
                    }`}
                  />
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent className="">
              <div className="overflow-hidden">
                <Table className="w-full overflow-hidden">
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead className="py-4 text-center text-black text-xs font-semibold">
                        S/N
                      </TableHead>
                      <TableHead className="py-4 text-black text-xs font-semibold">
                        Price/unit
                      </TableHead>
                      <TableHead className="py-4 text-black text-xs font-semibold flex">
                        Size
                        <span className="lg:text-sm text-[8px] ml-[2px]">
                          (kg)
                        </span>
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
                        <TableCell className="text-center lg:text-base text-xs">
                          {index + 1}
                        </TableCell>
                        <TableCell className="p-0">
                          <Input
                            name="price_per_unit"
                            value={row?.price_per_unit}
                            onClick={() => setPurchaseID(row)}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "price_per_unit",
                                e.target.value
                              )
                            }
                            className="w-full rounded-none border-b-0  focus-visible:ring-0 lg:text-base text-xs"
                          />
                        </TableCell>
                        <TableCell className="p-0">
                          <Input
                            name="size"
                            value={row.size}
                            onClick={() => setPurchaseID(row)}
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
                            onClick={() => setPurchaseID(row)}
                            onChange={(e) =>
                              handleInputChange(index, "pieces", e.target.value)
                            }
                            className="rounded-none border-b-0 w-full focus-visible:ring-0 lg:text-base text-xs"
                          />
                        </TableCell>
                        <TableCell className="p-0">
                          <Input
                            name="amount"
                            value={formatCurrency(row.amount)}
                            onClick={() => setPurchaseID(row)}
                            onChange={(e) =>
                              handleInputChange(index, "amount", e.target.value)
                            }
                            className="rounded-none border-b-0 w-full focus-visible:ring-0 lg:text-base text-xs"
                          />
                        </TableCell>
                        <TableCell className="lg:pl-8 space-x-2 flex items-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <button
                                className={`${
                                  row.status == "paid"
                                    ? `bg-blue-100 text-blue-700`
                                    : `bg-red-100 text-red-700`
                                } text-xs  rounded-md lg:px-4 px-1 py-1 flex items-center lg:space-x-4 space-x-1 lg:mr-2`}
                                onClick={() =>
                                  setRows((prevRows: any) => {
                                    const newRows = [...prevRows];
                                    if (newRows[index]) {
                                      newRows[index].status = !row.status;
                                    }
                                    return newRows;
                                  })
                                }>
                                <span>
                                  {row.status == "paid" ? "Paid" : "Hold"}
                                </span>
                                <IoIosArrowDown />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              onClick={() => setPurchaseID(row)}>
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
                                Hold
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <MdDelete className="lg:h-6 lg:w-6 h-4 w-4 text-red-400 cursor-pointer" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="text-red-500 bg-red-100"
                                  onClick={() =>
                                    handleDeletePurchase(row?.id, index)
                                  }>
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
                      <TableCell className="lg:text-base text-xs font-semibold">
                        {calculateTotal("size")}
                        <span className="lg:text-sm text-[8px] ml-[2px]">
                          (kg)
                        </span>
                      </TableCell>
                      <TableCell className="lg:text-base text-xs flex font-semibold">
                        {calculateTotal("pieces")}{" "}
                        <span className="lg:text-sm text-[8px] ml-[2px]">
                          (pcs)
                        </span>
                      </TableCell>
                      <TableCell className="lg:text-base text-xs font-semibold">
                        <span className="text-stroke lg:text-sm text-[8px] mr-[2px]">
                          N
                        </span>
                        {calculateTotal("amount")
                          .toFixed()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, `,`)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
                <div className="pl-2">
                  {isSave ? (
                    <button
                      onClick={handleSubmit}
                      className=" border px-3 py-2 bg-[--primary] text-white text-xs font-normal rounded-lg">
                      {loading ? "Saving..." : "Save"}
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      className=" border px-3 py-2 bg-[--primary] text-white text-xs font-normal rounded-lg">
                      {saving ? "Saving..." : "Save changes"}
                    </button>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    </div>
  );
};

export default HarvestTable;
