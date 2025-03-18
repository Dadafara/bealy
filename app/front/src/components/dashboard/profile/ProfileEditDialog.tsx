import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { ProfileEditDialogProps } from "@/types/Profil";

const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({
  isModalEdit,
  onOpenChange,
  handleUpdateProfile,
  username,
  email,
  age,
  phone,
  description,
  setEmail,
  setAge,
  setPhone,
  setDescription,
}) => (
  <Dialog open={isModalEdit} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <Button variant="outline" className="flex items-center gap-x-2 w-full mt-5 sm:text-lg">
        <Pencil size={18} /> Profile
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-center">Edit profile</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Input type="text" name="username" value={username} placeholder="Username" disabled />
        <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input type="text" inputMode="numeric" pattern="[0-9]*" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
        <Input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
        <Textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add details about yourself." />
      </div>
      <DialogFooter>
        <Button onClick={handleUpdateProfile}>Update</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ProfileEditDialog;