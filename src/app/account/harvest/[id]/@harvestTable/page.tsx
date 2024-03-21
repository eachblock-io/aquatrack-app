"use client";
import { useState } from "react";
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
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

interface TableData {
  id: number;
  price: string;
  size: string;
  pieces: string;
  amount: string;
  action: any;
}

interface TableProps {
  data: TableData[];
}

const HarvestTable: React.FC<TableProps> = ({ data }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : data.map((item) => item.id));
  };

  const handleCheckboxChange = (id: number) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems: number[] = [];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, id];
    } else {
      newSelectedItems = [
        ...selectedItems.slice(0, selectedIndex),
        ...selectedItems.slice(selectedIndex + 1),
      ];
    }

    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === data.length);
  };

  return (
    <div className="overflow-hidden">
      <Table className="w-full overflow-hidden">
        <TableHeader className="">
          <TableRow>
            <TableHead className="py-4 pl-8 text-black ">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="mr-1 w-4 h-4"
              />
            </TableHead>
            <TableHead className="py-4 text-black font-bold">
              Price/unit
            </TableHead>
            <TableHead className="py-4 text-black font-bold">
              Size (kg)
            </TableHead>
            <TableHead className="py-4 text-black font-bold"> Amount</TableHead>
            <TableHead className="py-4 text-black font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white pl-8">
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="py-4 pl-8">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="mr-1 w-4 h-4"
                />
              </TableCell>
              <TableCell className="py-4">{item.price}</TableCell>
              <TableCell className="py-4">{item.size}</TableCell>
              <TableCell className="py-4">{item.pieces}</TableCell>
              <TableCell className="py-4">{item.amount}</TableCell>
              <TableCell className="py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-green-100 rounded-lg px-4 py-2 flex items-center space-x-4">
                    <p>Paid</p> <IoIosArrowDown />{" "}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item?.action?.map((item: any, index: any) => (
                      <DropdownMenuItem key={index} className="capitalize">
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HarvestTable;
