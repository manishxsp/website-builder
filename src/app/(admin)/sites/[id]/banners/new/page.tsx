import BannerForm from '@/components/admin/BannerForm';

export default function NewBannerPage({ params }: { params: { id: string } }) {
    return <BannerForm siteId={params.id} />;
}
