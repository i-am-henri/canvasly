'use client';

import { LucideImagePlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../dashboard/dialog';
import { MenubarItem } from '../dashboard/menubar';

export default function Image() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MenubarItem className="flex gap-2">
          <LucideImagePlus className="h-4 w-4" /> <span>Image</span>
        </MenubarItem>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add an Image</DialogTitle>
        <DialogDescription>
          Add an image to the canvas from your local computer.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
