"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";

interface QrPaymentDialogProps {
  amount: number;
  paymentLink: string;
}

const QrPaymentDialog = ({ amount, paymentLink }: QrPaymentDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Support</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col items-center text-center">
        <DialogTitle className="text-lg font-semibold">
          Scan QR code {amount}
        </DialogTitle>
        <QRCodeCanvas value={paymentLink} size={200} />
        <p className="mt-2 text-sm text-muted-foreground">
          Scan the QR code to complete your donation
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default QrPaymentDialog;
