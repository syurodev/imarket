import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@nextui-org/react";

export default function Home() {
    return (
        <MainLayout>
            <Link href="/thu-tien">Thu phí</Link>
            <Link href="/kios">Quản lý Kios</Link>
            <Link href="/customer">Quản lý khách hàng</Link>
        </MainLayout>
    );
}
