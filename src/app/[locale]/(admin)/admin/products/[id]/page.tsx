import ViewProduct from "./view-product";

interface ViewProductPageProps {
  params: {
    id: string;
  };
}

export default function ViewProductPage({ params }: ViewProductPageProps) {
  return <ViewProduct productId={params.id} />;
}