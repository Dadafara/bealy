export interface ProfileEditDialogProps {
    isModalEdit: boolean;
    onOpenChange: (open: boolean) => void;
    handleUpdateProfile: () => void;
    username: string;
    email: string;
    age: string;
    phone: string;
    description: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setAge: React.Dispatch<React.SetStateAction<string>>;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
  }

  export interface ProfileImageUploadProps {
    profilUrl: File | null;
    username: string;
    createdAt: string;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

  export interface ProfileInfoProps {
    description: string;
    email: string;
    phone: string;
  }