import EditUserForm from "./edit-user-form";

interface EditUserPageProps {
  params: {
    id: string;
  };
}

export default function EditUserPage({ params }: EditUserPageProps) {
  return <EditUserForm userId={params.id} />;
} 